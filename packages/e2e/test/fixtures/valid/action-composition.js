import { cs } from "@backtickjs/core";
// An action — a block with no `return` — types `Client<void>` natively and
// composes as a block running it in statement position.
const effects = cs.create(
  [5, 31, 7, 3],
  {
    filePath: "action-composition.ts",
    fileHash: "agkxao2hual4",
    kind: "action",
    splices: {},
    captures: [],
    declarations: ["x$agkxao2hual4$0"],
  },
  (v) =>
    v.block(
      [5, 34, 7, 2],
      [
        v.variableDeclaration(
          [6, 3, 6, 15],
          "const",
          v.identifier([6, 9, 6, 10], "x", "x$agkxao2hual4$0"),
          v.number([6, 13, 6, 14], 1),
        ),
      ],
    ),
);
const composed = cs.create(
  [9, 32, 11, 3],
  {
    filePath: "action-composition.ts",
    fileHash: "agkxao2hual4",
    kind: "action",
    splices: { $effects: effects },
    captures: [],
    declarations: [],
  },
  (v) => v.block([9, 35, 11, 2], [v.splice([10, 3, 10, 11], "$effects")]),
);
export default cs.create(
  [13, 16, 15, 3],
  {
    filePath: "action-composition.ts",
    fileHash: "agkxao2hual4",
    kind: "action",
    splices: { $composed: composed },
    captures: [],
    declarations: [],
  },
  (v) => v.block([13, 19, 15, 2], [v.splice([14, 3, 14, 12], "$composed")]),
);
