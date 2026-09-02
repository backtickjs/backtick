import { cs } from "@backtickjs/core";
// A `for` condition is a boolean like every other condition, header or not.
export default cs.create(
  [4, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "non-boolean-for-condition.ts",
    fileHash: "2gfrnuray6h4d",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 220,
    loc: [4, 19, 10, 2],
    parameters: [
      {
        kind: 170,
        loc: [4, 20, 4, 29],
        name: {
          kind: 80,
          loc: [4, 20, 4, 21],
          text: "n",
          bindingKey: "n$2gfrnuray6h4d$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [4, 34, 10, 2],
      statements: [
        {
          kind: 244,
          loc: [5, 3, 5, 16],
          declarationList: {
            kind: 262,
            loc: [5, 3, 5, 15],
            declarations: [
              {
                kind: 261,
                loc: [5, 7, 5, 15],
                name: {
                  kind: 80,
                  loc: [5, 7, 5, 11],
                  text: "last",
                  bindingKey: "last$2gfrnuray6h4d$1",
                },
                initializer: {
                  kind: 9,
                  loc: [5, 14, 5, 15],
                  value: 0,
                },
              },
            ],
            keyword: "let",
          },
        },
        {
          kind: 249,
          loc: [6, 3, 8, 4],
          initializer: {
            kind: 262,
            loc: [6, 8, 6, 17],
            declarations: [
              {
                kind: 261,
                loc: [6, 12, 6, 17],
                name: {
                  kind: 80,
                  loc: [6, 12, 6, 13],
                  text: "i",
                  bindingKey: "i$2gfrnuray6h4d$2",
                },
                initializer: {
                  kind: 80,
                  loc: [6, 16, 6, 17],
                  text: "n",
                  bindingKey: "n$2gfrnuray6h4d$0",
                },
              },
            ],
            keyword: "let",
          },
          condition: {
            kind: 80,
            loc: [6, 19, 6, 20],
            text: "i",
            bindingKey: "i$2gfrnuray6h4d$2",
          },
          incrementor: {
            kind: 227,
            loc: [6, 22, 6, 31],
            left: {
              kind: 80,
              loc: [6, 22, 6, 23],
              text: "i",
              bindingKey: "i$2gfrnuray6h4d$2",
            },
            operatorToken: "=",
            right: {
              kind: 227,
              loc: [6, 26, 6, 31],
              left: {
                kind: 80,
                loc: [6, 26, 6, 27],
                text: "i",
                bindingKey: "i$2gfrnuray6h4d$2",
              },
              operatorToken: "-",
              right: {
                kind: 9,
                loc: [6, 30, 6, 31],
                value: 1,
              },
            },
          },
          statement: {
            kind: 242,
            loc: [6, 33, 8, 4],
            statements: [
              {
                kind: 227,
                loc: [7, 5, 7, 13],
                left: {
                  kind: 80,
                  loc: [7, 5, 7, 9],
                  text: "last",
                  bindingKey: "last$2gfrnuray6h4d$1",
                },
                operatorToken: "=",
                right: {
                  kind: 80,
                  loc: [7, 12, 7, 13],
                  text: "i",
                  bindingKey: "i$2gfrnuray6h4d$2",
                },
              },
            ],
          },
        },
        {
          kind: 254,
          loc: [9, 3, 9, 15],
          expression: {
            kind: 80,
            loc: [9, 10, 9, 14],
            text: "last",
            bindingKey: "last$2gfrnuray6h4d$1",
          },
        },
      ],
    },
  }),
);
