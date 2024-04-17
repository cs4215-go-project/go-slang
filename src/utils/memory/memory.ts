/*
 * Memory is modelled as a linked list of nodes. Each node is NODE_SIZE words long.
 * The first word of each node is used to store metadata, and payload.
 * The remaining NODE_SIZE - 1 words are used to store pointers to children.
 * 
 * Node structure is as such:
 * 
 * Unused node:
 * [nextNodeIndex][...empty children]  
 * last 4 bytes used to store next node index
 *       
 * Used node:
 * [tag, size, marked, ...any additional metadata][...payload/children/non-children]
 * 1 byte, 1 byte, 1 byte, 5 bytes unused
 */

import { BuiltinMetadata, Machine } from "../../vm/machine";

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

// channel offsets
const SEND_IDX_OFFSET: number = 3;
const RECV_IDX_OFFSET: number = 4;
const CLOSE_OFFSET: number = 5;
const QSIZE_OFFSET: number = 6;
const CAPACITY_OFFSET: number = 7;

// wait queue offsets
const WAIT_QUEUE_SEND_IDX_OFFSET: number = 3;
const WAIT_QUEUE_RECV_IDX_OFFSET: number = 4;
const WAIT_QUEUE_QSIZE_OFFSET: number = 5;

// waitgroup offsets
const WAIT_GROUP_NUM_WAITERS_OFFSET: number = 3;
const WAIT_GROUP_COUNTER_OFFSET: number = 4;

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
    Closure,
    IntChannel,
    WaitQueue,
    WaitGroup,
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

    public machine: Machine;

    constructor(numWords: number) {
        
        // addresses can only be held in 4 bytes (due to WaitQueue)
        if (numWords > 2**32) {
            throw new Error("mem err: number of memory words must be less than 2^32");
        }
        
        if (numWords % NODE_SIZE !== 0) {
            const msg: string = "mem err: numWords must be a multiple of " + NODE_SIZE;
            throw new Error(msg);
        }

        this.heapSize = numWords;
        
        this.data = new ArrayBuffer(this.heapSize * WORD_SIZE);
        this.view = new DataView(this.data);

        this.literals = [0, 0, 0, 0];
        
        this.freeIndex = 0;
        this.heapBottom = 0;
        this.allocating = [];
    
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
    
    // 0     4
    // [    ][    ]
    //   4b    4b
    getFirstFourBytesOfChild(index: number, childIndex: number): number {
        return this.getFourBytesAtOffset(index + childIndex + 1, 0);
    }

    setFirstFourBytesOfChild(index: number, childIndex: number, value: number): void {
        this.setFourBytesAtOffset(index + childIndex + 1, 0, value);
    }

    getSecondFourBytesOfChild(index: number, childIndex: number): number {
        return this.getFourBytesAtOffset(index + childIndex + 1, 4);
    }

    setSecondFourBytesOfChild(index: number, childIndex: number, value: number): void {
        this.setFourBytesAtOffset(index + childIndex + 1, 4, value);
    }

    /*
     * Allocator functions
     */

    // allocates node metadata, called prior to allocating payload/children
    allocateNode(tag: Tag, size: number): number {
        if (size < 1 || size > NODE_SIZE) {
            throw new Error("mem err: invalid node size (node size should be between 1 and " + NODE_SIZE + ")");
        }

        if (this.freeIndex === -1) {
            console.log("Running garbage collection", Tag[tag]);
            this.markSweep();
            if (this.freeIndex === -1) {
                throw new Error("mem err: heap exhausted");
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

    setIntValue(addr: number, value: number): void {
        this.setChild(addr, 0, value);
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
        this.allocating.push(env);
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

        this.allocating.push(frameAddr, envAddr);
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
     * Int channel allocation
     * [tag, size, marked, sendIdx, recvIdx, close, qsize, capacity][sendq][recvq][...buffered ints]
     * note: max capacity is 13 (NODE_SIZE - 1 (tag) - 2(wait queues))
     */
    allocateIntChannel(capacity: number): number {
        const chanAddr: number = this.allocateNode(Tag.IntChannel, 1 + 2 + capacity);
        
        this.setByteAtOffset(chanAddr, SEND_IDX_OFFSET, 0);
        this.setByteAtOffset(chanAddr, RECV_IDX_OFFSET, 0);
        this.setByteAtOffset(chanAddr, CLOSE_OFFSET, 0);
        this.setByteAtOffset(chanAddr, QSIZE_OFFSET, 0);
        this.setByteAtOffset(chanAddr, CAPACITY_OFFSET, capacity);
        
        this.allocating = [chanAddr];

        const sendqAddr: number = this.allocateWaitQueue();
        this.setChild(chanAddr, 0, sendqAddr);
        
        this.allocating.push(sendqAddr);

        const recvqAddr: number = this.allocateWaitQueue();
        this.setChild(chanAddr, 1, recvqAddr);

        this.allocating = [];

        return chanAddr;
    }

    getIntChannelSendIdx(addr: number): number {
        return this.getByteAtOffset(addr, SEND_IDX_OFFSET);
    }

    setIntChannelSendIdx(addr: number, value: number) {
        this.setByteAtOffset(addr, SEND_IDX_OFFSET, value);
    }

    getIntChannelRecvIdx(addr: number): number {
        return this.getByteAtOffset(addr, RECV_IDX_OFFSET);
    }

    setIntChannelRecvIdx(addr: number, value: number) {
        this.setByteAtOffset(addr, RECV_IDX_OFFSET, value);
    }

    getIntChannelClose(addr: number): number {
        return this.getByteAtOffset(addr, CLOSE_OFFSET);
    }
    
    setIntChannelClose(addr: number, value: number) {
        this.setByteAtOffset(addr, CLOSE_OFFSET, value);
    }

    getIntChannelQSize(addr: number): number {
        return this.getByteAtOffset(addr, QSIZE_OFFSET);
    }

    setIntChannelQSize(addr: number, value: number) {
        this.setByteAtOffset(addr, QSIZE_OFFSET, value);
    }

    getIntChannelCapacity(addr: number): number {
        return this.getByteAtOffset(addr, CAPACITY_OFFSET);
    }

    getIntChannelSendQueue(addr: number): number {
        return this.getChild(addr, 0);
    }

    getIntChannelRecvQueue(addr: number): number {
        return this.getChild(addr, 1);
    }

    setIntInChannel(addr: number, index: number, value: number) {
        this.setChild(addr, index + 2, value);
    }

    getIntFromChannel(addr: number, index: number): number {
        return this.getChild(addr, index + 2);
    }

    //      r   s
    // [    3 1 8    ]
    // increment r
    receiveFromIntChannel(addr: number): number {
        const isBufferedChan = this.getIntChannelCapacity(addr) > 0;
        if (this.getIntChannelClose(addr) === 1) {
            throw new Error("panic: read from closed channel");
        }
        if (isBufferedChan && this.getIntChannelQSize(addr) === 0) {
            return -1;
        }
        const sendqAddr = this.getIntChannelSendQueue(addr)
        if (!isBufferedChan && this.getWaitQueueSize(sendqAddr) == 0) {
            return -1;
        }

        const recvIdx = this.getIntChannelRecvIdx(addr);
        const newRecvIdx = (recvIdx + 1) % this.getIntChannelCapacity(addr);
        this.setIntChannelRecvIdx(addr, newRecvIdx);

        const size = this.getIntChannelQSize(addr);
        this.setIntChannelQSize(addr, size - 1);

        return this.getIntFromChannel(addr, recvIdx);
    }

    sendToIntChannel(addr: number, valueAddr: number): boolean {
        const isBufferedChan = this.getIntChannelCapacity(addr) > 0;
        if (this.getIntChannelClose(addr) === 1) {
            throw new Error("panic: send on closed channel");
        }

        if (isBufferedChan && this.getIntChannelQSize(addr) === this.getIntChannelCapacity(addr)) {
            return false;
        }
        const recvqAddr = this.getIntChannelRecvQueue(addr)
        if (!isBufferedChan && this.getWaitQueueSize(recvqAddr) == 0) {
            return false;
        }

        const sendIdx = this.getIntChannelSendIdx(addr);
        const newSendIdx = (sendIdx + 1) % this.getIntChannelCapacity(addr);
        this.setIntChannelSendIdx(addr, newSendIdx);

        const size = this.getIntChannelQSize(addr);
        this.setIntChannelQSize(addr, size + 1);

        this.setIntInChannel(addr, sendIdx, valueAddr);
        return true
    }

    /*
     * [tag, size, marked, sendIdx, recvIdx, qsize][...sudog structs]
     * where sudog structs consist of [goroutineId, valueAddr]
     */
    allocateWaitQueue(): number {
        const addr = this.allocateNode(Tag.WaitQueue, NODE_SIZE);
        this.setByteAtOffset(addr, WAIT_QUEUE_SEND_IDX_OFFSET, 0);
        this.setByteAtOffset(addr, WAIT_QUEUE_RECV_IDX_OFFSET, 0);
        this.setByteAtOffset(addr, WAIT_QUEUE_QSIZE_OFFSET, 0);
        return addr;
    }

    getWaitQueueSendIdx(addr: number): number {
        return this.getByteAtOffset(addr, WAIT_QUEUE_SEND_IDX_OFFSET);
    }

    setWaitQueueSendIdx(addr: number, value: number): void {
        this.setByteAtOffset(addr, WAIT_QUEUE_SEND_IDX_OFFSET, value);
    }

    getWaitQueueRecvIdx(addr: number): number {
        return this.getByteAtOffset(addr, WAIT_QUEUE_RECV_IDX_OFFSET);
    }

    setWaitQueueRecvIdx(addr: number, value: number): void {
        this.setByteAtOffset(addr, WAIT_QUEUE_RECV_IDX_OFFSET, value);
    }

    getWaitQueueSize(addr: number): number {
        return this.getByteAtOffset(addr, WAIT_QUEUE_QSIZE_OFFSET);
    }

    setWaitQueueSize(addr: number, value: number): void {
        this.setByteAtOffset(addr, WAIT_QUEUE_QSIZE_OFFSET, value);
    }

    addToWaitQueue(addr: number, goroutineId: number, valAddr: number): void {
        if (this.getWaitQueueSize(addr) === NODE_SIZE - 1) {
            throw new Error("panic: channel wait queue is full");
        }
        const sendIdx = this.getWaitQueueSendIdx(addr);
        const newSendIdx = (sendIdx + 1) % (NODE_SIZE - 1);
        this.setWaitQueueSendIdx(addr, newSendIdx);

        const size = this.getWaitQueueSize(addr);
        this.setWaitQueueSize(addr, size + 1);

        // NOTE: if valAddr is bigger than 2**32 (4 bytes), DataView.set will sets it to 0 
        this.setFirstFourBytesOfChild(addr, sendIdx, goroutineId);
        this.setSecondFourBytesOfChild(addr, sendIdx, valAddr);
    }

    // returns pair of [goroutineId, valueAddr]
    popFromWaitQueue(addr: number): [number, number] {
        if (this.getWaitQueueSize(addr) === 0) {
            throw new Error("panic: channel wait queue is empty");
        }

        const recvIdx = this.getWaitQueueRecvIdx(addr);
        const newRecvIdx = (recvIdx + 1) % (NODE_SIZE - 1);
        this.setWaitQueueRecvIdx(addr, newRecvIdx);

        const size = this.getWaitQueueSize(addr);
        this.setWaitQueueSize(addr, size - 1);

        const g = this.getFirstFourBytesOfChild(addr, recvIdx);
        const valueAddr = this.getSecondFourBytesOfChild(addr, recvIdx);
        return [g, valueAddr]
    }

    /*
     * WaitGroup allocation
     * [tag, size, marked, numWaiters, counter, counter, counter, counter][...goroutine IDs (waiting)]
     */
    allocateWaitGroup() {
        const addr = this.allocateNode(Tag.WaitGroup, 1);
        this.setByteAtOffset(addr, WAIT_GROUP_NUM_WAITERS_OFFSET, 0);
        this.setFourBytesAtOffset(addr, WAIT_GROUP_COUNTER_OFFSET, 0);
        return addr;
    }

    getWaitGroupCounter(addr: number): number {
        return this.getFourBytesAtOffset(addr, WAIT_GROUP_COUNTER_OFFSET);
    }

    setWaitGroupCounter(addr: number, value: number) {
        if (value > 2**32 - 1) {
            throw new Error("mem err: wait group counter value does not fit in 4 bytes");
        }
        this.setFourBytesAtOffset(addr, WAIT_GROUP_COUNTER_OFFSET, value);
    }

    getWaitGroupNumWaiters(addr: number): number {
        return this.getByteAtOffset(addr, WAIT_GROUP_NUM_WAITERS_OFFSET);
    }

    setWaitGroupNumWaiters(addr: number, value: number) {
        this.setByteAtOffset(addr, WAIT_GROUP_NUM_WAITERS_OFFSET, value);
    }

    getWaitGroupWaiters(addr: number): number[] {
        const size = this.getWaitGroupNumWaiters(addr);
        const waiters: number[] = [];
        for (let i = 0; i < size; i++) {
            waiters.push(this.getChild(addr, i));
        }
        // reset waiters
        this.setWaitGroupNumWaiters(addr, 0);

        return waiters;
    }

    addWaitGroupWaiter(addr: number, goroutineId: number) {
        const size = this.getWaitGroupNumWaiters(addr);

        if (size === NODE_SIZE - 1) {
            throw new Error("panic: waitgroup is full");
        }

        this.setChild(addr, size, goroutineId);
        this.setWaitGroupNumWaiters(addr, size + 1);
    }

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
        throw new Error("mem error: tried to box unsupported type " + typeof obj + " " + obj);
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
            case Tag.IntChannel:
                return addr;
            case Tag.WaitGroup:
                return addr;
            default:
                throw new Error("mem error: tried to unbox unsupported tag " + Tag[tag]);
        }
    }

    /*
     * Functions to check tags
     */
    isNil(addr: number): boolean {
        return this.getTag(addr) === Tag.Nil;
    }

    isUnassigned(addr: number): boolean {
        return this.getTag(addr) === Tag.Unassigned;
    }

    isTrue(addr: number): boolean {
        return this.getTag(addr) === Tag.True;
    }

    isFalse(addr: number): boolean {
        return this.getTag(addr) === Tag.False;
    }

    isBoolean(addr: number): boolean {
        return this.getTag(addr) === Tag.True || this.getTag(addr) === Tag.False;
    }

    isInt(addr: number): boolean {
        return this.getTag(addr) === Tag.Int;
    }

    isBuiltin(addr: number): boolean {
        return this.getTag(addr) === Tag.Builtin;
    }

    isEnvironment(addr: number): boolean {
        return this.getTag(addr) === Tag.Environment;
    }

    isFrame(addr: number): boolean {
        return this.getTag(addr) === Tag.Frame;
    }

    isCallframe(addr: number): boolean {
        return this.getTag(addr) === Tag.Callframe;
    }

    isBlockframe(addr: number): boolean {
        return this.getTag(addr) === Tag.Blockframe;
    }

    isClosure(addr: number): boolean {
        return this.getTag(addr) === Tag.Closure;
    }

    isIntChannel(addr: number): boolean {
        return this.getTag(addr) === Tag.IntChannel;
    }

    isWaitQueue(addr: number): boolean {
        return this.getTag(addr) === Tag.WaitQueue;
    }

    isWaitGroup(addr: number): boolean {
        return this.getTag(addr) === Tag.WaitGroup;
    }

    /*
     * Mark sweep garbage collection functions
     */
    markSweep() {
        const allActiveRoots: number[] = this.computeRoots();

        // console.log("all roots", allActiveRoots.map((addr) => [addr, Tag[this.getTag(addr)]]));

        for (const root of allActiveRoots) {
            this.mark(root);
        }

        this.sweep();
    }

    computeRoots(): number[] {
        const allActiveRoots: number[] = [];
        const contexts = this.machine.goroutineContexts;
        const currentGoroutineId = this.machine.scheduler.currentGoroutine();
        
        // we do this because the current goroutine's roots might not be up to date with that in the contexts map
        // note: we do this for env only because it is passed by value to the map
        // opstack and runtime stack are passed by reference so their values are always up to date
        for (let [g, ctx] of contexts.entries()) {
            if (g !== currentGoroutineId) {
                allActiveRoots.push(ctx.env);
            } else {
                allActiveRoots.push(this.machine.env);
            }
            allActiveRoots.push(...ctx.opStack);
            allActiveRoots.push(...ctx.runtimeStack);
        }

        for (let addr of this.allocating) {
            allActiveRoots.push(addr);
        }

        return allActiveRoots;
    }

    mark(addr: number) {
        if (addr >= this.heapSize || this.getMarked(addr) === MarkedStatus.Marked) {
            return;
        }

        this.setMarked(addr, MarkedStatus.Marked);

        // add special marking for waitqueues due to structure of its children
        if (this.isWaitQueue(addr)) {
            this.markWaitQueue(addr);
            return;
        }

        const numChildren = this.getNumChildren(addr);
        for (let i = 0; i < numChildren; i++) {
            this.mark(this.getChild(addr, i));
        }
    }

    markWaitQueue(wqAddr: number) {
        const numChildren = this.getNumChildren(wqAddr);
        for (let i = 0; i < numChildren; i++) {
            const valueAddr = this.getSecondFourBytesOfChild(wqAddr, i); // ints in sudog structs
            this.mark(valueAddr);
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
        this.setWord(addr, this.freeIndex);
        this.freeIndex = addr;
    }
}

