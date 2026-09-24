import { cs } from "@backtickjs/core";
// An action only splices in statement position: any value-consuming splice
// fails right at the splice — a stored one, a returned one, even one
// assigned to an `unknown`-typed catch binding.
const action = cs.create(
  { start: { line: 6, column: 15 }, end: { line: 8, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-in-expression.test.tsx",
    fileHash: "1oi8866dofr8x",
    splices: {},
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 6, column: 18 }, end: { line: 8, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 7, column: 2 }, end: { line: 7, column: 14 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 7, column: 8 },
              end: { line: 7, column: 13 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 7, column: 8 },
                end: { line: 7, column: 9 },
              },
              name: "x",
              bindingKey: "x$1oi8866dofr8x$0",
            },
            init: {
              type: "Literal",
              loc: {
                start: { line: 7, column: 12 },
                end: { line: 7, column: 13 },
              },
              value: 1,
            },
          },
        ],
      },
    ],
  }),
);
export const stored = cs.create(
  { start: { line: 10, column: 22 }, end: { line: 14, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-in-expression.test.tsx",
    fileHash: "1oi8866dofr8x",
    splices: { $action: { value: action, params: [] } },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 10, column: 25 }, end: { line: 14, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 12, column: 2 }, end: { line: 12, column: 27 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 12, column: 8 },
              end: { line: 12, column: 26 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 12, column: 8 },
                end: { line: 12, column: 16 },
              },
              name: "captured",
              bindingKey: "captured$1oi8866dofr8x$1",
            },
            init: {
              type: "Splice",
              loc: {
                start: { line: 12, column: 19 },
                end: { line: 12, column: 26 },
              },
              key: "$action",
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 11 } },
        argument: {
          type: "Literal",
          loc: {
            start: { line: 13, column: 9 },
            end: { line: 13, column: 10 },
          },
          value: 1,
        },
      },
    ],
  }),
);
export const returned = cs.create(
  { start: { line: 16, column: 24 }, end: { line: 19, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-in-expression.test.tsx",
    fileHash: "1oi8866dofr8x",
    splices: { $action: { value: action, params: [] } },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 16, column: 27 }, end: { line: 19, column: 1 } },
    body: [
      {
        type: "ReturnStatement",
        loc: { start: { line: 18, column: 2 }, end: { line: 18, column: 17 } },
        argument: {
          type: "Splice",
          loc: {
            start: { line: 18, column: 9 },
            end: { line: 18, column: 16 },
          },
          key: "$action",
        },
      },
    ],
  }),
);
export const assigned = cs.create(
  { start: { line: 21, column: 24 }, end: { line: 29, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-in-expression.test.tsx",
    fileHash: "1oi8866dofr8x",
    splices: { $action: { value: action, params: [] } },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 21, column: 27 }, end: { line: 29, column: 1 } },
    body: [
      {
        type: "TryStatement",
        loc: { start: { line: 22, column: 2 }, end: { line: 28, column: 3 } },
        block: {
          type: "BlockStatement",
          loc: { start: { line: 22, column: 6 }, end: { line: 24, column: 3 } },
          body: [
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 23, column: 4 },
                end: { line: 23, column: 13 },
              },
              argument: {
                type: "Literal",
                loc: {
                  start: { line: 23, column: 11 },
                  end: { line: 23, column: 12 },
                },
                value: 1,
              },
            },
          ],
        },
        handler: {
          type: "CatchClause",
          loc: { start: { line: 24, column: 4 }, end: { line: 28, column: 3 } },
          param: {
            type: "Identifier",
            loc: {
              start: { line: 24, column: 11 },
              end: { line: 24, column: 12 },
            },
            name: "e",
            bindingKey: "e$1oi8866dofr8x$2",
          },
          body: {
            type: "BlockStatement",
            loc: {
              start: { line: 24, column: 14 },
              end: { line: 28, column: 3 },
            },
            body: [
              {
                type: "ExpressionStatement",
                loc: {
                  start: { line: 26, column: 4 },
                  end: { line: 26, column: 16 },
                },
                expression: {
                  type: "AssignmentExpression",
                  loc: {
                    start: { line: 26, column: 4 },
                    end: { line: 26, column: 15 },
                  },
                  operator: "=",
                  left: {
                    type: "Identifier",
                    loc: {
                      start: { line: 26, column: 4 },
                      end: { line: 26, column: 5 },
                    },
                    name: "e",
                    bindingKey: "e$1oi8866dofr8x$2",
                  },
                  right: {
                    type: "Splice",
                    loc: {
                      start: { line: 26, column: 8 },
                      end: { line: 26, column: 15 },
                    },
                    key: "$action",
                  },
                },
              },
              {
                type: "ReturnStatement",
                loc: {
                  start: { line: 27, column: 4 },
                  end: { line: 27, column: 13 },
                },
                argument: {
                  type: "Literal",
                  loc: {
                    start: { line: 27, column: 11 },
                    end: { line: 27, column: 12 },
                  },
                  value: 2,
                },
              },
            ],
          },
        },
        finalizer: null,
      },
    ],
  }),
);
