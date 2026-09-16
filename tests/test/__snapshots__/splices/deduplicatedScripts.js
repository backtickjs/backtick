import { cs } from "@backtickjs/core";
// The same `cs\`7\`` literal spliced twice is one client script, so it collapses
// into a single function-table entry referenced twice.
const leaf = cs.create(
  [5, 14, 5, 19],
  {
    version: "0.0.0",
    filePath: "deduplicatedScripts.tsx",
    fileHash: "307e3rv91eb0g",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [5, 17, 5, 18],
    value: 7,
  }),
);
const deduplicatedScripts = cs.create(
  [7, 29, 7, 57],
  {
    version: "0.0.0",
    filePath: "deduplicatedScripts.tsx",
    fileHash: "307e3rv91eb0g",
    splices: { $leaf: { value: leaf, params: [] } },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [7, 33, 7, 55],
    properties: [
      {
        kind: ":",
        loc: [7, 35, 7, 43],
        name: "a",
        initializer: {
          kind: "splice",
          loc: [7, 38, 7, 43],
          key: "$leaf",
        },
      },
      {
        kind: ":",
        loc: [7, 45, 7, 53],
        name: "b",
        initializer: {
          kind: "splice",
          loc: [7, 48, 7, 53],
          key: "$leaf",
        },
      },
    ],
  }),
);
