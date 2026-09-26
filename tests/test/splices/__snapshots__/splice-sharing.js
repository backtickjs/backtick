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
    {
      code: "export default ($0, $1) => $0() + $1();",
      map: '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splices/splice-sharing.test.tsx"],"names":[],"mappings":"eAKY,YAAA,IAAI,GAAG,IAAI"}',
    },
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
                {
                  code: "export default () => 1;",
                  map: '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splices/splice-sharing.test.tsx"],"names":[],"mappings":"eAakB,MAAA,CAAC"}',
                },
              ),
              cs.create(
                "3cex0hh0qp6qz:14:22",
                { params: [] },
                {
                  code: "export default () => 2;",
                  map: '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splices/splice-sharing.test.tsx"],"names":[],"mappings":"eAayB,MAAA,CAAC"}',
                },
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
                {
                  code: "export default () => 3;",
                  map: '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splices/splice-sharing.test.tsx"],"names":[],"mappings":"eAckB,MAAA,CAAC"}',
                },
              ),
              cs.create(
                "3cex0hh0qp6qz:15:22",
                { params: [] },
                {
                  code: "export default () => 4;",
                  map: '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splices/splice-sharing.test.tsx"],"names":[],"mappings":"eAcyB,MAAA,CAAC"}',
                },
              ),
            ),
            bindings: [],
          },
        ],
      },
      {
        code: "export default ($0, $1) => ({\n    x: $0(),\n    y: $1(),\n});",
        map: '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splices/splice-sharing.test.tsx"],"names":[],"mappings":"eAYO,YAAA,CAAC;IACF,CAAC,EAAE,IAAC;IACJ,CAAC,EAAE,IAAC;CACL,CAAC"}',
      },
    ),
  );
});
