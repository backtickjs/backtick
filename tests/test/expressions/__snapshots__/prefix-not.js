import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `!` is the one prefix operator, and its operand is boolean like every other
// tested position — there is no truthiness for it to negate.
it("prefixNot", async (t) => {
  await snapshotCase(
    t,
    "prefixNot",
    cs.create(
      { start: { line: 11, column: 4 }, end: { line: 16, column: 6 } },
      {
        version: "0.0.0",
        filePath: "expressions/prefix-not.test.tsx",
        fileHash: "1mtvw9zrodgef",
        splices: {},
        captures: [],
      },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 11, column: 7 }, end: { line: 16, column: 5 } },
        params: [
          {
            type: "Identifier",
            loc: {
              start: { line: 11, column: 8 },
              end: { line: 11, column: 13 },
            },
            name: "ready",
            bindingKey: "ready$1mtvw9zrodgef$0",
          },
          {
            type: "Identifier",
            loc: {
              start: { line: 11, column: 24 },
              end: { line: 11, column: 29 },
            },
            name: "count",
            bindingKey: "count$1mtvw9zrodgef$1",
          },
        ],
        body: {
          type: "BlockStatement",
          loc: {
            start: { line: 11, column: 42 },
            end: { line: 16, column: 5 },
          },
          body: [
            {
              type: "IfStatement",
              loc: {
                start: { line: 12, column: 6 },
                end: { line: 14, column: 7 },
              },
              test: {
                type: "UnaryExpression",
                loc: {
                  start: { line: 12, column: 10 },
                  end: { line: 12, column: 16 },
                },
                operator: "!",
                prefix: true,
                argument: {
                  type: "Identifier",
                  loc: {
                    start: { line: 12, column: 11 },
                    end: { line: 12, column: 16 },
                  },
                  name: "ready",
                  bindingKey: "ready$1mtvw9zrodgef$0",
                },
              },
              consequent: {
                type: "BlockStatement",
                loc: {
                  start: { line: 12, column: 18 },
                  end: { line: 14, column: 7 },
                },
                body: [
                  {
                    type: "ReturnStatement",
                    loc: {
                      start: { line: 13, column: 8 },
                      end: { line: 13, column: 25 },
                    },
                    argument: {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 15 },
                        end: { line: 13, column: 24 },
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
                start: { line: 15, column: 6 },
                end: { line: 15, column: 49 },
              },
              argument: {
                type: "ConditionalExpression",
                loc: {
                  start: { line: 15, column: 13 },
                  end: { line: 15, column: 48 },
                },
                test: {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 15, column: 13 },
                    end: { line: 15, column: 25 },
                  },
                  operator: "!",
                  prefix: true,
                  argument: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 15, column: 15 },
                      end: { line: 15, column: 24 },
                    },
                    operator: ">",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 15 },
                        end: { line: 15, column: 20 },
                      },
                      name: "count",
                      bindingKey: "count$1mtvw9zrodgef$1",
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 15, column: 23 },
                        end: { line: 15, column: 24 },
                      },
                      value: 3,
                    },
                  },
                },
                consequent: {
                  type: "Literal",
                  loc: {
                    start: { line: 15, column: 28 },
                    end: { line: 15, column: 39 },
                  },
                  value: "room left",
                },
                alternate: {
                  type: "Literal",
                  loc: {
                    start: { line: 15, column: 42 },
                    end: { line: 15, column: 48 },
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
