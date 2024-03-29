import { CharStreams, CommonTokenStream, ParserRuleContext } from "antlr4";
import GoLexer from "./gen/GoLexer";
import GoParser, {
  BlockContext,
  ConstDeclContext,
  DeclarationContext,
  ExpressionContext,
  ExpressionStmtContext,
  FunctionDeclContext,
  IdentifierListContext,
  LiteralContext,
  OperandContext,
  ParameterDeclContext,
  ParametersContext,
  PrimaryExprContext,
  ResultContext,
  SignatureContext,
  SimpleStmtContext,
  SourceFileContext,
  StatementContext,
  StatementListContext,
  VarDeclContext,
} from "./gen/GoParser";
import GoParserVisitor from "./gen/GoParserVisitor";
import {
  Block,
  ConstDecl,
  ConstSpec,
  Declaration,
  Expression,
  ExpressionStatement,
  FunctionDecl,
  GoNodeBase,
  Identifier,
  IdentifierList,
  Literal,
  Operand,
  ParameterDecl,
  Parameters,
  Position,
  Result,
  Signature,
  SourceFile,
  SourceLevelDeclaration,
  Statement,
  StatementList,
  UnaryOperator,
  VarDecl,
  VarSpec,
} from "./ast";

export default function parse(input: string) {
  const chars = CharStreams.fromString(input);
  const lexer = new GoLexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new GoParser(tokens);
  const tree = parser.sourceFile();

  return tree.accept(new CustomVisitor());
}

function getPosition(ctx: ParserRuleContext): Position {
  return {
    start: {
      line: ctx.start.line,
      column: ctx.start.column,
      offset: ctx.start.tokenIndex,
    },
    end: {
      line: ctx.stop.line,
      column: ctx.stop.column,
      offset: ctx.stop.tokenIndex,
    },
  };
}

class CustomVisitor extends GoParserVisitor<GoNodeBase> {
  // we ignore imports and methods declarations.
  visitSourceFile = (ctx: SourceFileContext): SourceFile => {
    // console.log(ctx.start.line, ctx.start.column, ctx.start.tokenIndex, ctx.start.start, ctx.start.stop);
    // console.log(ctx.stop.line, ctx.stop.column, ctx.stop.tokenIndex, ctx.stop.start, ctx.stop.stop);

    const declarations: SourceLevelDeclaration[] = [];
    for (const decl of ctx.declaration_list()) {
      declarations.push(this.visitDeclaration(decl));
    }
    for (const functionDecl of ctx.functionDecl_list()) {
      declarations.push(this.visitFunctionDecl(functionDecl));
    }

    const sourceFile: SourceFile = {
      type: "SourceFile",
      //   position: getPosition(ctx),
      declarations: declarations,
    };

    return sourceFile;
  };

  // we dont support generics
  visitFunctionDecl = (ctx: FunctionDeclContext): FunctionDecl => {
    const functionDecl: FunctionDecl = {
      type: "FunctionDecl",
      //   position: getPosition(ctx),
      name: ctx.IDENTIFIER().getText(),
      signature: this.visitSignature(ctx.signature()),
      body: this.visitBlock(ctx.block()),
    };
    return functionDecl;
  };

  visitBlock = (ctx: BlockContext): Block => {
    return {
      type: "Block",
      //   position: getPosition(ctx),
      statementList: this.visitStatementList(ctx.statementList()),
    };
  };

  visitStatementList = (ctx: StatementListContext): StatementList => {
    if (ctx == null) {
      return {
        type: "StatementList",
        statements: [],
      };
    }
    const statements: Statement[] = [];
    if (ctx.statement_list() != null) {
      for (const stmt of ctx.statement_list()) {
        statements.push(this.visitStatement(stmt));
      }
    }
    return {
      type: "StatementList",
      //   position: getPosition(ctx),
      statements: statements,
    };
  };

  visitStatement = (ctx: StatementContext): Statement => {
    if (ctx.declaration() != null) {
      return this.visitDeclaration(ctx.declaration());
    } else if (ctx.simpleStmt != null) {
      return this.visitSimpleStmt(ctx.simpleStmt());
    }
  };

  visitSimpleStmt = (ctx: SimpleStmtContext): Statement => {
    if (ctx.expressionStmt() != null) {
      return this.visitExpressionStmt(ctx.expressionStmt());
    }
  };

  visitExpressionStmt = (ctx: ExpressionStmtContext): ExpressionStatement => {
    return {
      type: "ExpressionStatement",
      //   position: getPosition(ctx),
      expression: this.visitExpression(ctx.expression()),
    };
  };

