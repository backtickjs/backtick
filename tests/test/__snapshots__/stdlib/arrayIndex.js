import { cs } from "@backtickjs/core";
// The key is an expression, which is the point: a loop reaches every element
// without one script per position.
const arrayIndex = cs.create(
  [5, 20, 12, 3],
  {
    version: "0.0.0",
    filePath: "arrayIndex.tsx",
    fileHash: "1lavs5jjhhje3",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [5, 23, 12, 2],
    statements: [
      {
        kind: "const",
        loc: [6, 3, 6, 28],
        name: {
          kind: "id",
          loc: [6, 9, 6, 14],
          text: "coins",
          bindingKey: "coins$1lavs5jjhhje3$0",
        },
        initializer: {
          kind: "arr",
          loc: [6, 17, 6, 27],
          elements: [
            {
              kind: "number",
              loc: [6, 18, 6, 19],
              value: 5,
            },
            {
              kind: "number",
              loc: [6, 21, 6, 23],
              value: 31,
            },
            {
              kind: "number",
              loc: [6, 25, 6, 26],
              value: 7,
            },
          ],
        },
      },
      {
        kind: "let",
        loc: [7, 3, 7, 17],
        name: {
          kind: "id",
          loc: [7, 7, 7, 12],
          text: "total",
          bindingKey: "total$1lavs5jjhhje3$1",
        },
        initializer: {
          kind: "number",
          loc: [7, 15, 7, 16],
          value: 0,
        },
      },
      {
        kind: "for",
        loc: [8, 3, 10, 4],
        initializer: {
          kind: "let",
          loc: [8, 8, 8, 17],
          name: {
            kind: "id",
            loc: [8, 12, 8, 13],
            text: "i",
            bindingKey: "i$1lavs5jjhhje3$2",
          },
          initializer: {
            kind: "number",
            loc: [8, 16, 8, 17],
            value: 0,
          },
        },
        condition: {
          kind: "binop",
          loc: [8, 19, 8, 35],
          left: {
            kind: "id",
            loc: [8, 19, 8, 20],
            text: "i",
            bindingKey: "i$1lavs5jjhhje3$2",
          },
          operatorToken: "<",
          right: {
            kind: ".",
            loc: [8, 23, 8, 35],
            expression: {
              kind: "id",
              loc: [8, 23, 8, 28],
              text: "coins",
              bindingKey: "coins$1lavs5jjhhje3$0",
            },
            name: "length",
          },
        },
        incrementor: {
          kind: "binop",
          loc: [8, 37, 8, 46],
          left: {
            kind: "id",
            loc: [8, 37, 8, 38],
            text: "i",
            bindingKey: "i$1lavs5jjhhje3$2",
          },
          operatorToken: "=",
          right: {
            kind: "binop",
            loc: [8, 41, 8, 46],
            left: {
              kind: "id",
              loc: [8, 41, 8, 42],
              text: "i",
              bindingKey: "i$1lavs5jjhhje3$2",
            },
            operatorToken: "+",
            right: {
              kind: "number",
              loc: [8, 45, 8, 46],
              value: 1,
            },
          },
        },
        statement: {
          kind: "{}",
          loc: [8, 48, 10, 4],
          statements: [
            {
              kind: "binop",
              loc: [9, 5, 9, 29],
              left: {
                kind: "id",
                loc: [9, 5, 9, 10],
                text: "total",
                bindingKey: "total$1lavs5jjhhje3$1",
              },
              operatorToken: "=",
              right: {
                kind: "binop",
                loc: [9, 13, 9, 29],
                left: {
                  kind: "id",
                  loc: [9, 13, 9, 18],
                  text: "total",
                  bindingKey: "total$1lavs5jjhhje3$1",
                },
                operatorToken: "+",
                right: {
                  kind: "[]",
                  loc: [9, 21, 9, 29],
                  expression: {
                    kind: "id",
                    loc: [9, 21, 9, 26],
                    text: "coins",
                    bindingKey: "coins$1lavs5jjhhje3$0",
                  },
                  argumentExpression: {
                    kind: "id",
                    loc: [9, 27, 9, 28],
                    text: "i",
                    bindingKey: "i$1lavs5jjhhje3$2",
                  },
                },
              },
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [11, 3, 11, 16],
        expression: {
          kind: "id",
          loc: [11, 10, 11, 15],
          text: "total",
          bindingKey: "total$1lavs5jjhhje3$1",
        },
      },
    ],
  }),
);
