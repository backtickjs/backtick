import { cs } from "@backtickjs/core";
// `continue` runs the update before the next turn — a loop that skipped it
// would never end — and each jump means the loop it is written in, the inner
// one here.
export default cs.create(
  [6, 16, 21, 3],
  {
    version: "0.0.0",
    filePath: "loop-jumps.ts",
    fileHash: "owiuoxfingdr",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [6, 19, 21, 2],
    statements: [
      {
        kind: 244,
        loc: [7, 3, 7, 16],
        declarationList: {
          kind: 262,
          loc: [7, 3, 7, 15],
          declarations: [
            {
              kind: 261,
              loc: [7, 7, 7, 15],
              name: {
                kind: 80,
                loc: [7, 7, 7, 10],
                text: "out",
                bindingKey: "out$owiuoxfingdr$0",
              },
              initializer: {
                kind: 11,
                loc: [7, 13, 7, 15],
                text: "",
              },
            },
          ],
          keyword: "let",
        },
      },
      {
        kind: 249,
        loc: [8, 3, 19, 4],
        initializer: {
          kind: 262,
          loc: [8, 8, 8, 17],
          declarations: [
            {
              kind: 261,
              loc: [8, 12, 8, 17],
              name: {
                kind: 80,
                loc: [8, 12, 8, 13],
                text: "i",
                bindingKey: "i$owiuoxfingdr$1",
              },
              initializer: {
                kind: 9,
                loc: [8, 16, 8, 17],
                value: 0,
              },
            },
          ],
          keyword: "let",
        },
        condition: {
          kind: 227,
          loc: [8, 19, 8, 24],
          left: {
            kind: 80,
            loc: [8, 19, 8, 20],
            text: "i",
            bindingKey: "i$owiuoxfingdr$1",
          },
          operatorToken: "<",
          right: {
            kind: 9,
            loc: [8, 23, 8, 24],
            value: 5,
          },
        },
        incrementor: {
          kind: 227,
          loc: [8, 26, 8, 35],
          left: {
            kind: 80,
            loc: [8, 26, 8, 27],
            text: "i",
            bindingKey: "i$owiuoxfingdr$1",
          },
          operatorToken: "=",
          right: {
            kind: 227,
            loc: [8, 30, 8, 35],
            left: {
              kind: 80,
              loc: [8, 30, 8, 31],
              text: "i",
              bindingKey: "i$owiuoxfingdr$1",
            },
            operatorToken: "+",
            right: {
              kind: 9,
              loc: [8, 34, 8, 35],
              value: 1,
            },
          },
        },
        statement: {
          kind: 242,
          loc: [8, 37, 19, 4],
          statements: [
            {
              kind: 246,
              loc: [9, 5, 11, 6],
              expression: {
                kind: 227,
                loc: [9, 9, 9, 16],
                left: {
                  kind: 80,
                  loc: [9, 9, 9, 10],
                  text: "i",
                  bindingKey: "i$owiuoxfingdr$1",
                },
                operatorToken: "===",
                right: {
                  kind: 9,
                  loc: [9, 15, 9, 16],
                  value: 1,
                },
              },
              thenStatement: {
                kind: 242,
                loc: [9, 18, 11, 6],
                statements: [
                  {
                    kind: 252,
                    loc: [10, 7, 10, 16],
                  },
                ],
              },
              elseStatement: null,
            },
            {
              kind: 248,
              loc: [12, 5, 15, 6],
              expression: {
                kind: 112,
                loc: [12, 12, 12, 16],
              },
              statement: {
                kind: 242,
                loc: [12, 18, 15, 6],
                statements: [
                  {
                    kind: 227,
                    loc: [13, 7, 13, 20],
                    left: {
                      kind: 80,
                      loc: [13, 7, 13, 10],
                      text: "out",
                      bindingKey: "out$owiuoxfingdr$0",
                    },
                    operatorToken: "=",
                    right: {
                      kind: 227,
                      loc: [13, 13, 13, 20],
                      left: {
                        kind: 80,
                        loc: [13, 13, 13, 16],
                        text: "out",
                        bindingKey: "out$owiuoxfingdr$0",
                      },
                      operatorToken: "+",
                      right: {
                        kind: 80,
                        loc: [13, 19, 13, 20],
                        text: "i",
                        bindingKey: "i$owiuoxfingdr$1",
                      },
                    },
                  },
                  {
                    kind: 253,
                    loc: [14, 7, 14, 13],
                  },
                ],
              },
            },
            {
              kind: 246,
              loc: [16, 5, 18, 6],
              expression: {
                kind: 227,
                loc: [16, 9, 16, 16],
                left: {
                  kind: 80,
                  loc: [16, 9, 16, 10],
                  text: "i",
                  bindingKey: "i$owiuoxfingdr$1",
                },
                operatorToken: "===",
                right: {
                  kind: 9,
                  loc: [16, 15, 16, 16],
                  value: 3,
                },
              },
              thenStatement: {
                kind: 242,
                loc: [16, 18, 18, 6],
                statements: [
                  {
                    kind: 253,
                    loc: [17, 7, 17, 13],
                  },
                ],
              },
              elseStatement: null,
            },
          ],
        },
      },
      {
        kind: 254,
        loc: [20, 3, 20, 14],
        expression: {
          kind: 80,
          loc: [20, 10, 20, 13],
          text: "out",
          bindingKey: "out$owiuoxfingdr$0",
        },
      },
    ],
  }),
);
