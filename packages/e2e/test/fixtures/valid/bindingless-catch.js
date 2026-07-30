import { cs } from "@backtickjs/core";
// A `catch` without a binding: the try node's `param` is null and the
// handler runs with no new binding in scope.
export default cs.create(
  [5, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "bindingless-catch.ts",
    fileHash: "1jo3526bq0xmc",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [5, 19, 11, 2],
      [
        v.tryStatement(
          [6, 3, 10, 4],
          v.block(
            [6, 7, 8, 4],
            [
              v.throwStatement(
                [7, 5, 7, 18],
                v.stringLiteral([7, 11, 7, 17], "boom"),
              ),
            ],
          ),
          v.catchClause(
            [8, 5, 10, 4],
            null,
            v.block(
              [8, 11, 10, 4],
              [
                v.returnStatement(
                  [9, 5, 9, 21],
                  v.stringLiteral([9, 12, 9, 20], "caught"),
                ),
              ],
            ),
          ),
        ),
      ],
    ),
);
