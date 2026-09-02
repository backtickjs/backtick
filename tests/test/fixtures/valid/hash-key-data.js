import { cs } from "@backtickjs/core";
// Only the bare `#` key is reserved: a plain data object is free to use keys
// that merely start with `#`, even ones spelled like the tagged forms.
export default cs.create(
  [5, 16, 5, 47],
  {
    version: "0.0.0",
    filePath: "hash-key-data.tsx",
    fileHash: "wkikypinu026",
    splices: { $0splice0: { value: { "#call": "#f0" }, params: [] } },
    captures: [],
  },
  () => ({
    kind: 220,
    loc: [5, 19, 5, 46],
    parameters: [],
    body: {
      kind: 1000,
      loc: [5, 25, 5, 46],
      key: "$0splice0",
    },
  }),
);
