import { cs } from "@backtickjs/core";
const tryCatch = cs.create(
  [3, 18, 13, 3],
  {
    version: "0.0.0",
    filePath: "tryCatch.tsx",
    fileHash: "25sn3wfwvvawb",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [3, 21, 13, 2],
    statements: [
      {
        kind: "const",
        loc: [4, 3, 4, 26],
        name: {
          kind: "id",
          loc: [4, 9, 4, 16],
          text: "message",
          bindingKey: "message$25sn3wfwvvawb$0",
        },
        initializer: {
          kind: "string",
          loc: [4, 19, 4, 25],
          text: "boom",
        },
      },
      {
        kind: "try",
        loc: [5, 3, 12, 4],
        tryBlock: {
          kind: "{}",
          loc: [5, 7, 7, 4],
          statements: [
            {
              kind: "throw",
              loc: [6, 5, 6, 19],
              expression: {
                kind: "id",
                loc: [6, 11, 6, 18],
                text: "message",
                bindingKey: "message$25sn3wfwvvawb$0",
              },
            },
          ],
        },
        catchClause: {
          kind: "catch",
          loc: [7, 5, 12, 4],
          variableDeclaration: {
            kind: "id",
            loc: [7, 12, 7, 17],
            text: "error",
            bindingKey: "error$25sn3wfwvvawb$1",
          },
          block: {
            kind: "{}",
            loc: [7, 19, 12, 4],
            statements: [
              {
                kind: "if",
                loc: [8, 5, 10, 6],
                expression: {
                  kind: "binop",
                  loc: [8, 9, 8, 26],
                  left: {
                    kind: "id",
                    loc: [8, 9, 8, 14],
                    text: "error",
                    bindingKey: "error$25sn3wfwvvawb$1",
                  },
                  operatorToken: "===",
                  right: {
                    kind: "id",
                    loc: [8, 19, 8, 26],
                    text: "message",
                    bindingKey: "message$25sn3wfwvvawb$0",
                  },
                },
                thenStatement: {
                  kind: "{}",
                  loc: [8, 28, 10, 6],
                  statements: [
                    {
                      kind: "return",
                      loc: [9, 7, 9, 28],
                      expression: {
                        kind: "string",
                        loc: [9, 14, 9, 27],
                        text: "caught boom",
                      },
                    },
                  ],
                },
                elseStatement: null,
              },
              {
                kind: "return",
                loc: [11, 5, 11, 36],
                expression: {
                  kind: "string",
                  loc: [11, 12, 11, 35],
                  text: "caught something else",
                },
              },
            ],
          },
        },
      },
    ],
  }),
);
