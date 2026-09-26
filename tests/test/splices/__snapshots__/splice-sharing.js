import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function add(lhs, rhs) {
  return cs.create(
    "3cex0hh0qp6qz:6:9",
    {
      params: [
        { kind: "splice", value: lhs, bindings: [] },
        { kind: "splice", value: rhs, bindings: [] },
      ],
    },
    "($splice0, $splice1) => $splice0() + $splice1()",
    '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splices/splice-sharing.test.tsx"],"names":[],"mappings":"AAKY,wBAAA,UAAI,GAAG,UAAI"}',
  );
}
it("spliceSharing", async (t) => {
  await snapshotCase(
    t,
    "spliceSharing",
    cs.create(
      "3cex0hh0qp6qz:13:4",
      {
        params: [
          {
            kind: "splice",
            value: add(
              cs.create(
                "3cex0hh0qp6qz:14:15",
                { params: [] },
                "() => 1",
                '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splices/splice-sharing.test.tsx"],"names":[],"mappings":"AAakB,MAAA,CAAC"}',
              ),
              cs.create(
                "3cex0hh0qp6qz:14:22",
                { params: [] },
                "() => 2",
                '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splices/splice-sharing.test.tsx"],"names":[],"mappings":"AAayB,MAAA,CAAC"}',
              ),
            ),
            bindings: [],
          },
          {
            kind: "splice",
            value: add(
              cs.create(
                "3cex0hh0qp6qz:15:15",
                { params: [] },
                "() => 3",
                '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splices/splice-sharing.test.tsx"],"names":[],"mappings":"AAckB,MAAA,CAAC"}',
              ),
              cs.create(
                "3cex0hh0qp6qz:15:22",
                { params: [] },
                "() => 4",
                '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splices/splice-sharing.test.tsx"],"names":[],"mappings":"AAcyB,MAAA,CAAC"}',
              ),
            ),
            bindings: [],
          },
        ],
      },
      "($splice0, $splice1) => ({\n    x: $splice0(),\n    y: $splice1(),\n})",
      '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splices/splice-sharing.test.tsx"],"names":[],"mappings":"AAYO,wBAAA,CAAC;IACF,CAAC,EAAE,UAAC;IACJ,CAAC,EAAE,UAAC;CACL,CAAC"}',
    ),
  );
});
