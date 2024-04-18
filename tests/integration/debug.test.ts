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
        n := 10
        for i := 0; i < n; i = i + 2 {
            println(i)
        }
        
        for j := 1; j < n; j = j + 2 {
            println(i)
        }
    }
`;

describe("debug", () => {
    test("debug", async () => {
        const result = await parseCompileAndRun(1024, program, setOutputStub);
        // expect(result).toBe(true);
    });
});