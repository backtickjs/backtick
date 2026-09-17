import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
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
// `Stepper` covers a number, and `Swatch` a numeric enum handed to a function
// typed as it.
var Tone;
(function (Tone) {
  Tone["Warm"] = "warm";
  Tone["Cool"] = "cool";
})(Tone || (Tone = {}));
async function Widened() {
  return cs.create(
    [23, 10, 38, 5],
    {
      version: "0.0.0",
      filePath: "state/state-widening.test.tsx",
      fileHash: "2832bhm4681w5",
      splices: {
        $state: { value: state, params: [] },
        $0splice0: { value: Tone.Warm, params: [] },
        $0splice1: { value: Tone.Cool, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [23, 13, 38, 4],
      statements: [
        {
          kind: "const",
          loc: [24, 5, 24, 31],
          name: {
            kind: "id",
            loc: [24, 11, 24, 15],
            text: "flag",
            bindingKey: "flag$2832bhm4681w5$0",
          },
          initializer: {
            kind: "()",
            loc: [24, 18, 24, 30],
            expression: {
              kind: "splice",
              loc: [24, 18, 24, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "true",
                loc: [24, 25, 24, 29],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [25, 5, 25, 39],
          name: {
            kind: "id",
            loc: [25, 11, 25, 15],
            text: "tone",
            bindingKey: "tone$2832bhm4681w5$1",
          },
          initializer: {
            kind: "()",
            loc: [25, 18, 25, 38],
            expression: {
              kind: "splice",
              loc: [25, 18, 25, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "splice",
                loc: [25, 25, 25, 37],
                key: "$0splice0",
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [26, 5, 26, 48],
          name: {
            kind: "id",
            loc: [26, 11, 26, 15],
            text: "step",
            bindingKey: "step$2832bhm4681w5$2",
          },
          initializer: {
            kind: "()",
            loc: [26, 18, 26, 47],
            expression: {
              kind: "splice",
              loc: [26, 18, 26, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "=>",
                loc: [26, 39, 26, 46],
                parameters: [],
                body: {
                  kind: "number",
                  loc: [26, 45, 26, 46],
                  value: 0,
                },
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [27, 5, 37, 7],
          expression: {
            kind: "jsx",
            loc: [28, 7, 36, 14],
            type: {
              kind: "string",
              loc: [28, 8, 28, 12],
              text: "span",
            },
            attributes: [
              {
                name: "onclick",
                initializer: {
                  kind: "=>",
                  loc: [29, 18, 33, 10],
                  parameters: [],
                  body: {
                    kind: "{}",
                    loc: [29, 24, 33, 10],
                    statements: [
                      {
                        kind: "()",
                        loc: [30, 11, 30, 26],
                        expression: {
                          kind: ".",
                          loc: [30, 11, 30, 19],
                          expression: {
                            kind: "id",
                            loc: [30, 11, 30, 15],
                            text: "flag",
                            bindingKey: "flag$2832bhm4681w5$0",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "false",
                            loc: [30, 20, 30, 25],
                          },
                        ],
                      },
                      {
                        kind: "()",
                        loc: [31, 11, 31, 33],
                        expression: {
                          kind: ".",
                          loc: [31, 11, 31, 19],
                          expression: {
                            kind: "id",
                            loc: [31, 11, 31, 15],
                            text: "tone",
                            bindingKey: "tone$2832bhm4681w5$1",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "splice",
                            loc: [31, 20, 31, 32],
                            key: "$0splice1",
                          },
                        ],
                      },
                      {
                        kind: "()",
                        loc: [32, 11, 32, 28],
                        expression: {
                          kind: ".",
                          loc: [32, 11, 32, 19],
                          expression: {
                            kind: "id",
                            loc: [32, 11, 32, 15],
                            text: "step",
                            bindingKey: "step$2832bhm4681w5$2",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "=>",
                            loc: [32, 20, 32, 27],
                            parameters: [],
                            body: {
                              kind: "number",
                              loc: [32, 26, 32, 27],
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
                loc: [35, 10, 35, 60],
                left: {
                  kind: "binop",
                  loc: [35, 10, 35, 45],
                  left: {
                    kind: "binop",
                    loc: [35, 10, 35, 39],
                    left: {
                      kind: "binop",
                      loc: [35, 10, 35, 26],
                      left: {
                        kind: "()",
                        loc: [35, 10, 35, 20],
                        expression: {
                          kind: ".",
                          loc: [35, 10, 35, 18],
                          expression: {
                            kind: "id",
                            loc: [35, 10, 35, 14],
                            text: "flag",
                            bindingKey: "flag$2832bhm4681w5$0",
                          },
                          name: "get",
                        },
                        arguments: [],
                      },
                      operatorToken: "+",
                      right: {
                        kind: "string",
                        loc: [35, 23, 35, 26],
                        text: " ",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [35, 29, 35, 39],
                      expression: {
                        kind: ".",
                        loc: [35, 29, 35, 37],
                        expression: {
                          kind: "id",
                          loc: [35, 29, 35, 33],
                          text: "tone",
                          bindingKey: "tone$2832bhm4681w5$1",
                        },
                        name: "get",
                      },
                      arguments: [],
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [35, 42, 35, 45],
                    text: " ",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "()",
                  loc: [35, 48, 35, 60],
                  expression: {
                    kind: "()",
                    loc: [35, 48, 35, 58],
                    expression: {
                      kind: ".",
                      loc: [35, 48, 35, 56],
                      expression: {
                        kind: "id",
                        loc: [35, 48, 35, 52],
                        text: "step",
                        bindingKey: "step$2832bhm4681w5$2",
                      },
                      name: "get",
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
it("Widened", async (t) => {
  await snapshotCase(t, "Widened", _jsx(Widened, {}));
});
