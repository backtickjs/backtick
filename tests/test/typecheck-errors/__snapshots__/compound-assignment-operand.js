import { cs } from "@backtickjs/core";
// Checked as TypeScript checks one: a variable that isn't `const`, and operands
// the operator takes.
export const constant = cs.create(
  { start: { line: 5, column: 24 }, end: { line: 10, column: 2 } },
  {
    filePath: "typecheck-errors/compound-assignment-operand.test.tsx",
    fileHash: "3586xtu4la89h",
    splices: {},
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 5, column: 27 }, end: { line: 10, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 6, column: 2 }, end: { line: 6, column: 14 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 6, column: 8 },
              end: { line: 6, column: 13 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 6, column: 8 },
                end: { line: 6, column: 9 },
              },
              name: "n",
              key: "n$3586xtu4la89h$0",
            },
            init: {
              type: "Literal",
              loc: {
                start: { line: 6, column: 12 },
                end: { line: 6, column: 13 },
              },
              value: 0,
            },
          },
        ],
      },
      {
        type: "ExpressionStatement",
        loc: { start: { line: 8, column: 2 }, end: { line: 8, column: 9 } },
        expression: {
          type: "AssignmentExpression",
          loc: { start: { line: 8, column: 2 }, end: { line: 8, column: 8 } },
          operator: "+=",
          left: {
            type: "Identifier",
            loc: { start: { line: 8, column: 2 }, end: { line: 8, column: 3 } },
            name: "n",
            key: "n$3586xtu4la89h$0",
          },
          right: {
            type: "Literal",
            loc: { start: { line: 8, column: 7 }, end: { line: 8, column: 8 } },
            value: 1,
          },
        },
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 9, column: 2 }, end: { line: 9, column: 11 } },
        argument: {
          type: "Identifier",
          loc: { start: { line: 9, column: 9 }, end: { line: 9, column: 10 } },
          name: "n",
          key: "n$3586xtu4la89h$0",
        },
      },
    ],
  }),
);
export const mixed = cs.create(
  { start: { line: 12, column: 21 }, end: { line: 17, column: 2 } },
  {
    filePath: "typecheck-errors/compound-assignment-operand.test.tsx",
    fileHash: "3586xtu4la89h",
    splices: {},
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 12, column: 24 }, end: { line: 17, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 12 } },
        kind: "let",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 11 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 13, column: 6 },
                end: { line: 13, column: 7 },
              },
              name: "n",
              key: "n$3586xtu4la89h$1",
            },
            init: {
              type: "Literal",
              loc: {
                start: { line: 13, column: 10 },
                end: { line: 13, column: 11 },
              },
              value: 1,
            },
          },
        ],
      },
      {
        type: "ExpressionStatement",
        loc: { start: { line: 15, column: 2 }, end: { line: 15, column: 11 } },
        expression: {
          type: "AssignmentExpression",
          loc: {
            start: { line: 15, column: 2 },
            end: { line: 15, column: 10 },
          },
          operator: "-=",
          left: {
            type: "Identifier",
            loc: {
              start: { line: 15, column: 2 },
              end: { line: 15, column: 3 },
            },
            name: "n",
            key: "n$3586xtu4la89h$1",
          },
          right: {
            type: "Literal",
            loc: {
              start: { line: 15, column: 7 },
              end: { line: 15, column: 10 },
            },
            value: "a",
          },
        },
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 16, column: 2 }, end: { line: 16, column: 11 } },
        argument: {
          type: "Identifier",
          loc: {
            start: { line: 16, column: 9 },
            end: { line: 16, column: 10 },
          },
          name: "n",
          key: "n$3586xtu4la89h$1",
        },
      },
    ],
  }),
);
