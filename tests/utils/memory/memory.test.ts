import { beforeEach, describe, expect, test } from "@jest/globals";
import Memory, { Tag, MarkedStatus, NODE_SIZE } from "../../../src/utils/memory/memory";
import { BuiltinMetadata } from "../../../src/vm/machine";

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

describe("correct initialization", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
    });

    test("all next free addresses are correct", () => {
        for (let i = 0; i < 240; i += NODE_SIZE) {
            expect(memory.getWord(i)).toBe(i + NODE_SIZE);
        }
    });

    test("next free address of last node is -1", () => {
        expect(memory.getWord(240)).toBe(-1);
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

describe("box and unbox", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
        memory.allocateLiterals();
    });

    test("box boolean", () => {
        const addr = memory.box(true);
        expect(addr).toBe(NODE_SIZE * 2);
        expect(memory.getTag(addr)).toBe(Tag.True);
        expect(memory.getSize(addr)).toBe(1);
        expect(memory.getNumChildren(addr)).toBe(0);
    });

    test("box integer", () => {
        const addr1 = memory.box(420);
        expect(addr1).toBe(NODE_SIZE * memory.literals.length);
        expect(memory.getTag(addr1)).toBe(Tag.Int);
        expect(memory.getSize(addr1)).toBe(2);
        expect(memory.getNumChildren(addr1)).toBe(0);
        expect(memory.unbox(addr1)).toBe(420);

        const addr2 = memory.box(42);
        expect(addr2).toBe(NODE_SIZE * memory.literals.length + NODE_SIZE);
    });
});

describe("allocate frame", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
        memory.allocateLiterals();
    });

    test("allocate frame", () => {
        const numDeclarations = 3;
        const frame = memory.allocateFrame(numDeclarations);
        expect(memory.getTag(frame)).toBe(Tag.Frame);
        expect(memory.getSize(frame)).toBe(4);
        expect(memory.getNumChildren(frame)).toBe(3);
    });
});

describe("allocate builtins", () => {
    let memory: Memory;

    const metadata: BuiltinMetadata = {
        "builtin1": { id: 0, arity: 3 },
        "builtin2": { id: 1, arity: 2 },
        "builtin3": { id: 2, arity: 4 },
        "builtin4": { id: 3, arity: 1 },
    }

    beforeEach(() => {
        memory = new Memory(256);
        memory.allocateLiterals();
    });

    test("allocate builtins", () => {
        memory.allocateBuiltinsFrame(metadata);

        expect(memory.getTag(NODE_SIZE * 4)).toBe(Tag.Frame);
        expect(memory.getSize(NODE_SIZE * 4)).toBe(Object.values(metadata).length + 1);
        expect(memory.getNumChildren(NODE_SIZE * 4)).toBe(Object.values(metadata).length);

        for (let i = 0; i < memory.getNumChildren(NODE_SIZE * 4); i++) {
            expect(memory.getChild(NODE_SIZE * 4, i)).toBe(NODE_SIZE * (4 + i + 1));
            expect(memory.getTag(NODE_SIZE * (4 + i + 1))).toBe(Tag.Builtin);
        }

        expect(memory.getTag(NODE_SIZE * 5)).toBe(Tag.Builtin);
        expect(memory.getBuiltinId(NODE_SIZE * 5)).toBe(0);
        expect(memory.getBuiltinArity(NODE_SIZE * 5)).toBe(3);

        expect(memory.getTag(NODE_SIZE * 6)).toBe(Tag.Builtin);
        expect(memory.getBuiltinId(NODE_SIZE * 6)).toBe(1);
        expect(memory.getBuiltinArity(NODE_SIZE * 6)).toBe(2);
        
        expect(memory.getTag(NODE_SIZE * 7)).toBe(Tag.Builtin);
        expect(memory.getBuiltinId(NODE_SIZE * 7)).toBe(2);
        expect(memory.getBuiltinArity(NODE_SIZE * 7)).toBe(4);

        expect(memory.getTag(NODE_SIZE * 8)).toBe(Tag.Builtin);
        expect(memory.getBuiltinId(NODE_SIZE * 8)).toBe(3);
        expect(memory.getBuiltinArity(NODE_SIZE * 8)).toBe(1);
    });
});


