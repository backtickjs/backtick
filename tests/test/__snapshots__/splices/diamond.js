import { cs } from "@backtickjs/core";
// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler shares
// each script rather than re-expanding it per path, so the payload has one entry
// per level (linear) — not one per path, which would blow up as 2^depth.
const d0 = cs.create(
  [7, 12, 7, 17],
  {
    version: "0.0.0",
    filePath: "diamond.tsx",
    fileHash: "3caauos5ve28",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [7, 15, 7, 16],
    value: 1,
  }),
);
const d1 = cs.create(
  [9, 12, 11, 3],
  {
    version: "0.0.0",
    filePath: "diamond.tsx",
    fileHash: "3caauos5ve28",
    splices: { $d0: { value: d0, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [9, 15, 11, 2],
    statements: [
      {
        kind: "return",
        loc: [10, 3, 10, 20],
        expression: {
          kind: "binop",
          loc: [10, 10, 10, 19],
          left: {
            kind: "splice",
            loc: [10, 10, 10, 13],
            key: "$d0",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [10, 16, 10, 19],
            key: "$d0",
          },
        },
      },
    ],
  }),
);
const d2 = cs.create(
  [13, 12, 15, 3],
  {
    version: "0.0.0",
    filePath: "diamond.tsx",
    fileHash: "3caauos5ve28",
    splices: { $d1: { value: d1, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [13, 15, 15, 2],
    statements: [
      {
        kind: "return",
        loc: [14, 3, 14, 20],
        expression: {
          kind: "binop",
          loc: [14, 10, 14, 19],
          left: {
            kind: "splice",
            loc: [14, 10, 14, 13],
            key: "$d1",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [14, 16, 14, 19],
            key: "$d1",
          },
        },
      },
    ],
  }),
);
const d3 = cs.create(
  [17, 12, 19, 3],
  {
    version: "0.0.0",
    filePath: "diamond.tsx",
    fileHash: "3caauos5ve28",
    splices: { $d2: { value: d2, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [17, 15, 19, 2],
    statements: [
      {
        kind: "return",
        loc: [18, 3, 18, 20],
        expression: {
          kind: "binop",
          loc: [18, 10, 18, 19],
          left: {
            kind: "splice",
            loc: [18, 10, 18, 13],
            key: "$d2",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [18, 16, 18, 19],
            key: "$d2",
          },
        },
      },
    ],
  }),
);
const d4 = cs.create(
  [21, 12, 23, 3],
  {
    version: "0.0.0",
    filePath: "diamond.tsx",
    fileHash: "3caauos5ve28",
    splices: { $d3: { value: d3, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [21, 15, 23, 2],
    statements: [
      {
        kind: "return",
        loc: [22, 3, 22, 20],
        expression: {
          kind: "binop",
          loc: [22, 10, 22, 19],
          left: {
            kind: "splice",
            loc: [22, 10, 22, 13],
            key: "$d3",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [22, 16, 22, 19],
            key: "$d3",
          },
        },
      },
    ],
  }),
);
const diamond = d4;
