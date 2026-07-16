import { cs } from "@backtickjs/core";
// Each level splices the level below it twice, so the composition graph is a
// diamond lattice with exponentially many root-to-leaf paths. The bundler shares
// each script rather than re-expanding it per path, so the payload has one entry
// per level (linear) — not one per path, which would blow up as 2^depth.
const d0 = cs.create(
  [7, 12, 7, 17],
  {
    filePath: "diamond.ts",
    fileHash: "3mdtmwgs5x5rz",
    splices: {},
    captures: [],
    declarations: [],
  },
  (v) => v.number([7, 15, 7, 16], 1),
);
const d1 = cs.create(
  [8, 12, 10, 3],
  {
    filePath: "diamond.ts",
    fileHash: "3mdtmwgs5x5rz",
    splices: { $0splice0: d0, $0splice1: d0 },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.block(
      [8, 15, 10, 2],
      [
        v.return(
          [9, 3, 9, 24],
          v.binop(
            [9, 10, 9, 23],
            v.splice([9, 10, 9, 15], "$0splice0"),
            "+",
            v.splice([9, 18, 9, 23], "$0splice1"),
          ),
        ),
      ],
    ),
);
const d2 = cs.create(
  [11, 12, 13, 3],
  {
    filePath: "diamond.ts",
    fileHash: "3mdtmwgs5x5rz",
    splices: { $0splice0: d1, $0splice1: d1 },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.block(
      [11, 15, 13, 2],
      [
        v.return(
          [12, 3, 12, 24],
          v.binop(
            [12, 10, 12, 23],
            v.splice([12, 10, 12, 15], "$0splice0"),
            "+",
            v.splice([12, 18, 12, 23], "$0splice1"),
          ),
        ),
      ],
    ),
);
const d3 = cs.create(
  [14, 12, 16, 3],
  {
    filePath: "diamond.ts",
    fileHash: "3mdtmwgs5x5rz",
    splices: { $0splice0: d2, $0splice1: d2 },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.block(
      [14, 15, 16, 2],
      [
        v.return(
          [15, 3, 15, 24],
          v.binop(
            [15, 10, 15, 23],
            v.splice([15, 10, 15, 15], "$0splice0"),
            "+",
            v.splice([15, 18, 15, 23], "$0splice1"),
          ),
        ),
      ],
    ),
);
const d4 = cs.create(
  [17, 12, 19, 3],
  {
    filePath: "diamond.ts",
    fileHash: "3mdtmwgs5x5rz",
    splices: { $0splice0: d3, $0splice1: d3 },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.block(
      [17, 15, 19, 2],
      [
        v.return(
          [18, 3, 18, 24],
          v.binop(
            [18, 10, 18, 23],
            v.splice([18, 10, 18, 15], "$0splice0"),
            "+",
            v.splice([18, 18, 18, 23], "$0splice1"),
          ),
        ),
      ],
    ),
);
export default d4;
