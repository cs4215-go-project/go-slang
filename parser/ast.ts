import GoLexer from "./gen/GoLexer"

interface Point {
  line: number;
  offset: number;
  column: number;
}

export interface Position {
  start: Point;
  end: Point;
}

export interface GoNodeBase {
    type: string;
    position: Position;
}

export interface SourceFile extends GoNodeBase {
    type: 'SourceFile';
    declarations: Declaration[];
}

export interface FunctionDecl extends GoNodeBase {
    type: 'FunctionDecl';
    name: string;
    // we don't support generics
    // typeParameters: TypeParameter[];
    signature: Signature;
    body: Block;
}

// TODO: Add proper typing
export type DataType = string;

export interface Signature extends GoNodeBase {
    type: 'Signature';
    parameters: Parameters;
    result?: Result;
}

export interface ParameterDecl extends GoNodeBase {
    type: 'ParameterDecl';
    identifiers: string[];
    isVariadic: boolean;
    dataType: DataType;
}

export interface Parameters extends GoNodeBase {
    type: 'Parameters';
    parameterDecls: ParameterDecl[];
}

export interface Result extends GoNodeBase {
    type: 'Result';
    // Go allows multiple return values
    dataTypes: DataType[];
}

export interface Block extends GoNodeBase {
    type: 'Block';
    statements: Statement[];
}

export type Statement =
    | Block
    | Declaration
    | SimpleStatement

// TODO: add sendStmt, assignment, expressionStmt, shortVarDecl
export type SimpleStatement = IncDecStatement

export interface IncDecStatement extends GoNodeBase {
    type: 'IncDecStatement';
    identifier: string;
    operator: '++' | '--';
}

export type Declaration = ConstDecl | TypeDecl | VarDecl;

export interface ConstDecl extends GoNodeBase {
    type: 'ConstDecl';
    specs: ConstSpec[]; // Assuming multiple constSpecs can be grouped within parentheses
}

export interface ConstSpec extends GoNodeBase {
    type: 'ConstSpec';
    identifiers: string[];
    dataType?: DataType;
    values?: Expression[];
}

export interface VarDecl extends GoNodeBase {
    type: 'VarDecl';
    specs: VarSpec[];
}

export interface VarSpec extends GoNodeBase {
    identifiers: string[];
    dataType?: DataType;
    values?: Expression[];
}

// TODO: add function call
export type Expression = BinaryExpr | UnaryExpr | Identifier | Literal;

// TODO: add CompositeLiteral (slice, struct, map, etc) | FunctionLiteral (lambda functions, i.e. add := func(a, b int) int {})
type Literal = BasicLiteral

export type BasicLiteral = NilLiteral | IntegerLiteral | FloatLiteral | StringLiteral | BooleanLiteral

export interface NilLiteral extends GoNodeBase {
    type: 'NilLiteral';
}

export interface IntegerLiteral extends GoNodeBase {
    type: 'IntegerLiteral';
    value: number;
}

export interface FloatLiteral extends GoNodeBase {
    type: 'FloatLiteral';
    value: number;
}

export interface StringLiteral extends GoNodeBase {
    type: 'StringLiteral';
    value: string;
}

export interface BooleanLiteral extends GoNodeBase {
    type: 'BooleanLiteral';
    value: boolean;
}

export interface Identifier extends GoNodeBase {
    type: 'Identifier';
    name: string;
}

export interface UnaryExpr extends GoNodeBase {
    type: 'UnaryExpr';
    operator: UnaryOperator;
    expr: Expression;
}

export interface BinaryExpr extends GoNodeBase {
    type: 'BinaryOperationExpr';
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
}

export type RelationalOperator = "<" | "<=" | "!=" | "==" | ">=" | ">";
export type ArithmeticOperator = "+" | "-" | "/" | "*" | "%";
export type LogicalBinaryOperator = "&&" | "||";
export type BitwiseBinaryOperator = ">>" | "<<" | "&" | "|" | "^";
export type BinaryOperator =
  | RelationalOperator
  | ArithmeticOperator
  | LogicalBinaryOperator
  | BitwiseBinaryOperator;

// ++ and -- are handled by IncDecStatement
export type UnaryOperator = "+" | "-" | "!" | "^" | "*" | "&" | "<-";

export type ScalarDataType = PrimaryDataType | PointerDataType;
export type PointerDataType = "pointer";
export type PrimaryDataType = IntegerDataType | FloatDataType;
export type IntegerDataType = SignedIntegerType | UnsignedIntegerType;
export type UnsignedIntegerType = "uint" // TODO: add more
export type SignedIntegerType = "int" // TODO: add more
export type FloatDataType = "float"

// TODO
export interface TypeDecl extends GoNodeBase {
    type: 'TypeDecl';
}


