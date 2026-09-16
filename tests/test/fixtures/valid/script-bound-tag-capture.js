import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, For, state } from "@backtickjs/core";
// A tag naming a function an enclosing script holds. The nested script captures
// it the way it captures any binding, and calls it as a component: once, with
// its props read on access.
export default cs.create(
  [6, 16, 22, 3],
  {
    version: "0.0.0",
    filePath: "script-bound-tag-capture.tsx",
    fileHash: "1417d0qt1zuw2",
    splices: {
      $state: { value: state, params: [] },
      $0splice0: {
        value: cs.create(
          [12, 10, 12, 40],
          {
            version: "0.0.0",
            filePath: "script-bound-tag-capture.tsx",
            fileHash: "1417d0qt1zuw2",
            splices: {},
            captures: ["Badge$1417d0qt1zuw2$1", "count$1417d0qt1zuw2$0"],
          },
          () => ({
            kind: "jsx",
            loc: [12, 13, 12, 39],
            type: {
              kind: "id",
              loc: [12, 14, 12, 19],
              text: "Badge",
              bindingKey: "Badge$1417d0qt1zuw2$1",
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
                      bindingKey: "count$1417d0qt1zuw2$0",
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
        params: ["count$1417d0qt1zuw2$0", "Badge$1417d0qt1zuw2$1"],
      },
      $0splice1: {
        value: cs.create(
          [13, 10, 16, 9],
          {
            version: "0.0.0",
            filePath: "script-bound-tag-capture.tsx",
            fileHash: "1417d0qt1zuw2",
            splices: {
              $0splice0: {
                value: cs.create(
                  [15, 18, 15, 54],
                  {
                    version: "0.0.0",
                    filePath: "script-bound-tag-capture.tsx",
                    fileHash: "1417d0qt1zuw2",
                    splices: {},
                    captures: [
                      "Badge$1417d0qt1zuw2$1",
                      "count$1417d0qt1zuw2$0",
                    ],
                  },
                  () => ({
                    kind: "jsx",
                    loc: [15, 21, 15, 53],
                    type: {
                      kind: "id",
                      loc: [15, 22, 15, 27],
                      text: "Badge",
                      bindingKey: "Badge$1417d0qt1zuw2$1",
                    },
                    attributes: [
                      {
                        name: "n",
                        initializer: {
                          kind: "binop",
                          loc: [15, 31, 15, 49],
                          left: {
                            kind: "()",
                            loc: [15, 31, 15, 43],
                            expression: {
                              kind: ".",
                              loc: [15, 31, 15, 41],
                              expression: {
                                kind: "id",
                                loc: [15, 31, 15, 36],
                                text: "count",
                                bindingKey: "count$1417d0qt1zuw2$0",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [15, 46, 15, 49],
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
            captures: ["Badge$1417d0qt1zuw2$1", "count$1417d0qt1zuw2$0"],
          },
          () => ({
            kind: "{}",
            loc: [13, 13, 16, 8],
            statements: [
              {
                kind: "const",
                loc: [14, 9, 14, 28],
                name: {
                  kind: "id",
                  loc: [14, 15, 14, 22],
                  text: "skipped",
                  bindingKey: "skipped$1417d0qt1zuw2$3",
                },
                initializer: {
                  kind: "number",
                  loc: [14, 25, 14, 27],
                  value: 10,
                },
              },
              {
                kind: "return",
                loc: [15, 9, 15, 56],
                expression: {
                  kind: "splice",
                  loc: [15, 16, 15, 55],
                  key: "$0splice0",
                },
              },
            ],
          }),
        ),
        params: ["count$1417d0qt1zuw2$0", "Badge$1417d0qt1zuw2$1"],
      },
      $0splice2: {
        value: _jsx("section", {
          children: cs.create(
            [17, 21, 17, 58],
            {
              version: "0.0.0",
              filePath: "script-bound-tag-capture.tsx",
              fileHash: "1417d0qt1zuw2",
              splices: {},
              captures: ["Badge$1417d0qt1zuw2$1", "count$1417d0qt1zuw2$0"],
            },
            () => ({
              kind: "jsx",
              loc: [17, 24, 17, 57],
              type: {
                kind: "id",
                loc: [17, 25, 17, 30],
                text: "Badge",
                bindingKey: "Badge$1417d0qt1zuw2$1",
              },
              attributes: [
                {
                  name: "n",
                  initializer: {
                    kind: "binop",
                    loc: [17, 34, 17, 53],
                    left: {
                      kind: "()",
                      loc: [17, 34, 17, 46],
                      expression: {
                        kind: ".",
                        loc: [17, 34, 17, 44],
                        expression: {
                          kind: "id",
                          loc: [17, 34, 17, 39],
                          text: "count",
                          bindingKey: "count$1417d0qt1zuw2$0",
                        },
                        name: "read",
                      },
                      arguments: [],
                    },
                    operatorToken: "+",
                    right: {
                      kind: "number",
                      loc: [17, 49, 17, 53],
                      value: 1000,
                    },
                  },
                },
              ],
              children: [],
            }),
          ),
        }),
        params: ["count$1417d0qt1zuw2$0", "Badge$1417d0qt1zuw2$1"],
      },
      $0splice3: {
        value: cs.create(
          [18, 10, 18, 86],
          {
            version: "0.0.0",
            filePath: "script-bound-tag-capture.tsx",
            fileHash: "1417d0qt1zuw2",
            splices: { $For: { value: For, params: [] } },
            captures: ["Badge$1417d0qt1zuw2$1", "count$1417d0qt1zuw2$0"],
          },
          () => ({
            kind: "jsx",
            loc: [18, 13, 18, 85],
            type: {
              kind: "splice",
              loc: [18, 14, 18, 17],
              key: "$For",
            },
            attributes: [
              {
                name: "each",
                initializer: {
                  kind: "arr",
                  loc: [18, 24, 18, 30],
                  elements: [
                    {
                      kind: "number",
                      loc: [18, 25, 18, 26],
                      value: 1,
                    },
                    {
                      kind: "number",
                      loc: [18, 28, 18, 29],
                      value: 2,
                    },
                  ],
                },
              },
            ],
            children: [
              {
                kind: "=>",
                loc: [18, 33, 18, 78],
                parameters: [
                  {
                    kind: "param",
                    loc: [18, 34, 18, 43],
                    name: {
                      kind: "id",
                      loc: [18, 34, 18, 35],
                      text: "m",
                      bindingKey: "m$1417d0qt1zuw2$4",
                    },
                  },
                ],
                body: {
                  kind: "jsx",
                  loc: [18, 48, 18, 78],
                  type: {
                    kind: "id",
                    loc: [18, 49, 18, 54],
                    text: "Badge",
                    bindingKey: "Badge$1417d0qt1zuw2$1",
                  },
                  attributes: [
                    {
                      name: "n",
                      initializer: {
                        kind: "binop",
                        loc: [18, 58, 18, 74],
                        left: {
                          kind: "id",
                          loc: [18, 58, 18, 59],
                          text: "m",
                          bindingKey: "m$1417d0qt1zuw2$4",
                        },
                        operatorToken: "*",
                        right: {
                          kind: "()",
                          loc: [18, 62, 18, 74],
                          expression: {
                            kind: ".",
                            loc: [18, 62, 18, 72],
                            expression: {
                              kind: "id",
                              loc: [18, 62, 18, 67],
                              text: "count",
                              bindingKey: "count$1417d0qt1zuw2$0",
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
        params: ["count$1417d0qt1zuw2$0", "Badge$1417d0qt1zuw2$1"],
      },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [6, 19, 22, 2],
    statements: [
      {
        kind: "const",
        loc: [7, 3, 7, 27],
        name: {
          kind: "id",
          loc: [7, 9, 7, 14],
          text: "count",
          bindingKey: "count$1417d0qt1zuw2$0",
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
          bindingKey: "Badge$1417d0qt1zuw2$1",
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
                bindingKey: "props$1417d0qt1zuw2$2",
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
                    bindingKey: "props$1417d0qt1zuw2$2",
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
        loc: [10, 3, 21, 5],
        expression: {
          kind: "jsx",
          loc: [11, 5, 20, 11],
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
              loc: [13, 8, 16, 10],
              key: "$0splice1",
            },
            {
              kind: "splice",
              loc: [17, 8, 17, 71],
              key: "$0splice2",
            },
            {
              kind: "splice",
              loc: [18, 8, 18, 87],
              key: "$0splice3",
            },
            {
              kind: "jsx",
              loc: [19, 7, 19, 74],
              type: {
                kind: "string",
                loc: [19, 8, 19, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [19, 24, 19, 59],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [19, 30, 19, 59],
                      expression: {
                        kind: ".",
                        loc: [19, 30, 19, 41],
                        expression: {
                          kind: "id",
                          loc: [19, 30, 19, 35],
                          text: "count",
                          bindingKey: "count$1417d0qt1zuw2$0",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [19, 42, 19, 58],
                          left: {
                            kind: "()",
                            loc: [19, 42, 19, 54],
                            expression: {
                              kind: ".",
                              loc: [19, 42, 19, 52],
                              expression: {
                                kind: "id",
                                loc: [19, 42, 19, 47],
                                text: "count",
                                bindingKey: "count$1417d0qt1zuw2$0",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [19, 57, 19, 58],
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
                  loc: [19, 61, 19, 65],
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
