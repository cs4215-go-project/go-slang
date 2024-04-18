import { Assignment, BinaryExpr, Block, BooleanLiteral, BreakStatement, CloseExpression, ConstDecl, ConstSpec, ContinueStatement, Declaration, DeclareAssign, ExpressionStatement, ForStatement, FunctionCall, FunctionDecl, FunctionLiteral, GoNodeBase, GoStatement, Identifier, IdentifierList, IfStatement, IncDecStatement, IntegerLiteral, MakeExpression, ReturnStatement, SendStatement, SourceFile, SourceLevelDeclaration, Statement, UnaryExpr, VarDecl } from "../parser/ast";
import { Opcode } from "../utils/opcodes";

const builtins = ["println", "panic", "sleep", "make", "close", "max", "min", "wgAdd", "wgDone", "wgWait"]
const builtinArity = [1, 1, 1, 1, 1, 2, 2, 2, 1, 1]

type CompileTimeEnvironment = string[][];

function compileTimeEnvironmentPosition(cte: CompileTimeEnvironment, identifier: string): [number, number] {
    console.log(cte)
    let frameIndex = cte.length;
    while (valueIndex(cte[--frameIndex], identifier) === -1) {}
    return [frameIndex, valueIndex(cte[frameIndex], identifier)];
}

function compileTimeEnvironmentExtend(vs, e: CompileTimeEnvironment) {
    return [...e, vs]
}

function valueIndex(frame: string[], identifier: string) {
    try {
        return frame.indexOf(identifier);
    } catch (e) {
        throw new Error(`Identifier ${identifier} not declared`)
    }
}

function scanDeclarations(comp: Statement[] | SourceLevelDeclaration[]) {
    let locals = [];
    for (const decl of comp) {
        // console.log(decl, decl.type)
        if (decl.type === "ConstDecl" || decl.type === "VarDecl") {
            for (const spec of (decl as ConstDecl).specs) {
                locals = locals.concat(spec.identifierList.identifiers.map((id) => id.name));
            }
        } else if (decl.type === "FunctionDecl") {
            locals.push((decl as FunctionDecl).name);
        } else if (decl.type === "DeclareAssign") {
            for (const expr of (decl as DeclareAssign).left) {
                if (expr.type === "Identifier") {
                    locals.push((expr as Identifier).name)
                }
            }
        }
    }
    return locals;
}

export type Instruction = {
    opcode: Opcode;
    [key: string]: any; // any other fields
}

let wc: number;
let instrs: Instruction[];
// a compile-time environment is an array of
// compile-time frames, and a compile-time frame
// is an array of symbols
let cte: CompileTimeEnvironment;
const globalCompileFrame = [builtins];

function serializeCompileTimePos(pos: [number, number]) {
    return pos.join("_");
}
let compileTimePosToArity: Record<string, number>

// placeholder instruction
type NOPInstruction = {
    opcode: Opcode.NOP,
    [key: string]: any;
}

let startLocations: number[] = [];
let endLocations: NOPInstruction[] = [];

function resolveBreakTargets() {
    for (const instr of instrs) {
        if (instr.opcode === Opcode.GOTO && instr.nopInstr) {
            instr.targetInstr = instr.nopInstr.targetInstr;
            delete instr.nopInstr;
        }
    }
}

