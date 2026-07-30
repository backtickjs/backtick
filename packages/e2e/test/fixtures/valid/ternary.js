import { cs } from "@backtickjs/core";
// `?:` tests a boolean — no truthiness — evaluates only the taken branch,
// and its condition narrows like an `if`'s.
const pick = cs.create(
  [5, 14, 7, 3],
  {
    version: "0.0.0",
    filePath: "ternary.ts",
    fileHash: "2bgu1tn5wjo9o",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.arrowFunction(
      [5, 17, 7, 2],
      [v.identifier([5, 18, 5, 19], "n", "n$2bgu1tn5wjo9o$0")],
      v.block(
        [5, 39, 7, 2],
        [
          v.returnStatement(
            [6, 3, 6, 33],
            v.conditionalExpression(
              [6, 10, 6, 32],
              v.binaryExpression(
                [6, 10, 6, 20],
                v.identifier([6, 10, 6, 11], "n", "n$2bgu1tn5wjo9o$0"),
                "===",
                v.nullLiteral([6, 16, 6, 20]),
              ),
              v.numericLiteral([6, 23, 6, 24], 0),
              v.binaryExpression(
                [6, 27, 6, 32],
                v.identifier([6, 27, 6, 28], "n", "n$2bgu1tn5wjo9o$0"),
                "+",
                v.numericLiteral([6, 31, 6, 32], 1),
              ),
            ),
          ),
        ],
      ),
    ),
);
export default cs.create(
  [9, 16, 12, 4],
  {
    version: "0.0.0",
    filePath: "ternary.ts",
    fileHash: "2bgu1tn5wjo9o",
    kind: "value",
    splices: { $pick: pick },
    captures: [],
    spliceParams: { $pick: [] },
  },
  (v) =>
    v.objectLiteralExpression([9, 20, 12, 2], {
      absent: v.callExpression(
        [10, 11, 10, 22],
        v.splice([10, 11, 10, 16], "$pick"),
        false,
        [v.nullLiteral([10, 17, 10, 21])],
      ),
      present: v.callExpression(
        [11, 12, 11, 20],
        v.splice([11, 12, 11, 17], "$pick"),
        false,
        [v.numericLiteral([11, 18, 11, 19], 4)],
      ),
    }),
);
