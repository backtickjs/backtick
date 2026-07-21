import { cs } from "@backtickjs/core";
// `?` marks a nullable parameter: an omitted argument binds as null — the
// language's absent value; `undefined` never arises.
const greet = cs.create(
  [5, 15, 7, 3],
  {
    filePath: "optional-parameter.ts",
    fileHash: "1ydjf78z1l2ru",
    splices: {},
    captures: [],
    declarations: ["name$1ydjf78z1l2ru$0"],
  },
  (v) =>
    v.arrow(
      [5, 18, 7, 2],
      [v.identifier([5, 19, 5, 23], "name", "name$1ydjf78z1l2ru$0")],
      v.block(
        [5, 37, 7, 2],
        [
          v.return(
            [6, 3, 6, 28],
            v.call(
              [6, 10, 6, 27],
              v.propertyAccess(
                [6, 10, 6, 22],
                v.identifier([6, 10, 6, 14], "name", "name$1ydjf78z1l2ru$0"),
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
    fileHash: "1ydjf78z1l2ru",
    splices: {},
    captures: [],
    declarations: [],
  },
  (v) => v.arrow([10, 19, 10, 26], [], v.number([10, 25, 10, 26], 2)),
);
const call = cs.create(
  [12, 14, 17, 3],
  {
    filePath: "optional-parameter.ts",
    fileHash: "1ydjf78z1l2ru",
    splices: {},
    captures: [],
    declarations: ["cb$1ydjf78z1l2ru$1"],
  },
  (v) =>
    v.arrow(
      [12, 17, 17, 2],
      [v.identifier([12, 18, 12, 20], "cb", "cb$1ydjf78z1l2ru$1")],
      v.block(
        [12, 40, 17, 2],
        [
          v.if(
            [13, 3, 15, 4],
            v.binop(
              [13, 7, 13, 18],
              v.identifier([13, 7, 13, 9], "cb", "cb$1ydjf78z1l2ru$1"),
              "!==",
              v.null([13, 14, 13, 18]),
            ),
            v.block(
              [13, 20, 15, 4],
              [
                v.return(
                  [14, 5, 14, 17],
                  v.call(
                    [14, 12, 14, 16],
                    v.identifier([14, 12, 14, 14], "cb", "cb$1ydjf78z1l2ru$1"),
                    [],
                  ),
                ),
              ],
            ),
            null,
          ),
          v.return([16, 3, 16, 12], v.number([16, 10, 16, 11], 0)),
        ],
      ),
    ),
);
export default cs.create(
  [19, 16, 25, 4],
  {
    filePath: "optional-parameter.ts",
    fileHash: "1ydjf78z1l2ru",
    splices: { $greet: greet, $call: call, $double: double },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.object([19, 20, 25, 2], {
      named: v.call([20, 10, 20, 22], v.splice([20, 10, 20, 16], "$greet"), [
        v.string([20, 17, 20, 21], "hi"),
      ]),
      omitted: v.call(
        [21, 12, 21, 20],
        v.splice([21, 12, 21, 18], "$greet"),
        [],
      ),
      explicit: v.call([22, 13, 22, 25], v.splice([22, 13, 22, 19], "$greet"), [
        v.null([22, 20, 22, 24]),
      ]),
      supplied: v.call([23, 13, 23, 27], v.splice([23, 13, 23, 18], "$call"), [
        v.splice([23, 19, 23, 26], "$double"),
      ]),
      fallback: v.call(
        [24, 13, 24, 20],
        v.splice([24, 13, 24, 18], "$call"),
        [],
      ),
    }),
);
