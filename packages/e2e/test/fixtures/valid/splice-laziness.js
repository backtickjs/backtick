import { cs } from "@backtickjs/core";
// A host helper reused with different splices makes its script polymorphic:
// the holes can't be inlined, so every call site passes its splice as a
// thunk and the body evaluates `$0()` at the hole. The thunk is what keeps
// the hole as lazy as an inlined splice: `guard(broken)(false)` never
// reaches its hole, so the broken fragment must never evaluate — passed
// eagerly (by value instead of by thunk) it would throw before `flag` was
// even tested.
function guard(fragment) {
  return cs.create(
    [11, 10, 16, 5],
    {
      version: "0.0.0",
      filePath: "splice-laziness.ts",
      fileHash: "23k9adtpaouck",
      kind: "value",
      splices: { $fragment: fragment },
      captures: [],
      spliceParams: { $fragment: [] },
    },
    (v) =>
      v.arrow(
        [11, 13, 16, 4],
        [v.identifier([11, 14, 11, 18], "flag", "flag$23k9adtpaouck$0")],
        v.block(
          [11, 32, 16, 4],
          [
            v.if(
              [12, 5, 14, 6],
              v.identifier([12, 9, 12, 13], "flag", "flag$23k9adtpaouck$0"),
              v.block(
                [12, 15, 14, 6],
                [
                  v.return(
                    [13, 7, 13, 24],
                    v.splice([13, 14, 13, 23], "$fragment"),
                  ),
                ],
              ),
              null,
            ),
            v.return([15, 5, 15, 22], v.string([15, 12, 15, 21], "skipped")),
          ],
        ),
      ),
  );
}
const ok = cs.create(
  [19, 12, 19, 27],
  {
    version: "0.0.0",
    filePath: "splice-laziness.ts",
    fileHash: "23k9adtpaouck",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) => v.string([19, 15, 19, 26], "evaluated"),
);
const broken = cs.create(
  [20, 16, 22, 3],
  {
    version: "0.0.0",
    filePath: "splice-laziness.ts",
    fileHash: "23k9adtpaouck",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  (v) =>
    v.block(
      [20, 19, 22, 2],
      [
        v.throw(
          [21, 3, 21, 52],
          v.string([21, 9, 21, 51], "the guarded fragment must never evaluate"),
        ),
      ],
    ),
);
export default cs.create(
  [24, 16, 27, 4],
  {
    version: "0.0.0",
    filePath: "splice-laziness.ts",
    fileHash: "23k9adtpaouck",
    kind: "value",
    splices: { $0splice0: guard(ok), $0splice1: guard(broken) },
    captures: [],
    spliceParams: { $0splice0: [], $0splice1: [] },
  },
  (v) =>
    v.object([24, 20, 27, 2], {
      taken: v.call([25, 10, 25, 28], v.splice([25, 10, 25, 22], "$0splice0"), [
        v.boolean([25, 23, 25, 27], true),
      ]),
      skipped: v.call(
        [26, 12, 26, 35],
        v.splice([26, 12, 26, 28], "$0splice1"),
        [v.boolean([26, 29, 26, 34], false)],
      ),
    }),
);
