import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
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
      splices: {
        $state: { value: state, params: [] },
        $0splice0: { value: Tone.Warm, params: [] },
        $0splice1: { value: Tone.Cool, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [21, 13, 36, 4],
      statements: [
        {
          kind: "const",
          loc: [22, 5, 22, 31],
          name: {
            kind: "id",
            loc: [22, 11, 22, 15],
            text: "flag",
            bindingKey: "flag$3g3dpqgwvflk3$0",
          },
          initializer: {
            kind: "()",
            loc: [22, 18, 22, 30],
            expression: {
              kind: "splice",
              loc: [22, 18, 22, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "true",
                loc: [22, 25, 22, 29],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [23, 5, 23, 39],
          name: {
            kind: "id",
            loc: [23, 11, 23, 15],
            text: "tone",
            bindingKey: "tone$3g3dpqgwvflk3$1",
          },
          initializer: {
            kind: "()",
            loc: [23, 18, 23, 38],
            expression: {
              kind: "splice",
              loc: [23, 18, 23, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "splice",
                loc: [23, 25, 23, 37],
                key: "$0splice0",
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [24, 5, 24, 48],
          name: {
            kind: "id",
            loc: [24, 11, 24, 15],
            text: "step",
            bindingKey: "step$3g3dpqgwvflk3$2",
          },
          initializer: {
            kind: "()",
            loc: [24, 18, 24, 47],
            expression: {
              kind: "splice",
              loc: [24, 18, 24, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "=>",
                loc: [24, 39, 24, 46],
                parameters: [],
                body: {
                  kind: "number",
                  loc: [24, 45, 24, 46],
                  value: 0,
                },
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [25, 5, 35, 7],
          expression: {
            kind: "jsx",
            loc: [26, 7, 34, 14],
            type: {
              kind: "string",
              loc: [26, 8, 26, 12],
              text: "span",
            },
            attributes: [
              {
                name: "onclick",
                initializer: {
                  kind: "=>",
                  loc: [27, 18, 31, 10],
                  parameters: [],
                  body: {
                    kind: "{}",
                    loc: [27, 24, 31, 10],
                    statements: [
                      {
                        kind: "()",
                        loc: [28, 11, 28, 28],
                        expression: {
                          kind: ".",
                          loc: [28, 11, 28, 21],
                          expression: {
                            kind: "id",
                            loc: [28, 11, 28, 15],
                            text: "flag",
                            bindingKey: "flag$3g3dpqgwvflk3$0",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "false",
                            loc: [28, 22, 28, 27],
                          },
                        ],
                      },
                      {
                        kind: "()",
                        loc: [29, 11, 29, 35],
                        expression: {
                          kind: ".",
                          loc: [29, 11, 29, 21],
                          expression: {
                            kind: "id",
                            loc: [29, 11, 29, 15],
                            text: "tone",
                            bindingKey: "tone$3g3dpqgwvflk3$1",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "splice",
                            loc: [29, 22, 29, 34],
                            key: "$0splice1",
                          },
                        ],
                      },
                      {
                        kind: "()",
                        loc: [30, 11, 30, 30],
                        expression: {
                          kind: ".",
                          loc: [30, 11, 30, 21],
                          expression: {
                            kind: "id",
                            loc: [30, 11, 30, 15],
                            text: "step",
                            bindingKey: "step$3g3dpqgwvflk3$2",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "=>",
                            loc: [30, 22, 30, 29],
                            parameters: [],
                            body: {
                              kind: "number",
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
                kind: "binop",
                loc: [33, 10, 33, 63],
                left: {
                  kind: "binop",
                  loc: [33, 10, 33, 47],
                  left: {
                    kind: "binop",
                    loc: [33, 10, 33, 41],
                    left: {
                      kind: "binop",
                      loc: [33, 10, 33, 27],
                      left: {
                        kind: "()",
                        loc: [33, 10, 33, 21],
                        expression: {
                          kind: ".",
                          loc: [33, 10, 33, 19],
                          expression: {
                            kind: "id",
                            loc: [33, 10, 33, 14],
                            text: "flag",
                            bindingKey: "flag$3g3dpqgwvflk3$0",
                          },
                          name: "read",
                        },
                        arguments: [],
                      },
                      operatorToken: "+",
                      right: {
                        kind: "string",
                        loc: [33, 24, 33, 27],
                        text: " ",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [33, 30, 33, 41],
                      expression: {
                        kind: ".",
                        loc: [33, 30, 33, 39],
                        expression: {
                          kind: "id",
                          loc: [33, 30, 33, 34],
                          text: "tone",
                          bindingKey: "tone$3g3dpqgwvflk3$1",
                        },
                        name: "read",
                      },
                      arguments: [],
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [33, 44, 33, 47],
                    text: " ",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "()",
                  loc: [33, 50, 33, 63],
                  expression: {
                    kind: "()",
                    loc: [33, 50, 33, 61],
                    expression: {
                      kind: ".",
                      loc: [33, 50, 33, 59],
                      expression: {
                        kind: "id",
                        loc: [33, 50, 33, 54],
                        text: "step",
                        bindingKey: "step$3g3dpqgwvflk3$2",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
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
