import { CharStreams, CommonTokenStream, ParserRuleContext } from "antlr4";
import GoLexer from "./gen/GoLexer";
import GoParser, {
  ArgumentsContext,
  AssignmentContext,
  BasicLitContext,
  BlockContext,
  ConstDeclContext,
  ConstSpecContext,
  DeclarationContext,
  ExpressionContext,
  ExpressionListContext,
  ExpressionStmtContext,
  ForStmtContext,
  FunctionDeclContext,
  FunctionLitContext,
  GoStmtContext,
  IdentifierListContext,
  IfStmtContext,
  IncDecStmtContext,
  LiteralContext,
  OperandContext,
  ParameterDeclContext,
  ParametersContext,
  PrimaryExprContext,
  ResultContext,
  ReturnStmtContext,
  ShortVarDeclContext,
  SignatureContext,
  SimpleStmtContext,
  SourceFileContext,
  StatementContext,
  StatementListContext,
  VarDeclContext,
  VarSpecContext,
} from "./gen/GoParser";
import GoParserVisitor from "./gen/GoParserVisitor";
import {
  Assignment,
  BasicLiteral,
  Block,
  ConstDecl,
  ConstSpec,
  Declaration,
  Expression,
  ExpressionList,
  ExpressionStatement,
  ForStatement,
  FunctionDecl,
  FunctionLiteral,
  GoNodeBase,
  GoStatement,
  Identifier,
  IdentifierList,
  IfStatement,
  IncDecStatement,
  IntegerLiteral,
  Literal,
  Operand,
  ParameterDecl,
  Parameters,
  Position,
  Result,
  ReturnStatement,
  Signature,
  SourceFile,
  SourceLevelDeclaration,
  Statement,
  StatementList,
  UnaryOperator,
  VarDecl,
  VarSpec,
} from "./ast";

