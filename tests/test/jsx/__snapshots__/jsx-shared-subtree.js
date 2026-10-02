import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const shared = cs.create(
  "3f0us4dfufikl:5:15",
  { params: [] },
  "() => <span>hi</span>",
  '{"version":3,"file":"jsx-shared-subtree.test.jsx","sourceRoot":"","sources":["jsx/jsx-shared-subtree.test.tsx"],"names":[],"mappings":"AAIkB,MAAA,CAAC,IAAI,CAAC,EAAE,EAAE,IAAI,CAAC"}',
);
// The same script spliced twice is declared once in the bundle, and called
// where each splice stands.
it("jsxSharedSubtree", async (t) => {
  await snapshotCase(
    t,
    "jsxSharedSubtree",
    cs.create(
      "3f0us4dfufikl:13:4",
      { params: [{ kind: "splice", value: [shared, shared], bindings: [] }] },
      "($splice0) => <div>{$splice0()}</div>",
      '{"version":3,"file":"jsx-shared-subtree.test.jsx","sourceRoot":"","sources":["jsx/jsx-shared-subtree.test.tsx"],"names":[],"mappings":"AAYO,cAAA,CAAC,GAAG,CAAC,CAAC,UAAmB,CAAC,EAAE,GAAG,CAAC"}',
    ),
  );
});
