import parse from "../../parser/parser";
import Memory, { Tag } from "../utils/memory/memory";
import {compile, Instruction} from "./compiler";
import { FIFOScheduler, GoroutineId, Scheduler } from "./scheduler";

export type Literal = number | boolean;
export type BuiltinMetadata = { [key: string]: { id: number, arity: number }};

export default function parseCompileAndRun(memSize: number, input: string, setOutput: (output: any) => void): any {
    try {
        const parsed = parse(input);
        console.log(JSON.stringify(parsed, null, 2));
        const instructions = compile(parsed);
        console.log(instructions);
        return new Machine(memSize, instructions, setOutput).run();
    } catch (e) {
        return e;
    }
}

export type GoroutineContext = {
    env: number,
    pc: number,
    opStack: number[],
    runtimeStack: number[],
}

export class Machine {
    
    public instructions: Instruction[];

    // for printing output to frontend (React's setState)
    public setOutput: (output: any) => void;
    public programOutput: any[];

    // machine state
    private pc: number;
    private opStack: number[];
    private runtimeStack: number[];

    // memory
    private memory: Memory;

    private env: number;

    // builtin variables
    private builtinImpls: {};
    private builtinMetadata: BuiltinMetadata;
    private builtins: {};

    private goroutineContexts: Map<GoroutineId, GoroutineContext>

    private scheduler: Scheduler;
    private remainingTimeSlice: number;

    constructor(numWords: number, instructions: Instruction[], setOutput: (output: any) => void) {
        this.instructions = instructions;

        // frontend
        this.setOutput = setOutput;
        this.programOutput = [];
        this.setOutput(this.programOutput);

        // machine state
        this.pc = 0;
        this.opStack = [];
        this.runtimeStack = [];

        // memory
        this.memory = new Memory(numWords);

        // allocate literals first
        this.memory.allocateLiterals();

        this.env = this.memory.allocateEnv(0);
        
        // builtins allocation
        this.initBuiltinImpls();
        this.initBuiltinMetadata();     
        const builtinFrameAddr = this.memory.allocateBuiltinsFrame(this.builtinMetadata);
        this.env = this.memory.extendEnv(this.env, builtinFrameAddr);

        // set heap bottom after allocating literals and builtins
        this.memory.heapBottom = this.memory.freeIndex;

        this.goroutineContexts = new Map<GoroutineId, GoroutineContext>();
        this.memory.goroutineContexts = this.goroutineContexts;

        this.scheduler = new FIFOScheduler();
        this.remainingTimeSlice = undefined;
    }

    run(): any {  
        while (this.instructions[this.pc].opcode !== "DONE") {
            if (this.remainingTimeSlice && this.remainingTimeSlice < 0) {
                throw new Error("Negative time slice")
            }
            // TODO: error when deadlock
            console.log("current goroutine", this.scheduler.currentGoroutine())
            console.log("remaining time slice", this.remainingTimeSlice)
            if (this.scheduler.currentGoroutine() !== undefined && this.remainingTimeSlice === 0) {
                console.log("prev", this.scheduler.currentGoroutine())
                // context switch due to time slice expiration, not blocked
                this.contextSwitch(false);
                console.log("curr", this.scheduler.currentGoroutine())
            }
            
            const instr = this.instructions[this.pc++];
            console.log(this.scheduler.currentGoroutine(), this.pc, instr)
            this.execute(instr);
            this.remainingTimeSlice--;
        }

        const resultAddress = this.opStack.pop();
        return this.memory.unbox(resultAddress);
    }

    isDeadlock(): boolean {
        return this.scheduler.numBlockedGoroutine() === this.scheduler.numGoroutine();
    }

    contextSwitch(isBlocked: boolean): void {
        console.log(this.goroutineContexts)
        this.goroutineContexts.set(this.scheduler.currentGoroutine(), {
            env: this.env,
            pc: this.pc,
            opStack: this.opStack,
            runtimeStack: this.runtimeStack,
        })
        this.scheduler.interruptGoroutine(isBlocked);

        const g = this.scheduler.runNextGoroutine();
        if (g === null) {
            throw new Error("no goroutine to run next")
        }

        const gctx = this.goroutineContexts.get(g[0]);
        this.remainingTimeSlice = g[1];
        this.env = gctx.env;
        this.pc = gctx.pc;
        this.opStack = gctx.opStack;
        this.runtimeStack = gctx.runtimeStack;
    }

