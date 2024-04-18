export enum Opcode {
    // Load
    LDC,
    LD,
    LDF,
    ASSIGN,
    // Operators
    BINOP,
    UNOP,
    // Control flow
    JOF,
    GOTO,
    CALL,
    TAIL_CALL,
    DONE,
    // Register manipulation
    POP,
    RESET,
    NOP,
    ENTER_SCOPE,
    EXIT_SCOPE,
    // Goroutines
    START_GOROUTINE,
    STOP_GOROUTINE,
    SEND,
    RECV,
    // Waitgroups
    MAKE_WAITGROUP,
}
