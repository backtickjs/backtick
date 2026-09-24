import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `!` negates its operand.
it("prefixNot", async (t) => {
  await snapshotCase(
    t,
    "prefixNot",
    cs.create(
      { start: { line: 10, column: 4 }, end: { line: 15, column: 6 } },
      {
        version: "0.0.0",
        filePath: "expressions/prefix-not.test.tsx",
        fileHash: "3rwumhu91n08h",
        splices: {},
        captures: [],
      },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 10, column: 7 }, end: { line: 15, column: 5 } },
        params: [
          {
            type: "Identifier",
            loc: {
              start: { line: 10, column: 8 },
              end: { line: 10, column: 13 },
            },
            name: "ready",
            bindingKey: "ready$3rwumhu91n08h$0",
          },
          {
            type: "Identifier",
            loc: {
              start: { line: 10, column: 24 },
              end: { line: 10, column: 29 },
            },
            name: "count",
            bindingKey: "count$3rwumhu91n08h$1",
          },
        ],
        body: {
          type: "BlockStatement",
          loc: {
            start: { line: 10, column: 42 },
            end: { line: 15, column: 5 },
          },
          body: [
            {
              type: "IfStatement",
              loc: {
                start: { line: 11, column: 6 },
                end: { line: 13, column: 7 },
              },
              test: {
                type: "UnaryExpression",
                loc: {
                  start: { line: 11, column: 10 },
                  end: { line: 11, column: 16 },
                },
                operator: "!",
                prefix: true,
                argument: {
                  type: "Identifier",
                  loc: {
                    start: { line: 11, column: 11 },
                    end: { line: 11, column: 16 },
                  },
                  name: "ready",
                  bindingKey: "ready$3rwumhu91n08h$0",
                },
              },
              consequent: {
                type: "BlockStatement",
                loc: {
                  start: { line: 11, column: 18 },
                  end: { line: 13, column: 7 },
                },
                body: [
                  {
                    type: "ReturnStatement",
                    loc: {
                      start: { line: 12, column: 8 },
                      end: { line: 12, column: 25 },
                    },
                    argument: {
                      type: "Literal",
                      loc: {
                        start: { line: 12, column: 15 },
                        end: { line: 12, column: 24 },
                      },
                      value: "waiting",
                    },
                  },
                ],
              },
              alternate: null,
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 14, column: 6 },
                end: { line: 14, column: 49 },
              },
              argument: {
                type: "ConditionalExpression",
                loc: {
                  start: { line: 14, column: 13 },
                  end: { line: 14, column: 48 },
                },
                test: {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 14, column: 13 },
                    end: { line: 14, column: 25 },
                  },
                  operator: "!",
                  prefix: true,
                  argument: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 14, column: 15 },
                      end: { line: 14, column: 24 },
                    },
                    operator: ">",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 14, column: 15 },
                        end: { line: 14, column: 20 },
                      },
                      name: "count",
                      bindingKey: "count$3rwumhu91n08h$1",
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 23 },
                        end: { line: 14, column: 24 },
                      },
                      value: 3,
                    },
                  },
                },
                consequent: {
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 28 },
                    end: { line: 14, column: 39 },
                  },
                  value: "room left",
                },
                alternate: {
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 42 },
                    end: { line: 14, column: 48 },
                  },
                  value: "full",
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
