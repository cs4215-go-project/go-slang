import { describe, expect, test } from '@jest/globals';
import { compile } from '../../src/vm/compiler';
import { SourceFile } from '../../parser/ast';

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
            { opcode: "LDC", value: 1 },
            { opcode: "LDC", value: 2 },
            { opcode: "BINOP", operator: "+" },
            { opcode: "DONE" },
        ])
    })
})
