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
    declarations: [],
  },
  (v) => v.number([4, 18, 4, 19], 1),
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
    declarations: [],
  },
  (v) =>
    v.ternary(
      [6, 19, 6, 43],
      v.splice([6, 19, 6, 25], "$count"),
      v.string([6, 28, 6, 34], "some"),
      v.string([6, 37, 6, 43], "none"),
    ),
);
