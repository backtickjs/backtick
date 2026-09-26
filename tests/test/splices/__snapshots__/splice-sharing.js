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
    () => ({
      type: "BinaryExpression",
      loc: { start: { line: 6, column: 12 }, end: { line: 6, column: 23 } },
      operator: "+",
      left: {
        type: "Splice",
        loc: { start: { line: 6, column: 12 }, end: { line: 6, column: 16 } },
        param: 0,
      },
      right: {
        type: "Splice",
        loc: { start: { line: 6, column: 19 }, end: { line: 6, column: 23 } },
        param: 1,
      },
    }),
    {
      code: "export default ($0, $1) => $0() + $1();",
      map: '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splice-sharing.test.tsx"],"names":[],"mappings":"eAKY,YAAA,IAAI,GAAG,IAAI"}',
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
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 18 },
                    end: { line: 14, column: 19 },
                  },
                  value: 1,
                }),
                {
                  code: "export default () => 1;",
                  map: '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splice-sharing.test.tsx"],"names":[],"mappings":"eAakB,MAAA,CAAC"}',
                },
              ),
              cs.create(
                "3cex0hh0qp6qz:14:22",
                { params: [] },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 25 },
                    end: { line: 14, column: 26 },
                  },
                  value: 2,
                }),
                {
                  code: "export default () => 2;",
                  map: '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splice-sharing.test.tsx"],"names":[],"mappings":"eAayB,MAAA,CAAC"}',
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
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 15, column: 18 },
                    end: { line: 15, column: 19 },
                  },
                  value: 3,
                }),
                {
                  code: "export default () => 3;",
                  map: '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splice-sharing.test.tsx"],"names":[],"mappings":"eAckB,MAAA,CAAC"}',
                },
              ),
              cs.create(
                "3cex0hh0qp6qz:15:22",
                { params: [] },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 15, column: 25 },
                    end: { line: 15, column: 26 },
                  },
                  value: 4,
                }),
                {
                  code: "export default () => 4;",
                  map: '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splice-sharing.test.tsx"],"names":[],"mappings":"eAcyB,MAAA,CAAC"}',
                },
              ),
            ),
            bindings: [],
          },
        ],
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
              param: 0,
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
              param: 1,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
      {
        code: "export default ($0, $1) => ({\n    x: $0(),\n    y: $1(),\n});",
        map: '{"version":3,"file":"splice-sharing.test.jsx","sourceRoot":"","sources":["splice-sharing.test.tsx"],"names":[],"mappings":"eAYO,YAAA,CAAC;IACF,CAAC,EAAE,IAAC;IACJ,CAAC,EAAE,IAAC;CACL,CAAC"}',
      },
    ),
  );
});
