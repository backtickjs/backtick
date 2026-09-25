import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `x += y` assigns what `x + y` answers and answers it: a string concatenates
// as `+` does. The variable is read before the value is evaluated, so an
// assignment inside the value doesn't change what it adds to.
it("compoundAssignment", async (t) => {
  await snapshotCase(
    t,
    "compoundAssignment",
    cs.create(
      "23v4b48bi2lxc:12:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 26, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 17 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 10 },
                  end: { line: 13, column: 16 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 10 },
                    end: { line: 13, column: 11 },
                  },
                  name: "n",
                  key: "n$23v4b48bi2lxc$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 13, column: 14 },
                    end: { line: 13, column: 16 },
                  },
                  value: 10,
                },
              },
            ],
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 13 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 14, column: 6 },
                end: { line: 14, column: 12 },
              },
              operator: "+=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 6 },
                  end: { line: 14, column: 7 },
                },
                name: "n",
                key: "n$23v4b48bi2lxc$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 14, column: 11 },
                  end: { line: 14, column: 12 },
                },
                value: 5,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 15, column: 13 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 15, column: 6 },
                end: { line: 15, column: 12 },
              },
              operator: "-=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 6 },
                  end: { line: 15, column: 7 },
                },
                name: "n",
                key: "n$23v4b48bi2lxc$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 15, column: 11 },
                  end: { line: 15, column: 12 },
                },
                value: 3,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 16, column: 6 },
              end: { line: 16, column: 13 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 16, column: 6 },
                end: { line: 16, column: 12 },
              },
              operator: "*=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 16, column: 6 },
                  end: { line: 16, column: 7 },
                },
                name: "n",
                key: "n$23v4b48bi2lxc$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 16, column: 11 },
                  end: { line: 16, column: 12 },
                },
                value: 2,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 13 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 17, column: 6 },
                end: { line: 17, column: 12 },
              },
              operator: "/=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 17, column: 6 },
                  end: { line: 17, column: 7 },
                },
                name: "n",
                key: "n$23v4b48bi2lxc$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 17, column: 11 },
                  end: { line: 17, column: 12 },
                },
                value: 4,
              },
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 13 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 18, column: 12 },
              },
              operator: "%=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 18, column: 6 },
                  end: { line: 18, column: 7 },
                },
                name: "n",
                key: "n$23v4b48bi2lxc$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 18, column: 11 },
                  end: { line: 18, column: 12 },
                },
                value: 4,
              },
            },
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 19, column: 21 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 19, column: 10 },
                  end: { line: 19, column: 20 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 10 },
                    end: { line: 19, column: 14 },
                  },
                  name: "text",
                  key: "text$23v4b48bi2lxc$1",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 19, column: 17 },
                    end: { line: 19, column: 20 },
                  },
                  value: "a",
                },
              },
            ],
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 20, column: 6 },
              end: { line: 20, column: 18 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 20, column: 6 },
                end: { line: 20, column: 17 },
              },
              operator: "+=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 20, column: 6 },
                  end: { line: 20, column: 10 },
                },
                name: "text",
                key: "text$23v4b48bi2lxc$1",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 20, column: 14 },
                  end: { line: 20, column: 17 },
                },
                value: "b",
              },
            },
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 21, column: 6 },
              end: { line: 21, column: 20 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 21, column: 10 },
                  end: { line: 21, column: 19 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 21, column: 10 },
                    end: { line: 21, column: 15 },
                  },
                  name: "total",
                  key: "total$23v4b48bi2lxc$2",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 21, column: 18 },
                    end: { line: 21, column: 19 },
                  },
                  value: 1,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 22, column: 6 },
              end: { line: 22, column: 36 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 22, column: 12 },
                  end: { line: 22, column: 35 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 22, column: 12 },
                    end: { line: 22, column: 20 },
                  },
                  name: "answered",
                  key: "answered$23v4b48bi2lxc$3",
                },
                init: {
                  type: "AssignmentExpression",
                  loc: {
                    start: { line: 22, column: 24 },
                    end: { line: 22, column: 34 },
                  },
                  operator: "+=",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 22, column: 24 },
                      end: { line: 22, column: 29 },
                    },
                    name: "total",
                    key: "total$23v4b48bi2lxc$2",
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 22, column: 33 },
                      end: { line: 22, column: 34 },
                    },
                    value: 2,
                  },
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 23, column: 6 },
              end: { line: 23, column: 16 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 23, column: 10 },
                  end: { line: 23, column: 15 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 23, column: 10 },
                    end: { line: 23, column: 11 },
                  },
                  name: "x",
                  key: "x$23v4b48bi2lxc$4",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 23, column: 14 },
                    end: { line: 23, column: 15 },
                  },
                  value: 1,
                },
              },
            ],
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 24, column: 6 },
              end: { line: 24, column: 17 },
            },
            expression: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 24, column: 6 },
                end: { line: 24, column: 16 },
              },
              operator: "+=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 24, column: 6 },
                  end: { line: 24, column: 7 },
                },
                name: "x",
                key: "x$23v4b48bi2lxc$4",
              },
              right: {
                type: "AssignmentExpression",
                loc: {
                  start: { line: 24, column: 11 },
                  end: { line: 24, column: 16 },
                },
                operator: "=",
                left: {
                  type: "Identifier",
                  loc: {
                    start: { line: 24, column: 11 },
                    end: { line: 24, column: 12 },
                  },
                  name: "x",
                  key: "x$23v4b48bi2lxc$4",
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 24, column: 15 },
                    end: { line: 24, column: 16 },
                  },
                  value: 5,
                },
              },
            },
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 25, column: 6 },
              end: { line: 25, column: 43 },
            },
            argument: {
              type: "ArrayExpression",
              loc: {
                start: { line: 25, column: 13 },
                end: { line: 25, column: 42 },
              },
              elements: [
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 25, column: 14 },
                    end: { line: 25, column: 15 },
                  },
                  name: "n",
                  key: "n$23v4b48bi2lxc$0",
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 25, column: 17 },
                    end: { line: 25, column: 21 },
                  },
                  name: "text",
                  key: "text$23v4b48bi2lxc$1",
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 25, column: 23 },
                    end: { line: 25, column: 31 },
                  },
                  name: "answered",
                  key: "answered$23v4b48bi2lxc$3",
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 25, column: 33 },
                    end: { line: 25, column: 38 },
                  },
                  name: "total",
                  key: "total$23v4b48bi2lxc$2",
                },
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 25, column: 40 },
                    end: { line: 25, column: 41 },
                  },
                  name: "x",
                  key: "x$23v4b48bi2lxc$4",
                },
              ],
            },
          },
        ],
      }),
      'export default () => {\n    let n = 10;\n    n += 5;\n    n -= 3;\n    n *= 2;\n    n /= 4;\n    n %= 4;\n    let text = "a";\n    text += "b";\n    let total = 1;\n    const answered = (total += 2);\n    let x = 1;\n    x += x = 5;\n    return [n, text, answered, total, x];\n};',
      '{"version":3,"file":"compound-assignment.test.jsx","sourceRoot":"","sources":["compound-assignment.test.tsx"],"names":[],"mappings":"eAWO;IACD,IAAI,CAAC,GAAG,EAAE,CAAC;IACX,CAAC,IAAI,CAAC,CAAC;IACP,CAAC,IAAI,CAAC,CAAC;IACP,CAAC,IAAI,CAAC,CAAC;IACP,CAAC,IAAI,CAAC,CAAC;IACP,CAAC,IAAI,CAAC,CAAC;IACP,IAAI,IAAI,GAAG,GAAG,CAAC;IACf,IAAI,IAAI,GAAG,CAAC;IACZ,IAAI,KAAK,GAAG,CAAC,CAAC;IACd,MAAM,QAAQ,GAAG,CAAC,KAAK,IAAI,CAAC,CAAC,CAAC;IAC9B,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,CAAC,IAAI,CAAC,GAAG,CAAC,CAAC;IACX,OAAO,CAAC,CAAC,EAAE,IAAI,EAAE,QAAQ,EAAE,KAAK,EAAE,CAAC,CAAC,CAAC;AACvC,CAAC"}',
    ),
  );
});
