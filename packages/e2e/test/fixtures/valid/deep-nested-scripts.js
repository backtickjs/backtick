import { cs } from "@backtickjs/core";
function add(lhs, rhs) {
  return cs.create(
    [4, 10, 4, 25],
    {
      version: "0.0.0",
      filePath: "deep-nested-scripts.ts",
      fileHash: "jmxp905pbgk8",
      kind: "value",
      splices: { $lhs: lhs, $rhs: rhs },
      captures: [],
      declarations: [],
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
  [7, 16, 7, 40],
  {
    version: "0.0.0",
    filePath: "deep-nested-scripts.ts",
    fileHash: "jmxp905pbgk8",
    kind: "value",
    splices: {
      $0splice0: add(
        cs.create(
          [7, 25, 7, 30],
          {
            version: "0.0.0",
            filePath: "deep-nested-scripts.ts",
            fileHash: "jmxp905pbgk8",
            kind: "value",
            splices: {},
            captures: [],
            declarations: [],
          },
          (v) => v.number([7, 28, 7, 29], 1),
        ),
        cs.create(
          [7, 32, 7, 37],
          {
            version: "0.0.0",
            filePath: "deep-nested-scripts.ts",
            fileHash: "jmxp905pbgk8",
            kind: "value",
            splices: {},
            captures: [],
            declarations: [],
          },
          (v) => v.number([7, 35, 7, 36], 2),
        ),
      ),
    },
    captures: [],
    declarations: [],
  },
  (v) => v.splice([7, 19, 7, 39], "$0splice0"),
);
