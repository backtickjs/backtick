import { cs } from "@backtickjs/core";
// `#` is the bundle's one reserved key — the discriminant of every node — so a
// plain data object can't carry it.
const reservedKey = cs.create(
  [5, 21, 5, 50],
  {
    version: "0.0.0",
    filePath: "reservedKey.tsx",
    fileHash: "1bnq4ij4fywa8",
    splices: { $0splice0: { value: { "#": "value" }, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [5, 24, 5, 49],
    parameters: [],
    body: {
      kind: "splice",
      loc: [5, 30, 5, 49],
      key: "$0splice0",
    },
  }),
);
