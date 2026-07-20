import { cs } from "@backtickjs/core";
// A value script that misses a `return` on some path fails the `cs.value`
// root: the `undefined` in its inferred type is the missing path.
export const partial = cs.create(
  [5, 24, 10, 3],
  {
    filePath: "partial-return-script.ts",
    fileHash: "1jvjzs327nvo3",
    splices: {},
    captures: [],
    declarations: ["n$1jvjzs327nvo3$0"],
  },
  (v) =>
    v.block(
      [5, 27, 10, 2],
      [
        v.variableDeclaration(
          [6, 3, 6, 13],
          "let",
          v.identifier([6, 7, 6, 8], "n", "n$1jvjzs327nvo3$0"),
          v.number([6, 11, 6, 12], 1),
        ),
        v.if(
          [7, 3, 9, 4],
          v.binop(
            [7, 7, 7, 14],
            v.identifier([7, 7, 7, 8], "n", "n$1jvjzs327nvo3$0"),
            "===",
            v.number([7, 13, 7, 14], 2),
          ),
          v.block(
            [7, 16, 9, 4],
            [v.return([8, 5, 8, 19], v.string([8, 12, 8, 18], "some"))],
          ),
          null,
        ),
      ],
    ),
);