export default function parse(input: string): SourceFile {
  const chars = CharStreams.fromString(input);
  const lexer = new GoLexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new GoParser(tokens);
  const tree = parser.sourceFile();

  return tree.accept(new CustomVisitor()) as SourceFile;
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
    console.log(ctx.getText());
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
    } else if (ctx.simpleStmt() != null) {
      return this.visitSimpleStmt(ctx.simpleStmt());
    } else if (ctx.ifStmt() != null) {
      return this.visitIfStmt(ctx.ifStmt());
    } else if (ctx.returnStmt() != null) {
      return this.visitReturnStmt(ctx.returnStmt());
    } else if (ctx.forStmt() != null) {
      return this.visitForStmt(ctx.forStmt());
    } else if (ctx.goStmt() != null) {
      return this.visitGoStmt(ctx.goStmt());
    }

    throw new Error("Not implemented");
  };

  visitGoStmt = (ctx: GoStmtContext): GoStatement => {
    return {
      type: "GoStatement",
      //   position: getPosition(ctx),
      expression: this.visitExpression(ctx.expression()),
    }
  }

  visitForStmt = (ctx: ForStmtContext): ForStatement => {
    return {
      type: "ForStatement",
      //   position: getPosition(ctx),
      condition: this.visitExpression(ctx.expression()),
      body: this.visitBlock(ctx.block()),
    };
  }

  visitReturnStmt = (ctx: ReturnStmtContext): ReturnStatement => {
    return {
      type: "ReturnStatement",
      //   position: getPosition(ctx),
      values: this.visitExpressionList(ctx.expressionList()).expressions,
    };
  }

  visitIfStmt = (ctx: IfStmtContext): IfStatement => {
    // we don't support if x := f(); x < y { ... }

    let elseBranch = undefined;
    // else if
    if (ctx.ifStmt() != null) {
      elseBranch = this.visitIfStmt(ctx.ifStmt());
    } else if (ctx.block(1) != null) {
      elseBranch = this.visitBlock(ctx.block(1));
    }

    return {
      type: "IfStatement",
      //   position: getPosition(ctx),
      condition: this.visitExpression(ctx.expression()),
      ifBranch: this.visitBlock(ctx.block(0)),
      elseBranch: elseBranch,
    };
  }

  visitSimpleStmt = (ctx: SimpleStmtContext): Statement => {
    if (ctx.expressionStmt() != null) {
      return this.visitExpressionStmt(ctx.expressionStmt());
    } else if (ctx.assignment() != null) {
      return this.visitAssignment(ctx.assignment());
    } else if (ctx.shortVarDecl() != null) {
      return this.visitShortVarDecl(ctx.shortVarDecl());
    } else if (ctx.incDecStmt() != null) {
      return this.visitIncDecStmt(ctx.incDecStmt());
    } else if (ctx.sendStmt() != null) {
      return {
        type: "SendStatement",
        //   position: getPosition(ctx),
        channel: this.visitExpression(ctx.sendStmt().expression(0)),
        value: this.visitExpression(ctx.sendStmt().expression(1)),
      }
    }

    throw new Error("Not implemented");
  };

  visitIncDecStmt = (ctx: IncDecStmtContext): IncDecStatement => {
    return {
      type: "IncDecStatement",
      //   position: getPosition(ctx),
      expression: this.visitExpression(ctx.expression()),
      operator: ctx.PLUS_PLUS() ? "++" : "--",
    };
  }

  visitShortVarDecl = (ctx: ShortVarDeclContext): Assignment => {
    return {
      type: "Assignment",
      //   position: getPosition(ctx),
      left: this.visitIdentifierList(ctx.identifierList()).identifiers,
      right: this.visitExpressionList(ctx.expressionList()).expressions,
    }
  }

  visitAssignment = (ctx: AssignmentContext): Assignment => {
    return {
      type: "Assignment",
      //   position: getPosition(ctx),
      left: this.visitExpressionList(ctx.expressionList(0)).expressions,
      right: this.visitExpressionList(ctx.expressionList(1)).expressions,
    }
  }

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
        type: "BinaryExpr",
        operator: "+",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.MINUS() != null) {
      return {
        type: "BinaryExpr",
        operator: "-",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.DIV() != null) {
      return {
        type: "BinaryExpr",
        operator: "/",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.STAR() != null) {
      return {
        type: "BinaryExpr",
        operator: "*",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.MOD() != null) {
      return {
        type: "BinaryExpr",
        operator: "%",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.LESS() != null) {
      return {
        type: "BinaryExpr",
        operator: "<",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.LESS_OR_EQUALS() != null) {
      return {
        type: "BinaryExpr",
        operator: "<=",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.GREATER() != null) {
      return {
        type: "BinaryExpr",
        operator: ">",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.GREATER_OR_EQUALS() != null) {
      return {
        type: "BinaryExpr",
        operator: ">=",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.EQUALS() != null) {
      return {
        type: "BinaryExpr",
        operator: "==",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.NOT_EQUALS() != null) {
      return {
        type: "BinaryExpr",
        operator: "!=",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.LOGICAL_AND() != null) {
      return {
        type: "BinaryExpr",
        operator: "&&",
        left: this.visitExpression(ctx.expression(0)),
        right: this.visitExpression(ctx.expression(1)),
      };
    } else if (ctx.LOGICAL_OR() != null) {
      return {
        type: "BinaryExpr",
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
    } else if (ctx.primaryExpr() !== null && ctx.arguments() !== null) {
      console.log(ctx.primaryExpr().getText(), ctx.arguments().getText());
      console.log(ctx.primaryExpr().getText() === "make")
      if (ctx.primaryExpr().getText() === "make") {
        const expr = this.visitArguments(ctx.arguments()).expressions
        return {
          type: "MakeExpression",
          //   position: getPosition(ctx),
          dataType: (expr[0] as Identifier).name,
          capacity: expr.length > 1 ? (expr[1] as IntegerLiteral).value : 0,
        };
        }

      return {
        type: "FunctionCall",
        //   position: getPosition(ctx),
        func: this.visitPrimaryExpr(ctx.primaryExpr()) as Identifier,
        args: this.visitArguments(ctx.arguments())?.expressions,
      };
    }
    
    throw new Error("Not implemented");
  };

  visitArguments = (ctx: ArgumentsContext): ExpressionList => {
    if (ctx.type_() !== null) {
      const expressions: Expression[] = [{ type: "Identifier", name: ctx.type_().getText() }];
      if (ctx.expressionList() !== null) {
        console.log(ctx.expressionList().getText())
        for (const expr of this.visitExpressionList(ctx.expressionList()).expressions) {
          expressions.push(expr)
        }
      }
      return {
        type: "ExpressionList",
        //   position: getPosition(ctx),
        expressions: expressions,
      }
      } else if (ctx.expressionList() !== null) {
       return this.visitExpressionList(ctx.expressionList());
    }
  }

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
      identifiers: ctx.IDENTIFIER_list().map((id) => ({
        type: "Identifier",
        name: id.getText(),
      })),
    };
  };

  //  we ignore typeDecl
  visitDeclaration = (ctx: DeclarationContext): Declaration => {
    if (ctx.constDecl() != null) {
      return this.visitConstDecl(ctx.constDecl());
    } else if (ctx.varDecl() != null) {
      return this.visitVarDecl(ctx.varDecl());
    }
    throw new Error("Not implemented");
  };

  visitConstDecl = (ctx: ConstDeclContext): ConstDecl => {
    const specs: ConstSpec[] = [];
    for (const spec of ctx.constSpec_list()) {
      const constSpec =this.visitConstSpec(spec)
      if (constSpec.identifierList.identifiers.length > constSpec.expressionList.expressions.length) {
        throw new Error("missing init expr for const decl");
      }
      specs.push(constSpec);
    }
    return {
      type: "ConstDecl",
      //   position: getPosition(ctx),
      specs: specs,
    };
  };

  visitConstSpec = (ctx: ConstSpecContext): ConstSpec => {
    return {
      type: "ConstSpec",
      //   position: getPosition(ctx),
      identifierList: this.visitIdentifierList(ctx.identifierList()),
      dataType: ctx.type_()?.getText(),
      expressionList: this.visitExpressionList(ctx.expressionList()),
    };
  }

  visitExpressionList = (ctx: ExpressionListContext): ExpressionList => {
    console.log(ctx.getText())
    const expressions: Expression[] = [];
    for (const expr of ctx.expression_list()) {
      expressions.push(this.visitExpression(expr));
    }
    return {
      type: "ExpressionList",
      //   position: getPosition(ctx),
      expressions: expressions,
    }
  }

  visitVarDecl = (ctx: VarDeclContext): VarDecl => {
    const specs: VarSpec[] = [];
    for (const spec of ctx.varSpec_list()) {
      const varSpec =this.visitVarSpec(spec)
      specs.push(varSpec);
    }

    return {
      type: "VarDecl",
      //   position: getPosition(ctx),
      specs: specs,
    };
  };

  visitVarSpec = (ctx: VarSpecContext): VarSpec => {
    return {
      type: "VarSpec",
      //   position: getPosition(ctx),
      identifierList: this.visitIdentifierList(ctx.identifierList()),
      dataType: ctx.type_()?.getText(),
      expressionList: this.visitExpressionList(ctx.expressionList()),
    };
  }


  visitOperand = (ctx: OperandContext): Operand => {
    if (ctx.literal() !== null) {
      return this.visitLiteral(ctx.literal());
    } else if (ctx.L_PAREN() !== null && ctx.R_PAREN !== null) {
      return this.visitExpression(ctx.expression());
    } else if (ctx.operandName() != null) {
      return {
        type: "Identifier",
        name: ctx.operandName().getText(),
      };
    }
  }

  visitLiteral = (ctx: LiteralContext): Literal => {
    if (ctx.basicLit() != null) {
      return this.visitBasicLit(ctx.basicLit());
    } else if (ctx.functionLit() != null) {
      return this.visitFunctionLit(ctx.functionLit());
    }

    throw new Error("Not implemented");
  }

  visitFunctionLit = (ctx: FunctionLitContext): FunctionLiteral => {
    return {
      type: "FunctionLiteral",
      //   position: getPosition(ctx),
      signature: this.visitSignature(ctx.signature()),
      body: this.visitBlock(ctx.block()),
    };
  }

  visitBasicLit = (ctx: BasicLitContext): BasicLiteral => {
    // console.log(ctx.getText());
    if (ctx.integer() != null) {
      return {
        type: "IntegerLiteral",
        value: parseInt(ctx.integer().getText()),
      };
    } else if (ctx.string_() != null) {
      return {
        type: "StringLiteral",
        value: ctx.string_().getText(),
      };
    } else if (ctx.TRUE_LIT() != null) {
      return {
        type: "BooleanLiteral",
        value: true,
      };
    } else if (ctx.FALSE_LIT() != null) {
      return {
        type: "BooleanLiteral",
        value: false,
      };
    }
  }
}
