import { cs } from "@backtickjs/core";
// `continue` runs the update before the next turn — a loop that skipped it
// would never end — and each jump means the loop it is written in, the inner
// one here.
const loopJumps = cs.create(
  [6, 19, 21, 3],
  {
    version: "0.0.0",
    filePath: "loopJumps.tsx",
    fileHash: "2emfu5s64okgd",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [6, 22, 21, 2],
    statements: [
      {
        kind: "let",
        loc: [7, 3, 7, 16],
        name: {
          kind: "id",
          loc: [7, 7, 7, 10],
          text: "out",
          bindingKey: "out$2emfu5s64okgd$0",
        },
        initializer: {
          kind: "string",
          loc: [7, 13, 7, 15],
          text: "",
        },
      },
      {
        kind: "for",
        loc: [8, 3, 19, 4],
        initializer: {
          kind: "let",
          loc: [8, 8, 8, 17],
          name: {
            kind: "id",
            loc: [8, 12, 8, 13],
            text: "i",
            bindingKey: "i$2emfu5s64okgd$1",
          },
          initializer: {
            kind: "number",
            loc: [8, 16, 8, 17],
            value: 0,
          },
        },
        condition: {
          kind: "binop",
          loc: [8, 19, 8, 24],
          left: {
            kind: "id",
            loc: [8, 19, 8, 20],
            text: "i",
            bindingKey: "i$2emfu5s64okgd$1",
          },
          operatorToken: "<",
          right: {
            kind: "number",
            loc: [8, 23, 8, 24],
            value: 5,
          },
        },
        incrementor: {
          kind: "binop",
          loc: [8, 26, 8, 35],
          left: {
            kind: "id",
            loc: [8, 26, 8, 27],
            text: "i",
            bindingKey: "i$2emfu5s64okgd$1",
          },
          operatorToken: "=",
          right: {
            kind: "binop",
            loc: [8, 30, 8, 35],
            left: {
              kind: "id",
              loc: [8, 30, 8, 31],
              text: "i",
              bindingKey: "i$2emfu5s64okgd$1",
            },
            operatorToken: "+",
            right: {
              kind: "number",
              loc: [8, 34, 8, 35],
              value: 1,
            },
          },
        },
        statement: {
          kind: "{}",
          loc: [8, 37, 19, 4],
          statements: [
            {
              kind: "if",
              loc: [9, 5, 11, 6],
              expression: {
                kind: "binop",
                loc: [9, 9, 9, 16],
                left: {
                  kind: "id",
                  loc: [9, 9, 9, 10],
                  text: "i",
                  bindingKey: "i$2emfu5s64okgd$1",
                },
                operatorToken: "===",
                right: {
                  kind: "number",
                  loc: [9, 15, 9, 16],
                  value: 1,
                },
              },
              thenStatement: {
                kind: "{}",
                loc: [9, 18, 11, 6],
                statements: [
                  {
                    kind: "continue",
                    loc: [10, 7, 10, 16],
                  },
                ],
              },
              elseStatement: null,
            },
            {
              kind: "while",
              loc: [12, 5, 15, 6],
              expression: {
                kind: "true",
                loc: [12, 12, 12, 16],
              },
              statement: {
                kind: "{}",
                loc: [12, 18, 15, 6],
                statements: [
                  {
                    kind: "binop",
                    loc: [13, 7, 13, 20],
                    left: {
                      kind: "id",
                      loc: [13, 7, 13, 10],
                      text: "out",
                      bindingKey: "out$2emfu5s64okgd$0",
                    },
                    operatorToken: "=",
                    right: {
                      kind: "binop",
                      loc: [13, 13, 13, 20],
                      left: {
                        kind: "id",
                        loc: [13, 13, 13, 16],
                        text: "out",
                        bindingKey: "out$2emfu5s64okgd$0",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "id",
                        loc: [13, 19, 13, 20],
                        text: "i",
                        bindingKey: "i$2emfu5s64okgd$1",
                      },
                    },
                  },
                  {
                    kind: "break",
                    loc: [14, 7, 14, 13],
                  },
                ],
              },
            },
            {
              kind: "if",
              loc: [16, 5, 18, 6],
              expression: {
                kind: "binop",
                loc: [16, 9, 16, 16],
                left: {
                  kind: "id",
                  loc: [16, 9, 16, 10],
                  text: "i",
                  bindingKey: "i$2emfu5s64okgd$1",
                },
                operatorToken: "===",
                right: {
                  kind: "number",
                  loc: [16, 15, 16, 16],
                  value: 3,
                },
              },
              thenStatement: {
                kind: "{}",
                loc: [16, 18, 18, 6],
                statements: [
                  {
                    kind: "break",
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
        kind: "return",
        loc: [20, 3, 20, 14],
        expression: {
          kind: "id",
          loc: [20, 10, 20, 13],
          text: "out",
          bindingKey: "out$2emfu5s64okgd$0",
        },
      },
    ],
  }),
);
