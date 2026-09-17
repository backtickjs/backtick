import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The same `cs\`7\`` literal spliced twice is one client script, so it
// collapses into a single function-table entry referenced twice.
const leaf = cs.create(
  [7, 14, 7, 19],
  {
    version: "0.0.0",
    filePath: "splices/deduplicated-scripts.test.tsx",
    fileHash: "2g4us6n03x6jl",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [7, 17, 7, 18],
    value: 7,
  }),
);
it("deduplicatedScripts", async (t) => {
  await snapshotCase(
    t,
    "deduplicatedScripts",
    cs.create(
      [10, 48, 10, 76],
      {
        version: "0.0.0",
        filePath: "splices/deduplicated-scripts.test.tsx",
        fileHash: "2g4us6n03x6jl",
        splices: { $leaf: { value: leaf, params: [] } },
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [10, 52, 10, 74],
        properties: [
          {
            kind: ":",
            loc: [10, 54, 10, 62],
            name: {
              kind: "string",
              loc: [10, 54, 10, 55],
              text: "a",
            },
            initializer: {
              kind: "splice",
              loc: [10, 57, 10, 62],
              key: "$leaf",
            },
          },
          {
            kind: ":",
            loc: [10, 64, 10, 72],
            name: {
              kind: "string",
              loc: [10, 64, 10, 65],
              text: "b",
            },
            initializer: {
              kind: "splice",
              loc: [10, 67, 10, 72],
              key: "$leaf",
            },
          },
        ],
      }),
    ),
  );
});
