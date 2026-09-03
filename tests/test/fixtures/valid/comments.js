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
  },
  () => ({
    kind: "{}",
    loc: [5, 19, 17, 2],
    statements: [
      {
        kind: "const",
        loc: [7, 3, 7, 19],
        name: {
          kind: "id",
          loc: [7, 9, 7, 14],
          text: "count",
          bindingKey: "count$rbes3su3s43l$0",
        },
        initializer: {
          kind: "number",
          loc: [7, 17, 7, 18],
          value: 1,
        },
      },
      {
        kind: "if",
        loc: [9, 3, 12, 4],
        expression: {
          kind: "binop",
          loc: [9, 7, 9, 18],
          left: {
            kind: "id",
            loc: [9, 7, 9, 12],
            text: "count",
            bindingKey: "count$rbes3su3s43l$0",
          },
          operatorToken: "===",
          right: {
            kind: "number",
            loc: [9, 17, 9, 18],
            value: 1,
          },
        },
        thenStatement: {
          kind: "{}",
          loc: [9, 20, 12, 4],
          statements: [
            {
              kind: "return",
              loc: [11, 5, 11, 18],
              expression: {
                kind: "string",
                loc: [11, 12, 11, 17],
                text: "one",
              },
            },
          ],
        },
        elseStatement: null,
      },
      {
        kind: "return",
        loc: [16, 3, 16, 17],
        expression: {
          kind: "string",
          loc: [16, 10, 16, 16],
          text: "many",
        },
      },
    ],
  }),
);
