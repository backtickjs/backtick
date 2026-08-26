import { cs, state } from "@backtickjs/core";
// A cell holding a function holds the one it was built from, and no other.
//
// Every other initial widens, because `$state` takes it unbound and the call
// site decides the width the way TypeScript decides every other one — that is
// what `state-widening` pins. A function is where the two part: what an arrow
// answers with widens only against a contextual type, and an unbound parameter
// is not one. So `() => 0` stays a `() => 0`.
//
// The bound that would fix it is the one the schema no longer writes: it would
// pin every other initial instead, which is the worse half of the trade.
export default cs.create(
  [13, 16, 16, 3],
  {
    version: "0.0.0",
    filePath: "state-holds-function.ts",
    fileHash: "1sk1854epbwv7",
    kind: "action",
    splices: { $state: state },
    captures: [],
    spliceParams: { $state: [] },
  },
  () => ({
    kind: 242,
    loc: [13, 19, 16, 2],
    statements: [
      {
        kind: 244,
        loc: [14, 3, 14, 32],
        declarationList: {
          kind: 262,
          loc: [14, 3, 14, 31],
          declarations: [
            {
              kind: 261,
              loc: [14, 9, 14, 31],
              name: {
                kind: 80,
                loc: [14, 9, 14, 13],
                text: "step",
                bindingKey: "step$1sk1854epbwv7$0",
              },
              initializer: {
                kind: 214,
                loc: [14, 16, 14, 31],
                expression: {
                  kind: 1000,
                  loc: [14, 16, 14, 22],
                  key: "$state",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 220,
                    loc: [14, 23, 14, 30],
                    parameters: [],
                    body: {
                      kind: 9,
                      loc: [14, 29, 14, 30],
                      value: 0,
                    },
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
        loc: [15, 3, 15, 22],
        expression: {
          kind: 212,
          loc: [15, 3, 15, 13],
          expression: {
            kind: 80,
            loc: [15, 3, 15, 7],
            text: "step",
            bindingKey: "step$1sk1854epbwv7$0",
          },
          questionDotToken: false,
          name: "write",
        },
        questionDotToken: false,
        arguments: [
          {
            kind: 220,
            loc: [15, 14, 15, 21],
            parameters: [],
            body: {
              kind: 9,
              loc: [15, 20, 15, 21],
              value: 1,
            },
          },
        ],
      },
    ],
  }),
);
