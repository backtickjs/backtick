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
    kind: "value",
    splices: {},
    captures: [],
    declarations: [],
  },
  (v) => v.number([7, 15, 7, 16], 1),
);
const d1 = cs.create(
  [8, 12, 10, 3],
  {
    version: "0.0.0",
    filePath: "diamond.ts",
    fileHash: "1ukdw57m42wun",
    kind: "value",
    splices: { $d0: d0 },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.block(
      [8, 15, 10, 2],
      [
        v.return(
          [9, 3, 9, 20],
          v.binop(
            [9, 10, 9, 19],
            v.splice([9, 10, 9, 13], "$d0"),
            "+",
            v.splice([9, 16, 9, 19], "$d0"),
          ),
        ),
      ],
    ),
);
const d2 = cs.create(
  [11, 12, 13, 3],
  {
    version: "0.0.0",
    filePath: "diamond.ts",
    fileHash: "1ukdw57m42wun",
    kind: "value",
    splices: { $d1: d1 },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.block(
      [11, 15, 13, 2],
      [
        v.return(
          [12, 3, 12, 20],
          v.binop(
            [12, 10, 12, 19],
            v.splice([12, 10, 12, 13], "$d1"),
            "+",
            v.splice([12, 16, 12, 19], "$d1"),
          ),
        ),
      ],
    ),
);
const d3 = cs.create(
  [14, 12, 16, 3],
  {
    version: "0.0.0",
    filePath: "diamond.ts",
    fileHash: "1ukdw57m42wun",
    kind: "value",
    splices: { $d2: d2 },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.block(
      [14, 15, 16, 2],
      [
        v.return(
          [15, 3, 15, 20],
          v.binop(
            [15, 10, 15, 19],
            v.splice([15, 10, 15, 13], "$d2"),
            "+",
            v.splice([15, 16, 15, 19], "$d2"),
          ),
        ),
      ],
    ),
);
const d4 = cs.create(
  [17, 12, 19, 3],
  {
    version: "0.0.0",
    filePath: "diamond.ts",
    fileHash: "1ukdw57m42wun",
    kind: "value",
    splices: { $d3: d3 },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.block(
      [17, 15, 19, 2],
      [
        v.return(
          [18, 3, 18, 20],
          v.binop(
            [18, 10, 18, 19],
            v.splice([18, 10, 18, 13], "$d3"),
            "+",
            v.splice([18, 16, 18, 19], "$d3"),
          ),
        ),
      ],
    ),
);
export default d4;
