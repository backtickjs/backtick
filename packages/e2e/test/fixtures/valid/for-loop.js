import { cs } from "@backtickjs/core";
// `i++` is not an operator in a client script, so the update is an assignment.
export default cs.create(
  [4, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "for-loop.ts",
    fileHash: "zkms5nlgp0g3",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [4, 19, 10, 2],
    statements: [
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
                bindingKey: "total$zkms5nlgp0g3$0",
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
                bindingKey: "i$zkms5nlgp0g3$1",
              },
              initializer: {
                kind: 9,
                loc: [6, 16, 6, 17],
                value: 0,
              },
            },
          ],
          keyword: "let",
        },
        condition: {
          kind: 227,
          loc: [6, 19, 6, 24],
          left: {
            kind: 80,
            loc: [6, 19, 6, 20],
            text: "i",
            bindingKey: "i$zkms5nlgp0g3$1",
          },
          operatorToken: "<",
          right: {
            kind: 9,
            loc: [6, 23, 6, 24],
            value: 5,
          },
        },
        incrementor: {
          kind: 227,
          loc: [6, 26, 6, 35],
          left: {
            kind: 80,
            loc: [6, 26, 6, 27],
            text: "i",
            bindingKey: "i$zkms5nlgp0g3$1",
          },
          operatorToken: "=",
          right: {
            kind: 227,
            loc: [6, 30, 6, 35],
            left: {
              kind: 80,
              loc: [6, 30, 6, 31],
              text: "i",
              bindingKey: "i$zkms5nlgp0g3$1",
            },
            operatorToken: "+",
            right: {
              kind: 9,
              loc: [6, 34, 6, 35],
              value: 1,
            },
          },
        },
        statement: {
          kind: 242,
          loc: [6, 37, 8, 4],
          statements: [
            {
              kind: 227,
              loc: [7, 5, 7, 22],
              left: {
                kind: 80,
                loc: [7, 5, 7, 10],
                text: "total",
                bindingKey: "total$zkms5nlgp0g3$0",
              },
              operatorToken: "=",
              right: {
                kind: 227,
                loc: [7, 13, 7, 22],
                left: {
                  kind: 80,
                  loc: [7, 13, 7, 18],
                  text: "total",
                  bindingKey: "total$zkms5nlgp0g3$0",
                },
                operatorToken: "+",
                right: {
                  kind: 80,
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
        kind: 254,
        loc: [9, 3, 9, 16],
        expression: {
          kind: 80,
          loc: [9, 10, 9, 15],
          text: "total",
          bindingKey: "total$zkms5nlgp0g3$0",
        },
      },
    ],
  }),
);
