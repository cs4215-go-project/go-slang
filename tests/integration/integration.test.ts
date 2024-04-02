import { describe, expect, test } from "@jest/globals";
import parseCompileAndRun from "../../src/vm/machine";

const setOutputStub = (output: any) => {};

describe("binary expression", () => {
    test("addition", () => {
        const input = `
package main

func main() {
    1+5*10
}
        `

        const result = parseCompileAndRun(512, input, setOutputStub);
        expect(result).toBe(51);
    })

    test("-10", () => {
        const input = `
package main

func main() {
    -10
}
        `

        const result = parseCompileAndRun(512, input, setOutputStub);
        expect(result).toBe(-10);
    })
})
