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
