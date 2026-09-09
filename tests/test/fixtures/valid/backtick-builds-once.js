import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/web-schema";
// A component that draws a bundle it is still waiting for.
//
// What this pins is that it is built once. `insert` reads what it was given
// inside the computation it makes, so a drawing that watches itself used to tie
// the two together: the answer arriving changed the drawing, which ran the
// expression that made it, which was this component again — new cells, and the
// wait started over.
//
// `asked` is the page's, so it survives a rebuild and counts them. It also ends
// one: once it stops answering, a write of `""` over `""` changes nothing and
// nothing runs again — a loop that would otherwise have no end.
async function Answer() {
  return cs.create(
    [18, 10, 18, 35],
    {
      version: "0.0.0",
      filePath: "backtick-builds-once.tsx",
      fileHash: "7221ffvhxi8e",
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
const answer = JSON.stringify(await bundler.run(_jsx(Answer, {})));
async function Waiting({ ask }) {
  return cs.create(
    [24, 10, 28, 5],
    {
      version: "0.0.0",
      filePath: "backtick-builds-once.tsx",
      fileHash: "7221ffvhxi8e",
      splices: {
        $state: { value: state, params: [] },
        $window: { value: window, params: [] },
        $ask: { value: ask, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [24, 13, 28, 4],
      statements: [
        {
          kind: "const",
          loc: [25, 5, 25, 30],
          name: {
            kind: "id",
            loc: [25, 11, 25, 16],
            text: "drawn",
            bindingKey: "drawn$7221ffvhxi8e$0",
          },
          initializer: {
            kind: "()",
            loc: [25, 19, 25, 29],
            expression: {
              kind: "splice",
              loc: [25, 19, 25, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "string",
                loc: [25, 26, 25, 28],
                text: "",
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [26, 5, 26, 70],
          name: {
            kind: "id",
            loc: [26, 11, 26, 18],
            text: "started",
            bindingKey: "started$7221ffvhxi8e$1",
          },
          initializer: {
            kind: "()",
            loc: [26, 21, 26, 69],
            expression: {
              kind: ".",
              loc: [26, 21, 26, 39],
              expression: {
                kind: "splice",
                loc: [26, 21, 26, 28],
                key: "$window",
              },
              name: "setTimeout",
            },
            arguments: [
              {
                kind: "=>",
                loc: [26, 40, 26, 65],
                parameters: [],
                body: {
                  kind: "()",
                  loc: [26, 46, 26, 65],
                  expression: {
                    kind: ".",
                    loc: [26, 46, 26, 57],
                    expression: {
                      kind: "id",
                      loc: [26, 46, 26, 51],
                      text: "drawn",
                      bindingKey: "drawn$7221ffvhxi8e$0",
                    },
                    name: "write",
                  },
                  arguments: [
                    {
                      kind: "()",
                      loc: [26, 58, 26, 64],
                      expression: {
                        kind: "splice",
                        loc: [26, 58, 26, 62],
                        key: "$ask",
                      },
                      arguments: [],
                    },
                  ],
                },
              },
              {
                kind: "number",
                loc: [26, 67, 26, 68],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [27, 5, 27, 47],
          expression: {
            kind: "jsx",
            loc: [27, 12, 27, 46],
            type: {
              kind: "string",
              loc: [27, 13, 27, 21],
              text: "backtick",
            },
            attributes: [
              {
                name: "bundle",
                initializer: {
                  kind: "()",
                  loc: [27, 30, 27, 42],
                  expression: {
                    kind: ".",
                    loc: [27, 30, 27, 40],
                    expression: {
                      kind: "id",
                      loc: [27, 30, 27, 35],
                      text: "drawn",
                      bindingKey: "drawn$7221ffvhxi8e$0",
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
  [31, 16, 45, 3],
  {
    version: "0.0.0",
    filePath: "backtick-builds-once.tsx",
    fileHash: "7221ffvhxi8e",
    splices: {
      $state: { value: state, params: [] },
      $Waiting: { value: Waiting, params: [] },
      $answer: { value: answer, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [31, 19, 45, 2],
    statements: [
      {
        kind: "const",
        loc: [32, 3, 32, 27],
        name: {
          kind: "id",
          loc: [32, 9, 32, 14],
          text: "asked",
          bindingKey: "asked$7221ffvhxi8e$2",
        },
        initializer: {
          kind: "()",
          loc: [32, 17, 32, 26],
          expression: {
            kind: "splice",
            loc: [32, 17, 32, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [32, 24, 32, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [34, 3, 44, 5],
        expression: {
          kind: "jsx",
          loc: [35, 5, 43, 11],
          type: {
            kind: "string",
            loc: [35, 6, 35, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [36, 7, 36, 45],
              type: {
                kind: "string",
                loc: [36, 8, 36, 12],
                text: "span",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [36, 14, 36, 37],
                  left: {
                    kind: "string",
                    loc: [36, 14, 36, 22],
                    text: "asked ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [36, 25, 36, 37],
                    expression: {
                      kind: ".",
                      loc: [36, 25, 36, 35],
                      expression: {
                        kind: "id",
                        loc: [36, 25, 36, 30],
                        text: "asked",
                        bindingKey: "asked$7221ffvhxi8e$2",
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
              loc: [37, 7, 42, 9],
              type: {
                kind: "splice",
                loc: [37, 8, 37, 15],
                key: "$Waiting",
              },
              attributes: [
                {
                  name: "ask",
                  initializer: {
                    kind: "=>",
                    loc: [38, 14, 41, 10],
                    parameters: [],
                    body: {
                      kind: "{}",
                      loc: [38, 20, 41, 10],
                      statements: [
                        {
                          kind: "()",
                          loc: [39, 11, 39, 40],
                          expression: {
                            kind: ".",
                            loc: [39, 11, 39, 22],
                            expression: {
                              kind: "id",
                              loc: [39, 11, 39, 16],
                              text: "asked",
                              bindingKey: "asked$7221ffvhxi8e$2",
                            },
                            name: "write",
                          },
                          arguments: [
                            {
                              kind: "binop",
                              loc: [39, 23, 39, 39],
                              left: {
                                kind: "()",
                                loc: [39, 23, 39, 35],
                                expression: {
                                  kind: ".",
                                  loc: [39, 23, 39, 33],
                                  expression: {
                                    kind: "id",
                                    loc: [39, 23, 39, 28],
                                    text: "asked",
                                    bindingKey: "asked$7221ffvhxi8e$2",
                                  },
                                  name: "read",
                                },
                                arguments: [],
                              },
                              operatorToken: "+",
                              right: {
                                kind: "number",
                                loc: [39, 38, 39, 39],
                                value: 1,
                              },
                            },
                          ],
                        },
                        {
                          kind: "return",
                          loc: [40, 11, 40, 50],
                          expression: {
                            kind: "?:",
                            loc: [40, 18, 40, 49],
                            condition: {
                              kind: "binop",
                              loc: [40, 18, 40, 34],
                              left: {
                                kind: "()",
                                loc: [40, 18, 40, 30],
                                expression: {
                                  kind: ".",
                                  loc: [40, 18, 40, 28],
                                  expression: {
                                    kind: "id",
                                    loc: [40, 18, 40, 23],
                                    text: "asked",
                                    bindingKey: "asked$7221ffvhxi8e$2",
                                  },
                                  name: "read",
                                },
                                arguments: [],
                              },
                              operatorToken: ">",
                              right: {
                                kind: "number",
                                loc: [40, 33, 40, 34],
                                value: 4,
                              },
                            },
                            whenTrue: {
                              kind: "string",
                              loc: [40, 37, 40, 39],
                              text: "",
                            },
                            whenFalse: {
                              kind: "splice",
                              loc: [40, 42, 40, 49],
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
