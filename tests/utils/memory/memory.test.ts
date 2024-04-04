import { beforeEach, describe, expect, test } from "@jest/globals";
import Memory, { Tag, MarkedStatus, NODE_SIZE } from "../../../src/utils/memory/memory";

describe("fundamental Memory methods", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
    });

    test("setWord and getWord", () => {
        memory.setWord(0, 5);
        expect(memory.getWord(0)).toBe(5);
    });

    test("setTag and getTag", () => {
        memory.setTag(0, Tag.Nil);
        expect(memory.getTag(0)).toBe(Tag.Nil);
    });

    test("setSize and getSize", () => {
        memory.setSize(0, 2);
        expect(memory.getSize(0)).toBe(2);
    });

    test("setMarked and getMarked", () => {
        memory.setMarked(0, MarkedStatus.Marked);
        expect(memory.getMarked(0)).toBe(MarkedStatus.Marked);
    });

    test("setChild and getChild", () => {
        memory.setChild(0, 0, 5);
        expect(memory.getChild(0, 0)).toBe(5);
    });

    test("allocateNode", () => {
        expect(memory.allocateNode(Tag.Nil, 1)).toBe(0);
    });
});

describe("literal allocation", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
    });

    test("allocate literals", () => {
        memory.allocateLiterals();
        expect(memory.getTag(NODE_SIZE * 0)).toBe(Tag.Nil);
        expect(memory.getTag(NODE_SIZE * 1)).toBe(Tag.Unassigned);
        expect(memory.getTag(NODE_SIZE * 2)).toBe(Tag.True);
        expect(memory.getTag(NODE_SIZE * 3)).toBe(Tag.False);
    });
});

describe ("allocate integer", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
        memory.allocateLiterals();
    });

    test("allocateInt", () => {
        const addr = memory.allocateInt(420);
        const expected_addr = NODE_SIZE * memory.literals.length;
        expect(addr).toBe(expected_addr);

        // check the node metadata
        expect(memory.getTag(addr)).toBe(Tag.Int);
        expect(memory.getSize(addr)).toBe(2);
        expect(memory.getMarked(addr)).toBe(MarkedStatus.Unmarked);

        // check the payload
        expect(memory.getIntValue(addr)).toBe(420);
    });
});

describe("get boolean (preallocated)", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
        memory.allocateLiterals();
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
        }).toThrowError("numWords must be a multiple of 16");
    });
});

describe("box", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
        memory.allocateLiterals();
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
