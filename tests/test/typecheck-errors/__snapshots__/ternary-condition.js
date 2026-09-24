import { cs } from "@backtickjs/core";
// No truthiness: a ternary's condition must be boolean, like an `if`'s.
const count = cs.create(
  { start: { line: 4, column: 14 }, end: { line: 4, column: 19 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/ternary-condition.test.tsx",
    fileHash: "r60n3m7xprrr",
    splices: {},
    captures: [],
  },
  () => ({
    type: "Literal",
    loc: { start: { line: 4, column: 17 }, end: { line: 4, column: 18 } },
    value: 1,
  }),
);
// @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'boolean'.
export default cs.create(
  { start: { line: 7, column: 15 }, end: { line: 7, column: 43 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/ternary-condition.test.tsx",
    fileHash: "r60n3m7xprrr",
    splices: { $count: { value: count, params: [] } },
    captures: [],
  },
  () => ({
    type: "ConditionalExpression",
    loc: { start: { line: 7, column: 18 }, end: { line: 7, column: 42 } },
    test: {
      type: "Splice",
      loc: { start: { line: 7, column: 18 }, end: { line: 7, column: 24 } },
      key: "$count",
    },
    consequent: {
      type: "Literal",
      loc: { start: { line: 7, column: 27 }, end: { line: 7, column: 33 } },
      value: "some",
    },
    alternate: {
      type: "Literal",
      loc: { start: { line: 7, column: 36 }, end: { line: 7, column: 42 } },
      value: "none",
    },
  }),
);
