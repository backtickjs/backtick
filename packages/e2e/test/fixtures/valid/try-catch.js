import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "try-catch.ts",
    fileHash: "2osmwga78xnj6",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [3, 19, 13, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [4, 3, 4, 26],
        name: {
          kind: "AstScriptIdentifier",
          loc: [4, 9, 4, 16],
          text: "message",
          bindingKey: "message$2osmwga78xnj6$0",
        },
        initializer: {
          kind: "AstScriptStringLiteral",
          loc: [4, 19, 4, 25],
          text: "boom",
        },
        keyword: "const",
      },
      {
        kind: "AstScriptTryStatement",
        loc: [5, 3, 12, 4],
        tryBlock: {
          kind: "AstScriptBlock",
          loc: [5, 7, 7, 4],
          statements: [
            {
              kind: "AstScriptThrowStatement",
              loc: [6, 5, 6, 19],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [6, 11, 6, 18],
                text: "message",
                bindingKey: "message$2osmwga78xnj6$0",
              },
            },
          ],
        },
        catchClause: {
          kind: "AstScriptCatchClause",
          loc: [7, 5, 12, 4],
          variableDeclaration: {
            kind: "AstScriptIdentifier",
            loc: [7, 12, 7, 17],
            text: "error",
            bindingKey: "error$2osmwga78xnj6$1",
          },
          block: {
            kind: "AstScriptBlock",
            loc: [7, 19, 12, 4],
            statements: [
              {
                kind: "AstScriptIfStatement",
                loc: [8, 5, 10, 6],
                expression: {
                  kind: "AstScriptBinaryExpression",
                  loc: [8, 9, 8, 26],
                  left: {
                    kind: "AstScriptIdentifier",
                    loc: [8, 9, 8, 14],
                    text: "error",
                    bindingKey: "error$2osmwga78xnj6$1",
                  },
                  operatorToken: "===",
                  right: {
                    kind: "AstScriptIdentifier",
                    loc: [8, 19, 8, 26],
                    text: "message",
                    bindingKey: "message$2osmwga78xnj6$0",
                  },
                },
                thenStatement: {
                  kind: "AstScriptBlock",
                  loc: [8, 28, 10, 6],
                  statements: [
                    {
                      kind: "AstScriptReturnStatement",
                      loc: [9, 7, 9, 28],
                      expression: {
                        kind: "AstScriptStringLiteral",
                        loc: [9, 14, 9, 27],
                        text: "caught boom",
                      },
                    },
                  ],
                },
                elseStatement: null,
              },
              {
                kind: "AstScriptReturnStatement",
                loc: [11, 5, 11, 36],
                expression: {
                  kind: "AstScriptStringLiteral",
                  loc: [11, 12, 11, 35],
                  text: "caught something else",
                },
              },
            ],
          },
        },
      },
    ],
  }),
);
