import { cs } from "@backtickjs/core";
// The same `cs\`7\`` literal spliced twice is one client script, so it collapses
// into a single function-table entry referenced twice.
const leaf = cs.create(
  [5, 14, 5, 19],
  {
    filePath: "deduplicated-scripts.ts",
    fileHash: "q4az884wofrr",
    splices: {},
    captures: [],
    declarations: [],
  },
  (v) => v.number([5, 17, 5, 18], 7),
);
export default cs.create(
  [7, 16, 7, 48],
  {
    filePath: "deduplicated-scripts.ts",
    fileHash: "q4az884wofrr",
    splices: { $0splice0: leaf, $0splice1: leaf },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.object([7, 20, 7, 46], {
      a: v.splice([7, 25, 7, 32], "$0splice0"),
      b: v.splice([7, 37, 7, 44], "$0splice1"),
    }),
);
