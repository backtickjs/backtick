import { cs } from "@backtickjs/core";
// No truthiness: a ternary's condition must be boolean, like an `if`'s.
const count = cs.create(
  [4, 15, 4, 20],
  {
    version: "0.0.0",
    filePath: "ternary-condition.ts",
    fileHash: "29t6y9s27ti4b",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 9,
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
    kind: "value",
    splices: { $count: count },
    captures: [],
    spliceParams: { $count: [] },
  },
  () => ({
    kind: 228,
    loc: [6, 19, 6, 43],
    condition: {
      kind: 1000,
      loc: [6, 19, 6, 25],
      key: "$count",
    },
    whenTrue: {
      kind: 11,
      loc: [6, 28, 6, 34],
      text: "some",
    },
    whenFalse: {
      kind: 11,
      loc: [6, 37, 6, 43],
      text: "none",
    },
  }),
);
