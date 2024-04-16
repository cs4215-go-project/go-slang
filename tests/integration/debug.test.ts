import { describe, expect, test } from "@jest/globals";
import parseCompileAndRun from "../../src/vm/machine";

export {};

let arr = []
const setOutputStub = (output: any) => {
    arr = output(arr)
    console.log(arr.join('\n'))
};

const program = `
    package main

    func main() {
        for i := 0; i < 12; i = i + 3 {
            j := i
        }
    }
`;

describe("debug", () => {
    test("debug", async () => {
        const result = await parseCompileAndRun(1024, program, setOutputStub);
        // expect(result).toBe(true);
    });
});