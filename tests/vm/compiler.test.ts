import { describe, expect, test } from '@jest/globals';
import { compile } from '../../src/vm/compiler';
import { SourceFile } from '../../src/parser/ast';
import { Opcode } from '../../src/utils/opcodes';

describe("binary expression", () => {
    const input = (op): SourceFile => ({
    type: "SourceFile",
    declarations: [
      {
        type: "FunctionDecl",
        name: "main",
        signature: {
          type: "Signature",
          parameters: {
            type: "Parameters",
            parameterDecls: [],
          },
          result: undefined,
        },
        body: {
          type: "Block",
          statementList: {
            type: "StatementList",
            statements: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "BinaryExpr",
                  left: {
                    type: "IntegerLiteral",
                    value: 1,
                  },
                  operator: op,
                  right: {
                    type: "IntegerLiteral",
                    value: 2,
                  },
                },
              },
            ],
          },
        },
      },
    ],
  });

    test("addition", () => {
        const instructions = compile(input("+"));
        expect(instructions).toEqual([
            { opcode: Opcode.ENTER_SCOPE, numDeclarations: 0 },
            { opcode: Opcode.LDC, value: 1 },
            { opcode: Opcode.LDC, value: 2 },
            { opcode: Opcode.BINOP, operator: "+" },
            { opcode: Opcode.EXIT_SCOPE },
            { opcode: Opcode.DONE }
        ])
    })
})

describe("constant declaration", () => {
  test("integer", () => {
    const input: SourceFile = {
      type: "SourceFile",
      declarations: [
        {
          type: "ConstDecl",
          specs: [
            {
              type: "ConstSpec",
              identifierList: {
                type: "IdentifierList",
                identifiers: [{
                  type: "Identifier",
                  name: "x",
                }],
              },
              expressionList: {
                type: "ExpressionList",
                expressions: [
                  {
                    type: "IntegerLiteral",
                    value: 1,
                  },
                ],
              },
            },
          ]
        },
      ],
    }
    const instructions = compile(input);
        expect(instructions).toEqual([
            { opcode: "ENTER_SCOPE", numDeclarations: 1 },
            { opcode: Opcode.LDC, value: 1 },
            { opcode: Opcode.ASSIGN, compilePos: [1, 0] },
            { opcode: Opcode.EXIT_SCOPE },
            { opcode: Opcode.DONE },
        ])
  })
})
