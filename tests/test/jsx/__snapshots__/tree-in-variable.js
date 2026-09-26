import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A tree spliced into a body and bound to a name before it is used. Nothing
// applies it at the hole and nothing draws it there — it is a value, held and
// handed back, and the position that receives it is what draws it.
//
// The shape this pins is that an entry reached from a body is *applied*: the
// value says which entry and what to hand it, and that is the whole of what an
// instance-to-be is. There was once a second way to say it — naming the entry,
// and calling what that named — and this is the case it existed for.
const HeldRow = async () => _jsx("span", { children: "x" });
const heldElement = cs.create(
  "224cj4eht1o03:15:20",
  { params: [{ kind: "splice", value: _jsx("div", {}), bindings: [] }] },
  "($splice0) => () => {\n    const tree = $splice0();\n    return tree;\n}",
  '{"version":3,"file":"tree-in-variable.test.jsx","sourceRoot":"","sources":["jsx/tree-in-variable.test.tsx"],"names":[],"mappings":"AAcuB,cAAA,GAAG,EAAE;IAC1B,MAAM,IAAI,GAAG,UAAC,CAAY;IAC1B,OAAO,IAAI,CAAC;AACd,CAAC"}',
);
const heldComponent = cs.create(
  "224cj4eht1o03:20:22",
  { params: [{ kind: "splice", value: _jsx(HeldRow, {}), bindings: [] }] },
  "($splice0) => () => {\n    const tree = $splice0();\n    return tree;\n}",
  '{"version":3,"file":"tree-in-variable.test.jsx","sourceRoot":"","sources":["jsx/tree-in-variable.test.tsx"],"names":[],"mappings":"AAmByB,cAAA,GAAG,EAAE;IAC5B,MAAM,IAAI,GAAG,UAAC,CAAgB;IAC9B,OAAO,IAAI,CAAC;AACd,CAAC"}',
);
it("treeInVariable", async (t) => {
  await snapshotCase(
    t,
    "treeInVariable",
    _jsxs("div", {
      children: [
        cs.create(
          "224cj4eht1o03:30:7",
          { params: [{ kind: "splice", value: heldElement, bindings: [] }] },
          "($splice0) => $splice0()()",
          '{"version":3,"file":"tree-in-variable.test.jsx","sourceRoot":"","sources":["jsx/tree-in-variable.test.tsx"],"names":[],"mappings":"AA6BU,cAAA,UAAY,EAAE"}',
        ),
        cs.create(
          "224cj4eht1o03:31:7",
          { params: [{ kind: "splice", value: heldComponent, bindings: [] }] },
          "($splice0) => $splice0()()",
          '{"version":3,"file":"tree-in-variable.test.jsx","sourceRoot":"","sources":["jsx/tree-in-variable.test.tsx"],"names":[],"mappings":"AA8BU,cAAA,UAAc,EAAE"}',
        ),
      ],
    }),
  );
});
