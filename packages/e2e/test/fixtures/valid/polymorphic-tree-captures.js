import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs } from "@backtickjs/core";
// A polymorphic fragment whose splice captures the template's own binding,
// referenced from tree props: the hole's thunk ships in JSON position with
// `params`, so `base` threads from the entry's scope into the splice.
function offset(by) {
  return cs.create(
    [8, 10, 8, 49],
    {
      filePath: "polymorphic-tree-captures.tsx",
      fileHash: "1kuzggq2rup5b",
      splices: {
        $0splice0: cs.create(
          [8, 33, 8, 41],
          {
            filePath: "polymorphic-tree-captures.tsx",
            fileHash: "1kuzggq2rup5b",
            splices: {},
            captures: ["base$1kuzggq2rup5b$0"],
            declarations: [],
          },
          (v) => v.identifier([8, 36, 8, 40], "base", "base$1kuzggq2rup5b$0"),
        ),
        $by: by,
      },
      captures: [],
      declarations: ["base$1kuzggq2rup5b$0"],
    },
    (v) =>
      v.arrow(
        [8, 13, 8, 48],
        [v.identifier([8, 14, 8, 18], "base", "base$1kuzggq2rup5b$0")],
        v.binop(
          [8, 31, 8, 48],
          v.splice([8, 31, 8, 42], "$0splice0"),
          "+",
          v.splice([8, 45, 8, 48], "$by"),
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
        fileHash: "1kuzggq2rup5b",
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
        fileHash: "1kuzggq2rup5b",
        splices: {},
        captures: [],
        declarations: [],
      },
      (v) => v.number([11, 59, 11, 60], 2),
    ),
  ),
});
