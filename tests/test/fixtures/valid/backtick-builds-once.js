import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { cs, state } from "@backtickjs/core";
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
    [17, 10, 17, 35],
    {
      version: "0.0.0",
      filePath: "backtick-builds-once.tsx",
      fileHash: "327jptyn68h34",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [17, 13, 17, 34],
      type: {
        kind: "string",
        loc: [17, 14, 17, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "string",
          loc: [17, 18, 17, 28],
          text: "answered",
        },
      ],
    }),
  );
}
const answer = JSON.stringify(await bundler.run(_jsx(Answer, {})));
async function Waiting({ ask }) {
  return cs.create(
    [23, 10, 27, 5],
    {
      version: "0.0.0",
      filePath: "backtick-builds-once.tsx",
      fileHash: "327jptyn68h34",
      splices: {
        $state: { value: state, params: [] },
        $ask: { value: ask, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [23, 13, 27, 4],
      statements: [
        {
          kind: "const",
          loc: [24, 5, 24, 30],
          name: {
            kind: "id",
            loc: [24, 11, 24, 16],
            text: "drawn",
            bindingKey: "drawn$327jptyn68h34$0",
          },
          initializer: {
            kind: "()",
            loc: [24, 19, 24, 29],
            expression: {
              kind: "splice",
              loc: [24, 19, 24, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "string",
                loc: [24, 26, 24, 28],
                text: "",
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [25, 5, 25, 62],
          name: {
            kind: "id",
            loc: [25, 11, 25, 18],
            text: "started",
            bindingKey: "started$327jptyn68h34$1",
          },
          initializer: {
            kind: "()",
            loc: [25, 21, 25, 61],
            expression: {
              kind: "bltn",
              loc: [25, 21, 25, 31],
              name: "setTimeout",
            },
            arguments: [
              {
                kind: "=>",
                loc: [25, 32, 25, 57],
                parameters: [],
                body: {
                  kind: "()",
                  loc: [25, 38, 25, 57],
                  expression: {
                    kind: ".",
                    loc: [25, 38, 25, 49],
                    expression: {
                      kind: "id",
                      loc: [25, 38, 25, 43],
                      text: "drawn",
                      bindingKey: "drawn$327jptyn68h34$0",
                    },
                    name: "write",
                  },
                  arguments: [
                    {
                      kind: "()",
                      loc: [25, 50, 25, 56],
                      expression: {
                        kind: "splice",
                        loc: [25, 50, 25, 54],
                        key: "$ask",
                      },
                      arguments: [],
                    },
                  ],
                },
              },
              {
                kind: "number",
                loc: [25, 59, 25, 60],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [26, 5, 26, 47],
          expression: {
            kind: "jsx",
            loc: [26, 12, 26, 46],
            type: {
              kind: "string",
              loc: [26, 13, 26, 21],
              text: "backtick",
            },
            attributes: [
              {
                name: "bundle",
                initializer: {
                  kind: "()",
                  loc: [26, 30, 26, 42],
                  expression: {
                    kind: ".",
                    loc: [26, 30, 26, 40],
                    expression: {
                      kind: "id",
                      loc: [26, 30, 26, 35],
                      text: "drawn",
                      bindingKey: "drawn$327jptyn68h34$0",
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
  [30, 16, 44, 3],
  {
    version: "0.0.0",
    filePath: "backtick-builds-once.tsx",
    fileHash: "327jptyn68h34",
    splices: {
      $state: { value: state, params: [] },
      $Waiting: { value: Waiting, params: [] },
      $answer: { value: answer, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [30, 19, 44, 2],
    statements: [
      {
        kind: "const",
        loc: [31, 3, 31, 27],
        name: {
          kind: "id",
          loc: [31, 9, 31, 14],
          text: "asked",
          bindingKey: "asked$327jptyn68h34$2",
        },
        initializer: {
          kind: "()",
          loc: [31, 17, 31, 26],
          expression: {
            kind: "splice",
            loc: [31, 17, 31, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [31, 24, 31, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [33, 3, 43, 5],
        expression: {
          kind: "jsx",
          loc: [34, 5, 42, 11],
          type: {
            kind: "string",
            loc: [34, 6, 34, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [35, 7, 35, 45],
              type: {
                kind: "string",
                loc: [35, 8, 35, 12],
                text: "span",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [35, 14, 35, 37],
                  left: {
                    kind: "string",
                    loc: [35, 14, 35, 22],
                    text: "asked ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [35, 25, 35, 37],
                    expression: {
                      kind: ".",
                      loc: [35, 25, 35, 35],
                      expression: {
                        kind: "id",
                        loc: [35, 25, 35, 30],
                        text: "asked",
                        bindingKey: "asked$327jptyn68h34$2",
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
              loc: [36, 7, 41, 9],
              type: {
                kind: "splice",
                loc: [36, 8, 36, 15],
                key: "$Waiting",
              },
              attributes: [
                {
                  name: "ask",
                  initializer: {
                    kind: "=>",
                    loc: [37, 14, 40, 10],
                    parameters: [],
                    body: {
                      kind: "{}",
                      loc: [37, 20, 40, 10],
                      statements: [
                        {
                          kind: "()",
                          loc: [38, 11, 38, 40],
                          expression: {
                            kind: ".",
                            loc: [38, 11, 38, 22],
                            expression: {
                              kind: "id",
                              loc: [38, 11, 38, 16],
                              text: "asked",
                              bindingKey: "asked$327jptyn68h34$2",
                            },
                            name: "write",
                          },
                          arguments: [
                            {
                              kind: "binop",
                              loc: [38, 23, 38, 39],
                              left: {
                                kind: "()",
                                loc: [38, 23, 38, 35],
                                expression: {
                                  kind: ".",
                                  loc: [38, 23, 38, 33],
                                  expression: {
                                    kind: "id",
                                    loc: [38, 23, 38, 28],
                                    text: "asked",
                                    bindingKey: "asked$327jptyn68h34$2",
                                  },
                                  name: "read",
                                },
                                arguments: [],
                              },
                              operatorToken: "+",
                              right: {
                                kind: "number",
                                loc: [38, 38, 38, 39],
                                value: 1,
                              },
                            },
                          ],
                        },
                        {
                          kind: "return",
                          loc: [39, 11, 39, 50],
                          expression: {
                            kind: "?:",
                            loc: [39, 18, 39, 49],
                            condition: {
                              kind: "binop",
                              loc: [39, 18, 39, 34],
                              left: {
                                kind: "()",
                                loc: [39, 18, 39, 30],
                                expression: {
                                  kind: ".",
                                  loc: [39, 18, 39, 28],
                                  expression: {
                                    kind: "id",
                                    loc: [39, 18, 39, 23],
                                    text: "asked",
                                    bindingKey: "asked$327jptyn68h34$2",
                                  },
                                  name: "read",
                                },
                                arguments: [],
                              },
                              operatorToken: ">",
                              right: {
                                kind: "number",
                                loc: [39, 33, 39, 34],
                                value: 4,
                              },
                            },
                            whenTrue: {
                              kind: "string",
                              loc: [39, 37, 39, 39],
                              text: "",
                            },
                            whenFalse: {
                              kind: "splice",
                              loc: [39, 42, 39, 49],
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
