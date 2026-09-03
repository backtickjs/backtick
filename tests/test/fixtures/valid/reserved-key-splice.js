import { cs } from "@backtickjs/core";
// A runtime object spliced into a script inlines as the plain data it is, so
// it can't carry `#` — the bundle's one reserved key — either.
export default cs.create(
  [5, 16, 5, 39],
  {
    version: "0.0.0",
    filePath: "reserved-key-splice.ts",
    fileHash: "1uzd46c3lqufn",
    splices: { $0splice0: { value: { "#": "value" }, params: [] } },
    captures: [],
  },
  () => ({
    kind: "splice",
    loc: [5, 19, 5, 38],
    key: "$0splice0",
  }),
);
