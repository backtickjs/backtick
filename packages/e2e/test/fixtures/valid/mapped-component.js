import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs, Text, View } from "@backtickjs/core";
// One element template, expanded once per row on the client: the splice hole
// sits inside a `.map` callback, so it is reached once per iteration and each
// expansion must see its own `row`.
//
// The template is written inside the script because that is what lets `row`
// resolve to the callback's binding — hoisting it out would make `row` a free
// host reference instead of a capture.
//
// Inlining is what keeps the expansions apart today: the splice lands in body
// position, where a tree reference is a plain call and instantiates afresh. If
// it ever arrives as a thunk instead, the reference becomes an `apply` in tree
// position, and those memoize one instance per node — one instance shared by
// every row, each overwriting the last. The three values below are what tells
// the two apart.
const rows = [1, 2, 3];
export default _jsx(View, {
  children: cs.create(
    [20, 10, 20, 68],
    {
      version: "0.0.0",
      filePath: "mapped-component.tsx",
      fileHash: "2a06blnzigy",
      kind: "value",
      splices: {
        $rows: rows,
        $0splice0: _jsx(Text, {
          children: cs.create(
            [20, 41, 20, 57],
            {
              version: "0.0.0",
              filePath: "mapped-component.tsx",
              fileHash: "2a06blnzigy",
              kind: "value",
              splices: {},
              captures: ["row$2a06blnzigy$0"],
              declarations: [],
            },
            (v) =>
              v.binop(
                [20, 44, 20, 56],
                v.string([20, 44, 20, 50], "row "),
                "+",
                v.identifier([20, 53, 20, 56], "row", "row$2a06blnzigy$0"),
              ),
          ),
        }),
      },
      captures: [],
      declarations: ["row$2a06blnzigy$0"],
    },
    (v) =>
      v.call(
        [20, 13, 20, 67],
        v.propertyAccess(
          [20, 13, 20, 22],
          v.splice([20, 13, 20, 18], "$rows"),
          "map",
        ),
        [
          v.arrow(
            [20, 23, 20, 66],
            [v.identifier([20, 24, 20, 27], "row", "row$2a06blnzigy$0")],
            v.splice([20, 32, 20, 66], "$0splice0"),
          ),
        ],
      ),
  ),
});
