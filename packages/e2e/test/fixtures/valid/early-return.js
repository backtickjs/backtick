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
    kind: "AstScriptBlock",
    loc: [4, 19, 10, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [5, 3, 5, 13],
        name: {
          kind: "AstScriptIdentifier",
          loc: [5, 7, 5, 8],
          text: "n",
          bindingKey: "n$3slc08eszz0br$0",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [5, 11, 5, 12],
          value: 0,
        },
        keyword: "let",
      },
      {
        kind: "AstScriptIfStatement",
        loc: [6, 3, 8, 4],
        expression: {
          kind: "AstScriptBinaryExpression",
          loc: [6, 7, 6, 14],
          left: {
            kind: "AstScriptIdentifier",
            loc: [6, 7, 6, 8],
            text: "n",
            bindingKey: "n$3slc08eszz0br$0",
          },
          operatorToken: "===",
          right: {
            kind: "AstScriptNumericLiteral",
            loc: [6, 13, 6, 14],
            value: 0,
          },
        },
        thenStatement: {
          kind: "AstScriptBlock",
          loc: [6, 16, 8, 4],
          statements: [
            {
              kind: "AstScriptReturnStatement",
              loc: [7, 5, 7, 12],
              expression: {
                kind: "AstScriptNullLiteral",
                loc: [7, 5, 7, 12],
              },
            },
          ],
        },
        elseStatement: null,
      },
      {
        kind: "AstScriptBinaryExpression",
        loc: [9, 3, 9, 8],
        left: {
          kind: "AstScriptIdentifier",
          loc: [9, 3, 9, 4],
          text: "n",
          bindingKey: "n$3slc08eszz0br$0",
        },
        operatorToken: "=",
        right: {
          kind: "AstScriptNumericLiteral",
          loc: [9, 7, 9, 8],
          value: 1,
        },
      },
    ],
  }),
);
