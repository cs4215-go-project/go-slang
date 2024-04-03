import { BinaryExpr, Block, BooleanLiteral, ConstDecl, Declaration, ExpressionStatement, FunctionDecl, GoNodeBase, Identifier, IntegerLiteral, SourceFile, SourceLevelDeclaration, UnaryExpr } from "../../parser/ast";

type CompileTimeEnvironment = string[][];

function compileTimeEnvironmentPosition(cte: CompileTimeEnvironment, identifier: string) {
    let frameIndex = cte.length;
    while (valueIndex(cte[--frameIndex], identifier) === -1) {}
    return [frameIndex, valueIndex(cte[frameIndex], identifier)];
}

function compileTimeEnvironmentExtend(vs, e: CompileTimeEnvironment) {
    return [...e, vs]
}

function valueIndex(frame: string[], identifier: string) {
    return frame.indexOf(identifier);
}

function scanDeclarations(comp: SourceLevelDeclaration[]) {
    let locals = [];
    for (const decl of comp) {
        if (decl.type === "ConstDecl") {
            for (const spec of (decl as ConstDecl).specs) {
                locals = locals.concat(spec.identifierList.identifiers);
            }
        }
    }
    return locals;
}

export type Instruction = {
    opcode: string;
    [key: string]: any; // any other fields
}

let wc: number;
let instrs: Instruction[]
// a compile-time environment is an array of
// compile-time frames, and a compile-time frame
// is an array of symbols
let cte: CompileTimeEnvironment;
const globalCompileFrame = [] // TODO: add built-in functions

const compileComp = {
    "SourceFile": (comp: SourceFile, cte: CompileTimeEnvironment) => {
        const locals = scanDeclarations(comp.declarations);
		instrs[wc++] = { opcode: "ENTER_SCOPE", num_declarations: locals.length };
        let first = true;
        // sequence of declarations
        console.log(locals)
        comp.declarations.forEach((decl) => {
            if (!first) {
                instrs[wc++] = { opcode: "POP" };
                first = false;
            }
            compileHelper(decl, compileTimeEnvironmentExtend(locals, cte))
        });
		instrs[wc++] = { opcode: "EXIT_SCOPE" };
    },
    "FunctionDecl": (comp: FunctionDecl, cte: CompileTimeEnvironment) => {
        if (comp.name !== "main") {
            throw new Error("Only main function is supported for now");
        }

        // TODO: assign arguments to variables in the environment
        compileHelper(comp.body, cte);
    },
    "Block": (comp: Block, cte: CompileTimeEnvironment) => {
        for (let i = 0; i < comp.statementList.statements.length; i++) {
            compileHelper(comp.statementList.statements[i], cte);
        }
    },
    "Identifier": (comp: Identifier, cte: CompileTimeEnvironment) => {
        // store precomputed position information in LD instruction
        instrs[wc++] = {
            opcode: "LD",
            sym: comp.name,
            compile_pos: compileTimeEnvironmentPosition(cte, comp.name)
        }
    },
    "ExpressionStatement": (comp: ExpressionStatement, cte: CompileTimeEnvironment) => {
        compileHelper(comp.expression, cte);
    },
    "BinaryExpr": (comp: BinaryExpr, cte: CompileTimeEnvironment) => {
        compileHelper(comp.left, cte);
        compileHelper(comp.right, cte);
        instrs[wc++] = ({ opcode: "BINOP", operator: comp.operator });
    },
    "UnaryExpr": (comp: UnaryExpr, cte: CompileTimeEnvironment) => {
        compileHelper(comp.expr, cte);
        instrs[wc++] = ({ opcode: "UNOP", operator: comp.operator });
    },
    "IntegerLiteral": (comp: IntegerLiteral, cte: CompileTimeEnvironment) => {
        instrs[wc++] = ({ opcode: "LDC", value: comp.value });
    },
    "BooleanLiteral": (comp: BooleanLiteral, cte: CompileTimeEnvironment) => {
        instrs[wc++] = ({ opcode: "LDC", value: comp.value });
    },
    "ConstDecl": (comp: ConstDecl, cte: CompileTimeEnvironment) => {
        for (const spec of comp.specs) {
            // parser guarantees that number of identifiers and expr are the same
            for (let i = 0; i < spec.identifierList.identifiers.length; i++) {
                compileHelper(spec.expressionList.expressions[i], cte);
                instrs[wc++] = {
                    opcode: "ASSIGN",
                    compile_pos: compileTimeEnvironmentPosition(cte, spec.identifierList.identifiers[i])
                }
            }
        }
    }
}

export function compileHelper (node: GoNodeBase, cte: CompileTimeEnvironment) {
    compileComp[node.type](node, cte);
}

export function compile(sourceFile: SourceFile) : Instruction[] {
    wc = 0;
    instrs = [];
    cte = [globalCompileFrame];

    compileHelper(sourceFile, cte);
    instrs[wc] = ({ opcode: "DONE" });
    return instrs;
}

