import { Assignment, BinaryExpr, Block, BooleanLiteral, ConstDecl, ConstSpec, Declaration, ExpressionStatement, ForStatement, FunctionCall, FunctionDecl, FunctionLiteral, GoNodeBase, GoStatement, Identifier, IdentifierList, IfStatement, IncDecStatement, IntegerLiteral, MakeExpression, ReturnStatement, SendStatement, SourceFile, SourceLevelDeclaration, Statement, UnaryExpr, VarDecl } from "../../parser/ast";

const builtins = ["println", "panic", "sleep", "make", "max", "min", ]

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

function scanDeclarations(comp: Statement[] | SourceLevelDeclaration[]) {
    let locals = [];
    for (const decl of comp) {
        console.log(decl, decl.type)
        if (decl.type === "ConstDecl" || decl.type === "VarDecl") {
            for (const spec of (decl as ConstDecl).specs) {
                locals = locals.concat(spec.identifierList.identifiers.map((id) => id.name));
            }
        } else if (decl.type === "FunctionDecl") {
            locals.push((decl as FunctionDecl).name);
        } else if (decl.type === "Assignment") {
            for (const expr of (decl as Assignment).left) {
                if (expr.type === "Identifier") {
                    locals.push((expr as Identifier).name)
                }
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
        comp.declarations.forEach((decl) => {
            if (!first) {
                instrs[wc++] = { opcode: "POP" };
                first = false;
            }
            compileHelper(decl, compileTimeEnvironmentExtend(locals, cte))
        });
        

        instrs[wc++] = { opcode: "LD", compile_pos: [1, locals.indexOf("main")] };
        instrs[wc++] = { opcode: "START_GOROUTINE" };
        instrs[wc++] = { opcode: "CALL", arity: 0 };
        instrs[wc++] = { opcode: "STOP_GOROUTINE" };

		instrs[wc++] = { opcode: "EXIT_SCOPE" };
    },
    "FunctionDecl": (comp: FunctionDecl, cte: CompileTimeEnvironment) => {
        compileHelper({
            type: "ConstDecl", specs: [
                {
                    type: "ConstSpec",
                    identifierList: {
                        type: "IdentifierList", 
                        identifiers: [ 
                            {type: "Identifier", name: comp.name}
                        ]
                    },
                    expressionList: {
                        type: "ExpressionList", 
                        expressions: [
                            {type:"FunctionLiteral", signature: comp.signature, body: comp.body} as FunctionLiteral
                        ]
                        }
                }
        ]} as ConstDecl, cte)
    },
    "FunctionCall": (comp: FunctionCall, cte: CompileTimeEnvironment) => {
        compileHelper(comp.func, cte);
        for (const arg of comp.args) {
            compileHelper(arg, cte);
        }
        instrs[wc++] = { opcode: "CALL", arity: comp.args.length };
    },
    "FunctionLiteral": (comp: FunctionLiteral, cte: CompileTimeEnvironment) => {
        const arity = comp.signature.parameters.parameterDecls.reduce((acc, param) => acc + param.identifierList.identifiers.length, 0);
        instrs[wc++] = { opcode: "LDF", arity: arity, skip: wc+1 };
        const goto = { opcode: "GOTO", target_instr: undefined };
        instrs[wc++] = goto;
        const params = []
        for (const param of comp.signature.parameters.parameterDecls) {
            for (const id of param.identifierList.identifiers) {
                params.push(id.name)
            }
        }
        compileHelper(comp.body, compileTimeEnvironmentExtend(params, cte));
        instrs[wc++] = { opcode: "LDC", value: undefined };
        instrs[wc++] = {opcode: 'RESET'}
        goto.target_instr = wc;
    },
    "Block": (comp: Block, cte: CompileTimeEnvironment) => {
        console.log(comp, cte)
        const locals = scanDeclarations(comp.statementList.statements);
        console.log(locals)
		instrs[wc++] = { opcode: "ENTER_SCOPE", num_declarations: locals.length };
        if (comp.statementList.statements.length === 0) {
            instrs[wc++] = { opcode: "LDC", value: undefined};
            return
        }
        for (let i = 0; i < comp.statementList.statements.length; i++) {
            if (i !== 0) {
                instrs[wc++] = { opcode: "POP" };
            }
            compileHelper(comp.statementList.statements[i], compileTimeEnvironmentExtend(locals, cte))
        }
        instrs[wc++] = { opcode: "EXIT_SCOPE" };
    },
    "Identifier": (comp: Identifier, cte: CompileTimeEnvironment) => {
        if (builtins.includes(comp.name)) {
            instrs[wc++] = { opcode: "LD", compile_pos: [ 0, builtins.indexOf(comp.name) ] }
            return
        }

        // store precomputed position information in LD instruction
        console.log(cte)
        instrs[wc++] = {
            opcode: "LD",
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
                    compile_pos: compileTimeEnvironmentPosition(cte, spec.identifierList.identifiers[i].name)
                }
            }
        }
    },
    "VarDecl": (comp: VarDecl, cte: CompileTimeEnvironment) => {
        console.log("CTE", cte)
        for (const spec of comp.specs) {
            for (let i = 0; i < spec.identifierList.identifiers.length; i++) {
                compileHelper(spec.expressionList.expressions[i], cte);
                instrs[wc++] = {
                    opcode: "ASSIGN",
                    compile_pos: compileTimeEnvironmentPosition(cte, spec.identifierList.identifiers[i].name)
                }
            }
        }
    },
    "Assignment": (comp: Assignment, cte: CompileTimeEnvironment) => {
        for (let i = 0; i < comp.left.length; i++) {
            compileHelper(comp.right[i], cte);
            console.log("Assignment", (comp.left[i] as Identifier).name, compileTimeEnvironmentPosition(cte, (comp.left[i] as Identifier).name))
            instrs[wc++] = {
                opcode: "ASSIGN",
                compile_pos: compileTimeEnvironmentPosition(cte, (comp.left[i] as Identifier).name)
            }
        }
    },
    "IfStatement": (comp: IfStatement, cte: CompileTimeEnvironment) => {
        compileHelper(comp.condition, cte);
        const jof = { opcode: "JOF", target_instr: undefined};
        instrs[wc++] = jof;
        compileHelper(comp.ifBranch, cte);
        const goto = { opcode: "GOTO", target_instr: undefined};
        instrs[wc++] = goto;
        jof.target_instr = wc;
        compileHelper(comp.elseBranch, cte);
        goto.target_instr = wc;
    },
    "ReturnStatement": (comp: ReturnStatement, cte: CompileTimeEnvironment) => {
        // TODO: support multiple return statements
        if (comp.values.length > 1) {
            throw new Error("Multiple return values not supported yet")
        }
        compileHelper(comp.values[0], cte);
        // TODO: support tail call optimization
        instrs[wc++] = { opcode: "RESET" };
    },
    "ForStatement": (comp: ForStatement, cte: CompileTimeEnvironment) => {
        const loopStart = wc;
        compileHelper(comp.condition, cte);
        const jof = { opcode: "JOF", target_instr: undefined };
        instrs[wc++] = jof;
        compileHelper(comp.body, cte);
        instrs[wc++] = { opcode: "POP" };
        instrs[wc++] = { opcode: "GOTO", target_instr: loopStart };
        jof.target_instr = wc;
        instrs[wc++] = { opcode: "LDC", value: undefined }
    },
    "IncDecStatement": (comp: IncDecStatement, cte: CompileTimeEnvironment) => {
        compileHelper(comp.expression, cte);
        instrs[wc++] = { opcode: "LDC", value: 1 };
        instrs[wc++] = { opcode: "BINOP", operator: comp.operator === "++" ? "+" : "-" };
        instrs[wc++] = {
            opcode: "ASSIGN",
            compile_pos: compileTimeEnvironmentPosition(cte, (comp.expression as Identifier).name)
        }
    },
    "GoStatement": (comp: GoStatement, cte: CompileTimeEnvironment) => {
        instrs[wc++] = { opcode: "START_GOROUTINE" };
        compileHelper(comp.expression, cte);
        instrs[wc++] = { opcode: "STOP_GOROUTINE" };
    },
    "MakeExpression": (comp: MakeExpression, cte: CompileTimeEnvironment) => {
        compileHelper({type: "Identifier", name: "make"} as Identifier, cte);
        if (comp.dataType === "chanint") {
            instrs[wc++] = { opcode: "LDC", value: ChanType.INT };
        } else if (comp.dataType === "chanbool") {
            instrs[wc++] = { opcode: "LDC", value: ChanType.BOOL };
        }
        instrs[wc++] = { opcode: "LDC", value: comp.capacity };
    },
    "SendStatement": (comp: SendStatement, cte: CompileTimeEnvironment) => {
    }
}

enum ChanType {
    INT,
    BOOL
}

export function compileHelper (node: GoNodeBase, cte: CompileTimeEnvironment) {
    console.log(node.type)
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

