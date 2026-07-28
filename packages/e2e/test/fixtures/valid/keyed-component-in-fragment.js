import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/core/jsx-runtime";
import { cs, Fragment, Text } from "@backtickjs/core";
async function Row({ label }) {
  return _jsx(Text, { children: label });
}
// The remedy for `bundle-error/keyed-component-in-script.tsx`. A component's
// key rides the reference that instantiates it, and a script instantiates a
// tree with a plain call, which carries no key — so splicing a keyed component
// straight into a script is refused.
//
// A `Fragment` puts the invocations back in tree position. What the script
// splices is now an element, and an element keeps its own identity through a
// splice; its children are placed in a tree, where a keyed reference is an
// `#apply` with a key on it.
const rows = _jsxs(Fragment, {
  children: [
    _jsx(Row, { label: "one" }, "a"),
    _jsx(Row, { label: "two" }, "b"),
  ],
});
const script = cs.create(
  [24, 43, 24, 58],
  {
    version: "0.0.0",
    filePath: "keyed-component-in-fragment.tsx",
    fileHash: "18fgsdkxhp3tm",
    kind: "value",
    splices: { $rows: rows },
    captures: [],
    spliceScopes: { $rows: [] },
  },
  (v) => v.arrow([24, 46, 24, 57], [], v.splice([24, 52, 24, 57], "$rows")),
);
export default script;
