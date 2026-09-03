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
    kind: "=>",
    loc: [4, 19, 10, 2],
    parameters: [
      {
        kind: "param",
        loc: [4, 20, 4, 29],
        name: {
          kind: "id",
          loc: [4, 20, 4, 21],
          text: "n",
          bindingKey: "n$2gfrnuray6h4d$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [4, 34, 10, 2],
      statements: [
        {
          kind: "let",
          loc: [5, 3, 5, 16],
          name: {
            kind: "id",
            loc: [5, 7, 5, 11],
            text: "last",
            bindingKey: "last$2gfrnuray6h4d$1",
          },
          initializer: {
            kind: "number",
            loc: [5, 14, 5, 15],
            value: 0,
          },
        },
        {
          kind: "for",
          loc: [6, 3, 8, 4],
          initializer: {
            kind: "let",
            loc: [6, 8, 6, 17],
            name: {
              kind: "id",
              loc: [6, 12, 6, 13],
              text: "i",
              bindingKey: "i$2gfrnuray6h4d$2",
            },
            initializer: {
              kind: "id",
              loc: [6, 16, 6, 17],
              text: "n",
              bindingKey: "n$2gfrnuray6h4d$0",
            },
          },
          condition: {
            kind: "id",
            loc: [6, 19, 6, 20],
            text: "i",
            bindingKey: "i$2gfrnuray6h4d$2",
          },
          incrementor: {
            kind: "binop",
            loc: [6, 22, 6, 31],
            left: {
              kind: "id",
              loc: [6, 22, 6, 23],
              text: "i",
              bindingKey: "i$2gfrnuray6h4d$2",
            },
            operatorToken: "=",
            right: {
              kind: "binop",
              loc: [6, 26, 6, 31],
              left: {
                kind: "id",
                loc: [6, 26, 6, 27],
                text: "i",
                bindingKey: "i$2gfrnuray6h4d$2",
              },
              operatorToken: "-",
              right: {
                kind: "number",
                loc: [6, 30, 6, 31],
                value: 1,
              },
            },
          },
          statement: {
            kind: "{}",
            loc: [6, 33, 8, 4],
            statements: [
              {
                kind: "binop",
                loc: [7, 5, 7, 13],
                left: {
                  kind: "id",
                  loc: [7, 5, 7, 9],
                  text: "last",
                  bindingKey: "last$2gfrnuray6h4d$1",
                },
                operatorToken: "=",
                right: {
                  kind: "id",
                  loc: [7, 12, 7, 13],
                  text: "i",
                  bindingKey: "i$2gfrnuray6h4d$2",
                },
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [9, 3, 9, 15],
          expression: {
            kind: "id",
            loc: [9, 10, 9, 14],
            text: "last",
            bindingKey: "last$2gfrnuray6h4d$1",
          },
        },
      ],
    },
  }),
);
