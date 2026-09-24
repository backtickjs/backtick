import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Splices evaluate when the `cs` expression does, left to right in source
// order, like a real template literal's spans — braced and unbraced alike:
// the `$count` read sees 0 before `${++count}` bumps it to 1.
let count = 0;
it("spliceOrder", async (t) => {
  await snapshotCase(
    t,
    "spliceOrder",
    cs.create(
      { start: { line: 11, column: 39 }, end: { line: 11, column: 73 } },
      {
        filePath: "splices/splice-order.test.tsx",
        fileHash: "355ehjmpryw82",
        splices: {
          $count: { value: count, params: [] },
          $0splice0: { value: ++count, params: [] },
        },
        captures: [],
      },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 11, column: 43 }, end: { line: 11, column: 71 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 11, column: 45 },
              end: { line: 11, column: 54 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 11, column: 45 },
                end: { line: 11, column: 46 },
              },
              name: "a",
            },
            value: {
              type: "Splice",
              loc: {
                start: { line: 11, column: 48 },
                end: { line: 11, column: 54 },
              },
              key: "$count",
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
          {
            type: "Property",
            loc: {
              start: { line: 11, column: 56 },
              end: { line: 11, column: 69 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 11, column: 56 },
                end: { line: 11, column: 57 },
              },
              name: "b",
            },
            value: {
              type: "Splice",
              loc: {
                start: { line: 11, column: 59 },
                end: { line: 11, column: 69 },
              },
              key: "$0splice0",
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
      "($0, $1) => ({ a: $0(), b: $1() })",
      '{"version":3,"file":"splice-order.test.jsx","sourceRoot":"","sources":["splice-order.test.tsx"],"names":[],"mappings":"AAU0C,YAAA,CAAC,EAAE,CAAC,EAAE,IAAM,EAAE,CAAC,EAAE,IAAC,EAAW,CAAC,CAAA"}',
    ),
  );
});
