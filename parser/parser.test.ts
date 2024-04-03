import { describe, expect, test } from "@jest/globals";
import parse from "./parser";

describe("binary expression", () => {
  const expected = (op) => ({
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

  test("plus", () => {
    const input = `
package main

func main() {
    1+2
}
`;
    expect(parse(input)).toEqual(expected("+"));
  });

  test("minus", () => {
    const input = `
package main

func main() {
    1-2
}
`;
    expect(parse(input)).toEqual(expected("-"));
  });

  test("multiply", () => {
    const input = `
package main

func main() {
    1*2
}
`;
    expect(parse(input)).toEqual(expected("*"));
  });

  test("divide", () => {
    const input = `
package main

func main() {
    1/2
}
`;
    expect(parse(input)).toEqual(expected("/"));
  });
});

describe("unary expression", () => {
  const expected = (op, type, operand) => ({
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
                  type: "UnaryExpr",
                  operator: op,
                  expr: {
                    type: type,
                    value: operand,
                  },
                },
              },
            ],
          },
        },
      },
    ],
  });

  test("minus", () => {
    const input = `
package main

func main() {
    -1
}
`;
    expect(parse(input)).toEqual(expected("-", "IntegerLiteral", 1));
  });

  test("negation", () => {
    const input = `
package main

func main() {
    !false
}
`;
    expect(parse(input)).toEqual(expected("!", "BooleanLiteral", false));
  });

//   test("receive", () => {
//     const input = `
// package main

// func main() {
//     <-ch
// }
// `;
//     expect(parse(input)).toEqual(expected("<-", "ch"));
//   });
});

describe("constant declaration", () => {
  test("one line, no type", () => {
    const input = `
package main

const x = 1
`;
    expect(parse(input)).toEqual({
      type: "SourceFile",
      declarations: [
        {
          type: "ConstDecl",
          specs: [
            {
              type: "ConstSpec",
              identifierList: {
                type: "IdentifierList",
                identifiers: ["x"],
              },
              values: {
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
    });
  })

  test("one line, typed", () => {
    const input = `
package main

const x int = 1
`;
    expect(parse(input)).toEqual({
      type: "SourceFile",
      declarations: [
        {
          type: "ConstDecl",
          specs: [
            {
              type: "ConstSpec",
              dataType: "int",
              identifierList: {
                type: "IdentifierList",
                identifiers: ["x"],
              },
              values: {
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
    });
  })

  test("multi line", () => {
    const input = `
package main

const (
	a, b int = 1, 3
	c, d     = 2, "hello"
)
`;
    expect(parse(input)).toEqual({
      type: "SourceFile",
      declarations: [
        {
          type: "ConstDecl",
          specs: [
            {
              type: "ConstSpec",
              dataType: "int",
              identifierList: {
                type: "IdentifierList",
                identifiers: ["a", "b"],
              },
              values: {
                type: "ExpressionList",
                expressions: [
                  {
                    type: "IntegerLiteral",
                    value: 1,
                  },
                  {
                    type: "IntegerLiteral",
                    value: 3,
                  }
                ],
              },
            },
            {
              type: "ConstSpec",
              dataType: undefined,
              identifierList: {
                type: "IdentifierList",
                identifiers: ["c", "d"],
              },
              values: {
                type: "ExpressionList",
                expressions: [
                  {
                    type: "IntegerLiteral",
                    value: 2,
                  },
                  {
                    type: "StringLiteral",
                    value: "\"hello\"",
                  },
                ],
              },
            },
          ]
        },
      ],
    });
  })
});
