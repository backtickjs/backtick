import { cs } from "@backtickjs/core";
// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler shares
// each script rather than re-expanding it per path, so the payload has one entry
// per level (linear) — not one per path, which would blow up as 2^depth.
const d0 = cs.create(
  [7, 12, 7, 17],
  {
    version: "0.0.0",
    filePath: "diamond.ts",
    fileHash: "1ukdw57m42wun",
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
  [8, 12, 10, 3],
  {
    version: "0.0.0",
    filePath: "diamond.ts",
    fileHash: "1ukdw57m42wun",
    splices: { $d0: { value: d0, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [8, 15, 10, 2],
    statements: [
      {
        kind: "return",
        loc: [9, 3, 9, 20],
        expression: {
          kind: "binop",
          loc: [9, 10, 9, 19],
          left: {
            kind: "splice",
            loc: [9, 10, 9, 13],
            key: "$d0",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [9, 16, 9, 19],
            key: "$d0",
          },
        },
      },
    ],
  }),
);
const d2 = cs.create(
  [11, 12, 13, 3],
  {
    version: "0.0.0",
    filePath: "diamond.ts",
    fileHash: "1ukdw57m42wun",
    splices: { $d1: { value: d1, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [11, 15, 13, 2],
    statements: [
      {
        kind: "return",
        loc: [12, 3, 12, 20],
        expression: {
          kind: "binop",
          loc: [12, 10, 12, 19],
          left: {
            kind: "splice",
            loc: [12, 10, 12, 13],
            key: "$d1",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [12, 16, 12, 19],
            key: "$d1",
          },
        },
      },
    ],
  }),
);
const d3 = cs.create(
  [14, 12, 16, 3],
  {
    version: "0.0.0",
    filePath: "diamond.ts",
    fileHash: "1ukdw57m42wun",
    splices: { $d2: { value: d2, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [14, 15, 16, 2],
    statements: [
      {
        kind: "return",
        loc: [15, 3, 15, 20],
        expression: {
          kind: "binop",
          loc: [15, 10, 15, 19],
          left: {
            kind: "splice",
            loc: [15, 10, 15, 13],
            key: "$d2",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [15, 16, 15, 19],
            key: "$d2",
          },
        },
      },
    ],
  }),
);
const d4 = cs.create(
  [17, 12, 19, 3],
  {
    version: "0.0.0",
    filePath: "diamond.ts",
    fileHash: "1ukdw57m42wun",
    splices: { $d3: { value: d3, params: [] } },
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
            key: "$d3",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [18, 16, 18, 19],
            key: "$d3",
          },
        },
      },
    ],
  }),
);
export default d4;
