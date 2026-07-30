import { cs } from "@backtickjs/core";
// A `for` condition is a boolean like every other condition, header or not.
export default cs.create(
  [4, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "non-boolean-for-condition.ts",
    fileHash: "2gfrnuray6h4d",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrow(
      [4, 19, 10, 2],
      [v.identifier([4, 20, 4, 21], "n", "n$2gfrnuray6h4d$0")],
      v.block(
        [4, 34, 10, 2],
        [
          v.variableDeclaration(
            [5, 3, 5, 16],
            "let",
            v.identifier([5, 7, 5, 11], "last", "last$2gfrnuray6h4d$1"),
            v.number([5, 14, 5, 15], 0),
          ),
          v.for(
            [6, 3, 8, 4],
            v.variableDeclaration(
              [6, 8, 6, 17],
              "let",
              v.identifier([6, 12, 6, 13], "i", "i$2gfrnuray6h4d$2"),
              v.identifier([6, 16, 6, 17], "n", "n$2gfrnuray6h4d$0"),
            ),
            v.identifier([6, 19, 6, 20], "i", "i$2gfrnuray6h4d$2"),
            v.assignment(
              [6, 22, 6, 31],
              v.identifier([6, 22, 6, 23], "i", "i$2gfrnuray6h4d$2"),
              v.binop(
                [6, 26, 6, 31],
                v.identifier([6, 26, 6, 27], "i", "i$2gfrnuray6h4d$2"),
                "-",
                v.number([6, 30, 6, 31], 1),
              ),
            ),
            v.block(
              [6, 33, 8, 4],
              [
                v.assignment(
                  [7, 5, 7, 13],
                  v.identifier([7, 5, 7, 9], "last", "last$2gfrnuray6h4d$1"),
                  v.identifier([7, 12, 7, 13], "i", "i$2gfrnuray6h4d$2"),
                ),
              ],
            ),
          ),
          v.return(
            [9, 3, 9, 15],
            v.identifier([9, 10, 9, 14], "last", "last$2gfrnuray6h4d$1"),
          ),
        ],
      ),
    ),
);
