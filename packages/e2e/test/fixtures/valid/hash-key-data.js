import { cs } from "@backtickjs/core";
// Only the bare `#` key is reserved: a plain data object is free to use keys
// that merely start with `#`, even ones spelled like the tagged forms.
export default cs.create(
  [5, 16, 5, 47],
  {
    version: "0.0.0",
    filePath: "hash-key-data.tsx",
    fileHash: "wkikypinu026",
    kind: "value",
    splices: { $0splice0: { "#call": "#f0" } },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  (v) => v.arrow([5, 19, 5, 46], [], v.splice([5, 25, 5, 46], "$0splice0")),
);
