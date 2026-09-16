import { cs } from "@backtickjs/core";
// A runtime string splice inlines as itself — quotes, newlines, and
// backslashes intact.
const value = 'say "hi"\n\\done';
const spliceString = cs.create(
  [7, 22, 7, 32],
  {
    version: "0.0.0",
    filePath: "spliceString.tsx",
    fileHash: "32upr9elesgaq",
    splices: { $value: { value: value, params: [] } },
    captures: [],
  },
  () => ({
    kind: "splice",
    loc: [7, 25, 7, 31],
    key: "$value",
  }),
);
