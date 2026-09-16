import { cs } from "@backtickjs/core";
function add(lhs, rhs) {
  return cs.create(
    [5, 10, 5, 25],
    {
      version: "0.0.0",
      filePath: "deepNestedScripts.tsx",
      fileHash: "pwxof41rn2wd",
      splices: {
        $lhs: { value: lhs, params: [] },
        $rhs: { value: rhs, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "binop",
      loc: [5, 13, 5, 24],
      left: {
        kind: "splice",
        loc: [5, 13, 5, 17],
        key: "$lhs",
      },
      operatorToken: "+",
      right: {
        kind: "splice",
        loc: [5, 20, 5, 24],
        key: "$rhs",
      },
    }),
  );
}
const deepNestedScripts = cs.create(
  [8, 27, 8, 51],
  {
    version: "0.0.0",
    filePath: "deepNestedScripts.tsx",
    fileHash: "pwxof41rn2wd",
    splices: {
      $0splice0: {
        value: add(
          cs.create(
            [8, 36, 8, 41],
            {
              version: "0.0.0",
              filePath: "deepNestedScripts.tsx",
              fileHash: "pwxof41rn2wd",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [8, 39, 8, 40],
              value: 1,
            }),
          ),
          cs.create(
            [8, 43, 8, 48],
            {
              version: "0.0.0",
              filePath: "deepNestedScripts.tsx",
              fileHash: "pwxof41rn2wd",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [8, 46, 8, 47],
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
    loc: [8, 30, 8, 50],
    key: "$0splice0",
  }),
);
