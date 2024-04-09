/*
 * Memory is modelled as a linked list of nodes. Each node is NODE_SIZE words long.
 * The first word of each node is used to store metadata, and payload.
 * The remaining NODE_SIZE - 1 words are used to store pointers to children.
 * 
 * Node structure is as such:
 * 
 * Unused node:
 * [nextNodeIndex][...empty children]  
 * all 8 bytes used to store next node index
 *       
 * Used node:
 * [tag, size, marked][...payload/children]
 * 1 byte, 1 byte, 1 byte, 5 bytes unused
 */

import { BuiltinMetadata, GoroutineContext } from "../../vm/machine";
import { GoroutineId } from "../../vm/scheduler";

export const WORD_SIZE: number = 8; // bytes
export const NODE_SIZE: number = 16; // words

// unused node offsets (none for now)
const NEXT_NODE_OFFSET: number = 0;

// used node offsets
const TAG_OFFSET: number = 0;
const SIZE_OFFSET: number = 1;
const MARKED_OFFSET: number = 2;

// builtin offsets
const BUILTIN_ID_OFFSET: number = 3;
const BUILTIN_ARITY_OFFSET: number = 4;

// closure offsets
const CLOSURE_ARITY_OFFSET: number = 3;
const CLOSURE_PC_OFFSET: number = 4;

// callframe offsets
const CALLFRAME_PC_OFFSET: number = 4;

// Golang type tags
export enum Tag {
    Nil,
    Unassigned,
    True,
    False,
    Int, // 64-bit signed integer
    Builtin,
    Environment,
    Frame,
    Callframe,
    Blockframe,
    Closure
}

export enum MarkedStatus {
    Unmarked,
    Marked,
}

export default class Memory {
    private data: ArrayBuffer;
    private view: DataView;
    public heapSize: number;

    public literals: [number, number, number, number];

    public freeIndex: number;
    public heapBottom: number;
    public allocating: number[];

    public goroutineContexts: Map<GoroutineId, GoroutineContext>;

    constructor(numWords: number) {
        // for equally-sized nodes; TODO: can maybe pass in num_nodes as constructor argument
        this.heapSize = numWords;
        if (this.heapSize % NODE_SIZE !== 0) {
            const msg: string = "numWords must be a multiple of " + NODE_SIZE;
            throw new Error(msg);
        }

        this.data = new ArrayBuffer(this.heapSize * WORD_SIZE);
        this.view = new DataView(this.data);

        this.literals = [0, 0, 0, 0];
        
        this.freeIndex = 0;
        this.heapBottom = 0;
    
        // initialize free list
        for (let i = 0; i < this.heapSize - NODE_SIZE; i += NODE_SIZE) {
            this.setWord(i, i + NODE_SIZE);
        }

        // last word of free list is -1
        this.setWord((this.heapSize - NODE_SIZE), -1);
    }

    /*
     * Memory access & metadata functions
     */

    // set and get a word (8 bytes) at word index (used for setting)
    setWord(index: number, value: number): void {
        this.view.setFloat64(index * WORD_SIZE, value);
    }

    getWord(index: number): number {
        return this.view.getFloat64(index * WORD_SIZE);
    }

    // set and get a used node's tag; index is word index
    setTag(index: number, tag: Tag): void {
        this.view.setUint8(index * WORD_SIZE + TAG_OFFSET, tag as number);
    }

    getTag(index: number): Tag {
        return this.view.getUint8(index * WORD_SIZE + TAG_OFFSET) as Tag;
    }

    // set and get a used node's size; index is word index
    setSize(index: number, size: number): void {
        this.view.setUint8(index * WORD_SIZE + SIZE_OFFSET, size);
    }

    getSize(index: number): number {
        return this.view.getUint8(index * WORD_SIZE + SIZE_OFFSET);
    }

    // set and get a used node's marked flag; index is word index
    setMarked(index: number, marked: MarkedStatus): void {
        this.view.setUint8(index * WORD_SIZE + MARKED_OFFSET, marked as number);
    }

    getMarked(index: number): MarkedStatus {
        return this.view.getUint8(index * WORD_SIZE + MARKED_OFFSET) as MarkedStatus;
    }

    // set specific byte in node's metadata
    setByteAtOffset(index: number, offset: number, value: number): void {
        this.view.setUint8(index * WORD_SIZE + offset, value);
    }

    getByteAtOffset(index: number, offset: number): number {
        return this.view.getUint8(index * WORD_SIZE + offset);
    }

    // set 4 bytes in node's metadata
    setFourBytesAtOffset(index: number, offset: number, value: number): void {
        this.view.setInt32(index * WORD_SIZE + offset, value);
    }

    getFourBytesAtOffset(index: number, offset: number): number {
        return this.view.getInt32(index * WORD_SIZE + offset);
    }

