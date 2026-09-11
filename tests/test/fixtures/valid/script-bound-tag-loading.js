import { bundler } from "@backtickjs/bundler";
import { cs, state, vm } from "@backtickjs/core";
// A function the script holds that draws a bundle it is still waiting for.
//
// Read inside the drawing, so the condition follows the cell: when the bundle
// arrives the child runs again and calls `Badge`, and `count` stays a prop the
// badge reads on access rather than a value handed over once.
const badge = await bundler.run(
  cs.create(
    [11, 3, 11, 68],
    {
      version: "0.0.0",
      filePath: "script-bound-tag-loading.tsx",
      fileHash: "3etwlcjumxh3k",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [11, 6, 11, 67],
      parameters: [
        {
          kind: "param",
          loc: [11, 7, 11, 31],
          name: {
            kind: "id",
            loc: [11, 7, 11, 12],
            text: "props",
            bindingKey: "props$3etwlcjumxh3k$0",
          },
        },
      ],
      body: {
        kind: "jsx",
        loc: [11, 36, 11, 67],
        type: {
          kind: "string",
          loc: [11, 37, 11, 38],
          text: "b",
        },
        attributes: [],
        children: [
          {
            kind: "binop",
            loc: [11, 40, 11, 62],
            left: {
              kind: "string",
              loc: [11, 40, 11, 48],
              text: "count ",
            },
            operatorToken: "+",
            right: {
              kind: ".",
              loc: [11, 51, 11, 62],
              expression: {
                kind: "id",
                loc: [11, 51, 11, 56],
                text: "props",
                bindingKey: "props$3etwlcjumxh3k$0",
              },
              name: "count",
            },
          },
        ],
      },
    }),
  ),
);
export default cs.create(
  [14, 16, 31, 3],
  {
    version: "0.0.0",
    filePath: "script-bound-tag-loading.tsx",
    fileHash: "3etwlcjumxh3k",
    splices: {
      $state: { value: state, params: [] },
      $vm: { value: vm, params: [] },
      $badge: { value: badge, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [14, 19, 31, 2],
    statements: [
      {
        kind: "const",
        loc: [15, 3, 15, 27],
        name: {
          kind: "id",
          loc: [15, 9, 15, 14],
          text: "count",
          bindingKey: "count$3etwlcjumxh3k$1",
        },
        initializer: {
          kind: "()",
          loc: [15, 17, 15, 26],
          expression: {
            kind: "splice",
            loc: [15, 17, 15, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [15, 24, 15, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [16, 3, 18, 5],
        name: {
          kind: "id",
          loc: [16, 9, 16, 14],
          text: "drawn",
          bindingKey: "drawn$3etwlcjumxh3k$2",
        },
        initializer: {
          kind: "()",
          loc: [16, 17, 18, 4],
          expression: {
            kind: "splice",
            loc: [16, 17, 16, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "null",
              loc: [17, 5, 17, 9],
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [19, 3, 22, 5],
        name: {
          kind: "id",
          loc: [19, 9, 19, 14],
          text: "Badge",
          bindingKey: "Badge$3etwlcjumxh3k$3",
        },
        initializer: {
          kind: "=>",
          loc: [19, 17, 22, 4],
          parameters: [
            {
              kind: "param",
              loc: [19, 18, 19, 42],
              name: {
                kind: "id",
                loc: [19, 18, 19, 23],
                text: "props",
                bindingKey: "props$3etwlcjumxh3k$4",
              },
            },
          ],
          body: {
            kind: "{}",
            loc: [19, 47, 22, 4],
            statements: [
              {
                kind: "const",
                loc: [20, 5, 20, 31],
                name: {
                  kind: "id",
                  loc: [20, 11, 20, 15],
                  text: "held",
                  bindingKey: "held$3etwlcjumxh3k$5",
                },
                initializer: {
                  kind: "()",
                  loc: [20, 18, 20, 30],
                  expression: {
                    kind: ".",
                    loc: [20, 18, 20, 28],
                    expression: {
                      kind: "id",
                      loc: [20, 18, 20, 23],
                      text: "drawn",
                      bindingKey: "drawn$3etwlcjumxh3k$2",
                    },
                    name: "read",
                  },
                  arguments: [],
                },
              },
              {
                kind: "return",
                loc: [21, 5, 21, 57],
                expression: {
                  kind: "?:",
                  loc: [21, 12, 21, 56],
                  condition: {
                    kind: "binop",
                    loc: [21, 12, 21, 25],
                    left: {
                      kind: "id",
                      loc: [21, 12, 21, 16],
                      text: "held",
                      bindingKey: "held$3etwlcjumxh3k$5",
                    },
                    operatorToken: "===",
                    right: {
                      kind: "null",
                      loc: [21, 21, 21, 25],
                    },
                  },
                  whenTrue: {
                    kind: "null",
                    loc: [21, 28, 21, 32],
                  },
                  whenFalse: {
                    kind: "()",
                    loc: [21, 35, 21, 56],
                    expression: {
                      kind: "()",
                      loc: [21, 35, 21, 49],
                      expression: {
                        kind: ".",
                        loc: [21, 35, 21, 43],
                        expression: {
                          kind: "splice",
                          loc: [21, 35, 21, 38],
                          key: "$vm",
                        },
                        name: "eval",
                      },
                      arguments: [
                        {
                          kind: "id",
                          loc: [21, 44, 21, 48],
                          text: "held",
                          bindingKey: "held$3etwlcjumxh3k$5",
                        },
                      ],
                    },
                    arguments: [
                      {
                        kind: "id",
                        loc: [21, 50, 21, 55],
                        text: "props",
                        bindingKey: "props$3etwlcjumxh3k$4",
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
      {
        kind: "return",
        loc: [24, 3, 30, 5],
        expression: {
          kind: "jsx",
          loc: [25, 5, 29, 11],
          type: {
            kind: "string",
            loc: [25, 6, 25, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "?:",
              loc: [26, 8, 26, 79],
              condition: {
                kind: "binop",
                loc: [26, 8, 26, 29],
                left: {
                  kind: "()",
                  loc: [26, 8, 26, 20],
                  expression: {
                    kind: ".",
                    loc: [26, 8, 26, 18],
                    expression: {
                      kind: "id",
                      loc: [26, 8, 26, 13],
                      text: "drawn",
                      bindingKey: "drawn$3etwlcjumxh3k$2",
                    },
                    name: "read",
                  },
                  arguments: [],
                },
                operatorToken: "===",
                right: {
                  kind: "null",
                  loc: [26, 25, 26, 29],
                },
              },
              whenTrue: {
                kind: "jsx",
                loc: [26, 32, 26, 46],
                type: {
                  kind: "string",
                  loc: [26, 33, 26, 34],
                  text: "i",
                },
                attributes: [],
                children: [
                  {
                    kind: "string",
                    loc: [26, 35, 26, 42],
                    text: "loading",
                  },
                ],
              },
              whenFalse: {
                kind: "jsx",
                loc: [26, 49, 26, 79],
                type: {
                  kind: "id",
                  loc: [26, 50, 26, 55],
                  text: "Badge",
                  bindingKey: "Badge$3etwlcjumxh3k$3",
                },
                attributes: [
                  {
                    name: "count",
                    initializer: {
                      kind: "()",
                      loc: [26, 63, 26, 75],
                      expression: {
                        kind: ".",
                        loc: [26, 63, 26, 73],
                        expression: {
                          kind: "id",
                          loc: [26, 63, 26, 68],
                          text: "count",
                          bindingKey: "count$3etwlcjumxh3k$1",
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
            {
              kind: "jsx",
              loc: [27, 7, 27, 64],
              type: {
                kind: "string",
                loc: [27, 8, 27, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [27, 24, 27, 49],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [27, 30, 27, 49],
                      expression: {
                        kind: ".",
                        loc: [27, 30, 27, 41],
                        expression: {
                          kind: "id",
                          loc: [27, 30, 27, 35],
                          text: "drawn",
                          bindingKey: "drawn$3etwlcjumxh3k$2",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "splice",
                          loc: [27, 42, 27, 48],
                          key: "$badge",
                        },
                      ],
                    },
                  },
                },
              ],
              children: [
                {
                  kind: "string",
                  loc: [27, 51, 27, 55],
                  text: "load",
                },
              ],
            },
            {
              kind: "jsx",
              loc: [28, 7, 28, 74],
              type: {
                kind: "string",
                loc: [28, 8, 28, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [28, 24, 28, 59],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [28, 30, 28, 59],
                      expression: {
                        kind: ".",
                        loc: [28, 30, 28, 41],
                        expression: {
                          kind: "id",
                          loc: [28, 30, 28, 35],
                          text: "count",
                          bindingKey: "count$3etwlcjumxh3k$1",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [28, 42, 28, 58],
                          left: {
                            kind: "()",
                            loc: [28, 42, 28, 54],
                            expression: {
                              kind: ".",
                              loc: [28, 42, 28, 52],
                              expression: {
                                kind: "id",
                                loc: [28, 42, 28, 47],
                                text: "count",
                                bindingKey: "count$3etwlcjumxh3k$1",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [28, 57, 28, 58],
                            value: 1,
                          },
                        },
                      ],
                    },
                  },
                },
              ],
              children: [
                {
                  kind: "string",
                  loc: [28, 61, 28, 65],
                  text: "more",
                },
              ],
            },
          ],
        },
      },
    ],
  }),
);
