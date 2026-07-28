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
    declarations: ["n$2bgu1tn5wjo9o$0"],
    spliceScopes: {},
  },
  (v) =>
    v.arrow(
      [5, 17, 7, 2],
      [v.identifier([5, 18, 5, 19], "n", "n$2bgu1tn5wjo9o$0")],
      v.block(
        [5, 39, 7, 2],
        [
          v.return(
            [6, 3, 6, 33],
            v.ternary(
              [6, 10, 6, 32],
              v.binop(
                [6, 10, 6, 20],
                v.identifier([6, 10, 6, 11], "n", "n$2bgu1tn5wjo9o$0"),
                "===",
                v.null([6, 16, 6, 20]),
              ),
              v.number([6, 23, 6, 24], 0),
              v.binop(
                [6, 27, 6, 32],
                v.identifier([6, 27, 6, 28], "n", "n$2bgu1tn5wjo9o$0"),
                "+",
                v.number([6, 31, 6, 32], 1),
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
    declarations: [],
    spliceScopes: { $pick: [] },
  },
  (v) =>
    v.object([9, 20, 12, 2], {
      absent: v.call([10, 11, 10, 22], v.splice([10, 11, 10, 16], "$pick"), [
        v.null([10, 17, 10, 21]),
      ]),
      present: v.call([11, 12, 11, 20], v.splice([11, 12, 11, 17], "$pick"), [
        v.number([11, 18, 11, 19], 4),
      ]),
    }),
);
