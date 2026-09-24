import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The same `cs\`7\`` literal spliced twice is one client script, so it
// collapses into a single function-table entry referenced twice.
const leaf = cs.create(
  { start: { line: 7, column: 13 }, end: { line: 7, column: 18 } },
  {
    version: "0.0.0",
    filePath: "splices/deduplicated-scripts.test.tsx",
    fileHash: "2g4us6n03x6jl",
    splices: {},
    captures: [],
  },
  () => ({
    type: "Literal",
    loc: { start: { line: 7, column: 16 }, end: { line: 7, column: 17 } },
    value: 7,
  }),
);
it("deduplicatedScripts", async (t) => {
  await snapshotCase(
    t,
    "deduplicatedScripts",
    cs.create(
      { start: { line: 10, column: 47 }, end: { line: 10, column: 75 } },
      {
        version: "0.0.0",
        filePath: "splices/deduplicated-scripts.test.tsx",
        fileHash: "2g4us6n03x6jl",
        splices: { $leaf: { value: leaf, params: [] } },
        captures: [],
      },
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
              key: "$leaf",
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
              key: "$leaf",
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
    ),
  );
});
