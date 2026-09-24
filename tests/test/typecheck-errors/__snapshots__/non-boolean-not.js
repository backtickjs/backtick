import { cs } from "@backtickjs/core";
// The operand of `!` is a condition, so a number is a type error rather than
// a coercion.
// @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'boolean'.
export default cs.create(
  { start: { line: 6, column: 15 }, end: { line: 6, column: 44 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/non-boolean-not.test.tsx",
    fileHash: "3imwfwdjuhdbp",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 6, column: 18 }, end: { line: 6, column: 43 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 6, column: 19 }, end: { line: 6, column: 24 } },
        name: "count",
        bindingKey: "count$3imwfwdjuhdbp$0",
      },
    ],
    body: {
      type: "UnaryExpression",
      loc: { start: { line: 6, column: 37 }, end: { line: 6, column: 43 } },
      operator: "!",
      prefix: true,
      argument: {
        type: "Identifier",
        loc: { start: { line: 6, column: 38 }, end: { line: 6, column: 43 } },
        name: "count",
        bindingKey: "count$3imwfwdjuhdbp$0",
      },
    },
    expression: true,
  }),
);
