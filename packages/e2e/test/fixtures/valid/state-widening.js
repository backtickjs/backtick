import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// What a cell holds is the initial widened, so a second value of the same kind
// goes in after it. Each write is the assertion — every one is an error the
// moment `$state` reads its initial narrowly.
//
// The two kinds here are the ones nothing else pins: a boolean, and a string
// enum, which widens to its enum and not to the `string` under it. A function
// is the one initial that does not widen — `state-holds-function` pins that.
// `local-state` covers a number, `script-element` a string, and `state-enum` a
// numeric enum handed to a function typed as it.
var Tone;
(function (Tone) {
  Tone["Warm"] = "warm";
  Tone["Cool"] = "cool";
})(Tone || (Tone = {}));
async function Widened() {
  return cs.create(
    [18, 10, 31, 5],
    {
      version: "0.0.0",
      filePath: "state-widening.tsx",
      fileHash: "s75udac1h1xe",
      kind: "value",
      splices: { $state: state, $0splice0: Tone.Warm, $0splice1: Tone.Cool },
      captures: [],
      spliceParams: { $state: [], $0splice0: [], $0splice1: [] },
    },
    () => ({
      kind: 242,
      loc: [18, 13, 31, 4],
      statements: [
        {
          kind: 244,
          loc: [19, 5, 19, 31],
          declarationList: {
            kind: 262,
            loc: [19, 5, 19, 30],
            declarations: [
              {
                kind: 261,
                loc: [19, 11, 19, 30],
                name: {
                  kind: 80,
                  loc: [19, 11, 19, 15],
                  text: "flag",
                  bindingKey: "flag$s75udac1h1xe$0",
                },
                initializer: {
                  kind: 214,
                  loc: [19, 18, 19, 30],
                  expression: {
                    kind: 1000,
                    loc: [19, 18, 19, 24],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 112,
                      loc: [19, 25, 19, 29],
                    },
                  ],
                },
              },
            ],
            keyword: "const",
          },
        },
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
                  text: "tone",
                  bindingKey: "tone$s75udac1h1xe$1",
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
          loc: [21, 5, 30, 7],
          expression: {
            kind: 285,
            loc: [22, 7, 29, 14],
            type: {
              kind: 11,
              loc: [22, 8, 22, 12],
              text: "span",
            },
            attributes: [
              {
                name: "onclick",
                initializer: {
                  kind: 220,
                  loc: [23, 18, 26, 10],
                  parameters: [],
                  body: {
                    kind: 242,
                    loc: [23, 24, 26, 10],
                    statements: [
                      {
                        kind: 214,
                        loc: [24, 11, 24, 28],
                        expression: {
                          kind: 212,
                          loc: [24, 11, 24, 21],
                          expression: {
                            kind: 80,
                            loc: [24, 11, 24, 15],
                            text: "flag",
                            bindingKey: "flag$s75udac1h1xe$0",
                          },
                          questionDotToken: false,
                          name: "write",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 97,
                            loc: [24, 22, 24, 27],
                          },
                        ],
                      },
                      {
                        kind: 214,
                        loc: [25, 11, 25, 35],
                        expression: {
                          kind: 212,
                          loc: [25, 11, 25, 21],
                          expression: {
                            kind: 80,
                            loc: [25, 11, 25, 15],
                            text: "tone",
                            bindingKey: "tone$s75udac1h1xe$1",
                          },
                          questionDotToken: false,
                          name: "write",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 1000,
                            loc: [25, 22, 25, 34],
                            key: "$0splice1",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            children: [
              {
                kind: 227,
                loc: [28, 10, 28, 41],
                left: {
                  kind: 227,
                  loc: [28, 10, 28, 27],
                  left: {
                    kind: 214,
                    loc: [28, 10, 28, 21],
                    expression: {
                      kind: 212,
                      loc: [28, 10, 28, 19],
                      expression: {
                        kind: 80,
                        loc: [28, 10, 28, 14],
                        text: "flag",
                        bindingKey: "flag$s75udac1h1xe$0",
                      },
                      questionDotToken: false,
                      name: "read",
                    },
                    questionDotToken: false,
                    arguments: [],
                  },
                  operatorToken: "+",
                  right: {
                    kind: 11,
                    loc: [28, 24, 28, 27],
                    text: " ",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: 214,
                  loc: [28, 30, 28, 41],
                  expression: {
                    kind: 212,
                    loc: [28, 30, 28, 39],
                    expression: {
                      kind: 80,
                      loc: [28, 30, 28, 34],
                      text: "tone",
                      bindingKey: "tone$s75udac1h1xe$1",
                    },
                    questionDotToken: false,
                    name: "read",
                  },
                  questionDotToken: false,
                  arguments: [],
                },
              },
            ],
          },
        },
      ],
    }),
  );
}
export default _jsx(Widened, {});
