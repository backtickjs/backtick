import { cs } from "@backtickjs/core";
// An expression-form script is a value script — a bare splice included: an
// effectful call belongs in an action block, cs`{ $ping(); }`, and an
// action composes as cs`{ $action; }`, never as the expression itself.
const ping = cs.create(
  { start: { line: 6, column: 13 }, end: { line: 8, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-call-script.test.tsx",
    fileHash: "3513dvlaj30qa",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 6, column: 16 }, end: { line: 8, column: 1 } },
    params: [],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 6, column: 22 }, end: { line: 8, column: 1 } },
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
                bindingKey: "x$3513dvlaj30qa$0",
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
    },
    expression: false,
  }),
);
export const called = cs.create(
  { start: { line: 10, column: 22 }, end: { line: 10, column: 33 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-call-script.test.tsx",
    fileHash: "3513dvlaj30qa",
    splices: { $ping: { value: ping, params: [] } },
    captures: [],
  },
  () => ({
    type: "CallExpression",
    loc: { start: { line: 10, column: 25 }, end: { line: 10, column: 32 } },
    callee: {
      type: "Splice",
      loc: { start: { line: 10, column: 25 }, end: { line: 10, column: 30 } },
      key: "$ping",
    },
    arguments: [],
    optional: false,
  }),
);
const action = cs.create(
  { start: { line: 12, column: 15 }, end: { line: 14, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-call-script.test.tsx",
    fileHash: "3513dvlaj30qa",
    splices: {},
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 12, column: 18 }, end: { line: 14, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 14 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 13, column: 8 },
              end: { line: 13, column: 13 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 13, column: 8 },
                end: { line: 13, column: 9 },
              },
              name: "x",
              bindingKey: "x$3513dvlaj30qa$1",
            },
            init: {
              type: "Literal",
              loc: {
                start: { line: 13, column: 12 },
                end: { line: 13, column: 13 },
              },
              value: 1,
            },
          },
        ],
      },
    ],
  }),
);
// @ts-expect-error: Argument of type 'void' is not assignable to parameter of type 'ClientValue'.
export const spliced = cs.create(
  { start: { line: 17, column: 23 }, end: { line: 17, column: 34 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/action-call-script.test.tsx",
    fileHash: "3513dvlaj30qa",
    splices: { $action: { value: action, params: [] } },
    captures: [],
  },
  () => ({
    type: "Splice",
    loc: { start: { line: 17, column: 26 }, end: { line: 17, column: 33 } },
    key: "$action",
  }),
);
