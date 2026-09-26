import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle evaluated among siblings. What it draws goes where the call stands,
// and nothing of its own does: the spans either side keep their order.
async function Other() {
  return cs.create(
    "az5543lq4fyi:10:9",
    { params: [] },
    {
      code: 'export default () => <em>{"from another bundle"}</em>;',
      map: '{"version":3,"file":"eval-siblings.test.jsx","sourceRoot":"","sources":["eval-siblings.test.tsx"],"names":[],"mappings":"eASY,MAAA,CAAC,EAAE,CAAC,CAAC,qBAAqB,CAAC,EAAE,EAAE,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
const otherBundle = await bundler.run(_jsx(Other, {}), { transform });
it("evalSiblings", async (t) => {
  await snapshotCase(
    t,
    "evalSiblings",
    cs.create(
      "az5543lq4fyi:19:4",
      { params: [{ kind: "splice", value: otherBundle, bindings: [] }] },
      {
        code: "export default ($0) => <div>\n      <span>before</span>\n      {eval($0())}\n      <span>after</span>\n    </div>;",
        map: '{"version":3,"file":"eval-siblings.test.jsx","sourceRoot":"","sources":["eval-siblings.test.tsx"],"names":[],"mappings":"eAkBO,QAAA,CAAC,GAAG,CACL;MAAA,CAAC,IAAI,CAAC,MAAM,EAAE,IAAI,CAClB;MAAA,CAAC,IAAI,CAAC,IAAY,CAAC,CACnB;MAAA,CAAC,IAAI,CAAC,KAAK,EAAE,IAAI,CACnB;IAAA,EAAE,GAAG,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
