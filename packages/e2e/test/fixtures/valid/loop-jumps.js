import { cs } from "@backtickjs/core";
// `continue` runs the update before the next turn — a loop that skipped it
// would never end — and each jump means the loop it is written in, the inner
// one here.
export default cs.create(
  [6, 16, 21, 3],
  {
    version: "0.0.0",
    filePath: "loop-jumps.ts",
    fileHash: "owiuoxfingdr",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [6, 19, 21, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [7, 3, 7, 16],
        name: {
          kind: "AstScriptIdentifier",
          loc: [7, 7, 7, 10],
          text: "out",
          bindingKey: "out$owiuoxfingdr$0",
        },
        initializer: {
          kind: "AstScriptStringLiteral",
          loc: [7, 13, 7, 15],
          text: "",
        },
        keyword: "let",
      },
      {
        kind: "AstScriptForStatement",
        loc: [8, 3, 19, 4],
        initializer: {
          kind: "AstScriptVariableDeclaration",
          loc: [8, 8, 8, 17],
          name: {
            kind: "AstScriptIdentifier",
            loc: [8, 12, 8, 13],
            text: "i",
            bindingKey: "i$owiuoxfingdr$1",
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
            bindingKey: "i$owiuoxfingdr$1",
          },
          operatorToken: "<",
          right: {
            kind: "AstScriptNumericLiteral",
            loc: [8, 23, 8, 24],
            value: 5,
          },
        },
        incrementor: {
          kind: "AstScriptBinaryExpression",
          loc: [8, 26, 8, 35],
          left: {
            kind: "AstScriptIdentifier",
            loc: [8, 26, 8, 27],
            text: "i",
            bindingKey: "i$owiuoxfingdr$1",
          },
          operatorToken: "=",
          right: {
            kind: "AstScriptBinaryExpression",
            loc: [8, 30, 8, 35],
            left: {
              kind: "AstScriptIdentifier",
              loc: [8, 30, 8, 31],
              text: "i",
              bindingKey: "i$owiuoxfingdr$1",
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
          loc: [8, 37, 19, 4],
          statements: [
            {
              kind: "AstScriptIfStatement",
              loc: [9, 5, 11, 6],
              expression: {
                kind: "AstScriptBinaryExpression",
                loc: [9, 9, 9, 16],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [9, 9, 9, 10],
                  text: "i",
                  bindingKey: "i$owiuoxfingdr$1",
                },
                operatorToken: "===",
                right: {
                  kind: "AstScriptNumericLiteral",
                  loc: [9, 15, 9, 16],
                  value: 1,
                },
              },
              thenStatement: {
                kind: "AstScriptBlock",
                loc: [9, 18, 11, 6],
                statements: [
                  {
                    kind: "AstScriptContinueStatement",
                    loc: [10, 7, 10, 16],
                  },
                ],
              },
              elseStatement: null,
            },
            {
              kind: "AstScriptWhileStatement",
              loc: [12, 5, 15, 6],
              expression: {
                kind: "AstScriptTrueLiteral",
                loc: [12, 12, 12, 16],
              },
              statement: {
                kind: "AstScriptBlock",
                loc: [12, 18, 15, 6],
                statements: [
                  {
                    kind: "AstScriptBinaryExpression",
                    loc: [13, 7, 13, 20],
                    left: {
                      kind: "AstScriptIdentifier",
                      loc: [13, 7, 13, 10],
                      text: "out",
                      bindingKey: "out$owiuoxfingdr$0",
                    },
                    operatorToken: "=",
                    right: {
                      kind: "AstScriptBinaryExpression",
                      loc: [13, 13, 13, 20],
                      left: {
                        kind: "AstScriptIdentifier",
                        loc: [13, 13, 13, 16],
                        text: "out",
                        bindingKey: "out$owiuoxfingdr$0",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "AstScriptIdentifier",
                        loc: [13, 19, 13, 20],
                        text: "i",
                        bindingKey: "i$owiuoxfingdr$1",
                      },
                    },
                  },
                  {
                    kind: "AstScriptBreakStatement",
                    loc: [14, 7, 14, 13],
                  },
                ],
              },
            },
            {
              kind: "AstScriptIfStatement",
              loc: [16, 5, 18, 6],
              expression: {
                kind: "AstScriptBinaryExpression",
                loc: [16, 9, 16, 16],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [16, 9, 16, 10],
                  text: "i",
                  bindingKey: "i$owiuoxfingdr$1",
                },
                operatorToken: "===",
                right: {
                  kind: "AstScriptNumericLiteral",
                  loc: [16, 15, 16, 16],
                  value: 3,
                },
              },
              thenStatement: {
                kind: "AstScriptBlock",
                loc: [16, 18, 18, 6],
                statements: [
                  {
                    kind: "AstScriptBreakStatement",
                    loc: [17, 7, 17, 13],
                  },
                ],
              },
              elseStatement: null,
            },
          ],
        },
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [20, 3, 20, 14],
        expression: {
          kind: "AstScriptIdentifier",
          loc: [20, 10, 20, 13],
          text: "out",
          bindingKey: "out$owiuoxfingdr$0",
        },
      },
    ],
  }),
);