    // set and get a used node's payload/children; index is word index
    setChild(index: number, childIndex: number, value: number): void {
        this.setWord(index + childIndex + 1, value);
    }

    getChild(index: number, childIndex: number): number {
        return this.getWord(index + childIndex + 1);
    }

    // get the number of children a node has
    getNumChildren(index: number): number {
        return this.getTag(index) === Tag.Int 
                ? 0 
                : this.getSize(index) - 1;
    }

    /*
     * Allocator functions
     */

    // allocates node metadata, called prior to allocating payload/children
    allocateNode(tag: Tag, size: number): number {
        if (size < 1 || size > NODE_SIZE) {
            throw new Error("Invalid node size");
        }

        if (this.freeIndex === -1) {
            console.log("Running garbage collection!");
            this.markSweep();
            if (this.freeIndex === -1) {
                throw new Error("Heap exhausted");
            }
        }

        const nodeAddr: number = this.freeIndex;
        this.freeIndex = this.getWord(nodeAddr); // get next free address

        this.setTag(nodeAddr, tag);
        this.setSize(nodeAddr, size);
        this.setMarked(nodeAddr, MarkedStatus.Unmarked);

        return nodeAddr;
    }

    // allocate literal values
    allocateLiterals(): void {
        const nilAddr: number = this.allocateNode(Tag.Nil, 1);
        const unassignedAddr: number = this.allocateNode(Tag.Unassigned, 1);
        const trueAddr: number = this.allocateNode(Tag.True, 1);
        const falseAddr: number = this.allocateNode(Tag.False, 1);

        this.literals = [nilAddr, unassignedAddr, trueAddr, falseAddr];
    }

    /*
     * allocate frame
     * [tag, size, marked][declarations...]
     */
    allocateFrame(numDeclarations: number): number {
        return this.allocateNode(Tag.Frame, numDeclarations + 1);
    }

    // allocate builtin functions: make, println, etc
    allocateBuiltinsFrame(builtinsMetadata: BuiltinMetadata): number {
        const values: any = Object.values(builtinsMetadata);
        const mainframeAddr: number = this.allocateFrame(values.length);

        for (let i = 0; i < values.length; i++) {
            const builtinId: number = values[i].id;
            const arity: number = values[i].arity;
            const builtinAddr = this.allocateBuiltin(builtinId, arity);
            this.setChild(mainframeAddr, i, builtinAddr);
        }

        return mainframeAddr;
    }

    // [tag, size, marked, builtin_id, arity][no children]
    allocateBuiltin(builtinId: number, arity: number): number {
        const addr: number = this.allocateNode(Tag.Builtin, 1);

        this.setByteAtOffset(addr, BUILTIN_ID_OFFSET, builtinId);
        this.setByteAtOffset(addr, BUILTIN_ARITY_OFFSET, arity);

        return addr;
    }

    getBuiltinId(addr: number): number {
        return this.getByteAtOffset(addr, BUILTIN_ID_OFFSET);
    }

    getBuiltinArity(addr: number): number {
        return this.getByteAtOffset(addr, BUILTIN_ARITY_OFFSET);
    }

    // allocate int
    allocateInt(value: number): number {
        const addr: number = this.allocateNode(Tag.Int, 2);
        this.setChild(addr, 0, value);
        return addr;
    }

    getIntValue(addr: number): number {
        return this.getChild(addr, 0);
    }

    /* 
     * allocate closure
     * [tag, size, marked, arity, pc, pc, pc, pc][env (only child)]
     *                     1 byte, 4 bytes pc
     */ 
    allocateClosure(arity: number, pc: number, env: number): number {
        this.allocating = [env];
        const addr: number = this.allocateNode(Tag.Closure, 2);
        this.allocating = [];

        this.setByteAtOffset(addr, CLOSURE_ARITY_OFFSET, arity);
        this.setFourBytesAtOffset(addr, CLOSURE_PC_OFFSET, pc);
        this.setChild(addr, 0, env);

        return addr;
    }

    getClosureArity(addr: number): number {
        return this.getByteAtOffset(addr, CLOSURE_ARITY_OFFSET);
    }

    getClosurePc(addr: number): number {
        return this.getFourBytesAtOffset(addr, CLOSURE_PC_OFFSET);
    }

    getClosureEnv(addr: number): number {
        return this.getChild(addr, 0);
    }

    /*
     * allocate callframe
     * [tag, size, marked, _ , pc, pc, pc, pc][env (only child)]
     */
    allocateCallframe(pc: number, env: number): number {
        this.allocating = [env];
        const addr: number = this.allocateNode(Tag.Callframe, 2);
        this.allocating = [];

        this.setFourBytesAtOffset(addr, CALLFRAME_PC_OFFSET, pc);
        this.setChild(addr, 0, env);

        return addr;
    }

