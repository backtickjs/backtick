import { cs } from "@backtickjs/core";
// An action call produces no value: its `void` result can't initialize a
// variable — in a value script or an action.
const ping = cs.create(
  { start: { line: 5, column: 13 }, end: { line: 8, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/void-initializer.test.tsx",
    fileHash: "3ch7rgcn8bjeq",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 5, column: 16 }, end: { line: 8, column: 1 } },
    params: [],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 5, column: 22 }, end: { line: 8, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: { start: { line: 6, column: 2 }, end: { line: 6, column: 12 } },
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 6, column: 6 },
                end: { line: 6, column: 11 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 6, column: 6 },
                  end: { line: 6, column: 7 },
                },
                name: "n",
                key: "n$3ch7rgcn8bjeq$0",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 6, column: 10 },
                  end: { line: 6, column: 11 },
                },
                value: 0,
              },
            },
          ],
        },
        {
          type: "ExpressionStatement",
          loc: { start: { line: 7, column: 2 }, end: { line: 7, column: 8 } },
          expression: {
            type: "AssignmentExpression",
            loc: { start: { line: 7, column: 2 }, end: { line: 7, column: 7 } },
            operator: "=",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 7, column: 2 },
                end: { line: 7, column: 3 },
              },
              name: "n",
              key: "n$3ch7rgcn8bjeq$0",
            },
            right: {
              type: "Literal",
              loc: {
                start: { line: 7, column: 6 },
                end: { line: 7, column: 7 },
              },
              value: 1,
            },
          },
        },
      ],
    },
    expression: false,
  }),
);
const script = cs.create(
  { start: { line: 10, column: 15 }, end: { line: 13, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/void-initializer.test.tsx",
    fileHash: "3ch7rgcn8bjeq",
    splices: { $ping: { value: ping, params: [] } },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 10, column: 18 }, end: { line: 13, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 11, column: 2 }, end: { line: 11, column: 20 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 11, column: 8 },
              end: { line: 11, column: 19 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 11, column: 8 },
                end: { line: 11, column: 9 },
              },
              name: "x",
              key: "x$3ch7rgcn8bjeq$1",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 11, column: 12 },
                end: { line: 11, column: 19 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 11, column: 12 },
                  end: { line: 11, column: 17 },
                },
                key: "$ping",
              },
              arguments: [],
              optional: false,
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 12, column: 2 }, end: { line: 12, column: 11 } },
        argument: {
          type: "Literal",
          loc: {
            start: { line: 12, column: 9 },
            end: { line: 12, column: 10 },
          },
          value: 1,
        },
      },
    ],
  }),
);
const action = cs.create(
  { start: { line: 15, column: 15 }, end: { line: 17, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/void-initializer.test.tsx",
    fileHash: "3ch7rgcn8bjeq",
    splices: { $ping: { value: ping, params: [] } },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 15, column: 18 }, end: { line: 17, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 16, column: 2 }, end: { line: 16, column: 20 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 16, column: 8 },
              end: { line: 16, column: 19 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 16, column: 8 },
                end: { line: 16, column: 9 },
              },
              name: "x",
              key: "x$3ch7rgcn8bjeq$2",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 16, column: 12 },
                end: { line: 16, column: 19 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 16, column: 12 },
                  end: { line: 16, column: 17 },
                },
                key: "$ping",
              },
              arguments: [],
              optional: false,
            },
          },
        ],
      },
    ],
  }),
);
// An error inside a checked initializer reports once: the duplicate copy
// the check sequences is shielded.
const label = cs.create(
  { start: { line: 21, column: 14 }, end: { line: 23, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/void-initializer.test.tsx",
    fileHash: "3ch7rgcn8bjeq",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 21, column: 17 }, end: { line: 23, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 21, column: 18 }, end: { line: 21, column: 22 } },
        name: "text",
        key: "text$3ch7rgcn8bjeq$3",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 21, column: 35 }, end: { line: 23, column: 1 } },
      body: [
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 22, column: 2 },
            end: { line: 22, column: 14 },
          },
          argument: {
            type: "Identifier",
            loc: {
              start: { line: 22, column: 9 },
              end: { line: 22, column: 13 },
            },
            name: "text",
            key: "text$3ch7rgcn8bjeq$3",
          },
        },
      ],
    },
    expression: false,
  }),
);
const wrongArgument = cs.create(
  { start: { line: 25, column: 22 }, end: { line: 29, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/void-initializer.test.tsx",
    fileHash: "3ch7rgcn8bjeq",
    splices: { $label: { value: label, params: [] } },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 25, column: 25 }, end: { line: 29, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 27, column: 2 }, end: { line: 27, column: 25 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 27, column: 8 },
              end: { line: 27, column: 24 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 27, column: 8 },
                end: { line: 27, column: 9 },
              },
              name: "x",
              key: "x$3ch7rgcn8bjeq$4",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 27, column: 12 },
                end: { line: 27, column: 24 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 27, column: 12 },
                  end: { line: 27, column: 18 },
                },
                key: "$label",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 27, column: 19 },
                    end: { line: 27, column: 23 },
                  },
                  value: true,
                },
              ],
              optional: false,
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 28, column: 2 }, end: { line: 28, column: 11 } },
        argument: {
          type: "Literal",
          loc: {
            start: { line: 28, column: 9 },
            end: { line: 28, column: 10 },
          },
          value: 1,
        },
      },
    ],
  }),
);
