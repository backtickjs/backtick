import { cs, state } from "@backtickjs/core";
// Splicing the member pins the cell to it. `${Color.Red}` reaches `$state`
// through `cs.splice`, whose constraint keeps the literal, so what the cell
// holds is `Color.Red` and the other member is not a value it takes.
//
// Splice the enum and read the member inside the script instead — `$Color.Red`,
// which `state-enum` writes — and the cell holds `Color`, which is what a write
// wants.
var Color;
(function (Color) {
  Color[(Color["Red"] = 0)] = "Red";
  Color[(Color["Blue"] = 1)] = "Blue";
})(Color || (Color = {}));
// An action, so the write is the only thing under test: in a script that
// returns a value it would be a side effect as well, and that error would stand
// beside this one.
export default cs.create(
  [18, 16, 21, 3],
  {
    version: "0.0.0",
    filePath: "state-enum-write.ts",
    fileHash: "inm6br2x0cat",
    kind: "action",
    splices: { $state: state, $0splice0: Color.Red, $0splice1: Color.Blue },
    captures: [],
    spliceParams: { $state: [], $0splice0: [], $0splice1: [] },
  },
  () => ({
    kind: 242,
    loc: [18, 19, 21, 2],
    statements: [
      {
        kind: 244,
        loc: [19, 3, 19, 37],
        declarationList: {
          kind: 262,
          loc: [19, 3, 19, 36],
          declarations: [
            {
              kind: 261,
              loc: [19, 9, 19, 36],
              name: {
                kind: 80,
                loc: [19, 9, 19, 13],
                text: "held",
                bindingKey: "held$inm6br2x0cat$0",
              },
              initializer: {
                kind: 214,
                loc: [19, 16, 19, 36],
                expression: {
                  kind: 1000,
                  loc: [19, 16, 19, 22],
                  key: "$state",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 1000,
                    loc: [19, 23, 19, 35],
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
        loc: [20, 3, 20, 28],
        expression: {
          kind: 212,
          loc: [20, 3, 20, 13],
          expression: {
            kind: 80,
            loc: [20, 3, 20, 7],
            text: "held",
            bindingKey: "held$inm6br2x0cat$0",
          },
          questionDotToken: false,
          name: "write",
        },
        questionDotToken: false,
        arguments: [
          {
            kind: 1000,
            loc: [20, 14, 20, 27],
            key: "$0splice1",
          },
        ],
      },
    ],
  }),
);
