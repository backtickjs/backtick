import { cs } from "@backtickjs/core";
// A bare `return` exits an action early; the completion is null either way.
export default cs.create(
  [4, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "early-return.ts",
    fileHash: "3slc08eszz0br",
    kind: "action",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [4, 19, 10, 2],
    statements: [
      {
        kind: 261,
        loc: [5, 3, 5, 13],
        name: {
          kind: 80,
          loc: [5, 7, 5, 8],
          text: "n",
          bindingKey: "n$3slc08eszz0br$0",
        },
        initializer: {
          kind: 9,
          loc: [5, 11, 5, 12],
          value: 0,
        },
        keyword: "let",
      },
      {
        kind: 246,
        loc: [6, 3, 8, 4],
        expression: {
          kind: 227,
          loc: [6, 7, 6, 14],
          left: {
            kind: 80,
            loc: [6, 7, 6, 8],
            text: "n",
            bindingKey: "n$3slc08eszz0br$0",
          },
          operatorToken: "===",
          right: {
            kind: 9,
            loc: [6, 13, 6, 14],
            value: 0,
          },
        },
        thenStatement: {
          kind: 242,
          loc: [6, 16, 8, 4],
          statements: [
            {
              kind: 254,
              loc: [7, 5, 7, 12],
              expression: {
                kind: 106,
                loc: [7, 5, 7, 12],
              },
            },
          ],
        },
        elseStatement: null,
      },
      {
        kind: 227,
        loc: [9, 3, 9, 8],
        left: {
          kind: 80,
          loc: [9, 3, 9, 4],
          text: "n",
          bindingKey: "n$3slc08eszz0br$0",
        },
        operatorToken: "=",
        right: {
          kind: 9,
          loc: [9, 7, 9, 8],
          value: 1,
        },
      },
    ],
  }),
);
