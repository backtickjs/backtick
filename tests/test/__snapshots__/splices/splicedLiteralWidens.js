import { cs, state } from "@backtickjs/core";
// What a splice hands over keeps the width the host gave it.
//
// `const five = 5` has the literal type `5`, and an enum member has its own, so
// a cell built from either would take no other value if the splice retyped what
// it crossed. It does not: `cs.splice` reads its argument unbound, leaving the
// binding to decide the width — `number` for the one, `Color` for the other.
//
// The writes are the assertion, each an error the moment a bound comes back to
// `cs.splice`. An action, so a write is what the script is for: in one that
// returns a value they would be side effects as well, and that error would
// stand beside the one under test.
var Color;
(function (Color) {
  Color[(Color["Red"] = 0)] = "Red";
  Color[(Color["Blue"] = 1)] = "Blue";
})(Color || (Color = {}));
const five = 5;
const splicedLiteralWidens = cs.create(
  [21, 30, 26, 3],
  {
    version: "0.0.0",
    filePath: "splicedLiteralWidens.tsx",
    fileHash: "3me7hui51nq9c",
    splices: {
      $state: { value: state, params: [] },
      $five: { value: five, params: [] },
      $0splice0: { value: Color.Red, params: [] },
      $0splice1: { value: Color.Blue, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [21, 33, 26, 2],
    statements: [
      {
        kind: "const",
        loc: [22, 3, 22, 27],
        name: {
          kind: "id",
          loc: [22, 9, 22, 10],
          text: "n",
          bindingKey: "n$3me7hui51nq9c$0",
        },
        initializer: {
          kind: "()",
          loc: [22, 13, 22, 26],
          expression: {
            kind: "splice",
            loc: [22, 13, 22, 19],
            key: "$state",
          },
          arguments: [
            {
              kind: "splice",
              loc: [22, 20, 22, 25],
              key: "$five",
            },
          ],
        },
      },
      {
        kind: "()",
        loc: [23, 3, 23, 13],
        expression: {
          kind: ".",
          loc: [23, 3, 23, 10],
          expression: {
            kind: "id",
            loc: [23, 3, 23, 4],
            text: "n",
            bindingKey: "n$3me7hui51nq9c$0",
          },
          name: "write",
        },
        arguments: [
          {
            kind: "number",
            loc: [23, 11, 23, 12],
            value: 6,
          },
        ],
      },
      {
        kind: "const",
        loc: [24, 3, 24, 34],
        name: {
          kind: "id",
          loc: [24, 9, 24, 10],
          text: "c",
          bindingKey: "c$3me7hui51nq9c$1",
        },
        initializer: {
          kind: "()",
          loc: [24, 13, 24, 33],
          expression: {
            kind: "splice",
            loc: [24, 13, 24, 19],
            key: "$state",
          },
          arguments: [
            {
              kind: "splice",
              loc: [24, 20, 24, 32],
              key: "$0splice0",
            },
          ],
        },
      },
      {
        kind: "()",
        loc: [25, 3, 25, 25],
        expression: {
          kind: ".",
          loc: [25, 3, 25, 10],
          expression: {
            kind: "id",
            loc: [25, 3, 25, 4],
            text: "c",
            bindingKey: "c$3me7hui51nq9c$1",
          },
          name: "write",
        },
        arguments: [
          {
            kind: "splice",
            loc: [25, 11, 25, 24],
            key: "$0splice1",
          },
        ],
      },
    ],
  }),
);
