import { cs } from "@backtickjs/core";
// An action — a block with no `return` — types `Client<void>` natively and
// composes as a block running it in statement position.
const effects = cs.create(
  [5, 31, 7, 3],
  {
    version: "0.0.0",
    filePath: "action-composition.ts",
    fileHash: "agkxao2hual4",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [5, 34, 7, 2],
    statements: [
      {
        kind: "const",
        loc: [6, 3, 6, 15],
        name: {
          kind: "id",
          loc: [6, 9, 6, 10],
          text: "x",
          bindingKey: "x$agkxao2hual4$0",
        },
        initializer: {
          kind: "number",
          loc: [6, 13, 6, 14],
          value: 1,
        },
      },
    ],
  }),
);
const composed = cs.create(
  [9, 32, 11, 3],
  {
    version: "0.0.0",
    filePath: "action-composition.ts",
    fileHash: "agkxao2hual4",
    splices: { $effects: { value: effects, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [9, 35, 11, 2],
    statements: [
      {
        kind: "splice",
        loc: [10, 3, 10, 11],
        key: "$effects",
      },
    ],
  }),
);
export default cs.create(
  [13, 16, 15, 3],
  {
    version: "0.0.0",
    filePath: "action-composition.ts",
    fileHash: "agkxao2hual4",
    splices: { $composed: { value: composed, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [13, 19, 15, 2],
    statements: [
      {
        kind: "splice",
        loc: [14, 3, 14, 12],
        key: "$composed",
      },
    ],
  }),
);
