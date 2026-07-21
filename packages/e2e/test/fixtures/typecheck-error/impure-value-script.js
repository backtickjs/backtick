import { cs } from "@backtickjs/core";
// A value script computes: a spliced action or a void call in statement
// position fails; assignments and dead value computations stay legal.
const action = cs.create(
  [5, 16, 7, 3],
  {
    filePath: "impure-value-script.ts",
    fileHash: "3f5crob1u7995",
    splices: {},
    captures: [],
    declarations: ["x$3f5crob1u7995$0"],
  },
  (v) =>
    v.block(
      [5, 19, 7, 2],
      [
        v.variableDeclaration(
          [6, 3, 6, 15],
          "const",
          v.identifier([6, 9, 6, 10], "x", "x$3f5crob1u7995$0"),
          v.number([6, 13, 6, 14], 1),
        ),
      ],
    ),
);
const ping = cs.create(
  [9, 14, 11, 3],
  {
    filePath: "impure-value-script.ts",
    fileHash: "3f5crob1u7995",
    splices: {},
    captures: [],
    declarations: ["x$3f5crob1u7995$1"],
  },
  (v) =>
    v.arrow(
      [9, 17, 11, 2],
      [],
      v.block(
        [9, 23, 11, 2],
        [
          v.variableDeclaration(
            [10, 3, 10, 15],
            "const",
            v.identifier([10, 9, 10, 10], "x", "x$3f5crob1u7995$1"),
            v.number([10, 13, 10, 14], 1),
          ),
        ],
      ),
    ),
);
export const script = cs.create(
  [13, 23, 16, 3],
  {
    filePath: "impure-value-script.ts",
    fileHash: "3f5crob1u7995",
    splices: { $action: action },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.block(
      [13, 26, 16, 2],
      [
        v.splice([14, 3, 14, 10], "$action"),
        v.return([15, 3, 15, 12], v.number([15, 10, 15, 11], 1)),
      ],
    ),
);
export const branch = cs.create(
  [18, 23, 26, 3],
  {
    filePath: "impure-value-script.ts",
    fileHash: "3f5crob1u7995",
    splices: { $ping: ping },
    captures: [],
    declarations: ["b$3f5crob1u7995$2", "n$3f5crob1u7995$3"],
  },
  (v) =>
    v.arrow(
      [18, 26, 26, 2],
      [v.identifier([18, 27, 18, 28], "b", "b$3f5crob1u7995$2")],
      v.block(
        [18, 42, 26, 2],
        [
          v.variableDeclaration(
            [19, 3, 19, 13],
            "let",
            v.identifier([19, 7, 19, 8], "n", "n$3f5crob1u7995$3"),
            v.number([19, 11, 19, 12], 0),
          ),
          v.if(
            [20, 3, 23, 4],
            v.identifier([20, 7, 20, 8], "b", "b$3f5crob1u7995$2"),
            v.block(
              [20, 10, 23, 4],
              [
                v.call([21, 5, 21, 12], v.splice([21, 5, 21, 10], "$ping"), []),
                v.assignment(
                  [22, 5, 22, 10],
                  v.identifier([22, 5, 22, 6], "n", "n$3f5crob1u7995$3"),
                  v.number([22, 9, 22, 10], 1),
                ),
              ],
            ),
            null,
          ),
          v.binop(
            [24, 3, 24, 8],
            v.identifier([24, 3, 24, 4], "n", "n$3f5crob1u7995$3"),
            "+",
            v.number([24, 7, 24, 8], 1),
          ),
          v.return(
            [25, 3, 25, 12],
            v.identifier([25, 10, 25, 11], "n", "n$3f5crob1u7995$3"),
          ),
        ],
      ),
    ),
);
