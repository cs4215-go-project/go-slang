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
 * [tag, numChildren, marked][...payload/children]
 * 1 byte, 1 byte, 1 byte, 5 bytes unused
 */

export const WORD_SIZE: number = 8; // bytes
export const NODE_SIZE: number = 16; // words

// unused node offsets (none for now)
const NEXT_NODE_OFFSET: number = 0;

// used node offsets
const TAG_OFFSET: number = 0;
const NUM_CHILDREN_OFFSET: number = 1;
const MARKED_OFFSET: number = 2;

// Golang type tags
export enum Tag {
    Nil,
    Unassigned,
    True,
    False,
    Int, // 64-bit signed integer
    String,
}

export enum MarkedStatus {
    Unmarked,
    Marked,
}

export default class Memory {
    private data: ArrayBuffer;
    private view: DataView;
    public free_index: number;
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

    // set and get a used node's number of children; index is word index
    set_num_children(index: number, num_children: number): void {
        this.view.setUint8(index * WORD_SIZE + NUM_CHILDREN_OFFSET, num_children);
    }

    get_num_children(index: number): number {
        return this.view.getUint8(index * WORD_SIZE + NUM_CHILDREN_OFFSET);
    }

    // set and get a used node's marked flag; index is word index
    set_marked(index: number, marked: MarkedStatus): void {
        this.view.setUint8(index * WORD_SIZE + MARKED_OFFSET, marked as number);
    }

    get_marked(index: number): MarkedStatus {
        return this.view.getUint8(index * WORD_SIZE + MARKED_OFFSET) as MarkedStatus;
    }

    // set and get a used node's payload/children; index is word index
    set_child(index: number, child_index: number, value: number): void {
        this.set_word(index + child_index + 1, value);
    }

    get_child(index: number, child_index: number): number {
        return this.get_word(index + child_index + 1);
    }

    /*
     * Allocator functions
     */

    // allocates node metadata, called prior to allocating payload/children
    allocate_node(tag: Tag, num_children: number): number {
        if (this.free_index === -1) {
            throw new Error("Out of memory");
        }

        const node_index: number = this.free_index;
        this.free_index = this.get_word(node_index);

        this.set_tag(node_index, tag);
        this.set_num_children(node_index, num_children);
        this.set_marked(node_index, 0);

        return node_index;
    }

    // allocate literal values
    allocate_literals(): void {
        const nil_index: number = this.allocate_node(Tag.Nil, 0);
        const unassigned_index: number = this.allocate_node(Tag.Unassigned, 0);
        const true_index: number = this.allocate_node(Tag.True, 0);
        const false_index: number = this.allocate_node(Tag.False, 0);

        this.literals = [nil_index, unassigned_index, true_index, false_index];
    }

    // allocate builtin functions: make, println, etc
    allocate_builtins(): void {
        // TODO
    }

    // allocate global declarations
    allocate_globals(): void {
        // TODO
    }

    // allocate int
    allocate_int(value: number): number {
        const node_index: number = this.allocate_node(Tag.Int, 1);
        this.set_child(node_index, 0, value);
        return node_index;
    }

    get_int(index: number): number {
        return this.get_child(index, 0);
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
            return this.allocate_int(obj);
        }
        throw new Error("Unsupported type");
    }

    // given an address, first interprets the tag, then unboxes and returns the value
    unbox(index: number): any {
        const tag: Tag = this.get_tag(index);
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
                return this.get_int(index);
            default:
                throw new Error("Unsupported type");
        }
    }
}