    execute(instr: Instruction): void {
        console.log("instr", instr)
        switch (instr.opcode) {
            case "LDC": {
                const addr = this.memory.box(instr.value);
                this.opStack.push(addr);
                break;
            }
            case "BINOP": {
                const rightOpAddr = this.opStack.pop();
                const leftOpAddr = this.opStack.pop();

                console.log("left", leftOpAddr, "right", rightOpAddr);
                console.log("left type", Tag[this.memory.getTag(leftOpAddr)], "right type", Tag[this.memory.getTag(rightOpAddr)]);

                const left = this.memory.unbox(leftOpAddr);
                const right = this.memory.unbox(rightOpAddr);

                const result = this.executeBinaryOp(instr.operator, left, right);
                const resultAddr = this.memory.box(result);

                this.opStack.push(resultAddr);
                break;
            }
            case "UNOP": {
                const opAddr = this.opStack.pop();
                const operand = this.memory.unbox(opAddr);

                const result = this.executeUnaryOp(instr.operator, operand);
                const resultAddr = this.memory.box(result);

                this.opStack.push(resultAddr);
                break;
            }
            case "JOF": {
                const addr = this.opStack.pop();
                const condition = this.memory.unbox(addr);

                if (!condition) {
                    this.pc = instr.targetInstr;
                }
                break;
            }
            case "GOTO": {
                this.pc = instr.targetInstr;
                break;
            }
            case "POP": {
                this.opStack.pop();
                break;
            }
            case "ENTER_SCOPE": {
                const blockframeAddr = this.memory.allocateBlockframe(this.env);
                this.runtimeStack.push(blockframeAddr);

                const newFrameAddr = this.memory.allocateFrame(instr.numDeclarations);
                this.env = this.memory.extendEnv(this.env, newFrameAddr);

                for (let i = 0; i < instr.numDeclarations; i++) {
                    this.memory.setChild(newFrameAddr, i, this.memory.literals[Tag.Unassigned]); // unassigned
                }
                break;
            }
            case "EXIT_SCOPE": {
                const blockframeAddr = this.runtimeStack.pop();
                this.env = this.memory.getBlockframeParentEnv(blockframeAddr);
                break;
            }
            case "LD": {
                const addr = this.memory.getValueFromEnv(this.env, instr.compilePos);
                if (this.memory.getTag(addr) === Tag.Unassigned) {
                    throw new Error("Variable '" + instr.sym + "' used before assignment");
                }
                this.opStack.push(addr);
                break
            }
            case "ASSIGN": {
                const addr = this.opStack[this.opStack.length - 1];
                this.memory.setValueInEnv(this.env, instr.compilePos, addr);
                break;
            }
            case "LDF": {
                const closureAddr = this.memory.allocateClosure(instr.arity, instr.skip, this.env);
                this.opStack.push(closureAddr);
                break;
            }
            case "CALL": {
                const arity = instr.arity;
                const closureAddr = this.opStack[this.opStack.length - 1 - arity];

                if (this.memory.getTag(closureAddr) === Tag.Builtin) {
                    const builtinId = this.memory.getBuiltinId(closureAddr);
                    this.applyBuiltin(builtinId);
                    return;
                }

                const newPc = this.memory.getClosurePc(closureAddr);
                console.log("NEW PC", newPc)
                const newFrameAddr = this.memory.allocateFrame(arity);

                for (let i = arity - 1; i >= 0; i--) {
                    const arg = this.opStack.pop();
                    this.memory.setChild(newFrameAddr, i, arg);
                }
                
                // pc has already been incremented by pc++ in run(), so we can push this value
                const callframeAddr = this.memory.allocateCallframe(this.pc, this.env);
                this.runtimeStack.push(callframeAddr);

                this.opStack.pop(); // pop closure address
                this.env = this.memory.extendEnv(this.memory.getClosureEnv(closureAddr), newFrameAddr);

                this.pc = newPc;
                break;
            }
            case "TAIL_CALL": {
                const arity = instr.arity;
                const closureAddr = this.opStack[this.opStack.length - 1 - arity];

                if (this.memory.getTag(closureAddr) === Tag.Builtin) {
                    const builtinId = this.memory.getBuiltinId(closureAddr);
                    this.applyBuiltin(builtinId);
                    return;
                }

                const newPc = this.memory.getClosurePc(closureAddr);
                const newFrameAddr = this.memory.allocateFrame(arity);

                for (let i = arity - 1; i >= 0; i--) {
                    const arg = this.opStack.pop();
                    this.memory.setChild(newFrameAddr, i, arg);
                }

                this.opStack.pop(); // pop closure address
                this.env = this.memory.extendEnv(this.memory.getClosureEnv(closureAddr), newFrameAddr);

                this.pc = newPc;
                break;
            }
            case "RESET": {
                const topFrameAddr = this.runtimeStack.pop();
                if (this.memory.getTag(topFrameAddr) === Tag.Callframe) {
                    this.pc = this.memory.getCallframePc(topFrameAddr);
                    this.env = this.memory.getCallframeEnv(topFrameAddr);
                } else {
                    this.pc--;
                }
                break;
            }
            case "START_GOROUTINE": {
                const g = this.scheduler.scheduleGoroutine();
                if (this.scheduler.currentGoroutine() === undefined) {
                    const [_, timeSlice] = this.scheduler.runNextGoroutine();
                    console.log("main goroutine starting", g, timeSlice)
                    this.remainingTimeSlice = timeSlice
                }

                const gctx = {
                    env: this.env,
                    pc: this.pc,
                    opStack: [],
                    runtimeStack: [],
                }
                this.goroutineContexts.set(g, gctx);

                if (instr.stopInstr) {
                    this.pc = instr.stopInstr;
                }
                break
            }
            case "STOP_GOROUTINE": {
                // if it's main, then we're done
                if (this.scheduler.currentGoroutine() === 0) {
                    return;
                }

                this.scheduler.terminateGoroutine(this.scheduler.currentGoroutine());
                const g = this.scheduler.runNextGoroutine();
                if (g === null) {
                    throw new Error("no goroutine to run next")
                }

                const gctx = this.goroutineContexts.get(g[0]);
                this.remainingTimeSlice = g[1];
                this.env = gctx.env;
                this.pc = gctx.pc;
                this.opStack = gctx.opStack;
                this.runtimeStack = gctx.runtimeStack;

                break
            }
            default:
                throw new Error("Unknown opcode: " + instr.opcode);
        }
    }

