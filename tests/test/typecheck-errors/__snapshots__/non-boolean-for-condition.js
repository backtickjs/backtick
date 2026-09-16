import { cs } from "@backtickjs/core";
// A `for` condition is a boolean like every other condition, header or not.
export default cs.create(
  [4, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/non-boolean-for-condition.test.tsx",
    fileHash: "1jrbfwc2wu5y3",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [4, 19, 11, 2],
    parameters: [
      {
        kind: "param",
        loc: [4, 20, 4, 29],
        name: {
          kind: "id",
          loc: [4, 20, 4, 21],
          text: "n",
          bindingKey: "n$1jrbfwc2wu5y3$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [4, 34, 11, 2],
      statements: [
        {
          kind: "let",
          loc: [5, 3, 5, 16],
          name: {
            kind: "id",
            loc: [5, 7, 5, 11],
            text: "last",
            bindingKey: "last$1jrbfwc2wu5y3$1",
          },
          initializer: {
            kind: "number",
            loc: [5, 14, 5, 15],
            value: 0,
          },
        },
        {
          kind: "for",
          loc: [7, 3, 9, 4],
          initializer: {
            kind: "let",
            loc: [7, 8, 7, 17],
            name: {
              kind: "id",
              loc: [7, 12, 7, 13],
              text: "i",
              bindingKey: "i$1jrbfwc2wu5y3$2",
            },
            initializer: {
              kind: "id",
              loc: [7, 16, 7, 17],
              text: "n",
              bindingKey: "n$1jrbfwc2wu5y3$0",
            },
          },
          condition: {
            kind: "id",
            loc: [7, 19, 7, 20],
            text: "i",
            bindingKey: "i$1jrbfwc2wu5y3$2",
          },
          incrementor: {
            kind: "binop",
            loc: [7, 22, 7, 31],
            left: {
              kind: "id",
              loc: [7, 22, 7, 23],
              text: "i",
              bindingKey: "i$1jrbfwc2wu5y3$2",
            },
            operatorToken: "=",
            right: {
              kind: "binop",
              loc: [7, 26, 7, 31],
              left: {
                kind: "id",
                loc: [7, 26, 7, 27],
                text: "i",
                bindingKey: "i$1jrbfwc2wu5y3$2",
              },
              operatorToken: "-",
              right: {
                kind: "number",
                loc: [7, 30, 7, 31],
                value: 1,
              },
            },
          },
          statement: {
            kind: "{}",
            loc: [7, 33, 9, 4],
            statements: [
              {
                kind: "binop",
                loc: [8, 5, 8, 13],
                left: {
                  kind: "id",
                  loc: [8, 5, 8, 9],
                  text: "last",
                  bindingKey: "last$1jrbfwc2wu5y3$1",
                },
                operatorToken: "=",
                right: {
                  kind: "id",
                  loc: [8, 12, 8, 13],
                  text: "i",
                  bindingKey: "i$1jrbfwc2wu5y3$2",
                },
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [10, 3, 10, 15],
          expression: {
            kind: "id",
            loc: [10, 10, 10, 14],
            text: "last",
            bindingKey: "last$1jrbfwc2wu5y3$1",
          },
        },
      ],
    },
  }),
);
