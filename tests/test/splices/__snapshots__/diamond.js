import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler
// shares each script rather than re-expanding it per path, so the payload has
// one entry per level (linear) — not one per path, which would blow up as
// 2^depth.
const d0 = cs.create(
  [10, 12, 10, 17],
  {
    version: "0.0.0",
    filePath: "splices/diamond.test.tsx",
    fileHash: "23y608t6y2wp3",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [10, 15, 10, 16],
    value: 1,
  }),
);
const d1 = cs.create(
  [12, 12, 14, 3],
  {
    version: "0.0.0",
    filePath: "splices/diamond.test.tsx",
    fileHash: "23y608t6y2wp3",
    splices: { $d0: { value: d0, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [12, 15, 14, 2],
    statements: [
      {
        kind: "return",
        loc: [13, 3, 13, 20],
        expression: {
          kind: "binop",
          loc: [13, 10, 13, 19],
          left: {
            kind: "splice",
            loc: [13, 10, 13, 13],
            key: "$d0",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [13, 16, 13, 19],
            key: "$d0",
          },
        },
      },
    ],
  }),
);
const d2 = cs.create(
  [16, 12, 18, 3],
  {
    version: "0.0.0",
    filePath: "splices/diamond.test.tsx",
    fileHash: "23y608t6y2wp3",
    splices: { $d1: { value: d1, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [16, 15, 18, 2],
    statements: [
      {
        kind: "return",
        loc: [17, 3, 17, 20],
        expression: {
          kind: "binop",
          loc: [17, 10, 17, 19],
          left: {
            kind: "splice",
            loc: [17, 10, 17, 13],
            key: "$d1",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [17, 16, 17, 19],
            key: "$d1",
          },
        },
      },
    ],
  }),
);
const d3 = cs.create(
  [20, 12, 22, 3],
  {
    version: "0.0.0",
    filePath: "splices/diamond.test.tsx",
    fileHash: "23y608t6y2wp3",
    splices: { $d2: { value: d2, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [20, 15, 22, 2],
    statements: [
      {
        kind: "return",
        loc: [21, 3, 21, 20],
        expression: {
          kind: "binop",
          loc: [21, 10, 21, 19],
          left: {
            kind: "splice",
            loc: [21, 10, 21, 13],
            key: "$d2",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [21, 16, 21, 19],
            key: "$d2",
          },
        },
      },
    ],
  }),
);
const d4 = cs.create(
  [24, 12, 26, 3],
  {
    version: "0.0.0",
    filePath: "splices/diamond.test.tsx",
    fileHash: "23y608t6y2wp3",
    splices: { $d3: { value: d3, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [24, 15, 26, 2],
    statements: [
      {
        kind: "return",
        loc: [25, 3, 25, 20],
        expression: {
          kind: "binop",
          loc: [25, 10, 25, 19],
          left: {
            kind: "splice",
            loc: [25, 10, 25, 13],
            key: "$d3",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [25, 16, 25, 19],
            key: "$d3",
          },
        },
      },
    ],
  }),
);
it("diamond", async (t) => {
  await snapshotCase(t, "diamond", d4);
});
