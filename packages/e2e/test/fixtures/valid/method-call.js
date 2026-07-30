import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 6, 3],
  {
    version: "0.0.0",
    filePath: "method-call.ts",
    fileHash: "190iczdl07b3h",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [3, 19, 6, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [4, 3, 4, 28],
        name: {
          kind: "AstScriptIdentifier",
          loc: [4, 9, 4, 17],
          text: "greeting",
          bindingKey: "greeting$190iczdl07b3h$0",
        },
        initializer: {
          kind: "AstScriptStringLiteral",
          loc: [4, 20, 4, 27],
          text: "Hello",
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [5, 3, 5, 55],
        expression: {
          kind: "AstScriptCallExpression",
          loc: [5, 10, 5, 54],
          expression: {
            kind: "AstScriptPropertyAccessExpression",
            loc: [5, 10, 5, 52],
            expression: {
              kind: "AstScriptCallExpression",
              loc: [5, 10, 5, 40],
              expression: {
                kind: "AstScriptPropertyAccessExpression",
                loc: [5, 10, 5, 25],
                expression: {
                  kind: "AstScriptIdentifier",
                  loc: [5, 10, 5, 18],
                  text: "greeting",
                  bindingKey: "greeting$190iczdl07b3h$0",
                },
                questionDotToken: false,
                name: "concat",
              },
              questionDotToken: false,
              arguments: [
                {
                  kind: "AstScriptStringLiteral",
                  loc: [5, 26, 5, 30],
                  text: ", ",
                },
                {
                  kind: "AstScriptStringLiteral",
                  loc: [5, 32, 5, 39],
                  text: "World",
                },
              ],
            },
            questionDotToken: false,
            name: "toUpperCase",
          },
          questionDotToken: false,
          arguments: [],
        },
      },
    ],
  }),
);
