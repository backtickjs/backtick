import { cs } from "@backtickjs/core";
// Comments in a client script are trivia: they survive formatting but are
// dropped from the virtual code and the bundle.
export default cs.create(
  [5, 16, 17, 3],
  {
    version: "0.0.0",
    filePath: "comments.ts",
    fileHash: "rbes3su3s43l",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [5, 19, 17, 2],
    statements: [
      {
        kind: 244,
        loc: [7, 3, 7, 19],
        declarationList: {
          kind: 262,
          loc: [7, 3, 7, 18],
          declarations: [
            {
              kind: 261,
              loc: [7, 9, 7, 18],
              name: {
                kind: 80,
                loc: [7, 9, 7, 14],
                text: "count",
                bindingKey: "count$rbes3su3s43l$0",
              },
              initializer: {
                kind: 9,
                loc: [7, 17, 7, 18],
                value: 1,
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 246,
        loc: [9, 3, 12, 4],
        expression: {
          kind: 227,
          loc: [9, 7, 9, 18],
          left: {
            kind: 80,
            loc: [9, 7, 9, 12],
            text: "count",
            bindingKey: "count$rbes3su3s43l$0",
          },
          operatorToken: "===",
          right: {
            kind: 9,
            loc: [9, 17, 9, 18],
            value: 1,
          },
        },
        thenStatement: {
          kind: 242,
          loc: [9, 20, 12, 4],
          statements: [
            {
              kind: 254,
              loc: [11, 5, 11, 18],
              expression: {
                kind: 11,
                loc: [11, 12, 11, 17],
                text: "one",
              },
            },
          ],
        },
        elseStatement: null,
      },
      {
        kind: 254,
        loc: [16, 3, 16, 17],
        expression: {
          kind: 11,
          loc: [16, 10, 16, 16],
          text: "many",
        },
      },
    ],
  }),
);
