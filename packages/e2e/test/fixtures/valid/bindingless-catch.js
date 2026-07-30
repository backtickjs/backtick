import { cs } from "@backtickjs/core";
// A `catch` without a binding: the try node's `param` is null and the
// handler runs with no new binding in scope.
export default cs.create(
  [5, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "bindingless-catch.ts",
    fileHash: "1jo3526bq0xmc",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [5, 19, 11, 2],
    statements: [
      {
        kind: "AstScriptTryStatement",
        loc: [6, 3, 10, 4],
        tryBlock: {
          kind: "AstScriptBlock",
          loc: [6, 7, 8, 4],
          statements: [
            {
              kind: "AstScriptThrowStatement",
              loc: [7, 5, 7, 18],
              expression: {
                kind: "AstScriptStringLiteral",
                loc: [7, 11, 7, 17],
                text: "boom",
              },
            },
          ],
        },
        catchClause: {
          kind: "AstScriptCatchClause",
          loc: [8, 5, 10, 4],
          variableDeclaration: null,
          block: {
            kind: "AstScriptBlock",
            loc: [8, 11, 10, 4],
            statements: [
              {
                kind: "AstScriptReturnStatement",
                loc: [9, 5, 9, 21],
                expression: {
                  kind: "AstScriptStringLiteral",
                  loc: [9, 12, 9, 20],
                  text: "caught",
                },
              },
            ],
          },
        },
      },
    ],
  }),
);
