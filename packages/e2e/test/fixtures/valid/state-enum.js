import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// A cell holding an enum, handed to a function whose parameter is that enum.
//
// The cell holds the member it was given — `Color.Red`, not `Color` — because a
// spliced value reaches `$state` through `cs.splice`, whose constraint keeps the
// literal. That is narrower than what a `let` would hold, and it is why writing
// a different member to this cell is an error: `state-enum-write` pins that.
var Color;
(function (Color) {
  Color[(Color["Red"] = 0)] = "Red";
  Color[(Color["Blue"] = 1)] = "Blue";
})(Color || (Color = {}));
const label = cs.create(
  [14, 45, 16, 3],
  {
    version: "0.0.0",
    filePath: "state-enum.tsx",
    fileHash: "2g0cnab1gcqmd",
    kind: "value",
    splices: { $0splice0: Color.Blue },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: 220,
    loc: [14, 48, 16, 2],
    parameters: [
      {
        kind: 170,
        loc: [14, 49, 14, 57],
        name: {
          kind: 80,
          loc: [14, 49, 14, 50],
          text: "c",
          bindingKey: "c$2g0cnab1gcqmd$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [14, 62, 16, 2],
      statements: [
        {
          kind: 254,
          loc: [15, 3, 15, 47],
          expression: {
            kind: 228,
            loc: [15, 10, 15, 46],
            condition: {
              kind: 227,
              loc: [15, 10, 15, 29],
              left: {
                kind: 80,
                loc: [15, 10, 15, 11],
                text: "c",
                bindingKey: "c$2g0cnab1gcqmd$0",
              },
              operatorToken: "===",
              right: {
                kind: 1000,
                loc: [15, 16, 15, 29],
                key: "$0splice0",
              },
            },
            whenTrue: {
              kind: 11,
              loc: [15, 32, 15, 38],
              text: "blue",
            },
            whenFalse: {
              kind: 11,
              loc: [15, 41, 15, 46],
              text: "red",
            },
          },
        },
      ],
    },
  }),
);
async function Swatch() {
  return cs.create(
    [19, 10, 22, 5],
    {
      version: "0.0.0",
      filePath: "state-enum.tsx",
      fileHash: "2g0cnab1gcqmd",
      kind: "value",
      splices: { $state: state, $0splice0: Color.Red, $label: label },
      captures: [],
      spliceParams: { $state: [], $0splice0: [], $label: [] },
    },
    () => ({
      kind: 242,
      loc: [19, 13, 22, 4],
      statements: [
        {
          kind: 244,
          loc: [20, 5, 20, 39],
          declarationList: {
            kind: 262,
            loc: [20, 5, 20, 38],
            declarations: [
              {
                kind: 261,
                loc: [20, 11, 20, 38],
                name: {
                  kind: 80,
                  loc: [20, 11, 20, 15],
                  text: "held",
                  bindingKey: "held$2g0cnab1gcqmd$1",
                },
                initializer: {
                  kind: 214,
                  loc: [20, 18, 20, 38],
                  expression: {
                    kind: 1000,
                    loc: [20, 18, 20, 24],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 1000,
                      loc: [20, 25, 20, 37],
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
          kind: 254,
          loc: [21, 5, 21, 47],
          expression: {
            kind: 285,
            loc: [21, 12, 21, 46],
            type: {
              kind: 11,
              loc: [21, 13, 21, 17],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: 214,
                loc: [21, 19, 21, 38],
                expression: {
                  kind: 1000,
                  loc: [21, 19, 21, 25],
                  key: "$label",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 214,
                    loc: [21, 26, 21, 37],
                    expression: {
                      kind: 212,
                      loc: [21, 26, 21, 35],
                      expression: {
                        kind: 80,
                        loc: [21, 26, 21, 30],
                        text: "held",
                        bindingKey: "held$2g0cnab1gcqmd$1",
                      },
                      questionDotToken: false,
                      name: "read",
                    },
                    questionDotToken: false,
                    arguments: [],
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  );
}
export default _jsx(Swatch, {});
