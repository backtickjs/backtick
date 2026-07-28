import { cs } from "@backtickjs/core";
// The same `cs\`7\`` literal spliced twice is one client script, so it collapses
// into a single function-table entry referenced twice.
const leaf = cs.create(
  [5, 14, 5, 19],
  {
    version: "0.0.0",
    filePath: "deduplicated-scripts.ts",
    fileHash: "xr1ijhq5mxaf",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) => v.number([5, 17, 5, 18], 7),
);
export default cs.create(
  [7, 16, 7, 44],
  {
    version: "0.0.0",
    filePath: "deduplicated-scripts.ts",
    fileHash: "xr1ijhq5mxaf",
    kind: "value",
    splices: { $leaf: leaf },
    captures: [],
    spliceParams: { $leaf: [] },
  },
  (v) =>
    v.object([7, 20, 7, 42], {
      a: v.splice([7, 25, 7, 30], "$leaf"),
      b: v.splice([7, 35, 7, 40], "$leaf"),
    }),
);
