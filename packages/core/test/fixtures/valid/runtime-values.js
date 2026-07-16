import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 3, 75],
  {
    filePath: "runtime-values.ts",
    fileHash: "1rjo8fz06u9rg",
    splices: { $0splice0: [1, "two", true, null], $0splice1: { k: 3 } },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.object([3, 20, 3, 73], {
      list: v.splice([3, 28, 3, 53], "$0splice0"),
      obj: v.splice([3, 60, 3, 71], "$0splice1"),
    }),
);
