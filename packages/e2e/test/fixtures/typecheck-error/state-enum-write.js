import { cs, state } from "@backtickjs/core";
// A cell holds the enum member it was given rather than the enum, so the other
// member is not a value it takes. `cs.splice` is why: its constraint keeps the
// literal, where a member written in the script would widen the way a `let`
// does.
var Color;
(function (Color) {
  Color[(Color["Red"] = 0)] = "Red";
  Color[(Color["Blue"] = 1)] = "Blue";
})(Color || (Color = {}));
export default cs.create(
  [12, 16, 16, 3],
  {
    version: "0.0.0",
    filePath: "state-enum-write.ts",
    fileHash: "pmfpsbs4xhn8",
    kind: "value",
    splices: { $state: state, $0splice0: Color.Red, $0splice1: Color.Blue },
    captures: [],
    spliceParams: { $state: [], $0splice0: [], $0splice1: [] },
  },
  () => ({
    kind: 242,
    loc: [12, 19, 16, 2],
    statements: [
      {
        kind: 244,
        loc: [13, 3, 13, 37],
        declarationList: {
          kind: 262,
          loc: [13, 3, 13, 36],
          declarations: [
            {
              kind: 261,
              loc: [13, 9, 13, 36],
              name: {
                kind: 80,
                loc: [13, 9, 13, 13],
                text: "held",
                bindingKey: "held$pmfpsbs4xhn8$0",
              },
              initializer: {
                kind: 214,
                loc: [13, 16, 13, 36],
                expression: {
                  kind: 1000,
                  loc: [13, 16, 13, 22],
                  key: "$state",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 1000,
                    loc: [13, 23, 13, 35],
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
        loc: [14, 3, 14, 28],
        expression: {
          kind: 212,
          loc: [14, 3, 14, 13],
          expression: {
            kind: 80,
            loc: [14, 3, 14, 7],
            text: "held",
            bindingKey: "held$pmfpsbs4xhn8$0",
          },
          questionDotToken: false,
          name: "write",
        },
        questionDotToken: false,
        arguments: [
          {
            kind: 1000,
            loc: [14, 14, 14, 27],
            key: "$0splice1",
          },
        ],
      },
      {
        kind: 254,
        loc: [15, 3, 15, 12],
        expression: {
          kind: 9,
          loc: [15, 10, 15, 11],
          value: 1,
        },
      },
    ],
  }),
);
