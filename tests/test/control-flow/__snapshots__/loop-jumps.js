import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `continue` runs the update before the next turn — a loop that skipped it
// would never end — and each jump means the loop it is written in, the inner
// one here.
it("loopJumps", async (t) => {
  await snapshotCase(
    t,
    "loopJumps",
    cs.create(
      [12, 5, 27, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/loop-jumps.test.tsx",
        fileHash: "28bjtc1esuow3",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 27, 6],
        statements: [
          {
            kind: "let",
            loc: [13, 7, 13, 20],
            name: {
              kind: "id",
              loc: [13, 11, 13, 14],
              text: "out",
              bindingKey: "out$28bjtc1esuow3$0",
            },
            initializer: {
              kind: "string",
              loc: [13, 17, 13, 19],
              text: "",
            },
          },
          {
            kind: "for",
            loc: [14, 7, 25, 8],
            initializer: {
              kind: "let",
              loc: [14, 12, 14, 21],
              name: {
                kind: "id",
                loc: [14, 16, 14, 17],
                text: "i",
                bindingKey: "i$28bjtc1esuow3$1",
              },
              initializer: {
                kind: "number",
                loc: [14, 20, 14, 21],
                value: 0,
              },
            },
            condition: {
              kind: "binop",
              loc: [14, 23, 14, 28],
              left: {
                kind: "id",
                loc: [14, 23, 14, 24],
                text: "i",
                bindingKey: "i$28bjtc1esuow3$1",
              },
              operatorToken: "<",
              right: {
                kind: "number",
                loc: [14, 27, 14, 28],
                value: 5,
              },
            },
            incrementor: {
              kind: "binop",
              loc: [14, 30, 14, 39],
              left: {
                kind: "id",
                loc: [14, 30, 14, 31],
                text: "i",
                bindingKey: "i$28bjtc1esuow3$1",
              },
              operatorToken: "=",
              right: {
                kind: "binop",
                loc: [14, 34, 14, 39],
                left: {
                  kind: "id",
                  loc: [14, 34, 14, 35],
                  text: "i",
                  bindingKey: "i$28bjtc1esuow3$1",
                },
                operatorToken: "+",
                right: {
                  kind: "number",
                  loc: [14, 38, 14, 39],
                  value: 1,
                },
              },
            },
            statement: {
              kind: "{}",
              loc: [14, 41, 25, 8],
              statements: [
                {
                  kind: "if",
                  loc: [15, 9, 17, 10],
                  expression: {
                    kind: "binop",
                    loc: [15, 13, 15, 20],
                    left: {
                      kind: "id",
                      loc: [15, 13, 15, 14],
                      text: "i",
                      bindingKey: "i$28bjtc1esuow3$1",
                    },
                    operatorToken: "===",
                    right: {
                      kind: "number",
                      loc: [15, 19, 15, 20],
                      value: 1,
                    },
                  },
                  thenStatement: {
                    kind: "{}",
                    loc: [15, 22, 17, 10],
                    statements: [
                      {
                        kind: "continue",
                        loc: [16, 11, 16, 20],
                      },
                    ],
                  },
                  elseStatement: null,
                },
                {
                  kind: "while",
                  loc: [18, 9, 21, 10],
                  expression: {
                    kind: "true",
                    loc: [18, 16, 18, 20],
                  },
                  statement: {
                    kind: "{}",
                    loc: [18, 22, 21, 10],
                    statements: [
                      {
                        kind: "binop",
                        loc: [19, 11, 19, 24],
                        left: {
                          kind: "id",
                          loc: [19, 11, 19, 14],
                          text: "out",
                          bindingKey: "out$28bjtc1esuow3$0",
                        },
                        operatorToken: "=",
                        right: {
                          kind: "binop",
                          loc: [19, 17, 19, 24],
                          left: {
                            kind: "id",
                            loc: [19, 17, 19, 20],
                            text: "out",
                            bindingKey: "out$28bjtc1esuow3$0",
                          },
                          operatorToken: "+",
                          right: {
                            kind: "id",
                            loc: [19, 23, 19, 24],
                            text: "i",
                            bindingKey: "i$28bjtc1esuow3$1",
                          },
                        },
                      },
                      {
                        kind: "break",
                        loc: [20, 11, 20, 17],
                      },
                    ],
                  },
                },
                {
                  kind: "if",
                  loc: [22, 9, 24, 10],
                  expression: {
                    kind: "binop",
                    loc: [22, 13, 22, 20],
                    left: {
                      kind: "id",
                      loc: [22, 13, 22, 14],
                      text: "i",
                      bindingKey: "i$28bjtc1esuow3$1",
                    },
                    operatorToken: "===",
                    right: {
                      kind: "number",
                      loc: [22, 19, 22, 20],
                      value: 3,
                    },
                  },
                  thenStatement: {
                    kind: "{}",
                    loc: [22, 22, 24, 10],
                    statements: [
                      {
                        kind: "break",
                        loc: [23, 11, 23, 17],
                      },
                    ],
                  },
                  elseStatement: null,
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [26, 7, 26, 18],
            expression: {
              kind: "id",
              loc: [26, 14, 26, 17],
              text: "out",
              bindingKey: "out$28bjtc1esuow3$0",
            },
          },
        ],
      }),
    ),
  );
});
