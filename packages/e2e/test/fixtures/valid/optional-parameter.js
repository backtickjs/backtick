import { cs } from "@backtickjs/core";
// `?` marks a nullable parameter: an omitted argument binds as null — the
// language's absent value; `undefined` never arises.
const greet = cs.create(
  [5, 15, 7, 3],
  {
    filePath: "optional-parameter.ts",
    fileHash: "3rhwjto9jja73",
    kind: "value",
    splices: {},
    captures: [],
    declarations: ["name$3rhwjto9jja73$0"],
  },
  (v) =>
    v.arrow(
      [5, 18, 7, 2],
      [v.identifier([5, 19, 5, 23], "name", "name$3rhwjto9jja73$0")],
      v.block(
        [5, 37, 7, 2],
        [
          v.return(
            [6, 3, 6, 28],
            v.call(
              [6, 10, 6, 27],
              v.propertyAccess(
                [6, 10, 6, 22],
                v.identifier([6, 10, 6, 14], "name", "name$3rhwjto9jja73$0"),
                "concat",
                true,
              ),
              [v.string([6, 23, 6, 26], "!")],
            ),
          ),
        ],
      ),
    ),
);
// A function-typed annotation unions parenthesized: `(() => number) | null`.
const double = cs.create(
  [10, 16, 10, 27],
  {
    filePath: "optional-parameter.ts",
    fileHash: "3rhwjto9jja73",
    kind: "value",
    splices: {},
    captures: [],
    declarations: [],
  },
  (v) => v.arrow([10, 19, 10, 26], [], v.number([10, 25, 10, 26], 2)),
);
const call = cs.create(
  [12, 14, 14, 3],
  {
    filePath: "optional-parameter.ts",
    fileHash: "3rhwjto9jja73",
    kind: "value",
    splices: {},
    captures: [],
    declarations: ["cb$3rhwjto9jja73$1"],
  },
  (v) =>
    v.arrow(
      [12, 17, 14, 2],
      [v.identifier([12, 18, 12, 20], "cb", "cb$3rhwjto9jja73$1")],
      v.block(
        [12, 40, 14, 2],
        [
          v.return(
            [13, 3, 13, 22],
            v.binop(
              [13, 10, 13, 21],
              v.call(
                [13, 10, 13, 16],
                v.identifier([13, 10, 13, 12], "cb", "cb$3rhwjto9jja73$1"),
                [],
                true,
              ),
              "??",
              v.number([13, 20, 13, 21], 0),
            ),
          ),
        ],
      ),
    ),
);
export default cs.create(
  [16, 16, 22, 4],
  {
    filePath: "optional-parameter.ts",
    fileHash: "3rhwjto9jja73",
    kind: "value",
    splices: { $greet: greet, $call: call, $double: double },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.object([16, 20, 22, 2], {
      named: v.call([17, 10, 17, 22], v.splice([17, 10, 17, 16], "$greet"), [
        v.string([17, 17, 17, 21], "hi"),
      ]),
      omitted: v.call(
        [18, 12, 18, 20],
        v.splice([18, 12, 18, 18], "$greet"),
        [],
      ),
      explicit: v.call([19, 13, 19, 25], v.splice([19, 13, 19, 19], "$greet"), [
        v.null([19, 20, 19, 24]),
      ]),
      supplied: v.call([20, 13, 20, 27], v.splice([20, 13, 20, 18], "$call"), [
        v.splice([20, 19, 20, 26], "$double"),
      ]),
      fallback: v.call(
        [21, 13, 21, 20],
        v.splice([21, 13, 21, 18], "$call"),
        [],
      ),
    }),
);
