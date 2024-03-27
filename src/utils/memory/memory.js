"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var WORD_SIZE = 8; // bytes
var NODE_SIZE = 16; // words
// unused node offsets (none for now)
var NEXT_NODE_OFFSET = 0;
// used node offsets
var TAG_OFFSET = 0;
var NUM_CHILDREN_OFFSET = 1;
var MARKED_OFFSET = 2;
// Golang type tags
var Tag;
(function (Tag) {
    Tag[Tag["Nil"] = 0] = "Nil";
    Tag[Tag["Unassigned"] = 1] = "Unassigned";
    Tag[Tag["True"] = 2] = "True";
    Tag[Tag["False"] = 3] = "False";
    Tag[Tag["Int"] = 4] = "Int";
    Tag[Tag["Float"] = 5] = "Float";
    Tag[Tag["String"] = 6] = "String";
})(Tag || (Tag = {}));
var MarkedStatus;
(function (MarkedStatus) {
    MarkedStatus[MarkedStatus["Unmarked"] = 0] = "Unmarked";
    MarkedStatus[MarkedStatus["Marked"] = 1] = "Marked";
})(MarkedStatus || (MarkedStatus = {}));
var Memory = /** @class */ (function () {
    function Memory(num_words) {
        // for equally-sized nodes; TODO: can maybe pass in num_nodes as constructor argument
        if (num_words % NODE_SIZE !== 0) {
            var msg = "num_words must be a multiple of " + NODE_SIZE;
            throw new Error(msg);
        }
        this.data = new ArrayBuffer(num_words * WORD_SIZE);
        this.view = new DataView(this.data);
        this.free_index = 0;
        // initialize free list
        for (var i = 0; i < num_words; i += NODE_SIZE) {
            this.set_word(i, i + NODE_SIZE);
        }
        // last word of free list is -1
        this.set_word((num_words - 1), -1);
    }
    /*
     * Memory access & metadata functions
     */
    // set and get a word (8 bytes) at word index (used for setting)
    Memory.prototype.set_word = function (index, value) {
        this.view.setFloat64(index * WORD_SIZE, value);
    };
    Memory.prototype.get_word = function (index) {
        return this.view.getFloat64(index * WORD_SIZE);
    };
    // set and get a used node's tag; index is word index
    Memory.prototype.set_tag = function (index, tag) {
        this.view.setUint8(index * WORD_SIZE + TAG_OFFSET, tag);
    };
    Memory.prototype.get_tag = function (index) {
        return this.view.getUint8(index * WORD_SIZE + TAG_OFFSET);
    };
    // set and get a used node's number of children; index is word index
    Memory.prototype.set_num_children = function (index, num_children) {
        this.view.setUint8(index * WORD_SIZE + NUM_CHILDREN_OFFSET, num_children);
    };
    Memory.prototype.get_num_children = function (index) {
        return this.view.getUint8(index * WORD_SIZE + NUM_CHILDREN_OFFSET);
    };
    // set and get a used node's marked flag; index is word index
    Memory.prototype.set_marked = function (index, marked) {
        this.view.setUint8(index * WORD_SIZE + MARKED_OFFSET, marked);
    };
    Memory.prototype.get_marked = function (index) {
        return this.view.getUint8(index * WORD_SIZE + MARKED_OFFSET);
    };
    // set and get a used node's payload/children; index is word index
    Memory.prototype.set_child = function (index, child_index, value) {
        this.set_word(index + child_index + 1, value);
    };
    Memory.prototype.get_child = function (index, child_index) {
        return this.get_word(index + child_index + 1);
    };
    /*
     * Allocator functions
     */
    // allocates node metadata, called prior to allocating payload/children
    Memory.prototype.allocate_node = function (tag, num_children) {
        if (this.free_index === -1) {
            throw new Error("Out of memory");
        }
        var node_index = this.free_index;
        this.free_index = this.get_word(node_index);
        this.set_tag(node_index, tag);
        this.set_num_children(node_index, num_children);
        this.set_marked(node_index, 0);
        return node_index;
    };
    // allocate literal values
    Memory.prototype.allocate_literals = function () {
        var nil_index = this.allocate_node(Tag.Nil, 0);
        var unassigned_index = this.allocate_node(Tag.Unassigned, 0);
        var true_index = this.allocate_node(Tag.True, 0);
        var false_index = this.allocate_node(Tag.False, 0);
        return [nil_index, unassigned_index, true_index, false_index];
    };
    // allocate int
    Memory.prototype.allocate_int = function (value) {
        var node_index = this.allocate_node(Tag.Int, 1);
        this.set_child(node_index, 0, value);
        return node_index;
    };
    Memory.prototype.get_int = function (index) {
        return this.get_child(index, 0);
    };
    // allocate float
    Memory.prototype.allocate_float = function (value) {
        var node_index = this.allocate_node(Tag.Float, 1);
        this.set_child(node_index, 0, value);
        return node_index;
    };
    Memory.prototype.get_float = function (index) {
        return this.get_child(index, 0);
    };
    return Memory;
}());
exports.default = Memory;
// test Memory
var mem = new Memory(256);
var _a = mem.allocate_literals(), nil_index = _a[0], unassigned_index = _a[1], true_index = _a[2], false_index = _a[3];
console.log(mem.get_tag(nil_index)); // Tag.Nil
console.log(mem.get_tag(unassigned_index)); // Tag.Unassigned
console.log(mem.get_tag(true_index)); // Tag.True
console.log(mem.get_tag(false_index)); // Tag.False
var int_index = mem.allocate_int(42);
console.log(mem.get_tag(int_index)); // Tag.Int
console.log(mem.get_num_children(int_index)); // 1
console.log(mem.get_marked(int_index)); // MarkedStatus.Unmarked
console.log(mem.get_int(int_index)); // 42
var float_index = mem.allocate_float(3.14);
console.log(mem.get_tag(float_index)); // Tag.Float
console.log(mem.get_num_children(float_index)); // 1
console.log(mem.get_marked(float_index)); // MarkedStatus.Unmarked
console.log(mem.get_float(float_index)); // 3.14
