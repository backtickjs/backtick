import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// What a cell holds is the initial widened, so a second value of the same kind
// goes in after it. Each write is the assertion — every one is an error the
// moment `$state` reads its initial narrowly.
//
// A function is the one initial that does not widen on its own: what an arrow
// answers with widens only against a contextual type, and `$state` takes its
// initial unbound so that every other kind does widen. Written out, the type
// argument is the contextual type — `$state<() => number>` holds a function
// answering with any number rather than only the one it was built from.
//
// `local-state` covers a number, `script-element` a string, and `state-enum` a
// numeric enum handed to a function typed as it.
var Tone;
(function (Tone) {
  Tone["Warm"] = "warm";
  Tone["Cool"] = "cool";
})(Tone || (Tone = {}));
async function Widened() {
  return cs.create(
    [21, 10, 36, 5],
    {
      version: "0.0.0",
      filePath: "state-widening.tsx",
      fileHash: "3g3dpqgwvflk3",
      kind: "value",
      splices: { $state: state, $0splice0: Tone.Warm, $0splice1: Tone.Cool },
      captures: [],
      spliceParams: { $state: [], $0splice0: [], $0splice1: [] },
    },
    () => ({
      kind: 242,
      loc: [21, 13, 36, 4],
      statements: [
        {
          kind: 244,
          loc: [22, 5, 22, 31],
          declarationList: {
            kind: 262,
            loc: [22, 5, 22, 30],
            declarations: [
              {
                kind: 261,
                loc: [22, 11, 22, 30],
                name: {
                  kind: 80,
                  loc: [22, 11, 22, 15],
                  text: "flag",
                  bindingKey: "flag$3g3dpqgwvflk3$0",
                },
                initializer: {
                  kind: 214,
                  loc: [22, 18, 22, 30],
                  expression: {
                    kind: 1000,
                    loc: [22, 18, 22, 24],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 112,
                      loc: [22, 25, 22, 29],
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
          loc: [23, 5, 23, 39],
          declarationList: {
            kind: 262,
            loc: [23, 5, 23, 38],
            declarations: [
              {
                kind: 261,
                loc: [23, 11, 23, 38],
                name: {
                  kind: 80,
                  loc: [23, 11, 23, 15],
                  text: "tone",
                  bindingKey: "tone$3g3dpqgwvflk3$1",
                },
                initializer: {
                  kind: 214,
                  loc: [23, 18, 23, 38],
                  expression: {
                    kind: 1000,
                    loc: [23, 18, 23, 24],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 1000,
                      loc: [23, 25, 23, 37],
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
          loc: [24, 5, 24, 48],
          declarationList: {
            kind: 262,
            loc: [24, 5, 24, 47],
            declarations: [
              {
                kind: 261,
                loc: [24, 11, 24, 47],
                name: {
                  kind: 80,
                  loc: [24, 11, 24, 15],
                  text: "step",
                  bindingKey: "step$3g3dpqgwvflk3$2",
                },
                initializer: {
                  kind: 214,
                  loc: [24, 18, 24, 47],
                  expression: {
                    kind: 1000,
                    loc: [24, 18, 24, 24],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 220,
                      loc: [24, 39, 24, 46],
                      parameters: [],
                      body: {
                        kind: 9,
                        loc: [24, 45, 24, 46],
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
          loc: [25, 5, 35, 7],
          expression: {
            kind: 285,
            loc: [26, 7, 34, 14],
            type: {
              kind: 11,
              loc: [26, 8, 26, 12],
              text: "span",
            },
            attributes: [
              {
                name: "onclick",
                initializer: {
                  kind: 220,
                  loc: [27, 18, 31, 10],
                  parameters: [],
                  body: {
                    kind: 242,
                    loc: [27, 24, 31, 10],
                    statements: [
                      {
                        kind: 214,
                        loc: [28, 11, 28, 28],
                        expression: {
                          kind: 212,
                          loc: [28, 11, 28, 21],
                          expression: {
                            kind: 80,
                            loc: [28, 11, 28, 15],
                            text: "flag",
                            bindingKey: "flag$3g3dpqgwvflk3$0",
                          },
                          questionDotToken: false,
                          name: "write",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 97,
                            loc: [28, 22, 28, 27],
                          },
                        ],
                      },
                      {
                        kind: 214,
                        loc: [29, 11, 29, 35],
                        expression: {
                          kind: 212,
                          loc: [29, 11, 29, 21],
                          expression: {
                            kind: 80,
                            loc: [29, 11, 29, 15],
                            text: "tone",
                            bindingKey: "tone$3g3dpqgwvflk3$1",
                          },
                          questionDotToken: false,
                          name: "write",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 1000,
                            loc: [29, 22, 29, 34],
                            key: "$0splice1",
                          },
                        ],
                      },
                      {
                        kind: 214,
                        loc: [30, 11, 30, 30],
                        expression: {
                          kind: 212,
                          loc: [30, 11, 30, 21],
                          expression: {
                            kind: 80,
                            loc: [30, 11, 30, 15],
                            text: "step",
                            bindingKey: "step$3g3dpqgwvflk3$2",
                          },
                          questionDotToken: false,
                          name: "write",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 220,
                            loc: [30, 22, 30, 29],
                            parameters: [],
                            body: {
                              kind: 9,
                              loc: [30, 28, 30, 29],
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
                loc: [33, 10, 33, 63],
                left: {
                  kind: 227,
                  loc: [33, 10, 33, 47],
                  left: {
                    kind: 227,
                    loc: [33, 10, 33, 41],
                    left: {
                      kind: 227,
                      loc: [33, 10, 33, 27],
                      left: {
                        kind: 214,
                        loc: [33, 10, 33, 21],
                        expression: {
                          kind: 212,
                          loc: [33, 10, 33, 19],
                          expression: {
                            kind: 80,
                            loc: [33, 10, 33, 14],
                            text: "flag",
                            bindingKey: "flag$3g3dpqgwvflk3$0",
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
                        loc: [33, 24, 33, 27],
                        text: " ",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: 214,
                      loc: [33, 30, 33, 41],
                      expression: {
                        kind: 212,
                        loc: [33, 30, 33, 39],
                        expression: {
                          kind: 80,
                          loc: [33, 30, 33, 34],
                          text: "tone",
                          bindingKey: "tone$3g3dpqgwvflk3$1",
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
                    loc: [33, 44, 33, 47],
                    text: " ",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: 214,
                  loc: [33, 50, 33, 63],
                  expression: {
                    kind: 214,
                    loc: [33, 50, 33, 61],
                    expression: {
                      kind: 212,
                      loc: [33, 50, 33, 59],
                      expression: {
                        kind: 80,
                        loc: [33, 50, 33, 54],
                        text: "step",
                        bindingKey: "step$3g3dpqgwvflk3$2",
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
