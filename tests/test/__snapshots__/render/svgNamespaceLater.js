import { cs, For, state } from "@backtickjs/core";
// Drawn after the first pass: a row the list adds on a write, and a `title` a
// condition shows, are SVG's because of where they stand, and the `title` after
// the `svg` is HTML's again.
const svgNamespaceLater = cs.create(
  [6, 27, 21, 3],
  {
    version: "0.0.0",
    filePath: "svgNamespaceLater.tsx",
    fileHash: "3dhtduu4dq04d",
    splices: {
      $state: { value: state, params: [] },
      $For: { value: For, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [6, 30, 21, 2],
    statements: [
      {
        kind: "const",
        loc: [7, 3, 7, 27],
        name: {
          kind: "id",
          loc: [7, 9, 7, 11],
          text: "xs",
          bindingKey: "xs$3dhtduu4dq04d$0",
        },
        initializer: {
          kind: "()",
          loc: [7, 14, 7, 26],
          expression: {
            kind: "splice",
            loc: [7, 14, 7, 20],
            key: "$state",
          },
          arguments: [
            {
              kind: "arr",
              loc: [7, 21, 7, 25],
              elements: [
                {
                  kind: "number",
                  loc: [7, 22, 7, 24],
                  value: 10,
                },
              ],
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [8, 3, 8, 31],
        name: {
          kind: "id",
          loc: [8, 9, 8, 14],
          text: "shown",
          bindingKey: "shown$3dhtduu4dq04d$1",
        },
        initializer: {
          kind: "()",
          loc: [8, 17, 8, 30],
          expression: {
            kind: "splice",
            loc: [8, 17, 8, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "false",
              loc: [8, 24, 8, 29],
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [10, 3, 20, 5],
        expression: {
          kind: "jsx",
          loc: [11, 5, 19, 11],
          type: {
            kind: "string",
            loc: [11, 6, 11, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [12, 7, 15, 13],
              type: {
                kind: "string",
                loc: [12, 8, 12, 11],
                text: "svg",
              },
              attributes: [
                {
                  name: "viewBox",
                  initializer: {
                    kind: "string",
                    loc: [12, 20, 12, 31],
                    text: "0 0 30 10",
                  },
                },
              ],
              children: [
                {
                  kind: "jsx",
                  loc: [13, 9, 13, 81],
                  type: {
                    kind: "splice",
                    loc: [13, 10, 13, 13],
                    key: "$For",
                  },
                  attributes: [
                    {
                      name: "each",
                      initializer: {
                        kind: "()",
                        loc: [13, 20, 13, 29],
                        expression: {
                          kind: ".",
                          loc: [13, 20, 13, 27],
                          expression: {
                            kind: "id",
                            loc: [13, 20, 13, 22],
                            text: "xs",
                            bindingKey: "xs$3dhtduu4dq04d$0",
                          },
                          name: "read",
                        },
                        arguments: [],
                      },
                    },
                  ],
                  children: [
                    {
                      kind: "=>",
                      loc: [13, 32, 13, 74],
                      parameters: [
                        {
                          kind: "param",
                          loc: [13, 33, 13, 42],
                          name: {
                            kind: "id",
                            loc: [13, 33, 13, 34],
                            text: "x",
                            bindingKey: "x$3dhtduu4dq04d$2",
                          },
                        },
                      ],
                      body: {
                        kind: "jsx",
                        loc: [13, 47, 13, 74],
                        type: {
                          kind: "string",
                          loc: [13, 48, 13, 53],
                          text: "title",
                        },
                        attributes: [],
                        children: [
                          {
                            kind: "binop",
                            loc: [13, 55, 13, 65],
                            left: {
                              kind: "string",
                              loc: [13, 55, 13, 61],
                              text: "dot ",
                            },
                            operatorToken: "+",
                            right: {
                              kind: "id",
                              loc: [13, 64, 13, 65],
                              text: "x",
                              bindingKey: "x$3dhtduu4dq04d$2",
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  kind: "?:",
                  loc: [14, 10, 14, 56],
                  condition: {
                    kind: "()",
                    loc: [14, 10, 14, 22],
                    expression: {
                      kind: ".",
                      loc: [14, 10, 14, 20],
                      expression: {
                        kind: "id",
                        loc: [14, 10, 14, 15],
                        text: "shown",
                        bindingKey: "shown$3dhtduu4dq04d$1",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                  whenTrue: {
                    kind: "jsx",
                    loc: [14, 25, 14, 49],
                    type: {
                      kind: "string",
                      loc: [14, 26, 14, 31],
                      text: "title",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "string",
                        loc: [14, 33, 14, 40],
                        text: "shown",
                      },
                    ],
                  },
                  whenFalse: {
                    kind: "null",
                    loc: [14, 52, 14, 56],
                  },
                },
              ],
            },
            {
              kind: "jsx",
              loc: [16, 7, 16, 31],
              type: {
                kind: "string",
                loc: [16, 8, 16, 13],
                text: "title",
              },
              attributes: [],
              children: [
                {
                  kind: "string",
                  loc: [16, 15, 16, 22],
                  text: "after",
                },
              ],
            },
            {
              kind: "jsx",
              loc: [17, 7, 17, 62],
              type: {
                kind: "string",
                loc: [17, 8, 17, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [17, 24, 17, 48],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [17, 30, 17, 48],
                      expression: {
                        kind: ".",
                        loc: [17, 30, 17, 38],
                        expression: {
                          kind: "id",
                          loc: [17, 30, 17, 32],
                          text: "xs",
                          bindingKey: "xs$3dhtduu4dq04d$0",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "arr",
                          loc: [17, 39, 17, 47],
                          elements: [
                            {
                              kind: "number",
                              loc: [17, 40, 17, 42],
                              value: 10,
                            },
                            {
                              kind: "number",
                              loc: [17, 44, 17, 46],
                              value: 20,
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
                  kind: "string",
                  loc: [17, 50, 17, 53],
                  text: "add",
                },
              ],
            },
            {
              kind: "jsx",
              loc: [18, 7, 18, 62],
              type: {
                kind: "string",
                loc: [18, 8, 18, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [18, 24, 18, 47],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [18, 30, 18, 47],
                      expression: {
                        kind: ".",
                        loc: [18, 30, 18, 41],
                        expression: {
                          kind: "id",
                          loc: [18, 30, 18, 35],
                          text: "shown",
                          bindingKey: "shown$3dhtduu4dq04d$1",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "true",
                          loc: [18, 42, 18, 46],
                        },
                      ],
                    },
                  },
                },
              ],
              children: [
                {
                  kind: "string",
                  loc: [18, 49, 18, 53],
                  text: "show",
                },
              ],
            },
          ],
        },
      },
    ],
  }),
);
