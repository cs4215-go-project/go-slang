import Memory, { Tag } from "../utils/memory/memory";
import {Instruction} from "./compiler";

export type Literal = number | boolean;
export type BuiltinMetadata = { [key: string]: { id: number, arity: number }};

export default class Machine {
    
    public instructions: Instruction[];

    // for printing output to frontend (React's setState)
    public setOutput: (output: any) => void;
    public programOutput: any[];

    // builtin variables
    private builtin_implementations: {};
    private builtin_metadata: BuiltinMetadata;
    private builtins: {};

    private memory: Memory;
    private pc: number;
    private op_stack: number[];
    private env: string[][];
    private runtime_stack: number[];

    constructor(num_words: number, instructions: Instruction[], setOutput: (output: any) => void) {
        this.instructions = instructions;

        this.setOutput = setOutput;
        this.programOutput = [];
        this.setOutput(this.programOutput);

        this.memory = new Memory(num_words);
        this.pc = 0;
        this.op_stack = [];
        this.env = [];
        this.runtime_stack = [];
        
        this.init_builtin_implementations();
        this.init_builtin_metadata();

        this.memory.allocate_literals();
        this.memory.allocate_builtins(this.builtin_metadata);
        this.memory.allocate_globals();
    }

    run(): any {
        let instr = this.instructions[this.pc];
        while (instr.opcode !== "DONE") {
            this.execute(instr);
            instr = this.instructions[this.pc++];
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
            case "RESET": {
                this.env.pop();
                break;
            }
            case "DONE": {
                break;
            }
            default:
                throw new Error("Unknown opcode: " + instr.opcode);
        }
    }

    execute_binop(op: string, left: Literal, right: Literal): Literal {
        switch (op) {
            case "+": return  (left as number) + (right as number);
            case "-": return  (left as number) - (right as number);
            case "*": return  (left as number) * (right as number);
            case "/": return  Math.floor((left as number) / (right as number));
            case "%": return  (left as number) % (right as number);
            case "<": return  (left as number) < (right as number);
            case "<=": return (left as number) <= (right as number);
            case "==": return (left as number) === (right as number);
            case "!=": return (left as number) !== (right as number);
            case ">=": return (left as number) >= (right as number);
            case ">": return  (left as number) > (right as number);
            case "&&": return (left as boolean) && (right as boolean);
            case "||": return (left as boolean) || (right as boolean);
            default:
                throw new Error("Unknown binary operator: " + op);
        }
    }

    execute_unop(op: string, operand: Literal): Literal {
        switch (op) {
            case "-": return -operand;
            case "!": return !operand;
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
            sleep: {
                func: () => {
                    const addr = this.op_stack.pop();
                    const ms = this.memory.unbox(addr);
                    return new Promise(resolve => setTimeout(resolve, ms));
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
        this.builtins = [];
        
        for (const key in this.builtin_implementations) {
            this.builtin_metadata[key] = {
                id: id,
                arity: this.builtin_implementations[key].arity,
            };

            this.builtins[id++] = this.builtin_implementations[key].func;
        }
    }

    // apply builtin is called when the opcode is CALL and the tag at the address is Builtin
    apply_builtin(builtin_id: number): void {
        const result = this.builtins[builtin_id]();
        this.op_stack.pop(); // TODO: see if this pop fun is necessary
        this.op_stack.push(this.memory.box(result));
    }
}
