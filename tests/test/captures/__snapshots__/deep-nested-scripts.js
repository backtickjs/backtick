import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
function add(lhs, rhs) {
  return cs.create(
    [7, 10, 7, 25],
    {
      version: "0.0.0",
      filePath: "captures/deep-nested-scripts.test.tsx",
      fileHash: "2rqwzcdfi281b",
      splices: {
        $lhs: { value: lhs, params: [] },
        $rhs: { value: rhs, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "binop",
      loc: [7, 13, 7, 24],
      left: {
        kind: "splice",
        loc: [7, 13, 7, 17],
        key: "$lhs",
      },
      operatorToken: "+",
      right: {
        kind: "splice",
        loc: [7, 20, 7, 24],
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
      [11, 46, 11, 70],
      {
        version: "0.0.0",
        filePath: "captures/deep-nested-scripts.test.tsx",
        fileHash: "2rqwzcdfi281b",
        splices: {
          $0splice0: {
            value: add(
              cs.create(
                [11, 55, 11, 60],
                {
                  version: "0.0.0",
                  filePath: "captures/deep-nested-scripts.test.tsx",
                  fileHash: "2rqwzcdfi281b",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [11, 58, 11, 59],
                  value: 1,
                }),
              ),
              cs.create(
                [11, 62, 11, 67],
                {
                  version: "0.0.0",
                  filePath: "captures/deep-nested-scripts.test.tsx",
                  fileHash: "2rqwzcdfi281b",
                  splices: {},
                  captures: [],
                },
                () => ({
                  kind: "number",
                  loc: [11, 65, 11, 66],
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
        kind: "splice",
        loc: [11, 49, 11, 69],
        key: "$0splice0",
      }),
    ),
  );
});
