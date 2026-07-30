import { cs } from "@backtickjs/core";
// Within one script, an arrow assigns an enclosing binding freely — the
// frames live and die together in a single evaluation.
export default cs.create(
  [5, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "captured-counter.ts",
    fileHash: "31t2pc3vo9x5y",
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
        loc: [6, 3, 6, 17],
        name: {
          kind: "AstScriptIdentifier",
          loc: [6, 7, 6, 12],
          text: "count",
          bindingKey: "count$31t2pc3vo9x5y$0",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [6, 15, 6, 16],
          value: 0,
        },
        keyword: "let",
      },
      {
        kind: "AstScriptVariableDeclaration",
        loc: [7, 3, 10, 5],
        name: {
          kind: "AstScriptIdentifier",
          loc: [7, 9, 7, 13],
          text: "bump",
          bindingKey: "bump$31t2pc3vo9x5y$1",
        },
        initializer: {
          kind: "AstScriptArrowFunction",
          loc: [7, 16, 10, 4],
          parameters: [],
          body: {
            kind: "AstScriptBlock",
            loc: [7, 22, 10, 4],
            statements: [
              {
                kind: "AstScriptBinaryExpression",
                loc: [8, 5, 8, 22],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [8, 5, 8, 10],
                  text: "count",
                  bindingKey: "count$31t2pc3vo9x5y$0",
                },
                operatorToken: "=",
                right: {
                  kind: "AstScriptBinaryExpression",
                  loc: [8, 13, 8, 22],
                  left: {
                    kind: "AstScriptIdentifier",
                    loc: [8, 13, 8, 18],
                    text: "count",
                    bindingKey: "count$31t2pc3vo9x5y$0",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "AstScriptNumericLiteral",
                    loc: [8, 21, 8, 22],
                    value: 1,
                  },
                },
              },
              {
                kind: "AstScriptReturnStatement",
                loc: [9, 5, 9, 18],
                expression: {
                  kind: "AstScriptIdentifier",
                  loc: [9, 12, 9, 17],
                  text: "count",
                  bindingKey: "count$31t2pc3vo9x5y$0",
                },
              },
            ],
          },
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [11, 3, 11, 26],
        expression: {
          kind: "AstScriptBinaryExpression",
          loc: [11, 10, 11, 25],
          left: {
            kind: "AstScriptCallExpression",
            loc: [11, 10, 11, 16],
            expression: {
              kind: "AstScriptIdentifier",
              loc: [11, 10, 11, 14],
              text: "bump",
              bindingKey: "bump$31t2pc3vo9x5y$1",
            },
            questionDotToken: false,
            arguments: [],
          },
          operatorToken: "+",
          right: {
            kind: "AstScriptCallExpression",
            loc: [11, 19, 11, 25],
            expression: {
              kind: "AstScriptIdentifier",
              loc: [11, 19, 11, 23],
              text: "bump",
              bindingKey: "bump$31t2pc3vo9x5y$1",
            },
            questionDotToken: false,
            arguments: [],
          },
        },
      },
    ],
  }),
);
