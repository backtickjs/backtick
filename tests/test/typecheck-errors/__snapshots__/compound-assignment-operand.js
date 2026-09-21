import { cs } from "@backtickjs/core";
// Checked as TypeScript checks one: a variable that isn't `const`, and operands
// the operator takes.
export const constant = cs.create(
  [5, 25, 10, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/compound-assignment-operand.test.tsx",
    fileHash: "3586xtu4la89h",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [5, 28, 10, 2],
    statements: [
      {
        kind: "const",
        loc: [6, 3, 6, 15],
        name: {
          kind: "id",
          loc: [6, 9, 6, 10],
          text: "n",
          bindingKey: "n$3586xtu4la89h$0",
        },
        initializer: {
          kind: "number",
          loc: [6, 13, 6, 14],
          value: 0,
        },
      },
      {
        kind: "binop",
        loc: [8, 3, 8, 9],
        left: {
          kind: "id",
          loc: [8, 3, 8, 4],
          text: "n",
          bindingKey: "n$3586xtu4la89h$0",
        },
        operatorToken: "+=",
        right: {
          kind: "number",
          loc: [8, 8, 8, 9],
          value: 1,
        },
      },
      {
        kind: "return",
        loc: [9, 3, 9, 12],
        expression: {
          kind: "id",
          loc: [9, 10, 9, 11],
          text: "n",
          bindingKey: "n$3586xtu4la89h$0",
        },
      },
    ],
  }),
);
export const mixed = cs.create(
  [12, 22, 17, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/compound-assignment-operand.test.tsx",
    fileHash: "3586xtu4la89h",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [12, 25, 17, 2],
    statements: [
      {
        kind: "let",
        loc: [13, 3, 13, 13],
        name: {
          kind: "id",
          loc: [13, 7, 13, 8],
          text: "n",
          bindingKey: "n$3586xtu4la89h$1",
        },
        initializer: {
          kind: "number",
          loc: [13, 11, 13, 12],
          value: 1,
        },
      },
      {
        kind: "binop",
        loc: [15, 3, 15, 11],
        left: {
          kind: "id",
          loc: [15, 3, 15, 4],
          text: "n",
          bindingKey: "n$3586xtu4la89h$1",
        },
        operatorToken: "-=",
        right: {
          kind: "string",
          loc: [15, 8, 15, 11],
          text: "a",
        },
      },
      {
        kind: "return",
        loc: [16, 3, 16, 12],
        expression: {
          kind: "id",
          loc: [16, 10, 16, 11],
          text: "n",
          bindingKey: "n$3586xtu4la89h$1",
        },
      },
    ],
  }),
);
