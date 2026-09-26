import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The same `cs\`7\`` literal spliced twice is one client script, so it
// collapses into a single function-table entry referenced twice.
const leaf = cs.create(
  "2g4us6n03x6jl:7:13",
  { params: [] },
  () => ({
    type: "Literal",
    loc: { start: { line: 7, column: 16 }, end: { line: 7, column: 17 } },
    value: 7,
  }),
  {
    code: "export default () => 7;",
    map: '{"version":3,"file":"deduplicated-scripts.test.jsx","sourceRoot":"","sources":["deduplicated-scripts.test.tsx"],"names":[],"mappings":"eAMgB,MAAA,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
it("deduplicatedScripts", async (t) => {
  await snapshotCase(
    t,
    "deduplicatedScripts",
    cs.create(
      "2g4us6n03x6jl:10:47",
      { params: [{ kind: "splice", value: leaf, bindings: [] }] },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 10, column: 51 }, end: { line: 10, column: 73 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 10, column: 53 },
              end: { line: 10, column: 61 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 10, column: 53 },
                end: { line: 10, column: 54 },
              },
              name: "a",
            },
            value: {
              type: "Splice",
              loc: {
                start: { line: 10, column: 56 },
                end: { line: 10, column: 61 },
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
              start: { line: 10, column: 63 },
              end: { line: 10, column: 71 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 10, column: 63 },
                end: { line: 10, column: 64 },
              },
              name: "b",
            },
            value: {
              type: "Splice",
              loc: {
                start: { line: 10, column: 66 },
                end: { line: 10, column: 71 },
              },
              param: 0,
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
      {
        code: "export default ($0) => ({ a: $0(), b: $0() });",
        map: '{"version":3,"file":"deduplicated-scripts.test.jsx","sourceRoot":"","sources":["deduplicated-scripts.test.tsx"],"names":[],"mappings":"eASkD,QAAA,CAAC,EAAE,CAAC,EAAE,IAAK,EAAE,CAAC,EAAE,IAAK,EAAE,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
