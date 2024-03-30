import Memory from "../utils/memory/memory";
import Compiler, { Instruction, Program } from "./compiler";

export type Literal = number | boolean;

export default class Machine {
    private memory: Memory;
    public compiler: Compiler;
    public program: Program;
    private pc: number;
    private op_stack: number[];
    private env: string[][];
    private runtime_stack: number[];

    constructor(num_words: number, compiler: Compiler, program: Program) {
        this.memory = new Memory(num_words);
        this.compiler = compiler;
        this.program = program;
        this.pc = 0;
        this.op_stack = [];
        this.env = [];
        this.runtime_stack = [];
    }

    init(): void {
        this.memory.allocate_literals();
        this.memory.allocate_builtins();
        this.memory.allocate_globals();
    }

    run(): any {
        this.init();
        this.compiler.compile(this.program);

        let instr = this.compiler.instrs[this.pc];
        while (instr.opcode !== "DONE") {
            this.execute(instr);
            instr = this.compiler.instrs[this.pc++];
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
}