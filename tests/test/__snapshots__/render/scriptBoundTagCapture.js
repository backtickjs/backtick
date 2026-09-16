import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, For, state } from "@backtickjs/core";
// A tag naming a function an enclosing script holds. The nested script captures
// it the way it captures any binding, and calls it as a component: once, with
// its props read on access.
const scriptBoundTagCapture = cs.create(
  [6, 31, 28, 3],
  {
    version: "0.0.0",
    filePath: "scriptBoundTagCapture.tsx",
    fileHash: "u0kfmvdu7z84",
    splices: {
      $state: { value: state, params: [] },
      $0splice0: {
        value: cs.create(
          [12, 10, 12, 40],
          {
            version: "0.0.0",
            filePath: "scriptBoundTagCapture.tsx",
            fileHash: "u0kfmvdu7z84",
            splices: {},
            captures: ["Badge$u0kfmvdu7z84$1", "count$u0kfmvdu7z84$0"],
          },
          () => ({
            kind: "jsx",
            loc: [12, 13, 12, 39],
            type: {
              kind: "id",
              loc: [12, 14, 12, 19],
              text: "Badge",
              bindingKey: "Badge$u0kfmvdu7z84$1",
            },
            attributes: [
              {
                name: "n",
                initializer: {
                  kind: "()",
                  loc: [12, 23, 12, 35],
                  expression: {
                    kind: ".",
                    loc: [12, 23, 12, 33],
                    expression: {
                      kind: "id",
                      loc: [12, 23, 12, 28],
                      text: "count",
                      bindingKey: "count$u0kfmvdu7z84$0",
                    },
                    name: "read",
                  },
                  arguments: [],
                },
              },
            ],
            children: [],
          }),
        ),
        params: ["count$u0kfmvdu7z84$0", "Badge$u0kfmvdu7z84$1"],
      },
      $0splice1: {
        value: cs.create(
          [14, 11, 17, 11],
          {
            version: "0.0.0",
            filePath: "scriptBoundTagCapture.tsx",
            fileHash: "u0kfmvdu7z84",
            splices: {
              $0splice0: {
                value: cs.create(
                  [16, 20, 16, 56],
                  {
                    version: "0.0.0",
                    filePath: "scriptBoundTagCapture.tsx",
                    fileHash: "u0kfmvdu7z84",
                    splices: {},
                    captures: ["Badge$u0kfmvdu7z84$1", "count$u0kfmvdu7z84$0"],
                  },
                  () => ({
                    kind: "jsx",
                    loc: [16, 23, 16, 55],
                    type: {
                      kind: "id",
                      loc: [16, 24, 16, 29],
                      text: "Badge",
                      bindingKey: "Badge$u0kfmvdu7z84$1",
                    },
                    attributes: [
                      {
                        name: "n",
                        initializer: {
                          kind: "binop",
                          loc: [16, 33, 16, 51],
                          left: {
                            kind: "()",
                            loc: [16, 33, 16, 45],
                            expression: {
                              kind: ".",
                              loc: [16, 33, 16, 43],
                              expression: {
                                kind: "id",
                                loc: [16, 33, 16, 38],
                                text: "count",
                                bindingKey: "count$u0kfmvdu7z84$0",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [16, 48, 16, 51],
                            value: 100,
                          },
                        },
                      },
                    ],
                    children: [],
                  }),
                ),
                params: [],
              },
            },
            captures: ["Badge$u0kfmvdu7z84$1", "count$u0kfmvdu7z84$0"],
          },
          () => ({
            kind: "{}",
            loc: [14, 14, 17, 10],
            statements: [
              {
                kind: "const",
                loc: [15, 11, 15, 30],
                name: {
                  kind: "id",
                  loc: [15, 17, 15, 24],
                  text: "skipped",
                  bindingKey: "skipped$u0kfmvdu7z84$3",
                },
                initializer: {
                  kind: "number",
                  loc: [15, 27, 15, 29],
                  value: 10,
                },
              },
              {
                kind: "return",
                loc: [16, 11, 16, 58],
                expression: {
                  kind: "splice",
                  loc: [16, 18, 16, 57],
                  key: "$0splice0",
                },
              },
            ],
          }),
        ),
        params: ["count$u0kfmvdu7z84$0", "Badge$u0kfmvdu7z84$1"],
      },
      $0splice2: {
        value: _jsx("section", {
          children: cs.create(
            [19, 21, 19, 58],
            {
              version: "0.0.0",
              filePath: "scriptBoundTagCapture.tsx",
              fileHash: "u0kfmvdu7z84",
              splices: {},
              captures: ["Badge$u0kfmvdu7z84$1", "count$u0kfmvdu7z84$0"],
            },
            () => ({
              kind: "jsx",
              loc: [19, 24, 19, 57],
              type: {
                kind: "id",
                loc: [19, 25, 19, 30],
                text: "Badge",
                bindingKey: "Badge$u0kfmvdu7z84$1",
              },
              attributes: [
                {
                  name: "n",
                  initializer: {
                    kind: "binop",
                    loc: [19, 34, 19, 53],
                    left: {
                      kind: "()",
                      loc: [19, 34, 19, 46],
                      expression: {
                        kind: ".",
                        loc: [19, 34, 19, 44],
                        expression: {
                          kind: "id",
                          loc: [19, 34, 19, 39],
                          text: "count",
                          bindingKey: "count$u0kfmvdu7z84$0",
                        },
                        name: "read",
                      },
                      arguments: [],
                    },
                    operatorToken: "+",
                    right: {
                      kind: "number",
                      loc: [19, 49, 19, 53],
                      value: 1000,
                    },
                  },
                },
              ],
              children: [],
            }),
          ),
        }),
        params: ["count$u0kfmvdu7z84$0", "Badge$u0kfmvdu7z84$1"],
      },
      $0splice3: {
        value: cs.create(
          [21, 11, 23, 16],
          {
            version: "0.0.0",
            filePath: "scriptBoundTagCapture.tsx",
            fileHash: "u0kfmvdu7z84",
            splices: { $For: { value: For, params: [] } },
            captures: ["Badge$u0kfmvdu7z84$1", "count$u0kfmvdu7z84$0"],
          },
          () => ({
            kind: "jsx",
            loc: [21, 14, 23, 15],
            type: {
              kind: "splice",
              loc: [21, 15, 21, 18],
              key: "$For",
            },
            attributes: [
              {
                name: "each",
                initializer: {
                  kind: "arr",
                  loc: [21, 25, 21, 31],
                  elements: [
                    {
                      kind: "number",
                      loc: [21, 26, 21, 27],
                      value: 1,
                    },
                    {
                      kind: "number",
                      loc: [21, 29, 21, 30],
                      value: 2,
                    },
                  ],
                },
              },
            ],
            children: [
              {
                kind: "=>",
                loc: [22, 12, 22, 57],
                parameters: [
                  {
                    kind: "param",
                    loc: [22, 13, 22, 22],
                    name: {
                      kind: "id",
                      loc: [22, 13, 22, 14],
                      text: "m",
                      bindingKey: "m$u0kfmvdu7z84$4",
                    },
                  },
                ],
                body: {
                  kind: "jsx",
                  loc: [22, 27, 22, 57],
                  type: {
                    kind: "id",
                    loc: [22, 28, 22, 33],
                    text: "Badge",
                    bindingKey: "Badge$u0kfmvdu7z84$1",
                  },
                  attributes: [
                    {
                      name: "n",
                      initializer: {
                        kind: "binop",
                        loc: [22, 37, 22, 53],
                        left: {
                          kind: "id",
                          loc: [22, 37, 22, 38],
                          text: "m",
                          bindingKey: "m$u0kfmvdu7z84$4",
                        },
                        operatorToken: "*",
                        right: {
                          kind: "()",
                          loc: [22, 41, 22, 53],
                          expression: {
                            kind: ".",
                            loc: [22, 41, 22, 51],
                            expression: {
                              kind: "id",
                              loc: [22, 41, 22, 46],
                              text: "count",
                              bindingKey: "count$u0kfmvdu7z84$0",
                            },
                            name: "read",
                          },
                          arguments: [],
                        },
                      },
                    },
                  ],
                  children: [],
                },
              },
            ],
          }),
        ),
        params: ["count$u0kfmvdu7z84$0", "Badge$u0kfmvdu7z84$1"],
      },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [6, 34, 28, 2],
    statements: [
      {
        kind: "const",
        loc: [7, 3, 7, 27],
        name: {
          kind: "id",
          loc: [7, 9, 7, 14],
          text: "count",
          bindingKey: "count$u0kfmvdu7z84$0",
        },
        initializer: {
          kind: "()",
          loc: [7, 17, 7, 26],
          expression: {
            kind: "splice",
            loc: [7, 17, 7, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [7, 24, 7, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [8, 3, 8, 67],
        name: {
          kind: "id",
          loc: [8, 9, 8, 14],
          text: "Badge",
          bindingKey: "Badge$u0kfmvdu7z84$1",
        },
        initializer: {
          kind: "=>",
          loc: [8, 17, 8, 66],
          parameters: [
            {
              kind: "param",
              loc: [8, 18, 8, 38],
              name: {
                kind: "id",
                loc: [8, 18, 8, 23],
                text: "props",
                bindingKey: "props$u0kfmvdu7z84$2",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [8, 43, 8, 66],
            type: {
              kind: "string",
              loc: [8, 44, 8, 45],
              text: "b",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [8, 47, 8, 61],
                left: {
                  kind: "string",
                  loc: [8, 47, 8, 51],
                  text: "n ",
                },
                operatorToken: "+",
                right: {
                  kind: ".",
                  loc: [8, 54, 8, 61],
                  expression: {
                    kind: "id",
                    loc: [8, 54, 8, 59],
                    text: "props",
                    bindingKey: "props$u0kfmvdu7z84$2",
                  },
                  name: "n",
                },
              },
            ],
          },
        },
      },
      {
        kind: "return",
        loc: [10, 3, 27, 5],
        expression: {
          kind: "jsx",
          loc: [11, 5, 26, 11],
          type: {
            kind: "string",
            loc: [11, 6, 11, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "splice",
              loc: [12, 8, 12, 41],
              key: "$0splice0",
            },
            {
              kind: "splice",
              loc: [14, 9, 17, 12],
              key: "$0splice1",
            },
            {
              kind: "splice",
              loc: [19, 8, 19, 71],
              key: "$0splice2",
            },
            {
              kind: "splice",
              loc: [21, 9, 23, 17],
              key: "$0splice3",
            },
            {
              kind: "jsx",
              loc: [25, 7, 25, 74],
              type: {
                kind: "string",
                loc: [25, 8, 25, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [25, 24, 25, 59],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [25, 30, 25, 59],
                      expression: {
                        kind: ".",
                        loc: [25, 30, 25, 41],
                        expression: {
                          kind: "id",
                          loc: [25, 30, 25, 35],
                          text: "count",
                          bindingKey: "count$u0kfmvdu7z84$0",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [25, 42, 25, 58],
                          left: {
                            kind: "()",
                            loc: [25, 42, 25, 54],
                            expression: {
                              kind: ".",
                              loc: [25, 42, 25, 52],
                              expression: {
                                kind: "id",
                                loc: [25, 42, 25, 47],
                                text: "count",
                                bindingKey: "count$u0kfmvdu7z84$0",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [25, 57, 25, 58],
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
                  loc: [25, 61, 25, 65],
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
