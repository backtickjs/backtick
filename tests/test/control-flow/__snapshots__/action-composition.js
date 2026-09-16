import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An action — a block with no `return` — types `Client<void>` natively and
// composes as a block running it in statement position.
const effects = cs.create(
  [8, 31, 10, 3],
  {
    version: "0.0.0",
    filePath: "control-flow/action-composition.test.tsx",
    fileHash: "3q2gz79xhvvfp",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [8, 34, 10, 2],
    statements: [
      {
        kind: "const",
        loc: [9, 3, 9, 15],
        name: {
          kind: "id",
          loc: [9, 9, 9, 10],
          text: "x",
          bindingKey: "x$3q2gz79xhvvfp$0",
        },
        initializer: {
          kind: "number",
          loc: [9, 13, 9, 14],
          value: 1,
        },
      },
    ],
  }),
);
const composed = cs.create(
  [12, 32, 14, 3],
  {
    version: "0.0.0",
    filePath: "control-flow/action-composition.test.tsx",
    fileHash: "3q2gz79xhvvfp",
    splices: { $effects: { value: effects, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [12, 35, 14, 2],
    statements: [
      {
        kind: "splice",
        loc: [13, 3, 13, 11],
        key: "$effects",
      },
    ],
  }),
);
it("actionComposition", async (t) => {
  await snapshotCase(
    t,
    "actionComposition",
    cs.create(
      [20, 5, 22, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/action-composition.test.tsx",
        fileHash: "3q2gz79xhvvfp",
        splices: { $composed: { value: composed, params: [] } },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [20, 8, 22, 6],
        statements: [
          {
            kind: "splice",
            loc: [21, 7, 21, 16],
            key: "$composed",
          },
        ],
      }),
    ),
  );
});
