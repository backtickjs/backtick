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
      fileHash: "1tovtvu7ffqaa",
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
            bindingKey: "flag$1tovtvu7ffqaa$0",
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
            bindingKey: "tone$1tovtvu7ffqaa$1",
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
            bindingKey: "step$1tovtvu7ffqaa$2",
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
                        loc: [30, 11, 30, 28],
                        expression: {
                          kind: ".",
                          loc: [30, 11, 30, 21],
                          expression: {
                            kind: "id",
                            loc: [30, 11, 30, 15],
                            text: "flag",
                            bindingKey: "flag$1tovtvu7ffqaa$0",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "false",
                            loc: [30, 22, 30, 27],
                          },
                        ],
                      },
                      {
                        kind: "()",
                        loc: [31, 11, 31, 35],
                        expression: {
                          kind: ".",
                          loc: [31, 11, 31, 21],
                          expression: {
                            kind: "id",
                            loc: [31, 11, 31, 15],
                            text: "tone",
                            bindingKey: "tone$1tovtvu7ffqaa$1",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "splice",
                            loc: [31, 22, 31, 34],
                            key: "$0splice1",
                          },
                        ],
                      },
                      {
                        kind: "()",
                        loc: [32, 11, 32, 30],
                        expression: {
                          kind: ".",
                          loc: [32, 11, 32, 21],
                          expression: {
                            kind: "id",
                            loc: [32, 11, 32, 15],
                            text: "step",
                            bindingKey: "step$1tovtvu7ffqaa$2",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "=>",
                            loc: [32, 22, 32, 29],
                            parameters: [],
                            body: {
                              kind: "number",
                              loc: [32, 28, 32, 29],
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
                loc: [35, 10, 35, 63],
                left: {
                  kind: "binop",
                  loc: [35, 10, 35, 47],
                  left: {
                    kind: "binop",
                    loc: [35, 10, 35, 41],
                    left: {
                      kind: "binop",
                      loc: [35, 10, 35, 27],
                      left: {
                        kind: "()",
                        loc: [35, 10, 35, 21],
                        expression: {
                          kind: ".",
                          loc: [35, 10, 35, 19],
                          expression: {
                            kind: "id",
                            loc: [35, 10, 35, 14],
                            text: "flag",
                            bindingKey: "flag$1tovtvu7ffqaa$0",
                          },
                          name: "read",
                        },
                        arguments: [],
                      },
                      operatorToken: "+",
                      right: {
                        kind: "string",
                        loc: [35, 24, 35, 27],
                        text: " ",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [35, 30, 35, 41],
                      expression: {
                        kind: ".",
                        loc: [35, 30, 35, 39],
                        expression: {
                          kind: "id",
                          loc: [35, 30, 35, 34],
                          text: "tone",
                          bindingKey: "tone$1tovtvu7ffqaa$1",
                        },
                        name: "read",
                      },
                      arguments: [],
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [35, 44, 35, 47],
                    text: " ",
                  },
                },
                operatorToken: "+",
                right: {
                  kind: "()",
                  loc: [35, 50, 35, 63],
                  expression: {
                    kind: "()",
                    loc: [35, 50, 35, 61],
                    expression: {
                      kind: ".",
                      loc: [35, 50, 35, 59],
                      expression: {
                        kind: "id",
                        loc: [35, 50, 35, 54],
                        text: "step",
                        bindingKey: "step$1tovtvu7ffqaa$2",
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
it("Widened", async (t) => {
  await snapshotCase(t, "Widened", _jsx(Widened, {}));
});
