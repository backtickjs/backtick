import { cs } from "@backtickjs/core";
// A function is never spliceable — it can't cross the host/client boundary
// as data — but an annotation can still name a function type: the parameter
// receives a client-born function (here, a spliced script), already client
// currency, and passes through the annotation untouched.
export default cs.create(
  [7, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "spliced-function-param.ts",
    fileHash: "22dvza3e0b85b",
    kind: "value",
    splices: {
      $0splice0: cs.create(
        [9, 18, 9, 29],
        {
          version: "0.0.0",
          filePath: "spliced-function-param.ts",
          fileHash: "22dvza3e0b85b",
          kind: "value",
          splices: {},
          captures: [],
          spliceParams: {},
        },
        () => ({
          kind: "AstScriptArrowFunction",
          loc: [9, 21, 9, 28],
          parameters: [],
          body: {
            kind: "AstScriptNumericLiteral",
            loc: [9, 27, 9, 28],
            value: 2,
          },
        }),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [7, 19, 10, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [8, 3, 8, 46],
        name: {
          kind: "AstScriptIdentifier",
          loc: [8, 9, 8, 14],
          text: "apply",
          bindingKey: "apply$22dvza3e0b85b$0",
        },
        initializer: {
          kind: "AstScriptArrowFunction",
          loc: [8, 17, 8, 45],
          parameters: [
            {
              kind: "AstScriptParameterDeclaration",
              loc: [8, 18, 8, 33],
              name: {
                kind: "AstScriptIdentifier",
                loc: [8, 18, 8, 19],
                text: "f",
                bindingKey: "f$22dvza3e0b85b$1",
              },
            },
          ],
          body: {
            kind: "AstScriptBinaryExpression",
            loc: [8, 38, 8, 45],
            left: {
              kind: "AstScriptCallExpression",
              loc: [8, 38, 8, 41],
              expression: {
                kind: "AstScriptIdentifier",
                loc: [8, 38, 8, 39],
                text: "f",
                bindingKey: "f$22dvza3e0b85b$1",
              },
              questionDotToken: false,
              arguments: [],
            },
            operatorToken: "+",
            right: {
              kind: "AstScriptNumericLiteral",
              loc: [8, 44, 8, 45],
              value: 1,
            },
          },
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [9, 3, 9, 32],
        expression: {
          kind: "AstScriptCallExpression",
          loc: [9, 10, 9, 31],
          expression: {
            kind: "AstScriptIdentifier",
            loc: [9, 10, 9, 15],
            text: "apply",
            bindingKey: "apply$22dvza3e0b85b$0",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: "AstScriptSplice",
              loc: [9, 16, 9, 30],
              key: "$0splice0",
            },
          ],
        },
      },
    ],
  }),
);
