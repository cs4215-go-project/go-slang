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

    func trueIfTwo(x int) bool {
        if x == 2 {
            return true
        }
        println(101)
        return false
    }

    func main() {
        println(trueIfTwo(3))
        return trueIfTwo(2)
    }
`;

describe("debug", () => {
    test("debug", async () => {
        const result = await parseCompileAndRun(1024, program, setOutputStub);
        expect(result).toBe(true);
    });
});