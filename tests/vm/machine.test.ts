import { describe, expect, test } from '@jest/globals';
import { Machine } from '../../src/vm/machine';
import { Instruction } from '../../src/vm/compiler';

const setOutputStub = (output: any) => {};

describe("binary expression", () => {
    const simpleBinInstructions = (op: string, v1, v2): Instruction[] => {
        return [
            { opcode: "LDC", value: v1 },
            { opcode: "LDC", value: v2 },
            { opcode: "BINOP", operator: op },
            { opcode: "DONE" },
        ];
    };

    test("addition", () => {
        const instructions = simpleBinInstructions("+", 420, 643);
        const machine = new Machine(512, instructions, setOutputStub);

        expect(machine.run()).toBe(1063);
    });

    test("subtraction", () => {
        const instructions = simpleBinInstructions("-", 42, 65);
        const machine = new Machine(256, instructions, setOutputStub);

        expect(machine.run()).toBe(-23);
    });

    test("multiplication", () => {
        const instructions = simpleBinInstructions("*", 4, 6);
        const machine = new Machine(256, instructions, setOutputStub);

        expect(machine.run()).toBe(24);
    });

    test("division", () => {
        const instructions = simpleBinInstructions("/", 40, 6);
        const machine = new Machine(256, instructions, setOutputStub);

        expect(machine.run()).toBe(6);
    });

    test("modulo", () => {
        const instructions = simpleBinInstructions("%", 40, 6);
        const machine = new Machine(256, instructions, setOutputStub);

        expect(machine.run()).toBe(4);
    });

    test("less than / leq", () => {
        let instructions = simpleBinInstructions("<", 2, 3);
        let machine = new Machine(256, instructions, setOutputStub);

        expect(machine.run()).toBe(true);

        instructions = simpleBinInstructions("<=", 3, 3);
        machine = new Machine(256, instructions, setOutputStub);

        expect(machine.run()).toBe(true);
    });

    test("greater than / geq", () => {
        let instructions = simpleBinInstructions(">", 3, 2);
        let machine = new Machine(256, instructions, setOutputStub);

        expect(machine.run()).toBe(true);

        instructions = simpleBinInstructions(">=", 3, 3);
        machine = new Machine(256, instructions, setOutputStub);

        expect(machine.run()).toBe(true);
    });

    test("equal / not equal", () => {
        let instructions = simpleBinInstructions("==", 3, 3);
        let machine = new Machine(256, instructions, setOutputStub);

        expect(machine.run()).toBe(true);

        instructions = simpleBinInstructions("!=", 3, 2);
        machine = new Machine(256, instructions, setOutputStub);

        expect(machine.run()).toBe(true);
    });

    test("logical and / or", () => {
        let instructions = simpleBinInstructions("&&", true, false);
        let machine = new Machine(256, instructions, setOutputStub);
        expect(machine.run()).toBe(false);

        instructions = simpleBinInstructions("||", true, false);
        machine = new Machine(256, instructions, setOutputStub);

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
        const instructions = simpleUnaryInstructions("-", 42);
        const machine = new Machine(256, instructions, setOutputStub);

        expect(machine.run()).toBe(-42);
    });

    test("logical not", () => {
        const instructions = simpleUnaryInstructions("!", true);
        const machine = new Machine(256, instructions, setOutputStub);

        expect(machine.run()).toBe(false);
    });
});

