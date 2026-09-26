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
    {
      code: "export default ($0, $1) => $0() + $1();",
      map: '{"version":3,"mappings":"eAMY,CAAAA,EAAA,EAAAC,EAAA,KAAAD,EAAA,EAAI,GAAGC,EAAA,EAAI","names":["$0","$1"],"ignoreList":[],"sources":["deep-nested-scripts.test.tsx"]}',
      imports: [],
      exportAt: 0,
    },
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
                {
                  code: "export default () => 1;",
                  map: '{"version":3,"mappings":"eAUyD,OAAC","names":[],"ignoreList":[],"sources":["deep-nested-scripts.test.tsx"]}',
                  imports: [],
                  exportAt: 0,
                },
              ),
              cs.create(
                "2rqwzcdfi281b:11:61",
                { params: [] },
                {
                  code: "export default () => 2;",
                  map: '{"version":3,"mappings":"eAUgE,OAAC","names":[],"ignoreList":[],"sources":["deep-nested-scripts.test.tsx"]}',
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
        code: "export default $0 => $0();",
        map: '{"version":3,"mappings":"eAUgDA,EAAA,IAAAA,EAAA,EAAC","names":["$0"],"ignoreList":[],"sources":["deep-nested-scripts.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
