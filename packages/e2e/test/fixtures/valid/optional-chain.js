import { cs } from "@backtickjs/core";
// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs.create(
  [6, 14, 8, 3],
  {
    version: "0.0.0",
    filePath: "optional-chain.ts",
    fileHash: "1k96f1nwptp9k",
    kind: "value",
    splices: {},
    captures: [],
    declarations: ["p$1k96f1nwptp9k$0"],
  },
  (v) =>
    v.arrow(
      [6, 17, 8, 2],
      [v.identifier([6, 18, 6, 19], "p", "p$1k96f1nwptp9k$0")],
      v.block(
        [6, 46, 8, 2],
        [
          v.return(
            [7, 3, 7, 15],
            v.propertyAccess(
              [7, 10, 7, 14],
              v.identifier([7, 10, 7, 11], "p", "p$1k96f1nwptp9k$0"),
              "x",
              true,
            ),
          ),
        ],
      ),
    ),
);
const deep = cs.create(
  [10, 14, 12, 3],
  {
    version: "0.0.0",
    filePath: "optional-chain.ts",
    fileHash: "1k96f1nwptp9k",
    kind: "value",
    splices: {},
    captures: [],
    declarations: ["o$1k96f1nwptp9k$1"],
  },
  (v) =>
    v.arrow(
      [10, 17, 12, 2],
      [v.identifier([10, 18, 10, 19], "o", "o$1k96f1nwptp9k$1")],
      v.block(
        [10, 64, 12, 2],
        [
          v.return(
            [11, 3, 11, 22],
            v.propertyAccess(
              [11, 10, 11, 21],
              v.propertyAccess(
                [11, 10, 11, 18],
                v.identifier([11, 10, 11, 11], "o", "o$1k96f1nwptp9k$1"),
                "inner",
                true,
              ),
              "z",
              true,
            ),
          ),
        ],
      ),
    ),
);
const shout = cs.create(
  [14, 15, 16, 3],
  {
    version: "0.0.0",
    filePath: "optional-chain.ts",
    fileHash: "1k96f1nwptp9k",
    kind: "value",
    splices: {},
    captures: [],
    declarations: ["s$1k96f1nwptp9k$2"],
  },
  (v) =>
    v.arrow(
      [14, 18, 16, 2],
      [v.identifier([14, 19, 14, 20], "s", "s$1k96f1nwptp9k$2")],
      v.block(
        [14, 40, 16, 2],
        [
          v.return(
            [15, 3, 15, 25],
            v.call(
              [15, 10, 15, 24],
              v.propertyAccess(
                [15, 10, 15, 19],
                v.identifier([15, 10, 15, 11], "s", "s$1k96f1nwptp9k$2"),
                "concat",
                true,
              ),
              [v.string([15, 20, 15, 23], "!")],
            ),
          ),
        ],
      ),
    ),
);
export default cs.create(
  [18, 16, 26, 4],
  {
    version: "0.0.0",
    filePath: "optional-chain.ts",
    fileHash: "1k96f1nwptp9k",
    kind: "value",
    splices: { $pick: pick, $deep: deep, $shout: shout },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.object([18, 20, 26, 2], {
      found: v.call([19, 10, 19, 25], v.splice([19, 10, 19, 15], "$pick"), [
        v.object([19, 16, 19, 24], { x: v.number([19, 21, 19, 22], 5) }),
      ]),
      missing: v.call([20, 12, 20, 23], v.splice([20, 12, 20, 17], "$pick"), [
        v.null([20, 18, 20, 22]),
      ]),
      deep: v.call([21, 9, 21, 35], v.splice([21, 9, 21, 14], "$deep"), [
        v.object([21, 15, 21, 34], {
          inner: v.object([21, 24, 21, 32], {
            z: v.number([21, 29, 21, 30], 7),
          }),
        }),
      ]),
      cut: v.call([22, 8, 22, 30], v.splice([22, 8, 22, 13], "$deep"), [
        v.object([22, 14, 22, 29], { inner: v.null([22, 23, 22, 27]) }),
      ]),
      top: v.call([23, 8, 23, 19], v.splice([23, 8, 23, 13], "$deep"), [
        v.null([23, 14, 23, 18]),
      ]),
      loud: v.call([24, 9, 24, 21], v.splice([24, 9, 24, 15], "$shout"), [
        v.string([24, 16, 24, 20], "hi"),
      ]),
      silent: v.call([25, 11, 25, 23], v.splice([25, 11, 25, 17], "$shout"), [
        v.null([25, 18, 25, 22]),
      ]),
    }),
);
