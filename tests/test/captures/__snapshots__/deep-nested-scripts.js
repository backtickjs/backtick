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
      map: '{"version":3,"file":"deep-nested-scripts.test.jsx","sourceRoot":"","sources":["deep-nested-scripts.test.tsx"],"names":[],"mappings":"eAMY,YAAA,IAAI,GAAG,IAAI"}',
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
                  map: '{"version":3,"file":"deep-nested-scripts.test.jsx","sourceRoot":"","sources":["deep-nested-scripts.test.tsx"],"names":[],"mappings":"eAUyD,MAAA,CAAC"}',
                },
              ),
              cs.create(
                "2rqwzcdfi281b:11:61",
                { params: [] },
                {
                  code: "export default () => 2;",
                  map: '{"version":3,"file":"deep-nested-scripts.test.jsx","sourceRoot":"","sources":["deep-nested-scripts.test.tsx"],"names":[],"mappings":"eAUgE,MAAA,CAAC"}',
                },
              ),
            ),
            bindings: [],
          },
        ],
      },
      {
        code: "export default ($0) => $0();",
        map: '{"version":3,"file":"deep-nested-scripts.test.jsx","sourceRoot":"","sources":["deep-nested-scripts.test.tsx"],"names":[],"mappings":"eAUgD,QAAA,IAAC"}',
      },
    ),
  );
});
