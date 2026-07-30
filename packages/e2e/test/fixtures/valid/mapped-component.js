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
    [20, 10, 20, 70],
    {
      version: "0.0.0",
      filePath: "mapped-component.tsx",
      fileHash: "3qcr5x2z3u56v",
      kind: "value",
      splices: {
        $rows: rows,
        $0splice0: _jsx(Text, {
          children: cs.create(
            [20, 42, 20, 58],
            {
              version: "0.0.0",
              filePath: "mapped-component.tsx",
              fileHash: "3qcr5x2z3u56v",
              kind: "value",
              splices: {},
              captures: ["row$3qcr5x2z3u56v$0"],
              spliceParams: {},
            },
            () => ({
              kind: 227,
              loc: [20, 45, 20, 57],
              left: {
                kind: 11,
                loc: [20, 45, 20, 51],
                text: "row ",
              },
              operatorToken: "+",
              right: {
                kind: 80,
                loc: [20, 54, 20, 57],
                text: "row",
                bindingKey: "row$3qcr5x2z3u56v$0",
              },
            }),
          ),
        }),
      },
      captures: [],
      spliceParams: { $rows: [], $0splice0: ["row$3qcr5x2z3u56v$0"] },
    },
    () => ({
      kind: 214,
      loc: [20, 13, 20, 69],
      expression: {
        kind: 212,
        loc: [20, 13, 20, 22],
        expression: {
          kind: 1000,
          loc: [20, 13, 20, 18],
          key: "$rows",
        },
        questionDotToken: false,
        name: "map",
      },
      questionDotToken: false,
      arguments: [
        {
          kind: 220,
          loc: [20, 23, 20, 68],
          parameters: [
            {
              kind: 170,
              loc: [20, 24, 20, 27],
              name: {
                kind: 80,
                loc: [20, 24, 20, 27],
                text: "row",
                bindingKey: "row$3qcr5x2z3u56v$0",
              },
            },
          ],
          body: {
            kind: 1000,
            loc: [20, 32, 20, 68],
            key: "$0splice0",
          },
        },
      ],
    }),
  ),
});
