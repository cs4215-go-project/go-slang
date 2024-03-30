import { describe, expect, test } from '@jest/globals';
import Machine from '../../src/vm/machine';
import Compiler from '../../src/vm/compiler';

class CompilerStub extends Compiler {
    constructor(instrs: any[]) {
        super(null);
        this.instrs = instrs;
    }

    compile(program: any): void {
        if (program === null) {
            return;
        }
    }
}

describe("binary expression", () => {
    const simpleBinInstructions = (op: string, v1, v2) => {
        return [
            { opcode: "LDC", value: v1 },
            { opcode: "LDC", value: v2 },
            { opcode: "BINOP", operator: op },
            { opcode: "DONE" },
        ];
    };

    test("addition", () => {
        const compiler = new CompilerStub(simpleBinInstructions("+", 420, 643));
        const machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(1063);
    });

    test("subtraction", () => {
        const compiler = new CompilerStub(simpleBinInstructions("-", 42, 65));
        const machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(-23);
    });

    test("multiplication", () => {
        const compiler = new CompilerStub(simpleBinInstructions("*", 4, 6));
        const machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(24);
    });

    test("division", () => {
        const compiler = new CompilerStub(simpleBinInstructions("/", 40, 6));
        const machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(6);
    });

    test("modulo", () => {
        const compiler = new CompilerStub(simpleBinInstructions("%", 40, 6));
        const machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(4);
    });

    test("less than / leq", () => {
        let compiler = new CompilerStub(simpleBinInstructions("<", 2, 3));
        let machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(true);

        compiler = new CompilerStub(simpleBinInstructions("<=", 3, 3));
        machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(true);
    });

    test("greater than / geq", () => {
        let compiler = new CompilerStub(simpleBinInstructions(">", 3, 2));
        let machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(true);

        compiler = new CompilerStub(simpleBinInstructions(">=", 3, 3));
        machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(true);
    });

    test("equal / not equal", () => {
        let compiler = new CompilerStub(simpleBinInstructions("==", 3, 3));
        let machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(true);

        compiler = new CompilerStub(simpleBinInstructions("!=", 3, 2));
        machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(true);
    });

    test("logical and / or", () => {
        let compiler = new CompilerStub(simpleBinInstructions("&&", true, false));
        let machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(false);

        compiler = new CompilerStub(simpleBinInstructions("||", true, false));
        machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(true);
    });
});

describe("unary expression", () => {
    const simpleUnaryInstructions = (op: string, v) => {
        return [
            { opcode: "LDC", value: v },
            { opcode: "UNOP", operator: op },
            { opcode: "DONE" },
        ];
    };

    test("negation", () => {
        const compiler = new CompilerStub(simpleUnaryInstructions("-", 42));
        const machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(-42);
    });

    test("logical not", () => {
        const compiler = new CompilerStub(simpleUnaryInstructions("!", true));
        const machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(false);
    });
});

describe("more complex expressions", () => {
    test("precedence", () => {
        // 2 * 3 + 4
        const compiler = new CompilerStub([
            { opcode: "LDC", value: 2 },
            { opcode: "LDC", value: 3 },
            { opcode: "BINOP", operator: "*" },
            { opcode: "LDC", value: 4 },
            { opcode: "BINOP", operator: "+" },
            { opcode: "DONE" },
        ]);
        const machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(10);
    });

    test("parentheses", () => {
        // 2 * (3 + 4)
        const compiler = new CompilerStub([
            { opcode: "LDC", value: 2 },
            { opcode: "LDC", value: 3 },
            { opcode: "LDC", value: 4 },
            { opcode: "BINOP", operator: "+" },
            { opcode: "BINOP", operator: "*" },
            { opcode: "DONE" },
        ]);
        const machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(14);
    });

    test("precedence and parentheses", () => {
        // 2 * (3 + 4) + 5
        const compiler = new CompilerStub([
            { opcode: "LDC", value: 2 },
            { opcode: "LDC", value: 3 },
            { opcode: "LDC", value: 4 },
            { opcode: "BINOP", operator: "+" },
            { opcode: "BINOP", operator: "*" },
            { opcode: "LDC", value: 5 },
            { opcode: "BINOP", operator: "+" },
            { opcode: "DONE" },
        ]);
        const machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(19);
    });

    test("binary and unary", () => {
        // -2 + 3 * 4
        const compiler = new CompilerStub([
            { opcode: "LDC", value: 2 },
            { opcode: "UNOP", operator: "-" },
            { opcode: "LDC", value: 3 },
            { opcode: "LDC", value: 4 },
            { opcode: "BINOP", operator: "*" },
            { opcode: "BINOP", operator: "+" },
            { opcode: "DONE" },
        ]);
        const machine = new Machine(256, compiler, null);

        expect(machine.run()).toBe(10);
    });
});

describe("unknown operator", () => {
    test("throws a binop error", () => {
        const compiler = new CompilerStub([
            { opcode: "LDC", value: 2 },
            { opcode: "LDC", value: 3 },
            { opcode: "BINOP", operator: "_" },
            { opcode: "DONE" },
        ]);
        const machine = new Machine(256, compiler, null);

        expect(() => machine.run()).toThrowError("Unknown binary operator: _");
    });

    test("throws an unop error", () => {
        const compiler = new CompilerStub([
            { opcode: "LDC", value: 2 },
            { opcode: "UNOP", operator: "_" },
            { opcode: "DONE" },
        ]);
        const machine = new Machine(256, compiler, null);

        expect(() => machine.run()).toThrowError("Unknown unary operator: _");
    });
});
