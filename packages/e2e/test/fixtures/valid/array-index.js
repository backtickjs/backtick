import { cs } from "@backtickjs/core";
// The key is an expression, which is the point: a loop reaches every element
// without one script per position.
export default cs.create(
  [5, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "array-index.ts",
    fileHash: "2287xz8ecscg5",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [5, 19, 12, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [6, 3, 6, 28],
        name: {
          kind: "AstScriptIdentifier",
          loc: [6, 9, 6, 14],
          text: "coins",
          bindingKey: "coins$2287xz8ecscg5$0",
        },
        initializer: {
          kind: "AstScriptArrayLiteralExpression",
          loc: [6, 17, 6, 27],
          elements: [
            {
              kind: "AstScriptNumericLiteral",
              loc: [6, 18, 6, 19],
              value: 5,
            },
            {
              kind: "AstScriptNumericLiteral",
              loc: [6, 21, 6, 23],
              value: 31,
            },
            {
              kind: "AstScriptNumericLiteral",
              loc: [6, 25, 6, 26],
              value: 7,
            },
          ],
        },
        keyword: "const",
      },
      {
        kind: "AstScriptVariableDeclaration",
        loc: [7, 3, 7, 17],
        name: {
          kind: "AstScriptIdentifier",
          loc: [7, 7, 7, 12],
          text: "total",
          bindingKey: "total$2287xz8ecscg5$1",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [7, 15, 7, 16],
          value: 0,
        },
        keyword: "let",
      },
      {
        kind: "AstScriptForStatement",
        loc: [8, 3, 10, 4],
        initializer: {
          kind: "AstScriptVariableDeclaration",
          loc: [8, 8, 8, 17],
          name: {
            kind: "AstScriptIdentifier",
            loc: [8, 12, 8, 13],
            text: "i",
            bindingKey: "i$2287xz8ecscg5$2",
          },
          initializer: {
            kind: "AstScriptNumericLiteral",
            loc: [8, 16, 8, 17],
            value: 0,
          },
          keyword: "let",
        },
        condition: {
          kind: "AstScriptBinaryExpression",
          loc: [8, 19, 8, 35],
          left: {
            kind: "AstScriptIdentifier",
            loc: [8, 19, 8, 20],
            text: "i",
            bindingKey: "i$2287xz8ecscg5$2",
          },
          operatorToken: "<",
          right: {
            kind: "AstScriptPropertyAccessExpression",
            loc: [8, 23, 8, 35],
            expression: {
              kind: "AstScriptIdentifier",
              loc: [8, 23, 8, 28],
              text: "coins",
              bindingKey: "coins$2287xz8ecscg5$0",
            },
            questionDotToken: false,
            name: "length",
          },
        },
        incrementor: {
          kind: "AstScriptBinaryExpression",
          loc: [8, 37, 8, 46],
          left: {
            kind: "AstScriptIdentifier",
            loc: [8, 37, 8, 38],
            text: "i",
            bindingKey: "i$2287xz8ecscg5$2",
          },
          operatorToken: "=",
          right: {
            kind: "AstScriptBinaryExpression",
            loc: [8, 41, 8, 46],
            left: {
              kind: "AstScriptIdentifier",
              loc: [8, 41, 8, 42],
              text: "i",
              bindingKey: "i$2287xz8ecscg5$2",
            },
            operatorToken: "+",
            right: {
              kind: "AstScriptNumericLiteral",
              loc: [8, 45, 8, 46],
              value: 1,
            },
          },
        },
        statement: {
          kind: "AstScriptBlock",
          loc: [8, 48, 10, 4],
          statements: [
            {
              kind: "AstScriptBinaryExpression",
              loc: [9, 5, 9, 29],
              left: {
                kind: "AstScriptIdentifier",
                loc: [9, 5, 9, 10],
                text: "total",
                bindingKey: "total$2287xz8ecscg5$1",
              },
              operatorToken: "=",
              right: {
                kind: "AstScriptBinaryExpression",
                loc: [9, 13, 9, 29],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [9, 13, 9, 18],
                  text: "total",
                  bindingKey: "total$2287xz8ecscg5$1",
                },
                operatorToken: "+",
                right: {
                  kind: "AstScriptElementAccessExpression",
                  loc: [9, 21, 9, 29],
                  expression: {
                    kind: "AstScriptIdentifier",
                    loc: [9, 21, 9, 26],
                    text: "coins",
                    bindingKey: "coins$2287xz8ecscg5$0",
                  },
                  argumentExpression: {
                    kind: "AstScriptIdentifier",
                    loc: [9, 27, 9, 28],
                    text: "i",
                    bindingKey: "i$2287xz8ecscg5$2",
                  },
                },
              },
            },
          ],
        },
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [11, 3, 11, 16],
        expression: {
          kind: "AstScriptIdentifier",
          loc: [11, 10, 11, 15],
          text: "total",
          bindingKey: "total$2287xz8ecscg5$1",
        },
      },
    ],
  }),
);