    getCallframePc(addr: number): number {
        return this.getFourBytesAtOffset(addr, CALLFRAME_PC_OFFSET);
    }

    getCallframeEnv(addr: number): number {
        return this.getChild(addr, 0);
    }

    /*
     * allocate blockframe
     * [tag, size, marked][env (only child)]
     */
    allocateBlockframe(parentEnv: number): number {
        this.allocating = [parentEnv];
        const addr: number = this.allocateNode(Tag.Blockframe, 2);
        this.setChild(addr, 0, parentEnv);
        this.allocating = [];

        return addr;
    }

    getBlockframeParentEnv(addr: number): number {
        return this.getChild(addr, 0);
    }

    /*
     * allocate environment
     * [tag, size, marked][frames...] (frames are children)
     */
    allocateEnv(numFrames: number): number {
        const addr: number = this.allocateNode(Tag.Environment, numFrames + 1);
        return addr;
    }

    getValueFromEnv(envAddr: number, compileTimePos: [number, number]): number {
        const frameIndex: number = compileTimePos[0];
        const valueIndex: number = compileTimePos[1];

        const frameAddr = this.getChild(envAddr, frameIndex);
        return this.getChild(frameAddr, valueIndex);
    }

    setValueInEnv(envAddr: number, compileTimePos: [number, number], value: number): void {
        const frameIndex: number = compileTimePos[0];
        const valueIndex: number = compileTimePos[1];

        const frameAddr = this.getChild(envAddr, frameIndex);
        this.setChild(frameAddr, valueIndex, value);
    }

    extendEnv(envAddr: number, frameAddr: number): number {
        const oldFrameCount: number = this.getNumChildren(envAddr);

        this.allocating = [frameAddr, envAddr];
        const newEnvAddr = this.allocateEnv(oldFrameCount + 1);
        this.allocating = [];

        let i;
        for (i = 0; i < oldFrameCount; i++) {
            const frame = this.getChild(envAddr, i);
            this.setChild(newEnvAddr, i, frame);
        }
        this.setChild(newEnvAddr, i, frameAddr);

        return newEnvAddr;
    }

    /*
     * TODO: allocate channel
     * need an efficient implementation of a circular queue
     * need head and tail pointers
     * [tag, size, marked, head, tail, buffer, capacity][...buffered items]
     */
    
    /*
     * Boxing and unboxing functions
     */

    // allocates an object in memory and returns its address
    box(obj: any): number {
        if (typeof obj === "boolean") {
            return obj ? this.literals[Tag.True] : this.literals[Tag.False];
        } else if (obj === null) {
            return this.literals[Tag.Nil];
        } else if (obj === undefined) {
            return this.literals[Tag.Unassigned];
        } else if (typeof obj === "number") {
            return this.allocateInt(obj);
        }
        throw new Error("Unsupported type");
    }

    // given an address, first interprets the tag, then unboxes and returns the value
    unbox(addr: number): any {
        const tag: Tag = this.getTag(addr);
        switch (tag) {
            case Tag.Nil:
                return null;
            case Tag.Unassigned:
                return undefined;
            case Tag.True:
                return true;
            case Tag.False:
                return false;
            case Tag.Int:
                return this.getIntValue(addr);
            default:
                throw new Error("Unsupported type");
        }
    }

    /*
     * Mark sweep garbage collection functions
     */
    markSweep() {
        const allRoots: number[] = [];

        for (let ctx of this.goroutineContexts.values()) {
            allRoots.push(ctx.env);
            allRoots.push(...ctx.opStack);
            allRoots.push(...ctx.runtimeStack);
        }

        for (let addr of this.allocating) {
            allRoots.push(addr);
        }

        console.log("all roots", allRoots);

        for (const root of allRoots) {
            this.mark(root);
        }

        this.sweep();
    }

    mark(addr: number) {
        if (addr >= this.heapSize || this.getMarked(addr) === MarkedStatus.Marked) {
            return;
        }
        
        this.setMarked(addr, MarkedStatus.Marked);

        const numChildren = this.getNumChildren(addr);
        for (let i = 0; i < numChildren; i++) {
            this.mark(this.getChild(addr, i));
        }
    }

    sweep() {
        let i = this.heapBottom;
        while (i < this.heapSize) {
            if (this.getMarked(i) === MarkedStatus.Marked) {
                this.setMarked(i, MarkedStatus.Unmarked);
            } else {
                this.free(i);
            }
            i += NODE_SIZE;
        }    
    }

    free(addr: number) {
        console.log("Freeing", addr, Tag[this.getTag(addr)]);
        this.setWord(addr, this.freeIndex);
        this.freeIndex = addr;
    }
}

