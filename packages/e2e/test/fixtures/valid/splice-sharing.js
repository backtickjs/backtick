import { cs } from "@backtickjs/core";
function add(lhs, rhs) {
  return cs.create(
    [4, 10, 4, 25],
    {
      version: "0.0.0",
      filePath: "splice-sharing.ts",
      fileHash: "2veya8r3aoo5f",
      kind: "value",
      splices: { $lhs: lhs, $rhs: rhs },
      captures: [],
      spliceScopes: { $lhs: [], $rhs: [] },
    },
    (v) =>
      v.binop(
        [4, 13, 4, 24],
        v.splice([4, 13, 4, 17], "$lhs"),
        "+",
        v.splice([4, 20, 4, 24], "$rhs"),
      ),
  );
}
export default cs.create(
  [7, 16, 10, 4],
  {
    version: "0.0.0",
    filePath: "splice-sharing.ts",
    fileHash: "2veya8r3aoo5f",
    kind: "value",
    splices: {
      $0splice0: add(
        cs.create(
          [8, 12, 8, 17],
          {
            version: "0.0.0",
            filePath: "splice-sharing.ts",
            fileHash: "2veya8r3aoo5f",
            kind: "value",
            splices: {},
            captures: [],
            spliceScopes: {},
          },
          (v) => v.number([8, 15, 8, 16], 1),
        ),
        cs.create(
          [8, 19, 8, 24],
          {
            version: "0.0.0",
            filePath: "splice-sharing.ts",
            fileHash: "2veya8r3aoo5f",
            kind: "value",
            splices: {},
            captures: [],
            spliceScopes: {},
          },
          (v) => v.number([8, 22, 8, 23], 2),
        ),
      ),
      $0splice1: add(
        cs.create(
          [9, 12, 9, 17],
          {
            version: "0.0.0",
            filePath: "splice-sharing.ts",
            fileHash: "2veya8r3aoo5f",
            kind: "value",
            splices: {},
            captures: [],
            spliceScopes: {},
          },
          (v) => v.number([9, 15, 9, 16], 3),
        ),
        cs.create(
          [9, 19, 9, 24],
          {
            version: "0.0.0",
            filePath: "splice-sharing.ts",
            fileHash: "2veya8r3aoo5f",
            kind: "value",
            splices: {},
            captures: [],
            spliceScopes: {},
          },
          (v) => v.number([9, 22, 9, 23], 4),
        ),
      ),
    },
    captures: [],
    spliceScopes: { $0splice0: [], $0splice1: [] },
  },
  (v) =>
    v.object([7, 20, 10, 2], {
      x: v.splice([8, 6, 8, 26], "$0splice0"),
      y: v.splice([9, 6, 9, 26], "$0splice1"),
    }),
);
