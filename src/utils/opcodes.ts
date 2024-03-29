export enum Opcode {
    // Load
    LDC,
    LD,
    // Operators
    BINOP,
    UNOP,
    // Control flow
    JOF,
    GOTO,
    CALL,
    // Register manipulation
    POP,
    RESET,
}