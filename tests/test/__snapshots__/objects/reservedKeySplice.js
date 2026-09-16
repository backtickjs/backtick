import { cs } from "@backtickjs/core";
// A runtime object spliced into a script inlines as the plain data it is, so
// it can't carry `#` — the bundle's one reserved key — either.
const reservedKeySplice = cs.create(
  [5, 27, 5, 50],
  {
    version: "0.0.0",
    filePath: "reservedKeySplice.tsx",
    fileHash: "2lrfet6cz86nt",
    splices: { $0splice0: { value: { "#": "value" }, params: [] } },
    captures: [],
  },
  () => ({
    kind: "splice",
    loc: [5, 30, 5, 49],
    key: "$0splice0",
  }),
);
