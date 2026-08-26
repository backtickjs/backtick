import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// What a cell holds is the initial widened, so a second value of the same kind
// goes in after it. Each write is the assertion — every one is an error the
// moment `$state` reads its initial narrowly.
//
// The three kinds here are the ones nothing else pins: a boolean, a string enum
// — which widens to its enum and not to the `string` under it — and a function,
// whose answer widens so the cell takes another of the same shape rather than
// only the one it was built from. `local-state` covers a number,
// `script-element` a string, and `state-enum` a numeric enum.
var Tone;
(function (Tone) {
  Tone["Warm"] = "warm";
  Tone["Cool"] = "cool";
})(Tone || (Tone = {}));
async function Widened() {
  return cs.create(
    [18, 10, 33, 5],
    {
      version: "0.0.0",
      filePath: "state-widening.tsx",
      fileHash: "3vpdmance4r70",
      kind: "value",
      splices: { $state: state, $0splice0: Tone.Warm, $0splice1: Tone.Cool },
      captures: [],
      spliceParams: { $state: [], $0splice0: [], $0splice1: [] },
    },
    () => ({
      kind: 242,
      loc: [18, 13, 33, 4],
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
                  bindingKey: "flag$3vpdmance4r70$0",
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
                  bindingKey: "tone$3vpdmance4r70$1",
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
          kind: 244,
          loc: [21, 5, 21, 34],
          declarationList: {
            kind: 262,
            loc: [21, 5, 21, 33],
            declarations: [
              {
                kind: 261,
                loc: [21, 11, 21, 33],
                name: {
                  kind: 80,
                  loc: [21, 11, 21, 15],
                  text: "step",
                  bindingKey: "step$3vpdmance4r70$2",
                },
                initializer: {
                  kind: 214,
                  loc: [21, 18, 21, 33],
                  expression: {
                    kind: 1000,
                    loc: [21, 18, 21, 24],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 220,
                      loc: [21, 25, 21, 32],
                      parameters: [],
                      body: {
                        kind: 9,
                        loc: [21, 31, 21, 32],
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
          kind: 254,
          loc: [22, 5, 32, 7],
          expression: {
            kind: 285,
            loc: [23, 7, 31, 14],
            type: {
              kind: 11,
              loc: [23, 8, 23, 12],
              text: "span",
            },
            attributes: [
              {
                name: "onclick",
                initializer: {
                  kind: 220,
                  loc: [24, 18, 28, 10],
                  parameters: [],
                  body: {
                    kind: 242,
                    loc: [24, 24, 28, 10],
                    statements: [
                      {
                        kind: 214,
                        loc: [25, 11, 25, 28],
                        expression: {
                          kind: 212,
                          loc: [25, 11, 25, 21],
                          expression: {
                            kind: 80,
                            loc: [25, 11, 25, 15],
                            text: "flag",
                            bindingKey: "flag$3vpdmance4r70$0",
                          },
                          questionDotToken: false,
                          name: "write",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 97,
                            loc: [25, 22, 25, 27],
                          },
                        ],
                      },
                      {
                        kind: 214,
                        loc: [26, 11, 26, 35],
                        expression: {
                          kind: 212,
                          loc: [26, 11, 26, 21],
                          expression: {
                            kind: 80,
                            loc: [26, 11, 26, 15],
                            text: "tone",
                            bindingKey: "tone$3vpdmance4r70$1",
                          },
                          questionDotToken: false,
                          name: "write",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 1000,
                            loc: [26, 22, 26, 34],
                            key: "$0splice1",
                          },
                        ],
                      },
                      {
                        kind: 214,
                        loc: [27, 11, 27, 30],
                        expression: {
                          kind: 212,
                          loc: [27, 11, 27, 21],
                          expression: {
                            kind: 80,
                            loc: [27, 11, 27, 15],
                            text: "step",
                            bindingKey: "step$3vpdmance4r70$2",
                          },
                          questionDotToken: false,
                          name: "write",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 220,
                            loc: [27, 22, 27, 29],
                            parameters: [],
                            body: {
                              kind: 9,
                              loc: [27, 28, 27, 29],
                              value: 1,
                            },
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
                loc: [30, 10, 30, 63],
                left: {
                  kind: 227,
                  loc: [30, 10, 30, 47],
                  left: {
                    kind: 227,
                    loc: [30, 10, 30, 41],
                    left: {
                      kind: 227,
                      loc: [30, 10, 30, 27],
                      left: {
                        kind: 214,
                        loc: [30, 10, 30, 21],
                        expression: {
                          kind: 212,
                          loc: [30, 10, 30, 19],
                          expression: {
                            kind: 80,
                            loc: [30, 10, 30, 14],
                            text: "flag",
                            bindingKey: "flag$3vpdmance4r70$0",
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
                        loc: [30, 24, 30, 27],
                        text: " ",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: 214,
                      loc: [30, 30, 30, 41],
                      expression: {
                        kind: 212,
                        loc: [30, 30, 30, 39],
                        expression: {
                          kind: 80,
                          loc: [30, 30, 30, 34],
                          text: "tone",
                          bindingKey: "tone$3vpdmance4r70$1",
                        },
                        questionDotToken: false,
                        name: "read",
                      },
                      questionDotToken: false,
                      arguments: [],
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: 11,
                    loc: [30, 44, 30, 47],
                    text: " ",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: 214,
                  loc: [30, 50, 30, 63],
                  expression: {
                    kind: 214,
                    loc: [30, 50, 30, 61],
                    expression: {
                      kind: 212,
                      loc: [30, 50, 30, 59],
                      expression: {
                        kind: 80,
                        loc: [30, 50, 30, 54],
                        text: "step",
                        bindingKey: "step$3vpdmance4r70$2",
                      },
                      questionDotToken: false,
                      name: "read",
                    },
                    questionDotToken: false,
                    arguments: [],
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