    executeBinaryOp(op: string, left: Literal, right: Literal): Literal {
        switch (op) {
            case "+": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error("Arithmetic operators can only be applied to numbers");
                }
                return left + right;
            }
            case "-": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error("Arithmetic operators can only be applied to numbers");
                }
                return left - right;
            }
            case "*": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error("Arithmetic operators can only be applied to numbers");
                }
                return left * right;
            }
            case "/": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error("Arithmetic operators can only be applied to numbers");
                }
                return Math.floor(left / right);
            }
            case "%": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error("Arithmetic operators can only be applied to numbers");
                }
                return left % right;
            }
            case "<": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error("Comparison operators can only be applied to numbers");
                }
                return left < right;
            }
            case "<=": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error("Comparison operators can only be applied to numbers");
                }
                return left <= right;
            }
            case "==": {
                return left === right;
            }
            case "!=": {
                return left !== right;
            }
            case ">=": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error("Comparison operators can only be applied to numbers");
                }
                return left >= right;
            }
            case ">": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error("Comparison operators can only be applied to numbers");
                }
                return left > right;
            }
            case "&&": {
                if (typeof left !== 'boolean' || typeof right !== 'boolean') {
                    throw new Error("Logical operators can only be applied to booleans");
                }
                return left && right;
            }
            case "||": {
                if (typeof left !== 'boolean' || typeof right !== 'boolean') {
                    throw new Error("Logical operators can only be applied to booleans");
                }
                return left || right;
            }
            default:
                throw new Error("Unknown binary operator: " + op);
        }
    }

    executeUnaryOp(op: string, operand: Literal): Literal {
        switch (op) {
            case "-":
                if (typeof operand !== 'number') {
                    throw new Error(`Operator ${op} cannot be applied to type ${typeof operand}`);
                }
                return -operand;
            case "!":
                if (typeof operand !== 'boolean') {
                    throw new Error(`Operator ${op} cannot be applied to type ${typeof operand}`);
                }
                return !operand;
            case "<-":
                // TODO
                throw new Error("Unimplemented unary operator: <-");
            default:
                throw new Error("Unknown unary operator: " + op);
        }
    }   

    initBuiltinImpls(): void {
        this.builtinImpls = {
            println: {
                func: () => {
                    const addr = this.opStack.pop();
                    const valueToPrint = this.memory.unbox(addr);
                    this.programOutput.push(String(valueToPrint));
                    this.setOutput(this.programOutput);
                    this.opStack.pop(); // pop closure address
                },
                arity: 1,
            },
            panic: {
                func: () => {
                    const addr = this.opStack.pop();
                    const valueToPanic = this.memory.unbox(addr);
                    throw new Error(valueToPanic.toString());
                },
                arity: 1,
            },
            sleep: {
                func: () => {
                    const addr = this.opStack.pop();
                    const duration = this.memory.unbox(addr);
                    new Promise(resolve => setTimeout(resolve, duration));
                },
                arity: 1,
            },
            make: {
                func: () => {
                    // 0 = chan int, 1 = chan bool

                    // only for Go channels
                    const typeAddr = this.opStack.pop();
                    const type = this.memory.unbox(typeAddr);

                    const capacityAddr = this.opStack.pop();
                    const capacity = this.memory.unbox(capacityAddr);
                    
                    // TODO: change the way type is checked (include memory tags)
                    if (type !== "chan") {
                        throw new Error("make() only allowed for channels");
                    }

                    // TODO: change this too idk tbh
                    if (capacity < 0) {
                        throw new Error("make() channel capacity must be non-negative");
                    }

                    // TODO: allocate new channel on this.memory
                    // TODO: return address of new channel
                },
                arity: 2,
            },
            max: {
                func: () => {
                    const rightOpAddr = this.opStack.pop();
                    const leftOpAddr = this.opStack.pop();

                    // check operand types
                    if (this.memory.getTag(leftOpAddr) !== Tag.Int || this.memory.getTag(rightOpAddr) !== Tag.Int) {
                        throw new Error("max() only allowed for integers");
                    }

                    const left = this.memory.unbox(leftOpAddr);
                    const right = this.memory.unbox(rightOpAddr);
                    this.opStack.pop(); // pop closure address

                    if (left > right) {
                        this.opStack.push(leftOpAddr);
                    } else {
                        this.opStack.push(rightOpAddr);
                    }
                    
                },
                arity: 2,
            },
            min: {
                func: () => {
                    const rightOpAddr = this.opStack.pop();
                    const leftOpAddr = this.opStack.pop();

                    // check operand types
                    if (this.memory.getTag(leftOpAddr) !== Tag.Int || this.memory.getTag(rightOpAddr) !== Tag.Int) {
                        throw new Error("min() only allowed for integers");
                    }

                    const left = this.memory.unbox(leftOpAddr);
                    const right = this.memory.unbox(rightOpAddr);
                    this.opStack.pop(); // pop closure address

                    if (left < right) {
                        this.opStack.push(leftOpAddr);
                    } else {
                        this.opStack.push(rightOpAddr);
                    }
                },
                arity: 2,
            },
        }
    }

    // assigns an id to each builtin, along with its arity. aids in storage in memory
    initBuiltinMetadata(): any {
        let id = 0;
        this.builtinMetadata = {};
        this.builtins = {};
        
        for (const key in this.builtinImpls) {
            this.builtinMetadata[key] = {
                id: id,
                arity: this.builtinImpls[key].arity,
            };

            this.builtins[id++] = this.builtinImpls[key].func;
        }
    }

    applyBuiltin(builtinId: number): void {
        this.builtins[builtinId]();
    }
}
