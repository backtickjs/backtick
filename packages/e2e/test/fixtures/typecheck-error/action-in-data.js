import { cs } from "@backtickjs/core";
// A container ships verbatim, so an action inside one has no place — the
// splice rejects it.
const action = cs.create(
  [5, 16, 7, 3],
  {
    version: "0.0.0",
    filePath: "action-in-data.ts",
    fileHash: "1937kl3l6y7n7",
    kind: "action",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [5, 19, 7, 2],
      [
        v.variableDeclaration(
          [6, 3, 6, 15],
          v.identifier([6, 9, 6, 10], "x", "x$1937kl3l6y7n7$0"),
          v.numericLiteral([6, 13, 6, 14], 1),
          "const",
        ),
      ],
    ),
);
export const listed = cs.create(
  [9, 23, 12, 3],
  {
    version: "0.0.0",
    filePath: "action-in-data.ts",
    fileHash: "1937kl3l6y7n7",
    kind: "value",
    splices: { $0splice0: [action] },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  (v) =>
    v.block(
      [9, 26, 12, 2],
      [
        v.variableDeclaration(
          [10, 3, 10, 28],
          v.identifier([10, 9, 10, 13], "list", "list$1937kl3l6y7n7$1"),
          v.splice([10, 16, 10, 27], "$0splice0"),
          "const",
        ),
        v.returnStatement(
          [11, 3, 11, 12],
          v.numericLiteral([11, 10, 11, 11], 1),
        ),
      ],
    ),
);
export const keyed = cs.create(
  [14, 22, 17, 3],
  {
    version: "0.0.0",
    filePath: "action-in-data.ts",
    fileHash: "1937kl3l6y7n7",
    kind: "value",
    splices: { $0splice0: { press: action } },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  (v) =>
    v.block(
      [14, 25, 17, 2],
      [
        v.variableDeclaration(
          [15, 3, 15, 36],
          v.identifier([15, 9, 15, 12], "map", "map$1937kl3l6y7n7$2"),
          v.splice([15, 15, 15, 35], "$0splice0"),
          "const",
        ),
        v.returnStatement(
          [16, 3, 16, 12],
          v.numericLiteral([16, 10, 16, 11], 1),
        ),
      ],
    ),
);
