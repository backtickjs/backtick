import { cs } from "@backtickjs/core";
// A bare `return` exits an action early; the completion is null either way.
export default cs.create(
  [4, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "early-return.ts",
    fileHash: "3slc08eszz0br",
    kind: "action",
    splices: {},
    captures: [],
    declarations: ["n$3slc08eszz0br$0"],
    spliceScopes: {},
  },
  (v) =>
    v.block(
      [4, 19, 10, 2],
      [
        v.variableDeclaration(
          [5, 3, 5, 13],
          "let",
          v.identifier([5, 7, 5, 8], "n", "n$3slc08eszz0br$0"),
          v.number([5, 11, 5, 12], 0),
        ),
        v.if(
          [6, 3, 8, 4],
          v.binop(
            [6, 7, 6, 14],
            v.identifier([6, 7, 6, 8], "n", "n$3slc08eszz0br$0"),
            "===",
            v.number([6, 13, 6, 14], 0),
          ),
          v.block(
            [6, 16, 8, 4],
            [v.return([7, 5, 7, 12], v.null([7, 5, 7, 12]))],
          ),
          null,
        ),
        v.assignment(
          [9, 3, 9, 8],
          v.identifier([9, 3, 9, 4], "n", "n$3slc08eszz0br$0"),
          v.number([9, 7, 9, 8], 1),
        ),
      ],
    ),
);
