import { cs } from "@backtickjs/core";
// `-` is arithmetic, so its operand is a number — TypeScript's own rule, and
// the reason this one needs no check of the language's own.
// @ts-expect-error: Argument of type 'string' is not assignable to parameter of type 'number'.
export default cs.create(
  { start: { line: 6, column: 15 }, end: { line: 6, column: 42 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/negate-non-number.test.tsx",
    fileHash: "63bu3dmolvh8",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 6, column: 18 }, end: { line: 6, column: 41 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 6, column: 19 }, end: { line: 6, column: 23 } },
        name: "name",
        bindingKey: "name$63bu3dmolvh8$0",
      },
    ],
    body: {
      type: "UnaryExpression",
      loc: { start: { line: 6, column: 36 }, end: { line: 6, column: 41 } },
      operator: "-",
      prefix: true,
      argument: {
        type: "Identifier",
        loc: { start: { line: 6, column: 37 }, end: { line: 6, column: 41 } },
        name: "name",
        bindingKey: "name$63bu3dmolvh8$0",
      },
    },
    expression: true,
  }),
);
