import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs, Text, View } from "@backtickjs/core";
// A key is a value like a prop, so a script spliced into one threads its
// splices and captures exactly as a prop's would — including on an element
// nested inline inside another, where the key belongs to no entry of its own.
// `jsx-capture-key.tsx` covers the hoisted case, which `contentValues` scans;
// this covers the nested one, which needs the key walked in `nestedRefs` and
// `freeCaps` as well. A key with no splices always worked, which is why the
// gap went unnoticed.
const Child = async ({ n }) =>
  _jsx(View, {
    children: _jsx(
      Text,
      { children: "x" },
      cs.create(
        [13, 16, 13, 22],
        {
          version: "0.0.0",
          filePath: "nested-key-splice.tsx",
          fileHash: "19bu011o84qhi",
          kind: "value",
          splices: { $n: n },
          captures: [],
          declarations: [],
          captured: [],
        },
        (v) => v.splice([13, 19, 13, 21], "$n"),
      ),
    ),
  });
export default _jsx(Child, {
  n: cs.create(
    [17, 26, 17, 31],
    {
      version: "0.0.0",
      filePath: "nested-key-splice.tsx",
      fileHash: "19bu011o84qhi",
      kind: "value",
      splices: {},
      captures: [],
      declarations: [],
      captured: [],
    },
    (v) => v.number([17, 29, 17, 30], 1),
  ),
});
