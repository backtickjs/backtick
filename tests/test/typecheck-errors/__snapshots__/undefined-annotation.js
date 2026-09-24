import { cs } from "@backtickjs/core";
const stored = cs.create(
  { start: { line: 14, column: 15 }, end: { line: 17, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/undefined-annotation.test.tsx",
    fileHash: "15fgytirahb84",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 14, column: 18 }, end: { line: 17, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 14, column: 19 }, end: { line: 14, column: 20 } },
        name: "x",
        bindingKey: "x$15fgytirahb84$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 14, column: 32 }, end: { line: 17, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 15, column: 2 },
            end: { line: 15, column: 14 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 15, column: 8 },
                end: { line: 15, column: 13 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 8 },
                  end: { line: 15, column: 9 },
                },
                name: "y",
                bindingKey: "y$15fgytirahb84$1",
              },
              init: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 12 },
                  end: { line: 15, column: 13 },
                },
                name: "x",
                bindingKey: "x$15fgytirahb84$0",
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 16, column: 2 },
            end: { line: 16, column: 11 },
          },
          argument: {
            type: "Literal",
            loc: {
              start: { line: 16, column: 9 },
              end: { line: 16, column: 10 },
            },
            value: 1,
          },
        },
      ],
    },
    expression: false,
  }),
);
const written = cs.create(
  { start: { line: 19, column: 16 }, end: { line: 24, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/undefined-annotation.test.tsx",
    fileHash: "15fgytirahb84",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 19, column: 19 }, end: { line: 24, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 19, column: 20 }, end: { line: 19, column: 21 } },
        name: "x",
        bindingKey: "x$15fgytirahb84$2",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 19, column: 33 }, end: { line: 24, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 20, column: 2 },
            end: { line: 20, column: 13 },
          },
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 20, column: 6 },
                end: { line: 20, column: 12 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 20, column: 6 },
                  end: { line: 20, column: 7 },
                },
                name: "y",
                bindingKey: "y$15fgytirahb84$3",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 20, column: 10 },
                  end: { line: 20, column: 12 },
                },
                value: "",
              },
            },
          ],
        },
        {
          type: "ExpressionStatement",
          loc: { start: { line: 22, column: 2 }, end: { line: 22, column: 8 } },
          expression: {
            type: "AssignmentExpression",
            loc: {
              start: { line: 22, column: 2 },
              end: { line: 22, column: 7 },
            },
            operator: "=",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 22, column: 2 },
                end: { line: 22, column: 3 },
              },
              name: "y",
              bindingKey: "y$15fgytirahb84$3",
            },
            right: {
              type: "Identifier",
              loc: {
                start: { line: 22, column: 6 },
                end: { line: 22, column: 7 },
              },
              name: "x",
              bindingKey: "x$15fgytirahb84$2",
            },
          },
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 23, column: 2 },
            end: { line: 23, column: 11 },
          },
          argument: {
            type: "Literal",
            loc: {
              start: { line: 23, column: 9 },
              end: { line: 23, column: 10 },
            },
            value: 1,
          },
        },
      ],
    },
    expression: false,
  }),
);
