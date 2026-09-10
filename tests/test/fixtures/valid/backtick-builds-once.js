import { jsx as _jsx } from "@backtickjs/web/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/web";
// A component that draws a bundle it is still waiting for.
//
// What this pins is that it is built once. `insert` reads what it was given
// inside the computation it makes, so a drawing that watches itself used to tie
// the two together: the answer arriving changed the drawing, which ran the
// expression that made it, which was this component again — new cells, and the
// wait started over.
//
// `asked` is the page's, so it survives a rebuild and counts them. It also ends
// one: once it stops answering, a write of `null` over `null` changes nothing
// and nothing runs again — a loop that would otherwise have no end.
async function Answer() {
  return cs.create(
    [18, 10, 18, 35],
    {
      version: "0.0.0",
      filePath: "backtick-builds-once.tsx",
      fileHash: "2x8k8srxyyhq0",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [18, 13, 18, 34],
      type: {
        kind: "string",
        loc: [18, 14, 18, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "string",
          loc: [18, 18, 18, 28],
          text: "answered",
        },
      ],
    }),
  );
}
const answer = await bundler.run(_jsx(Answer, {}));
async function Waiting({ ask }) {
  return cs.create(
    [28, 10, 32, 5],
    {
      version: "0.0.0",
      filePath: "backtick-builds-once.tsx",
      fileHash: "2x8k8srxyyhq0",
      splices: {
        $state: { value: state, params: [] },
        $window: { value: window, params: [] },
        $ask: { value: ask, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [28, 13, 32, 4],
      statements: [
        {
          kind: "const",
          loc: [29, 5, 29, 64],
          name: {
            kind: "id",
            loc: [29, 11, 29, 16],
            text: "drawn",
            bindingKey: "drawn$2x8k8srxyyhq0$0",
          },
          initializer: {
            kind: "()",
            loc: [29, 19, 29, 63],
            expression: {
              kind: "splice",
              loc: [29, 19, 29, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "null",
                loc: [29, 58, 29, 62],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [30, 5, 30, 70],
          name: {
            kind: "id",
            loc: [30, 11, 30, 18],
            text: "started",
            bindingKey: "started$2x8k8srxyyhq0$1",
          },
          initializer: {
            kind: "()",
            loc: [30, 21, 30, 69],
            expression: {
              kind: ".",
              loc: [30, 21, 30, 39],
              expression: {
                kind: "splice",
                loc: [30, 21, 30, 28],
                key: "$window",
              },
              name: "setTimeout",
            },
            arguments: [
              {
                kind: "=>",
                loc: [30, 40, 30, 65],
                parameters: [],
                body: {
                  kind: "()",
                  loc: [30, 46, 30, 65],
                  expression: {
                    kind: ".",
                    loc: [30, 46, 30, 57],
                    expression: {
                      kind: "id",
                      loc: [30, 46, 30, 51],
                      text: "drawn",
                      bindingKey: "drawn$2x8k8srxyyhq0$0",
                    },
                    name: "write",
                  },
                  arguments: [
                    {
                      kind: "()",
                      loc: [30, 58, 30, 64],
                      expression: {
                        kind: "splice",
                        loc: [30, 58, 30, 62],
                        key: "$ask",
                      },
                      arguments: [],
                    },
                  ],
                },
              },
              {
                kind: "number",
                loc: [30, 67, 30, 68],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [31, 5, 31, 47],
          expression: {
            kind: "jsx",
            loc: [31, 12, 31, 46],
            type: {
              kind: "string",
              loc: [31, 13, 31, 21],
              text: "backtick",
            },
            attributes: [
              {
                name: "bundle",
                initializer: {
                  kind: "()",
                  loc: [31, 30, 31, 42],
                  expression: {
                    kind: ".",
                    loc: [31, 30, 31, 40],
                    expression: {
                      kind: "id",
                      loc: [31, 30, 31, 35],
                      text: "drawn",
                      bindingKey: "drawn$2x8k8srxyyhq0$0",
                    },
                    name: "read",
                  },
                  arguments: [],
                },
              },
            ],
            children: [],
          },
        },
      ],
    }),
  );
}
export default cs.create(
  [35, 16, 49, 3],
  {
    version: "0.0.0",
    filePath: "backtick-builds-once.tsx",
    fileHash: "2x8k8srxyyhq0",
    splices: {
      $state: { value: state, params: [] },
      $Waiting: { value: Waiting, params: [] },
      $answer: { value: answer, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [35, 19, 49, 2],
    statements: [
      {
        kind: "const",
        loc: [36, 3, 36, 27],
        name: {
          kind: "id",
          loc: [36, 9, 36, 14],
          text: "asked",
          bindingKey: "asked$2x8k8srxyyhq0$2",
        },
        initializer: {
          kind: "()",
          loc: [36, 17, 36, 26],
          expression: {
            kind: "splice",
            loc: [36, 17, 36, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [36, 24, 36, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [38, 3, 48, 5],
        expression: {
          kind: "jsx",
          loc: [39, 5, 47, 11],
          type: {
            kind: "string",
            loc: [39, 6, 39, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [40, 7, 40, 45],
              type: {
                kind: "string",
                loc: [40, 8, 40, 12],
                text: "span",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [40, 14, 40, 37],
                  left: {
                    kind: "string",
                    loc: [40, 14, 40, 22],
                    text: "asked ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [40, 25, 40, 37],
                    expression: {
                      kind: ".",
                      loc: [40, 25, 40, 35],
                      expression: {
                        kind: "id",
                        loc: [40, 25, 40, 30],
                        text: "asked",
                        bindingKey: "asked$2x8k8srxyyhq0$2",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                },
              ],
            },
            {
              kind: "jsx",
              loc: [41, 7, 46, 9],
              type: {
                kind: "splice",
                loc: [41, 8, 41, 15],
                key: "$Waiting",
              },
              attributes: [
                {
                  name: "ask",
                  initializer: {
                    kind: "=>",
                    loc: [42, 14, 45, 10],
                    parameters: [],
                    body: {
                      kind: "{}",
                      loc: [42, 20, 45, 10],
                      statements: [
                        {
                          kind: "()",
                          loc: [43, 11, 43, 40],
                          expression: {
                            kind: ".",
                            loc: [43, 11, 43, 22],
                            expression: {
                              kind: "id",
                              loc: [43, 11, 43, 16],
                              text: "asked",
                              bindingKey: "asked$2x8k8srxyyhq0$2",
                            },
                            name: "write",
                          },
                          arguments: [
                            {
                              kind: "binop",
                              loc: [43, 23, 43, 39],
                              left: {
                                kind: "()",
                                loc: [43, 23, 43, 35],
                                expression: {
                                  kind: ".",
                                  loc: [43, 23, 43, 33],
                                  expression: {
                                    kind: "id",
                                    loc: [43, 23, 43, 28],
                                    text: "asked",
                                    bindingKey: "asked$2x8k8srxyyhq0$2",
                                  },
                                  name: "read",
                                },
                                arguments: [],
                              },
                              operatorToken: "+",
                              right: {
                                kind: "number",
                                loc: [43, 38, 43, 39],
                                value: 1,
                              },
                            },
                          ],
                        },
                        {
                          kind: "return",
                          loc: [44, 11, 44, 52],
                          expression: {
                            kind: "?:",
                            loc: [44, 18, 44, 51],
                            condition: {
                              kind: "binop",
                              loc: [44, 18, 44, 34],
                              left: {
                                kind: "()",
                                loc: [44, 18, 44, 30],
                                expression: {
                                  kind: ".",
                                  loc: [44, 18, 44, 28],
                                  expression: {
                                    kind: "id",
                                    loc: [44, 18, 44, 23],
                                    text: "asked",
                                    bindingKey: "asked$2x8k8srxyyhq0$2",
                                  },
                                  name: "read",
                                },
                                arguments: [],
                              },
                              operatorToken: ">",
                              right: {
                                kind: "number",
                                loc: [44, 33, 44, 34],
                                value: 4,
                              },
                            },
                            whenTrue: {
                              kind: "null",
                              loc: [44, 37, 44, 41],
                            },
                            whenFalse: {
                              kind: "splice",
                              loc: [44, 44, 44, 51],
                              key: "$answer",
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              ],
              children: [],
            },
          ],
        },
      },
    ],
  }),
);
