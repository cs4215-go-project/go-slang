import parse from "../../parser/parser";
import Memory, { Tag } from "../utils/memory/memory";
import {compile, Instruction} from "./compiler";

export type Literal = number | boolean;
export type BuiltinMetadata = { [key: string]: { id: number, arity: number }};

export default function parseCompileAndRun(mem_size: number, input: string, setOutput: (output: any) => void): any {
    try {
        const parsed = parse(input);
        const instructions = compile(parsed);
        return new Machine(mem_size, instructions, setOutput).run();
    } catch (e) {
        return e;
    }
}

export class Machine {
    
    public instructions: Instruction[];

    // for printing output to frontend (React's setState)
    public setOutput: (output: any) => void;
    public programOutput: any[];

    // memory
    private memory: Memory;

    // machine state
    private pc: number;
    private op_stack: number[];
    private runtime_stack: number[];
    
    private env: number;

    // builtin variables
    private builtin_implementations: {};
    private builtin_metadata: BuiltinMetadata;
    private builtins: {};

    constructor(num_words: number, instructions: Instruction[], setOutput: (output: any) => void) {
        this.instructions = instructions;

        // frontend
        this.setOutput = setOutput;
        this.programOutput = [];
        this.setOutput(this.programOutput);
        
        // memory
        this.memory = new Memory(num_words);

        // machine state
        this.pc = 0;
        this.op_stack = [];
        this.runtime_stack = [];

        // allocate literals first
        this.memory.allocate_literals();

        this.env = this.memory.allocate_env(0);
        
        // builtins allocation
        this.init_builtin_implementations();
        this.init_builtin_metadata();     
        const builtins_frame_addr = this.memory.allocate_builtins_frame(this.builtin_metadata);
        this.env = this.memory.extend_env(builtins_frame_addr, this.env);

        // set heap bottom after allocating literals and builtins
        this.memory.heap_bottom = this.memory.free_index;
    }

    run(): any {  
        while (this.instructions[this.pc].opcode !== "DONE") {
            const instr = this.instructions[this.pc++];
            this.execute(instr);
        }

        const program_result_addr = this.op_stack.pop();
        return this.memory.unbox(program_result_addr);
    }

    execute(instr: Instruction): void {
        switch (instr.opcode) {
            case "LDC": {
                const addr = this.memory.box(instr.value);
                this.op_stack.push(addr);
                break;
            }
            case "BINOP": {
                const right_op_addr = this.op_stack.pop();
                const left_op_addr = this.op_stack.pop();

                const left = this.memory.unbox(left_op_addr);
                const right = this.memory.unbox(right_op_addr);

                const result = this.execute_binop(instr.operator, left, right);
                const result_addr = this.memory.box(result);

                this.op_stack.push(result_addr);
                break;
            }
            case "UNOP": {
                const op_addr = this.op_stack.pop();
                const operand = this.memory.unbox(op_addr);

                const result = this.execute_unop(instr.operator, operand);
                const result_addr = this.memory.box(result);

                this.op_stack.push(result_addr);
                break;
            }
            case "JOF": {
                const addr = this.op_stack.pop();
                const condition = this.memory.unbox(addr);

                if (!condition) {
                    this.pc = instr.target_instr;
                }
                break;
            }
            case "GOTO": {
                this.pc = instr.target_instr;
                break;
            }
            case "POP": {
                this.op_stack.pop();
                break;
            }
            case "ENTER_SCOPE": {
                const blockframe_addr = this.memory.allocate_blockframe(this.env);
                this.runtime_stack.push(blockframe_addr);

                const new_frame_addr = this.memory.allocate_frame(instr.num_declarations);
                this.env = this.memory.extend_env(new_frame_addr, this.env);

                for (let i = 0; i < instr.num_declarations; i++) {
                    this.memory.set_child(new_frame_addr, i, this.memory.literals[Tag.Unassigned]); // unassigned
                }
                break;
            }
            case "EXIT_SCOPE": {
                const blockframe_addr = this.runtime_stack.pop();
                this.env = this.memory.get_blockframe_parent_env(blockframe_addr);
                break;
            }
            case "LD": {
                const addr = this.memory.get_value_from_env(this.env, instr.compile_pos);
                if (this.memory.get_tag(addr) === Tag.Unassigned) {
                    throw new Error("Variable '" + instr.sym + "' used before assignment: ");
                }
                this.op_stack.push(addr);
            }
            case "ASSIGN": {
                const addr = this.op_stack[this.op_stack.length - 1];
                this.memory.set_value_in_env(this.env, instr.compile_pos, addr);
                break;
            }
            case "LDF": {
                const closure_addr = this.memory.allocate_closure(instr.arity, instr.skip, this.env);
                this.op_stack.push(closure_addr);
                break;
            }
            case "CALL": {
                const arity = instr.arity;
                const closure_addr = this.op_stack[this.op_stack.length - 1 - arity];

                if (this.memory.get_tag(closure_addr) === Tag.Builtin) {
                    const builtin_id = this.memory.get_builtin_id(closure_addr);
                    this.apply_builtin(builtin_id);
                    return;
                }

                const new_pc = this.memory.get_closure_pc(closure_addr);
                const new_frame_addr = this.memory.allocate_frame(arity);

                for (let i = arity - 1; i >= 0; i--) {
                    const arg = this.op_stack.pop();
                    this.memory.set_child(new_frame_addr, i, arg);
                }
                
                // pc has already been incremented by pc++ in run(), so we can push this value
                const callframe_addr = this.memory.allocate_callframe(this.pc, this.env);
                this.runtime_stack.push(callframe_addr);

                this.op_stack.pop(); // pop closure address
                this.env = this.memory.extend_env(new_frame_addr, this.memory.get_closure_env(closure_addr));

                this.pc = new_pc;
            }
            case "TAIL_CALL": {
                const arity = instr.arity;
                const closure_addr = this.op_stack[this.op_stack.length - 1 - arity];

                if (this.memory.get_tag(closure_addr) === Tag.Builtin) {
                    const builtin_id = this.memory.get_builtin_id(closure_addr);
                    this.apply_builtin(builtin_id);
                    return;
                }

                const new_pc = this.memory.get_closure_pc(closure_addr);
                const new_frame_addr = this.memory.allocate_frame(arity);

                for (let i = arity - 1; i >= 0; i--) {
                    const arg = this.op_stack.pop();
                    this.memory.set_child(new_frame_addr, i, arg);
                }

                this.op_stack.pop(); // pop closure address
                this.env = this.memory.extend_env(new_frame_addr, this.memory.get_closure_env(closure_addr));

                this.pc = new_pc;
            }
            case "RESET": {
                const top_frame_addr = this.runtime_stack.pop();
                if (this.memory.get_tag(top_frame_addr) === Tag.Callframe) {
                    this.pc = this.memory.get_callframe_pc(top_frame_addr);
                    this.env = this.memory.get_callframe_env(top_frame_addr);
                } else {
                    this.pc--;
                }
                break;
            }
            default:
                throw new Error("Unknown opcode: " + instr.opcode);
        }
    }

