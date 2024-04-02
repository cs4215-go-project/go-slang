import { beforeEach, describe, expect, test } from "@jest/globals";
import Memory, { Tag, MarkedStatus, NODE_SIZE } from "../../../src/utils/memory/memory";

describe("fundamental Memory methods", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
    });

    test("set_word and get_word", () => {
        memory.set_word(0, 5);
        expect(memory.get_word(0)).toBe(5);
    });

    test("set_tag and get_tag", () => {
        memory.set_tag(0, Tag.Nil);
        expect(memory.get_tag(0)).toBe(Tag.Nil);
    });

    test("set_size and get_size", () => {
        memory.set_size(0, 2);
        expect(memory.get_size(0)).toBe(2);
    });

    test("set_marked and get_marked", () => {
        memory.set_marked(0, MarkedStatus.Marked);
        expect(memory.get_marked(0)).toBe(MarkedStatus.Marked);
    });

    test("set_child and get_child", () => {
        memory.set_child(0, 0, 5);
        expect(memory.get_child(0, 0)).toBe(5);
    });

    test("allocate_node", () => {
        expect(memory.allocate_node(Tag.Nil, 0)).toBe(0);
    });
});

describe("literal allocation", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
    });

    test("allocate_literals", () => {
        memory.allocate_literals();
        expect(memory.get_tag(NODE_SIZE * 0)).toBe(Tag.Nil);
        expect(memory.get_tag(NODE_SIZE * 1)).toBe(Tag.Unassigned);
        expect(memory.get_tag(NODE_SIZE * 2)).toBe(Tag.True);
        expect(memory.get_tag(NODE_SIZE * 3)).toBe(Tag.False);
    });
});

describe ("allocate integer", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
        memory.allocate_literals();
    });

    test("allocate_int", () => {
        const addr = memory.allocate_int(420);
        const expected_addr = NODE_SIZE * memory.literals.length;
        expect(addr).toBe(expected_addr);

        // check the node metadata
        expect(memory.get_tag(addr)).toBe(Tag.Int);
        expect(memory.get_size(addr)).toBe(2);
        expect(memory.get_marked(addr)).toBe(MarkedStatus.Unmarked);

        // check the payload
        expect(memory.get_int(addr)).toBe(420);
    });
});

describe("get boolean (preallocated)", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
        memory.allocate_literals();
    });

    test("get true address", () => {
        expect(memory.literals[Tag.True]).toBe(NODE_SIZE * 2);
    });

    test("get false address", () => {
        expect(memory.literals[Tag.False]).toBe(NODE_SIZE * 3);
    });
});

describe("non-multiple of NODE_SIZE initialization of memory", () => {
    test("initialize with 255 words", () => {
        expect(() => {
            let memory = new Memory(255);
        }).toThrowError("num_words must be a multiple of 16");
    });
});

describe("box", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
        memory.allocate_literals();
    });

    test("box boolean", () => {
        const addr = memory.box(true);
        expect(addr).toBe(NODE_SIZE * 2);
    });

    test("box integer", () => {
        const addr1 = memory.box(420);
        expect(addr1).toBe(NODE_SIZE * memory.literals.length);

        const addr2 = memory.box(42);
        expect(addr2).toBe(NODE_SIZE * memory.literals.length + NODE_SIZE);
    });
});
