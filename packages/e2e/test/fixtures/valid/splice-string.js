import { cs } from "@backtickjs/core";
// A runtime string splice inlines as itself — quotes, newlines, and
// backslashes intact.
const value = 'say "hi"\n\\done';
export default cs.create(
  [7, 16, 7, 26],
  {
    version: "0.0.0",
    filePath: "splice-string.ts",
    fileHash: "21eeyebjke79q",
    kind: "value",
    splices: { $value: value },
    captures: [],
    spliceParams: { $value: [] },
  },
  (v) => v.splice([7, 19, 7, 25], "$value"),
);
