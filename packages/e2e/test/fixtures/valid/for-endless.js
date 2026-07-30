import { cs } from "@backtickjs/core";
// `for (;;)` has no condition, so `break` is the only way out.
export default cs.create(
  [4, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "for-endless.ts",
    fileHash: "3o3sdrk94c5tr",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [4, 19, 13, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [5, 3, 5, 13],
        name: {
          kind: "AstScriptIdentifier",
          loc: [5, 7, 5, 8],
          text: "i",
          bindingKey: "i$3o3sdrk94c5tr$0",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [5, 11, 5, 12],
          value: 0,
        },
        keyword: "let",
      },
      {
        kind: "AstScriptForStatement",
        loc: [6, 3, 11, 4],
        initializer: null,
        condition: null,
        incrementor: null,
        statement: {
          kind: "AstScriptBlock",
          loc: [6, 12, 11, 4],
          statements: [
            {
              kind: "AstScriptIfStatement",
              loc: [7, 5, 9, 6],
              expression: {
                kind: "AstScriptBinaryExpression",
                loc: [7, 9, 7, 16],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [7, 9, 7, 10],
                  text: "i",
                  bindingKey: "i$3o3sdrk94c5tr$0",
                },
                operatorToken: "===",
                right: {
                  kind: "AstScriptNumericLiteral",
                  loc: [7, 15, 7, 16],
                  value: 4,
                },
              },
              thenStatement: {
                kind: "AstScriptBlock",
                loc: [7, 18, 9, 6],
                statements: [
                  {
                    kind: "AstScriptBreakStatement",
                    loc: [8, 7, 8, 13],
                  },
                ],
              },
              elseStatement: null,
            },
            {
              kind: "AstScriptBinaryExpression",
              loc: [10, 5, 10, 14],
              left: {
                kind: "AstScriptIdentifier",
                loc: [10, 5, 10, 6],
                text: "i",
                bindingKey: "i$3o3sdrk94c5tr$0",
              },
              operatorToken: "=",
              right: {
                kind: "AstScriptBinaryExpression",
                loc: [10, 9, 10, 14],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [10, 9, 10, 10],
                  text: "i",
                  bindingKey: "i$3o3sdrk94c5tr$0",
                },
                operatorToken: "+",
                right: {
                  kind: "AstScriptNumericLiteral",
                  loc: [10, 13, 10, 14],
                  value: 1,
                },
              },
            },
          ],
        },
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [12, 3, 12, 12],
        expression: {
          kind: "AstScriptIdentifier",
          loc: [12, 10, 12, 11],
          text: "i",
          bindingKey: "i$3o3sdrk94c5tr$0",
        },
      },
    ],
  }),
);
