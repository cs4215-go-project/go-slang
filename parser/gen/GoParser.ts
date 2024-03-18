// Generated from GoParser.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import GoParserVisitor from "./GoParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

// import GoParserBase from './GoParserBase';

export default class GoParser extends Parser {
	public static readonly BREAK = 1;
	public static readonly DEFAULT = 2;
	public static readonly FUNC = 3;
	public static readonly INTERFACE = 4;
	public static readonly SELECT = 5;
	public static readonly CASE = 6;
	public static readonly DEFER = 7;
	public static readonly GO = 8;
	public static readonly MAP = 9;
	public static readonly STRUCT = 10;
	public static readonly CHAN = 11;
	public static readonly ELSE = 12;
	public static readonly GOTO = 13;
	public static readonly PACKAGE = 14;
	public static readonly SWITCH = 15;
	public static readonly CONST = 16;
	public static readonly FALLTHROUGH = 17;
	public static readonly IF = 18;
	public static readonly RANGE = 19;
	public static readonly TYPE = 20;
	public static readonly CONTINUE = 21;
	public static readonly FOR = 22;
	public static readonly IMPORT = 23;
	public static readonly RETURN = 24;
	public static readonly VAR = 25;
	public static readonly NIL_LIT = 26;
	public static readonly IDENTIFIER = 27;
	public static readonly L_PAREN = 28;
	public static readonly R_PAREN = 29;
	public static readonly L_CURLY = 30;
	public static readonly R_CURLY = 31;
	public static readonly L_BRACKET = 32;
	public static readonly R_BRACKET = 33;
	public static readonly ASSIGN = 34;
	public static readonly COMMA = 35;
	public static readonly SEMI = 36;
	public static readonly COLON = 37;
	public static readonly DOT = 38;
	public static readonly PLUS_PLUS = 39;
	public static readonly MINUS_MINUS = 40;
	public static readonly DECLARE_ASSIGN = 41;
	public static readonly ELLIPSIS = 42;
	public static readonly LOGICAL_OR = 43;
	public static readonly LOGICAL_AND = 44;
	public static readonly EQUALS = 45;
	public static readonly NOT_EQUALS = 46;
	public static readonly LESS = 47;
	public static readonly LESS_OR_EQUALS = 48;
	public static readonly GREATER = 49;
	public static readonly GREATER_OR_EQUALS = 50;
	public static readonly OR = 51;
	public static readonly DIV = 52;
	public static readonly MOD = 53;
	public static readonly LSHIFT = 54;
	public static readonly RSHIFT = 55;
	public static readonly BIT_CLEAR = 56;
	public static readonly UNDERLYING = 57;
	public static readonly EXCLAMATION = 58;
	public static readonly PLUS = 59;
	public static readonly MINUS = 60;
	public static readonly CARET = 61;
	public static readonly STAR = 62;
	public static readonly AMPERSAND = 63;
	public static readonly RECEIVE = 64;
	public static readonly DECIMAL_LIT = 65;
	public static readonly BINARY_LIT = 66;
	public static readonly OCTAL_LIT = 67;
	public static readonly HEX_LIT = 68;
	public static readonly FLOAT_LIT = 69;
	public static readonly DECIMAL_FLOAT_LIT = 70;
	public static readonly HEX_FLOAT_LIT = 71;
	public static readonly IMAGINARY_LIT = 72;
	public static readonly RUNE_LIT = 73;
	public static readonly BYTE_VALUE = 74;
	public static readonly OCTAL_BYTE_VALUE = 75;
	public static readonly HEX_BYTE_VALUE = 76;
	public static readonly LITTLE_U_VALUE = 77;
	public static readonly BIG_U_VALUE = 78;
	public static readonly RAW_STRING_LIT = 79;
	public static readonly INTERPRETED_STRING_LIT = 80;
	public static readonly WS = 81;
	public static readonly COMMENT = 82;
	public static readonly TERMINATOR = 83;
	public static readonly LINE_COMMENT = 84;
	public static readonly WS_NLSEMI = 85;
	public static readonly COMMENT_NLSEMI = 86;
	public static readonly LINE_COMMENT_NLSEMI = 87;
	public static readonly EOS = 88;
	public static readonly OTHER = 89;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_sourceFile = 0;
	public static readonly RULE_packageClause = 1;
	public static readonly RULE_importDecl = 2;
	public static readonly RULE_importSpec = 3;
	public static readonly RULE_importPath = 4;
	public static readonly RULE_declaration = 5;
	public static readonly RULE_constDecl = 6;
	public static readonly RULE_constSpec = 7;
	public static readonly RULE_identifierList = 8;
	public static readonly RULE_expressionList = 9;
	public static readonly RULE_typeDecl = 10;
	public static readonly RULE_typeSpec = 11;
	public static readonly RULE_aliasDecl = 12;
	public static readonly RULE_typeDef = 13;
	public static readonly RULE_typeParameters = 14;
	public static readonly RULE_typeParameterDecl = 15;
	public static readonly RULE_typeElement = 16;
	public static readonly RULE_typeTerm = 17;
	public static readonly RULE_functionDecl = 18;
	public static readonly RULE_methodDecl = 19;
	public static readonly RULE_receiver = 20;
	public static readonly RULE_varDecl = 21;
	public static readonly RULE_varSpec = 22;
	public static readonly RULE_block = 23;
	public static readonly RULE_statementList = 24;
	public static readonly RULE_statement = 25;
	public static readonly RULE_simpleStmt = 26;
	public static readonly RULE_expressionStmt = 27;
	public static readonly RULE_sendStmt = 28;
	public static readonly RULE_incDecStmt = 29;
	public static readonly RULE_assignment = 30;
	public static readonly RULE_assign_op = 31;
	public static readonly RULE_shortVarDecl = 32;
	public static readonly RULE_labeledStmt = 33;
	public static readonly RULE_returnStmt = 34;
	public static readonly RULE_breakStmt = 35;
	public static readonly RULE_continueStmt = 36;
	public static readonly RULE_gotoStmt = 37;
	public static readonly RULE_fallthroughStmt = 38;
	public static readonly RULE_deferStmt = 39;
	public static readonly RULE_ifStmt = 40;
	public static readonly RULE_switchStmt = 41;
	public static readonly RULE_exprSwitchStmt = 42;
	public static readonly RULE_exprCaseClause = 43;
	public static readonly RULE_exprSwitchCase = 44;
	public static readonly RULE_typeSwitchStmt = 45;
	public static readonly RULE_typeSwitchGuard = 46;
	public static readonly RULE_typeCaseClause = 47;
	public static readonly RULE_typeSwitchCase = 48;
	public static readonly RULE_typeList = 49;
	public static readonly RULE_selectStmt = 50;
	public static readonly RULE_commClause = 51;
	public static readonly RULE_commCase = 52;
	public static readonly RULE_recvStmt = 53;
	public static readonly RULE_forStmt = 54;
	public static readonly RULE_forClause = 55;
	public static readonly RULE_rangeClause = 56;
	public static readonly RULE_goStmt = 57;
	public static readonly RULE_type_ = 58;
	public static readonly RULE_typeArgs = 59;
	public static readonly RULE_typeName = 60;
	public static readonly RULE_typeLit = 61;
	public static readonly RULE_arrayType = 62;
	public static readonly RULE_arrayLength = 63;
	public static readonly RULE_elementType = 64;
	public static readonly RULE_pointerType = 65;
	public static readonly RULE_interfaceType = 66;
	public static readonly RULE_sliceType = 67;
	public static readonly RULE_mapType = 68;
	public static readonly RULE_channelType = 69;
	public static readonly RULE_methodSpec = 70;
	public static readonly RULE_functionType = 71;
	public static readonly RULE_signature = 72;
	public static readonly RULE_result = 73;
	public static readonly RULE_parameters = 74;
	public static readonly RULE_parameterDecl = 75;
	public static readonly RULE_expression = 76;
	public static readonly RULE_primaryExpr = 77;
	public static readonly RULE_conversion = 78;
	public static readonly RULE_operand = 79;
	public static readonly RULE_literal = 80;
	public static readonly RULE_basicLit = 81;
	public static readonly RULE_integer = 82;
	public static readonly RULE_operandName = 83;
	public static readonly RULE_qualifiedIdent = 84;
	public static readonly RULE_compositeLit = 85;
	public static readonly RULE_literalType = 86;
	public static readonly RULE_literalValue = 87;
	public static readonly RULE_elementList = 88;
	public static readonly RULE_keyedElement = 89;
	public static readonly RULE_key = 90;
	public static readonly RULE_element = 91;
	public static readonly RULE_structType = 92;
	public static readonly RULE_fieldDecl = 93;
	public static readonly RULE_string_ = 94;
	public static readonly RULE_embeddedField = 95;
	public static readonly RULE_functionLit = 96;
	public static readonly RULE_index = 97;
	public static readonly RULE_slice_ = 98;
	public static readonly RULE_typeAssertion = 99;
	public static readonly RULE_arguments = 100;
	public static readonly RULE_methodExpr = 101;
	public static readonly RULE_eos = 102;
	public static readonly literalNames: (string | null)[] = [ null, "'break'", 
                                                            "'default'", 
                                                            "'func'", "'interface'", 
                                                            "'select'", 
                                                            "'case'", "'defer'", 
                                                            "'go'", "'map'", 
                                                            "'struct'", 
                                                            "'chan'", "'else'", 
                                                            "'goto'", "'package'", 
                                                            "'switch'", 
                                                            "'const'", "'fallthrough'", 
                                                            "'if'", "'range'", 
                                                            "'type'", "'continue'", 
                                                            "'for'", "'import'", 
                                                            "'return'", 
                                                            "'var'", "'nil'", 
                                                            null, "'('", 
                                                            "')'", "'{'", 
                                                            "'}'", "'['", 
                                                            "']'", "'='", 
                                                            "','", "';'", 
                                                            "':'", "'.'", 
                                                            "'++'", "'--'", 
                                                            "':='", "'...'", 
                                                            "'||'", "'&&'", 
                                                            "'=='", "'!='", 
                                                            "'<'", "'<='", 
                                                            "'>'", "'>='", 
                                                            "'|'", "'/'", 
                                                            "'%'", "'<<'", 
                                                            "'>>'", "'&^'", 
                                                            "'~'", "'!'", 
                                                            "'+'", "'-'", 
                                                            "'^'", "'*'", 
                                                            "'&'", "'<-'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "BREAK", 
                                                             "DEFAULT", 
                                                             "FUNC", "INTERFACE", 
                                                             "SELECT", "CASE", 
                                                             "DEFER", "GO", 
                                                             "MAP", "STRUCT", 
                                                             "CHAN", "ELSE", 
                                                             "GOTO", "PACKAGE", 
                                                             "SWITCH", "CONST", 
                                                             "FALLTHROUGH", 
                                                             "IF", "RANGE", 
                                                             "TYPE", "CONTINUE", 
                                                             "FOR", "IMPORT", 
                                                             "RETURN", "VAR", 
                                                             "NIL_LIT", 
                                                             "IDENTIFIER", 
                                                             "L_PAREN", 
                                                             "R_PAREN", 
                                                             "L_CURLY", 
                                                             "R_CURLY", 
                                                             "L_BRACKET", 
                                                             "R_BRACKET", 
                                                             "ASSIGN", "COMMA", 
                                                             "SEMI", "COLON", 
                                                             "DOT", "PLUS_PLUS", 
                                                             "MINUS_MINUS", 
                                                             "DECLARE_ASSIGN", 
                                                             "ELLIPSIS", 
                                                             "LOGICAL_OR", 
                                                             "LOGICAL_AND", 
                                                             "EQUALS", "NOT_EQUALS", 
                                                             "LESS", "LESS_OR_EQUALS", 
                                                             "GREATER", 
                                                             "GREATER_OR_EQUALS", 
                                                             "OR", "DIV", 
                                                             "MOD", "LSHIFT", 
                                                             "RSHIFT", "BIT_CLEAR", 
                                                             "UNDERLYING", 
                                                             "EXCLAMATION", 
                                                             "PLUS", "MINUS", 
                                                             "CARET", "STAR", 
                                                             "AMPERSAND", 
                                                             "RECEIVE", 
                                                             "DECIMAL_LIT", 
                                                             "BINARY_LIT", 
                                                             "OCTAL_LIT", 
                                                             "HEX_LIT", 
                                                             "FLOAT_LIT", 
                                                             "DECIMAL_FLOAT_LIT", 
                                                             "HEX_FLOAT_LIT", 
                                                             "IMAGINARY_LIT", 
                                                             "RUNE_LIT", 
                                                             "BYTE_VALUE", 
                                                             "OCTAL_BYTE_VALUE", 
                                                             "HEX_BYTE_VALUE", 
                                                             "LITTLE_U_VALUE", 
                                                             "BIG_U_VALUE", 
                                                             "RAW_STRING_LIT", 
                                                             "INTERPRETED_STRING_LIT", 
                                                             "WS", "COMMENT", 
                                                             "TERMINATOR", 
                                                             "LINE_COMMENT", 
                                                             "WS_NLSEMI", 
                                                             "COMMENT_NLSEMI", 
                                                             "LINE_COMMENT_NLSEMI", 
                                                             "EOS", "OTHER" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"sourceFile", "packageClause", "importDecl", "importSpec", "importPath", 
		"declaration", "constDecl", "constSpec", "identifierList", "expressionList", 
		"typeDecl", "typeSpec", "aliasDecl", "typeDef", "typeParameters", "typeParameterDecl", 
		"typeElement", "typeTerm", "functionDecl", "methodDecl", "receiver", "varDecl", 
		"varSpec", "block", "statementList", "statement", "simpleStmt", "expressionStmt", 
		"sendStmt", "incDecStmt", "assignment", "assign_op", "shortVarDecl", "labeledStmt", 
		"returnStmt", "breakStmt", "continueStmt", "gotoStmt", "fallthroughStmt", 
		"deferStmt", "ifStmt", "switchStmt", "exprSwitchStmt", "exprCaseClause", 
		"exprSwitchCase", "typeSwitchStmt", "typeSwitchGuard", "typeCaseClause", 
		"typeSwitchCase", "typeList", "selectStmt", "commClause", "commCase", 
		"recvStmt", "forStmt", "forClause", "rangeClause", "goStmt", "type_", 
		"typeArgs", "typeName", "typeLit", "arrayType", "arrayLength", "elementType", 
		"pointerType", "interfaceType", "sliceType", "mapType", "channelType", 
		"methodSpec", "functionType", "signature", "result", "parameters", "parameterDecl", 
		"expression", "primaryExpr", "conversion", "operand", "literal", "basicLit", 
		"integer", "operandName", "qualifiedIdent", "compositeLit", "literalType", 
		"literalValue", "elementList", "keyedElement", "key", "element", "structType", 
		"fieldDecl", "string_", "embeddedField", "functionLit", "index", "slice_", 
		"typeAssertion", "arguments", "methodExpr", "eos",
	];
	public get grammarFileName(): string { return "GoParser.g4"; }
	public get literalNames(): (string | null)[] { return GoParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return GoParser.symbolicNames; }
	public get ruleNames(): string[] { return GoParser.ruleNames; }
	public get serializedATN(): number[] { return GoParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, GoParser._ATN, GoParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public sourceFile(): SourceFileContext {
		let localctx: SourceFileContext = new SourceFileContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, GoParser.RULE_sourceFile);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 206;
			this.packageClause();
			this.state = 207;
			this.eos();
			this.state = 213;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===23) {
				{
				{
				this.state = 208;
				this.importDecl();
				this.state = 209;
				this.eos();
				}
				}
				this.state = 215;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 225;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 34668552) !== 0)) {
				{
				{
				this.state = 219;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
				case 1:
					{
					this.state = 216;
					this.functionDecl();
					}
					break;
				case 2:
					{
					this.state = 217;
					this.methodDecl();
					}
					break;
				case 3:
					{
					this.state = 218;
					this.declaration();
					}
					break;
				}
				this.state = 221;
				this.eos();
				}
				}
				this.state = 227;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 228;
			this.match(GoParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public packageClause(): PackageClauseContext {
		let localctx: PackageClauseContext = new PackageClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, GoParser.RULE_packageClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 230;
			this.match(GoParser.PACKAGE);
			this.state = 231;
			localctx._packageName = this.match(GoParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public importDecl(): ImportDeclContext {
		let localctx: ImportDeclContext = new ImportDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, GoParser.RULE_importDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 233;
			this.match(GoParser.IMPORT);
			this.state = 245;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 27:
			case 38:
			case 79:
			case 80:
				{
				this.state = 234;
				this.importSpec();
				}
				break;
			case 28:
				{
				this.state = 235;
				this.match(GoParser.L_PAREN);
				this.state = 241;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===27 || _la===38 || _la===79 || _la===80) {
					{
					{
					this.state = 236;
					this.importSpec();
					this.state = 237;
					this.eos();
					}
					}
					this.state = 243;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 244;
				this.match(GoParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public importSpec(): ImportSpecContext {
		let localctx: ImportSpecContext = new ImportSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, GoParser.RULE_importSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 248;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===27 || _la===38) {
				{
				this.state = 247;
				localctx._alias = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(_la===27 || _la===38)) {
				    localctx._alias = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
			}

			this.state = 250;
			this.importPath();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public importPath(): ImportPathContext {
		let localctx: ImportPathContext = new ImportPathContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, GoParser.RULE_importPath);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 252;
			this.string_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declaration(): DeclarationContext {
		let localctx: DeclarationContext = new DeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, GoParser.RULE_declaration);
		try {
			this.state = 257;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 16:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 254;
				this.constDecl();
				}
				break;
			case 20:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 255;
				this.typeDecl();
				}
				break;
			case 25:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 256;
				this.varDecl();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public constDecl(): ConstDeclContext {
		let localctx: ConstDeclContext = new ConstDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, GoParser.RULE_constDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 259;
			this.match(GoParser.CONST);
			this.state = 271;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 27:
				{
				this.state = 260;
				this.constSpec();
				}
				break;
			case 28:
				{
				this.state = 261;
				this.match(GoParser.L_PAREN);
				this.state = 267;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===27) {
					{
					{
					this.state = 262;
					this.constSpec();
					this.state = 263;
					this.eos();
					}
					}
					this.state = 269;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 270;
				this.match(GoParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public constSpec(): ConstSpecContext {
		let localctx: ConstSpecContext = new ConstSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, GoParser.RULE_constSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 273;
			this.identifierList();
			this.state = 279;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				{
				this.state = 275;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 587203011) !== 0) || _la===62 || _la===64) {
					{
					this.state = 274;
					this.type_();
					}
				}

				this.state = 277;
				this.match(GoParser.ASSIGN);
				this.state = 278;
				this.expressionList();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public identifierList(): IdentifierListContext {
		let localctx: IdentifierListContext = new IdentifierListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, GoParser.RULE_identifierList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 281;
			this.match(GoParser.IDENTIFIER);
			this.state = 286;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 282;
					this.match(GoParser.COMMA);
					this.state = 283;
					this.match(GoParser.IDENTIFIER);
					}
					}
				}
				this.state = 288;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expressionList(): ExpressionListContext {
		let localctx: ExpressionListContext = new ExpressionListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, GoParser.RULE_expressionList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 289;
			this.expression(0);
			this.state = 294;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 290;
					this.match(GoParser.COMMA);
					this.state = 291;
					this.expression(0);
					}
					}
				}
				this.state = 296;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeDecl(): TypeDeclContext {
		let localctx: TypeDeclContext = new TypeDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, GoParser.RULE_typeDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 297;
			this.match(GoParser.TYPE);
			this.state = 309;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 27:
				{
				this.state = 298;
				this.typeSpec();
				}
				break;
			case 28:
				{
				this.state = 299;
				this.match(GoParser.L_PAREN);
				this.state = 305;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===27) {
					{
					{
					this.state = 300;
					this.typeSpec();
					this.state = 301;
					this.eos();
					}
					}
					this.state = 307;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 308;
				this.match(GoParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeSpec(): TypeSpecContext {
		let localctx: TypeSpecContext = new TypeSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, GoParser.RULE_typeSpec);
		try {
			this.state = 313;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 15, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 311;
				this.aliasDecl();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 312;
				this.typeDef();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public aliasDecl(): AliasDeclContext {
		let localctx: AliasDeclContext = new AliasDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, GoParser.RULE_aliasDecl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 315;
			this.match(GoParser.IDENTIFIER);
			this.state = 316;
			this.match(GoParser.ASSIGN);
			this.state = 317;
			this.type_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeDef(): TypeDefContext {
		let localctx: TypeDefContext = new TypeDefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, GoParser.RULE_typeDef);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 319;
			this.match(GoParser.IDENTIFIER);
			this.state = 321;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 16, this._ctx) ) {
			case 1:
				{
				this.state = 320;
				this.typeParameters();
				}
				break;
			}
			this.state = 323;
			this.type_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeParameters(): TypeParametersContext {
		let localctx: TypeParametersContext = new TypeParametersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, GoParser.RULE_typeParameters);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 325;
			this.match(GoParser.L_BRACKET);
			this.state = 326;
			this.typeParameterDecl();
			this.state = 331;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===35) {
				{
				{
				this.state = 327;
				this.match(GoParser.COMMA);
				this.state = 328;
				this.typeParameterDecl();
				}
				}
				this.state = 333;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 334;
			this.match(GoParser.R_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeParameterDecl(): TypeParameterDeclContext {
		let localctx: TypeParameterDeclContext = new TypeParameterDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, GoParser.RULE_typeParameterDecl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 336;
			this.identifierList();
			this.state = 337;
			this.typeElement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeElement(): TypeElementContext {
		let localctx: TypeElementContext = new TypeElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, GoParser.RULE_typeElement);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 339;
			this.typeTerm();
			this.state = 344;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 18, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 340;
					this.match(GoParser.OR);
					this.state = 341;
					this.typeTerm();
					}
					}
				}
				this.state = 346;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 18, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeTerm(): TypeTermContext {
		let localctx: TypeTermContext = new TypeTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, GoParser.RULE_typeTerm);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 348;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===57) {
				{
				this.state = 347;
				this.match(GoParser.UNDERLYING);
				}
			}

			this.state = 350;
			this.type_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionDecl(): FunctionDeclContext {
		let localctx: FunctionDeclContext = new FunctionDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, GoParser.RULE_functionDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 352;
			this.match(GoParser.FUNC);
			this.state = 353;
			this.match(GoParser.IDENTIFIER);
			this.state = 355;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===32) {
				{
				this.state = 354;
				this.typeParameters();
				}
			}

			this.state = 357;
			this.signature();
			this.state = 359;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				{
				this.state = 358;
				this.block();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public methodDecl(): MethodDeclContext {
		let localctx: MethodDeclContext = new MethodDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, GoParser.RULE_methodDecl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 361;
			this.match(GoParser.FUNC);
			this.state = 362;
			this.receiver();
			this.state = 363;
			this.match(GoParser.IDENTIFIER);
			this.state = 364;
			this.signature();
			this.state = 366;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				{
				this.state = 365;
				this.block();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public receiver(): ReceiverContext {
		let localctx: ReceiverContext = new ReceiverContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, GoParser.RULE_receiver);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 368;
			this.parameters();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public varDecl(): VarDeclContext {
		let localctx: VarDeclContext = new VarDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, GoParser.RULE_varDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 370;
			this.match(GoParser.VAR);
			this.state = 382;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 27:
				{
				this.state = 371;
				this.varSpec();
				}
				break;
			case 28:
				{
				this.state = 372;
				this.match(GoParser.L_PAREN);
				this.state = 378;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===27) {
					{
					{
					this.state = 373;
					this.varSpec();
					this.state = 374;
					this.eos();
					}
					}
					this.state = 380;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 381;
				this.match(GoParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public varSpec(): VarSpecContext {
		let localctx: VarSpecContext = new VarSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, GoParser.RULE_varSpec);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 384;
			this.identifierList();
			this.state = 392;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 3:
			case 4:
			case 9:
			case 10:
			case 11:
			case 27:
			case 28:
			case 32:
			case 62:
			case 64:
				{
				this.state = 385;
				this.type_();
				this.state = 388;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 25, this._ctx) ) {
				case 1:
					{
					this.state = 386;
					this.match(GoParser.ASSIGN);
					this.state = 387;
					this.expressionList();
					}
					break;
				}
				}
				break;
			case 34:
				{
				this.state = 390;
				this.match(GoParser.ASSIGN);
				this.state = 391;
				this.expressionList();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let localctx: BlockContext = new BlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, GoParser.RULE_block);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 394;
			this.match(GoParser.L_CURLY);
			this.state = 396;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 27, this._ctx) ) {
			case 1:
				{
				this.state = 395;
				this.statementList();
				}
				break;
			}
			this.state = 398;
			this.match(GoParser.R_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statementList(): StatementListContext {
		let localctx: StatementListContext = new StatementListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, GoParser.RULE_statementList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 412;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 407;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
					case 1:
						{
						this.state = 401;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===36) {
							{
							this.state = 400;
							this.match(GoParser.SEMI);
							}
						}

						}
						break;
					case 2:
						{
						this.state = 404;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===88) {
							{
							this.state = 403;
							this.match(GoParser.EOS);
							}
						}

						}
						break;
					case 3:
						{
						this.state = 406;
						if (!(this.closingBracket())) {
							throw this.createFailedPredicateException("this.closingBracket()");
						}
						}
						break;
					}
					this.state = 409;
					this.statement();
					this.state = 410;
					this.eos();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 414;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, GoParser.RULE_statement);
		try {
			this.state = 431;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 416;
				this.declaration();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 417;
				this.labeledStmt();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 418;
				this.simpleStmt();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 419;
				this.goStmt();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 420;
				this.returnStmt();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 421;
				this.breakStmt();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 422;
				this.continueStmt();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 423;
				this.gotoStmt();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 424;
				this.fallthroughStmt();
				}
				break;
			case 10:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 425;
				this.block();
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 426;
				this.ifStmt();
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 427;
				this.switchStmt();
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 428;
				this.selectStmt();
				}
				break;
			case 14:
				this.enterOuterAlt(localctx, 14);
				{
				this.state = 429;
				this.forStmt();
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 15);
				{
				this.state = 430;
				this.deferStmt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public simpleStmt(): SimpleStmtContext {
		let localctx: SimpleStmtContext = new SimpleStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, GoParser.RULE_simpleStmt);
		try {
			this.state = 438;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 33, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 433;
				this.sendStmt();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 434;
				this.incDecStmt();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 435;
				this.assignment();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 436;
				this.expressionStmt();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 437;
				this.shortVarDecl();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expressionStmt(): ExpressionStmtContext {
		let localctx: ExpressionStmtContext = new ExpressionStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, GoParser.RULE_expressionStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 440;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sendStmt(): SendStmtContext {
		let localctx: SendStmtContext = new SendStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, GoParser.RULE_sendStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 442;
			localctx._channel = this.expression(0);
			this.state = 443;
			this.match(GoParser.RECEIVE);
			this.state = 444;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public incDecStmt(): IncDecStmtContext {
		let localctx: IncDecStmtContext = new IncDecStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, GoParser.RULE_incDecStmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 446;
			this.expression(0);
			this.state = 447;
			_la = this._input.LA(1);
			if(!(_la===39 || _la===40)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignment(): AssignmentContext {
		let localctx: AssignmentContext = new AssignmentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, GoParser.RULE_assignment);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 449;
			this.expressionList();
			this.state = 450;
			this.assign_op();
			this.state = 451;
			this.expressionList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assign_op(): Assign_opContext {
		let localctx: Assign_opContext = new Assign_opContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, GoParser.RULE_assign_op);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 454;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 7999) !== 0)) {
				{
				this.state = 453;
				_la = this._input.LA(1);
				if(!(((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 7999) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
			}

			this.state = 456;
			this.match(GoParser.ASSIGN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public shortVarDecl(): ShortVarDeclContext {
		let localctx: ShortVarDeclContext = new ShortVarDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, GoParser.RULE_shortVarDecl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 458;
			this.identifierList();
			this.state = 459;
			this.match(GoParser.DECLARE_ASSIGN);
			this.state = 460;
			this.expressionList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public labeledStmt(): LabeledStmtContext {
		let localctx: LabeledStmtContext = new LabeledStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, GoParser.RULE_labeledStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 462;
			this.match(GoParser.IDENTIFIER);
			this.state = 463;
			this.match(GoParser.COLON);
			this.state = 465;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 35, this._ctx) ) {
			case 1:
				{
				this.state = 464;
				this.statement();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public returnStmt(): ReturnStmtContext {
		let localctx: ReturnStmtContext = new ReturnStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, GoParser.RULE_returnStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 467;
			this.match(GoParser.RETURN);
			this.state = 469;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				{
				this.state = 468;
				this.expressionList();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public breakStmt(): BreakStmtContext {
		let localctx: BreakStmtContext = new BreakStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, GoParser.RULE_breakStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 471;
			this.match(GoParser.BREAK);
			this.state = 473;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				{
				this.state = 472;
				this.match(GoParser.IDENTIFIER);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public continueStmt(): ContinueStmtContext {
		let localctx: ContinueStmtContext = new ContinueStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, GoParser.RULE_continueStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 475;
			this.match(GoParser.CONTINUE);
			this.state = 477;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 38, this._ctx) ) {
			case 1:
				{
				this.state = 476;
				this.match(GoParser.IDENTIFIER);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public gotoStmt(): GotoStmtContext {
		let localctx: GotoStmtContext = new GotoStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, GoParser.RULE_gotoStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 479;
			this.match(GoParser.GOTO);
			this.state = 480;
			this.match(GoParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public fallthroughStmt(): FallthroughStmtContext {
		let localctx: FallthroughStmtContext = new FallthroughStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, GoParser.RULE_fallthroughStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 482;
			this.match(GoParser.FALLTHROUGH);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public deferStmt(): DeferStmtContext {
		let localctx: DeferStmtContext = new DeferStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 78, GoParser.RULE_deferStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 484;
			this.match(GoParser.DEFER);
			this.state = 485;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ifStmt(): IfStmtContext {
		let localctx: IfStmtContext = new IfStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, GoParser.RULE_ifStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 487;
			this.match(GoParser.IF);
			this.state = 496;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				{
				this.state = 488;
				this.expression(0);
				}
				break;
			case 2:
				{
				this.state = 489;
				this.eos();
				this.state = 490;
				this.expression(0);
				}
				break;
			case 3:
				{
				this.state = 492;
				this.simpleStmt();
				this.state = 493;
				this.eos();
				this.state = 494;
				this.expression(0);
				}
				break;
			}
			this.state = 498;
			this.block();
			this.state = 504;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 41, this._ctx) ) {
			case 1:
				{
				this.state = 499;
				this.match(GoParser.ELSE);
				this.state = 502;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 18:
					{
					this.state = 500;
					this.ifStmt();
					}
					break;
				case 30:
					{
					this.state = 501;
					this.block();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public switchStmt(): SwitchStmtContext {
		let localctx: SwitchStmtContext = new SwitchStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, GoParser.RULE_switchStmt);
		try {
			this.state = 508;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 506;
				this.exprSwitchStmt();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 507;
				this.typeSwitchStmt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public exprSwitchStmt(): ExprSwitchStmtContext {
		let localctx: ExprSwitchStmtContext = new ExprSwitchStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, GoParser.RULE_exprSwitchStmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 510;
			this.match(GoParser.SWITCH);
			this.state = 521;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 46, this._ctx) ) {
			case 1:
				{
				this.state = 512;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 595591619) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6344703) !== 0)) {
					{
					this.state = 511;
					this.expression(0);
					}
				}

				}
				break;
			case 2:
				{
				this.state = 515;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 44, this._ctx) ) {
				case 1:
					{
					this.state = 514;
					this.simpleStmt();
					}
					break;
				}
				this.state = 517;
				this.eos();
				this.state = 519;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 595591619) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6344703) !== 0)) {
					{
					this.state = 518;
					this.expression(0);
					}
				}

				}
				break;
			}
			this.state = 523;
			this.match(GoParser.L_CURLY);
			this.state = 527;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2 || _la===6) {
				{
				{
				this.state = 524;
				this.exprCaseClause();
				}
				}
				this.state = 529;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 530;
			this.match(GoParser.R_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public exprCaseClause(): ExprCaseClauseContext {
		let localctx: ExprCaseClauseContext = new ExprCaseClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, GoParser.RULE_exprCaseClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 532;
			this.exprSwitchCase();
			this.state = 533;
			this.match(GoParser.COLON);
			this.state = 535;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 48, this._ctx) ) {
			case 1:
				{
				this.state = 534;
				this.statementList();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public exprSwitchCase(): ExprSwitchCaseContext {
		let localctx: ExprSwitchCaseContext = new ExprSwitchCaseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, GoParser.RULE_exprSwitchCase);
		try {
			this.state = 540;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 537;
				this.match(GoParser.CASE);
				this.state = 538;
				this.expressionList();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 539;
				this.match(GoParser.DEFAULT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeSwitchStmt(): TypeSwitchStmtContext {
		let localctx: TypeSwitchStmtContext = new TypeSwitchStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, GoParser.RULE_typeSwitchStmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 542;
			this.match(GoParser.SWITCH);
			this.state = 551;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 50, this._ctx) ) {
			case 1:
				{
				this.state = 543;
				this.typeSwitchGuard();
				}
				break;
			case 2:
				{
				this.state = 544;
				this.eos();
				this.state = 545;
				this.typeSwitchGuard();
				}
				break;
			case 3:
				{
				this.state = 547;
				this.simpleStmt();
				this.state = 548;
				this.eos();
				this.state = 549;
				this.typeSwitchGuard();
				}
				break;
			}
			this.state = 553;
			this.match(GoParser.L_CURLY);
			this.state = 557;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2 || _la===6) {
				{
				{
				this.state = 554;
				this.typeCaseClause();
				}
				}
				this.state = 559;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 560;
			this.match(GoParser.R_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeSwitchGuard(): TypeSwitchGuardContext {
		let localctx: TypeSwitchGuardContext = new TypeSwitchGuardContext(this, this._ctx, this.state);
		this.enterRule(localctx, 92, GoParser.RULE_typeSwitchGuard);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 564;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 52, this._ctx) ) {
			case 1:
				{
				this.state = 562;
				this.match(GoParser.IDENTIFIER);
				this.state = 563;
				this.match(GoParser.DECLARE_ASSIGN);
				}
				break;
			}
			this.state = 566;
			this.primaryExpr(0);
			this.state = 567;
			this.match(GoParser.DOT);
			this.state = 568;
			this.match(GoParser.L_PAREN);
			this.state = 569;
			this.match(GoParser.TYPE);
			this.state = 570;
			this.match(GoParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeCaseClause(): TypeCaseClauseContext {
		let localctx: TypeCaseClauseContext = new TypeCaseClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, GoParser.RULE_typeCaseClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 572;
			this.typeSwitchCase();
			this.state = 573;
			this.match(GoParser.COLON);
			this.state = 575;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 53, this._ctx) ) {
			case 1:
				{
				this.state = 574;
				this.statementList();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeSwitchCase(): TypeSwitchCaseContext {
		let localctx: TypeSwitchCaseContext = new TypeSwitchCaseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, GoParser.RULE_typeSwitchCase);
		try {
			this.state = 580;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 577;
				this.match(GoParser.CASE);
				this.state = 578;
				this.typeList();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 579;
				this.match(GoParser.DEFAULT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeList(): TypeListContext {
		let localctx: TypeListContext = new TypeListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 98, GoParser.RULE_typeList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 584;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 3:
			case 4:
			case 9:
			case 10:
			case 11:
			case 27:
			case 28:
			case 32:
			case 62:
			case 64:
				{
				this.state = 582;
				this.type_();
				}
				break;
			case 26:
				{
				this.state = 583;
				this.match(GoParser.NIL_LIT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 593;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 57, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 586;
					this.match(GoParser.COMMA);
					this.state = 589;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case 3:
					case 4:
					case 9:
					case 10:
					case 11:
					case 27:
					case 28:
					case 32:
					case 62:
					case 64:
						{
						this.state = 587;
						this.type_();
						}
						break;
					case 26:
						{
						this.state = 588;
						this.match(GoParser.NIL_LIT);
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
				}
				this.state = 595;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 57, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public selectStmt(): SelectStmtContext {
		let localctx: SelectStmtContext = new SelectStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 100, GoParser.RULE_selectStmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 596;
			this.match(GoParser.SELECT);
			this.state = 597;
			this.match(GoParser.L_CURLY);
			this.state = 601;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===2 || _la===6) {
				{
				{
				this.state = 598;
				this.commClause();
				}
				}
				this.state = 603;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 604;
			this.match(GoParser.R_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public commClause(): CommClauseContext {
		let localctx: CommClauseContext = new CommClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 102, GoParser.RULE_commClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 606;
			this.commCase();
			this.state = 607;
			this.match(GoParser.COLON);
			this.state = 609;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 59, this._ctx) ) {
			case 1:
				{
				this.state = 608;
				this.statementList();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public commCase(): CommCaseContext {
		let localctx: CommCaseContext = new CommCaseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 104, GoParser.RULE_commCase);
		try {
			this.state = 617;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 6:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 611;
				this.match(GoParser.CASE);
				this.state = 614;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 60, this._ctx) ) {
				case 1:
					{
					this.state = 612;
					this.sendStmt();
					}
					break;
				case 2:
					{
					this.state = 613;
					this.recvStmt();
					}
					break;
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 616;
				this.match(GoParser.DEFAULT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public recvStmt(): RecvStmtContext {
		let localctx: RecvStmtContext = new RecvStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 106, GoParser.RULE_recvStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 625;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 62, this._ctx) ) {
			case 1:
				{
				this.state = 619;
				this.expressionList();
				this.state = 620;
				this.match(GoParser.ASSIGN);
				}
				break;
			case 2:
				{
				this.state = 622;
				this.identifierList();
				this.state = 623;
				this.match(GoParser.DECLARE_ASSIGN);
				}
				break;
			}
			this.state = 627;
			localctx._recvExpr = this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forStmt(): ForStmtContext {
		let localctx: ForStmtContext = new ForStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 108, GoParser.RULE_forStmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 629;
			this.match(GoParser.FOR);
			this.state = 637;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 65, this._ctx) ) {
			case 1:
				{
				this.state = 631;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 595591619) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6344703) !== 0)) {
					{
					this.state = 630;
					this.expression(0);
					}
				}

				}
				break;
			case 2:
				{
				this.state = 633;
				this.forClause();
				}
				break;
			case 3:
				{
				this.state = 635;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 595657155) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6344703) !== 0)) {
					{
					this.state = 634;
					this.rangeClause();
					}
				}

				}
				break;
			}
			this.state = 639;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forClause(): ForClauseContext {
		let localctx: ForClauseContext = new ForClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 110, GoParser.RULE_forClause);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 642;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 66, this._ctx) ) {
			case 1:
				{
				this.state = 641;
				localctx._initStmt = this.simpleStmt();
				}
				break;
			}
			this.state = 644;
			this.eos();
			this.state = 646;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 67, this._ctx) ) {
			case 1:
				{
				this.state = 645;
				this.expression(0);
				}
				break;
			}
			this.state = 648;
			this.eos();
			this.state = 650;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 595591619) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6344703) !== 0)) {
				{
				this.state = 649;
				localctx._postStmt = this.simpleStmt();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public rangeClause(): RangeClauseContext {
		let localctx: RangeClauseContext = new RangeClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 112, GoParser.RULE_rangeClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 658;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 69, this._ctx) ) {
			case 1:
				{
				this.state = 652;
				this.expressionList();
				this.state = 653;
				this.match(GoParser.ASSIGN);
				}
				break;
			case 2:
				{
				this.state = 655;
				this.identifierList();
				this.state = 656;
				this.match(GoParser.DECLARE_ASSIGN);
				}
				break;
			}
			this.state = 660;
			this.match(GoParser.RANGE);
			this.state = 661;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public goStmt(): GoStmtContext {
		let localctx: GoStmtContext = new GoStmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 114, GoParser.RULE_goStmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 663;
			this.match(GoParser.GO);
			this.state = 664;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public type_(): Type_Context {
		let localctx: Type_Context = new Type_Context(this, this._ctx, this.state);
		this.enterRule(localctx, 116, GoParser.RULE_type_);
		try {
			this.state = 675;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 27:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 666;
				this.typeName();
				this.state = 668;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 70, this._ctx) ) {
				case 1:
					{
					this.state = 667;
					this.typeArgs();
					}
					break;
				}
				}
				break;
			case 3:
			case 4:
			case 9:
			case 10:
			case 11:
			case 32:
			case 62:
			case 64:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 670;
				this.typeLit();
				}
				break;
			case 28:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 671;
				this.match(GoParser.L_PAREN);
				this.state = 672;
				this.type_();
				this.state = 673;
				this.match(GoParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeArgs(): TypeArgsContext {
		let localctx: TypeArgsContext = new TypeArgsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 118, GoParser.RULE_typeArgs);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 677;
			this.match(GoParser.L_BRACKET);
			this.state = 678;
			this.typeList();
			this.state = 680;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===35) {
				{
				this.state = 679;
				this.match(GoParser.COMMA);
				}
			}

			this.state = 682;
			this.match(GoParser.R_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeName(): TypeNameContext {
		let localctx: TypeNameContext = new TypeNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 120, GoParser.RULE_typeName);
		try {
			this.state = 686;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 73, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 684;
				this.qualifiedIdent();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 685;
				this.match(GoParser.IDENTIFIER);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeLit(): TypeLitContext {
		let localctx: TypeLitContext = new TypeLitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 122, GoParser.RULE_typeLit);
		try {
			this.state = 696;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 74, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 688;
				this.arrayType();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 689;
				this.structType();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 690;
				this.pointerType();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 691;
				this.functionType();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 692;
				this.interfaceType();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 693;
				this.sliceType();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 694;
				this.mapType();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 695;
				this.channelType();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arrayType(): ArrayTypeContext {
		let localctx: ArrayTypeContext = new ArrayTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 124, GoParser.RULE_arrayType);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 698;
			this.match(GoParser.L_BRACKET);
			this.state = 699;
			this.arrayLength();
			this.state = 700;
			this.match(GoParser.R_BRACKET);
			this.state = 701;
			this.elementType();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arrayLength(): ArrayLengthContext {
		let localctx: ArrayLengthContext = new ArrayLengthContext(this, this._ctx, this.state);
		this.enterRule(localctx, 126, GoParser.RULE_arrayLength);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 703;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public elementType(): ElementTypeContext {
		let localctx: ElementTypeContext = new ElementTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 128, GoParser.RULE_elementType);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 705;
			this.type_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public pointerType(): PointerTypeContext {
		let localctx: PointerTypeContext = new PointerTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 130, GoParser.RULE_pointerType);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 707;
			this.match(GoParser.STAR);
			this.state = 708;
			this.type_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public interfaceType(): InterfaceTypeContext {
		let localctx: InterfaceTypeContext = new InterfaceTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 132, GoParser.RULE_interfaceType);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 710;
			this.match(GoParser.INTERFACE);
			this.state = 711;
			this.match(GoParser.L_CURLY);
			this.state = 720;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 587203011) !== 0) || ((((_la - 57)) & ~0x1F) === 0 && ((1 << (_la - 57)) & 161) !== 0)) {
				{
				{
				this.state = 714;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 75, this._ctx) ) {
				case 1:
					{
					this.state = 712;
					this.methodSpec();
					}
					break;
				case 2:
					{
					this.state = 713;
					this.typeElement();
					}
					break;
				}
				this.state = 716;
				this.eos();
				}
				}
				this.state = 722;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 723;
			this.match(GoParser.R_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sliceType(): SliceTypeContext {
		let localctx: SliceTypeContext = new SliceTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 134, GoParser.RULE_sliceType);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 725;
			this.match(GoParser.L_BRACKET);
			this.state = 726;
			this.match(GoParser.R_BRACKET);
			this.state = 727;
			this.elementType();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public mapType(): MapTypeContext {
		let localctx: MapTypeContext = new MapTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 136, GoParser.RULE_mapType);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 729;
			this.match(GoParser.MAP);
			this.state = 730;
			this.match(GoParser.L_BRACKET);
			this.state = 731;
			this.type_();
			this.state = 732;
			this.match(GoParser.R_BRACKET);
			this.state = 733;
			this.elementType();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public channelType(): ChannelTypeContext {
		let localctx: ChannelTypeContext = new ChannelTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 138, GoParser.RULE_channelType);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 740;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 77, this._ctx) ) {
			case 1:
				{
				this.state = 735;
				this.match(GoParser.CHAN);
				}
				break;
			case 2:
				{
				this.state = 736;
				this.match(GoParser.CHAN);
				this.state = 737;
				this.match(GoParser.RECEIVE);
				}
				break;
			case 3:
				{
				this.state = 738;
				this.match(GoParser.RECEIVE);
				this.state = 739;
				this.match(GoParser.CHAN);
				}
				break;
			}
			this.state = 742;
			this.elementType();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public methodSpec(): MethodSpecContext {
		let localctx: MethodSpecContext = new MethodSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 140, GoParser.RULE_methodSpec);
		try {
			this.state = 750;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 78, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 744;
				this.match(GoParser.IDENTIFIER);
				this.state = 745;
				this.parameters();
				this.state = 746;
				this.result();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 748;
				this.match(GoParser.IDENTIFIER);
				this.state = 749;
				this.parameters();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionType(): FunctionTypeContext {
		let localctx: FunctionTypeContext = new FunctionTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 142, GoParser.RULE_functionType);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 752;
			this.match(GoParser.FUNC);
			this.state = 753;
			this.signature();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public signature(): SignatureContext {
		let localctx: SignatureContext = new SignatureContext(this, this._ctx, this.state);
		this.enterRule(localctx, 144, GoParser.RULE_signature);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 755;
			this.parameters();
			this.state = 757;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 79, this._ctx) ) {
			case 1:
				{
				this.state = 756;
				this.result();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public result(): ResultContext {
		let localctx: ResultContext = new ResultContext(this, this._ctx, this.state);
		this.enterRule(localctx, 146, GoParser.RULE_result);
		try {
			this.state = 761;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 80, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 759;
				this.parameters();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 760;
				this.type_();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameters(): ParametersContext {
		let localctx: ParametersContext = new ParametersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 148, GoParser.RULE_parameters);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 763;
			this.match(GoParser.L_PAREN);
			this.state = 775;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 587203011) !== 0) || ((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 5242881) !== 0)) {
				{
				this.state = 764;
				this.parameterDecl();
				this.state = 769;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 81, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 765;
						this.match(GoParser.COMMA);
						this.state = 766;
						this.parameterDecl();
						}
						}
					}
					this.state = 771;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 81, this._ctx);
				}
				this.state = 773;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===35) {
					{
					this.state = 772;
					this.match(GoParser.COMMA);
					}
				}

				}
			}

			this.state = 777;
			this.match(GoParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameterDecl(): ParameterDeclContext {
		let localctx: ParameterDeclContext = new ParameterDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 150, GoParser.RULE_parameterDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 780;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 84, this._ctx) ) {
			case 1:
				{
				this.state = 779;
				this.identifierList();
				}
				break;
			}
			this.state = 783;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===42) {
				{
				this.state = 782;
				this.match(GoParser.ELLIPSIS);
				}
			}

			this.state = 785;
			this.type_();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, _parentState);
		let _prevctx: ExpressionContext = localctx;
		let _startState: number = 152;
		this.enterRecursionRule(localctx, 152, GoParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 791;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 86, this._ctx) ) {
			case 1:
				{
				this.state = 788;
				this.primaryExpr(0);
				}
				break;
			case 2:
				{
				this.state = 789;
				localctx._unary_op = this._input.LT(1);
				_la = this._input.LA(1);
				if(!(((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 127) !== 0))) {
				    localctx._unary_op = this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 790;
				this.expression(6);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 810;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 88, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 808;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 87, this._ctx) ) {
					case 1:
						{
						localctx = new ExpressionContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_expression);
						this.state = 793;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 794;
						localctx._mul_op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(((((_la - 52)) & ~0x1F) === 0 && ((1 << (_la - 52)) & 3103) !== 0))) {
						    localctx._mul_op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 795;
						this.expression(6);
						}
						break;
					case 2:
						{
						localctx = new ExpressionContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_expression);
						this.state = 796;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 797;
						localctx._add_op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(((((_la - 51)) & ~0x1F) === 0 && ((1 << (_la - 51)) & 1793) !== 0))) {
						    localctx._add_op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 798;
						this.expression(5);
						}
						break;
					case 3:
						{
						localctx = new ExpressionContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_expression);
						this.state = 799;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 800;
						localctx._rel_op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 63) !== 0))) {
						    localctx._rel_op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 801;
						this.expression(4);
						}
						break;
					case 4:
						{
						localctx = new ExpressionContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_expression);
						this.state = 802;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 803;
						this.match(GoParser.LOGICAL_AND);
						this.state = 804;
						this.expression(3);
						}
						break;
					case 5:
						{
						localctx = new ExpressionContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_expression);
						this.state = 805;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 806;
						this.match(GoParser.LOGICAL_OR);
						this.state = 807;
						this.expression(2);
						}
						break;
					}
					}
				}
				this.state = 812;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 88, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}

	public primaryExpr(): PrimaryExprContext;
	public primaryExpr(_p: number): PrimaryExprContext;
	// @RuleVersion(0)
	public primaryExpr(_p?: number): PrimaryExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: PrimaryExprContext = new PrimaryExprContext(this, this._ctx, _parentState);
		let _prevctx: PrimaryExprContext = localctx;
		let _startState: number = 154;
		this.enterRecursionRule(localctx, 154, GoParser.RULE_primaryExpr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 817;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 89, this._ctx) ) {
			case 1:
				{
				this.state = 814;
				this.operand();
				}
				break;
			case 2:
				{
				this.state = 815;
				this.conversion();
				}
				break;
			case 3:
				{
				this.state = 816;
				this.methodExpr();
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 830;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 91, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					{
					localctx = new PrimaryExprContext(this, _parentctx, _parentState);
					this.pushNewRecursionContext(localctx, _startState, GoParser.RULE_primaryExpr);
					this.state = 819;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 826;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 90, this._ctx) ) {
					case 1:
						{
						this.state = 820;
						this.match(GoParser.DOT);
						this.state = 821;
						this.match(GoParser.IDENTIFIER);
						}
						break;
					case 2:
						{
						this.state = 822;
						this.index();
						}
						break;
					case 3:
						{
						this.state = 823;
						this.slice_();
						}
						break;
					case 4:
						{
						this.state = 824;
						this.typeAssertion();
						}
						break;
					case 5:
						{
						this.state = 825;
						this.arguments();
						}
						break;
					}
					}
					}
				}
				this.state = 832;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 91, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public conversion(): ConversionContext {
		let localctx: ConversionContext = new ConversionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 156, GoParser.RULE_conversion);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 833;
			this.type_();
			this.state = 834;
			this.match(GoParser.L_PAREN);
			this.state = 835;
			this.expression(0);
			this.state = 837;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===35) {
				{
				this.state = 836;
				this.match(GoParser.COMMA);
				}
			}

			this.state = 839;
			this.match(GoParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public operand(): OperandContext {
		let localctx: OperandContext = new OperandContext(this, this._ctx, this.state);
		this.enterRule(localctx, 158, GoParser.RULE_operand);
		try {
			this.state = 850;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 94, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 841;
				this.literal();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 842;
				this.operandName();
				this.state = 844;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 93, this._ctx) ) {
				case 1:
					{
					this.state = 843;
					this.typeArgs();
					}
					break;
				}
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 846;
				this.match(GoParser.L_PAREN);
				this.state = 847;
				this.expression(0);
				this.state = 848;
				this.match(GoParser.R_PAREN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let localctx: LiteralContext = new LiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 160, GoParser.RULE_literal);
		try {
			this.state = 855;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 26:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 72:
			case 73:
			case 79:
			case 80:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 852;
				this.basicLit();
				}
				break;
			case 9:
			case 10:
			case 27:
			case 32:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 853;
				this.compositeLit();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 854;
				this.functionLit();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public basicLit(): BasicLitContext {
		let localctx: BasicLitContext = new BasicLitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 162, GoParser.RULE_basicLit);
		try {
			this.state = 861;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 26:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 857;
				this.match(GoParser.NIL_LIT);
				}
				break;
			case 65:
			case 66:
			case 67:
			case 68:
			case 72:
			case 73:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 858;
				this.integer();
				}
				break;
			case 79:
			case 80:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 859;
				this.string_();
				}
				break;
			case 69:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 860;
				this.match(GoParser.FLOAT_LIT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public integer(): IntegerContext {
		let localctx: IntegerContext = new IntegerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 164, GoParser.RULE_integer);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 863;
			_la = this._input.LA(1);
			if(!(((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 399) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public operandName(): OperandNameContext {
		let localctx: OperandNameContext = new OperandNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 166, GoParser.RULE_operandName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 865;
			this.match(GoParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public qualifiedIdent(): QualifiedIdentContext {
		let localctx: QualifiedIdentContext = new QualifiedIdentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 168, GoParser.RULE_qualifiedIdent);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 867;
			this.match(GoParser.IDENTIFIER);
			this.state = 868;
			this.match(GoParser.DOT);
			this.state = 869;
			this.match(GoParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public compositeLit(): CompositeLitContext {
		let localctx: CompositeLitContext = new CompositeLitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 170, GoParser.RULE_compositeLit);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 871;
			this.literalType();
			this.state = 872;
			this.literalValue();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public literalType(): LiteralTypeContext {
		let localctx: LiteralTypeContext = new LiteralTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 172, GoParser.RULE_literalType);
		let _la: number;
		try {
			this.state = 886;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 98, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 874;
				this.structType();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 875;
				this.arrayType();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 876;
				this.match(GoParser.L_BRACKET);
				this.state = 877;
				this.match(GoParser.ELLIPSIS);
				this.state = 878;
				this.match(GoParser.R_BRACKET);
				this.state = 879;
				this.elementType();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 880;
				this.sliceType();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 881;
				this.mapType();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 882;
				this.typeName();
				this.state = 884;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===32) {
					{
					this.state = 883;
					this.typeArgs();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public literalValue(): LiteralValueContext {
		let localctx: LiteralValueContext = new LiteralValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 174, GoParser.RULE_literalValue);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 888;
			this.match(GoParser.L_CURLY);
			this.state = 893;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 729809347) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6344703) !== 0)) {
				{
				this.state = 889;
				this.elementList();
				this.state = 891;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===35) {
					{
					this.state = 890;
					this.match(GoParser.COMMA);
					}
				}

				}
			}

			this.state = 895;
			this.match(GoParser.R_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public elementList(): ElementListContext {
		let localctx: ElementListContext = new ElementListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 176, GoParser.RULE_elementList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 897;
			this.keyedElement();
			this.state = 902;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 101, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 898;
					this.match(GoParser.COMMA);
					this.state = 899;
					this.keyedElement();
					}
					}
				}
				this.state = 904;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 101, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public keyedElement(): KeyedElementContext {
		let localctx: KeyedElementContext = new KeyedElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 178, GoParser.RULE_keyedElement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 908;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 102, this._ctx) ) {
			case 1:
				{
				this.state = 905;
				this.key();
				this.state = 906;
				this.match(GoParser.COLON);
				}
				break;
			}
			this.state = 910;
			this.element();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public key(): KeyContext {
		let localctx: KeyContext = new KeyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 180, GoParser.RULE_key);
		try {
			this.state = 914;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 3:
			case 4:
			case 9:
			case 10:
			case 11:
			case 26:
			case 27:
			case 28:
			case 32:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 72:
			case 73:
			case 79:
			case 80:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 912;
				this.expression(0);
				}
				break;
			case 30:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 913;
				this.literalValue();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public element(): ElementContext {
		let localctx: ElementContext = new ElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 182, GoParser.RULE_element);
		try {
			this.state = 918;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 3:
			case 4:
			case 9:
			case 10:
			case 11:
			case 26:
			case 27:
			case 28:
			case 32:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 72:
			case 73:
			case 79:
			case 80:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 916;
				this.expression(0);
				}
				break;
			case 30:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 917;
				this.literalValue();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public structType(): StructTypeContext {
		let localctx: StructTypeContext = new StructTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 184, GoParser.RULE_structType);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 920;
			this.match(GoParser.STRUCT);
			this.state = 921;
			this.match(GoParser.L_CURLY);
			this.state = 927;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===27 || _la===62) {
				{
				{
				this.state = 922;
				this.fieldDecl();
				this.state = 923;
				this.eos();
				}
				}
				this.state = 929;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 930;
			this.match(GoParser.R_CURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public fieldDecl(): FieldDeclContext {
		let localctx: FieldDeclContext = new FieldDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 186, GoParser.RULE_fieldDecl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 936;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 106, this._ctx) ) {
			case 1:
				{
				this.state = 932;
				this.identifierList();
				this.state = 933;
				this.type_();
				}
				break;
			case 2:
				{
				this.state = 935;
				this.embeddedField();
				}
				break;
			}
			this.state = 939;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 107, this._ctx) ) {
			case 1:
				{
				this.state = 938;
				localctx._tag = this.string_();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public string_(): String_Context {
		let localctx: String_Context = new String_Context(this, this._ctx, this.state);
		this.enterRule(localctx, 188, GoParser.RULE_string_);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 941;
			_la = this._input.LA(1);
			if(!(_la===79 || _la===80)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public embeddedField(): EmbeddedFieldContext {
		let localctx: EmbeddedFieldContext = new EmbeddedFieldContext(this, this._ctx, this.state);
		this.enterRule(localctx, 190, GoParser.RULE_embeddedField);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 944;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===62) {
				{
				this.state = 943;
				this.match(GoParser.STAR);
				}
			}

			this.state = 946;
			this.typeName();
			this.state = 948;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 109, this._ctx) ) {
			case 1:
				{
				this.state = 947;
				this.typeArgs();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionLit(): FunctionLitContext {
		let localctx: FunctionLitContext = new FunctionLitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 192, GoParser.RULE_functionLit);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 950;
			this.match(GoParser.FUNC);
			this.state = 951;
			this.signature();
			this.state = 952;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public index(): IndexContext {
		let localctx: IndexContext = new IndexContext(this, this._ctx, this.state);
		this.enterRule(localctx, 194, GoParser.RULE_index);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 954;
			this.match(GoParser.L_BRACKET);
			this.state = 955;
			this.expression(0);
			this.state = 956;
			this.match(GoParser.R_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public slice_(): Slice_Context {
		let localctx: Slice_Context = new Slice_Context(this, this._ctx, this.state);
		this.enterRule(localctx, 196, GoParser.RULE_slice_);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 958;
			this.match(GoParser.L_BRACKET);
			this.state = 974;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 113, this._ctx) ) {
			case 1:
				{
				this.state = 960;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 595591619) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6344703) !== 0)) {
					{
					this.state = 959;
					this.expression(0);
					}
				}

				this.state = 962;
				this.match(GoParser.COLON);
				this.state = 964;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 595591619) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6344703) !== 0)) {
					{
					this.state = 963;
					this.expression(0);
					}
				}

				}
				break;
			case 2:
				{
				this.state = 967;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 595591619) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6344703) !== 0)) {
					{
					this.state = 966;
					this.expression(0);
					}
				}

				this.state = 969;
				this.match(GoParser.COLON);
				this.state = 970;
				this.expression(0);
				this.state = 971;
				this.match(GoParser.COLON);
				this.state = 972;
				this.expression(0);
				}
				break;
			}
			this.state = 976;
			this.match(GoParser.R_BRACKET);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeAssertion(): TypeAssertionContext {
		let localctx: TypeAssertionContext = new TypeAssertionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 198, GoParser.RULE_typeAssertion);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 978;
			this.match(GoParser.DOT);
			this.state = 979;
			this.match(GoParser.L_PAREN);
			this.state = 980;
			this.type_();
			this.state = 981;
			this.match(GoParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public arguments(): ArgumentsContext {
		let localctx: ArgumentsContext = new ArgumentsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 200, GoParser.RULE_arguments);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 983;
			this.match(GoParser.L_PAREN);
			this.state = 998;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 595591619) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 6344703) !== 0)) {
				{
				this.state = 990;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 115, this._ctx) ) {
				case 1:
					{
					this.state = 984;
					this.expressionList();
					}
					break;
				case 2:
					{
					this.state = 985;
					this.type_();
					this.state = 988;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 114, this._ctx) ) {
					case 1:
						{
						this.state = 986;
						this.match(GoParser.COMMA);
						this.state = 987;
						this.expressionList();
						}
						break;
					}
					}
					break;
				}
				this.state = 993;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===42) {
					{
					this.state = 992;
					this.match(GoParser.ELLIPSIS);
					}
				}

				this.state = 996;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===35) {
					{
					this.state = 995;
					this.match(GoParser.COMMA);
					}
				}

				}
			}

			this.state = 1000;
			this.match(GoParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public methodExpr(): MethodExprContext {
		let localctx: MethodExprContext = new MethodExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 202, GoParser.RULE_methodExpr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1002;
			this.type_();
			this.state = 1003;
			this.match(GoParser.DOT);
			this.state = 1004;
			this.match(GoParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public eos(): EosContext {
		let localctx: EosContext = new EosContext(this, this._ctx, this.state);
		this.enterRule(localctx, 204, GoParser.RULE_eos);
		try {
			this.state = 1010;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 119, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1006;
				this.match(GoParser.SEMI);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1007;
				this.match(GoParser.EOF);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 1008;
				this.match(GoParser.EOS);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 1009;
				if (!(this.closingBracket())) {
					throw this.createFailedPredicateException("this.closingBracket()");
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 24:
			return this.statementList_sempred(localctx as StatementListContext, predIndex);
		case 76:
			return this.expression_sempred(localctx as ExpressionContext, predIndex);
		case 77:
			return this.primaryExpr_sempred(localctx as PrimaryExprContext, predIndex);
		case 102:
			return this.eos_sempred(localctx as EosContext, predIndex);
		}
		return true;
	}
	private statementList_sempred(localctx: StatementListContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.closingBracket();
		}
		return true;
	}
	private expression_sempred(localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return this.precpred(this._ctx, 5);
		case 2:
			return this.precpred(this._ctx, 4);
		case 3:
			return this.precpred(this._ctx, 3);
		case 4:
			return this.precpred(this._ctx, 2);
		case 5:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private primaryExpr_sempred(localctx: PrimaryExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 6:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private eos_sempred(localctx: EosContext, predIndex: number): boolean {
		switch (predIndex) {
		case 7:
			return this.closingBracket();
		}
		return true;
	}

	public closingBracket(): boolean {
        const _la = this._input.LA(1);
        return _la === GoParser.R_PAREN || _la === GoParser.R_CURLY;
    }

	public static readonly _serializedATN: number[] = [4,1,89,1013,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
	46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,
	7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,
	60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,2,66,7,66,2,67,7,67,
	2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,7,72,2,73,7,73,2,74,7,74,2,
	75,7,75,2,76,7,76,2,77,7,77,2,78,7,78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,
	7,82,2,83,7,83,2,84,7,84,2,85,7,85,2,86,7,86,2,87,7,87,2,88,7,88,2,89,7,
	89,2,90,7,90,2,91,7,91,2,92,7,92,2,93,7,93,2,94,7,94,2,95,7,95,2,96,7,96,
	2,97,7,97,2,98,7,98,2,99,7,99,2,100,7,100,2,101,7,101,2,102,7,102,1,0,1,
	0,1,0,1,0,1,0,5,0,212,8,0,10,0,12,0,215,9,0,1,0,1,0,1,0,3,0,220,8,0,1,0,
	1,0,5,0,224,8,0,10,0,12,0,227,9,0,1,0,1,0,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,
	2,1,2,5,2,240,8,2,10,2,12,2,243,9,2,1,2,3,2,246,8,2,1,3,3,3,249,8,3,1,3,
	1,3,1,4,1,4,1,5,1,5,1,5,3,5,258,8,5,1,6,1,6,1,6,1,6,1,6,1,6,5,6,266,8,6,
	10,6,12,6,269,9,6,1,6,3,6,272,8,6,1,7,1,7,3,7,276,8,7,1,7,1,7,3,7,280,8,
	7,1,8,1,8,1,8,5,8,285,8,8,10,8,12,8,288,9,8,1,9,1,9,1,9,5,9,293,8,9,10,
	9,12,9,296,9,9,1,10,1,10,1,10,1,10,1,10,1,10,5,10,304,8,10,10,10,12,10,
	307,9,10,1,10,3,10,310,8,10,1,11,1,11,3,11,314,8,11,1,12,1,12,1,12,1,12,
	1,13,1,13,3,13,322,8,13,1,13,1,13,1,14,1,14,1,14,1,14,5,14,330,8,14,10,
	14,12,14,333,9,14,1,14,1,14,1,15,1,15,1,15,1,16,1,16,1,16,5,16,343,8,16,
	10,16,12,16,346,9,16,1,17,3,17,349,8,17,1,17,1,17,1,18,1,18,1,18,3,18,356,
	8,18,1,18,1,18,3,18,360,8,18,1,19,1,19,1,19,1,19,1,19,3,19,367,8,19,1,20,
	1,20,1,21,1,21,1,21,1,21,1,21,1,21,5,21,377,8,21,10,21,12,21,380,9,21,1,
	21,3,21,383,8,21,1,22,1,22,1,22,1,22,3,22,389,8,22,1,22,1,22,3,22,393,8,
	22,1,23,1,23,3,23,397,8,23,1,23,1,23,1,24,3,24,402,8,24,1,24,3,24,405,8,
	24,1,24,3,24,408,8,24,1,24,1,24,1,24,4,24,413,8,24,11,24,12,24,414,1,25,
	1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,1,25,3,
	25,432,8,25,1,26,1,26,1,26,1,26,1,26,3,26,439,8,26,1,27,1,27,1,28,1,28,
	1,28,1,28,1,29,1,29,1,29,1,30,1,30,1,30,1,30,1,31,3,31,455,8,31,1,31,1,
	31,1,32,1,32,1,32,1,32,1,33,1,33,1,33,3,33,466,8,33,1,34,1,34,3,34,470,
	8,34,1,35,1,35,3,35,474,8,35,1,36,1,36,3,36,478,8,36,1,37,1,37,1,37,1,38,
	1,38,1,39,1,39,1,39,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,1,40,3,40,497,
	8,40,1,40,1,40,1,40,1,40,3,40,503,8,40,3,40,505,8,40,1,41,1,41,3,41,509,
	8,41,1,42,1,42,3,42,513,8,42,1,42,3,42,516,8,42,1,42,1,42,3,42,520,8,42,
	3,42,522,8,42,1,42,1,42,5,42,526,8,42,10,42,12,42,529,9,42,1,42,1,42,1,
	43,1,43,1,43,3,43,536,8,43,1,44,1,44,1,44,3,44,541,8,44,1,45,1,45,1,45,
	1,45,1,45,1,45,1,45,1,45,1,45,3,45,552,8,45,1,45,1,45,5,45,556,8,45,10,
	45,12,45,559,9,45,1,45,1,45,1,46,1,46,3,46,565,8,46,1,46,1,46,1,46,1,46,
	1,46,1,46,1,47,1,47,1,47,3,47,576,8,47,1,48,1,48,1,48,3,48,581,8,48,1,49,
	1,49,3,49,585,8,49,1,49,1,49,1,49,3,49,590,8,49,5,49,592,8,49,10,49,12,
	49,595,9,49,1,50,1,50,1,50,5,50,600,8,50,10,50,12,50,603,9,50,1,50,1,50,
	1,51,1,51,1,51,3,51,610,8,51,1,52,1,52,1,52,3,52,615,8,52,1,52,3,52,618,
	8,52,1,53,1,53,1,53,1,53,1,53,1,53,3,53,626,8,53,1,53,1,53,1,54,1,54,3,
	54,632,8,54,1,54,1,54,3,54,636,8,54,3,54,638,8,54,1,54,1,54,1,55,3,55,643,
	8,55,1,55,1,55,3,55,647,8,55,1,55,1,55,3,55,651,8,55,1,56,1,56,1,56,1,56,
	1,56,1,56,3,56,659,8,56,1,56,1,56,1,56,1,57,1,57,1,57,1,58,1,58,3,58,669,
	8,58,1,58,1,58,1,58,1,58,1,58,3,58,676,8,58,1,59,1,59,1,59,3,59,681,8,59,
	1,59,1,59,1,60,1,60,3,60,687,8,60,1,61,1,61,1,61,1,61,1,61,1,61,1,61,1,
	61,3,61,697,8,61,1,62,1,62,1,62,1,62,1,62,1,63,1,63,1,64,1,64,1,65,1,65,
	1,65,1,66,1,66,1,66,1,66,3,66,715,8,66,1,66,1,66,5,66,719,8,66,10,66,12,
	66,722,9,66,1,66,1,66,1,67,1,67,1,67,1,67,1,68,1,68,1,68,1,68,1,68,1,68,
	1,69,1,69,1,69,1,69,1,69,3,69,741,8,69,1,69,1,69,1,70,1,70,1,70,1,70,1,
	70,1,70,3,70,751,8,70,1,71,1,71,1,71,1,72,1,72,3,72,758,8,72,1,73,1,73,
	3,73,762,8,73,1,74,1,74,1,74,1,74,5,74,768,8,74,10,74,12,74,771,9,74,1,
	74,3,74,774,8,74,3,74,776,8,74,1,74,1,74,1,75,3,75,781,8,75,1,75,3,75,784,
	8,75,1,75,1,75,1,76,1,76,1,76,1,76,3,76,792,8,76,1,76,1,76,1,76,1,76,1,
	76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,5,76,809,8,76,10,76,
	12,76,812,9,76,1,77,1,77,1,77,1,77,3,77,818,8,77,1,77,1,77,1,77,1,77,1,
	77,1,77,1,77,3,77,827,8,77,5,77,829,8,77,10,77,12,77,832,9,77,1,78,1,78,
	1,78,1,78,3,78,838,8,78,1,78,1,78,1,79,1,79,1,79,3,79,845,8,79,1,79,1,79,
	1,79,1,79,3,79,851,8,79,1,80,1,80,1,80,3,80,856,8,80,1,81,1,81,1,81,1,81,
	3,81,862,8,81,1,82,1,82,1,83,1,83,1,84,1,84,1,84,1,84,1,85,1,85,1,85,1,
	86,1,86,1,86,1,86,1,86,1,86,1,86,1,86,1,86,1,86,3,86,885,8,86,3,86,887,
	8,86,1,87,1,87,1,87,3,87,892,8,87,3,87,894,8,87,1,87,1,87,1,88,1,88,1,88,
	5,88,901,8,88,10,88,12,88,904,9,88,1,89,1,89,1,89,3,89,909,8,89,1,89,1,
	89,1,90,1,90,3,90,915,8,90,1,91,1,91,3,91,919,8,91,1,92,1,92,1,92,1,92,
	1,92,5,92,926,8,92,10,92,12,92,929,9,92,1,92,1,92,1,93,1,93,1,93,1,93,3,
	93,937,8,93,1,93,3,93,940,8,93,1,94,1,94,1,95,3,95,945,8,95,1,95,1,95,3,
	95,949,8,95,1,96,1,96,1,96,1,96,1,97,1,97,1,97,1,97,1,98,1,98,3,98,961,
	8,98,1,98,1,98,3,98,965,8,98,1,98,3,98,968,8,98,1,98,1,98,1,98,1,98,1,98,
	3,98,975,8,98,1,98,1,98,1,99,1,99,1,99,1,99,1,99,1,100,1,100,1,100,1,100,
	1,100,3,100,989,8,100,3,100,991,8,100,1,100,3,100,994,8,100,1,100,3,100,
	997,8,100,3,100,999,8,100,1,100,1,100,1,101,1,101,1,101,1,101,1,102,1,102,
	1,102,1,102,3,102,1011,8,102,1,102,0,2,152,154,103,0,2,4,6,8,10,12,14,16,
	18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,
	66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,
	110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,140,142,144,
	146,148,150,152,154,156,158,160,162,164,166,168,170,172,174,176,178,180,
	182,184,186,188,190,192,194,196,198,200,202,204,0,9,2,0,27,27,38,38,1,0,
	39,40,2,0,51,56,59,63,1,0,58,64,2,0,52,56,62,63,2,0,51,51,59,61,1,0,45,
	50,2,0,65,68,72,73,1,0,79,80,1078,0,206,1,0,0,0,2,230,1,0,0,0,4,233,1,0,
	0,0,6,248,1,0,0,0,8,252,1,0,0,0,10,257,1,0,0,0,12,259,1,0,0,0,14,273,1,
	0,0,0,16,281,1,0,0,0,18,289,1,0,0,0,20,297,1,0,0,0,22,313,1,0,0,0,24,315,
	1,0,0,0,26,319,1,0,0,0,28,325,1,0,0,0,30,336,1,0,0,0,32,339,1,0,0,0,34,
	348,1,0,0,0,36,352,1,0,0,0,38,361,1,0,0,0,40,368,1,0,0,0,42,370,1,0,0,0,
	44,384,1,0,0,0,46,394,1,0,0,0,48,412,1,0,0,0,50,431,1,0,0,0,52,438,1,0,
	0,0,54,440,1,0,0,0,56,442,1,0,0,0,58,446,1,0,0,0,60,449,1,0,0,0,62,454,
	1,0,0,0,64,458,1,0,0,0,66,462,1,0,0,0,68,467,1,0,0,0,70,471,1,0,0,0,72,
	475,1,0,0,0,74,479,1,0,0,0,76,482,1,0,0,0,78,484,1,0,0,0,80,487,1,0,0,0,
	82,508,1,0,0,0,84,510,1,0,0,0,86,532,1,0,0,0,88,540,1,0,0,0,90,542,1,0,
	0,0,92,564,1,0,0,0,94,572,1,0,0,0,96,580,1,0,0,0,98,584,1,0,0,0,100,596,
	1,0,0,0,102,606,1,0,0,0,104,617,1,0,0,0,106,625,1,0,0,0,108,629,1,0,0,0,
	110,642,1,0,0,0,112,658,1,0,0,0,114,663,1,0,0,0,116,675,1,0,0,0,118,677,
	1,0,0,0,120,686,1,0,0,0,122,696,1,0,0,0,124,698,1,0,0,0,126,703,1,0,0,0,
	128,705,1,0,0,0,130,707,1,0,0,0,132,710,1,0,0,0,134,725,1,0,0,0,136,729,
	1,0,0,0,138,740,1,0,0,0,140,750,1,0,0,0,142,752,1,0,0,0,144,755,1,0,0,0,
	146,761,1,0,0,0,148,763,1,0,0,0,150,780,1,0,0,0,152,791,1,0,0,0,154,817,
	1,0,0,0,156,833,1,0,0,0,158,850,1,0,0,0,160,855,1,0,0,0,162,861,1,0,0,0,
	164,863,1,0,0,0,166,865,1,0,0,0,168,867,1,0,0,0,170,871,1,0,0,0,172,886,
	1,0,0,0,174,888,1,0,0,0,176,897,1,0,0,0,178,908,1,0,0,0,180,914,1,0,0,0,
	182,918,1,0,0,0,184,920,1,0,0,0,186,936,1,0,0,0,188,941,1,0,0,0,190,944,
	1,0,0,0,192,950,1,0,0,0,194,954,1,0,0,0,196,958,1,0,0,0,198,978,1,0,0,0,
	200,983,1,0,0,0,202,1002,1,0,0,0,204,1010,1,0,0,0,206,207,3,2,1,0,207,213,
	3,204,102,0,208,209,3,4,2,0,209,210,3,204,102,0,210,212,1,0,0,0,211,208,
	1,0,0,0,212,215,1,0,0,0,213,211,1,0,0,0,213,214,1,0,0,0,214,225,1,0,0,0,
	215,213,1,0,0,0,216,220,3,36,18,0,217,220,3,38,19,0,218,220,3,10,5,0,219,
	216,1,0,0,0,219,217,1,0,0,0,219,218,1,0,0,0,220,221,1,0,0,0,221,222,3,204,
	102,0,222,224,1,0,0,0,223,219,1,0,0,0,224,227,1,0,0,0,225,223,1,0,0,0,225,
	226,1,0,0,0,226,228,1,0,0,0,227,225,1,0,0,0,228,229,5,0,0,1,229,1,1,0,0,
	0,230,231,5,14,0,0,231,232,5,27,0,0,232,3,1,0,0,0,233,245,5,23,0,0,234,
	246,3,6,3,0,235,241,5,28,0,0,236,237,3,6,3,0,237,238,3,204,102,0,238,240,
	1,0,0,0,239,236,1,0,0,0,240,243,1,0,0,0,241,239,1,0,0,0,241,242,1,0,0,0,
	242,244,1,0,0,0,243,241,1,0,0,0,244,246,5,29,0,0,245,234,1,0,0,0,245,235,
	1,0,0,0,246,5,1,0,0,0,247,249,7,0,0,0,248,247,1,0,0,0,248,249,1,0,0,0,249,
	250,1,0,0,0,250,251,3,8,4,0,251,7,1,0,0,0,252,253,3,188,94,0,253,9,1,0,
	0,0,254,258,3,12,6,0,255,258,3,20,10,0,256,258,3,42,21,0,257,254,1,0,0,
	0,257,255,1,0,0,0,257,256,1,0,0,0,258,11,1,0,0,0,259,271,5,16,0,0,260,272,
	3,14,7,0,261,267,5,28,0,0,262,263,3,14,7,0,263,264,3,204,102,0,264,266,
	1,0,0,0,265,262,1,0,0,0,266,269,1,0,0,0,267,265,1,0,0,0,267,268,1,0,0,0,
	268,270,1,0,0,0,269,267,1,0,0,0,270,272,5,29,0,0,271,260,1,0,0,0,271,261,
	1,0,0,0,272,13,1,0,0,0,273,279,3,16,8,0,274,276,3,116,58,0,275,274,1,0,
	0,0,275,276,1,0,0,0,276,277,1,0,0,0,277,278,5,34,0,0,278,280,3,18,9,0,279,
	275,1,0,0,0,279,280,1,0,0,0,280,15,1,0,0,0,281,286,5,27,0,0,282,283,5,35,
	0,0,283,285,5,27,0,0,284,282,1,0,0,0,285,288,1,0,0,0,286,284,1,0,0,0,286,
	287,1,0,0,0,287,17,1,0,0,0,288,286,1,0,0,0,289,294,3,152,76,0,290,291,5,
	35,0,0,291,293,3,152,76,0,292,290,1,0,0,0,293,296,1,0,0,0,294,292,1,0,0,
	0,294,295,1,0,0,0,295,19,1,0,0,0,296,294,1,0,0,0,297,309,5,20,0,0,298,310,
	3,22,11,0,299,305,5,28,0,0,300,301,3,22,11,0,301,302,3,204,102,0,302,304,
	1,0,0,0,303,300,1,0,0,0,304,307,1,0,0,0,305,303,1,0,0,0,305,306,1,0,0,0,
	306,308,1,0,0,0,307,305,1,0,0,0,308,310,5,29,0,0,309,298,1,0,0,0,309,299,
	1,0,0,0,310,21,1,0,0,0,311,314,3,24,12,0,312,314,3,26,13,0,313,311,1,0,
	0,0,313,312,1,0,0,0,314,23,1,0,0,0,315,316,5,27,0,0,316,317,5,34,0,0,317,
	318,3,116,58,0,318,25,1,0,0,0,319,321,5,27,0,0,320,322,3,28,14,0,321,320,
	1,0,0,0,321,322,1,0,0,0,322,323,1,0,0,0,323,324,3,116,58,0,324,27,1,0,0,
	0,325,326,5,32,0,0,326,331,3,30,15,0,327,328,5,35,0,0,328,330,3,30,15,0,
	329,327,1,0,0,0,330,333,1,0,0,0,331,329,1,0,0,0,331,332,1,0,0,0,332,334,
	1,0,0,0,333,331,1,0,0,0,334,335,5,33,0,0,335,29,1,0,0,0,336,337,3,16,8,
	0,337,338,3,32,16,0,338,31,1,0,0,0,339,344,3,34,17,0,340,341,5,51,0,0,341,
	343,3,34,17,0,342,340,1,0,0,0,343,346,1,0,0,0,344,342,1,0,0,0,344,345,1,
	0,0,0,345,33,1,0,0,0,346,344,1,0,0,0,347,349,5,57,0,0,348,347,1,0,0,0,348,
	349,1,0,0,0,349,350,1,0,0,0,350,351,3,116,58,0,351,35,1,0,0,0,352,353,5,
	3,0,0,353,355,5,27,0,0,354,356,3,28,14,0,355,354,1,0,0,0,355,356,1,0,0,
	0,356,357,1,0,0,0,357,359,3,144,72,0,358,360,3,46,23,0,359,358,1,0,0,0,
	359,360,1,0,0,0,360,37,1,0,0,0,361,362,5,3,0,0,362,363,3,40,20,0,363,364,
	5,27,0,0,364,366,3,144,72,0,365,367,3,46,23,0,366,365,1,0,0,0,366,367,1,
	0,0,0,367,39,1,0,0,0,368,369,3,148,74,0,369,41,1,0,0,0,370,382,5,25,0,0,
	371,383,3,44,22,0,372,378,5,28,0,0,373,374,3,44,22,0,374,375,3,204,102,
	0,375,377,1,0,0,0,376,373,1,0,0,0,377,380,1,0,0,0,378,376,1,0,0,0,378,379,
	1,0,0,0,379,381,1,0,0,0,380,378,1,0,0,0,381,383,5,29,0,0,382,371,1,0,0,
	0,382,372,1,0,0,0,383,43,1,0,0,0,384,392,3,16,8,0,385,388,3,116,58,0,386,
	387,5,34,0,0,387,389,3,18,9,0,388,386,1,0,0,0,388,389,1,0,0,0,389,393,1,
	0,0,0,390,391,5,34,0,0,391,393,3,18,9,0,392,385,1,0,0,0,392,390,1,0,0,0,
	393,45,1,0,0,0,394,396,5,30,0,0,395,397,3,48,24,0,396,395,1,0,0,0,396,397,
	1,0,0,0,397,398,1,0,0,0,398,399,5,31,0,0,399,47,1,0,0,0,400,402,5,36,0,
	0,401,400,1,0,0,0,401,402,1,0,0,0,402,408,1,0,0,0,403,405,5,88,0,0,404,
	403,1,0,0,0,404,405,1,0,0,0,405,408,1,0,0,0,406,408,4,24,0,0,407,401,1,
	0,0,0,407,404,1,0,0,0,407,406,1,0,0,0,408,409,1,0,0,0,409,410,3,50,25,0,
	410,411,3,204,102,0,411,413,1,0,0,0,412,407,1,0,0,0,413,414,1,0,0,0,414,
	412,1,0,0,0,414,415,1,0,0,0,415,49,1,0,0,0,416,432,3,10,5,0,417,432,3,66,
	33,0,418,432,3,52,26,0,419,432,3,114,57,0,420,432,3,68,34,0,421,432,3,70,
	35,0,422,432,3,72,36,0,423,432,3,74,37,0,424,432,3,76,38,0,425,432,3,46,
	23,0,426,432,3,80,40,0,427,432,3,82,41,0,428,432,3,100,50,0,429,432,3,108,
	54,0,430,432,3,78,39,0,431,416,1,0,0,0,431,417,1,0,0,0,431,418,1,0,0,0,
	431,419,1,0,0,0,431,420,1,0,0,0,431,421,1,0,0,0,431,422,1,0,0,0,431,423,
	1,0,0,0,431,424,1,0,0,0,431,425,1,0,0,0,431,426,1,0,0,0,431,427,1,0,0,0,
	431,428,1,0,0,0,431,429,1,0,0,0,431,430,1,0,0,0,432,51,1,0,0,0,433,439,
	3,56,28,0,434,439,3,58,29,0,435,439,3,60,30,0,436,439,3,54,27,0,437,439,
	3,64,32,0,438,433,1,0,0,0,438,434,1,0,0,0,438,435,1,0,0,0,438,436,1,0,0,
	0,438,437,1,0,0,0,439,53,1,0,0,0,440,441,3,152,76,0,441,55,1,0,0,0,442,
	443,3,152,76,0,443,444,5,64,0,0,444,445,3,152,76,0,445,57,1,0,0,0,446,447,
	3,152,76,0,447,448,7,1,0,0,448,59,1,0,0,0,449,450,3,18,9,0,450,451,3,62,
	31,0,451,452,3,18,9,0,452,61,1,0,0,0,453,455,7,2,0,0,454,453,1,0,0,0,454,
	455,1,0,0,0,455,456,1,0,0,0,456,457,5,34,0,0,457,63,1,0,0,0,458,459,3,16,
	8,0,459,460,5,41,0,0,460,461,3,18,9,0,461,65,1,0,0,0,462,463,5,27,0,0,463,
	465,5,37,0,0,464,466,3,50,25,0,465,464,1,0,0,0,465,466,1,0,0,0,466,67,1,
	0,0,0,467,469,5,24,0,0,468,470,3,18,9,0,469,468,1,0,0,0,469,470,1,0,0,0,
	470,69,1,0,0,0,471,473,5,1,0,0,472,474,5,27,0,0,473,472,1,0,0,0,473,474,
	1,0,0,0,474,71,1,0,0,0,475,477,5,21,0,0,476,478,5,27,0,0,477,476,1,0,0,
	0,477,478,1,0,0,0,478,73,1,0,0,0,479,480,5,13,0,0,480,481,5,27,0,0,481,
	75,1,0,0,0,482,483,5,17,0,0,483,77,1,0,0,0,484,485,5,7,0,0,485,486,3,152,
	76,0,486,79,1,0,0,0,487,496,5,18,0,0,488,497,3,152,76,0,489,490,3,204,102,
	0,490,491,3,152,76,0,491,497,1,0,0,0,492,493,3,52,26,0,493,494,3,204,102,
	0,494,495,3,152,76,0,495,497,1,0,0,0,496,488,1,0,0,0,496,489,1,0,0,0,496,
	492,1,0,0,0,497,498,1,0,0,0,498,504,3,46,23,0,499,502,5,12,0,0,500,503,
	3,80,40,0,501,503,3,46,23,0,502,500,1,0,0,0,502,501,1,0,0,0,503,505,1,0,
	0,0,504,499,1,0,0,0,504,505,1,0,0,0,505,81,1,0,0,0,506,509,3,84,42,0,507,
	509,3,90,45,0,508,506,1,0,0,0,508,507,1,0,0,0,509,83,1,0,0,0,510,521,5,
	15,0,0,511,513,3,152,76,0,512,511,1,0,0,0,512,513,1,0,0,0,513,522,1,0,0,
	0,514,516,3,52,26,0,515,514,1,0,0,0,515,516,1,0,0,0,516,517,1,0,0,0,517,
	519,3,204,102,0,518,520,3,152,76,0,519,518,1,0,0,0,519,520,1,0,0,0,520,
	522,1,0,0,0,521,512,1,0,0,0,521,515,1,0,0,0,522,523,1,0,0,0,523,527,5,30,
	0,0,524,526,3,86,43,0,525,524,1,0,0,0,526,529,1,0,0,0,527,525,1,0,0,0,527,
	528,1,0,0,0,528,530,1,0,0,0,529,527,1,0,0,0,530,531,5,31,0,0,531,85,1,0,
	0,0,532,533,3,88,44,0,533,535,5,37,0,0,534,536,3,48,24,0,535,534,1,0,0,
	0,535,536,1,0,0,0,536,87,1,0,0,0,537,538,5,6,0,0,538,541,3,18,9,0,539,541,
	5,2,0,0,540,537,1,0,0,0,540,539,1,0,0,0,541,89,1,0,0,0,542,551,5,15,0,0,
	543,552,3,92,46,0,544,545,3,204,102,0,545,546,3,92,46,0,546,552,1,0,0,0,
	547,548,3,52,26,0,548,549,3,204,102,0,549,550,3,92,46,0,550,552,1,0,0,0,
	551,543,1,0,0,0,551,544,1,0,0,0,551,547,1,0,0,0,552,553,1,0,0,0,553,557,
	5,30,0,0,554,556,3,94,47,0,555,554,1,0,0,0,556,559,1,0,0,0,557,555,1,0,
	0,0,557,558,1,0,0,0,558,560,1,0,0,0,559,557,1,0,0,0,560,561,5,31,0,0,561,
	91,1,0,0,0,562,563,5,27,0,0,563,565,5,41,0,0,564,562,1,0,0,0,564,565,1,
	0,0,0,565,566,1,0,0,0,566,567,3,154,77,0,567,568,5,38,0,0,568,569,5,28,
	0,0,569,570,5,20,0,0,570,571,5,29,0,0,571,93,1,0,0,0,572,573,3,96,48,0,
	573,575,5,37,0,0,574,576,3,48,24,0,575,574,1,0,0,0,575,576,1,0,0,0,576,
	95,1,0,0,0,577,578,5,6,0,0,578,581,3,98,49,0,579,581,5,2,0,0,580,577,1,
	0,0,0,580,579,1,0,0,0,581,97,1,0,0,0,582,585,3,116,58,0,583,585,5,26,0,
	0,584,582,1,0,0,0,584,583,1,0,0,0,585,593,1,0,0,0,586,589,5,35,0,0,587,
	590,3,116,58,0,588,590,5,26,0,0,589,587,1,0,0,0,589,588,1,0,0,0,590,592,
	1,0,0,0,591,586,1,0,0,0,592,595,1,0,0,0,593,591,1,0,0,0,593,594,1,0,0,0,
	594,99,1,0,0,0,595,593,1,0,0,0,596,597,5,5,0,0,597,601,5,30,0,0,598,600,
	3,102,51,0,599,598,1,0,0,0,600,603,1,0,0,0,601,599,1,0,0,0,601,602,1,0,
	0,0,602,604,1,0,0,0,603,601,1,0,0,0,604,605,5,31,0,0,605,101,1,0,0,0,606,
	607,3,104,52,0,607,609,5,37,0,0,608,610,3,48,24,0,609,608,1,0,0,0,609,610,
	1,0,0,0,610,103,1,0,0,0,611,614,5,6,0,0,612,615,3,56,28,0,613,615,3,106,
	53,0,614,612,1,0,0,0,614,613,1,0,0,0,615,618,1,0,0,0,616,618,5,2,0,0,617,
	611,1,0,0,0,617,616,1,0,0,0,618,105,1,0,0,0,619,620,3,18,9,0,620,621,5,
	34,0,0,621,626,1,0,0,0,622,623,3,16,8,0,623,624,5,41,0,0,624,626,1,0,0,
	0,625,619,1,0,0,0,625,622,1,0,0,0,625,626,1,0,0,0,626,627,1,0,0,0,627,628,
	3,152,76,0,628,107,1,0,0,0,629,637,5,22,0,0,630,632,3,152,76,0,631,630,
	1,0,0,0,631,632,1,0,0,0,632,638,1,0,0,0,633,638,3,110,55,0,634,636,3,112,
	56,0,635,634,1,0,0,0,635,636,1,0,0,0,636,638,1,0,0,0,637,631,1,0,0,0,637,
	633,1,0,0,0,637,635,1,0,0,0,638,639,1,0,0,0,639,640,3,46,23,0,640,109,1,
	0,0,0,641,643,3,52,26,0,642,641,1,0,0,0,642,643,1,0,0,0,643,644,1,0,0,0,
	644,646,3,204,102,0,645,647,3,152,76,0,646,645,1,0,0,0,646,647,1,0,0,0,
	647,648,1,0,0,0,648,650,3,204,102,0,649,651,3,52,26,0,650,649,1,0,0,0,650,
	651,1,0,0,0,651,111,1,0,0,0,652,653,3,18,9,0,653,654,5,34,0,0,654,659,1,
	0,0,0,655,656,3,16,8,0,656,657,5,41,0,0,657,659,1,0,0,0,658,652,1,0,0,0,
	658,655,1,0,0,0,658,659,1,0,0,0,659,660,1,0,0,0,660,661,5,19,0,0,661,662,
	3,152,76,0,662,113,1,0,0,0,663,664,5,8,0,0,664,665,3,152,76,0,665,115,1,
	0,0,0,666,668,3,120,60,0,667,669,3,118,59,0,668,667,1,0,0,0,668,669,1,0,
	0,0,669,676,1,0,0,0,670,676,3,122,61,0,671,672,5,28,0,0,672,673,3,116,58,
	0,673,674,5,29,0,0,674,676,1,0,0,0,675,666,1,0,0,0,675,670,1,0,0,0,675,
	671,1,0,0,0,676,117,1,0,0,0,677,678,5,32,0,0,678,680,3,98,49,0,679,681,
	5,35,0,0,680,679,1,0,0,0,680,681,1,0,0,0,681,682,1,0,0,0,682,683,5,33,0,
	0,683,119,1,0,0,0,684,687,3,168,84,0,685,687,5,27,0,0,686,684,1,0,0,0,686,
	685,1,0,0,0,687,121,1,0,0,0,688,697,3,124,62,0,689,697,3,184,92,0,690,697,
	3,130,65,0,691,697,3,142,71,0,692,697,3,132,66,0,693,697,3,134,67,0,694,
	697,3,136,68,0,695,697,3,138,69,0,696,688,1,0,0,0,696,689,1,0,0,0,696,690,
	1,0,0,0,696,691,1,0,0,0,696,692,1,0,0,0,696,693,1,0,0,0,696,694,1,0,0,0,
	696,695,1,0,0,0,697,123,1,0,0,0,698,699,5,32,0,0,699,700,3,126,63,0,700,
	701,5,33,0,0,701,702,3,128,64,0,702,125,1,0,0,0,703,704,3,152,76,0,704,
	127,1,0,0,0,705,706,3,116,58,0,706,129,1,0,0,0,707,708,5,62,0,0,708,709,
	3,116,58,0,709,131,1,0,0,0,710,711,5,4,0,0,711,720,5,30,0,0,712,715,3,140,
	70,0,713,715,3,32,16,0,714,712,1,0,0,0,714,713,1,0,0,0,715,716,1,0,0,0,
	716,717,3,204,102,0,717,719,1,0,0,0,718,714,1,0,0,0,719,722,1,0,0,0,720,
	718,1,0,0,0,720,721,1,0,0,0,721,723,1,0,0,0,722,720,1,0,0,0,723,724,5,31,
	0,0,724,133,1,0,0,0,725,726,5,32,0,0,726,727,5,33,0,0,727,728,3,128,64,
	0,728,135,1,0,0,0,729,730,5,9,0,0,730,731,5,32,0,0,731,732,3,116,58,0,732,
	733,5,33,0,0,733,734,3,128,64,0,734,137,1,0,0,0,735,741,5,11,0,0,736,737,
	5,11,0,0,737,741,5,64,0,0,738,739,5,64,0,0,739,741,5,11,0,0,740,735,1,0,
	0,0,740,736,1,0,0,0,740,738,1,0,0,0,741,742,1,0,0,0,742,743,3,128,64,0,
	743,139,1,0,0,0,744,745,5,27,0,0,745,746,3,148,74,0,746,747,3,146,73,0,
	747,751,1,0,0,0,748,749,5,27,0,0,749,751,3,148,74,0,750,744,1,0,0,0,750,
	748,1,0,0,0,751,141,1,0,0,0,752,753,5,3,0,0,753,754,3,144,72,0,754,143,
	1,0,0,0,755,757,3,148,74,0,756,758,3,146,73,0,757,756,1,0,0,0,757,758,1,
	0,0,0,758,145,1,0,0,0,759,762,3,148,74,0,760,762,3,116,58,0,761,759,1,0,
	0,0,761,760,1,0,0,0,762,147,1,0,0,0,763,775,5,28,0,0,764,769,3,150,75,0,
	765,766,5,35,0,0,766,768,3,150,75,0,767,765,1,0,0,0,768,771,1,0,0,0,769,
	767,1,0,0,0,769,770,1,0,0,0,770,773,1,0,0,0,771,769,1,0,0,0,772,774,5,35,
	0,0,773,772,1,0,0,0,773,774,1,0,0,0,774,776,1,0,0,0,775,764,1,0,0,0,775,
	776,1,0,0,0,776,777,1,0,0,0,777,778,5,29,0,0,778,149,1,0,0,0,779,781,3,
	16,8,0,780,779,1,0,0,0,780,781,1,0,0,0,781,783,1,0,0,0,782,784,5,42,0,0,
	783,782,1,0,0,0,783,784,1,0,0,0,784,785,1,0,0,0,785,786,3,116,58,0,786,
	151,1,0,0,0,787,788,6,76,-1,0,788,792,3,154,77,0,789,790,7,3,0,0,790,792,
	3,152,76,6,791,787,1,0,0,0,791,789,1,0,0,0,792,810,1,0,0,0,793,794,10,5,
	0,0,794,795,7,4,0,0,795,809,3,152,76,6,796,797,10,4,0,0,797,798,7,5,0,0,
	798,809,3,152,76,5,799,800,10,3,0,0,800,801,7,6,0,0,801,809,3,152,76,4,
	802,803,10,2,0,0,803,804,5,44,0,0,804,809,3,152,76,3,805,806,10,1,0,0,806,
	807,5,43,0,0,807,809,3,152,76,2,808,793,1,0,0,0,808,796,1,0,0,0,808,799,
	1,0,0,0,808,802,1,0,0,0,808,805,1,0,0,0,809,812,1,0,0,0,810,808,1,0,0,0,
	810,811,1,0,0,0,811,153,1,0,0,0,812,810,1,0,0,0,813,814,6,77,-1,0,814,818,
	3,158,79,0,815,818,3,156,78,0,816,818,3,202,101,0,817,813,1,0,0,0,817,815,
	1,0,0,0,817,816,1,0,0,0,818,830,1,0,0,0,819,826,10,1,0,0,820,821,5,38,0,
	0,821,827,5,27,0,0,822,827,3,194,97,0,823,827,3,196,98,0,824,827,3,198,
	99,0,825,827,3,200,100,0,826,820,1,0,0,0,826,822,1,0,0,0,826,823,1,0,0,
	0,826,824,1,0,0,0,826,825,1,0,0,0,827,829,1,0,0,0,828,819,1,0,0,0,829,832,
	1,0,0,0,830,828,1,0,0,0,830,831,1,0,0,0,831,155,1,0,0,0,832,830,1,0,0,0,
	833,834,3,116,58,0,834,835,5,28,0,0,835,837,3,152,76,0,836,838,5,35,0,0,
	837,836,1,0,0,0,837,838,1,0,0,0,838,839,1,0,0,0,839,840,5,29,0,0,840,157,
	1,0,0,0,841,851,3,160,80,0,842,844,3,166,83,0,843,845,3,118,59,0,844,843,
	1,0,0,0,844,845,1,0,0,0,845,851,1,0,0,0,846,847,5,28,0,0,847,848,3,152,
	76,0,848,849,5,29,0,0,849,851,1,0,0,0,850,841,1,0,0,0,850,842,1,0,0,0,850,
	846,1,0,0,0,851,159,1,0,0,0,852,856,3,162,81,0,853,856,3,170,85,0,854,856,
	3,192,96,0,855,852,1,0,0,0,855,853,1,0,0,0,855,854,1,0,0,0,856,161,1,0,
	0,0,857,862,5,26,0,0,858,862,3,164,82,0,859,862,3,188,94,0,860,862,5,69,
	0,0,861,857,1,0,0,0,861,858,1,0,0,0,861,859,1,0,0,0,861,860,1,0,0,0,862,
	163,1,0,0,0,863,864,7,7,0,0,864,165,1,0,0,0,865,866,5,27,0,0,866,167,1,
	0,0,0,867,868,5,27,0,0,868,869,5,38,0,0,869,870,5,27,0,0,870,169,1,0,0,
	0,871,872,3,172,86,0,872,873,3,174,87,0,873,171,1,0,0,0,874,887,3,184,92,
	0,875,887,3,124,62,0,876,877,5,32,0,0,877,878,5,42,0,0,878,879,5,33,0,0,
	879,887,3,128,64,0,880,887,3,134,67,0,881,887,3,136,68,0,882,884,3,120,
	60,0,883,885,3,118,59,0,884,883,1,0,0,0,884,885,1,0,0,0,885,887,1,0,0,0,
	886,874,1,0,0,0,886,875,1,0,0,0,886,876,1,0,0,0,886,880,1,0,0,0,886,881,
	1,0,0,0,886,882,1,0,0,0,887,173,1,0,0,0,888,893,5,30,0,0,889,891,3,176,
	88,0,890,892,5,35,0,0,891,890,1,0,0,0,891,892,1,0,0,0,892,894,1,0,0,0,893,
	889,1,0,0,0,893,894,1,0,0,0,894,895,1,0,0,0,895,896,5,31,0,0,896,175,1,
	0,0,0,897,902,3,178,89,0,898,899,5,35,0,0,899,901,3,178,89,0,900,898,1,
	0,0,0,901,904,1,0,0,0,902,900,1,0,0,0,902,903,1,0,0,0,903,177,1,0,0,0,904,
	902,1,0,0,0,905,906,3,180,90,0,906,907,5,37,0,0,907,909,1,0,0,0,908,905,
	1,0,0,0,908,909,1,0,0,0,909,910,1,0,0,0,910,911,3,182,91,0,911,179,1,0,
	0,0,912,915,3,152,76,0,913,915,3,174,87,0,914,912,1,0,0,0,914,913,1,0,0,
	0,915,181,1,0,0,0,916,919,3,152,76,0,917,919,3,174,87,0,918,916,1,0,0,0,
	918,917,1,0,0,0,919,183,1,0,0,0,920,921,5,10,0,0,921,927,5,30,0,0,922,923,
	3,186,93,0,923,924,3,204,102,0,924,926,1,0,0,0,925,922,1,0,0,0,926,929,
	1,0,0,0,927,925,1,0,0,0,927,928,1,0,0,0,928,930,1,0,0,0,929,927,1,0,0,0,
	930,931,5,31,0,0,931,185,1,0,0,0,932,933,3,16,8,0,933,934,3,116,58,0,934,
	937,1,0,0,0,935,937,3,190,95,0,936,932,1,0,0,0,936,935,1,0,0,0,937,939,
	1,0,0,0,938,940,3,188,94,0,939,938,1,0,0,0,939,940,1,0,0,0,940,187,1,0,
	0,0,941,942,7,8,0,0,942,189,1,0,0,0,943,945,5,62,0,0,944,943,1,0,0,0,944,
	945,1,0,0,0,945,946,1,0,0,0,946,948,3,120,60,0,947,949,3,118,59,0,948,947,
	1,0,0,0,948,949,1,0,0,0,949,191,1,0,0,0,950,951,5,3,0,0,951,952,3,144,72,
	0,952,953,3,46,23,0,953,193,1,0,0,0,954,955,5,32,0,0,955,956,3,152,76,0,
	956,957,5,33,0,0,957,195,1,0,0,0,958,974,5,32,0,0,959,961,3,152,76,0,960,
	959,1,0,0,0,960,961,1,0,0,0,961,962,1,0,0,0,962,964,5,37,0,0,963,965,3,
	152,76,0,964,963,1,0,0,0,964,965,1,0,0,0,965,975,1,0,0,0,966,968,3,152,
	76,0,967,966,1,0,0,0,967,968,1,0,0,0,968,969,1,0,0,0,969,970,5,37,0,0,970,
	971,3,152,76,0,971,972,5,37,0,0,972,973,3,152,76,0,973,975,1,0,0,0,974,
	960,1,0,0,0,974,967,1,0,0,0,975,976,1,0,0,0,976,977,5,33,0,0,977,197,1,
	0,0,0,978,979,5,38,0,0,979,980,5,28,0,0,980,981,3,116,58,0,981,982,5,29,
	0,0,982,199,1,0,0,0,983,998,5,28,0,0,984,991,3,18,9,0,985,988,3,116,58,
	0,986,987,5,35,0,0,987,989,3,18,9,0,988,986,1,0,0,0,988,989,1,0,0,0,989,
	991,1,0,0,0,990,984,1,0,0,0,990,985,1,0,0,0,991,993,1,0,0,0,992,994,5,42,
	0,0,993,992,1,0,0,0,993,994,1,0,0,0,994,996,1,0,0,0,995,997,5,35,0,0,996,
	995,1,0,0,0,996,997,1,0,0,0,997,999,1,0,0,0,998,990,1,0,0,0,998,999,1,0,
	0,0,999,1000,1,0,0,0,1000,1001,5,29,0,0,1001,201,1,0,0,0,1002,1003,3,116,
	58,0,1003,1004,5,38,0,0,1004,1005,5,27,0,0,1005,203,1,0,0,0,1006,1011,5,
	36,0,0,1007,1011,5,0,0,1,1008,1011,5,88,0,0,1009,1011,4,102,7,0,1010,1006,
	1,0,0,0,1010,1007,1,0,0,0,1010,1008,1,0,0,0,1010,1009,1,0,0,0,1011,205,
	1,0,0,0,120,213,219,225,241,245,248,257,267,271,275,279,286,294,305,309,
	313,321,331,344,348,355,359,366,378,382,388,392,396,401,404,407,414,431,
	438,454,465,469,473,477,496,502,504,508,512,515,519,521,527,535,540,551,
	557,564,575,580,584,589,593,601,609,614,617,625,631,635,637,642,646,650,
	658,668,675,680,686,696,714,720,740,750,757,761,769,773,775,780,783,791,
	808,810,817,826,830,837,844,850,855,861,884,886,891,893,902,908,914,918,
	927,936,939,944,948,960,964,967,974,988,990,993,996,998,1010];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!GoParser.__ATN) {
			GoParser.__ATN = new ATNDeserializer().deserialize(GoParser._serializedATN);
		}

		return GoParser.__ATN;
	}


	static DecisionsToDFA = GoParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class SourceFileContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public packageClause(): PackageClauseContext {
		return this.getTypedRuleContext(PackageClauseContext, 0) as PackageClauseContext;
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(GoParser.EOF, 0);
	}
	public importDecl_list(): ImportDeclContext[] {
		return this.getTypedRuleContexts(ImportDeclContext) as ImportDeclContext[];
	}
	public importDecl(i: number): ImportDeclContext {
		return this.getTypedRuleContext(ImportDeclContext, i) as ImportDeclContext;
	}
	public functionDecl_list(): FunctionDeclContext[] {
		return this.getTypedRuleContexts(FunctionDeclContext) as FunctionDeclContext[];
	}
	public functionDecl(i: number): FunctionDeclContext {
		return this.getTypedRuleContext(FunctionDeclContext, i) as FunctionDeclContext;
	}
	public methodDecl_list(): MethodDeclContext[] {
		return this.getTypedRuleContexts(MethodDeclContext) as MethodDeclContext[];
	}
	public methodDecl(i: number): MethodDeclContext {
		return this.getTypedRuleContext(MethodDeclContext, i) as MethodDeclContext;
	}
	public declaration_list(): DeclarationContext[] {
		return this.getTypedRuleContexts(DeclarationContext) as DeclarationContext[];
	}
	public declaration(i: number): DeclarationContext {
		return this.getTypedRuleContext(DeclarationContext, i) as DeclarationContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_sourceFile;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSourceFile) {
			return visitor.visitSourceFile(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PackageClauseContext extends ParserRuleContext {
	public _packageName!: Token;
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PACKAGE(): TerminalNode {
		return this.getToken(GoParser.PACKAGE, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_packageClause;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitPackageClause) {
			return visitor.visitPackageClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IMPORT(): TerminalNode {
		return this.getToken(GoParser.IMPORT, 0);
	}
	public importSpec_list(): ImportSpecContext[] {
		return this.getTypedRuleContexts(ImportSpecContext) as ImportSpecContext[];
	}
	public importSpec(i: number): ImportSpecContext {
		return this.getTypedRuleContext(ImportSpecContext, i) as ImportSpecContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_importDecl;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitImportDecl) {
			return visitor.visitImportDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportSpecContext extends ParserRuleContext {
	public _alias!: Token;
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public importPath(): ImportPathContext {
		return this.getTypedRuleContext(ImportPathContext, 0) as ImportPathContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(GoParser.DOT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_importSpec;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitImportSpec) {
			return visitor.visitImportSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportPathContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public string_(): String_Context {
		return this.getTypedRuleContext(String_Context, 0) as String_Context;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_importPath;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitImportPath) {
			return visitor.visitImportPath(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public constDecl(): ConstDeclContext {
		return this.getTypedRuleContext(ConstDeclContext, 0) as ConstDeclContext;
	}
	public typeDecl(): TypeDeclContext {
		return this.getTypedRuleContext(TypeDeclContext, 0) as TypeDeclContext;
	}
	public varDecl(): VarDeclContext {
		return this.getTypedRuleContext(VarDeclContext, 0) as VarDeclContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_declaration;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitDeclaration) {
			return visitor.visitDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CONST(): TerminalNode {
		return this.getToken(GoParser.CONST, 0);
	}
	public constSpec_list(): ConstSpecContext[] {
		return this.getTypedRuleContexts(ConstSpecContext) as ConstSpecContext[];
	}
	public constSpec(i: number): ConstSpecContext {
		return this.getTypedRuleContext(ConstSpecContext, i) as ConstSpecContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_constDecl;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitConstDecl) {
			return visitor.visitConstDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstSpecContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(GoParser.ASSIGN, 0);
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_constSpec;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitConstSpec) {
			return visitor.visitConstSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierListContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, i);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_identifierList;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitIdentifierList) {
			return visitor.visitIdentifierList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionListContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_expressionList;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitExpressionList) {
			return visitor.visitExpressionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TYPE(): TerminalNode {
		return this.getToken(GoParser.TYPE, 0);
	}
	public typeSpec_list(): TypeSpecContext[] {
		return this.getTypedRuleContexts(TypeSpecContext) as TypeSpecContext[];
	}
	public typeSpec(i: number): TypeSpecContext {
		return this.getTypedRuleContext(TypeSpecContext, i) as TypeSpecContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeDecl;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeDecl) {
			return visitor.visitTypeDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeSpecContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public aliasDecl(): AliasDeclContext {
		return this.getTypedRuleContext(AliasDeclContext, 0) as AliasDeclContext;
	}
	public typeDef(): TypeDefContext {
		return this.getTypedRuleContext(TypeDefContext, 0) as TypeDefContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeSpec;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeSpec) {
			return visitor.visitTypeSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AliasDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(GoParser.ASSIGN, 0);
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_aliasDecl;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitAliasDecl) {
			return visitor.visitAliasDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeDefContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public typeParameters(): TypeParametersContext {
		return this.getTypedRuleContext(TypeParametersContext, 0) as TypeParametersContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeDef;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeDef) {
			return visitor.visitTypeDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeParametersContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(GoParser.L_BRACKET, 0);
	}
	public typeParameterDecl_list(): TypeParameterDeclContext[] {
		return this.getTypedRuleContexts(TypeParameterDeclContext) as TypeParameterDeclContext[];
	}
	public typeParameterDecl(i: number): TypeParameterDeclContext {
		return this.getTypedRuleContext(TypeParameterDeclContext, i) as TypeParameterDeclContext;
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(GoParser.R_BRACKET, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeParameters;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeParameters) {
			return visitor.visitTypeParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeParameterDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public typeElement(): TypeElementContext {
		return this.getTypedRuleContext(TypeElementContext, 0) as TypeElementContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeParameterDecl;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeParameterDecl) {
			return visitor.visitTypeParameterDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeElementContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeTerm_list(): TypeTermContext[] {
		return this.getTypedRuleContexts(TypeTermContext) as TypeTermContext[];
	}
	public typeTerm(i: number): TypeTermContext {
		return this.getTypedRuleContext(TypeTermContext, i) as TypeTermContext;
	}
	public OR_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.OR);
	}
	public OR(i: number): TerminalNode {
		return this.getToken(GoParser.OR, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeElement;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeElement) {
			return visitor.visitTypeElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeTermContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public UNDERLYING(): TerminalNode {
		return this.getToken(GoParser.UNDERLYING, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeTerm;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeTerm) {
			return visitor.visitTypeTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FUNC(): TerminalNode {
		return this.getToken(GoParser.FUNC, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
	public signature(): SignatureContext {
		return this.getTypedRuleContext(SignatureContext, 0) as SignatureContext;
	}
	public typeParameters(): TypeParametersContext {
		return this.getTypedRuleContext(TypeParametersContext, 0) as TypeParametersContext;
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_functionDecl;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitFunctionDecl) {
			return visitor.visitFunctionDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FUNC(): TerminalNode {
		return this.getToken(GoParser.FUNC, 0);
	}
	public receiver(): ReceiverContext {
		return this.getTypedRuleContext(ReceiverContext, 0) as ReceiverContext;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
	public signature(): SignatureContext {
		return this.getTypedRuleContext(SignatureContext, 0) as SignatureContext;
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_methodDecl;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitMethodDecl) {
			return visitor.visitMethodDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReceiverContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parameters(): ParametersContext {
		return this.getTypedRuleContext(ParametersContext, 0) as ParametersContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_receiver;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitReceiver) {
			return visitor.visitReceiver(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public VAR(): TerminalNode {
		return this.getToken(GoParser.VAR, 0);
	}
	public varSpec_list(): VarSpecContext[] {
		return this.getTypedRuleContexts(VarSpecContext) as VarSpecContext[];
	}
	public varSpec(i: number): VarSpecContext {
		return this.getTypedRuleContext(VarSpecContext, i) as VarSpecContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_varDecl;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitVarDecl) {
			return visitor.visitVarDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarSpecContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(GoParser.ASSIGN, 0);
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_varSpec;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitVarSpec) {
			return visitor.visitVarSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_CURLY(): TerminalNode {
		return this.getToken(GoParser.L_CURLY, 0);
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(GoParser.R_CURLY, 0);
	}
	public statementList(): StatementListContext {
		return this.getTypedRuleContext(StatementListContext, 0) as StatementListContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_block;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitBlock) {
			return visitor.visitBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementListContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
	public SEMI_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.SEMI);
	}
	public SEMI(i: number): TerminalNode {
		return this.getToken(GoParser.SEMI, i);
	}
	public EOS_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.EOS);
	}
	public EOS(i: number): TerminalNode {
		return this.getToken(GoParser.EOS, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_statementList;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitStatementList) {
			return visitor.visitStatementList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declaration(): DeclarationContext {
		return this.getTypedRuleContext(DeclarationContext, 0) as DeclarationContext;
	}
	public labeledStmt(): LabeledStmtContext {
		return this.getTypedRuleContext(LabeledStmtContext, 0) as LabeledStmtContext;
	}
	public simpleStmt(): SimpleStmtContext {
		return this.getTypedRuleContext(SimpleStmtContext, 0) as SimpleStmtContext;
	}
	public goStmt(): GoStmtContext {
		return this.getTypedRuleContext(GoStmtContext, 0) as GoStmtContext;
	}
	public returnStmt(): ReturnStmtContext {
		return this.getTypedRuleContext(ReturnStmtContext, 0) as ReturnStmtContext;
	}
	public breakStmt(): BreakStmtContext {
		return this.getTypedRuleContext(BreakStmtContext, 0) as BreakStmtContext;
	}
	public continueStmt(): ContinueStmtContext {
		return this.getTypedRuleContext(ContinueStmtContext, 0) as ContinueStmtContext;
	}
	public gotoStmt(): GotoStmtContext {
		return this.getTypedRuleContext(GotoStmtContext, 0) as GotoStmtContext;
	}
	public fallthroughStmt(): FallthroughStmtContext {
		return this.getTypedRuleContext(FallthroughStmtContext, 0) as FallthroughStmtContext;
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	public ifStmt(): IfStmtContext {
		return this.getTypedRuleContext(IfStmtContext, 0) as IfStmtContext;
	}
	public switchStmt(): SwitchStmtContext {
		return this.getTypedRuleContext(SwitchStmtContext, 0) as SwitchStmtContext;
	}
	public selectStmt(): SelectStmtContext {
		return this.getTypedRuleContext(SelectStmtContext, 0) as SelectStmtContext;
	}
	public forStmt(): ForStmtContext {
		return this.getTypedRuleContext(ForStmtContext, 0) as ForStmtContext;
	}
	public deferStmt(): DeferStmtContext {
		return this.getTypedRuleContext(DeferStmtContext, 0) as DeferStmtContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_statement;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpleStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public sendStmt(): SendStmtContext {
		return this.getTypedRuleContext(SendStmtContext, 0) as SendStmtContext;
	}
	public incDecStmt(): IncDecStmtContext {
		return this.getTypedRuleContext(IncDecStmtContext, 0) as IncDecStmtContext;
	}
	public assignment(): AssignmentContext {
		return this.getTypedRuleContext(AssignmentContext, 0) as AssignmentContext;
	}
	public expressionStmt(): ExpressionStmtContext {
		return this.getTypedRuleContext(ExpressionStmtContext, 0) as ExpressionStmtContext;
	}
	public shortVarDecl(): ShortVarDeclContext {
		return this.getTypedRuleContext(ShortVarDeclContext, 0) as ShortVarDeclContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_simpleStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSimpleStmt) {
			return visitor.visitSimpleStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_expressionStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitExpressionStmt) {
			return visitor.visitExpressionStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SendStmtContext extends ParserRuleContext {
	public _channel!: ExpressionContext;
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RECEIVE(): TerminalNode {
		return this.getToken(GoParser.RECEIVE, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_sendStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSendStmt) {
			return visitor.visitSendStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IncDecStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public PLUS_PLUS(): TerminalNode {
		return this.getToken(GoParser.PLUS_PLUS, 0);
	}
	public MINUS_MINUS(): TerminalNode {
		return this.getToken(GoParser.MINUS_MINUS, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_incDecStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitIncDecStmt) {
			return visitor.visitIncDecStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expressionList_list(): ExpressionListContext[] {
		return this.getTypedRuleContexts(ExpressionListContext) as ExpressionListContext[];
	}
	public expressionList(i: number): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, i) as ExpressionListContext;
	}
	public assign_op(): Assign_opContext {
		return this.getTypedRuleContext(Assign_opContext, 0) as Assign_opContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_assignment;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitAssignment) {
			return visitor.visitAssignment(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Assign_opContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(GoParser.ASSIGN, 0);
	}
	public PLUS(): TerminalNode {
		return this.getToken(GoParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(GoParser.MINUS, 0);
	}
	public OR(): TerminalNode {
		return this.getToken(GoParser.OR, 0);
	}
	public CARET(): TerminalNode {
		return this.getToken(GoParser.CARET, 0);
	}
	public STAR(): TerminalNode {
		return this.getToken(GoParser.STAR, 0);
	}
	public DIV(): TerminalNode {
		return this.getToken(GoParser.DIV, 0);
	}
	public MOD(): TerminalNode {
		return this.getToken(GoParser.MOD, 0);
	}
	public LSHIFT(): TerminalNode {
		return this.getToken(GoParser.LSHIFT, 0);
	}
	public RSHIFT(): TerminalNode {
		return this.getToken(GoParser.RSHIFT, 0);
	}
	public AMPERSAND(): TerminalNode {
		return this.getToken(GoParser.AMPERSAND, 0);
	}
	public BIT_CLEAR(): TerminalNode {
		return this.getToken(GoParser.BIT_CLEAR, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_assign_op;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitAssign_op) {
			return visitor.visitAssign_op(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ShortVarDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public DECLARE_ASSIGN(): TerminalNode {
		return this.getToken(GoParser.DECLARE_ASSIGN, 0);
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_shortVarDecl;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitShortVarDecl) {
			return visitor.visitShortVarDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LabeledStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(GoParser.COLON, 0);
	}
	public statement(): StatementContext {
		return this.getTypedRuleContext(StatementContext, 0) as StatementContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_labeledStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitLabeledStmt) {
			return visitor.visitLabeledStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RETURN(): TerminalNode {
		return this.getToken(GoParser.RETURN, 0);
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_returnStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitReturnStmt) {
			return visitor.visitReturnStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BreakStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public BREAK(): TerminalNode {
		return this.getToken(GoParser.BREAK, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_breakStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitBreakStmt) {
			return visitor.visitBreakStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContinueStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CONTINUE(): TerminalNode {
		return this.getToken(GoParser.CONTINUE, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_continueStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitContinueStmt) {
			return visitor.visitContinueStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GotoStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public GOTO(): TerminalNode {
		return this.getToken(GoParser.GOTO, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_gotoStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitGotoStmt) {
			return visitor.visitGotoStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FallthroughStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FALLTHROUGH(): TerminalNode {
		return this.getToken(GoParser.FALLTHROUGH, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_fallthroughStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitFallthroughStmt) {
			return visitor.visitFallthroughStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeferStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DEFER(): TerminalNode {
		return this.getToken(GoParser.DEFER, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_deferStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitDeferStmt) {
			return visitor.visitDeferStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IF(): TerminalNode {
		return this.getToken(GoParser.IF, 0);
	}
	public block_list(): BlockContext[] {
		return this.getTypedRuleContexts(BlockContext) as BlockContext[];
	}
	public block(i: number): BlockContext {
		return this.getTypedRuleContext(BlockContext, i) as BlockContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public eos(): EosContext {
		return this.getTypedRuleContext(EosContext, 0) as EosContext;
	}
	public simpleStmt(): SimpleStmtContext {
		return this.getTypedRuleContext(SimpleStmtContext, 0) as SimpleStmtContext;
	}
	public ELSE(): TerminalNode {
		return this.getToken(GoParser.ELSE, 0);
	}
	public ifStmt(): IfStmtContext {
		return this.getTypedRuleContext(IfStmtContext, 0) as IfStmtContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_ifStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitIfStmt) {
			return visitor.visitIfStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SwitchStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public exprSwitchStmt(): ExprSwitchStmtContext {
		return this.getTypedRuleContext(ExprSwitchStmtContext, 0) as ExprSwitchStmtContext;
	}
	public typeSwitchStmt(): TypeSwitchStmtContext {
		return this.getTypedRuleContext(TypeSwitchStmtContext, 0) as TypeSwitchStmtContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_switchStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSwitchStmt) {
			return visitor.visitSwitchStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprSwitchStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SWITCH(): TerminalNode {
		return this.getToken(GoParser.SWITCH, 0);
	}
	public L_CURLY(): TerminalNode {
		return this.getToken(GoParser.L_CURLY, 0);
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(GoParser.R_CURLY, 0);
	}
	public eos(): EosContext {
		return this.getTypedRuleContext(EosContext, 0) as EosContext;
	}
	public exprCaseClause_list(): ExprCaseClauseContext[] {
		return this.getTypedRuleContexts(ExprCaseClauseContext) as ExprCaseClauseContext[];
	}
	public exprCaseClause(i: number): ExprCaseClauseContext {
		return this.getTypedRuleContext(ExprCaseClauseContext, i) as ExprCaseClauseContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public simpleStmt(): SimpleStmtContext {
		return this.getTypedRuleContext(SimpleStmtContext, 0) as SimpleStmtContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_exprSwitchStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitExprSwitchStmt) {
			return visitor.visitExprSwitchStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprCaseClauseContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public exprSwitchCase(): ExprSwitchCaseContext {
		return this.getTypedRuleContext(ExprSwitchCaseContext, 0) as ExprSwitchCaseContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(GoParser.COLON, 0);
	}
	public statementList(): StatementListContext {
		return this.getTypedRuleContext(StatementListContext, 0) as StatementListContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_exprCaseClause;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitExprCaseClause) {
			return visitor.visitExprCaseClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprSwitchCaseContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CASE(): TerminalNode {
		return this.getToken(GoParser.CASE, 0);
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
	public DEFAULT(): TerminalNode {
		return this.getToken(GoParser.DEFAULT, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_exprSwitchCase;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitExprSwitchCase) {
			return visitor.visitExprSwitchCase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeSwitchStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SWITCH(): TerminalNode {
		return this.getToken(GoParser.SWITCH, 0);
	}
	public L_CURLY(): TerminalNode {
		return this.getToken(GoParser.L_CURLY, 0);
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(GoParser.R_CURLY, 0);
	}
	public typeSwitchGuard(): TypeSwitchGuardContext {
		return this.getTypedRuleContext(TypeSwitchGuardContext, 0) as TypeSwitchGuardContext;
	}
	public eos(): EosContext {
		return this.getTypedRuleContext(EosContext, 0) as EosContext;
	}
	public simpleStmt(): SimpleStmtContext {
		return this.getTypedRuleContext(SimpleStmtContext, 0) as SimpleStmtContext;
	}
	public typeCaseClause_list(): TypeCaseClauseContext[] {
		return this.getTypedRuleContexts(TypeCaseClauseContext) as TypeCaseClauseContext[];
	}
	public typeCaseClause(i: number): TypeCaseClauseContext {
		return this.getTypedRuleContext(TypeCaseClauseContext, i) as TypeCaseClauseContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeSwitchStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeSwitchStmt) {
			return visitor.visitTypeSwitchStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeSwitchGuardContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primaryExpr(): PrimaryExprContext {
		return this.getTypedRuleContext(PrimaryExprContext, 0) as PrimaryExprContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(GoParser.DOT, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public TYPE(): TerminalNode {
		return this.getToken(GoParser.TYPE, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
	public DECLARE_ASSIGN(): TerminalNode {
		return this.getToken(GoParser.DECLARE_ASSIGN, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeSwitchGuard;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeSwitchGuard) {
			return visitor.visitTypeSwitchGuard(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeCaseClauseContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeSwitchCase(): TypeSwitchCaseContext {
		return this.getTypedRuleContext(TypeSwitchCaseContext, 0) as TypeSwitchCaseContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(GoParser.COLON, 0);
	}
	public statementList(): StatementListContext {
		return this.getTypedRuleContext(StatementListContext, 0) as StatementListContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeCaseClause;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeCaseClause) {
			return visitor.visitTypeCaseClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeSwitchCaseContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CASE(): TerminalNode {
		return this.getToken(GoParser.CASE, 0);
	}
	public typeList(): TypeListContext {
		return this.getTypedRuleContext(TypeListContext, 0) as TypeListContext;
	}
	public DEFAULT(): TerminalNode {
		return this.getToken(GoParser.DEFAULT, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeSwitchCase;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeSwitchCase) {
			return visitor.visitTypeSwitchCase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeListContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type__list(): Type_Context[] {
		return this.getTypedRuleContexts(Type_Context) as Type_Context[];
	}
	public type_(i: number): Type_Context {
		return this.getTypedRuleContext(Type_Context, i) as Type_Context;
	}
	public NIL_LIT_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.NIL_LIT);
	}
	public NIL_LIT(i: number): TerminalNode {
		return this.getToken(GoParser.NIL_LIT, i);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeList;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeList) {
			return visitor.visitTypeList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SELECT(): TerminalNode {
		return this.getToken(GoParser.SELECT, 0);
	}
	public L_CURLY(): TerminalNode {
		return this.getToken(GoParser.L_CURLY, 0);
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(GoParser.R_CURLY, 0);
	}
	public commClause_list(): CommClauseContext[] {
		return this.getTypedRuleContexts(CommClauseContext) as CommClauseContext[];
	}
	public commClause(i: number): CommClauseContext {
		return this.getTypedRuleContext(CommClauseContext, i) as CommClauseContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_selectStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSelectStmt) {
			return visitor.visitSelectStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CommClauseContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public commCase(): CommCaseContext {
		return this.getTypedRuleContext(CommCaseContext, 0) as CommCaseContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(GoParser.COLON, 0);
	}
	public statementList(): StatementListContext {
		return this.getTypedRuleContext(StatementListContext, 0) as StatementListContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_commClause;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitCommClause) {
			return visitor.visitCommClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CommCaseContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CASE(): TerminalNode {
		return this.getToken(GoParser.CASE, 0);
	}
	public sendStmt(): SendStmtContext {
		return this.getTypedRuleContext(SendStmtContext, 0) as SendStmtContext;
	}
	public recvStmt(): RecvStmtContext {
		return this.getTypedRuleContext(RecvStmtContext, 0) as RecvStmtContext;
	}
	public DEFAULT(): TerminalNode {
		return this.getToken(GoParser.DEFAULT, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_commCase;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitCommCase) {
			return visitor.visitCommCase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RecvStmtContext extends ParserRuleContext {
	public _recvExpr!: ExpressionContext;
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(GoParser.ASSIGN, 0);
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public DECLARE_ASSIGN(): TerminalNode {
		return this.getToken(GoParser.DECLARE_ASSIGN, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_recvStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitRecvStmt) {
			return visitor.visitRecvStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FOR(): TerminalNode {
		return this.getToken(GoParser.FOR, 0);
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	public forClause(): ForClauseContext {
		return this.getTypedRuleContext(ForClauseContext, 0) as ForClauseContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public rangeClause(): RangeClauseContext {
		return this.getTypedRuleContext(RangeClauseContext, 0) as RangeClauseContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_forStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitForStmt) {
			return visitor.visitForStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForClauseContext extends ParserRuleContext {
	public _initStmt!: SimpleStmtContext;
	public _postStmt!: SimpleStmtContext;
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public simpleStmt_list(): SimpleStmtContext[] {
		return this.getTypedRuleContexts(SimpleStmtContext) as SimpleStmtContext[];
	}
	public simpleStmt(i: number): SimpleStmtContext {
		return this.getTypedRuleContext(SimpleStmtContext, i) as SimpleStmtContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_forClause;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitForClause) {
			return visitor.visitForClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RangeClauseContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RANGE(): TerminalNode {
		return this.getToken(GoParser.RANGE, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(GoParser.ASSIGN, 0);
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public DECLARE_ASSIGN(): TerminalNode {
		return this.getToken(GoParser.DECLARE_ASSIGN, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_rangeClause;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitRangeClause) {
			return visitor.visitRangeClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GoStmtContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public GO(): TerminalNode {
		return this.getToken(GoParser.GO, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_goStmt;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitGoStmt) {
			return visitor.visitGoStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Type_Context extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public typeArgs(): TypeArgsContext {
		return this.getTypedRuleContext(TypeArgsContext, 0) as TypeArgsContext;
	}
	public typeLit(): TypeLitContext {
		return this.getTypedRuleContext(TypeLitContext, 0) as TypeLitContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_type_;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitType_) {
			return visitor.visitType_(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeArgsContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(GoParser.L_BRACKET, 0);
	}
	public typeList(): TypeListContext {
		return this.getTypedRuleContext(TypeListContext, 0) as TypeListContext;
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(GoParser.R_BRACKET, 0);
	}
	public COMMA(): TerminalNode {
		return this.getToken(GoParser.COMMA, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeArgs;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeArgs) {
			return visitor.visitTypeArgs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeNameContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdent(): QualifiedIdentContext {
		return this.getTypedRuleContext(QualifiedIdentContext, 0) as QualifiedIdentContext;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeName;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeName) {
			return visitor.visitTypeName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeLitContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public arrayType(): ArrayTypeContext {
		return this.getTypedRuleContext(ArrayTypeContext, 0) as ArrayTypeContext;
	}
	public structType(): StructTypeContext {
		return this.getTypedRuleContext(StructTypeContext, 0) as StructTypeContext;
	}
	public pointerType(): PointerTypeContext {
		return this.getTypedRuleContext(PointerTypeContext, 0) as PointerTypeContext;
	}
	public functionType(): FunctionTypeContext {
		return this.getTypedRuleContext(FunctionTypeContext, 0) as FunctionTypeContext;
	}
	public interfaceType(): InterfaceTypeContext {
		return this.getTypedRuleContext(InterfaceTypeContext, 0) as InterfaceTypeContext;
	}
	public sliceType(): SliceTypeContext {
		return this.getTypedRuleContext(SliceTypeContext, 0) as SliceTypeContext;
	}
	public mapType(): MapTypeContext {
		return this.getTypedRuleContext(MapTypeContext, 0) as MapTypeContext;
	}
	public channelType(): ChannelTypeContext {
		return this.getTypedRuleContext(ChannelTypeContext, 0) as ChannelTypeContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeLit;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeLit) {
			return visitor.visitTypeLit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayTypeContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(GoParser.L_BRACKET, 0);
	}
	public arrayLength(): ArrayLengthContext {
		return this.getTypedRuleContext(ArrayLengthContext, 0) as ArrayLengthContext;
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(GoParser.R_BRACKET, 0);
	}
	public elementType(): ElementTypeContext {
		return this.getTypedRuleContext(ElementTypeContext, 0) as ElementTypeContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_arrayType;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitArrayType) {
			return visitor.visitArrayType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayLengthContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_arrayLength;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitArrayLength) {
			return visitor.visitArrayLength(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementTypeContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_elementType;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitElementType) {
			return visitor.visitElementType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PointerTypeContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STAR(): TerminalNode {
		return this.getToken(GoParser.STAR, 0);
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_pointerType;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitPointerType) {
			return visitor.visitPointerType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceTypeContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTERFACE(): TerminalNode {
		return this.getToken(GoParser.INTERFACE, 0);
	}
	public L_CURLY(): TerminalNode {
		return this.getToken(GoParser.L_CURLY, 0);
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(GoParser.R_CURLY, 0);
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
	public methodSpec_list(): MethodSpecContext[] {
		return this.getTypedRuleContexts(MethodSpecContext) as MethodSpecContext[];
	}
	public methodSpec(i: number): MethodSpecContext {
		return this.getTypedRuleContext(MethodSpecContext, i) as MethodSpecContext;
	}
	public typeElement_list(): TypeElementContext[] {
		return this.getTypedRuleContexts(TypeElementContext) as TypeElementContext[];
	}
	public typeElement(i: number): TypeElementContext {
		return this.getTypedRuleContext(TypeElementContext, i) as TypeElementContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_interfaceType;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitInterfaceType) {
			return visitor.visitInterfaceType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SliceTypeContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(GoParser.L_BRACKET, 0);
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(GoParser.R_BRACKET, 0);
	}
	public elementType(): ElementTypeContext {
		return this.getTypedRuleContext(ElementTypeContext, 0) as ElementTypeContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_sliceType;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSliceType) {
			return visitor.visitSliceType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MapTypeContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MAP(): TerminalNode {
		return this.getToken(GoParser.MAP, 0);
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(GoParser.L_BRACKET, 0);
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(GoParser.R_BRACKET, 0);
	}
	public elementType(): ElementTypeContext {
		return this.getTypedRuleContext(ElementTypeContext, 0) as ElementTypeContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_mapType;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitMapType) {
			return visitor.visitMapType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ChannelTypeContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public elementType(): ElementTypeContext {
		return this.getTypedRuleContext(ElementTypeContext, 0) as ElementTypeContext;
	}
	public CHAN(): TerminalNode {
		return this.getToken(GoParser.CHAN, 0);
	}
	public RECEIVE(): TerminalNode {
		return this.getToken(GoParser.RECEIVE, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_channelType;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitChannelType) {
			return visitor.visitChannelType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodSpecContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
	public parameters(): ParametersContext {
		return this.getTypedRuleContext(ParametersContext, 0) as ParametersContext;
	}
	public result(): ResultContext {
		return this.getTypedRuleContext(ResultContext, 0) as ResultContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_methodSpec;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitMethodSpec) {
			return visitor.visitMethodSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionTypeContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FUNC(): TerminalNode {
		return this.getToken(GoParser.FUNC, 0);
	}
	public signature(): SignatureContext {
		return this.getTypedRuleContext(SignatureContext, 0) as SignatureContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_functionType;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitFunctionType) {
			return visitor.visitFunctionType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SignatureContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parameters(): ParametersContext {
		return this.getTypedRuleContext(ParametersContext, 0) as ParametersContext;
	}
	public result(): ResultContext {
		return this.getTypedRuleContext(ResultContext, 0) as ResultContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_signature;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSignature) {
			return visitor.visitSignature(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResultContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parameters(): ParametersContext {
		return this.getTypedRuleContext(ParametersContext, 0) as ParametersContext;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_result;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitResult) {
			return visitor.visitResult(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParametersContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
	public parameterDecl_list(): ParameterDeclContext[] {
		return this.getTypedRuleContexts(ParameterDeclContext) as ParameterDeclContext[];
	}
	public parameterDecl(i: number): ParameterDeclContext {
		return this.getTypedRuleContext(ParameterDeclContext, i) as ParameterDeclContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_parameters;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitParameters) {
			return visitor.visitParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterDeclContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public ELLIPSIS(): TerminalNode {
		return this.getToken(GoParser.ELLIPSIS, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_parameterDecl;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitParameterDecl) {
			return visitor.visitParameterDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public _unary_op!: Token;
	public _mul_op!: Token;
	public _add_op!: Token;
	public _rel_op!: Token;
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primaryExpr(): PrimaryExprContext {
		return this.getTypedRuleContext(PrimaryExprContext, 0) as PrimaryExprContext;
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public PLUS(): TerminalNode {
		return this.getToken(GoParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(GoParser.MINUS, 0);
	}
	public EXCLAMATION(): TerminalNode {
		return this.getToken(GoParser.EXCLAMATION, 0);
	}
	public CARET(): TerminalNode {
		return this.getToken(GoParser.CARET, 0);
	}
	public STAR(): TerminalNode {
		return this.getToken(GoParser.STAR, 0);
	}
	public AMPERSAND(): TerminalNode {
		return this.getToken(GoParser.AMPERSAND, 0);
	}
	public RECEIVE(): TerminalNode {
		return this.getToken(GoParser.RECEIVE, 0);
	}
	public DIV(): TerminalNode {
		return this.getToken(GoParser.DIV, 0);
	}
	public MOD(): TerminalNode {
		return this.getToken(GoParser.MOD, 0);
	}
	public LSHIFT(): TerminalNode {
		return this.getToken(GoParser.LSHIFT, 0);
	}
	public RSHIFT(): TerminalNode {
		return this.getToken(GoParser.RSHIFT, 0);
	}
	public BIT_CLEAR(): TerminalNode {
		return this.getToken(GoParser.BIT_CLEAR, 0);
	}
	public OR(): TerminalNode {
		return this.getToken(GoParser.OR, 0);
	}
	public EQUALS(): TerminalNode {
		return this.getToken(GoParser.EQUALS, 0);
	}
	public NOT_EQUALS(): TerminalNode {
		return this.getToken(GoParser.NOT_EQUALS, 0);
	}
	public LESS(): TerminalNode {
		return this.getToken(GoParser.LESS, 0);
	}
	public LESS_OR_EQUALS(): TerminalNode {
		return this.getToken(GoParser.LESS_OR_EQUALS, 0);
	}
	public GREATER(): TerminalNode {
		return this.getToken(GoParser.GREATER, 0);
	}
	public GREATER_OR_EQUALS(): TerminalNode {
		return this.getToken(GoParser.GREATER_OR_EQUALS, 0);
	}
	public LOGICAL_AND(): TerminalNode {
		return this.getToken(GoParser.LOGICAL_AND, 0);
	}
	public LOGICAL_OR(): TerminalNode {
		return this.getToken(GoParser.LOGICAL_OR, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_expression;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryExprContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public operand(): OperandContext {
		return this.getTypedRuleContext(OperandContext, 0) as OperandContext;
	}
	public conversion(): ConversionContext {
		return this.getTypedRuleContext(ConversionContext, 0) as ConversionContext;
	}
	public methodExpr(): MethodExprContext {
		return this.getTypedRuleContext(MethodExprContext, 0) as MethodExprContext;
	}
	public primaryExpr(): PrimaryExprContext {
		return this.getTypedRuleContext(PrimaryExprContext, 0) as PrimaryExprContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(GoParser.DOT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
	public index(): IndexContext {
		return this.getTypedRuleContext(IndexContext, 0) as IndexContext;
	}
	public slice_(): Slice_Context {
		return this.getTypedRuleContext(Slice_Context, 0) as Slice_Context;
	}
	public typeAssertion(): TypeAssertionContext {
		return this.getTypedRuleContext(TypeAssertionContext, 0) as TypeAssertionContext;
	}
	public arguments(): ArgumentsContext {
		return this.getTypedRuleContext(ArgumentsContext, 0) as ArgumentsContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_primaryExpr;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitPrimaryExpr) {
			return visitor.visitPrimaryExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConversionContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
	public COMMA(): TerminalNode {
		return this.getToken(GoParser.COMMA, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_conversion;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitConversion) {
			return visitor.visitConversion(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperandContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public literal(): LiteralContext {
		return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
	}
	public operandName(): OperandNameContext {
		return this.getTypedRuleContext(OperandNameContext, 0) as OperandNameContext;
	}
	public typeArgs(): TypeArgsContext {
		return this.getTypedRuleContext(TypeArgsContext, 0) as TypeArgsContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_operand;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitOperand) {
			return visitor.visitOperand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public basicLit(): BasicLitContext {
		return this.getTypedRuleContext(BasicLitContext, 0) as BasicLitContext;
	}
	public compositeLit(): CompositeLitContext {
		return this.getTypedRuleContext(CompositeLitContext, 0) as CompositeLitContext;
	}
	public functionLit(): FunctionLitContext {
		return this.getTypedRuleContext(FunctionLitContext, 0) as FunctionLitContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_literal;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BasicLitContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NIL_LIT(): TerminalNode {
		return this.getToken(GoParser.NIL_LIT, 0);
	}
	public integer(): IntegerContext {
		return this.getTypedRuleContext(IntegerContext, 0) as IntegerContext;
	}
	public string_(): String_Context {
		return this.getTypedRuleContext(String_Context, 0) as String_Context;
	}
	public FLOAT_LIT(): TerminalNode {
		return this.getToken(GoParser.FLOAT_LIT, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_basicLit;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitBasicLit) {
			return visitor.visitBasicLit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntegerContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DECIMAL_LIT(): TerminalNode {
		return this.getToken(GoParser.DECIMAL_LIT, 0);
	}
	public BINARY_LIT(): TerminalNode {
		return this.getToken(GoParser.BINARY_LIT, 0);
	}
	public OCTAL_LIT(): TerminalNode {
		return this.getToken(GoParser.OCTAL_LIT, 0);
	}
	public HEX_LIT(): TerminalNode {
		return this.getToken(GoParser.HEX_LIT, 0);
	}
	public IMAGINARY_LIT(): TerminalNode {
		return this.getToken(GoParser.IMAGINARY_LIT, 0);
	}
	public RUNE_LIT(): TerminalNode {
		return this.getToken(GoParser.RUNE_LIT, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_integer;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitInteger) {
			return visitor.visitInteger(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperandNameContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_operandName;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitOperandName) {
			return visitor.visitOperandName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedIdentContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, i);
	}
	public DOT(): TerminalNode {
		return this.getToken(GoParser.DOT, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_qualifiedIdent;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitQualifiedIdent) {
			return visitor.visitQualifiedIdent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CompositeLitContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public literalType(): LiteralTypeContext {
		return this.getTypedRuleContext(LiteralTypeContext, 0) as LiteralTypeContext;
	}
	public literalValue(): LiteralValueContext {
		return this.getTypedRuleContext(LiteralValueContext, 0) as LiteralValueContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_compositeLit;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitCompositeLit) {
			return visitor.visitCompositeLit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralTypeContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public structType(): StructTypeContext {
		return this.getTypedRuleContext(StructTypeContext, 0) as StructTypeContext;
	}
	public arrayType(): ArrayTypeContext {
		return this.getTypedRuleContext(ArrayTypeContext, 0) as ArrayTypeContext;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(GoParser.L_BRACKET, 0);
	}
	public ELLIPSIS(): TerminalNode {
		return this.getToken(GoParser.ELLIPSIS, 0);
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(GoParser.R_BRACKET, 0);
	}
	public elementType(): ElementTypeContext {
		return this.getTypedRuleContext(ElementTypeContext, 0) as ElementTypeContext;
	}
	public sliceType(): SliceTypeContext {
		return this.getTypedRuleContext(SliceTypeContext, 0) as SliceTypeContext;
	}
	public mapType(): MapTypeContext {
		return this.getTypedRuleContext(MapTypeContext, 0) as MapTypeContext;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public typeArgs(): TypeArgsContext {
		return this.getTypedRuleContext(TypeArgsContext, 0) as TypeArgsContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_literalType;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitLiteralType) {
			return visitor.visitLiteralType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralValueContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_CURLY(): TerminalNode {
		return this.getToken(GoParser.L_CURLY, 0);
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(GoParser.R_CURLY, 0);
	}
	public elementList(): ElementListContext {
		return this.getTypedRuleContext(ElementListContext, 0) as ElementListContext;
	}
	public COMMA(): TerminalNode {
		return this.getToken(GoParser.COMMA, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_literalValue;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitLiteralValue) {
			return visitor.visitLiteralValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementListContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public keyedElement_list(): KeyedElementContext[] {
		return this.getTypedRuleContexts(KeyedElementContext) as KeyedElementContext[];
	}
	public keyedElement(i: number): KeyedElementContext {
		return this.getTypedRuleContext(KeyedElementContext, i) as KeyedElementContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_elementList;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitElementList) {
			return visitor.visitElementList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KeyedElementContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public element(): ElementContext {
		return this.getTypedRuleContext(ElementContext, 0) as ElementContext;
	}
	public key(): KeyContext {
		return this.getTypedRuleContext(KeyContext, 0) as KeyContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(GoParser.COLON, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_keyedElement;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitKeyedElement) {
			return visitor.visitKeyedElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KeyContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public literalValue(): LiteralValueContext {
		return this.getTypedRuleContext(LiteralValueContext, 0) as LiteralValueContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_key;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitKey) {
			return visitor.visitKey(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public literalValue(): LiteralValueContext {
		return this.getTypedRuleContext(LiteralValueContext, 0) as LiteralValueContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_element;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitElement) {
			return visitor.visitElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructTypeContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRUCT(): TerminalNode {
		return this.getToken(GoParser.STRUCT, 0);
	}
	public L_CURLY(): TerminalNode {
		return this.getToken(GoParser.L_CURLY, 0);
	}
	public R_CURLY(): TerminalNode {
		return this.getToken(GoParser.R_CURLY, 0);
	}
	public fieldDecl_list(): FieldDeclContext[] {
		return this.getTypedRuleContexts(FieldDeclContext) as FieldDeclContext[];
	}
	public fieldDecl(i: number): FieldDeclContext {
		return this.getTypedRuleContext(FieldDeclContext, i) as FieldDeclContext;
	}
	public eos_list(): EosContext[] {
		return this.getTypedRuleContexts(EosContext) as EosContext[];
	}
	public eos(i: number): EosContext {
		return this.getTypedRuleContext(EosContext, i) as EosContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_structType;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitStructType) {
			return visitor.visitStructType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldDeclContext extends ParserRuleContext {
	public _tag!: String_Context;
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public embeddedField(): EmbeddedFieldContext {
		return this.getTypedRuleContext(EmbeddedFieldContext, 0) as EmbeddedFieldContext;
	}
	public string_(): String_Context {
		return this.getTypedRuleContext(String_Context, 0) as String_Context;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_fieldDecl;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitFieldDecl) {
			return visitor.visitFieldDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class String_Context extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RAW_STRING_LIT(): TerminalNode {
		return this.getToken(GoParser.RAW_STRING_LIT, 0);
	}
	public INTERPRETED_STRING_LIT(): TerminalNode {
		return this.getToken(GoParser.INTERPRETED_STRING_LIT, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_string_;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitString_) {
			return visitor.visitString_(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EmbeddedFieldContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public STAR(): TerminalNode {
		return this.getToken(GoParser.STAR, 0);
	}
	public typeArgs(): TypeArgsContext {
		return this.getTypedRuleContext(TypeArgsContext, 0) as TypeArgsContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_embeddedField;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitEmbeddedField) {
			return visitor.visitEmbeddedField(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionLitContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FUNC(): TerminalNode {
		return this.getToken(GoParser.FUNC, 0);
	}
	public signature(): SignatureContext {
		return this.getTypedRuleContext(SignatureContext, 0) as SignatureContext;
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_functionLit;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitFunctionLit) {
			return visitor.visitFunctionLit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IndexContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(GoParser.L_BRACKET, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(GoParser.R_BRACKET, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_index;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitIndex) {
			return visitor.visitIndex(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Slice_Context extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_BRACKET(): TerminalNode {
		return this.getToken(GoParser.L_BRACKET, 0);
	}
	public R_BRACKET(): TerminalNode {
		return this.getToken(GoParser.R_BRACKET, 0);
	}
	public COLON_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COLON);
	}
	public COLON(i: number): TerminalNode {
		return this.getToken(GoParser.COLON, i);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_slice_;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitSlice_) {
			return visitor.visitSlice_(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeAssertionContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DOT(): TerminalNode {
		return this.getToken(GoParser.DOT, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_typeAssertion;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitTypeAssertion) {
			return visitor.visitTypeAssertion(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentsContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(GoParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(GoParser.R_PAREN, 0);
	}
	public expressionList(): ExpressionListContext {
		return this.getTypedRuleContext(ExpressionListContext, 0) as ExpressionListContext;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public ELLIPSIS(): TerminalNode {
		return this.getToken(GoParser.ELLIPSIS, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(GoParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(GoParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_arguments;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitArguments) {
			return visitor.visitArguments(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodExprContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type_(): Type_Context {
		return this.getTypedRuleContext(Type_Context, 0) as Type_Context;
	}
	public DOT(): TerminalNode {
		return this.getToken(GoParser.DOT, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(GoParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_methodExpr;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitMethodExpr) {
			return visitor.visitMethodExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EosContext extends ParserRuleContext {
	constructor(parser?: GoParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SEMI(): TerminalNode {
		return this.getToken(GoParser.SEMI, 0);
	}
	public EOF(): TerminalNode {
		return this.getToken(GoParser.EOF, 0);
	}
	public EOS(): TerminalNode {
		return this.getToken(GoParser.EOS, 0);
	}
    public get ruleIndex(): number {
    	return GoParser.RULE_eos;
	}
	// @Override
	public accept<Result>(visitor: GoParserVisitor<Result>): Result {
		if (visitor.visitEos) {
			return visitor.visitEos(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