    execute_binop(op: string, left: Literal, right: Literal): Literal {
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

    execute_unop(op: string, operand: Literal): Literal {
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
            default:
                throw new Error("Unknown unary operator: " + op);
        }
    }   

    init_builtin_implementations(): void {
        this.builtin_implementations = {
            println: {
                func: () => {
                    const addr = this.op_stack.pop();
                    const valueToPrint = this.memory.unbox(addr);
                    this.programOutput.push(String(valueToPrint));
                    this.setOutput(this.programOutput);
                },
                arity: 1,
            },
            panic: {
                func: () => {
                    const addr = this.op_stack.pop();
                    const valueToPanic = this.memory.unbox(addr);
                    throw new Error(valueToPanic.toString());
                },
                arity: 1,
            },
            sleep: {
                func: () => {
                    const addr = this.op_stack.pop();
                    const duration = this.memory.unbox(addr);
                    new Promise(resolve => setTimeout(resolve, duration));
                },
                arity: 1,
            },
            make: {
                func: () =>{
                    // only for Go channels
                    const type_addr = this.op_stack.pop();
                    const type = this.memory.unbox(type_addr);

                    const capacity_addr = this.op_stack.pop();
                    const capacity = this.memory.unbox(capacity_addr);
                    
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
                    const right_op_addr = this.op_stack.pop();
                    const left_op_addr = this.op_stack.pop();

                    // check operand types
                    if (this.memory.get_tag(left_op_addr) !== Tag.Int || this.memory.get_tag(right_op_addr) !== Tag.Int) {
                        throw new Error("max() only allowed for integers");
                    }

                    const left = this.memory.unbox(left_op_addr);
                    const right = this.memory.unbox(right_op_addr);

                    if (left > right) {
                        this.op_stack.push(left_op_addr);
                    } else {
                        this.op_stack.push(right_op_addr);
                    }
                    
                },
                arity: 2,
            },
            min: {
                func: () => {
                    const right_op_addr = this.op_stack.pop();
                    const left_op_addr = this.op_stack.pop();

                    // check operand types
                    if (this.memory.get_tag(left_op_addr) !== Tag.Int || this.memory.get_tag(right_op_addr) !== Tag.Int) {
                        throw new Error("min() only allowed for integers");
                    }

                    const left = this.memory.unbox(left_op_addr);
                    const right = this.memory.unbox(right_op_addr);

                    if (left < right) {
                        this.op_stack.push(left_op_addr);
                    } else {
                        this.op_stack.push(right_op_addr);
                    }
                },
                arity: 2,
            },
        }
    }

    // assigns an id to each builtin, along with its arity. aids in storage in memory
    init_builtin_metadata(): any {
        let id = 0;
        this.builtin_metadata = {};
        this.builtins = {};
        
        for (const key in this.builtin_implementations) {
            this.builtin_metadata[key] = {
                id: id,
                arity: this.builtin_implementations[key].arity,
            };

            this.builtins[id++] = this.builtin_implementations[key].func;
        }
    }

    apply_builtin(builtin_id: number): void {
        this.op_stack.pop(); // pop closure address
        this.builtins[builtin_id]();
    }
}
