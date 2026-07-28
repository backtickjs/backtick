import { cs } from "@backtickjs/core";
// Mutators aren't part of the client array API: an array is a value, and
// `pop` would also produce `undefined`, which the language doesn't have.
const script = cs.create(
  [5, 16, 9, 3],
  {
    version: "0.0.0",
    filePath: "array-mutation.ts",
    fileHash: "3m6roaxdg127n",
    kind: "value",
    splices: {},
    captures: [],
    spliceScopes: {},
  },
  (v) =>
    v.block(
      [5, 19, 9, 2],
      [
        v.variableDeclaration(
          [6, 3, 6, 27],
          "const",
          v.identifier([6, 9, 6, 14], "coins", "coins$3m6roaxdg127n$0"),
          v.array(
            [6, 17, 6, 26],
            [
              v.number([6, 18, 6, 19], 1),
              v.number([6, 21, 6, 22], 2),
              v.number([6, 24, 6, 25], 3),
            ],
          ),
        ),
        v.variableDeclaration(
          [7, 3, 7, 28],
          "const",
          v.identifier([7, 9, 7, 13], "last", "last$3m6roaxdg127n$1"),
          v.call(
            [7, 16, 7, 27],
            v.propertyAccess(
              [7, 16, 7, 25],
              v.identifier([7, 16, 7, 21], "coins", "coins$3m6roaxdg127n$0"),
              "pop",
            ),
            [],
          ),
        ),
        v.return([8, 3, 8, 12], v.number([8, 10, 8, 11], 1)),
      ],
    ),
);
const action = cs.create(
  [11, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "array-mutation.ts",
    fileHash: "3m6roaxdg127n",
    kind: "action",
    splices: {},
    captures: [],
    spliceScopes: {},
  },
  (v) =>
    v.block(
      [11, 19, 14, 2],
      [
        v.variableDeclaration(
          [12, 3, 12, 24],
          "const",
          v.identifier([12, 9, 12, 14], "coins", "coins$3m6roaxdg127n$2"),
          v.array(
            [12, 17, 12, 23],
            [v.number([12, 18, 12, 19], 1), v.number([12, 21, 12, 22], 2)],
          ),
        ),
        v.call(
          [13, 3, 13, 16],
          v.propertyAccess(
            [13, 3, 13, 13],
            v.identifier([13, 3, 13, 8], "coins", "coins$3m6roaxdg127n$2"),
            "push",
          ),
          [v.number([13, 14, 13, 15], 3)],
        ),
      ],
    ),
);
