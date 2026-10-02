import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
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
const HeldRow = async () =>
  cs.create(
    "3cjyucql1m4dw:13:28",
    { params: [] },
    "() => <span>x</span>",
    '{"version":3,"file":"tree-in-variable.test.jsx","sourceRoot":"","sources":["jsx/tree-in-variable.test.tsx"],"names":[],"mappings":"AAY+B,MAAA,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CAAC"}',
  );
const heldElement = cs.create(
  "3cjyucql1m4dw:15:20",
  {
    params: [
      {
        kind: "splice",
        value: cs.create(
          "3cjyucql1m4dw:16:17",
          { params: [] },
          "() => <div />",
          '{"version":3,"file":"tree-in-variable.test.jsx","sourceRoot":"","sources":["jsx/tree-in-variable.test.tsx"],"names":[],"mappings":"AAeoB,MAAA,CAAC,GAAG,CAAC,AAAD,EAAG"}',
        ),
        bindings: [],
      },
    ],
  },
  "($splice0) => () => {\n    const tree = $splice0();\n    return tree;\n}",
  '{"version":3,"file":"tree-in-variable.test.jsx","sourceRoot":"","sources":["jsx/tree-in-variable.test.tsx"],"names":[],"mappings":"AAcuB,cAAA,GAAG,EAAE;IAC1B,MAAM,IAAI,GAAG,UAAC,CAAc;IAC5B,OAAO,IAAI,CAAC;AACd,CAAC"}',
);
const heldComponent = cs.create(
  "3cjyucql1m4dw:20:22",
  { params: [{ kind: "splice", value: _jsx(HeldRow, {}), bindings: [] }] },
  "($splice0) => () => {\n    const tree = $splice0();\n    return tree;\n}",
  '{"version":3,"file":"tree-in-variable.test.jsx","sourceRoot":"","sources":["jsx/tree-in-variable.test.tsx"],"names":[],"mappings":"AAmByB,cAAA,GAAG,EAAE;IAC5B,MAAM,IAAI,GAAG,UAAC,CAAgB;IAC9B,OAAO,IAAI,CAAC;AACd,CAAC"}',
);
it("treeInVariable", async (t) => {
  await snapshotCase(
    t,
    "treeInVariable",
    cs.create(
      "3cjyucql1m4dw:29:4",
      {
        params: [
          { kind: "splice", value: heldElement, bindings: [] },
          { kind: "splice", value: heldComponent, bindings: [] },
        ],
      },
      "($splice0, $splice1) => <div>\n      {$splice0()()}\n      {$splice1()()}\n    </div>",
      '{"version":3,"file":"tree-in-variable.test.jsx","sourceRoot":"","sources":["jsx/tree-in-variable.test.tsx"],"names":[],"mappings":"AA4BO,wBAAA,CAAC,GAAG,CACL;MAAA,CAAC,UAAY,EAAE,CACf;MAAA,CAAC,UAAc,EAAE,CACnB;IAAA,EAAE,GAAG,CAAC"}',
    ),
  );
});
