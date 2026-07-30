import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 6, 3],
  {
    version: "0.0.0",
    filePath: "arrow.ts",
    fileHash: "357jk2g9zktff",
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
        loc: [4, 3, 4, 19],
        name: {
          kind: "AstScriptIdentifier",
          loc: [4, 9, 4, 13],
          text: "base",
          bindingKey: "base$357jk2g9zktff$0",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [4, 16, 4, 18],
          value: 10,
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [5, 3, 5, 57],
        expression: {
          kind: "AstScriptArrowFunction",
          loc: [5, 10, 5, 56],
          parameters: [
            {
              kind: "AstScriptParameterDeclaration",
              loc: [5, 11, 5, 22],
              name: {
                kind: "AstScriptIdentifier",
                loc: [5, 11, 5, 14],
                text: "one",
                bindingKey: "one$357jk2g9zktff$1",
              },
            },
            {
              kind: "AstScriptParameterDeclaration",
              loc: [5, 24, 5, 35],
              name: {
                kind: "AstScriptIdentifier",
                loc: [5, 24, 5, 27],
                text: "two",
                bindingKey: "two$357jk2g9zktff$2",
              },
            },
          ],
          body: {
            kind: "AstScriptBinaryExpression",
            loc: [5, 40, 5, 56],
            left: {
              kind: "AstScriptBinaryExpression",
              loc: [5, 40, 5, 49],
              left: {
                kind: "AstScriptIdentifier",
                loc: [5, 40, 5, 43],
                text: "one",
                bindingKey: "one$357jk2g9zktff$1",
              },
              operatorToken: "+",
              right: {
                kind: "AstScriptIdentifier",
                loc: [5, 46, 5, 49],
                text: "two",
                bindingKey: "two$357jk2g9zktff$2",
              },
            },
            operatorToken: "+",
            right: {
              kind: "AstScriptIdentifier",
              loc: [5, 52, 5, 56],
              text: "base",
              bindingKey: "base$357jk2g9zktff$0",
            },
          },
        },
      },
    ],
  }),
);
