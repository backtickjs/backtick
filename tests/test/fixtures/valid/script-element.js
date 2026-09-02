import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
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
      kind: 242,
      loc: [8, 13, 30, 4],
      statements: [
        {
          kind: 244,
          loc: [9, 5, 9, 32],
          declarationList: {
            kind: 262,
            loc: [9, 5, 9, 31],
            declarations: [
              {
                kind: 261,
                loc: [9, 11, 9, 31],
                name: {
                  kind: 80,
                  loc: [9, 11, 9, 16],
                  text: "label",
                  bindingKey: "label$wxnogu00pnd4$0",
                },
                initializer: {
                  kind: 214,
                  loc: [9, 19, 9, 31],
                  expression: {
                    kind: 1000,
                    loc: [9, 19, 9, 25],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 11,
                      loc: [9, 26, 9, 30],
                      text: "hi",
                    },
                  ],
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 244,
          loc: [13, 5, 27, 7],
          declarationList: {
            kind: 262,
            loc: [13, 5, 27, 6],
            declarations: [
              {
                kind: 261,
                loc: [13, 11, 27, 6],
                name: {
                  kind: 80,
                  loc: [13, 11, 13, 14],
                  text: "row",
                  bindingKey: "row$wxnogu00pnd4$1",
                },
                initializer: {
                  kind: 220,
                  loc: [13, 17, 27, 6],
                  parameters: [
                    {
                      kind: 170,
                      loc: [13, 18, 13, 30],
                      name: {
                        kind: 80,
                        loc: [13, 18, 13, 22],
                        text: "size",
                        bindingKey: "size$wxnogu00pnd4$2",
                      },
                    },
                  ],
                  body: {
                    kind: 242,
                    loc: [13, 35, 27, 6],
                    statements: [
                      {
                        kind: 244,
                        loc: [14, 7, 14, 47],
                        declarationList: {
                          kind: 262,
                          loc: [14, 7, 14, 46],
                          declarations: [
                            {
                              kind: 261,
                              loc: [14, 13, 14, 46],
                              name: {
                                kind: 80,
                                loc: [14, 13, 14, 16],
                                text: "css",
                                bindingKey: "css$wxnogu00pnd4$3",
                              },
                              initializer: {
                                kind: 227,
                                loc: [14, 19, 14, 46],
                                left: {
                                  kind: 227,
                                  loc: [14, 19, 14, 39],
                                  left: {
                                    kind: 11,
                                    loc: [14, 19, 14, 32],
                                    text: "font-size: ",
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: 80,
                                    loc: [14, 35, 14, 39],
                                    text: "size",
                                    bindingKey: "size$wxnogu00pnd4$2",
                                  },
                                },
                                operatorToken: "+",
                                right: {
                                  kind: 11,
                                  loc: [14, 42, 14, 46],
                                  text: "px",
                                },
                              },
                            },
                          ],
                          keyword: "const",
                        },
                      },
                      {
                        kind: 244,
                        loc: [15, 7, 15, 47],
                        declarationList: {
                          kind: 262,
                          loc: [15, 7, 15, 46],
                          declarations: [
                            {
                              kind: 261,
                              loc: [15, 13, 15, 46],
                              name: {
                                kind: 80,
                                loc: [15, 13, 15, 18],
                                text: "press",
                                bindingKey: "press$wxnogu00pnd4$4",
                              },
                              initializer: {
                                kind: 220,
                                loc: [15, 21, 15, 46],
                                parameters: [],
                                body: {
                                  kind: 214,
                                  loc: [15, 27, 15, 46],
                                  expression: {
                                    kind: 212,
                                    loc: [15, 27, 15, 38],
                                    expression: {
                                      kind: 80,
                                      loc: [15, 27, 15, 32],
                                      text: "label",
                                      bindingKey: "label$wxnogu00pnd4$0",
                                    },
                                    questionDotToken: false,
                                    name: "write",
                                  },
                                  questionDotToken: false,
                                  arguments: [
                                    {
                                      kind: 11,
                                      loc: [15, 39, 15, 45],
                                      text: "held",
                                    },
                                  ],
                                },
                              },
                            },
                          ],
                          keyword: "const",
                        },
                      },
                      {
                        kind: 254,
                        loc: [16, 7, 26, 9],
                        expression: {
                          kind: 285,
                          loc: [17, 9, 25, 15],
                          type: {
                            kind: 11,
                            loc: [17, 10, 17, 13],
                            text: "div",
                          },
                          attributes: [
                            {
                              name: "style",
                              initializer: {
                                kind: 80,
                                loc: [17, 21, 17, 24],
                                text: "css",
                                bindingKey: "css$wxnogu00pnd4$3",
                              },
                            },
                          ],
                          children: [
                            {
                              kind: 285,
                              loc: [18, 11, 20, 18],
                              type: {
                                kind: 11,
                                loc: [18, 12, 18, 16],
                                text: "span",
                              },
                              attributes: [
                                {
                                  name: "style",
                                  initializer: {
                                    kind: 80,
                                    loc: [18, 24, 18, 27],
                                    text: "css",
                                    bindingKey: "css$wxnogu00pnd4$3",
                                  },
                                },
                                {
                                  name: "onclick",
                                  initializer: {
                                    kind: 220,
                                    loc: [18, 38, 18, 66],
                                    parameters: [],
                                    body: {
                                      kind: 214,
                                      loc: [18, 44, 18, 66],
                                      expression: {
                                        kind: 212,
                                        loc: [18, 44, 18, 55],
                                        expression: {
                                          kind: 80,
                                          loc: [18, 44, 18, 49],
                                          text: "label",
                                          bindingKey: "label$wxnogu00pnd4$0",
                                        },
                                        questionDotToken: false,
                                        name: "write",
                                      },
                                      questionDotToken: false,
                                      arguments: [
                                        {
                                          kind: 11,
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
                                  kind: 214,
                                  loc: [19, 14, 19, 26],
                                  expression: {
                                    kind: 212,
                                    loc: [19, 14, 19, 24],
                                    expression: {
                                      kind: 80,
                                      loc: [19, 14, 19, 19],
                                      text: "label",
                                      bindingKey: "label$wxnogu00pnd4$0",
                                    },
                                    questionDotToken: false,
                                    name: "read",
                                  },
                                  questionDotToken: false,
                                  arguments: [],
                                },
                              ],
                            },
                            {
                              kind: 285,
                              loc: [21, 11, 21, 52],
                              type: {
                                kind: 11,
                                loc: [21, 12, 21, 16],
                                text: "span",
                              },
                              attributes: [
                                {
                                  name: "style",
                                  initializer: {
                                    kind: 11,
                                    loc: [21, 23, 21, 39],
                                    text: "font-size: 8px",
                                  },
                                },
                              ],
                              children: [
                                {
                                  kind: 11,
                                  loc: [21, 40, 21, 45],
                                  text: "fixed",
                                },
                              ],
                            },
                            {
                              kind: 285,
                              loc: [22, 11, 24, 18],
                              type: {
                                kind: 11,
                                loc: [22, 12, 22, 16],
                                text: "span",
                              },
                              attributes: [
                                {
                                  name: "style",
                                  initializer: {
                                    kind: 80,
                                    loc: [22, 24, 22, 27],
                                    text: "css",
                                    bindingKey: "css$wxnogu00pnd4$3",
                                  },
                                },
                                {
                                  name: "onclick",
                                  initializer: {
                                    kind: 80,
                                    loc: [22, 38, 22, 43],
                                    text: "press",
                                    bindingKey: "press$wxnogu00pnd4$4",
                                  },
                                },
                              ],
                              children: [
                                {
                                  kind: 11,
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
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [29, 5, 29, 52],
          expression: {
            kind: 285,
            loc: [29, 12, 29, 51],
            type: {
              kind: 11,
              loc: [29, 13, 29, 16],
              text: "div",
            },
            attributes: [
              {
                name: "style",
                initializer: {
                  kind: 11,
                  loc: [29, 23, 29, 35],
                  text: "padding: 0",
                },
              },
            ],
            children: [
              {
                kind: 214,
                loc: [29, 37, 29, 44],
                expression: {
                  kind: 80,
                  loc: [29, 37, 29, 40],
                  text: "row",
                  bindingKey: "row$wxnogu00pnd4$1",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 9,
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