  visitExpression = (ctx: ExpressionContext): Expression => {
    console.log(ctx.getText());
    if (ctx == null) {
      throw new Error("Expression is null");
    }

    if (ctx.expression_list().length == 1) {
      return {
        type: "UnaryExpr",
        operator: (ctx._unary_op.text as UnaryOperator),
        expr: this.visitExpression(ctx.expression(0)),
      };
    }

    if (ctx.PLUS() != null) {
      return {
        type: "BinaryOperationExpr",
        operator: "+",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.MINUS() != null) {
      return {
        type: "BinaryOperationExpr",
        operator: "-",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.DIV() != null) {
      return {
        type: "BinaryOperationExpr",
        operator: "/",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.STAR() != null) {
      return {
        type: "BinaryOperationExpr",
        operator: "*",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.MOD() != null) {
      return {
        type: "BinaryOperationExpr",
        operator: "%",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.LESS() != null) {
      return {
        type: "BinaryOperationExpr",
        operator: "<",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.LESS_OR_EQUALS() != null) {
      return {
        type: "BinaryOperationExpr",
        operator: "<=",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.GREATER() != null) {
      return {
        type: "BinaryOperationExpr",
        operator: ">",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.GREATER_OR_EQUALS() != null) {
      return {
        type: "BinaryOperationExpr",
        operator: ">=",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.EQUALS() != null) {
      return {
        type: "BinaryOperationExpr",
        operator: "==",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.NOT_EQUALS() != null) {
      return {
        type: "BinaryOperationExpr",
        operator: "!=",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.LOGICAL_AND() != null) {
      return {
        type: "BinaryOperationExpr",
        operator: "&&",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.LOGICAL_OR() != null) {
      return {
        type: "BinaryOperationExpr",
        operator: "||",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.primaryExpr() != null) {
      return this.visitPrimaryExpr(ctx.primaryExpr());
    }

    throw new Error("Not implemented");
  };

  visitPrimaryExpr = (ctx: PrimaryExprContext): Expression => {
    console.log(ctx.getText());
    if (ctx.IDENTIFIER() != null) {
      return {
        type: "Identifier",
        name: ctx.operand().getText(),
      };
    } else if (ctx.operand() != null) {
      return this.visitOperand(ctx.operand());
    }
    throw new Error("Not implemented");
  };

  visitSignature = (ctx: SignatureContext): Signature => {
    return {
      type: "Signature",
      //   position: getPosition(ctx),
      parameters: this.visitParameters(ctx.parameters()),
      result: ctx.result() ? this.visitResult(ctx.result()) : undefined,
    };
  };

  visitParameters = (ctx: ParametersContext): Parameters => {
    const parameterDecls: ParameterDecl[] = [];
    for (const param of ctx.parameterDecl_list()) {
      parameterDecls.push(this.visitParameterDecl(param));
    }
    return {
      type: "Parameters",
      //   position: getPosition(ctx),
      parameterDecls: parameterDecls,
    };
  };

  visitParameterDecl = (ctx: ParameterDeclContext): ParameterDecl => {
    return {
      type: "ParameterDecl",
      //   position: getPosition(ctx),
      identifierList: this.visitIdentifierList(ctx.identifierList()),
      isVariadic: ctx.ELLIPSIS() != null,
      dataType: ctx.type_().getText(),
    };
  };

  visitResult = (ctx: ResultContext): Result => {
    var dataTypes: string[] = [];
    // multiple return values
    if (ctx.parameters() != null) {
      dataTypes = ctx
        .parameters()
        .parameterDecl_list()
        .map((param) => param.type_().getText());
    } else {
      dataTypes = [ctx.type_().getText()];
    }
    return {
      type: "Result",
      //   position: getPosition(ctx),
      dataTypes: dataTypes,
    };
  };

  visitIdentifierList = (ctx: IdentifierListContext): IdentifierList => {
    return {
      type: "IdentifierList",
      //   position: getPosition(ctx),
      identifiers: ctx.IDENTIFIER_list().map((id) => id.getText()),
    };
  };

  //  we ignore typeDecl
  visitDeclaration = (ctx: DeclarationContext): Declaration => {
    if (ctx.constDecl() != null) {
      console.log("constDecl");
      return this.visitConstDecl(ctx.constDecl());
    } else if (ctx.varDecl() != null) {
      console.log("varDecl");
      return this.visitVarDecl(ctx.varDecl());
    }
    throw new Error("Not implemented");
  };

  visitConstDecl = (ctx: ConstDeclContext): ConstDecl => {
    const specs: ConstSpec[] = [];
    return {
      type: "ConstDecl",
      //   position: getPosition(ctx),
      specs: specs,
    };
  };

  visitVarDecl = (ctx: VarDeclContext): VarDecl => {
    const specs: VarSpec[] = [];
    return {
      type: "VarDecl",
      //   position: getPosition(ctx),
      specs: [],
    };
  };

  visitOperand = (ctx: OperandContext): Operand => {
    if (ctx.literal() != null) {
      return this.visitLiteral(ctx.literal());
    } else if (ctx.L_PAREN && ctx.R_PAREN) {
      return this.visitExpression(ctx.expression());
    }
  }

  visitLiteral = (ctx: LiteralContext): Literal => {
    if (ctx.basicLit() != null) {
      return {
        // TODO: do for other types
        type: "IntegerLiteral",
        value: parseInt(ctx.basicLit().getText()),
      };
    }
  }
}