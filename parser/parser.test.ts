import { describe, expect, test } from "@jest/globals";
import parse from "./parser";

describe("expression", () => {
  const expected = (op) => ({
    type: "SourceFile",
    declarations: [
      {
        type: "FunctionDecl",
        name: "main",
        signature: {
          parameters: {
            parameterDecls: [],
            type: "Parameters",
          },
          result: undefined,
          type: "Signature",
        },
        body: {
          type: "Block",
          statementList: {
            type: "StatementList",
            statements: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "BinaryOperationExpr",
                  left: {
                    type: "Identifier",
                    name: "1",
                  },
                  operator: op,
                  right: {
                    type: "Identifier",
                    name: "2",
                  },
                },
              },
            ],
          },
        },
      },
    ],
  });

  test("plus", () => {
    const input = `
package main

func main() {
    1+2
}
`;
    expect(parse(input)).toEqual(expected("+"));
  })

  test("minus", () => {
    const input = `
package main

func main() {
    1-2
}
`;
    expect(parse(input)).toEqual(expected("-"));
  })
});
