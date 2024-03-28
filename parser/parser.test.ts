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
  const expected = (op, operand) => ({
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
                    type: "Identifier",
                    name: operand,
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
    expect(parse(input)).toEqual(expected("-", "1"));
  });

  test("negation", () => {
    const input = `
package main

func main() {
    !false
}
`;
    expect(parse(input)).toEqual(expected("!", "false"));
  });

  test("receive", () => {
    const input = `
package main

func main() {
    <-ch
}
`;
    expect(parse(input)).toEqual(expected("<-", "ch"));
  });
});
