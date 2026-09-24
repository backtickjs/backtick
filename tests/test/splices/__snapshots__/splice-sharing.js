import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function add(lhs, rhs) {
  return cs.create(
    "3cex0hh0qp6qz:6:9",
    {
      splices: {
        $lhs: { value: lhs, params: [] },
        $rhs: { value: rhs, params: [] },
      },
      captures: [],
    },
    () => ({
      type: "BinaryExpression",
      loc: { start: { line: 6, column: 12 }, end: { line: 6, column: 23 } },
      operator: "+",
      left: {
        type: "Splice",
        loc: { start: { line: 6, column: 12 }, end: { line: 6, column: 16 } },
        key: "$lhs",
      },
      right: {
        type: "Splice",
        loc: { start: { line: 6, column: 19 }, end: { line: 6, column: 23 } },
        key: "$rhs",
      },
    }),
    "($0, $1) => $0() + $1()",
    '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splice-sharing.test.tsx"],"names":[],"mappings":"AAKY,YAAA,IAAI,GAAG,IAAI,CAAA"}',
  );
}
it("spliceSharing", async (t) => {
  await snapshotCase(
    t,
    "spliceSharing",
    cs.create(
      "3cex0hh0qp6qz:13:4",
      {
        splices: {
          $0splice0: {
            value: add(
              cs.create(
                "3cex0hh0qp6qz:14:15",
                { splices: {}, captures: [] },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 18 },
                    end: { line: 14, column: 19 },
                  },
                  value: 1,
                }),
                "() => 1",
                '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splice-sharing.test.tsx"],"names":[],"mappings":"AAakB,MAAA,CAAC,CAAA"}',
              ),
              cs.create(
                "3cex0hh0qp6qz:14:22",
                { splices: {}, captures: [] },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 25 },
                    end: { line: 14, column: 26 },
                  },
                  value: 2,
                }),
                "() => 2",
                '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splice-sharing.test.tsx"],"names":[],"mappings":"AAayB,MAAA,CAAC,CAAA"}',
              ),
            ),
            params: [],
          },
          $0splice1: {
            value: add(
              cs.create(
                "3cex0hh0qp6qz:15:15",
                { splices: {}, captures: [] },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 15, column: 18 },
                    end: { line: 15, column: 19 },
                  },
                  value: 3,
                }),
                "() => 3",
                '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splice-sharing.test.tsx"],"names":[],"mappings":"AAckB,MAAA,CAAC,CAAA"}',
              ),
              cs.create(
                "3cex0hh0qp6qz:15:22",
                { splices: {}, captures: [] },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 15, column: 25 },
                    end: { line: 15, column: 26 },
                  },
                  value: 4,
                }),
                "() => 4",
                '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splice-sharing.test.tsx"],"names":[],"mappings":"AAcyB,MAAA,CAAC,CAAA"}',
              ),
            ),
            params: [],
          },
        },
        captures: [],
      },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 13, column: 8 }, end: { line: 16, column: 5 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 29 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 14, column: 6 },
                end: { line: 14, column: 7 },
              },
              name: "x",
            },
            value: {
              type: "Splice",
              loc: {
                start: { line: 14, column: 9 },
                end: { line: 14, column: 29 },
              },
              key: "$0splice0",
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 15, column: 29 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 15, column: 6 },
                end: { line: 15, column: 7 },
              },
              name: "y",
            },
            value: {
              type: "Splice",
              loc: {
                start: { line: 15, column: 9 },
                end: { line: 15, column: 29 },
              },
              key: "$0splice1",
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
      "($0, $1) => ({\n    x: $0(),\n    y: $1(),\n})",
      '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splice-sharing.test.tsx"],"names":[],"mappings":"AAYO,YAAA,CAAC;IACF,CAAC,EAAE,IAAC;IACJ,CAAC,EAAE,IAAC;CACL,CAAC,CAAA"}',
    ),
  );
});
