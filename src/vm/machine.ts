import parse from "../parser/parser";
import Memory, { Tag } from "../utils/memory/memory";
import { Opcode } from "../utils/opcodes";
import {compile, Instruction} from "./compiler";
import { FIFOScheduler, GoroutineId, Scheduler } from "./scheduler";

const MAX_STEPS = 800000;

export type Literal = number | boolean;
export type BuiltinMetadata = { [key: string]: { id: number, arity: number }};

export default async function parseCompileAndRun(memSize: number, input: string, setOutput: (output: any) => void): Promise<any> {
    try {
        setOutput((prevOutput) => []);
        const parsed = parse(input);
        console.log(JSON.stringify(parsed, null, 2));
        const instructions = compile(parsed);
        console.log(instructions);
        return await new Machine(memSize, instructions, setOutput).run();
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

    // machine state
    private pc: number;
    public opStack: number[];
    public runtimeStack: number[];

    private numSteps: number;
    // memory
    private memory: Memory;

    public env: number;

    // builtin variables
    private builtinImpls: {};
    private builtinMetadata: BuiltinMetadata;
    private builtins: {};

    public goroutineContexts: Map<GoroutineId, GoroutineContext>

    public scheduler: Scheduler;
    private remainingTimeSlice: number;

    private mainDone: boolean;

    private sleeping: Promise<void>[];

    constructor(numWords: number, instructions: Instruction[], setOutput: (output: any) => void) {
        this.instructions = instructions;

        // frontend
        this.setOutput = setOutput;

        // machine state
        this.pc = 0;
        this.opStack = [];
        this.runtimeStack = [];

        this.numSteps = 0;

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
        this.memory.machine = this;

        this.goroutineContexts = new Map<GoroutineId, GoroutineContext>();

        this.scheduler = new FIFOScheduler();
        this.remainingTimeSlice = undefined;

        this.mainDone = false;

        this.sleeping = [];
    }

    async run(): Promise<any> {  
        while (this.instructions[this.pc].opcode !== Opcode.DONE) {
            if (this.numSteps++ > MAX_STEPS) {
                throw new Error("maximum number of steps exceeded, potential infinite loop detected");
            }

            if (this.remainingTimeSlice && this.remainingTimeSlice < 0) {
                throw new Error("Negative time slice")
            }

            if (!this.mainDone && this.scheduler.currentGoroutine() !== undefined && this.remainingTimeSlice === 0) {
                // context switch due to time slice expiration, not blocked
                await this.contextSwitch(false);
            }
            
            const instr = this.instructions[this.pc++];
            console.log("g:", this.scheduler.currentGoroutine(), "PC:", this.pc - 1, "Instr:", instr)
            await this.execute(instr);
            this.remainingTimeSlice--;
        }

        const resultAddress = this.opStack.pop();
        return this.memory.unbox(resultAddress);
    }

    isDeadlock(): boolean {
        return this.scheduler.numBlockedGoroutine() === this.scheduler.numGoroutine();
    }

    async waitForSleeping(): Promise<[number, number]> {
        await Promise.race(this.sleeping);
        const g = this.scheduler.runNextGoroutine();
        return g;
    }

    async contextSwitch(isBlocked: boolean): Promise<void> {
        this.saveGoroutineContext();
        this.scheduler.interruptGoroutine(isBlocked);

        let g = this.scheduler.runNextGoroutine();
        if (g === null) {
            if (this.sleeping.length === 0) {
                throw new Error("fatal error: all goroutines are asleep - deadlock!")
            }

            g = await this.waitForSleeping();
        }

        this.restoreGoroutineContext(g);
    }

    saveGoroutineContext(): void {
        this.goroutineContexts.set(this.scheduler.currentGoroutine(), {
            env: this.env,
            pc: this.pc,
            opStack: this.opStack,
            runtimeStack: this.runtimeStack,
        })
    }

    restoreGoroutineContext(g: [GoroutineId, number]): void {
        const gctx = this.goroutineContexts.get(g[0]);
        this.remainingTimeSlice = g[1];
        this.env = gctx.env;
        this.pc = gctx.pc;
        this.opStack = gctx.opStack;
        this.runtimeStack = gctx.runtimeStack;
    }

    async execute(instr: Instruction): Promise<void> {
        switch (instr.opcode) {
            case Opcode.LDC: {
                const addr = this.memory.box(instr.value);
                this.opStack.push(addr);
                break;
            }
            case Opcode.BINOP: {
                const rightOpAddr = this.opStack.pop();
                const leftOpAddr = this.opStack.pop();
                
                const bothInts: boolean = this.memory.isInt(leftOpAddr) && this.memory.isInt(rightOpAddr);
                const bothBools: boolean = this.memory.isBoolean(leftOpAddr) && this.memory.isBoolean(rightOpAddr);

                if (!bothInts && !bothBools) {
                    throw new Error("binary operations can only be applied to operands of the same type (ints or booleans)");
                }

                const left = this.memory.unbox(leftOpAddr);
                const right = this.memory.unbox(rightOpAddr);

                const result = this.executeBinaryOp(instr.operator, left, right);
                const resultAddr = this.memory.box(result);

                this.opStack.push(resultAddr);
                break;
            }
            case Opcode.SEND: {
                const valueAddr = this.opStack.pop();
                const chanAddr = this.opStack.pop();
                const chan = this.memory.unbox(chanAddr);

                // if channel is unbuffered, a send will block until a receive,
                // so it will always enter this if block
                if (!this.memory.sendToIntChannel(chan, valueAddr)) {
                    // full channel, block goroutine
                    const g = this.scheduler.currentGoroutine();
                    await this.contextSwitch(true);
                    const sendq = this.memory.getIntChannelSendQueue(chan);
                    this.memory.addToWaitQueue(sendq, g, valueAddr);
                } else {
                    // wake up waiting receiver
                    const recvq = this.memory.getIntChannelRecvQueue(chan);
                    if (this.memory.getWaitQueueSize(recvq) !== 0) {
                        const [g, _] = this.memory.popFromWaitQueue(recvq);
                        // send value to receiver's op stack
                        if (this.memory.getIntChannelCapacity(chan) === 0) {
                            this.goroutineContexts.get(g).opStack.push(valueAddr);
                        } else {
                            this.goroutineContexts.get(g).opStack.push(this.memory.receiveFromIntChannel(chan));
                        }
                        this.scheduler.wakeUpGoroutine(g);
                    }
                }

                break;
            }
            case Opcode.RECV: {
                const chanAddr = this.opStack.pop();
                const chan = this.memory.unbox(chanAddr);

                let valueAddr = this.memory.receiveFromIntChannel(chan)
                if (valueAddr === -1) {
                    // empty channel, block goroutine
                    const g = this.scheduler.currentGoroutine();
                    await this.contextSwitch(true);
                    const recvq = this.memory.getIntChannelRecvQueue(chan);
                    this.memory.addToWaitQueue(recvq, g, -1); // -1 means it's a receive operation?
                    return undefined; // dont push to op stack!
                } else {
                    const sendq = this.memory.getIntChannelSendQueue(chan);
                    if (this.memory.getWaitQueueSize(sendq) !== 0) {
                        const [g, sentValAddr] = this.memory.popFromWaitQueue(sendq);
                        this.scheduler.wakeUpGoroutine(g);

                        if (this.memory.getIntChannelCapacity(chan) === 0) {
                            valueAddr = sentValAddr;
                        } else {
                            this.memory.sendToIntChannel(chan, sentValAddr);
                        }
                    }
                }

                this.opStack.push(valueAddr);
                break;
            }
            case Opcode.UNOP: {
                const opAddr = this.opStack.pop();
                const operand = this.memory.unbox(opAddr);

                const result = await this.executeUnaryOp(instr.operator, operand);
                if (result === undefined) {
                    break;
                }
                const resultAddr = this.memory.box(result);

                this.opStack.push(resultAddr);
                break;
            }
            case Opcode.JOF: {
                const addr = this.opStack.pop();
                const condition = this.memory.unbox(addr);

                if (!condition) {
                    this.pc = instr.targetInstr;
                }
                break;
            }
            case Opcode.GOTO: {
                this.pc = instr.targetInstr;
                break;
            }
            case Opcode.POP: {
                this.opStack.pop();
                break;
            }
            case Opcode.ENTER_SCOPE: {
                const blockframeAddr = this.memory.allocateBlockframe(this.env);
                this.runtimeStack.push(blockframeAddr);

                this.memory.allocating.push(blockframeAddr);

                const newFrameAddr = this.memory.allocateFrame(instr.numDeclarations);
                for (let i = 0; i < instr.numDeclarations; i++) {
                    this.memory.setChild(newFrameAddr, i, this.memory.literals[Tag.Unassigned]); // unassigned
                }
                
                this.env = this.memory.extendEnv(this.env, newFrameAddr);
                break;
            }
            case Opcode.EXIT_SCOPE: {
                const blockframeAddr = this.runtimeStack.pop();
                this.env = this.memory.getBlockframeParentEnv(blockframeAddr);
                break;
            }
            case Opcode.LD: {
                const addr = this.memory.getValueFromEnv(this.env, instr.compilePos);
                if (this.memory.isUnassigned(addr)) {
                    throw new Error("variable '" + instr.sym + "' used before assignment");
                }
                this.opStack.push(addr);
                break
            }
            case Opcode.ASSIGN: {
                const addr = this.opStack[this.opStack.length - 1];
                this.memory.setValueInEnv(this.env, instr.compilePos, addr);
                break;
            }
            case Opcode.LDF: {
                const closureAddr = this.memory.allocateClosure(instr.arity, instr.skip, this.env);
                this.opStack.push(closureAddr);
                break;
            }
            case Opcode.CALL: {
                const arity = instr.arity;
                const closureAddr = this.opStack[this.opStack.length - 1 - arity];

                const closureArity = this.memory.isBuiltin(closureAddr) ? this.memory.getBuiltinArity(closureAddr) : this.memory.getClosureArity(closureAddr);

                if (closureArity !== arity) {
                    throw new Error(`Function called with wrong number of arguments: expected ${closureArity}, got ${arity}`)
                }

                if (this.memory.isBuiltin(closureAddr)) {
                    const builtinId = this.memory.getBuiltinId(closureAddr);
                    await this.applyBuiltin(builtinId);
                    return;
                }

                const newPc = this.memory.getClosurePc(closureAddr);

                const newFrameAddr = this.memory.allocateFrame(arity);
                for (let i = arity - 1; i >= 0; i--) {
                    const arg = this.opStack.pop();
                    this.memory.setChild(newFrameAddr, i, arg);
                }

                this.memory.allocating = [newFrameAddr];
                
                // pc has already been incremented by pc++ in run(), so we can push this value
                const callframeAddr = this.memory.allocateCallframe(this.pc, this.env);
                this.runtimeStack.push(callframeAddr);

                this.opStack.pop(); // pop closure address
                this.env = this.memory.extendEnv(this.memory.getClosureEnv(closureAddr), newFrameAddr);

                this.pc = newPc;
                break;
            }
            case Opcode.TAIL_CALL: {
                const arity = instr.arity;
                const closureAddr = this.opStack[this.opStack.length - 1 - arity];

                const closureArity = this.memory.isBuiltin(closureAddr) ? this.memory.getBuiltinArity(closureAddr) : this.memory.getClosureArity(closureAddr);

                if (closureArity !== arity) {
                    throw new Error(`Function called with wrong number of arguments: expected ${closureArity}, got ${arity}`)
                }

                if (this.memory.isBuiltin(closureAddr)) {
                    const builtinId = this.memory.getBuiltinId(closureAddr);
                    await this.applyBuiltin(builtinId);
                    return;
                }

                const newPc = this.memory.getClosurePc(closureAddr);

                const newFrameAddr = this.memory.allocateFrame(arity);
                for (let i = arity - 1; i >= 0; i--) {
                    const arg = this.opStack.pop();
                    this.memory.setChild(newFrameAddr, i, arg);
                }

                this.memory.allocating = [newFrameAddr];

                this.opStack.pop(); // pop closure address
                this.env = this.memory.extendEnv(this.memory.getClosureEnv(closureAddr), newFrameAddr);

                this.pc = newPc;
                break;
            }
            case Opcode.RESET: {
                const topFrameAddr = this.runtimeStack.pop();
                if (this.memory.isCallframe(topFrameAddr)) {
                    this.pc = this.memory.getCallframePc(topFrameAddr);
                    this.env = this.memory.getCallframeEnv(topFrameAddr);
                } else {
                    this.pc--;
                }
                break;
            }
            case Opcode.START_GOROUTINE: {
                const g = this.scheduler.scheduleGoroutine();
                if (this.scheduler.currentGoroutine() === undefined) {
                    const [_, timeSlice] = this.scheduler.runNextGoroutine();
                    this.remainingTimeSlice = timeSlice
                }

                const gctx = {
                    env: this.env,
                    pc: this.pc,
                    opStack: [],
                    runtimeStack: [],
                };
                this.goroutineContexts.set(g, gctx);

                if (instr.stopInstr) {
                    this.pc = instr.stopInstr;
                }
                break;
            }
            case Opcode.STOP_GOROUTINE: {
                // if it's main, then we're done
                if (this.scheduler.currentGoroutine() === 0) {
                    this.mainDone = true;
                    return;
                }

                const terminatedG = this.scheduler.currentGoroutine();
                this.goroutineContexts.delete(terminatedG);
                this.scheduler.terminateGoroutine(terminatedG);
                let g = this.scheduler.runNextGoroutine();
                if (g === null) {
                    if (this.sleeping.length === 0) {
                        throw new Error("fatal error: all goroutines are asleep - deadlock!")
                    }
                    g = await this.waitForSleeping();
                }

                this.restoreGoroutineContext(g);

                break;
            }
            case Opcode.MAKE_WAITGROUP: {
                const wgAddr = this.memory.allocateWaitGroup();
                this.opStack.push(wgAddr);
                break;
            }
            default:
                throw new Error("Unknown opcode: " + instr.opcode);
        }
    }

    executeBinaryOp(op: string, left: Literal, right: Literal): Literal {
        switch (op) {
            case "+": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error(`arithmetic operator ${op} can only be applied to ints`);
                }
                return left + right;
            }
            case "-": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error(`arithmetic operator ${op} can only be applied to ints`);
                }
                return left - right;
            }
            case "*": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error(`arithmetic operator ${op} can only be applied to ints`);
                }
                return left * right;
            }
            case "/": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error(`arithmetic operator ${op} can only be applied to ints`);
                }
                return Math.floor(left / right);
            }
            case "%": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error(`arithmetic operator ${op} can only be applied to ints`);
                }
                return left % right;
            }
            case "<": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error(`comparison operator ${op} can only be applied to ints`);
                }
                return left < right;
            }
            case "<=": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error(`comparison operator ${op} can only be applied to ints`);
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
                    throw new Error(`comparison operator ${op} can only be applied to ints`);
                }
                return left >= right;
            }
            case ">": {
                if (typeof left !== 'number' || typeof right !== 'number') {
                    throw new Error(`comparison operator ${op} can only be applied to ints`);
                }
                return left > right;
            }
            case "&&": {
                if (typeof left !== 'boolean' || typeof right !== 'boolean') {
                    throw new Error(`logical operator ${op} can only be applied to booleans`);
                }
                return left && right;
            }
            case "||": {
                if (typeof left !== 'boolean' || typeof right !== 'boolean') {
                    throw new Error(`logical operator ${op} can only be applied to booleans`);
                }
                return left || right;
            }
            default:
                throw new Error("unknown binary operator: " + op);
        }
    }

    async executeUnaryOp(op: string, operand: Literal): Promise<Literal | undefined> {
        switch (op) {
            case "-":
                if (typeof operand !== 'number') {
                    throw new Error(`operator ${op} can only be applied to ints`);
                }
                return -operand;
            case "!":
                if (typeof operand !== 'boolean') {
                    throw new Error(`operator ${op} can only be applied to booleans`);
                }
                return !operand;
            default:
                throw new Error("unknown unary operator: " + op);
        }
    }   

    initBuiltinImpls(): void {
        this.builtinImpls = {
            println: {
                func: () => {
                    const addr = this.opStack.pop();

                    if (!this.memory.isInt(addr) && !this.memory.isBoolean(addr)) {
                        throw new Error("println() only allowed for ints and booleans");
                    }

                    const valueToPrint = this.memory.unbox(addr);
                    this.setOutput(prevOutput => [...prevOutput, String(valueToPrint)]);

                    this.opStack.pop(); // pop closure address
                    this.opStack.push(this.memory.box(undefined));
                },
                arity: 1,
            },
            panic: {
                func: () => {
                    const addr = this.opStack.pop();

                    if (!this.memory.isInt(addr) && !this.memory.isBoolean(addr)) {
                        throw new Error("panic() only allowed for ints and booleans");
                    }

                    const valueToPanic = this.memory.unbox(addr);
                    throw new Error("panic: " + valueToPanic.toString());
                },
                arity: 1,
            },
            sleep: {
                func: async () => {
                    const addr = this.opStack.pop();
                    const duration = this.memory.unbox(addr);

                    // block
                    const g = this.scheduler.currentGoroutine();

                    const prom = new Promise<void>((resolve, reject) => {
                        setTimeout(() => {
                            this.scheduler.wakeUpGoroutine(g);
                            resolve();
                        }, duration)
                    }).then(res => {
                        // after the promise is resolved, remove itself from the sleeping list
                        this.sleeping.splice(this.sleeping.indexOf(prom), 1)
                        return res; 
                    })
                    this.sleeping.push(prom);

                    this.opStack.pop(); // pop closure address
                    this.opStack.push(this.memory.box(undefined));

                    await this.contextSwitch(true);
                },
                arity: 1,
            },
            make: {
                func: () => {
                    // only for Go channels
                    const capacityAddr = this.opStack.pop();
                    const capacity = this.memory.unbox(capacityAddr);

                    if (!this.memory.isInt(capacityAddr)) {
                        throw new Error("make() channel capacity must be an int");
                    }
                    
                    if (capacity < 0) {
                        throw new Error("make() channel capacity must be non-negative");
                    }

                    const chanAddr = this.memory.allocateIntChannel(capacity);

                    this.opStack.pop(); // pop closure address
                    this.opStack.push(chanAddr);
                },
                arity: 1,
            },
            close: {
                func: () => {
                    const chanAddr = this.opStack.pop();

                    if (!this.memory.isIntChannel(chanAddr)) {
                        throw new Error("close() only allowed for channels");
                    }

                    this.memory.setIntChannelClose(chanAddr, 1);

                    this.opStack.pop(); // pop closure address
                    this.opStack.push(this.memory.box(undefined));
                },
                arity: 1,
            },
            max: {
                func: () => {
                    const rightOpAddr = this.opStack.pop();
                    const leftOpAddr = this.opStack.pop();

                    // check operand types
                    if (!this.memory.isInt(leftOpAddr) || !this.memory.isInt(rightOpAddr)) {
                        throw new Error("max() only allowed for ints");
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
                    if (!this.memory.isInt(leftOpAddr) || !this.memory.isInt(rightOpAddr)) {
                        throw new Error("min() only allowed for ints");
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
            wgAdd: {
                func: () => {
                    const deltaAddr = this.opStack.pop();

                    if (!this.memory.isInt(deltaAddr)) {
                        throw new Error("wgAdd() argument 'delta' must evaluate to an int");
                    }
                    const delta = this.memory.unbox(deltaAddr);

                    const wgAddr = this.opStack.pop();

                    if (!this.memory.isWaitGroup(wgAddr)) {
                        throw new Error("wgAdd() only allowed for WaitGroup");
                    }
                    this.memory.setWaitGroupCounter(wgAddr, this.memory.getWaitGroupCounter(wgAddr) + delta);

                    this.opStack.pop(); // pop closure address
                    this.opStack.push(this.memory.box(undefined));
                },
                arity: 2,
            },
            wgDone: {
                func: () => {
                    const wgAddr = this.opStack.pop();
                    if (!this.memory.isWaitGroup(wgAddr)) {
                        throw new Error("wgDone() only allowed for WaitGroup");
                    }

                    const newCounter = this.memory.getWaitGroupCounter(wgAddr) - 1;
                    if (newCounter < 0) {
                        throw new Error("panic: negative WaitGroup counter");
                    }
                    
                    this.memory.setWaitGroupCounter(wgAddr, newCounter);

                    if (newCounter === 0) {
                        const wgq = this.memory.getWaitGroupWaiters(wgAddr);
                        for (const g of wgq) {
                            this.scheduler.wakeUpGoroutine(g);
                        }
                        return;
                    }

                    this.opStack.pop(); // pop closure address
                    this.opStack.push(this.memory.box(undefined));
                },
                arity: 1,
            },
            wgWait: {
                func: async () => {
                    const wgAddr = this.opStack.pop()
                    if (!this.memory.isWaitGroup(wgAddr)) {
                        throw new Error("wgWait() only allowed for WaitGroup");
                    }

                    if (this.memory.getWaitGroupCounter(wgAddr) === 0) {
                        return;
                    }

                    const g = this.scheduler.currentGoroutine();
                    this.memory.addWaitGroupWaiter(wgAddr, g);

                    this.opStack.pop(); // pop closure address
                    this.opStack.push(this.memory.box(undefined));

                    await this.contextSwitch(true);
                },
                arity: 1,
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

    async applyBuiltin(builtinId: number): Promise<void> {
        await this.builtins[builtinId]();
    }
}
