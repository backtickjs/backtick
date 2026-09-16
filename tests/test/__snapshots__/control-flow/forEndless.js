import { cs } from "@backtickjs/core";
// `for (;;)` has no condition, so `break` is the only way out.
const forEndless = cs.create(
  [4, 20, 13, 3],
  {
    version: "0.0.0",
    filePath: "forEndless.tsx",
    fileHash: "cf915r3udvw7",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [4, 23, 13, 2],
    statements: [
      {
        kind: "let",
        loc: [5, 3, 5, 13],
        name: {
          kind: "id",
          loc: [5, 7, 5, 8],
          text: "i",
          bindingKey: "i$cf915r3udvw7$0",
        },
        initializer: {
          kind: "number",
          loc: [5, 11, 5, 12],
          value: 0,
        },
      },
      {
        kind: "for",
        loc: [6, 3, 11, 4],
        initializer: null,
        condition: null,
        incrementor: null,
        statement: {
          kind: "{}",
          loc: [6, 12, 11, 4],
          statements: [
            {
              kind: "if",
              loc: [7, 5, 9, 6],
              expression: {
                kind: "binop",
                loc: [7, 9, 7, 16],
                left: {
                  kind: "id",
                  loc: [7, 9, 7, 10],
                  text: "i",
                  bindingKey: "i$cf915r3udvw7$0",
                },
                operatorToken: "===",
                right: {
                  kind: "number",
                  loc: [7, 15, 7, 16],
                  value: 4,
                },
              },
              thenStatement: {
                kind: "{}",
                loc: [7, 18, 9, 6],
                statements: [
                  {
                    kind: "break",
                    loc: [8, 7, 8, 13],
                  },
                ],
              },
              elseStatement: null,
            },
            {
              kind: "binop",
              loc: [10, 5, 10, 14],
              left: {
                kind: "id",
                loc: [10, 5, 10, 6],
                text: "i",
                bindingKey: "i$cf915r3udvw7$0",
              },
              operatorToken: "=",
              right: {
                kind: "binop",
                loc: [10, 9, 10, 14],
                left: {
                  kind: "id",
                  loc: [10, 9, 10, 10],
                  text: "i",
                  bindingKey: "i$cf915r3udvw7$0",
                },
                operatorToken: "+",
                right: {
                  kind: "number",
                  loc: [10, 13, 10, 14],
                  value: 1,
                },
              },
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [12, 3, 12, 12],
        expression: {
          kind: "id",
          loc: [12, 10, 12, 11],
          text: "i",
          bindingKey: "i$cf915r3udvw7$0",
        },
      },
    ],
  }),
);
