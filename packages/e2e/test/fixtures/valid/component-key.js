import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { cs, Text, View } from "@backtickjs/core";
// A key on a component tag. It identifies the instance among its siblings, so
// it belongs to the instantiation rather than to the entry — two `<Row />` tags
// may reach one entry, and an entry can't hold two keys. It rides the reference
// and lands on the `#apply`, where a client can pair instances across a
// re-render by key rather than by position.
//
// The third key is a script, so it is evaluated per instance like any other
// client value, and captures from the reference's own scope rather than the
// entry's.
async function Row({ label }) {
  return _jsx(Text, { children: label });
}
export default _jsxs(View, {
  children: [
    _jsx(Row, { label: "one" }, "first"),
    _jsx(Row, { label: "two" }, 2),
    _jsx(
      Row,
      { label: "three" },
      cs.create(
        [20, 15, 20, 26],
        {
          version: "0.0.0",
          filePath: "component-key.tsx",
          fileHash: "1m7tzw0xl8jox",
          kind: "value",
          splices: {},
          captures: [],
          declarations: [],
        },
        (v) => v.string([20, 18, 20, 25], "third"),
      ),
    ),
  ],
});
