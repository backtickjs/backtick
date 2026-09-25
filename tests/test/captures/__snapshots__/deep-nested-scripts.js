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
    () => ({
      type: "BinaryExpression",
      loc: { start: { line: 7, column: 12 }, end: { line: 7, column: 23 } },
      operator: "+",
      left: {
        type: "Splice",
        loc: { start: { line: 7, column: 12 }, end: { line: 7, column: 16 } },
        param: 0,
      },
      right: {
        type: "Splice",
        loc: { start: { line: 7, column: 19 }, end: { line: 7, column: 23 } },
        param: 1,
      },
    }),
    "export default ($0, $1) => $0() + $1();",
    '{"version":3,"file":"deep-nested-scripts.test.jsx","sourceRoot":"","sources":["deep-nested-scripts.test.tsx"],"names":[],"mappings":"eAMY,YAAA,IAAI,GAAG,IAAI"}',
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
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 11, column: 57 },
                    end: { line: 11, column: 58 },
                  },
                  value: 1,
                }),
                "export default () => 1;",
                '{"version":3,"file":"deep-nested-scripts.test.jsx","sourceRoot":"","sources":["deep-nested-scripts.test.tsx"],"names":[],"mappings":"eAUyD,MAAA,CAAC"}',
              ),
              cs.create(
                "2rqwzcdfi281b:11:61",
                { params: [] },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 11, column: 64 },
                    end: { line: 11, column: 65 },
                  },
                  value: 2,
                }),
                "export default () => 2;",
                '{"version":3,"file":"deep-nested-scripts.test.jsx","sourceRoot":"","sources":["deep-nested-scripts.test.tsx"],"names":[],"mappings":"eAUgE,MAAA,CAAC"}',
              ),
            ),
            bindings: [],
          },
        ],
      },
      () => ({
        type: "Splice",
        loc: { start: { line: 11, column: 48 }, end: { line: 11, column: 68 } },
        param: 0,
      }),
      "export default ($0) => $0();",
      '{"version":3,"file":"deep-nested-scripts.test.jsx","sourceRoot":"","sources":["deep-nested-scripts.test.tsx"],"names":[],"mappings":"eAUgD,QAAA,IAAC"}',
    ),
  );
});