describe("allocate closure", () => { 
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
        memory.allocateLiterals();
    });

    test("allocate closure", () => {
        const addr = memory.allocateClosure(3, 150, 128);
        expect(memory.getTag(addr)).toBe(Tag.Closure);
        expect(memory.getSize(addr)).toBe(2);
        expect(memory.getNumChildren(addr)).toBe(1);

        expect(memory.getClosureArity(addr)).toBe(3);
        expect(memory.getClosurePc(addr)).toBe(150);
        expect(memory.getClosureEnv(addr)).toBe(128);
    });
});

describe("allocate callframe", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
        memory.allocateLiterals();
    });

    test("allocate callframe", () => {
        const addr = memory.allocateCallframe(150, 128);
        expect(memory.getTag(addr)).toBe(Tag.Callframe);
        expect(memory.getSize(addr)).toBe(2);
        expect(memory.getNumChildren(addr)).toBe(1);

        expect(memory.getCallframePc(addr)).toBe(150);
        expect(memory.getCallframeEnv(addr)).toBe(128);
    });
});

describe("allocate blockframe", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(256);
        memory.allocateLiterals();
    });

    test("allocate blockframe", () => {
        const addr = memory.allocateBlockframe(96);
        expect(memory.getTag(addr)).toBe(Tag.Blockframe);
        expect(memory.getSize(addr)).toBe(2);
        expect(memory.getNumChildren(addr)).toBe(1);

        expect(memory.getBlockframeParentEnv(addr)).toBe(96);
    });
});

describe("environment operations", () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory(192);
        memory.allocateLiterals();
    });

    test("basic environment allocation", () => {
        const addr = memory.allocateEnv(5);
        expect(memory.getTag(addr)).toBe(Tag.Environment);
        expect(memory.getSize(addr)).toBe(6);
        expect(memory.getNumChildren(addr)).toBe(5);
    });

    test("environment extension", () => {
        const envAddr = memory.allocateEnv(0);
        expect(memory.getTag(envAddr)).toBe(Tag.Environment);       
        expect(memory.getSize(envAddr)).toBe(1);
        expect(memory.getNumChildren(envAddr)).toBe(0);

        const frameAddr = memory.allocateFrame(3); // extend the env with this frame
        
        const extendedEnvAddr = memory.extendEnv(envAddr, frameAddr);
        expect(memory.getTag(extendedEnvAddr)).toBe(Tag.Environment);
        expect(memory.getSize(extendedEnvAddr)).toBe(2);
        expect(memory.getNumChildren(extendedEnvAddr)).toBe(1);
        expect(memory.getChild(extendedEnvAddr, 0)).toBe(frameAddr);
    });

    test("environment lookup", () => {
        const envAddr = memory.allocateEnv(0);
        const frameAddr = memory.allocateFrame(3);
        for (let i = 0; i < memory.getNumChildren(frameAddr); i++) {
            memory.setChild(frameAddr, i, memory.literals[Tag.Unassigned]); 
        }

        const extendedEnvAddr = memory.extendEnv(envAddr, frameAddr);

        const compileTimePos1: [number, number] = [0, 0];
        const compileTimePos2: [number, number] = [0, 1];
        const compileTimePos3: [number, number] = [0, 2];

        //should be unassigned before we set
        const preAssignAddr1 = memory.getValueFromEnv(extendedEnvAddr, compileTimePos1);
        expect(memory.unbox(preAssignAddr1)).toBe(undefined);

        const preAssignAddr2 = memory.getValueFromEnv(extendedEnvAddr, compileTimePos2);
        expect(memory.unbox(preAssignAddr2)).toBe(undefined);

        const preAssignAddr3 = memory.getValueFromEnv(extendedEnvAddr, compileTimePos3);
        expect(memory.unbox(preAssignAddr3)).toBe(undefined);

        memory.setValueInEnv(extendedEnvAddr, compileTimePos1, memory.box(42));
        memory.setValueInEnv(extendedEnvAddr, compileTimePos2, memory.box(420));
        memory.setValueInEnv(extendedEnvAddr, compileTimePos3, memory.box(4200));

        const varAddr1 = memory.getValueFromEnv(extendedEnvAddr, compileTimePos1);
        expect(memory.unbox(varAddr1)).toBe(42);

        const varAddr2 = memory.getValueFromEnv(extendedEnvAddr, compileTimePos2);
        expect(memory.unbox(varAddr2)).toBe(420);

        const varAddr3 = memory.getValueFromEnv(extendedEnvAddr, compileTimePos3);
        expect(memory.unbox(varAddr3)).toBe(4200);
    });
});
