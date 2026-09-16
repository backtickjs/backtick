import { cs } from "@backtickjs/core";
// No truthiness: a ternary's condition must be boolean, like an `if`'s.
const count = cs.create(
  [4, 15, 4, 20],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/ternary-condition.test.tsx",
    fileHash: "r60n3m7xprrr",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [4, 18, 4, 19],
    value: 1,
  }),
);
// @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'boolean'.
export default cs.create(
  [7, 16, 7, 44],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/ternary-condition.test.tsx",
    fileHash: "r60n3m7xprrr",
    splices: { $count: { value: count, params: [] } },
    captures: [],
  },
  () => ({
    kind: "?:",
    loc: [7, 19, 7, 43],
    condition: {
      kind: "splice",
      loc: [7, 19, 7, 25],
      key: "$count",
    },
    whenTrue: {
      kind: "string",
      loc: [7, 28, 7, 34],
      text: "some",
    },
    whenFalse: {
      kind: "string",
      loc: [7, 37, 7, 43],
      text: "none",
    },
  }),
);
