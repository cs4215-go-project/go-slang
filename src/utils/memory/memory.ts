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

import { BuiltinMetadata } from "../../vm/machine";

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
    public free_index: number;
    public heap_bottom: number;
    public allocating: number[]; // for garbage collection
    public literals: [number, number, number, number];    
    
    constructor(num_words: number) {
        // for equally-sized nodes; TODO: can maybe pass in num_nodes as constructor argument
        if (num_words % NODE_SIZE !== 0) {
            const msg: string = "num_words must be a multiple of " + NODE_SIZE;
            throw new Error(msg);
        }

        this.data = new ArrayBuffer(num_words * WORD_SIZE);
        this.view = new DataView(this.data);
        this.free_index = 0;
        this.heap_bottom = 0;
        this.literals = [0, 0, 0, 0];

        // initialize free list
        for (let i = 0; i < num_words; i += NODE_SIZE) {
            this.set_word(i, i + NODE_SIZE);
        }

        // last word of free list is -1
        this.set_word((num_words - 1), -1);
    }

    /*
     * Memory access & metadata functions
     */

    // set and get a word (8 bytes) at word index (used for setting)
    set_word(index: number, value: number): void {
        this.view.setFloat64(index * WORD_SIZE, value);
    }

    get_word(index: number): number {
        return this.view.getFloat64(index * WORD_SIZE);
    }

    // set and get a used node's tag; index is word index
    set_tag(index: number, tag: Tag): void {
        this.view.setUint8(index * WORD_SIZE + TAG_OFFSET, tag as number);
    }

    get_tag(index: number): Tag {
        return this.view.getUint8(index * WORD_SIZE + TAG_OFFSET) as Tag;
    }

    // set and get a used node's size; index is word index
    set_size(index: number, size: number): void {
        this.view.setUint8(index * WORD_SIZE + SIZE_OFFSET, size);
    }

    get_size(index: number): number {
        return this.view.getUint8(index * WORD_SIZE + SIZE_OFFSET);
    }

    // set and get a used node's marked flag; index is word index
    set_marked(index: number, marked: MarkedStatus): void {
        this.view.setUint8(index * WORD_SIZE + MARKED_OFFSET, marked as number);
    }

    get_marked(index: number): MarkedStatus {
        return this.view.getUint8(index * WORD_SIZE + MARKED_OFFSET) as MarkedStatus;
    }

    // set specific byte in node's metadata
    set_byte_at_offset(index: number, offset: number, value: number): void {
        this.view.setUint8(index * WORD_SIZE + offset, value);
    }

    get_byte_at_offset(index: number, offset: number): number {
        return this.view.getUint8(index * WORD_SIZE + offset);
    }

    // set 4 bytes in node's metadata
    set_four_bytes_at_offset(index: number, offset: number, value: number): void {
        this.view.setInt32(index * WORD_SIZE + offset, value);
    }

    get_four_bytes_at_offset(index: number, offset: number): number {
        return this.view.getInt32(index * WORD_SIZE + offset);
    }

    // set and get a used node's payload/children; index is word index
    set_child(index: number, child_index: number, value: number): void {
        this.set_word(index + child_index + 1, value);
    }

    get_child(index: number, child_index: number): number {
        return this.get_word(index + child_index + 1);
    }

    // get the number of children a node has
    get_num_children(index: number): number {
        return this.get_tag(index) === Tag.Int 
                ? 0 
                : this.get_size(index) - 1;
    }

    /*
     * Allocator functions
     */

    // allocates node metadata, called prior to allocating payload/children
    allocate_node(tag: Tag, size: number): number {
        if (size < 1 || size > NODE_SIZE) {
            throw new Error("Invalid node size");
        }

        if (this.free_index === -1) {
            throw new Error("Out of memory"); // TODO: garbage collection
        }

        const node_addr: number = this.free_index;
        this.free_index = this.get_word(node_addr);

        this.set_tag(node_addr, tag);
        this.set_size(node_addr, size);
        this.set_marked(node_addr, 0);

        return node_addr;
    }

    // allocate literal values
    allocate_literals(): void {
        const nil_addr: number = this.allocate_node(Tag.Nil, 1);
        const unassigned_addr: number = this.allocate_node(Tag.Unassigned, 1);
        const true_addr: number = this.allocate_node(Tag.True, 1);
        const false_addr: number = this.allocate_node(Tag.False, 1);

        this.literals = [nil_addr, unassigned_addr, true_addr, false_addr];
    }

    /*
     * allocate frame
     * [tag, size, marked][declarations...]
     */
    allocate_frame(num_declarations: number): number {
        return this.allocate_node(Tag.Frame, num_declarations + 1);
    }

    // allocate builtin functions: make, println, etc
    allocate_builtins_frame(builtins_metadata: BuiltinMetadata): number {
        const values: any = Object.values(builtins_metadata);
        const mainframe_addr: number = this.allocate_frame(values.length);

        for (let i = 0; i < values.length; i++) {
            const builtin_id: number = values[i].id;
            const arity: number = values[i].arity;
            const builtin_addr = this.allocate_builtin(builtin_id, arity);
            this.set_child(mainframe_addr, i, builtin_addr);
        }

        return mainframe_addr;
    }

    // [tag, size, marked, builtin_id, arity][no children]
    allocate_builtin(builtin_id: number, arity: number): number {
        const addr: number = this.allocate_node(Tag.Builtin, 1);

        this.set_byte_at_offset(addr, BUILTIN_ID_OFFSET, builtin_id);
        this.set_byte_at_offset(addr, BUILTIN_ARITY_OFFSET, arity);

        return addr;
    }

    get_builtin_id(addr: number): number {
        return this.get_byte_at_offset(addr, BUILTIN_ID_OFFSET);
    }

    // allocate int
    allocate_int(value: number): number {
        const addr: number = this.allocate_node(Tag.Int, 2);
        this.set_child(addr, 0, value);
        return addr;
    }

    get_int(addr: number): number {
        return this.get_child(addr, 0);
    }

    /* 
     * allocate closure
     * [tag, size, marked, arity, pc, pc, pc, pc][env (only child)]
     *                     1 byte, 4 bytes pc
     */ 
    allocate_closure(arity: number, pc: number, env: number): number {
        const addr: number = this.allocate_node(Tag.Closure, 2);

        this.set_byte_at_offset(addr, CLOSURE_ARITY_OFFSET, arity);
        this.set_four_bytes_at_offset(addr, CLOSURE_PC_OFFSET, pc);
        this.set_child(addr, 0, env);

        return addr;
    }

    get_closure_arity(addr: number): number {
        return this.get_byte_at_offset(addr, CLOSURE_ARITY_OFFSET);
    }

    get_closure_pc(addr: number): number {
        return this.get_four_bytes_at_offset(addr, CLOSURE_PC_OFFSET);
    }

    get_closure_env(addr: number): number {
        return this.get_child(addr, 0);
    }

    /*
     * allocate callframe
     * [tag, size, marked, _ , pc, pc, pc, pc][env (only child)]
     */
    allocate_callframe(pc: number, env: number): number {
        const addr: number = this.allocate_node(Tag.Callframe, 2);

        this.set_four_bytes_at_offset(addr, CALLFRAME_PC_OFFSET, pc);
        this.set_child(addr, 0, env);

        return addr;
    }

    get_callframe_pc(addr: number): number {
        return this.get_four_bytes_at_offset(addr, CALLFRAME_PC_OFFSET);
    }

    get_callframe_env(addr: number): number {
        return this.get_child(addr, 0);
    }

    /*
     * allocate blockframe
     * [tag, size, marked][env (only child)]
     */
    allocate_blockframe(parent_env: number): number {
        const addr: number = this.allocate_node(Tag.Blockframe, 2);

        this.set_child(addr, 0, parent_env);

        return addr;
    }

    get_blockframe_parent_env(addr: number): number {
        return this.get_child(addr, 0);
    }

    /*
     * allocate environment
     * [tag, size, marked][frames...] (frames are children)
     */
    allocate_env(num_frames: number): number {
        const addr: number = this.allocate_node(Tag.Environment, num_frames + 1);
        return addr;
    }

    get_value_from_env(env_addr: number, compile_time_pos: [number, number]): number {
        const frame_index: number = compile_time_pos[0];
        const value_index: number = compile_time_pos[1];

        const frame_addr = this.get_child(env_addr, frame_index);
        return this.get_child(frame_addr, value_index);
    }

    set_value_in_env(env_addr: number, compile_time_pos: [number, number], value: number): void {
        const frame_index: number = compile_time_pos[0];
        const value_index: number = compile_time_pos[1];

        const frame_addr = this.get_child(env_addr, frame_index);
        this.set_child(frame_addr, value_index, value);
    }

    extend_env(frame_addr: number, env_addr: number): number {
        const old_size: number = this.get_size(env_addr);
        const new_env_addr = this.allocate_node(Tag.Environment, old_size + 1);

        let i;
        for (i = 0; i < old_size - 1; i++) {
            const frame = this.get_child(env_addr, i);
            this.set_child(new_env_addr, i, frame);
        }
        this.set_child(new_env_addr, i, frame_addr);

        return new_env_addr;
    }

    /*
     * TODO: allocate channel
     * [tag, size, marked, _][buffer, capacity] (this was copilot generated)
     */
    
    /*
     * Boxing and unboxing functions
     */

    // allocates an object in memory and returns its address
    box(obj: any): number {
        console.log(obj)
        if (typeof obj === "boolean") {
            return obj ? this.literals[Tag.True] : this.literals[Tag.False];
        } else if (obj === null) {
            return this.literals[Tag.Nil];
        } else if (obj === undefined) {
            return this.literals[Tag.Unassigned];
        } else if (typeof obj === "number") {
            return this.allocate_int(obj);
        }
        throw new Error("Unsupported type");
    }

    // given an address, first interprets the tag, then unboxes and returns the value
    unbox(addr: number): any {
        const tag: Tag = this.get_tag(addr);
        console.log(tag, addr)
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
                return this.get_int(addr);
            default:
                throw new Error("Unsupported type");
        }
    }
}
