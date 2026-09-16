import { cs } from "@backtickjs/core";
// Only the bare `#` key is reserved: a plain data object is free to use keys
// that merely start with `#`, even ones spelled like the tagged forms.
const hashKeyData = cs.create(
  [5, 21, 5, 52],
  {
    version: "0.0.0",
    filePath: "hashKeyData.tsx",
    fileHash: "3ct19jyy0zrki",
    splices: { $0splice0: { value: { "#call": "#f0" }, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [5, 24, 5, 51],
    parameters: [],
    body: {
      kind: "splice",
      loc: [5, 30, 5, 51],
      key: "$0splice0",
    },
  }),
);
