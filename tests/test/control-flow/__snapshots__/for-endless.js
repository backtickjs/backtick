import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `for (;;)` has no condition, so `break` is the only way out.
it("forEndless", async (t) => {
  await snapshotCase(
    t,
    "forEndless",
    cs.create(
      [10, 5, 19, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/for-endless.test.tsx",
        fileHash: "3voddrkfnxnd9",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [10, 8, 19, 6],
        statements: [
          {
            kind: "let",
            loc: [11, 7, 11, 17],
            name: {
              kind: "id",
              loc: [11, 11, 11, 12],
              text: "i",
              bindingKey: "i$3voddrkfnxnd9$0",
            },
            initializer: {
              kind: "number",
              loc: [11, 15, 11, 16],
              value: 0,
            },
          },
          {
            kind: "for",
            loc: [12, 7, 17, 8],
            initializer: null,
            condition: null,
            incrementor: null,
            statement: {
              kind: "{}",
              loc: [12, 16, 17, 8],
              statements: [
                {
                  kind: "if",
                  loc: [13, 9, 15, 10],
                  expression: {
                    kind: "binop",
                    loc: [13, 13, 13, 20],
                    left: {
                      kind: "id",
                      loc: [13, 13, 13, 14],
                      text: "i",
                      bindingKey: "i$3voddrkfnxnd9$0",
                    },
                    operatorToken: "===",
                    right: {
                      kind: "number",
                      loc: [13, 19, 13, 20],
                      value: 4,
                    },
                  },
                  thenStatement: {
                    kind: "{}",
                    loc: [13, 22, 15, 10],
                    statements: [
                      {
                        kind: "break",
                        loc: [14, 11, 14, 17],
                      },
                    ],
                  },
                  elseStatement: null,
                },
                {
                  kind: "binop",
                  loc: [16, 9, 16, 18],
                  left: {
                    kind: "id",
                    loc: [16, 9, 16, 10],
                    text: "i",
                    bindingKey: "i$3voddrkfnxnd9$0",
                  },
                  operatorToken: "=",
                  right: {
                    kind: "binop",
                    loc: [16, 13, 16, 18],
                    left: {
                      kind: "id",
                      loc: [16, 13, 16, 14],
                      text: "i",
                      bindingKey: "i$3voddrkfnxnd9$0",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "number",
                      loc: [16, 17, 16, 18],
                      value: 1,
                    },
                  },
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [18, 7, 18, 16],
            expression: {
              kind: "id",
              loc: [18, 14, 18, 15],
              text: "i",
              bindingKey: "i$3voddrkfnxnd9$0",
            },
          },
        ],
      }),
    ),
  );
});
