// Generated from GoParser.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


import { SourceFileContext } from "./GoParser";
import { PackageClauseContext } from "./GoParser";
import { ImportDeclContext } from "./GoParser";
import { ImportSpecContext } from "./GoParser";
import { ImportPathContext } from "./GoParser";
import { DeclarationContext } from "./GoParser";
import { ConstDeclContext } from "./GoParser";
import { ConstSpecContext } from "./GoParser";
import { IdentifierListContext } from "./GoParser";
import { ExpressionListContext } from "./GoParser";
import { TypeDeclContext } from "./GoParser";
import { TypeSpecContext } from "./GoParser";
import { AliasDeclContext } from "./GoParser";
import { TypeDefContext } from "./GoParser";
import { TypeParametersContext } from "./GoParser";
import { TypeParameterDeclContext } from "./GoParser";
import { TypeElementContext } from "./GoParser";
import { TypeTermContext } from "./GoParser";
import { FunctionDeclContext } from "./GoParser";
import { MethodDeclContext } from "./GoParser";
import { ReceiverContext } from "./GoParser";
import { VarDeclContext } from "./GoParser";
import { VarSpecContext } from "./GoParser";
import { BlockContext } from "./GoParser";
import { StatementListContext } from "./GoParser";
import { StatementContext } from "./GoParser";
import { SimpleStmtContext } from "./GoParser";
import { ExpressionStmtContext } from "./GoParser";
import { SendStmtContext } from "./GoParser";
import { IncDecStmtContext } from "./GoParser";
import { AssignmentContext } from "./GoParser";
import { Assign_opContext } from "./GoParser";
import { ShortVarDeclContext } from "./GoParser";
import { LabeledStmtContext } from "./GoParser";
import { ReturnStmtContext } from "./GoParser";
import { BreakStmtContext } from "./GoParser";
import { ContinueStmtContext } from "./GoParser";
import { GotoStmtContext } from "./GoParser";
import { FallthroughStmtContext } from "./GoParser";
import { DeferStmtContext } from "./GoParser";
import { IfStmtContext } from "./GoParser";
import { SwitchStmtContext } from "./GoParser";
import { ExprSwitchStmtContext } from "./GoParser";
import { ExprCaseClauseContext } from "./GoParser";
import { ExprSwitchCaseContext } from "./GoParser";
import { TypeSwitchStmtContext } from "./GoParser";
import { TypeSwitchGuardContext } from "./GoParser";
import { TypeCaseClauseContext } from "./GoParser";
import { TypeSwitchCaseContext } from "./GoParser";
import { TypeListContext } from "./GoParser";
import { SelectStmtContext } from "./GoParser";
import { CommClauseContext } from "./GoParser";
import { CommCaseContext } from "./GoParser";
import { RecvStmtContext } from "./GoParser";
import { ForStmtContext } from "./GoParser";
import { ForClauseContext } from "./GoParser";
import { RangeClauseContext } from "./GoParser";
import { GoStmtContext } from "./GoParser";
import { Type_Context } from "./GoParser";
import { TypeArgsContext } from "./GoParser";
import { TypeNameContext } from "./GoParser";
import { TypeLitContext } from "./GoParser";
import { ArrayTypeContext } from "./GoParser";
import { ArrayLengthContext } from "./GoParser";
import { ElementTypeContext } from "./GoParser";
import { PointerTypeContext } from "./GoParser";
import { InterfaceTypeContext } from "./GoParser";
import { SliceTypeContext } from "./GoParser";
import { MapTypeContext } from "./GoParser";
import { ChannelTypeContext } from "./GoParser";
import { MethodSpecContext } from "./GoParser";
import { FunctionTypeContext } from "./GoParser";
import { SignatureContext } from "./GoParser";
import { ResultContext } from "./GoParser";
import { ParametersContext } from "./GoParser";
import { ParameterDeclContext } from "./GoParser";
import { ExpressionContext } from "./GoParser";
import { PrimaryExprContext } from "./GoParser";
import { ConversionContext } from "./GoParser";
import { OperandContext } from "./GoParser";
import { LiteralContext } from "./GoParser";
import { BasicLitContext } from "./GoParser";
import { IntegerContext } from "./GoParser";
import { OperandNameContext } from "./GoParser";
import { QualifiedIdentContext } from "./GoParser";
import { CompositeLitContext } from "./GoParser";
import { LiteralTypeContext } from "./GoParser";
import { LiteralValueContext } from "./GoParser";
import { ElementListContext } from "./GoParser";
import { KeyedElementContext } from "./GoParser";
import { KeyContext } from "./GoParser";
import { ElementContext } from "./GoParser";
import { StructTypeContext } from "./GoParser";
import { FieldDeclContext } from "./GoParser";
import { String_Context } from "./GoParser";
import { EmbeddedFieldContext } from "./GoParser";
import { FunctionLitContext } from "./GoParser";
import { IndexContext } from "./GoParser";
import { Slice_Context } from "./GoParser";
import { TypeAssertionContext } from "./GoParser";
import { ArgumentsContext } from "./GoParser";
import { MethodExprContext } from "./GoParser";
import { EosContext } from "./GoParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `GoParser`.
 */
