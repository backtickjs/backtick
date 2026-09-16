import { cs } from "@backtickjs/core";
// A bare `return` exits an action early; the completion is null either way.
const earlyReturn = cs.create(
  [4, 21, 10, 3],
  {
    version: "0.0.0",
    filePath: "earlyReturn.tsx",
    fileHash: "203lzmo87c8tz",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [4, 24, 10, 2],
    statements: [
      {
        kind: "let",
        loc: [5, 3, 5, 13],
        name: {
          kind: "id",
          loc: [5, 7, 5, 8],
          text: "n",
          bindingKey: "n$203lzmo87c8tz$0",
        },
        initializer: {
          kind: "number",
          loc: [5, 11, 5, 12],
          value: 0,
        },
      },
      {
        kind: "if",
        loc: [6, 3, 8, 4],
        expression: {
          kind: "binop",
          loc: [6, 7, 6, 14],
          left: {
            kind: "id",
            loc: [6, 7, 6, 8],
            text: "n",
            bindingKey: "n$203lzmo87c8tz$0",
          },
          operatorToken: "===",
          right: {
            kind: "number",
            loc: [6, 13, 6, 14],
            value: 0,
          },
        },
        thenStatement: {
          kind: "{}",
          loc: [6, 16, 8, 4],
          statements: [
            {
              kind: "return",
              loc: [7, 5, 7, 12],
              expression: {
                kind: "undefined",
                loc: [7, 5, 7, 12],
              },
            },
          ],
        },
        elseStatement: null,
      },
      {
        kind: "binop",
        loc: [9, 3, 9, 8],
        left: {
          kind: "id",
          loc: [9, 3, 9, 4],
          text: "n",
          bindingKey: "n$203lzmo87c8tz$0",
        },
        operatorToken: "=",
        right: {
          kind: "number",
          loc: [9, 7, 9, 8],
          value: 1,
        },
      },
    ],
  }),
);
