type CompileTimeEnvironment = string[][];
type Program = {
    type: "SourceFile";
    [key: string]: any;
}

export type Instruction = {
    opcode: string;
    [key: string]: any; // any other fields
}

export default class Compiler {
    program: Program;
    wc: number;
    instrs: Instruction[];
    cte: CompileTimeEnvironment; // allows variables to be compiled with their position in the stack

    constructor(program: Program) {
        this.wc = 0;
        this.instrs = [];
        this.cte = [];
        this.program = program;
    }

    compile(program: Program): void {
        this.compileComp(program);
        this.instrs.push({ opcode: "DONE" });
    }

    compileComp(comp: any): void {
        switch (comp.type) {
            case "SourceFile": {
                this.compileComp(comp.body);
                break;
            }
            default: {
                throw new Error("Unknown component type: " + comp.type);
            }
        }
    }
}