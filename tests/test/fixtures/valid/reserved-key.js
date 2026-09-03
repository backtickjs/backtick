import { cs } from "@backtickjs/core";
// `#` is the bundle's one reserved key — the discriminant of every node — so a
// plain data object can't carry it.
export default cs.create(
  [5, 16, 5, 45],
  {
    version: "0.0.0",
    filePath: "reserved-key.tsx",
    fileHash: "l1roqnlju7ac",
    splices: { $0splice0: { value: { "#": "value" }, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [5, 19, 5, 44],
    parameters: [],
    body: {
      kind: "splice",
      loc: [5, 25, 5, 44],
      key: "$0splice0",
    },
  }),
);
