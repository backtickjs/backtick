import { cs } from "@backtickjs/core";
// A step is checked as TypeScript checks one: a number, in a variable that
// isn't `const`.
export const constant = cs.create(
  [5, 25, 10, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/step-operand.test.tsx",
    fileHash: "3iw6lzhko8e0n",
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
          text: "i",
          bindingKey: "i$3iw6lzhko8e0n$0",
        },
        initializer: {
          kind: "number",
          loc: [6, 13, 6, 14],
          value: 0,
        },
      },
      {
        kind: "postfixop",
        loc: [8, 3, 8, 6],
        operator: "++",
        operand: {
          kind: "id",
          loc: [8, 3, 8, 4],
          text: "i",
          bindingKey: "i$3iw6lzhko8e0n$0",
        },
      },
      {
        kind: "return",
        loc: [9, 3, 9, 12],
        expression: {
          kind: "id",
          loc: [9, 10, 9, 11],
          text: "i",
          bindingKey: "i$3iw6lzhko8e0n$0",
        },
      },
    ],
  }),
);
export const text = cs.create(
  [12, 21, 17, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/step-operand.test.tsx",
    fileHash: "3iw6lzhko8e0n",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [12, 24, 17, 2],
    statements: [
      {
        kind: "let",
        loc: [13, 3, 13, 15],
        name: {
          kind: "id",
          loc: [13, 7, 13, 8],
          text: "s",
          bindingKey: "s$3iw6lzhko8e0n$1",
        },
        initializer: {
          kind: "string",
          loc: [13, 11, 13, 14],
          text: "a",
        },
      },
      {
        kind: "postfixop",
        loc: [15, 3, 15, 6],
        operator: "++",
        operand: {
          kind: "id",
          loc: [15, 3, 15, 4],
          text: "s",
          bindingKey: "s$3iw6lzhko8e0n$1",
        },
      },
      {
        kind: "return",
        loc: [16, 3, 16, 12],
        expression: {
          kind: "id",
          loc: [16, 10, 16, 11],
          text: "s",
          bindingKey: "s$3iw6lzhko8e0n$1",
        },
      },
    ],
  }),
);
