import { cs } from "@backtickjs/core";
// `for (;;)` has no condition, so `break` is the only way out.
export default cs.create(
  [4, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "for-endless.ts",
    fileHash: "3o3sdrk94c5tr",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 242,
    loc: [4, 19, 13, 2],
    statements: [
      {
        kind: 244,
        loc: [5, 3, 5, 13],
        declarationList: {
          kind: 262,
          loc: [5, 3, 5, 12],
          declarations: [
            {
              kind: 261,
              loc: [5, 7, 5, 12],
              name: {
                kind: 80,
                loc: [5, 7, 5, 8],
                text: "i",
                bindingKey: "i$3o3sdrk94c5tr$0",
              },
              initializer: {
                kind: 9,
                loc: [5, 11, 5, 12],
                value: 0,
              },
            },
          ],
          keyword: "let",
        },
      },
      {
        kind: 249,
        loc: [6, 3, 11, 4],
        initializer: null,
        condition: null,
        incrementor: null,
        statement: {
          kind: 242,
          loc: [6, 12, 11, 4],
          statements: [
            {
              kind: 246,
              loc: [7, 5, 9, 6],
              expression: {
                kind: 227,
                loc: [7, 9, 7, 16],
                left: {
                  kind: 80,
                  loc: [7, 9, 7, 10],
                  text: "i",
                  bindingKey: "i$3o3sdrk94c5tr$0",
                },
                operatorToken: "===",
                right: {
                  kind: 9,
                  loc: [7, 15, 7, 16],
                  value: 4,
                },
              },
              thenStatement: {
                kind: 242,
                loc: [7, 18, 9, 6],
                statements: [
                  {
                    kind: 253,
                    loc: [8, 7, 8, 13],
                  },
                ],
              },
              elseStatement: null,
            },
            {
              kind: 227,
              loc: [10, 5, 10, 14],
              left: {
                kind: 80,
                loc: [10, 5, 10, 6],
                text: "i",
                bindingKey: "i$3o3sdrk94c5tr$0",
              },
              operatorToken: "=",
              right: {
                kind: 227,
                loc: [10, 9, 10, 14],
                left: {
                  kind: 80,
                  loc: [10, 9, 10, 10],
                  text: "i",
                  bindingKey: "i$3o3sdrk94c5tr$0",
                },
                operatorToken: "+",
                right: {
                  kind: 9,
                  loc: [10, 13, 10, 14],
                  value: 1,
                },
              },
            },
          ],
        },
      },
      {
        kind: 254,
        loc: [12, 3, 12, 12],
        expression: {
          kind: 80,
          loc: [12, 10, 12, 11],
          text: "i",
          bindingKey: "i$3o3sdrk94c5tr$0",
        },
      },
    ],
  }),
);
