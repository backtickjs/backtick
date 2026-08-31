import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "try-catch.ts",
    fileHash: "2osmwga78xnj6",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [3, 19, 13, 2],
    statements: [
      {
        kind: 244,
        loc: [4, 3, 4, 26],
        declarationList: {
          kind: 262,
          loc: [4, 3, 4, 25],
          declarations: [
            {
              kind: 261,
              loc: [4, 9, 4, 25],
              name: {
                kind: 80,
                loc: [4, 9, 4, 16],
                text: "message",
                bindingKey: "message$2osmwga78xnj6$0",
              },
              initializer: {
                kind: 11,
                loc: [4, 19, 4, 25],
                text: "boom",
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 259,
        loc: [5, 3, 12, 4],
        tryBlock: {
          kind: 242,
          loc: [5, 7, 7, 4],
          statements: [
            {
              kind: 258,
              loc: [6, 5, 6, 19],
              expression: {
                kind: 80,
                loc: [6, 11, 6, 18],
                text: "message",
                bindingKey: "message$2osmwga78xnj6$0",
              },
            },
          ],
        },
        catchClause: {
          kind: 300,
          loc: [7, 5, 12, 4],
          variableDeclaration: {
            kind: 80,
            loc: [7, 12, 7, 17],
            text: "error",
            bindingKey: "error$2osmwga78xnj6$1",
          },
          block: {
            kind: 242,
            loc: [7, 19, 12, 4],
            statements: [
              {
                kind: 246,
                loc: [8, 5, 10, 6],
                expression: {
                  kind: 227,
                  loc: [8, 9, 8, 26],
                  left: {
                    kind: 80,
                    loc: [8, 9, 8, 14],
                    text: "error",
                    bindingKey: "error$2osmwga78xnj6$1",
                  },
                  operatorToken: "===",
                  right: {
                    kind: 80,
                    loc: [8, 19, 8, 26],
                    text: "message",
                    bindingKey: "message$2osmwga78xnj6$0",
                  },
                },
                thenStatement: {
                  kind: 242,
                  loc: [8, 28, 10, 6],
                  statements: [
                    {
                      kind: 254,
                      loc: [9, 7, 9, 28],
                      expression: {
                        kind: 11,
                        loc: [9, 14, 9, 27],
                        text: "caught boom",
                      },
                    },
                  ],
                },
                elseStatement: null,
              },
              {
                kind: 254,
                loc: [11, 5, 11, 36],
                expression: {
                  kind: 11,
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
