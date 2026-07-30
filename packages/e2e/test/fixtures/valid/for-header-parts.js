import { cs } from "@backtickjs/core";
// Every part of the header is optional: this one declares nothing and updates
// nothing, leaving both to the block around it and the body.
export default cs.create(
  [5, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "for-header-parts.ts",
    fileHash: "2mxyjvdrslxo1",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [5, 19, 13, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [6, 3, 6, 13],
        name: {
          kind: "AstScriptIdentifier",
          loc: [6, 7, 6, 8],
          text: "i",
          bindingKey: "i$2mxyjvdrslxo1$0",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [6, 11, 6, 12],
          value: 0,
        },
        keyword: "let",
      },
      {
        kind: "AstScriptVariableDeclaration",
        loc: [7, 3, 7, 17],
        name: {
          kind: "AstScriptIdentifier",
          loc: [7, 7, 7, 11],
          text: "seen",
          bindingKey: "seen$2mxyjvdrslxo1$1",
        },
        initializer: {
          kind: "AstScriptStringLiteral",
          loc: [7, 14, 7, 16],
          text: "",
        },
        keyword: "let",
      },
      {
        kind: "AstScriptForStatement",
        loc: [8, 3, 11, 4],
        initializer: null,
        condition: {
          kind: "AstScriptBinaryExpression",
          loc: [8, 10, 8, 15],
          left: {
            kind: "AstScriptIdentifier",
            loc: [8, 10, 8, 11],
            text: "i",
            bindingKey: "i$2mxyjvdrslxo1$0",
          },
          operatorToken: "<",
          right: {
            kind: "AstScriptNumericLiteral",
            loc: [8, 14, 8, 15],
            value: 3,
          },
        },
        incrementor: null,
        statement: {
          kind: "AstScriptBlock",
          loc: [8, 19, 11, 4],
          statements: [
            {
              kind: "AstScriptBinaryExpression",
              loc: [9, 5, 9, 20],
              left: {
                kind: "AstScriptIdentifier",
                loc: [9, 5, 9, 9],
                text: "seen",
                bindingKey: "seen$2mxyjvdrslxo1$1",
              },
              operatorToken: "=",
              right: {
                kind: "AstScriptBinaryExpression",
                loc: [9, 12, 9, 20],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [9, 12, 9, 16],
                  text: "seen",
                  bindingKey: "seen$2mxyjvdrslxo1$1",
                },
                operatorToken: "+",
                right: {
                  kind: "AstScriptIdentifier",
                  loc: [9, 19, 9, 20],
                  text: "i",
                  bindingKey: "i$2mxyjvdrslxo1$0",
                },
              },
            },
            {
              kind: "AstScriptBinaryExpression",
              loc: [10, 5, 10, 14],
              left: {
                kind: "AstScriptIdentifier",
                loc: [10, 5, 10, 6],
                text: "i",
                bindingKey: "i$2mxyjvdrslxo1$0",
              },
              operatorToken: "=",
              right: {
                kind: "AstScriptBinaryExpression",
                loc: [10, 9, 10, 14],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [10, 9, 10, 10],
                  text: "i",
                  bindingKey: "i$2mxyjvdrslxo1$0",
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
        loc: [12, 3, 12, 15],
        expression: {
          kind: "AstScriptIdentifier",
          loc: [12, 10, 12, 14],
          text: "seen",
          bindingKey: "seen$2mxyjvdrslxo1$1",
        },
      },
    ],
  }),
);
