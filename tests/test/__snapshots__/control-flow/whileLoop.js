import { cs } from "@backtickjs/core";
const whileLoop = cs.create(
  [3, 19, 14, 3],
  {
    version: "0.0.0",
    filePath: "whileLoop.tsx",
    fileHash: "28su337m4iyiy",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [3, 22, 14, 2],
    statements: [
      {
        kind: "let",
        loc: [4, 3, 4, 13],
        name: {
          kind: "id",
          loc: [4, 7, 4, 8],
          text: "i",
          bindingKey: "i$28su337m4iyiy$0",
        },
        initializer: {
          kind: "number",
          loc: [4, 11, 4, 12],
          value: 0,
        },
      },
      {
        kind: "let",
        loc: [5, 3, 5, 17],
        name: {
          kind: "id",
          loc: [5, 7, 5, 12],
          text: "total",
          bindingKey: "total$28su337m4iyiy$1",
        },
        initializer: {
          kind: "number",
          loc: [5, 15, 5, 16],
          value: 0,
        },
      },
      {
        kind: "while",
        loc: [6, 3, 12, 4],
        expression: {
          kind: "binop",
          loc: [6, 10, 6, 15],
          left: {
            kind: "id",
            loc: [6, 10, 6, 11],
            text: "i",
            bindingKey: "i$28su337m4iyiy$0",
          },
          operatorToken: "<",
          right: {
            kind: "number",
            loc: [6, 14, 6, 15],
            value: 5,
          },
        },
        statement: {
          kind: "{}",
          loc: [6, 17, 12, 4],
          statements: [
            {
              kind: "binop",
              loc: [7, 5, 7, 22],
              left: {
                kind: "id",
                loc: [7, 5, 7, 10],
                text: "total",
                bindingKey: "total$28su337m4iyiy$1",
              },
              operatorToken: "=",
              right: {
                kind: "binop",
                loc: [7, 13, 7, 22],
                left: {
                  kind: "id",
                  loc: [7, 13, 7, 18],
                  text: "total",
                  bindingKey: "total$28su337m4iyiy$1",
                },
                operatorToken: "+",
                right: {
                  kind: "id",
                  loc: [7, 21, 7, 22],
                  text: "i",
                  bindingKey: "i$28su337m4iyiy$0",
                },
              },
            },
            {
              kind: "if",
              loc: [8, 5, 10, 6],
              expression: {
                kind: "binop",
                loc: [8, 9, 8, 16],
                left: {
                  kind: "id",
                  loc: [8, 9, 8, 10],
                  text: "i",
                  bindingKey: "i$28su337m4iyiy$0",
                },
                operatorToken: "===",
                right: {
                  kind: "number",
                  loc: [8, 15, 8, 16],
                  value: 3,
                },
              },
              thenStatement: {
                kind: "{}",
                loc: [8, 18, 10, 6],
                statements: [
                  {
                    kind: "return",
                    loc: [9, 7, 9, 20],
                    expression: {
                      kind: "id",
                      loc: [9, 14, 9, 19],
                      text: "total",
                      bindingKey: "total$28su337m4iyiy$1",
                    },
                  },
                ],
              },
              elseStatement: null,
            },
            {
              kind: "binop",
              loc: [11, 5, 11, 14],
              left: {
                kind: "id",
                loc: [11, 5, 11, 6],
                text: "i",
                bindingKey: "i$28su337m4iyiy$0",
              },
              operatorToken: "=",
              right: {
                kind: "binop",
                loc: [11, 9, 11, 14],
                left: {
                  kind: "id",
                  loc: [11, 9, 11, 10],
                  text: "i",
                  bindingKey: "i$28su337m4iyiy$0",
                },
                operatorToken: "+",
                right: {
                  kind: "number",
                  loc: [11, 13, 11, 14],
                  value: 1,
                },
              },
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [13, 3, 13, 16],
        expression: {
          kind: "id",
          loc: [13, 10, 13, 15],
          text: "total",
          bindingKey: "total$28su337m4iyiy$1",
        },
      },
    ],
  }),
);
