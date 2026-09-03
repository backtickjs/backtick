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
    splices: { $value: { value: value, params: [] } },
    captures: [],
  },
  () => ({
    kind: "splice",
    loc: [7, 19, 7, 25],
    key: "$value",
  }),
);
