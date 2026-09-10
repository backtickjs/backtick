import { jsx as _jsx } from "@backtickjs/web/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  return cs.create(
    [8, 10, 30, 5],
    {
      version: "0.0.0",
      filePath: "script-element.tsx",
      fileHash: "wxnogu00pnd4",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [8, 13, 30, 4],
      statements: [
        {
          kind: "const",
          loc: [9, 5, 9, 32],
          name: {
            kind: "id",
            loc: [9, 11, 9, 16],
            text: "label",
            bindingKey: "label$wxnogu00pnd4$0",
          },
          initializer: {
            kind: "()",
            loc: [9, 19, 9, 31],
            expression: {
              kind: "splice",
              loc: [9, 19, 9, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "string",
                loc: [9, 26, 9, 30],
                text: "hi",
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [13, 5, 27, 7],
          name: {
            kind: "id",
            loc: [13, 11, 13, 14],
            text: "row",
            bindingKey: "row$wxnogu00pnd4$1",
          },
          initializer: {
            kind: "=>",
            loc: [13, 17, 27, 6],
            parameters: [
              {
                kind: "param",
                loc: [13, 18, 13, 30],
                name: {
                  kind: "id",
                  loc: [13, 18, 13, 22],
                  text: "size",
                  bindingKey: "size$wxnogu00pnd4$2",
                },
              },
            ],
            body: {
              kind: "{}",
              loc: [13, 35, 27, 6],
              statements: [
                {
                  kind: "const",
                  loc: [14, 7, 14, 47],
                  name: {
                    kind: "id",
                    loc: [14, 13, 14, 16],
                    text: "css",
                    bindingKey: "css$wxnogu00pnd4$3",
                  },
                  initializer: {
                    kind: "binop",
                    loc: [14, 19, 14, 46],
                    left: {
                      kind: "binop",
                      loc: [14, 19, 14, 39],
                      left: {
                        kind: "string",
                        loc: [14, 19, 14, 32],
                        text: "font-size: ",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "id",
                        loc: [14, 35, 14, 39],
                        text: "size",
                        bindingKey: "size$wxnogu00pnd4$2",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [14, 42, 14, 46],
                      text: "px",
                    },
                  },
                },
                {
                  kind: "const",
                  loc: [15, 7, 15, 47],
                  name: {
                    kind: "id",
                    loc: [15, 13, 15, 18],
                    text: "press",
                    bindingKey: "press$wxnogu00pnd4$4",
                  },
                  initializer: {
                    kind: "=>",
                    loc: [15, 21, 15, 46],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [15, 27, 15, 46],
                      expression: {
                        kind: ".",
                        loc: [15, 27, 15, 38],
                        expression: {
                          kind: "id",
                          loc: [15, 27, 15, 32],
                          text: "label",
                          bindingKey: "label$wxnogu00pnd4$0",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "string",
                          loc: [15, 39, 15, 45],
                          text: "held",
                        },
                      ],
                    },
                  },
                },
                {
                  kind: "return",
                  loc: [16, 7, 26, 9],
                  expression: {
                    kind: "jsx",
                    loc: [17, 9, 25, 15],
                    type: {
                      kind: "string",
                      loc: [17, 10, 17, 13],
                      text: "div",
                    },
                    attributes: [
                      {
                        name: "style",
                        initializer: {
                          kind: "id",
                          loc: [17, 21, 17, 24],
                          text: "css",
                          bindingKey: "css$wxnogu00pnd4$3",
                        },
                      },
                    ],
                    children: [
                      {
                        kind: "jsx",
                        loc: [18, 11, 20, 18],
                        type: {
                          kind: "string",
                          loc: [18, 12, 18, 16],
                          text: "span",
                        },
                        attributes: [
                          {
                            name: "style",
                            initializer: {
                              kind: "id",
                              loc: [18, 24, 18, 27],
                              text: "css",
                              bindingKey: "css$wxnogu00pnd4$3",
                            },
                          },
                          {
                            name: "onclick",
                            initializer: {
                              kind: "=>",
                              loc: [18, 38, 18, 66],
                              parameters: [],
                              body: {
                                kind: "()",
                                loc: [18, 44, 18, 66],
                                expression: {
                                  kind: ".",
                                  loc: [18, 44, 18, 55],
                                  expression: {
                                    kind: "id",
                                    loc: [18, 44, 18, 49],
                                    text: "label",
                                    bindingKey: "label$wxnogu00pnd4$0",
                                  },
                                  name: "write",
                                },
                                arguments: [
                                  {
                                    kind: "string",
                                    loc: [18, 56, 18, 65],
                                    text: "pressed",
                                  },
                                ],
                              },
                            },
                          },
                        ],
                        children: [
                          {
                            kind: "()",
                            loc: [19, 14, 19, 26],
                            expression: {
                              kind: ".",
                              loc: [19, 14, 19, 24],
                              expression: {
                                kind: "id",
                                loc: [19, 14, 19, 19],
                                text: "label",
                                bindingKey: "label$wxnogu00pnd4$0",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                        ],
                      },
                      {
                        kind: "jsx",
                        loc: [21, 11, 21, 52],
                        type: {
                          kind: "string",
                          loc: [21, 12, 21, 16],
                          text: "span",
                        },
                        attributes: [
                          {
                            name: "style",
                            initializer: {
                              kind: "string",
                              loc: [21, 23, 21, 39],
                              text: "font-size: 8px",
                            },
                          },
                        ],
                        children: [
                          {
                            kind: "string",
                            loc: [21, 40, 21, 45],
                            text: "fixed",
                          },
                        ],
                      },
                      {
                        kind: "jsx",
                        loc: [22, 11, 24, 18],
                        type: {
                          kind: "string",
                          loc: [22, 12, 22, 16],
                          text: "span",
                        },
                        attributes: [
                          {
                            name: "style",
                            initializer: {
                              kind: "id",
                              loc: [22, 24, 22, 27],
                              text: "css",
                              bindingKey: "css$wxnogu00pnd4$3",
                            },
                          },
                          {
                            name: "onclick",
                            initializer: {
                              kind: "id",
                              loc: [22, 38, 22, 43],
                              text: "press",
                              bindingKey: "press$wxnogu00pnd4$4",
                            },
                          },
                        ],
                        children: [
                          {
                            kind: "string",
                            loc: [23, 13, 24, 11],
                            text: "held",
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        {
          kind: "return",
          loc: [29, 5, 29, 52],
          expression: {
            kind: "jsx",
            loc: [29, 12, 29, 51],
            type: {
              kind: "string",
              loc: [29, 13, 29, 16],
              text: "div",
            },
            attributes: [
              {
                name: "style",
                initializer: {
                  kind: "string",
                  loc: [29, 23, 29, 35],
                  text: "padding: 0",
                },
              },
            ],
            children: [
              {
                kind: "()",
                loc: [29, 37, 29, 44],
                expression: {
                  kind: "id",
                  loc: [29, 37, 29, 40],
                  text: "row",
                  bindingKey: "row$wxnogu00pnd4$1",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [29, 41, 29, 43],
                    value: 12,
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  );
}
export default _jsx(Card, {});