export default class GoParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `GoParser.sourceFile`.
	 * @param ctx the parse tree
	 */
	enterSourceFile?: (ctx: SourceFileContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.sourceFile`.
	 * @param ctx the parse tree
	 */
	exitSourceFile?: (ctx: SourceFileContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.packageClause`.
	 * @param ctx the parse tree
	 */
	enterPackageClause?: (ctx: PackageClauseContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.packageClause`.
	 * @param ctx the parse tree
	 */
	exitPackageClause?: (ctx: PackageClauseContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.importDecl`.
	 * @param ctx the parse tree
	 */
	enterImportDecl?: (ctx: ImportDeclContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.importDecl`.
	 * @param ctx the parse tree
	 */
	exitImportDecl?: (ctx: ImportDeclContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.importSpec`.
	 * @param ctx the parse tree
	 */
	enterImportSpec?: (ctx: ImportSpecContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.importSpec`.
	 * @param ctx the parse tree
	 */
	exitImportSpec?: (ctx: ImportSpecContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.importPath`.
	 * @param ctx the parse tree
	 */
	enterImportPath?: (ctx: ImportPathContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.importPath`.
	 * @param ctx the parse tree
	 */
	exitImportPath?: (ctx: ImportPathContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.declaration`.
	 * @param ctx the parse tree
	 */
	enterDeclaration?: (ctx: DeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.declaration`.
	 * @param ctx the parse tree
	 */
	exitDeclaration?: (ctx: DeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.constDecl`.
	 * @param ctx the parse tree
	 */
	enterConstDecl?: (ctx: ConstDeclContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.constDecl`.
	 * @param ctx the parse tree
	 */
	exitConstDecl?: (ctx: ConstDeclContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.constSpec`.
	 * @param ctx the parse tree
	 */
	enterConstSpec?: (ctx: ConstSpecContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.constSpec`.
	 * @param ctx the parse tree
	 */
	exitConstSpec?: (ctx: ConstSpecContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.identifierList`.
	 * @param ctx the parse tree
	 */
	enterIdentifierList?: (ctx: IdentifierListContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.identifierList`.
	 * @param ctx the parse tree
	 */
	exitIdentifierList?: (ctx: IdentifierListContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.expressionList`.
	 * @param ctx the parse tree
	 */
	enterExpressionList?: (ctx: ExpressionListContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.expressionList`.
	 * @param ctx the parse tree
	 */
	exitExpressionList?: (ctx: ExpressionListContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeDecl`.
	 * @param ctx the parse tree
	 */
	enterTypeDecl?: (ctx: TypeDeclContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeDecl`.
	 * @param ctx the parse tree
	 */
	exitTypeDecl?: (ctx: TypeDeclContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeSpec`.
	 * @param ctx the parse tree
	 */
	enterTypeSpec?: (ctx: TypeSpecContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeSpec`.
	 * @param ctx the parse tree
	 */
	exitTypeSpec?: (ctx: TypeSpecContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.aliasDecl`.
	 * @param ctx the parse tree
	 */
	enterAliasDecl?: (ctx: AliasDeclContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.aliasDecl`.
	 * @param ctx the parse tree
	 */
	exitAliasDecl?: (ctx: AliasDeclContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeDef`.
	 * @param ctx the parse tree
	 */
	enterTypeDef?: (ctx: TypeDefContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeDef`.
	 * @param ctx the parse tree
	 */
	exitTypeDef?: (ctx: TypeDefContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeParameters`.
	 * @param ctx the parse tree
	 */
	enterTypeParameters?: (ctx: TypeParametersContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeParameters`.
	 * @param ctx the parse tree
	 */
	exitTypeParameters?: (ctx: TypeParametersContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeParameterDecl`.
	 * @param ctx the parse tree
	 */
	enterTypeParameterDecl?: (ctx: TypeParameterDeclContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeParameterDecl`.
	 * @param ctx the parse tree
	 */
	exitTypeParameterDecl?: (ctx: TypeParameterDeclContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeElement`.
	 * @param ctx the parse tree
	 */
	enterTypeElement?: (ctx: TypeElementContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeElement`.
	 * @param ctx the parse tree
	 */
	exitTypeElement?: (ctx: TypeElementContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeTerm`.
	 * @param ctx the parse tree
	 */
	enterTypeTerm?: (ctx: TypeTermContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeTerm`.
	 * @param ctx the parse tree
	 */
	exitTypeTerm?: (ctx: TypeTermContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.functionDecl`.
	 * @param ctx the parse tree
	 */
	enterFunctionDecl?: (ctx: FunctionDeclContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.functionDecl`.
	 * @param ctx the parse tree
	 */
	exitFunctionDecl?: (ctx: FunctionDeclContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.methodDecl`.
	 * @param ctx the parse tree
	 */
	enterMethodDecl?: (ctx: MethodDeclContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.methodDecl`.
	 * @param ctx the parse tree
	 */
	exitMethodDecl?: (ctx: MethodDeclContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.receiver`.
	 * @param ctx the parse tree
	 */
	enterReceiver?: (ctx: ReceiverContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.receiver`.
	 * @param ctx the parse tree
	 */
	exitReceiver?: (ctx: ReceiverContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.varDecl`.
	 * @param ctx the parse tree
	 */
	enterVarDecl?: (ctx: VarDeclContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.varDecl`.
	 * @param ctx the parse tree
	 */
	exitVarDecl?: (ctx: VarDeclContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.varSpec`.
	 * @param ctx the parse tree
	 */
	enterVarSpec?: (ctx: VarSpecContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.varSpec`.
	 * @param ctx the parse tree
	 */
	exitVarSpec?: (ctx: VarSpecContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.block`.
	 * @param ctx the parse tree
	 */
	enterBlock?: (ctx: BlockContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.block`.
	 * @param ctx the parse tree
	 */
	exitBlock?: (ctx: BlockContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.statementList`.
	 * @param ctx the parse tree
	 */
	enterStatementList?: (ctx: StatementListContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.statementList`.
	 * @param ctx the parse tree
	 */
	exitStatementList?: (ctx: StatementListContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.simpleStmt`.
	 * @param ctx the parse tree
	 */
	enterSimpleStmt?: (ctx: SimpleStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.simpleStmt`.
	 * @param ctx the parse tree
	 */
	exitSimpleStmt?: (ctx: SimpleStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.expressionStmt`.
	 * @param ctx the parse tree
	 */
	enterExpressionStmt?: (ctx: ExpressionStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.expressionStmt`.
	 * @param ctx the parse tree
	 */
	exitExpressionStmt?: (ctx: ExpressionStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.sendStmt`.
	 * @param ctx the parse tree
	 */
	enterSendStmt?: (ctx: SendStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.sendStmt`.
	 * @param ctx the parse tree
	 */
	exitSendStmt?: (ctx: SendStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.incDecStmt`.
	 * @param ctx the parse tree
	 */
	enterIncDecStmt?: (ctx: IncDecStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.incDecStmt`.
	 * @param ctx the parse tree
	 */
	exitIncDecStmt?: (ctx: IncDecStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.assignment`.
	 * @param ctx the parse tree
	 */
	enterAssignment?: (ctx: AssignmentContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.assignment`.
	 * @param ctx the parse tree
	 */
	exitAssignment?: (ctx: AssignmentContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.assign_op`.
	 * @param ctx the parse tree
	 */
	enterAssign_op?: (ctx: Assign_opContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.assign_op`.
	 * @param ctx the parse tree
	 */
	exitAssign_op?: (ctx: Assign_opContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.shortVarDecl`.
	 * @param ctx the parse tree
	 */
	enterShortVarDecl?: (ctx: ShortVarDeclContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.shortVarDecl`.
	 * @param ctx the parse tree
	 */
	exitShortVarDecl?: (ctx: ShortVarDeclContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.labeledStmt`.
	 * @param ctx the parse tree
	 */
	enterLabeledStmt?: (ctx: LabeledStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.labeledStmt`.
	 * @param ctx the parse tree
	 */
	exitLabeledStmt?: (ctx: LabeledStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.returnStmt`.
	 * @param ctx the parse tree
	 */
	enterReturnStmt?: (ctx: ReturnStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.returnStmt`.
	 * @param ctx the parse tree
	 */
	exitReturnStmt?: (ctx: ReturnStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.breakStmt`.
	 * @param ctx the parse tree
	 */
	enterBreakStmt?: (ctx: BreakStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.breakStmt`.
	 * @param ctx the parse tree
	 */
	exitBreakStmt?: (ctx: BreakStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.continueStmt`.
	 * @param ctx the parse tree
	 */
	enterContinueStmt?: (ctx: ContinueStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.continueStmt`.
	 * @param ctx the parse tree
	 */
	exitContinueStmt?: (ctx: ContinueStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.gotoStmt`.
	 * @param ctx the parse tree
	 */
	enterGotoStmt?: (ctx: GotoStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.gotoStmt`.
	 * @param ctx the parse tree
	 */
	exitGotoStmt?: (ctx: GotoStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.fallthroughStmt`.
	 * @param ctx the parse tree
	 */
	enterFallthroughStmt?: (ctx: FallthroughStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.fallthroughStmt`.
	 * @param ctx the parse tree
	 */
	exitFallthroughStmt?: (ctx: FallthroughStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.deferStmt`.
	 * @param ctx the parse tree
	 */
	enterDeferStmt?: (ctx: DeferStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.deferStmt`.
	 * @param ctx the parse tree
	 */
	exitDeferStmt?: (ctx: DeferStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.ifStmt`.
	 * @param ctx the parse tree
	 */
	enterIfStmt?: (ctx: IfStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.ifStmt`.
	 * @param ctx the parse tree
	 */
	exitIfStmt?: (ctx: IfStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.switchStmt`.
	 * @param ctx the parse tree
	 */
	enterSwitchStmt?: (ctx: SwitchStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.switchStmt`.
	 * @param ctx the parse tree
	 */
	exitSwitchStmt?: (ctx: SwitchStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.exprSwitchStmt`.
	 * @param ctx the parse tree
	 */
	enterExprSwitchStmt?: (ctx: ExprSwitchStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.exprSwitchStmt`.
	 * @param ctx the parse tree
	 */
	exitExprSwitchStmt?: (ctx: ExprSwitchStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.exprCaseClause`.
	 * @param ctx the parse tree
	 */
	enterExprCaseClause?: (ctx: ExprCaseClauseContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.exprCaseClause`.
	 * @param ctx the parse tree
	 */
	exitExprCaseClause?: (ctx: ExprCaseClauseContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.exprSwitchCase`.
	 * @param ctx the parse tree
	 */
	enterExprSwitchCase?: (ctx: ExprSwitchCaseContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.exprSwitchCase`.
	 * @param ctx the parse tree
	 */
	exitExprSwitchCase?: (ctx: ExprSwitchCaseContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeSwitchStmt`.
	 * @param ctx the parse tree
	 */
	enterTypeSwitchStmt?: (ctx: TypeSwitchStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeSwitchStmt`.
	 * @param ctx the parse tree
	 */
	exitTypeSwitchStmt?: (ctx: TypeSwitchStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeSwitchGuard`.
	 * @param ctx the parse tree
	 */
	enterTypeSwitchGuard?: (ctx: TypeSwitchGuardContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeSwitchGuard`.
	 * @param ctx the parse tree
	 */
	exitTypeSwitchGuard?: (ctx: TypeSwitchGuardContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeCaseClause`.
	 * @param ctx the parse tree
	 */
	enterTypeCaseClause?: (ctx: TypeCaseClauseContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeCaseClause`.
	 * @param ctx the parse tree
	 */
	exitTypeCaseClause?: (ctx: TypeCaseClauseContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeSwitchCase`.
	 * @param ctx the parse tree
	 */
	enterTypeSwitchCase?: (ctx: TypeSwitchCaseContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeSwitchCase`.
	 * @param ctx the parse tree
	 */
	exitTypeSwitchCase?: (ctx: TypeSwitchCaseContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeList`.
	 * @param ctx the parse tree
	 */
	enterTypeList?: (ctx: TypeListContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeList`.
	 * @param ctx the parse tree
	 */
	exitTypeList?: (ctx: TypeListContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.selectStmt`.
	 * @param ctx the parse tree
	 */
	enterSelectStmt?: (ctx: SelectStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.selectStmt`.
	 * @param ctx the parse tree
	 */
	exitSelectStmt?: (ctx: SelectStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.commClause`.
	 * @param ctx the parse tree
	 */
	enterCommClause?: (ctx: CommClauseContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.commClause`.
	 * @param ctx the parse tree
	 */
	exitCommClause?: (ctx: CommClauseContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.commCase`.
	 * @param ctx the parse tree
	 */
	enterCommCase?: (ctx: CommCaseContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.commCase`.
	 * @param ctx the parse tree
	 */
	exitCommCase?: (ctx: CommCaseContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.recvStmt`.
	 * @param ctx the parse tree
	 */
	enterRecvStmt?: (ctx: RecvStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.recvStmt`.
	 * @param ctx the parse tree
	 */
	exitRecvStmt?: (ctx: RecvStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.forStmt`.
	 * @param ctx the parse tree
	 */
	enterForStmt?: (ctx: ForStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.forStmt`.
	 * @param ctx the parse tree
	 */
	exitForStmt?: (ctx: ForStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.forClause`.
	 * @param ctx the parse tree
	 */
	enterForClause?: (ctx: ForClauseContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.forClause`.
	 * @param ctx the parse tree
	 */
	exitForClause?: (ctx: ForClauseContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.rangeClause`.
	 * @param ctx the parse tree
	 */
	enterRangeClause?: (ctx: RangeClauseContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.rangeClause`.
	 * @param ctx the parse tree
	 */
	exitRangeClause?: (ctx: RangeClauseContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.goStmt`.
	 * @param ctx the parse tree
	 */
	enterGoStmt?: (ctx: GoStmtContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.goStmt`.
	 * @param ctx the parse tree
	 */
	exitGoStmt?: (ctx: GoStmtContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.type_`.
	 * @param ctx the parse tree
	 */
	enterType_?: (ctx: Type_Context) => void;
	/**
	 * Exit a parse tree produced by `GoParser.type_`.
	 * @param ctx the parse tree
	 */
	exitType_?: (ctx: Type_Context) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeArgs`.
	 * @param ctx the parse tree
	 */
	enterTypeArgs?: (ctx: TypeArgsContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeArgs`.
	 * @param ctx the parse tree
	 */
	exitTypeArgs?: (ctx: TypeArgsContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeName`.
	 * @param ctx the parse tree
	 */
	enterTypeName?: (ctx: TypeNameContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeName`.
	 * @param ctx the parse tree
	 */
	exitTypeName?: (ctx: TypeNameContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeLit`.
	 * @param ctx the parse tree
	 */
	enterTypeLit?: (ctx: TypeLitContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeLit`.
	 * @param ctx the parse tree
	 */
	exitTypeLit?: (ctx: TypeLitContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.arrayType`.
	 * @param ctx the parse tree
	 */
	enterArrayType?: (ctx: ArrayTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.arrayType`.
	 * @param ctx the parse tree
	 */
	exitArrayType?: (ctx: ArrayTypeContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.arrayLength`.
	 * @param ctx the parse tree
	 */
	enterArrayLength?: (ctx: ArrayLengthContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.arrayLength`.
	 * @param ctx the parse tree
	 */
	exitArrayLength?: (ctx: ArrayLengthContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.elementType`.
	 * @param ctx the parse tree
	 */
	enterElementType?: (ctx: ElementTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.elementType`.
	 * @param ctx the parse tree
	 */
	exitElementType?: (ctx: ElementTypeContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.pointerType`.
	 * @param ctx the parse tree
	 */
	enterPointerType?: (ctx: PointerTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.pointerType`.
	 * @param ctx the parse tree
	 */
	exitPointerType?: (ctx: PointerTypeContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.interfaceType`.
	 * @param ctx the parse tree
	 */
	enterInterfaceType?: (ctx: InterfaceTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.interfaceType`.
	 * @param ctx the parse tree
	 */
	exitInterfaceType?: (ctx: InterfaceTypeContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.sliceType`.
	 * @param ctx the parse tree
	 */
	enterSliceType?: (ctx: SliceTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.sliceType`.
	 * @param ctx the parse tree
	 */
	exitSliceType?: (ctx: SliceTypeContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.mapType`.
	 * @param ctx the parse tree
	 */
	enterMapType?: (ctx: MapTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.mapType`.
	 * @param ctx the parse tree
	 */
	exitMapType?: (ctx: MapTypeContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.channelType`.
	 * @param ctx the parse tree
	 */
	enterChannelType?: (ctx: ChannelTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.channelType`.
	 * @param ctx the parse tree
	 */
	exitChannelType?: (ctx: ChannelTypeContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.methodSpec`.
	 * @param ctx the parse tree
	 */
	enterMethodSpec?: (ctx: MethodSpecContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.methodSpec`.
	 * @param ctx the parse tree
	 */
	exitMethodSpec?: (ctx: MethodSpecContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.functionType`.
	 * @param ctx the parse tree
	 */
	enterFunctionType?: (ctx: FunctionTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.functionType`.
	 * @param ctx the parse tree
	 */
	exitFunctionType?: (ctx: FunctionTypeContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.signature`.
	 * @param ctx the parse tree
	 */
	enterSignature?: (ctx: SignatureContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.signature`.
	 * @param ctx the parse tree
	 */
	exitSignature?: (ctx: SignatureContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.result`.
	 * @param ctx the parse tree
	 */
	enterResult?: (ctx: ResultContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.result`.
	 * @param ctx the parse tree
	 */
	exitResult?: (ctx: ResultContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.parameters`.
	 * @param ctx the parse tree
	 */
	enterParameters?: (ctx: ParametersContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.parameters`.
	 * @param ctx the parse tree
	 */
	exitParameters?: (ctx: ParametersContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.parameterDecl`.
	 * @param ctx the parse tree
	 */
	enterParameterDecl?: (ctx: ParameterDeclContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.parameterDecl`.
	 * @param ctx the parse tree
	 */
	exitParameterDecl?: (ctx: ParameterDeclContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.primaryExpr`.
	 * @param ctx the parse tree
	 */
	enterPrimaryExpr?: (ctx: PrimaryExprContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.primaryExpr`.
	 * @param ctx the parse tree
	 */
	exitPrimaryExpr?: (ctx: PrimaryExprContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.conversion`.
	 * @param ctx the parse tree
	 */
	enterConversion?: (ctx: ConversionContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.conversion`.
	 * @param ctx the parse tree
	 */
	exitConversion?: (ctx: ConversionContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.operand`.
	 * @param ctx the parse tree
	 */
	enterOperand?: (ctx: OperandContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.operand`.
	 * @param ctx the parse tree
	 */
	exitOperand?: (ctx: OperandContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.basicLit`.
	 * @param ctx the parse tree
	 */
	enterBasicLit?: (ctx: BasicLitContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.basicLit`.
	 * @param ctx the parse tree
	 */
	exitBasicLit?: (ctx: BasicLitContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.integer`.
	 * @param ctx the parse tree
	 */
	enterInteger?: (ctx: IntegerContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.integer`.
	 * @param ctx the parse tree
	 */
	exitInteger?: (ctx: IntegerContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.operandName`.
	 * @param ctx the parse tree
	 */
	enterOperandName?: (ctx: OperandNameContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.operandName`.
	 * @param ctx the parse tree
	 */
	exitOperandName?: (ctx: OperandNameContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.qualifiedIdent`.
	 * @param ctx the parse tree
	 */
	enterQualifiedIdent?: (ctx: QualifiedIdentContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.qualifiedIdent`.
	 * @param ctx the parse tree
	 */
	exitQualifiedIdent?: (ctx: QualifiedIdentContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.compositeLit`.
	 * @param ctx the parse tree
	 */
	enterCompositeLit?: (ctx: CompositeLitContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.compositeLit`.
	 * @param ctx the parse tree
	 */
	exitCompositeLit?: (ctx: CompositeLitContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.literalType`.
	 * @param ctx the parse tree
	 */
	enterLiteralType?: (ctx: LiteralTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.literalType`.
	 * @param ctx the parse tree
	 */
	exitLiteralType?: (ctx: LiteralTypeContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.literalValue`.
	 * @param ctx the parse tree
	 */
	enterLiteralValue?: (ctx: LiteralValueContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.literalValue`.
	 * @param ctx the parse tree
	 */
	exitLiteralValue?: (ctx: LiteralValueContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.elementList`.
	 * @param ctx the parse tree
	 */
	enterElementList?: (ctx: ElementListContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.elementList`.
	 * @param ctx the parse tree
	 */
	exitElementList?: (ctx: ElementListContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.keyedElement`.
	 * @param ctx the parse tree
	 */
	enterKeyedElement?: (ctx: KeyedElementContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.keyedElement`.
	 * @param ctx the parse tree
	 */
	exitKeyedElement?: (ctx: KeyedElementContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.key`.
	 * @param ctx the parse tree
	 */
	enterKey?: (ctx: KeyContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.key`.
	 * @param ctx the parse tree
	 */
	exitKey?: (ctx: KeyContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.element`.
	 * @param ctx the parse tree
	 */
	enterElement?: (ctx: ElementContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.element`.
	 * @param ctx the parse tree
	 */
	exitElement?: (ctx: ElementContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.structType`.
	 * @param ctx the parse tree
	 */
	enterStructType?: (ctx: StructTypeContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.structType`.
	 * @param ctx the parse tree
	 */
	exitStructType?: (ctx: StructTypeContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.fieldDecl`.
	 * @param ctx the parse tree
	 */
	enterFieldDecl?: (ctx: FieldDeclContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.fieldDecl`.
	 * @param ctx the parse tree
	 */
	exitFieldDecl?: (ctx: FieldDeclContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.string_`.
	 * @param ctx the parse tree
	 */
	enterString_?: (ctx: String_Context) => void;
	/**
	 * Exit a parse tree produced by `GoParser.string_`.
	 * @param ctx the parse tree
	 */
	exitString_?: (ctx: String_Context) => void;
	/**
	 * Enter a parse tree produced by `GoParser.embeddedField`.
	 * @param ctx the parse tree
	 */
	enterEmbeddedField?: (ctx: EmbeddedFieldContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.embeddedField`.
	 * @param ctx the parse tree
	 */
	exitEmbeddedField?: (ctx: EmbeddedFieldContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.functionLit`.
	 * @param ctx the parse tree
	 */
	enterFunctionLit?: (ctx: FunctionLitContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.functionLit`.
	 * @param ctx the parse tree
	 */
	exitFunctionLit?: (ctx: FunctionLitContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.index`.
	 * @param ctx the parse tree
	 */
	enterIndex?: (ctx: IndexContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.index`.
	 * @param ctx the parse tree
	 */
	exitIndex?: (ctx: IndexContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.slice_`.
	 * @param ctx the parse tree
	 */
	enterSlice_?: (ctx: Slice_Context) => void;
	/**
	 * Exit a parse tree produced by `GoParser.slice_`.
	 * @param ctx the parse tree
	 */
	exitSlice_?: (ctx: Slice_Context) => void;
	/**
	 * Enter a parse tree produced by `GoParser.typeAssertion`.
	 * @param ctx the parse tree
	 */
	enterTypeAssertion?: (ctx: TypeAssertionContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.typeAssertion`.
	 * @param ctx the parse tree
	 */
	exitTypeAssertion?: (ctx: TypeAssertionContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.arguments`.
	 * @param ctx the parse tree
	 */
	enterArguments?: (ctx: ArgumentsContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.arguments`.
	 * @param ctx the parse tree
	 */
	exitArguments?: (ctx: ArgumentsContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.methodExpr`.
	 * @param ctx the parse tree
	 */
	enterMethodExpr?: (ctx: MethodExprContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.methodExpr`.
	 * @param ctx the parse tree
	 */
	exitMethodExpr?: (ctx: MethodExprContext) => void;
	/**
	 * Enter a parse tree produced by `GoParser.eos`.
	 * @param ctx the parse tree
	 */
	enterEos?: (ctx: EosContext) => void;
	/**
	 * Exit a parse tree produced by `GoParser.eos`.
	 * @param ctx the parse tree
	 */
	exitEos?: (ctx: EosContext) => void;
}

