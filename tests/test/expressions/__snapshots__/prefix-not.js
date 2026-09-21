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
      [11, 5, 16, 7],
      {
        version: "0.0.0",
        filePath: "expressions/prefix-not.test.tsx",
        fileHash: "1mtvw9zrodgef",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [11, 8, 16, 6],
        parameters: [
          {
            kind: "param",
            loc: [11, 9, 11, 23],
            name: {
              kind: "id",
              loc: [11, 9, 11, 14],
              text: "ready",
              bindingKey: "ready$1mtvw9zrodgef$0",
            },
          },
          {
            kind: "param",
            loc: [11, 25, 11, 38],
            name: {
              kind: "id",
              loc: [11, 25, 11, 30],
              text: "count",
              bindingKey: "count$1mtvw9zrodgef$1",
            },
          },
        ],
        body: {
          kind: "{}",
          loc: [11, 43, 16, 6],
          statements: [
            {
              kind: "if",
              loc: [12, 7, 14, 8],
              expression: {
                kind: "prefixop",
                loc: [12, 11, 12, 17],
                operator: "!",
                operand: {
                  kind: "id",
                  loc: [12, 12, 12, 17],
                  text: "ready",
                  bindingKey: "ready$1mtvw9zrodgef$0",
                },
              },
              thenStatement: {
                kind: "{}",
                loc: [12, 19, 14, 8],
                statements: [
                  {
                    kind: "return",
                    loc: [13, 9, 13, 26],
                    expression: {
                      kind: "string",
                      loc: [13, 16, 13, 25],
                      text: "waiting",
                    },
                  },
                ],
              },
              elseStatement: null,
            },
            {
              kind: "return",
              loc: [15, 7, 15, 50],
              expression: {
                kind: "?:",
                loc: [15, 14, 15, 49],
                condition: {
                  kind: "prefixop",
                  loc: [15, 14, 15, 26],
                  operator: "!",
                  operand: {
                    kind: "binop",
                    loc: [15, 16, 15, 25],
                    left: {
                      kind: "id",
                      loc: [15, 16, 15, 21],
                      text: "count",
                      bindingKey: "count$1mtvw9zrodgef$1",
                    },
                    operatorToken: ">",
                    right: {
                      kind: "number",
                      loc: [15, 24, 15, 25],
                      value: 3,
                    },
                  },
                },
                whenTrue: {
                  kind: "string",
                  loc: [15, 29, 15, 40],
                  text: "room left",
                },
                whenFalse: {
                  kind: "string",
                  loc: [15, 43, 15, 49],
                  text: "full",
                },
              },
            },
          ],
        },
      }),
    ),
  );
});
