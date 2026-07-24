import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs } from "@backtickjs/core";
const Button = (props) => ({
  "@backtickjs": "ClientElement",
  id: "Button",
  props,
});
// A polymorphic fragment whose splice captures the template's own binding,
// referenced from tree props: the hole's thunk ships in JSON position with
// `params`, so `base` threads from the entry's scope into the splice.
function offset(by) {
  return cs.create(
    [14, 10, 14, 49],
    {
      version: "0.0.0",
      filePath: "polymorphic-tree-captures.tsx",
      fileHash: "18whr6xo0l3nl",
      kind: "value",
      splices: {
        $0splice0: cs.create(
          [14, 33, 14, 41],
          {
            version: "0.0.0",
            filePath: "polymorphic-tree-captures.tsx",
            fileHash: "18whr6xo0l3nl",
            kind: "value",
            splices: {},
            captures: ["base$18whr6xo0l3nl$0"],
            declarations: [],
          },
          (v) => v.identifier([14, 36, 14, 40], "base", "base$18whr6xo0l3nl$0"),
        ),
        $by: by,
      },
      captures: [],
      declarations: ["base$18whr6xo0l3nl$0"],
    },
    (v) =>
      v.arrow(
        [14, 13, 14, 48],
        [v.identifier([14, 14, 14, 18], "base", "base$18whr6xo0l3nl$0")],
        v.binop(
          [14, 31, 14, 48],
          v.splice([14, 31, 14, 42], "$0splice0"),
          "+",
          v.splice([14, 45, 14, 48], "$by"),
        ),
      ),
  );
}
export default _jsx(Button, {
  onA: offset(
    cs.create(
      [17, 36, 17, 41],
      {
        version: "0.0.0",
        filePath: "polymorphic-tree-captures.tsx",
        fileHash: "18whr6xo0l3nl",
        kind: "value",
        splices: {},
        captures: [],
        declarations: [],
      },
      (v) => v.number([17, 39, 17, 40], 1),
    ),
  ),
  onB: offset(
    cs.create(
      [17, 56, 17, 61],
      {
        version: "0.0.0",
        filePath: "polymorphic-tree-captures.tsx",
        fileHash: "18whr6xo0l3nl",
        kind: "value",
        splices: {},
        captures: [],
        declarations: [],
      },
      (v) => v.number([17, 59, 17, 60], 2),
    ),
  ),
});
