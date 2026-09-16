import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { cs, state, vm } from "@backtickjs/core";
import { window } from "@backtickjs/web-sdk";
// A component that draws a bundle it is still waiting for.
//
// What this pins is that it is built once. `insert` reads what it was given
// inside the computation it makes, so a drawing that watches itself used to tie
// the two together: the answer arriving changed the drawing, which ran the
// expression that made it, which was this component again — new cells, and the
// wait started over.
//
// The condition stands under `<>`, where a child position watches it: at the
// block's root it would be read once, when the block ran.
//
// `asked` is the page's, so it survives a rebuild and counts them. It also ends
// one: once it stops answering, a write of `null` over `null` changes nothing
// and nothing runs again — a loop that would otherwise have no end.
async function Answer() {
  return cs.create(
    [21, 10, 21, 35],
    {
      version: "0.0.0",
      filePath: "vmEvalBuildsOnce.tsx",
      fileHash: "2svvc2pqhwsy5",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [21, 13, 21, 34],
      type: {
        kind: "string",
        loc: [21, 14, 21, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "string",
          loc: [21, 18, 21, 28],
          text: "answered",
        },
      ],
    }),
  );
}
const answer = await bundler.run(_jsx(Answer, {}));
async function Waiting({ ask }) {
  return cs.create(
    [31, 10, 41, 5],
    {
      version: "0.0.0",
      filePath: "vmEvalBuildsOnce.tsx",
      fileHash: "2svvc2pqhwsy5",
      splices: {
        $state: { value: state, params: [] },
        $window: { value: window, params: [] },
        $ask: { value: ask, params: [] },
        $vm: { value: vm, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [31, 13, 41, 4],
      statements: [
        {
          kind: "const",
          loc: [32, 5, 32, 64],
          name: {
            kind: "id",
            loc: [32, 11, 32, 16],
            text: "drawn",
            bindingKey: "drawn$2svvc2pqhwsy5$0",
          },
          initializer: {
            kind: "()",
            loc: [32, 19, 32, 63],
            expression: {
              kind: "splice",
              loc: [32, 19, 32, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "null",
                loc: [32, 58, 32, 62],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [33, 5, 33, 70],
          name: {
            kind: "id",
            loc: [33, 11, 33, 18],
            text: "started",
            bindingKey: "started$2svvc2pqhwsy5$1",
          },
          initializer: {
            kind: "()",
            loc: [33, 21, 33, 69],
            expression: {
              kind: ".",
              loc: [33, 21, 33, 39],
              expression: {
                kind: "splice",
                loc: [33, 21, 33, 28],
                key: "$window",
              },
              name: "setTimeout",
            },
            arguments: [
              {
                kind: "=>",
                loc: [33, 40, 33, 65],
                parameters: [],
                body: {
                  kind: "()",
                  loc: [33, 46, 33, 65],
                  expression: {
                    kind: ".",
                    loc: [33, 46, 33, 57],
                    expression: {
                      kind: "id",
                      loc: [33, 46, 33, 51],
                      text: "drawn",
                      bindingKey: "drawn$2svvc2pqhwsy5$0",
                    },
                    name: "write",
                  },
                  arguments: [
                    {
                      kind: "()",
                      loc: [33, 58, 33, 64],
                      expression: {
                        kind: "splice",
                        loc: [33, 58, 33, 62],
                        key: "$ask",
                      },
                      arguments: [],
                    },
                  ],
                },
              },
              {
                kind: "number",
                loc: [33, 67, 33, 68],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [34, 5, 40, 7],
          expression: {
            kind: "jsx",
            loc: [35, 7, 39, 10],
            type: {
              kind: "string",
              loc: [35, 7, 39, 10],
              text: "Fragment",
            },
            attributes: [],
            children: [
              {
                kind: "?:",
                loc: [36, 10, 38, 62],
                condition: {
                  kind: "binop",
                  loc: [36, 10, 36, 31],
                  left: {
                    kind: "()",
                    loc: [36, 10, 36, 22],
                    expression: {
                      kind: ".",
                      loc: [36, 10, 36, 20],
                      expression: {
                        kind: "id",
                        loc: [36, 10, 36, 15],
                        text: "drawn",
                        bindingKey: "drawn$2svvc2pqhwsy5$0",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                  operatorToken: "===",
                  right: {
                    kind: "null",
                    loc: [36, 27, 36, 31],
                  },
                },
                whenTrue: {
                  kind: "null",
                  loc: [37, 13, 37, 17],
                },
                whenFalse: {
                  kind: "()",
                  loc: [38, 13, 38, 62],
                  expression: {
                    kind: ".",
                    loc: [38, 13, 38, 21],
                    expression: {
                      kind: "splice",
                      loc: [38, 13, 38, 16],
                      key: "$vm",
                    },
                    name: "eval",
                  },
                  arguments: [
                    {
                      kind: "()",
                      loc: [38, 22, 38, 34],
                      expression: {
                        kind: ".",
                        loc: [38, 22, 38, 32],
                        expression: {
                          kind: "id",
                          loc: [38, 22, 38, 27],
                          text: "drawn",
                          bindingKey: "drawn$2svvc2pqhwsy5$0",
                        },
                        name: "read",
                      },
                      arguments: [],
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    }),
  );
}
const vmEvalBuildsOnce = cs.create(
  [44, 26, 58, 3],
  {
    version: "0.0.0",
    filePath: "vmEvalBuildsOnce.tsx",
    fileHash: "2svvc2pqhwsy5",
    splices: {
      $state: { value: state, params: [] },
      $answer: { value: answer, params: [] },
      $Waiting: { value: Waiting, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [44, 29, 58, 2],
    statements: [
      {
        kind: "const",
        loc: [45, 3, 45, 27],
        name: {
          kind: "id",
          loc: [45, 9, 45, 14],
          text: "asked",
          bindingKey: "asked$2svvc2pqhwsy5$2",
        },
        initializer: {
          kind: "()",
          loc: [45, 17, 45, 26],
          expression: {
            kind: "splice",
            loc: [45, 17, 45, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [45, 24, 45, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [47, 3, 57, 5],
        expression: {
          kind: "jsx",
          loc: [48, 5, 56, 11],
          type: {
            kind: "string",
            loc: [48, 6, 48, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [49, 7, 49, 45],
              type: {
                kind: "string",
                loc: [49, 8, 49, 12],
                text: "span",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [49, 14, 49, 37],
                  left: {
                    kind: "string",
                    loc: [49, 14, 49, 22],
                    text: "asked ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [49, 25, 49, 37],
                    expression: {
                      kind: ".",
                      loc: [49, 25, 49, 35],
                      expression: {
                        kind: "id",
                        loc: [49, 25, 49, 30],
                        text: "asked",
                        bindingKey: "asked$2svvc2pqhwsy5$2",
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
              loc: [50, 7, 55, 9],
              type: {
                kind: "splice",
                loc: [50, 8, 50, 15],
                key: "$Waiting",
              },
              attributes: [
                {
                  name: "ask",
                  initializer: {
                    kind: "=>",
                    loc: [51, 14, 54, 10],
                    parameters: [],
                    body: {
                      kind: "{}",
                      loc: [51, 20, 54, 10],
                      statements: [
                        {
                          kind: "()",
                          loc: [52, 11, 52, 40],
                          expression: {
                            kind: ".",
                            loc: [52, 11, 52, 22],
                            expression: {
                              kind: "id",
                              loc: [52, 11, 52, 16],
                              text: "asked",
                              bindingKey: "asked$2svvc2pqhwsy5$2",
                            },
                            name: "write",
                          },
                          arguments: [
                            {
                              kind: "binop",
                              loc: [52, 23, 52, 39],
                              left: {
                                kind: "()",
                                loc: [52, 23, 52, 35],
                                expression: {
                                  kind: ".",
                                  loc: [52, 23, 52, 33],
                                  expression: {
                                    kind: "id",
                                    loc: [52, 23, 52, 28],
                                    text: "asked",
                                    bindingKey: "asked$2svvc2pqhwsy5$2",
                                  },
                                  name: "read",
                                },
                                arguments: [],
                              },
                              operatorToken: "+",
                              right: {
                                kind: "number",
                                loc: [52, 38, 52, 39],
                                value: 1,
                              },
                            },
                          ],
                        },
                        {
                          kind: "return",
                          loc: [53, 11, 53, 52],
                          expression: {
                            kind: "?:",
                            loc: [53, 18, 53, 51],
                            condition: {
                              kind: "binop",
                              loc: [53, 18, 53, 34],
                              left: {
                                kind: "()",
                                loc: [53, 18, 53, 30],
                                expression: {
                                  kind: ".",
                                  loc: [53, 18, 53, 28],
                                  expression: {
                                    kind: "id",
                                    loc: [53, 18, 53, 23],
                                    text: "asked",
                                    bindingKey: "asked$2svvc2pqhwsy5$2",
                                  },
                                  name: "read",
                                },
                                arguments: [],
                              },
                              operatorToken: ">",
                              right: {
                                kind: "number",
                                loc: [53, 33, 53, 34],
                                value: 4,
                              },
                            },
                            whenTrue: {
                              kind: "null",
                              loc: [53, 37, 53, 41],
                            },
                            whenFalse: {
                              kind: "splice",
                              loc: [53, 44, 53, 51],
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
