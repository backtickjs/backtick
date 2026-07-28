import { cs } from "@backtickjs/core";
// Splices evaluate when the `cs` expression does, left to right in source
// order, like a real template literal's spans — braced and unbraced alike:
// the `$count` read sees 0 before `${++count}` bumps it to 1.
let count = 0;
export default cs.create(
  [8, 16, 8, 50],
  {
    version: "0.0.0",
    filePath: "splice-order.ts",
    fileHash: "6o3erh5ve8um",
    kind: "value",
    splices: { $count: count, $0splice0: ++count },
    captures: [],
    spliceParams: { $count: [], $0splice0: [] },
  },
  (v) =>
    v.object([8, 20, 8, 48], {
      a: v.splice([8, 25, 8, 31], "$count"),
      b: v.splice([8, 36, 8, 46], "$0splice0"),
    }),
);
