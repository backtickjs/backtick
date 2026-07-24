import { cs } from "@backtickjs/core";
export default cs.create(
  [3, 16, 6, 3],
  {
    version: "0.0.0",
    filePath: "shadowing.ts",
    fileHash: "wjl0rp4901n3",
    kind: "value",
    splices: {
      $0splice0: add(
        cs.create(
          [5, 16, 5, 25],
          {
            version: "0.0.0",
            filePath: "shadowing.ts",
            fileHash: "wjl0rp4901n3",
            kind: "value",
            splices: {},
            captures: ["total$wjl0rp4901n3$0"],
            declarations: [],
          },
          (v) => v.identifier([5, 19, 5, 24], "total", "total$wjl0rp4901n3$0"),
        ),
        100,
      ),
    },
    captures: [],
    declarations: ["total$wjl0rp4901n3$0"],
  },
  (v) =>
    v.block(
      [3, 19, 6, 2],
      [
        v.variableDeclaration(
          [4, 3, 4, 19],
          "const",
          v.identifier([4, 9, 4, 14], "total", "total$wjl0rp4901n3$0"),
          v.number([4, 17, 4, 18], 1),
        ),
        v.return([5, 3, 5, 33], v.splice([5, 10, 5, 32], "$0splice0")),
      ],
    ),
);
function add(lhs, rhs) {
  return cs.create(
    [9, 10, 14, 5],
    {
      version: "0.0.0",
      filePath: "shadowing.ts",
      fileHash: "wjl0rp4901n3",
      kind: "value",
      splices: { $lhs: lhs, $rhs: rhs },
      captures: [],
      declarations: ["total$wjl0rp4901n3$1"],
    },
    (v) =>
      v.block(
        [9, 13, 14, 4],
        [
          v.variableDeclaration(
            [10, 5, 10, 19],
            "let",
            v.identifier([10, 9, 10, 14], "total", "total$wjl0rp4901n3$1"),
            v.number([10, 17, 10, 18], 0),
          ),
          v.assignment(
            [11, 5, 11, 25],
            v.identifier([11, 5, 11, 10], "total", "total$wjl0rp4901n3$1"),
            v.binop(
              [11, 13, 11, 25],
              v.identifier([11, 13, 11, 18], "total", "total$wjl0rp4901n3$1"),
              "+",
              v.splice([11, 21, 11, 25], "$lhs"),
            ),
          ),
          v.assignment(
            [12, 5, 12, 25],
            v.identifier([12, 5, 12, 10], "total", "total$wjl0rp4901n3$1"),
            v.binop(
              [12, 13, 12, 25],
              v.identifier([12, 13, 12, 18], "total", "total$wjl0rp4901n3$1"),
              "+",
              v.splice([12, 21, 12, 25], "$rhs"),
            ),
          ),
          v.return(
            [13, 5, 13, 18],
            v.identifier([13, 12, 13, 17], "total", "total$wjl0rp4901n3$1"),
          ),
        ],
      ),
  );
}
