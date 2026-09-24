import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function add(lhs, rhs) {
  return cs.create(
    { start: { line: 7, column: 9 }, end: { line: 7, column: 24 } },
    {
      filePath: "captures/deep-nested-scripts.test.tsx",
      fileHash: "2rqwzcdfi281b",
      splices: {
        $lhs: { value: lhs, params: [] },
        $rhs: { value: rhs, params: [] },
      },
      captures: [],
    },
    () => ({
      type: "BinaryExpression",
      loc: { start: { line: 7, column: 12 }, end: { line: 7, column: 23 } },
      operator: "+",
      left: {
        type: "Splice",
        loc: { start: { line: 7, column: 12 }, end: { line: 7, column: 16 } },
        key: "$lhs",
      },
      right: {
        type: "Splice",
        loc: { start: { line: 7, column: 19 }, end: { line: 7, column: 23 } },
        key: "$rhs",
      },
    }),
  );
}
it("deepNestedScripts", async (t) => {
  await snapshotCase(
    t,
    "deepNestedScripts",
    cs.create(
      { start: { line: 11, column: 45 }, end: { line: 11, column: 69 } },
      {
        filePath: "captures/deep-nested-scripts.test.tsx",
        fileHash: "2rqwzcdfi281b",
        splices: {
          $0splice0: {
            value: add(
              cs.create(
                {
                  start: { line: 11, column: 54 },
                  end: { line: 11, column: 59 },
                },
                {
                  filePath: "captures/deep-nested-scripts.test.tsx",
                  fileHash: "2rqwzcdfi281b",
                  splices: {},
                  captures: [],
                },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 11, column: 57 },
                    end: { line: 11, column: 58 },
                  },
                  value: 1,
                }),
              ),
              cs.create(
                {
                  start: { line: 11, column: 61 },
                  end: { line: 11, column: 66 },
                },
                {
                  filePath: "captures/deep-nested-scripts.test.tsx",
                  fileHash: "2rqwzcdfi281b",
                  splices: {},
                  captures: [],
                },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 11, column: 64 },
                    end: { line: 11, column: 65 },
                  },
                  value: 2,
                }),
              ),
            ),
            params: [],
          },
        },
        captures: [],
      },
      () => ({
        type: "Splice",
        loc: { start: { line: 11, column: 48 }, end: { line: 11, column: 68 } },
        key: "$0splice0",
      }),
    ),
  );
});
