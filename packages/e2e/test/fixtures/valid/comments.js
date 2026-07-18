import { cs } from "@backtickjs/core";
// Comments in a client script are trivia: they survive formatting but are
// dropped from the virtual code and the bundle.
export default cs.create(
  [5, 16, 17, 3],
  {
    filePath: "comments.ts",
    fileHash: "rbes3su3s43l",
    splices: {},
    captures: [],
    declarations: ["count$rbes3su3s43l$0"],
  },
  (v) =>
    v.block(
      [5, 19, 17, 2],
      [
        v.variableDeclaration(
          [7, 3, 7, 19],
          "const",
          v.identifier([7, 9, 7, 14], "count", "count$rbes3su3s43l$0"),
          v.number([7, 17, 7, 18], 1),
        ),
        v.if(
          [9, 3, 12, 4],
          v.binop(
            [9, 7, 9, 18],
            v.identifier([9, 7, 9, 12], "count", "count$rbes3su3s43l$0"),
            "===",
            v.number([9, 17, 9, 18], 1),
          ),
          v.block(
            [9, 20, 12, 4],
            [v.return([11, 5, 11, 18], v.string([11, 12, 11, 17], "one"))],
          ),
          null,
        ),
        v.return([16, 3, 16, 17], v.string([16, 10, 16, 16], "many")),
      ],
    ),
);
