import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function add(lhs, rhs) {
  return cs.create(
    "2rqwzcdfi281b:7:9",
    {
      params: [
        { kind: "splice", value: lhs, bindings: [] },
        { kind: "splice", value: rhs, bindings: [] },
      ],
    },
    "($0, $1) => $0() + $1()",
    '{"version":3,"file":"deep-nested-scripts.test.jsx","sourceRoot":"","sources":["captures/deep-nested-scripts.test.tsx"],"names":[],"mappings":"AAMY,YAAA,IAAI,GAAG,IAAI"}',
  );
}
it("deepNestedScripts", async (t) => {
  await snapshotCase(
    t,
    "deepNestedScripts",
    cs.create(
      "2rqwzcdfi281b:11:45",
      {
        params: [
          {
            kind: "splice",
            value: add(
              cs.create(
                "2rqwzcdfi281b:11:54",
                { params: [] },
                "() => 1",
                '{"version":3,"file":"deep-nested-scripts.test.jsx","sourceRoot":"","sources":["captures/deep-nested-scripts.test.tsx"],"names":[],"mappings":"AAUyD,MAAA,CAAC"}',
              ),
              cs.create(
                "2rqwzcdfi281b:11:61",
                { params: [] },
                "() => 2",
                '{"version":3,"file":"deep-nested-scripts.test.jsx","sourceRoot":"","sources":["captures/deep-nested-scripts.test.tsx"],"names":[],"mappings":"AAUgE,MAAA,CAAC"}',
              ),
            ),
            bindings: [],
          },
        ],
      },
      "($0) => $0()",
      '{"version":3,"file":"deep-nested-scripts.test.jsx","sourceRoot":"","sources":["captures/deep-nested-scripts.test.tsx"],"names":[],"mappings":"AAUgD,QAAA,IAAC"}',
    ),
  );
});
