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
      map: '{"version":3,"mappings":"eAKY,CAAAA,EAAA,EAAAC,EAAA,KAAAD,EAAA,EAAI,GAAGC,EAAA,EAAI","names":["$0","$1"],"ignoreList":[],"sources":["splice-sharing.test.tsx"]}',
      imports: [],
      exportAt: 0,
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
                  map: '{"version":3,"mappings":"eAakB,OAAC","names":[],"ignoreList":[],"sources":["splice-sharing.test.tsx"]}',
                  imports: [],
                  exportAt: 0,
                },
              ),
              cs.create(
                "3cex0hh0qp6qz:14:22",
                { params: [] },
                {
                  code: "export default () => 2;",
                  map: '{"version":3,"mappings":"eAayB,OAAC","names":[],"ignoreList":[],"sources":["splice-sharing.test.tsx"]}',
                  imports: [],
                  exportAt: 0,
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
                  map: '{"version":3,"mappings":"eAckB,OAAC","names":[],"ignoreList":[],"sources":["splice-sharing.test.tsx"]}',
                  imports: [],
                  exportAt: 0,
                },
              ),
              cs.create(
                "3cex0hh0qp6qz:15:22",
                { params: [] },
                {
                  code: "export default () => 4;",
                  map: '{"version":3,"mappings":"eAcyB,OAAC","names":[],"ignoreList":[],"sources":["splice-sharing.test.tsx"]}',
                  imports: [],
                  exportAt: 0,
                },
              ),
            ),
            bindings: [],
          },
        ],
      },
      {
        code: "export default ($0, $1) => ({\n  x: $0(),\n  y: $1()\n});",
        map: '{"version":3,"mappings":"eAYO,CAAAA,EAAA,EAAAC,EAAA,MAAC;EACFC,CAAC,EAAEF,EAAA,EAAC;EACJG,CAAC,EAAEF,EAAA;CACJ,CAAC","names":["$0","$1","x","y"],"ignoreList":[],"sources":["splice-sharing.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
