import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A negative literal is written as one, and reaches the wire as one: `-1` is
// a prefix operator on `1` in TypeScript's AST and in this one, and a number
// on the wire, where every literal carries itself.
//
// Negating something computed is the same operator with nothing to fold.
it("negation", async (t) => {
  await snapshotCase(
    t,
    "negation",
    cs.create(
      { start: { line: 14, column: 4 }, end: { line: 18, column: 6 } },
      {
        version: "0.0.0",
        filePath: "expressions/negation.test.tsx",
        fileHash: "31nhc0aoqh9gi",
        splices: {},
        captures: [],
      },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 14, column: 7 }, end: { line: 18, column: 5 } },
        params: [
          {
            type: "Identifier",
            loc: {
              start: { line: 14, column: 8 },
              end: { line: 14, column: 13 },
            },
            name: "count",
            bindingKey: "count$31nhc0aoqh9gi$0",
          },
        ],
        body: {
          type: "BlockStatement",
          loc: {
            start: { line: 14, column: 26 },
            end: { line: 18, column: 5 },
          },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 15, column: 6 },
                end: { line: 15, column: 23 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 15, column: 12 },
                    end: { line: 15, column: 22 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 15, column: 12 },
                      end: { line: 15, column: 17 },
                    },
                    name: "floor",
                    bindingKey: "floor$31nhc0aoqh9gi$1",
                  },
                  init: {
                    type: "UnaryExpression",
                    loc: {
                      start: { line: 15, column: 20 },
                      end: { line: 15, column: 22 },
                    },
                    operator: "-",
                    prefix: true,
                    argument: {
                      type: "Literal",
                      loc: {
                        start: { line: 15, column: 21 },
                        end: { line: 15, column: 22 },
                      },
                      value: 1,
                    },
                  },
                },
              ],
            },
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 16, column: 6 },
                end: { line: 16, column: 26 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 16, column: 12 },
                    end: { line: 16, column: 25 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 16, column: 12 },
                      end: { line: 16, column: 16 },
                    },
                    name: "step",
                    bindingKey: "step$31nhc0aoqh9gi$2",
                  },
                  init: {
                    type: "UnaryExpression",
                    loc: {
                      start: { line: 16, column: 19 },
                      end: { line: 16, column: 25 },
                    },
                    operator: "-",
                    prefix: true,
                    argument: {
                      type: "Identifier",
                      loc: {
                        start: { line: 16, column: 20 },
                        end: { line: 16, column: 25 },
                      },
                      name: "count",
                      bindingKey: "count$31nhc0aoqh9gi$0",
                    },
                  },
                },
              ],
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 17, column: 6 },
                end: { line: 17, column: 31 },
              },
              argument: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 17, column: 13 },
                  end: { line: 17, column: 30 },
                },
                operator: "+",
                left: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 17, column: 13 },
                    end: { line: 17, column: 25 },
                  },
                  operator: "+",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 13 },
                      end: { line: 17, column: 18 },
                    },
                    name: "floor",
                    bindingKey: "floor$31nhc0aoqh9gi$1",
                  },
                  right: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 21 },
                      end: { line: 17, column: 25 },
                    },
                    name: "step",
                    bindingKey: "step$31nhc0aoqh9gi$2",
                  },
                },
                right: {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 17, column: 28 },
                    end: { line: 17, column: 30 },
                  },
                  operator: "-",
                  prefix: true,
                  argument: {
                    type: "Literal",
                    loc: {
                      start: { line: 17, column: 29 },
                      end: { line: 17, column: 30 },
                    },
                    value: 2,
                  },
                },
              },
            },
          ],
        },
        expression: false,
      }),
    ),
  );
});
// `-0` stays a negation on the wire: JSON writes the number `-0` as `0`.
it("negativeZero", async (t) => {
  await snapshotCase(
    t,
    "negativeZero",
    cs.create(
      { start: { line: 24, column: 40 }, end: { line: 26, column: 4 } },
      {
        version: "0.0.0",
        filePath: "expressions/negation.test.tsx",
        fileHash: "31nhc0aoqh9gi",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 24, column: 43 }, end: { line: 26, column: 3 } },
        body: [
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 25, column: 4 },
              end: { line: 25, column: 18 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 25, column: 11 },
                end: { line: 25, column: 17 },
              },
              operator: "/",
              left: {
                type: "Literal",
                loc: {
                  start: { line: 25, column: 11 },
                  end: { line: 25, column: 12 },
                },
                value: 1,
              },
              right: {
                type: "UnaryExpression",
                loc: {
                  start: { line: 25, column: 15 },
                  end: { line: 25, column: 17 },
                },
                operator: "-",
                prefix: true,
                argument: {
                  type: "Literal",
                  loc: {
                    start: { line: 25, column: 16 },
                    end: { line: 25, column: 17 },
                  },
                  value: 0,
                },
              },
            },
          },
        ],
      }),
    ),
  );
});
