import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A server component can render nothing. The invocation is still an instance —
// it owns the cells the component declared, and a re-render can give it a child
// later — so it keeps a tree entry of its own, with null content.
async function Absent() {
  return null;
}
it("rendersNothing", async (t) => {
  await snapshotCase(
    t,
    "rendersNothing",
    cs.create(
      "10057hli8r1op:13:42",
      { params: [{ kind: "splice", value: _jsx(Absent, {}), bindings: [] }] },
      "($splice0) => <div>{$splice0()}</div>",
      '{"version":3,"file":"renders-nothing.test.jsx","sourceRoot":"","sources":["components/renders-nothing.test.tsx"],"names":[],"mappings":"AAY6C,cAAA,CAAC,GAAG,CAAC,CAAC,UAAe,CAAC,EAAE,GAAG,CAAC"}',
    ),
  );
});
