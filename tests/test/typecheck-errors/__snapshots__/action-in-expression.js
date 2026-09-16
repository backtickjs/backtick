import { cs } from "@backtickjs/core";
// An action only splices in statement position: any value-consuming splice
// fails right at the splice — a stored one, a returned one, even one
// assigned to an `unknown`-typed catch binding.
const action = cs.create(
  [6, 16, 8, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-in-expression.test.tsx",
    fileHash: "1oi8866dofr8x",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [6, 19, 8, 2],
    statements: [
      {
        kind: "const",
        loc: [7, 3, 7, 15],
        name: {
          kind: "id",
          loc: [7, 9, 7, 10],
          text: "x",
          bindingKey: "x$1oi8866dofr8x$0",
        },
        initializer: {
          kind: "number",
          loc: [7, 13, 7, 14],
          value: 1,
        },
      },
    ],
  }),
);
export const stored = cs.create(
  [10, 23, 14, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-in-expression.test.tsx",
    fileHash: "1oi8866dofr8x",
    splices: { $action: { value: action, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [10, 26, 14, 2],
    statements: [
      {
        kind: "const",
        loc: [12, 3, 12, 28],
        name: {
          kind: "id",
          loc: [12, 9, 12, 17],
          text: "captured",
          bindingKey: "captured$1oi8866dofr8x$1",
        },
        initializer: {
          kind: "splice",
          loc: [12, 20, 12, 27],
          key: "$action",
        },
      },
      {
        kind: "return",
        loc: [13, 3, 13, 12],
        expression: {
          kind: "number",
          loc: [13, 10, 13, 11],
          value: 1,
        },
      },
    ],
  }),
);
export const returned = cs.create(
  [16, 25, 19, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-in-expression.test.tsx",
    fileHash: "1oi8866dofr8x",
    splices: { $action: { value: action, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [16, 28, 19, 2],
    statements: [
      {
        kind: "return",
        loc: [18, 3, 18, 18],
        expression: {
          kind: "splice",
          loc: [18, 10, 18, 17],
          key: "$action",
        },
      },
    ],
  }),
);
export const assigned = cs.create(
  [21, 25, 29, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-in-expression.test.tsx",
    fileHash: "1oi8866dofr8x",
    splices: { $action: { value: action, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [21, 28, 29, 2],
    statements: [
      {
        kind: "try",
        loc: [22, 3, 28, 4],
        tryBlock: {
          kind: "{}",
          loc: [22, 7, 24, 4],
          statements: [
            {
              kind: "return",
              loc: [23, 5, 23, 14],
              expression: {
                kind: "number",
                loc: [23, 12, 23, 13],
                value: 1,
              },
            },
          ],
        },
        catchClause: {
          kind: "catch",
          loc: [24, 5, 28, 4],
          variableDeclaration: {
            kind: "id",
            loc: [24, 12, 24, 13],
            text: "e",
            bindingKey: "e$1oi8866dofr8x$2",
          },
          block: {
            kind: "{}",
            loc: [24, 15, 28, 4],
            statements: [
              {
                kind: "binop",
                loc: [26, 5, 26, 16],
                left: {
                  kind: "id",
                  loc: [26, 5, 26, 6],
                  text: "e",
                  bindingKey: "e$1oi8866dofr8x$2",
                },
                operatorToken: "=",
                right: {
                  kind: "splice",
                  loc: [26, 9, 26, 16],
                  key: "$action",
                },
              },
              {
                kind: "return",
                loc: [27, 5, 27, 14],
                expression: {
                  kind: "number",
                  loc: [27, 12, 27, 13],
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
