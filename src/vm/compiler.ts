import { BinaryExpr, Block, BooleanLiteral, ExpressionStatement, FunctionDecl, GoNodeBase, IntegerLiteral, SourceFile, UnaryExpr } from "../../parser/ast";

type CompileTimeEnvironment = string[][];

export type Instruction = {
    opcode: string;
    [key: string]: any; // any other fields
}

let wc: number;
let instrs: Instruction[]
let cte: CompileTimeEnvironment; // allows variables to be compiled with their position in the stack

const compileComp = {
    "SourceFile": (comp: SourceFile) => {
        comp.declarations.forEach(compileHelper);
    },
    "FunctionDecl": (comp: FunctionDecl) => {
        if (comp.name !== "main") {
            throw new Error("Only main function is supported for now");
        }

        // TODO: assign arguments to variables in the environment
        compileHelper(comp.body);
    },
    "Block": (comp: Block) => {
        for (let i = 0; i < comp.statementList.statements.length; i++) {
            compileHelper(comp.statementList.statements[i]);
        }
    },
    "ExpressionStatement": (comp: ExpressionStatement) => {
        compileHelper(comp.expression);
    },
    "BinaryExpr": (comp: BinaryExpr) => {
        compileHelper(comp.left);
        compileHelper(comp.right);
        instrs[wc++] = ({ opcode: "BINOP", operator: comp.operator });
    },
    "UnaryExpr": (comp: UnaryExpr) => {
        compileHelper(comp.expr);
        instrs[wc++] = ({ opcode: "UNOP", operator: comp.operator });
    },
    "IntegerLiteral": (comp: IntegerLiteral) => {
        instrs[wc++] = ({ opcode: "LDC", value: comp.value });
    },
    "BooleanLiteral": (comp: BooleanLiteral) => {
        instrs[wc++] = ({ opcode: "LDC", value: comp.value });
    }
}

export function compileHelper (node: GoNodeBase) {
    compileComp[node.type](node);
}

export function compile(sourceFile: SourceFile) : Instruction[] {
    wc = 0;
    instrs = [];

    compileHelper(sourceFile);
    instrs[wc] = ({ opcode: "DONE" });
    return instrs;
}

