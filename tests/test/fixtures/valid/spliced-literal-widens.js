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
export default cs.create(
  [21, 16, 26, 3],
  {
    version: "0.0.0",
    filePath: "spliced-literal-widens.ts",
    fileHash: "19qhn3op6tbxe",
    splices: {
      $state: state,
      $five: five,
      $0splice0: Color.Red,
      $0splice1: Color.Blue,
    },
    captures: [],
    spliceParams: { $state: [], $five: [], $0splice0: [], $0splice1: [] },
  },
  () => ({
    kind: 242,
    loc: [21, 19, 26, 2],
    statements: [
      {
        kind: 244,
        loc: [22, 3, 22, 27],
        declarationList: {
          kind: 262,
          loc: [22, 3, 22, 26],
          declarations: [
            {
              kind: 261,
              loc: [22, 9, 22, 26],
              name: {
                kind: 80,
                loc: [22, 9, 22, 10],
                text: "n",
                bindingKey: "n$19qhn3op6tbxe$0",
              },
              initializer: {
                kind: 214,
                loc: [22, 13, 22, 26],
                expression: {
                  kind: 1000,
                  loc: [22, 13, 22, 19],
                  key: "$state",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 1000,
                    loc: [22, 20, 22, 25],
                    key: "$five",
                  },
                ],
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 214,
        loc: [23, 3, 23, 13],
        expression: {
          kind: 212,
          loc: [23, 3, 23, 10],
          expression: {
            kind: 80,
            loc: [23, 3, 23, 4],
            text: "n",
            bindingKey: "n$19qhn3op6tbxe$0",
          },
          questionDotToken: false,
          name: "write",
        },
        questionDotToken: false,
        arguments: [
          {
            kind: 9,
            loc: [23, 11, 23, 12],
            value: 6,
          },
        ],
      },
      {
        kind: 244,
        loc: [24, 3, 24, 34],
        declarationList: {
          kind: 262,
          loc: [24, 3, 24, 33],
          declarations: [
            {
              kind: 261,
              loc: [24, 9, 24, 33],
              name: {
                kind: 80,
                loc: [24, 9, 24, 10],
                text: "c",
                bindingKey: "c$19qhn3op6tbxe$1",
              },
              initializer: {
                kind: 214,
                loc: [24, 13, 24, 33],
                expression: {
                  kind: 1000,
                  loc: [24, 13, 24, 19],
                  key: "$state",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 1000,
                    loc: [24, 20, 24, 32],
                    key: "$0splice0",
                  },
                ],
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 214,
        loc: [25, 3, 25, 25],
        expression: {
          kind: 212,
          loc: [25, 3, 25, 10],
          expression: {
            kind: 80,
            loc: [25, 3, 25, 4],
            text: "c",
            bindingKey: "c$19qhn3op6tbxe$1",
          },
          questionDotToken: false,
          name: "write",
        },
        questionDotToken: false,
        arguments: [
          {
            kind: 1000,
            loc: [25, 11, 25, 24],
            key: "$0splice1",
          },
        ],
      },
    ],
  }),
);
