import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "while-loop.ts",
    fileHash: "2c5ohtv8baju6",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 242,
    loc: [3, 19, 14, 2],
    statements: [
      {
        kind: 244,
        loc: [4, 3, 4, 13],
        declarationList: {
          kind: 262,
          loc: [4, 3, 4, 12],
          declarations: [
            {
              kind: 261,
              loc: [4, 7, 4, 12],
              name: {
                kind: 80,
                loc: [4, 7, 4, 8],
                text: "i",
                bindingKey: "i$2c5ohtv8baju6$0",
              },
              initializer: {
                kind: 9,
                loc: [4, 11, 4, 12],
                value: 0,
              },
            },
          ],
          keyword: "let",
        },
      },
      {
        kind: 244,
        loc: [5, 3, 5, 17],
        declarationList: {
          kind: 262,
          loc: [5, 3, 5, 16],
          declarations: [
            {
              kind: 261,
              loc: [5, 7, 5, 16],
              name: {
                kind: 80,
                loc: [5, 7, 5, 12],
                text: "total",
                bindingKey: "total$2c5ohtv8baju6$1",
              },
              initializer: {
                kind: 9,
                loc: [5, 15, 5, 16],
                value: 0,
              },
            },
          ],
          keyword: "let",
        },
      },
      {
        kind: 248,
        loc: [6, 3, 12, 4],
        expression: {
          kind: 227,
          loc: [6, 10, 6, 15],
          left: {
            kind: 80,
            loc: [6, 10, 6, 11],
            text: "i",
            bindingKey: "i$2c5ohtv8baju6$0",
          },
          operatorToken: "<",
          right: {
            kind: 9,
            loc: [6, 14, 6, 15],
            value: 5,
          },
        },
        statement: {
          kind: 242,
          loc: [6, 17, 12, 4],
          statements: [
            {
              kind: 227,
              loc: [7, 5, 7, 22],
              left: {
                kind: 80,
                loc: [7, 5, 7, 10],
                text: "total",
                bindingKey: "total$2c5ohtv8baju6$1",
              },
              operatorToken: "=",
              right: {
                kind: 227,
                loc: [7, 13, 7, 22],
                left: {
                  kind: 80,
                  loc: [7, 13, 7, 18],
                  text: "total",
                  bindingKey: "total$2c5ohtv8baju6$1",
                },
                operatorToken: "+",
                right: {
                  kind: 80,
                  loc: [7, 21, 7, 22],
                  text: "i",
                  bindingKey: "i$2c5ohtv8baju6$0",
                },
              },
            },
            {
              kind: 246,
              loc: [8, 5, 10, 6],
              expression: {
                kind: 227,
                loc: [8, 9, 8, 16],
                left: {
                  kind: 80,
                  loc: [8, 9, 8, 10],
                  text: "i",
                  bindingKey: "i$2c5ohtv8baju6$0",
                },
                operatorToken: "===",
                right: {
                  kind: 9,
                  loc: [8, 15, 8, 16],
                  value: 3,
                },
              },
              thenStatement: {
                kind: 242,
                loc: [8, 18, 10, 6],
                statements: [
                  {
                    kind: 254,
                    loc: [9, 7, 9, 20],
                    expression: {
                      kind: 80,
                      loc: [9, 14, 9, 19],
                      text: "total",
                      bindingKey: "total$2c5ohtv8baju6$1",
                    },
                  },
                ],
              },
              elseStatement: null,
            },
            {
              kind: 227,
              loc: [11, 5, 11, 14],
              left: {
                kind: 80,
                loc: [11, 5, 11, 6],
                text: "i",
                bindingKey: "i$2c5ohtv8baju6$0",
              },
              operatorToken: "=",
              right: {
                kind: 227,
                loc: [11, 9, 11, 14],
                left: {
                  kind: 80,
                  loc: [11, 9, 11, 10],
                  text: "i",
                  bindingKey: "i$2c5ohtv8baju6$0",
                },
                operatorToken: "+",
                right: {
                  kind: 9,
                  loc: [11, 13, 11, 14],
                  value: 1,
                },
              },
            },
          ],
        },
      },
      {
        kind: 254,
        loc: [13, 3, 13, 16],
        expression: {
          kind: 80,
          loc: [13, 10, 13, 15],
          text: "total",
          bindingKey: "total$2c5ohtv8baju6$1",
        },
      },
    ],
  }),
);
