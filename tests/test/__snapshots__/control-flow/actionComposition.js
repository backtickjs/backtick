import { cs } from "@backtickjs/core";
// An action — a block with no `return` — types `Client<void>` natively and
// composes as a block running it in statement position.
const effects = cs.create(
  [6, 31, 8, 3],
  {
    version: "0.0.0",
    filePath: "actionComposition.tsx",
    fileHash: "2vsp25r9vsul6",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [6, 34, 8, 2],
    statements: [
      {
        kind: "const",
        loc: [7, 3, 7, 15],
        name: {
          kind: "id",
          loc: [7, 9, 7, 10],
          text: "x",
          bindingKey: "x$2vsp25r9vsul6$0",
        },
        initializer: {
          kind: "number",
          loc: [7, 13, 7, 14],
          value: 1,
        },
      },
    ],
  }),
);
const composed = cs.create(
  [10, 32, 12, 3],
  {
    version: "0.0.0",
    filePath: "actionComposition.tsx",
    fileHash: "2vsp25r9vsul6",
    splices: { $effects: { value: effects, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [10, 35, 12, 2],
    statements: [
      {
        kind: "splice",
        loc: [11, 3, 11, 11],
        key: "$effects",
      },
    ],
  }),
);
const actionComposition = cs.create(
  [14, 27, 16, 3],
  {
    version: "0.0.0",
    filePath: "actionComposition.tsx",
    fileHash: "2vsp25r9vsul6",
    splices: { $composed: { value: composed, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [14, 30, 16, 2],
    statements: [
      {
        kind: "splice",
        loc: [15, 3, 15, 12],
        key: "$composed",
      },
    ],
  }),
);
