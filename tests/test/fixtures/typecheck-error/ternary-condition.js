import { cs } from "@backtickjs/core";
// No truthiness: a ternary's condition must be boolean, like an `if`'s.
const count = cs.create(
  [4, 15, 4, 20],
  {
    version: "0.0.0",
    filePath: "ternary-condition.ts",
    fileHash: "29t6y9s27ti4b",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [4, 18, 4, 19],
    value: 1,
  }),
);
export default cs.create(
  [6, 16, 6, 44],
  {
    version: "0.0.0",
    filePath: "ternary-condition.ts",
    fileHash: "29t6y9s27ti4b",
    splices: { $count: { value: count, params: [] } },
    captures: [],
  },
  () => ({
    kind: "?:",
    loc: [6, 19, 6, 43],
    condition: {
      kind: "splice",
      loc: [6, 19, 6, 25],
      key: "$count",
    },
    whenTrue: {
      kind: "string",
      loc: [6, 28, 6, 34],
      text: "some",
    },
    whenFalse: {
      kind: "string",
      loc: [6, 37, 6, 43],
      text: "none",
    },
  }),
);
