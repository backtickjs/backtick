import { cs } from "@backtickjs/core";
// `i++` is not an operator in a client script, so the update is an assignment.
export default cs.create(
  [4, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "for-loop.ts",
    fileHash: "zkms5nlgp0g3",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [4, 19, 10, 2],
    statements: [
      {
        kind: "let",
        loc: [5, 3, 5, 17],
        name: {
          kind: "id",
          loc: [5, 7, 5, 12],
          text: "total",
          bindingKey: "total$zkms5nlgp0g3$0",
        },
        initializer: {
          kind: "number",
          loc: [5, 15, 5, 16],
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
            bindingKey: "i$zkms5nlgp0g3$1",
          },
          initializer: {
            kind: "number",
            loc: [6, 16, 6, 17],
            value: 0,
          },
        },
        condition: {
          kind: "binop",
          loc: [6, 19, 6, 24],
          left: {
            kind: "id",
            loc: [6, 19, 6, 20],
            text: "i",
            bindingKey: "i$zkms5nlgp0g3$1",
          },
          operatorToken: "<",
          right: {
            kind: "number",
            loc: [6, 23, 6, 24],
            value: 5,
          },
        },
        incrementor: {
          kind: "binop",
          loc: [6, 26, 6, 35],
          left: {
            kind: "id",
            loc: [6, 26, 6, 27],
            text: "i",
            bindingKey: "i$zkms5nlgp0g3$1",
          },
          operatorToken: "=",
          right: {
            kind: "binop",
            loc: [6, 30, 6, 35],
            left: {
              kind: "id",
              loc: [6, 30, 6, 31],
              text: "i",
              bindingKey: "i$zkms5nlgp0g3$1",
            },
            operatorToken: "+",
            right: {
              kind: "number",
              loc: [6, 34, 6, 35],
              value: 1,
            },
          },
        },
        statement: {
          kind: "{}",
          loc: [6, 37, 8, 4],
          statements: [
            {
              kind: "binop",
              loc: [7, 5, 7, 22],
              left: {
                kind: "id",
                loc: [7, 5, 7, 10],
                text: "total",
                bindingKey: "total$zkms5nlgp0g3$0",
              },
              operatorToken: "=",
              right: {
                kind: "binop",
                loc: [7, 13, 7, 22],
                left: {
                  kind: "id",
                  loc: [7, 13, 7, 18],
                  text: "total",
                  bindingKey: "total$zkms5nlgp0g3$0",
                },
                operatorToken: "+",
                right: {
                  kind: "id",
                  loc: [7, 21, 7, 22],
                  text: "i",
                  bindingKey: "i$zkms5nlgp0g3$1",
                },
              },
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [9, 3, 9, 16],
        expression: {
          kind: "id",
          loc: [9, 10, 9, 15],
          text: "total",
          bindingKey: "total$zkms5nlgp0g3$0",
        },
      },
    ],
  }),
);
