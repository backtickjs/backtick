import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// A cell holding an enum, handed to a function whose parameter is that enum.
//
// The enum is spliced by name and read inside the script — `$Color.Red`, not
// `${Color.Red}`. Splicing the member pins the cell to that member: a spliced
// value reaches `$state` through `cs.splice`, whose constraint keeps the
// literal, so `Color.Red` is what the cell would hold and the other member
// would not be a value it takes (`state-enum-write` pins that). Read off the
// enum instead and the cell holds `Color`, which is what a write wants and what
// a function taking one accepts.
var Color;
(function (Color) {
  Color[(Color["Red"] = 0)] = "Red";
  Color[(Color["Blue"] = 1)] = "Blue";
})(Color || (Color = {}));
const label = cs.create(
  [17, 45, 19, 3],
  {
    version: "0.0.0",
    filePath: "state-enum.tsx",
    fileHash: "33xl6oe1r5l07",
    kind: "value",
    splices: { $Color: Color },
    captures: [],
    spliceParams: { $Color: [] },
  },
  () => ({
    kind: 220,
    loc: [17, 48, 19, 2],
    parameters: [
      {
        kind: 170,
        loc: [17, 49, 17, 57],
        name: {
          kind: 80,
          loc: [17, 49, 17, 50],
          text: "c",
          bindingKey: "c$33xl6oe1r5l07$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [17, 62, 19, 2],
      statements: [
        {
          kind: 254,
          loc: [18, 3, 18, 45],
          expression: {
            kind: 228,
            loc: [18, 10, 18, 44],
            condition: {
              kind: 227,
              loc: [18, 10, 18, 27],
              left: {
                kind: 80,
                loc: [18, 10, 18, 11],
                text: "c",
                bindingKey: "c$33xl6oe1r5l07$0",
              },
              operatorToken: "===",
              right: {
                kind: 212,
                loc: [18, 16, 18, 27],
                expression: {
                  kind: 1000,
                  loc: [18, 16, 18, 22],
                  key: "$Color",
                },
                questionDotToken: false,
                name: "Blue",
              },
            },
            whenTrue: {
              kind: 11,
              loc: [18, 30, 18, 36],
              text: "blue",
            },
            whenFalse: {
              kind: 11,
              loc: [18, 39, 18, 44],
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
    [22, 10, 27, 5],
    {
      version: "0.0.0",
      filePath: "state-enum.tsx",
      fileHash: "33xl6oe1r5l07",
      kind: "value",
      splices: { $state: state, $Color: Color, $label: label },
      captures: [],
      spliceParams: { $state: [], $Color: [], $label: [] },
    },
    () => ({
      kind: 242,
      loc: [22, 13, 27, 4],
      statements: [
        {
          kind: 244,
          loc: [23, 5, 23, 37],
          declarationList: {
            kind: 262,
            loc: [23, 5, 23, 36],
            declarations: [
              {
                kind: 261,
                loc: [23, 11, 23, 36],
                name: {
                  kind: 80,
                  loc: [23, 11, 23, 15],
                  text: "held",
                  bindingKey: "held$33xl6oe1r5l07$1",
                },
                initializer: {
                  kind: 214,
                  loc: [23, 18, 23, 36],
                  expression: {
                    kind: 1000,
                    loc: [23, 18, 23, 24],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 212,
                      loc: [23, 25, 23, 35],
                      expression: {
                        kind: 1000,
                        loc: [23, 25, 23, 31],
                        key: "$Color",
                      },
                      questionDotToken: false,
                      name: "Red",
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
          loc: [24, 5, 26, 7],
          expression: {
            kind: 285,
            loc: [25, 7, 25, 81],
            type: {
              kind: 11,
              loc: [25, 8, 25, 12],
              text: "span",
            },
            attributes: [
              {
                name: "onclick",
                initializer: {
                  kind: 220,
                  loc: [25, 22, 25, 51],
                  parameters: [],
                  body: {
                    kind: 214,
                    loc: [25, 28, 25, 51],
                    expression: {
                      kind: 212,
                      loc: [25, 28, 25, 38],
                      expression: {
                        kind: 80,
                        loc: [25, 28, 25, 32],
                        text: "held",
                        bindingKey: "held$33xl6oe1r5l07$1",
                      },
                      questionDotToken: false,
                      name: "write",
                    },
                    questionDotToken: false,
                    arguments: [
                      {
                        kind: 212,
                        loc: [25, 39, 25, 50],
                        expression: {
                          kind: 1000,
                          loc: [25, 39, 25, 45],
                          key: "$Color",
                        },
                        questionDotToken: false,
                        name: "Blue",
                      },
                    ],
                  },
                },
              },
            ],
            children: [
              {
                kind: 214,
                loc: [25, 54, 25, 73],
                expression: {
                  kind: 1000,
                  loc: [25, 54, 25, 60],
                  key: "$label",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 214,
                    loc: [25, 61, 25, 72],
                    expression: {
                      kind: 212,
                      loc: [25, 61, 25, 70],
                      expression: {
                        kind: 80,
                        loc: [25, 61, 25, 65],
                        text: "held",
                        bindingKey: "held$33xl6oe1r5l07$1",
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
