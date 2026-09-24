import { cs } from "@backtickjs/core";
// A statement discards its expression, which is only silent for `void` — an
// action's result. Discarding a value is a mistake; calling an action is
// the point.
const getValue = cs.create(
  { start: { line: 6, column: 17 }, end: { line: 8, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/discarded-value.test.tsx",
    fileHash: "15c51klv9dnfh",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 6, column: 20 }, end: { line: 8, column: 1 } },
    params: [],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 6, column: 26 }, end: { line: 8, column: 1 } },
      body: [
        {
          type: "ReturnStatement",
          loc: { start: { line: 7, column: 2 }, end: { line: 7, column: 11 } },
          argument: {
            type: "Literal",
            loc: {
              start: { line: 7, column: 9 },
              end: { line: 7, column: 10 },
            },
            value: 1,
          },
        },
      ],
    },
    expression: false,
  }),
);
const ping = cs.create(
  { start: { line: 10, column: 13 }, end: { line: 13, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/discarded-value.test.tsx",
    fileHash: "15c51klv9dnfh",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 10, column: 16 }, end: { line: 13, column: 1 } },
    params: [],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 10, column: 22 }, end: { line: 13, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 11, column: 2 },
            end: { line: 11, column: 12 },
          },
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 11, column: 6 },
                end: { line: 11, column: 11 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 11, column: 6 },
                  end: { line: 11, column: 7 },
                },
                name: "n",
                bindingKey: "n$15c51klv9dnfh$0",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 11, column: 10 },
                  end: { line: 11, column: 11 },
                },
                value: 0,
              },
            },
          ],
        },
        {
          type: "ExpressionStatement",
          loc: { start: { line: 12, column: 2 }, end: { line: 12, column: 8 } },
          expression: {
            type: "AssignmentExpression",
            loc: {
              start: { line: 12, column: 2 },
              end: { line: 12, column: 7 },
            },
            operator: "=",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 12, column: 2 },
                end: { line: 12, column: 3 },
              },
              name: "n",
              bindingKey: "n$15c51klv9dnfh$0",
            },
            right: {
              type: "Literal",
              loc: {
                start: { line: 12, column: 6 },
                end: { line: 12, column: 7 },
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
const action = cs.create(
  { start: { line: 15, column: 15 }, end: { line: 19, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/discarded-value.test.tsx",
    fileHash: "15c51klv9dnfh",
    splices: {
      $ping: { value: ping, params: [] },
      $getValue: { value: getValue, params: [] },
    },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 15, column: 18 }, end: { line: 19, column: 1 } },
    body: [
      {
        type: "ExpressionStatement",
        loc: { start: { line: 16, column: 2 }, end: { line: 16, column: 10 } },
        expression: {
          type: "CallExpression",
          loc: { start: { line: 16, column: 2 }, end: { line: 16, column: 9 } },
          callee: {
            type: "Splice",
            loc: {
              start: { line: 16, column: 2 },
              end: { line: 16, column: 7 },
            },
            key: "$ping",
          },
          arguments: [],
          optional: false,
        },
      },
      {
        type: "ExpressionStatement",
        loc: { start: { line: 18, column: 2 }, end: { line: 18, column: 14 } },
        expression: {
          type: "CallExpression",
          loc: {
            start: { line: 18, column: 2 },
            end: { line: 18, column: 13 },
          },
          callee: {
            type: "Splice",
            loc: {
              start: { line: 18, column: 2 },
              end: { line: 18, column: 11 },
            },
            key: "$getValue",
          },
          arguments: [],
          optional: false,
        },
      },
    ],
  }),
);
// The same rule in a script that returns: the position is what decides, so a
// discarded value fails here too while the action beside it stands.
const valued = cs.create(
  { start: { line: 23, column: 15 }, end: { line: 28, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/discarded-value.test.tsx",
    fileHash: "15c51klv9dnfh",
    splices: {
      $ping: { value: ping, params: [] },
      $getValue: { value: getValue, params: [] },
    },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 23, column: 18 }, end: { line: 28, column: 1 } },
    body: [
      {
        type: "ExpressionStatement",
        loc: { start: { line: 24, column: 2 }, end: { line: 24, column: 10 } },
        expression: {
          type: "CallExpression",
          loc: { start: { line: 24, column: 2 }, end: { line: 24, column: 9 } },
          callee: {
            type: "Splice",
            loc: {
              start: { line: 24, column: 2 },
              end: { line: 24, column: 7 },
            },
            key: "$ping",
          },
          arguments: [],
          optional: false,
        },
      },
      {
        type: "ExpressionStatement",
        loc: { start: { line: 26, column: 2 }, end: { line: 26, column: 14 } },
        expression: {
          type: "CallExpression",
          loc: {
            start: { line: 26, column: 2 },
            end: { line: 26, column: 13 },
          },
          callee: {
            type: "Splice",
            loc: {
              start: { line: 26, column: 2 },
              end: { line: 26, column: 11 },
            },
            key: "$getValue",
          },
          arguments: [],
          optional: false,
        },
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 27, column: 2 }, end: { line: 27, column: 11 } },
        argument: {
          type: "Literal",
          loc: {
            start: { line: 27, column: 9 },
            end: { line: 27, column: 10 },
          },
          value: 1,
        },
      },
    ],
  }),
);
