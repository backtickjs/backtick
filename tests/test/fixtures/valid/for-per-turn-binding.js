import { cs } from "@backtickjs/core";
// Each turn of a `for` gets its own copy of the header binding, so the arrow
// built on the last turn reads 2 — the value that turn had — and not the 3 the
// loop stopped at.
export default cs.create(
  [6, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "for-per-turn-binding.ts",
    fileHash: "1xlxq809wqp5g",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [6, 19, 12, 2],
    statements: [
      {
        kind: 244,
        loc: [7, 3, 7, 36],
        declarationList: {
          kind: 262,
          loc: [7, 3, 7, 35],
          declarations: [
            {
              kind: 261,
              loc: [7, 7, 7, 35],
              name: {
                kind: 80,
                loc: [7, 7, 7, 11],
                text: "last",
                bindingKey: "last$1xlxq809wqp5g$0",
              },
              initializer: {
                kind: 220,
                loc: [7, 28, 7, 35],
                parameters: [],
                body: {
                  kind: 9,
                  loc: [7, 34, 7, 35],
                  value: 0,
                },
              },
            },
          ],
          keyword: "let",
        },
      },
      {
        kind: 249,
        loc: [8, 3, 10, 4],
        initializer: {
          kind: 262,
          loc: [8, 8, 8, 17],
          declarations: [
            {
              kind: 261,
              loc: [8, 12, 8, 17],
              name: {
                kind: 80,
                loc: [8, 12, 8, 13],
                text: "i",
                bindingKey: "i$1xlxq809wqp5g$1",
              },
              initializer: {
                kind: 9,
                loc: [8, 16, 8, 17],
                value: 0,
              },
            },
          ],
          keyword: "let",
        },
        condition: {
          kind: 227,
          loc: [8, 19, 8, 24],
          left: {
            kind: 80,
            loc: [8, 19, 8, 20],
            text: "i",
            bindingKey: "i$1xlxq809wqp5g$1",
          },
          operatorToken: "<",
          right: {
            kind: 9,
            loc: [8, 23, 8, 24],
            value: 3,
          },
        },
        incrementor: {
          kind: 227,
          loc: [8, 26, 8, 35],
          left: {
            kind: 80,
            loc: [8, 26, 8, 27],
            text: "i",
            bindingKey: "i$1xlxq809wqp5g$1",
          },
          operatorToken: "=",
          right: {
            kind: 227,
            loc: [8, 30, 8, 35],
            left: {
              kind: 80,
              loc: [8, 30, 8, 31],
              text: "i",
              bindingKey: "i$1xlxq809wqp5g$1",
            },
            operatorToken: "+",
            right: {
              kind: 9,
              loc: [8, 34, 8, 35],
              value: 1,
            },
          },
        },
        statement: {
          kind: 242,
          loc: [8, 37, 10, 4],
          statements: [
            {
              kind: 227,
              loc: [9, 5, 9, 19],
              left: {
                kind: 80,
                loc: [9, 5, 9, 9],
                text: "last",
                bindingKey: "last$1xlxq809wqp5g$0",
              },
              operatorToken: "=",
              right: {
                kind: 220,
                loc: [9, 12, 9, 19],
                parameters: [],
                body: {
                  kind: 80,
                  loc: [9, 18, 9, 19],
                  text: "i",
                  bindingKey: "i$1xlxq809wqp5g$1",
                },
              },
            },
          ],
        },
      },
      {
        kind: 254,
        loc: [11, 3, 11, 17],
        expression: {
          kind: 214,
          loc: [11, 10, 11, 16],
          expression: {
            kind: 80,
            loc: [11, 10, 11, 14],
            text: "last",
            bindingKey: "last$1xlxq809wqp5g$0",
          },
          questionDotToken: false,
          arguments: [],
        },
      },
    ],
  }),
);