const compileComp = {
    "SourceFile": (comp: SourceFile, cte: CompileTimeEnvironment) => {
        const locals = scanDeclarations(comp.declarations);
		instrs[wc++] = { opcode: Opcode.ENTER_SCOPE, numDeclarations: locals.length };
        let first = true;
        // sequence of declarations
        comp.declarations.forEach((decl) => {
            if (!first) {
                instrs[wc++] = { opcode: Opcode.POP };
                first = false;
            }
            compileHelper(decl, compileTimeEnvironmentExtend(locals, cte))
        });
        
        // check if main function is defined
        if (locals.indexOf("main") === -1) {
            throw new Error("main() function not defined")
        }

        instrs[wc++] = { opcode: Opcode.LD, compilePos: [1, locals.indexOf("main")] };
        instrs[wc++] = { opcode: Opcode.START_GOROUTINE };
        instrs[wc++] = { opcode: Opcode.CALL, arity: 0 };
        instrs[wc++] = { opcode: Opcode.STOP_GOROUTINE };

		instrs[wc++] = { opcode: Opcode.EXIT_SCOPE };
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
        ]} as ConstDecl, cte);
        const funcPos = compileTimeEnvironmentPosition(cte, comp.name);
        compileTimePosToArity[serializeCompileTimePos(funcPos)] = comp.signature.parameters.parameterDecls.reduce((acc, param) => acc + param.identifierList.identifiers.length, 0);
    },
    "FunctionCall": (comp: FunctionCall, cte: CompileTimeEnvironment) => {
        compileHelper(comp.func, cte);

        if (comp.args) {
            if (comp.func.type === "FunctionLiteral") {
                // function literals don't have an identifier
                const arity = comp.func.signature.parameters.parameterDecls.reduce((acc, param) => acc + param.identifierList.identifiers.length, 0);
                if (arity !== comp.args.length) {
                    throw new Error(`Function called with wrong number of arguments: expected ${arity}, got ${comp.args.length}`)
                }
            } else {
                const funcPos = compileTimeEnvironmentPosition(cte, comp.func.name);
                const arity = compileTimePosToArity[serializeCompileTimePos(funcPos)];
                if (arity !== undefined && arity !== comp.args.length) {
                    throw new Error(`Function '${comp.func.name}' called with wrong number of arguments: expected ${arity}, got ${comp.args.length}`)
                }
            }

            for (const arg of comp.args) {
                compileHelper(arg, cte);
            }
        }
        instrs[wc++] = { opcode: Opcode.CALL, arity: comp.args ? comp.args.length : 0};
    },
    "FunctionLiteral": (comp: FunctionLiteral, cte: CompileTimeEnvironment) => {
        const arity = comp.signature.parameters.parameterDecls.reduce((acc, param) => acc + param.identifierList.identifiers.length, 0);
        instrs[wc++] = { opcode: Opcode.LDF, arity: arity, skip: wc+1 };
        const goto = { opcode: Opcode.GOTO, targetInstr: undefined };
        instrs[wc++] = goto;
        const params = []
        for (const param of comp.signature.parameters.parameterDecls) {
            for (const id of param.identifierList.identifiers) {
                params.push(id.name)
            }
        }
        compileHelper(comp.body, compileTimeEnvironmentExtend(params, cte));
        instrs[wc++] = { opcode: Opcode.LDC, value: undefined };
        instrs[wc++] = {opcode: Opcode.RESET}
        goto.targetInstr = wc;
    },
    "Block": (comp: Block, cte: CompileTimeEnvironment) => {
        // console.log(comp, cte)
        const locals = scanDeclarations(comp.statementList.statements);
        // console.log(locals)
		instrs[wc++] = { opcode: Opcode.ENTER_SCOPE, numDeclarations: locals.length };
        if (comp.statementList.statements.length === 0) {
            instrs[wc++] = { opcode: Opcode.LDC, value: undefined};
            instrs[wc++] = { opcode: Opcode.EXIT_SCOPE };
            return
        }
        for (let i = 0; i < comp.statementList.statements.length; i++) {
            if (i !== 0) {
                instrs[wc++] = { opcode: Opcode.POP };
            }
            compileHelper(comp.statementList.statements[i], compileTimeEnvironmentExtend(locals, cte))
        }
        instrs[wc++] = { opcode: Opcode.EXIT_SCOPE };
    },
    "Identifier": (comp: Identifier, cte: CompileTimeEnvironment) => {
        if (builtins.includes(comp.name)) {
            instrs[wc++] = { opcode: Opcode.LD, compilePos: [ 0, builtins.indexOf(comp.name) ] }
            return
        }

        // store precomputed position information in LD instruction
        // console.log(cte)
        instrs[wc++] = {
            opcode: Opcode.LD,
            compilePos: compileTimeEnvironmentPosition(cte, comp.name)
        }
    },
    "ExpressionStatement": (comp: ExpressionStatement, cte: CompileTimeEnvironment) => {
        compileHelper(comp.expression, cte);
    },
    "BinaryExpr": (comp: BinaryExpr, cte: CompileTimeEnvironment) => {
        compileHelper(comp.left, cte);
        compileHelper(comp.right, cte);
        instrs[wc++] = ({ opcode: Opcode.BINOP, operator: comp.operator });
    },
    "UnaryExpr": (comp: UnaryExpr, cte: CompileTimeEnvironment) => {
        compileHelper(comp.expr, cte);
        if (comp.operator === "<-") {
            instrs[wc++] = { opcode: Opcode.RECV };
            return;
        }
        instrs[wc++] = ({ opcode: Opcode.UNOP, operator: comp.operator });
    },
    "IntegerLiteral": (comp: IntegerLiteral, cte: CompileTimeEnvironment) => {
        instrs[wc++] = ({ opcode: Opcode.LDC, value: comp.value });
    },
    "BooleanLiteral": (comp: BooleanLiteral, cte: CompileTimeEnvironment) => {
        instrs[wc++] = ({ opcode: Opcode.LDC, value: comp.value });
    },
    "ConstDecl": (comp: ConstDecl, cte: CompileTimeEnvironment) => {
        for (const spec of comp.specs) {
            // parser guarantees that number of identifiers and expr are the same
            for (let i = 0; i < spec.identifierList.identifiers.length; i++) {
                compileHelper(spec.expressionList.expressions[i], cte);
                instrs[wc++] = {
                    opcode: Opcode.ASSIGN,
                    compilePos: compileTimeEnvironmentPosition(cte, spec.identifierList.identifiers[i].name)
                }
            }
        }
    },
    "VarDecl": (comp: VarDecl, cte: CompileTimeEnvironment) => {
        // console.log("CTE", cte)
        for (const spec of comp.specs) {
            for (let i = 0; i < spec.identifierList.identifiers.length; i++) {
                if (spec.expressionList) {
                    compileHelper(spec.expressionList.expressions[i], cte);
                }

                if (spec.dataType === "WaitGroup") {
                    instrs[wc++] = { opcode: Opcode.MAKE_WAITGROUP }
                }
                
                instrs[wc++] = {
                    opcode: Opcode.ASSIGN,
                    compilePos: compileTimeEnvironmentPosition(cte, spec.identifierList.identifiers[i].name)
                }
            }
        }
    },
    "Assignment": (comp: Assignment, cte: CompileTimeEnvironment) => {
        for (let i = 0; i < comp.left.length; i++) {
            compileHelper(comp.right[i], cte);
            // console.log("Assignment", (comp.left[i] as Identifier).name, compileTimeEnvironmentPosition(cte, (comp.left[i] as Identifier).name))
            instrs[wc++] = {
                opcode: Opcode.ASSIGN,
                compilePos: compileTimeEnvironmentPosition(cte, (comp.left[i] as Identifier).name)
            }
        }
    },
    "DeclareAssign": (comp: DeclareAssign, cte: CompileTimeEnvironment) => {
        for (let i = 0; i < comp.left.length; i++) {
            compileHelper(comp.right[i], cte);
            if (comp.right[i].type === "FunctionLiteral") {
                const arity = (comp.right[i] as FunctionLiteral).signature.parameters.parameterDecls.reduce((acc, param) => acc + param.identifierList.identifiers.length, 0);
                const funcPos = compileTimeEnvironmentPosition(cte, (comp.left[i] as Identifier).name);
                compileTimePosToArity[serializeCompileTimePos(funcPos)] = arity;
            }
            instrs[wc++] = {
                opcode: Opcode.ASSIGN,
                compilePos: compileTimeEnvironmentPosition(cte, (comp.left[i] as Identifier).name)
            }
        }
    },
    "IfStatement": (comp: IfStatement, cte: CompileTimeEnvironment) => {
        compileHelper(comp.condition, cte);
        const jof = { opcode: Opcode.JOF, targetInstr: undefined};
        instrs[wc++] = jof;
        compileHelper(comp.ifBranch, cte);
        const goto = { opcode: Opcode.GOTO, targetInstr: undefined};
        instrs[wc++] = goto;
        jof.targetInstr = wc;
        compileHelper(comp.elseBranch, cte);
        goto.targetInstr = wc;
    },
    "ReturnStatement": (comp: ReturnStatement, cte: CompileTimeEnvironment) => {
        // TODO: support multiple return statements
        if (comp.values.length > 1) {
            throw new Error("Multiple return values not supported yet")
        }
        if (comp.values.length > 0) {
            compileHelper(comp.values[0], cte);
        }

        if (comp.values[0]?.type === "FunctionCall") {
            instrs[wc - 1].opcode = Opcode.TAIL_CALL;
        }
        instrs[wc++] = { opcode: Opcode.RESET };
    },
    "ForStatement": (comp: ForStatement, cte: CompileTimeEnvironment) => {
        let locals = [];
        if (comp.init !== undefined) {
            locals = scanDeclarations([comp.init]);
            instrs[wc++] = { opcode: Opcode.ENTER_SCOPE, numDeclarations: 1}
            compileHelper(comp.init, compileTimeEnvironmentExtend(locals, cte));
            instrs[wc++] = { opcode: Opcode.POP };
        }

        const loopStart = wc;
        startLocations.push(loopStart);
        const loopEnd: NOPInstruction = { opcode: Opcode.NOP, targetInstr: undefined };
        endLocations.push(loopEnd);

        compileHelper(comp.condition, compileTimeEnvironmentExtend(locals, cte));
        const jof = { opcode: Opcode.JOF, targetInstr: undefined };
        instrs[wc++] = jof;

        compileHelper(comp.body, compileTimeEnvironmentExtend(locals, cte));
        instrs[wc++] = { opcode: Opcode.POP };
        
        if (comp.post !== undefined) {
            compileHelper(comp.post, compileTimeEnvironmentExtend(locals, cte));
            instrs[wc++] = { opcode: Opcode.POP };
        }

        instrs[wc++] = { opcode: Opcode.GOTO, targetInstr: loopStart };

        jof.targetInstr = wc;
        loopEnd.targetInstr = wc;
        
        if (comp.init !== undefined) {
            instrs[wc++] = { opcode: Opcode.EXIT_SCOPE };
        }

        instrs[wc++] = { opcode: Opcode.LDC, value: undefined }

        startLocations.pop();
        endLocations.pop();
    },
    "BreakStatement": (comp: BreakStatement, cte: CompileTimeEnvironment) => {
        if (endLocations.length === 0) {
            throw new Error("Break statement outside of loop");
        }
        instrs[wc++] = { opcode: Opcode.GOTO, targetInstr: undefined, nopInstr: endLocations[endLocations.length - 1] };
    },
    "ContinueStatement": (comp: ContinueStatement, cte: CompileTimeEnvironment) => {
        if (startLocations.length === 0) {
            throw new Error("Continue statement outside of loop");
        }
        instrs[wc++] = { opcode: Opcode.GOTO, targetInstr: startLocations[startLocations.length - 1] };
    },
    "IncDecStatement": (comp: IncDecStatement, cte: CompileTimeEnvironment) => {
        compileHelper(comp.expression, cte);
        instrs[wc++] = { opcode: Opcode.LDC, value: 1 };
        instrs[wc++] = { opcode: Opcode.BINOP, operator: comp.operator === "++" ? "+" : "-" };
        instrs[wc++] = {
            opcode: Opcode.ASSIGN,
            compilePos: compileTimeEnvironmentPosition(cte, (comp.expression as Identifier).name)
        }
    },
    "GoStatement": (comp: GoStatement, cte: CompileTimeEnvironment) => {
        const start = { opcode: Opcode.START_GOROUTINE, stopInstr: undefined };
        instrs[wc++] =  start
        compileHelper(comp.expression, cte);
        instrs[wc++] = { opcode: Opcode.STOP_GOROUTINE };
        start.stopInstr = wc;
    },
    "MakeExpression": (comp: MakeExpression, cte: CompileTimeEnvironment) => {
        if (comp.dataType !== "chanint") {
            throw new Error("make() is only supported for 'chan int' for now")
        }
        compileHelper({type: "Identifier", name: "make"} as Identifier, cte);
        // instrs[wc++] = { opcode: Opcode.LDC, value: comp.capacity };
        compileHelper(comp.capacity, cte);
        instrs[wc++] = { opcode: Opcode.CALL, arity: 1 };
    },
    "CloseExpression": (comp: CloseExpression, cte: CompileTimeEnvironment) => {
        compileHelper({type: "Identifier", name: "close"} as Identifier, cte);
        compileHelper(comp.channel, cte);
        instrs[wc++] = { opcode: Opcode.CALL, arity: 1 };
    },
    "SendStatement": (comp: SendStatement, cte: CompileTimeEnvironment) => {
        compileHelper(comp.channel, cte);
        compileHelper(comp.value, cte);
        instrs[wc++] = { opcode: Opcode.SEND };
    }
}

export function compileHelper (node: GoNodeBase, cte: CompileTimeEnvironment) {
    // console.log(node.type)
    compileComp[node.type](node, cte);
}

export function compile(sourceFile: SourceFile) : Instruction[] {
    wc = 0;
    instrs = [];
    cte = globalCompileFrame;
    compileTimePosToArity = {};
    for (let i = 0; i < builtins.length; i++) {
        compileTimePosToArity[serializeCompileTimePos([0, i])] = builtinArity[i];
    }

    compileHelper(sourceFile, cte);
    instrs[wc] = ({ opcode: Opcode.DONE });
    resolveBreakTargets();
    return instrs;
}

