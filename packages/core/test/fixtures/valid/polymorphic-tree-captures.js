import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs } from "@backtickjs/core";
// A polymorphic fragment whose splice captures the template's own binding,
// referenced from tree props: the hole's thunk ships in JSON position with
// `params`, so `base` threads from the entry's scope into the splice.
function offset(by) {
  return cs.create(
    [8, 10, 8, 51],
    {
      filePath: "polymorphic-tree-captures.tsx",
      fileHash: "1i1w4jfjuodch",
      splices: {
        $0splice0: cs.create(
          [8, 33, 8, 41],
          {
            filePath: "polymorphic-tree-captures.tsx",
            fileHash: "1i1w4jfjuodch",
            splices: {},
            captures: ["base$1i1w4jfjuodch$0"],
            declarations: [],
          },
          (v) => v.identifier([8, 36, 8, 40], "base", "base$1i1w4jfjuodch$0"),
        ),
        $0splice1: by,
      },
      captures: [],
      declarations: ["base$1i1w4jfjuodch$0"],
    },
    (v) =>
      v.arrow(
        [8, 13, 8, 50],
        [v.identifier([8, 14, 8, 18], "base", "base$1i1w4jfjuodch$0")],
        v.binop(
          [8, 31, 8, 50],
          v.splice([8, 31, 8, 42], "$0splice0"),
          "+",
          v.splice([8, 45, 8, 50], "$0splice1"),
        ),
      ),
  );
}
export default _jsx("button", {
  onA: offset(
    cs.create(
      [11, 36, 11, 41],
      {
        filePath: "polymorphic-tree-captures.tsx",
        fileHash: "1i1w4jfjuodch",
        splices: {},
        captures: [],
        declarations: [],
      },
      (v) => v.number([11, 39, 11, 40], 1),
    ),
  ),
  onB: offset(
    cs.create(
      [11, 56, 11, 61],
      {
        filePath: "polymorphic-tree-captures.tsx",
        fileHash: "1i1w4jfjuodch",
        splices: {},
        captures: [],
        declarations: [],
      },
      (v) => v.number([11, 59, 11, 60], 2),
    ),
  ),
});
