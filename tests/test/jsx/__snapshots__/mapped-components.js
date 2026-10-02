import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const componentLabels = ["alpha", "beta", "gamma"];
async function Row({ label }) {
  return cs.create(
    "3muqirg3sfmdb:8:9",
    { params: [{ kind: "splice", value: label, bindings: [] }] },
    "($splice0) => <span>{$splice0()}</span>",
    '{"version":3,"file":"mapped-components.test.jsx","sourceRoot":"","sources":["jsx/mapped-components.test.tsx"],"names":[],"mappings":"AAOY,cAAA,CAAC,IAAI,CAAC,CAAC,UAAM,CAAC,EAAE,IAAI,CAAC"}',
  );
}
// The same list, but each item is a component invocation rather than an
// element. Every invocation is an instance, so each gets a tree entry of its
// own and the key rides the `#apply` that instantiates it — the contrast with
// `mappedElements`, where the key sits inside an inlined element instead.
it("mappedComponents", async (t) => {
  await snapshotCase(
    t,
    "mappedComponents",
    cs.create(
      "3muqirg3sfmdb:19:4",
      {
        params: [
          {
            kind: "splice",
            value: componentLabels.map((item) => _jsx(Row, { label: item })),
            bindings: [],
          },
        ],
      },
      "($splice0) => <div>{$splice0()}</div>",
      '{"version":3,"file":"mapped-components.test.jsx","sourceRoot":"","sources":["jsx/mapped-components.test.tsx"],"names":[],"mappings":"AAkBO,cAAA,CAAC,GAAG,CAAC,CAAC,UAAsD,CAAC,EAAE,GAAG,CAAC"}',
    ),
  );
});
