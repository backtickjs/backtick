import { cs } from "@backtickjs/core";
// The same `cs\`7\`` literal spliced twice is one client script, so it collapses
// into a single function-table entry referenced twice.
const leaf = cs.create(
  [5, 14, 5, 19],
  {
    version: "0.0.0",
    filePath: "deduplicated-scripts.ts",
    fileHash: "xr1ijhq5mxaf",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [5, 17, 5, 18],
    value: 7,
  }),
);
export default cs.create(
  [7, 16, 7, 44],
  {
    version: "0.0.0",
    filePath: "deduplicated-scripts.ts",
    fileHash: "xr1ijhq5mxaf",
    splices: { $leaf: { value: leaf, params: [] } },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [7, 20, 7, 42],
    properties: [
      {
        kind: ":",
        loc: [7, 22, 7, 30],
        name: "a",
        initializer: {
          kind: "splice",
          loc: [7, 25, 7, 30],
          key: "$leaf",
        },
      },
      {
        kind: ":",
        loc: [7, 32, 7, 40],
        name: "b",
        initializer: {
          kind: "splice",
          loc: [7, 35, 7, 40],
          key: "$leaf",
        },
      },
    ],
  }),
);
