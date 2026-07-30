import { cs } from "@backtickjs/core";
// Each turn of a `for` gets its own copy of the header binding, so the arrow
// built on the last turn reads 2 — the value that turn had — and not the 3 the
// loop stopped at.
export default cs.create(
  [6, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "for-per-turn-binding.ts",
    fileHash: "21o8qjv656zb3",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [6, 19, 12, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [7, 3, 7, 22],
        name: {
          kind: "AstScriptIdentifier",
          loc: [7, 7, 7, 11],
          text: "last",
          bindingKey: "last$21o8qjv656zb3$0",
        },
        initializer: {
          kind: "AstScriptArrowFunction",
          loc: [7, 14, 7, 21],
          parameters: [],
          body: {
            kind: "AstScriptNumericLiteral",
            loc: [7, 20, 7, 21],
            value: 0,
          },
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
            bindingKey: "i$21o8qjv656zb3$1",
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
          loc: [8, 19, 8, 24],
          left: {
            kind: "AstScriptIdentifier",
            loc: [8, 19, 8, 20],
            text: "i",
            bindingKey: "i$21o8qjv656zb3$1",
          },
          operatorToken: "<",
          right: {
            kind: "AstScriptNumericLiteral",
            loc: [8, 23, 8, 24],
            value: 3,
          },
        },
        incrementor: {
          kind: "AstScriptBinaryExpression",
          loc: [8, 26, 8, 35],
          left: {
            kind: "AstScriptIdentifier",
            loc: [8, 26, 8, 27],
            text: "i",
            bindingKey: "i$21o8qjv656zb3$1",
          },
          operatorToken: "=",
          right: {
            kind: "AstScriptBinaryExpression",
            loc: [8, 30, 8, 35],
            left: {
              kind: "AstScriptIdentifier",
              loc: [8, 30, 8, 31],
              text: "i",
              bindingKey: "i$21o8qjv656zb3$1",
            },
            operatorToken: "+",
            right: {
              kind: "AstScriptNumericLiteral",
              loc: [8, 34, 8, 35],
              value: 1,
            },
          },
        },
        statement: {
          kind: "AstScriptBlock",
          loc: [8, 37, 10, 4],
          statements: [
            {
              kind: "AstScriptBinaryExpression",
              loc: [9, 5, 9, 19],
              left: {
                kind: "AstScriptIdentifier",
                loc: [9, 5, 9, 9],
                text: "last",
                bindingKey: "last$21o8qjv656zb3$0",
              },
              operatorToken: "=",
              right: {
                kind: "AstScriptArrowFunction",
                loc: [9, 12, 9, 19],
                parameters: [],
                body: {
                  kind: "AstScriptIdentifier",
                  loc: [9, 18, 9, 19],
                  text: "i",
                  bindingKey: "i$21o8qjv656zb3$1",
                },
              },
            },
          ],
        },
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [11, 3, 11, 17],
        expression: {
          kind: "AstScriptCallExpression",
          loc: [11, 10, 11, 16],
          expression: {
            kind: "AstScriptIdentifier",
            loc: [11, 10, 11, 14],
            text: "last",
            bindingKey: "last$21o8qjv656zb3$0",
          },
          questionDotToken: false,
          arguments: [],
        },
      },
    ],
  }),
);
