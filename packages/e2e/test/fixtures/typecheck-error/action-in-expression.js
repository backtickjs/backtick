import { cs } from "@backtickjs/core";
// An action only splices in statement position: any value-consuming splice
// fails right at the splice — a stored one, a returned one, even one
// assigned to an `unknown`-typed catch binding.
const action = cs.create(
  [6, 16, 8, 3],
  {
    filePath: "action-in-expression.ts",
    fileHash: "8tx5qho0had8",
    kind: "action",
    splices: {},
    captures: [],
    declarations: ["x$8tx5qho0had8$0"],
  },
  (v) =>
    v.block(
      [6, 19, 8, 2],
      [
        v.variableDeclaration(
          [7, 3, 7, 15],
          "const",
          v.identifier([7, 9, 7, 10], "x", "x$8tx5qho0had8$0"),
          v.number([7, 13, 7, 14], 1),
        ),
      ],
    ),
);
export const stored = cs.create(
  [10, 23, 13, 3],
  {
    filePath: "action-in-expression.ts",
    fileHash: "8tx5qho0had8",
    kind: "value",
    splices: { $action: action },
    captures: [],
    declarations: ["captured$8tx5qho0had8$1"],
  },
  (v) =>
    v.block(
      [10, 26, 13, 2],
      [
        v.variableDeclaration(
          [11, 3, 11, 28],
          "const",
          v.identifier([11, 9, 11, 17], "captured", "captured$8tx5qho0had8$1"),
          v.splice([11, 20, 11, 27], "$action"),
        ),
        v.return([12, 3, 12, 12], v.number([12, 10, 12, 11], 1)),
      ],
    ),
);
export const returned = cs.create(
  [15, 25, 17, 3],
  {
    filePath: "action-in-expression.ts",
    fileHash: "8tx5qho0had8",
    kind: "value",
    splices: { $action: action },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.block(
      [15, 28, 17, 2],
      [v.return([16, 3, 16, 18], v.splice([16, 10, 16, 17], "$action"))],
    ),
);
export const assigned = cs.create(
  [19, 25, 26, 3],
  {
    filePath: "action-in-expression.ts",
    fileHash: "8tx5qho0had8",
    kind: "value",
    splices: { $action: action },
    captures: [],
    declarations: ["e$8tx5qho0had8$2"],
  },
  (v) =>
    v.block(
      [19, 28, 26, 2],
      [
        v.try(
          [20, 3, 25, 4],
          v.block(
            [20, 7, 22, 4],
            [v.return([21, 5, 21, 14], v.number([21, 12, 21, 13], 1))],
          ),
          v.identifier([22, 12, 22, 13], "e", "e$8tx5qho0had8$2"),
          v.block(
            [22, 15, 25, 4],
            [
              v.assignment(
                [23, 5, 23, 16],
                v.identifier([23, 5, 23, 6], "e", "e$8tx5qho0had8$2"),
                v.splice([23, 9, 23, 16], "$action"),
              ),
              v.return([24, 5, 24, 14], v.number([24, 12, 24, 13], 2)),
            ],
          ),
        ),
      ],
    ),
);