describe("more complex expressions", () => {
    test("precedence", () => {
        // 2 * 3 + 4
        const instructions = [
            { opcode: "LDC", value: 2 },
            { opcode: "LDC", value: 3 },
            { opcode: "BINOP", operator: "*" },
            { opcode: "LDC", value: 4 },
            { opcode: "BINOP", operator: "+" },
            { opcode: "DONE" },
        ];
        const machine = new Machine(512, instructions, setOutputStub);

        expect(machine.run()).toBe(10);
    });

    test("parentheses", () => {
        // 2 * (3 + 4)
        const instructions = [
            { opcode: "LDC", value: 2 },
            { opcode: "LDC", value: 3 },
            { opcode: "LDC", value: 4 },
            { opcode: "BINOP", operator: "+" },
            { opcode: "BINOP", operator: "*" },
            { opcode: "DONE" },
        ];
        const machine = new Machine(512, instructions, setOutputStub);
        expect(machine.run()).toBe(14);
    });

    test("precedence and parentheses", () => {
        // 2 * (3 + 4) + 5
        const instructions = [
            { opcode: "LDC", value: 2 },
            { opcode: "LDC", value: 3 },
            { opcode: "LDC", value: 4 },
            { opcode: "BINOP", operator: "+" },
            { opcode: "BINOP", operator: "*" },
            { opcode: "LDC", value: 5 },
            { opcode: "BINOP", operator: "+" },
            { opcode: "DONE" },
        ];
        const machine = new Machine(512, instructions, setOutputStub);

        expect(machine.run()).toBe(19);
    });

    test("binary and unary", () => {
        // -2 + 3 * 4
        const instructions = [
            { opcode: "LDC", value: 2 },
            { opcode: "UNOP", operator: "-" },
            { opcode: "LDC", value: 3 },
            { opcode: "LDC", value: 4 },
            { opcode: "BINOP", operator: "*" },
            { opcode: "BINOP", operator: "+" },
            { opcode: "DONE" },
        ];
        const machine = new Machine(512, instructions, setOutputStub);

        expect(machine.run()).toBe(10);
    });
});

describe("unknown operator", () => {
    test("throws a binop error", () => {
        const instructions = [
            { opcode: "LDC", value: 2 },
            { opcode: "LDC", value: 3 },
            { opcode: "BINOP", operator: "_" },
            { opcode: "DONE" },
        ];
        const machine = new Machine(256, instructions, setOutputStub);

        expect(() => machine.run()).toThrowError("Unknown binary operator: _");
    });

    test("throws an unop error", () => {
        const instructions = [
            { opcode: "LDC", value: 2 },
            { opcode: "UNOP", operator: "_" },
            { opcode: "DONE" },
        ];
        const machine = new Machine(256, instructions, setOutputStub);

        expect(() => machine.run()).toThrowError("Unknown unary operator: _");
    });
});

describe("variable declaration", () => {
    test("basic declaration and usage", () => {
        /*
         * in func main():
         *  const x = 2
         *  x + 3
         */ 
        const instructions = [
            { opcode: "ENTER_SCOPE", numDeclarations: 1 },
            { opcode: "LDC", value: 2 },
            { opcode: "ASSIGN", compilePos: [ 1, 0 ] },
            { opcode: "POP" },
            { opcode: "LD", sym: "x", compilePos: [ 1, 0 ] },
            { opcode: "LDC", value: 3 },
            { opcode: "BINOP", operator: "+" },
            { opcode: "EXIT_SCOPE" },
            { opcode: "DONE" }
        ];

        const machine = new Machine(256, instructions, setOutputStub);
        expect(machine.run()).toBe(5);
    });

    test("declaration with block scope", () => {
        /*
         * in func main():
         * const x = 20
         * {
         *  const y = 33
         *  x * y
         * }
         */
        const instructions = [
            { opcode: "ENTER_SCOPE", numDeclarations: 1 },
            { opcode: "LDC", value: 20 },
            { opcode: "ASSIGN", compilePos: [ 1, 0 ] },
            { opcode: "POP" },
            { opcode: "ENTER_SCOPE", numDeclarations: 1 },
            { opcode: "LDC", value: 33 },
            { opcode: "ASSIGN", compilePos: [ 2, 0 ] },
            { opcode: "POP" },
            { opcode: "LD", sym: "x", compilePos: [ 1, 0 ] },
            { opcode: "LD", sym: "y", compilePos: [ 2, 0 ] },
            { opcode: "BINOP", operator: "*" },
            { opcode: "EXIT_SCOPE" },
            { opcode: "EXIT_SCOPE" },
            { opcode: "DONE" }
        ];

        const machine = new Machine(512, instructions, setOutputStub);
        expect(machine.run()).toBe(660);
    });

    test("use of undeclared variable", () => {
        /*
         * in func main():
         *   x
         */
        const instructions = [
            { opcode: "ENTER_SCOPE", numDeclarations: 1 },
            { opcode: "LD", sym: "x", compilePos: [ 1, 0 ] },
            { opcode: "EXIT_SCOPE" },
            { opcode: "DONE" }
        ];

        const machine = new Machine(256, instructions, setOutputStub);
        expect(() => machine.run()).toThrowError("Variable 'x' used before assignment");
    });
});
