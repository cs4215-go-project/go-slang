import { describe, expect, test } from "@jest/globals";
import parse from "../../parser/parser";
import Machine from "../../src/vm/machine";
import { compile, Instruction } from '../../src/vm/compiler';

const setOutputStub = (output: any) => {};

describe("binary expression", () => {
    test("addition", () => {
        const input = `
package main

func main() {
    1+5*10
}
        `

        const machine = new Machine(256, compile(parse(input)), setOutputStub);
        const result = machine.run()
        expect(result).toBe(51);
    })

    test("-10", () => {
        const input = `
package main

func main() {
    -10
}
        `

        const machine = new Machine(256, compile(parse(input)), setOutputStub);
        const result = machine.run()
        expect(result).toBe(-10);
    })
})
