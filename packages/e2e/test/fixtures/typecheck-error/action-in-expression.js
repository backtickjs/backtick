import { cs } from "@backtickjs/core";
// An action only splices in statement position: any value-consuming splice
// fails right at the splice — a stored one, a returned one, even one
// assigned to an `unknown`-typed catch binding.
const action = cs.create(
  [6, 16, 8, 3],
  {
    version: "0.0.0",
    filePath: "action-in-expression.ts",
    fileHash: "8tx5qho0had8",
    kind: "action",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [6, 19, 8, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [7, 3, 7, 15],
        name: {
          kind: "AstScriptIdentifier",
          loc: [7, 9, 7, 10],
          text: "x",
          bindingKey: "x$8tx5qho0had8$0",
        },
        initializer: {
          kind: "AstScriptNumericLiteral",
          loc: [7, 13, 7, 14],
          value: 1,
        },
        keyword: "const",
      },
    ],
  }),
);
export const stored = cs.create(
  [10, 23, 13, 3],
  {
    version: "0.0.0",
    filePath: "action-in-expression.ts",
    fileHash: "8tx5qho0had8",
    kind: "value",
    splices: { $action: action },
    captures: [],
    spliceParams: { $action: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [10, 26, 13, 2],
    statements: [
      {
        kind: "AstScriptVariableDeclaration",
        loc: [11, 3, 11, 28],
        name: {
          kind: "AstScriptIdentifier",
          loc: [11, 9, 11, 17],
          text: "captured",
          bindingKey: "captured$8tx5qho0had8$1",
        },
        initializer: {
          kind: "AstScriptSplice",
          loc: [11, 20, 11, 27],
          key: "$action",
        },
        keyword: "const",
      },
      {
        kind: "AstScriptReturnStatement",
        loc: [12, 3, 12, 12],
        expression: {
          kind: "AstScriptNumericLiteral",
          loc: [12, 10, 12, 11],
          value: 1,
        },
      },
    ],
  }),
);
export const returned = cs.create(
  [15, 25, 17, 3],
  {
    version: "0.0.0",
    filePath: "action-in-expression.ts",
    fileHash: "8tx5qho0had8",
    kind: "value",
    splices: { $action: action },
    captures: [],
    spliceParams: { $action: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [15, 28, 17, 2],
    statements: [
      {
        kind: "AstScriptReturnStatement",
        loc: [16, 3, 16, 18],
        expression: {
          kind: "AstScriptSplice",
          loc: [16, 10, 16, 17],
          key: "$action",
        },
      },
    ],
  }),
);
export const assigned = cs.create(
  [19, 25, 26, 3],
  {
    version: "0.0.0",
    filePath: "action-in-expression.ts",
    fileHash: "8tx5qho0had8",
    kind: "value",
    splices: { $action: action },
    captures: [],
    spliceParams: { $action: [] },
  },
  () => ({
    kind: "AstScriptBlock",
    loc: [19, 28, 26, 2],
    statements: [
      {
        kind: "AstScriptTryStatement",
        loc: [20, 3, 25, 4],
        tryBlock: {
          kind: "AstScriptBlock",
          loc: [20, 7, 22, 4],
          statements: [
            {
              kind: "AstScriptReturnStatement",
              loc: [21, 5, 21, 14],
              expression: {
                kind: "AstScriptNumericLiteral",
                loc: [21, 12, 21, 13],
                value: 1,
              },
            },
          ],
        },
        catchClause: {
          kind: "AstScriptCatchClause",
          loc: [22, 5, 25, 4],
          variableDeclaration: {
            kind: "AstScriptIdentifier",
            loc: [22, 12, 22, 13],
            text: "e",
            bindingKey: "e$8tx5qho0had8$2",
          },
          block: {
            kind: "AstScriptBlock",
            loc: [22, 15, 25, 4],
            statements: [
              {
                kind: "AstScriptBinaryExpression",
                loc: [23, 5, 23, 16],
                left: {
                  kind: "AstScriptIdentifier",
                  loc: [23, 5, 23, 6],
                  text: "e",
                  bindingKey: "e$8tx5qho0had8$2",
                },
                operatorToken: "=",
                right: {
                  kind: "AstScriptSplice",
                  loc: [23, 9, 23, 16],
                  key: "$action",
                },
              },
              {
                kind: "AstScriptReturnStatement",
                loc: [24, 5, 24, 14],
                expression: {
                  kind: "AstScriptNumericLiteral",
                  loc: [24, 12, 24, 13],
                  value: 2,
                },
              },
            ],
          },
        },
      },
    ],
  }),
);
