import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, For } from "@backtickjs/core";
// A list whose members carry storage of their own: `build` declares a cell per
// row, and the cell the list reads holds those cells along with the rows. A
// press writes into one row's cell, so only what read that cell runs again —
// the array is the array it was, and no other row moves.
//
// What a cell starts at is the other half of this: the initial is a call here,
// not data, which is what a cell declared where it is evaluated allows.
async function Rows() {
  return cs.create(
    [16, 10, 38, 5],
    {
      version: "0.0.0",
      filePath: "member-state.tsx",
      fileHash: "ivufpeeypdun",
      kind: "value",
      splices: { $For: For },
      captures: [],
      spliceParams: {},
    },
    () => ({
      kind: 242,
      loc: [16, 13, 38, 4],
      statements: [
        {
          kind: 244,
          loc: [17, 5, 21, 7],
          declarationList: {
            kind: 262,
            loc: [17, 5, 21, 6],
            declarations: [
              {
                kind: 261,
                loc: [17, 11, 21, 6],
                name: {
                  kind: 80,
                  loc: [17, 11, 17, 16],
                  text: "build",
                  bindingKey: "build$ivufpeeypdun$0",
                },
                initializer: {
                  kind: 220,
                  loc: [17, 19, 21, 6],
                  parameters: [
                    {
                      kind: 170,
                      loc: [17, 20, 17, 32],
                      name: {
                        kind: 80,
                        loc: [17, 20, 17, 24],
                        text: "from",
                        bindingKey: "from$ivufpeeypdun$2",
                      },
                    },
                  ],
                  body: {
                    kind: 242,
                    loc: [17, 37, 21, 6],
                    statements: [
                      {
                        kind: 254,
                        loc: [18, 7, 20, 10],
                        expression: {
                          kind: 214,
                          loc: [18, 14, 20, 9],
                          expression: {
                            kind: 1001,
                            loc: [18, 14, 18, 24],
                            name: "Array.from",
                          },
                          questionDotToken: false,
                          arguments: [
                            {
                              kind: 211,
                              loc: [18, 25, 18, 38],
                              properties: [
                                {
                                  kind: 304,
                                  loc: [18, 27, 18, 36],
                                  name: "length",
                                  initializer: {
                                    kind: 9,
                                    loc: [18, 35, 18, 36],
                                    value: 3,
                                  },
                                },
                              ],
                            },
                            {
                              kind: 220,
                              loc: [18, 40, 20, 8],
                              parameters: [
                                {
                                  kind: 170,
                                  loc: [18, 41, 18, 42],
                                  name: {
                                    kind: 80,
                                    loc: [18, 41, 18, 42],
                                    text: "_",
                                    bindingKey: "_$ivufpeeypdun$3",
                                  },
                                },
                                {
                                  kind: 170,
                                  loc: [18, 44, 18, 46],
                                  name: {
                                    kind: 80,
                                    loc: [18, 44, 18, 46],
                                    text: "at",
                                    bindingKey: "at$ivufpeeypdun$4",
                                  },
                                },
                              ],
                              body: {
                                kind: 242,
                                loc: [18, 51, 20, 8],
                                statements: [
                                  {
                                    kind: 254,
                                    loc: [19, 9, 19, 70],
                                    expression: {
                                      kind: 211,
                                      loc: [19, 16, 19, 69],
                                      properties: [
                                        {
                                          kind: 304,
                                          loc: [19, 18, 19, 31],
                                          name: "id",
                                          initializer: {
                                            kind: 227,
                                            loc: [19, 22, 19, 31],
                                            left: {
                                              kind: 80,
                                              loc: [19, 22, 19, 26],
                                              text: "from",
                                              bindingKey: "from$ivufpeeypdun$2",
                                            },
                                            operatorToken: "+",
                                            right: {
                                              kind: 80,
                                              loc: [19, 29, 19, 31],
                                              text: "at",
                                              bindingKey: "at$ivufpeeypdun$4",
                                            },
                                          },
                                        },
                                        {
                                          kind: 304,
                                          loc: [19, 33, 19, 67],
                                          name: "label",
                                          initializer: {
                                            kind: 214,
                                            loc: [19, 40, 19, 67],
                                            expression: {
                                              kind: 1001,
                                              loc: [19, 40, 19, 45],
                                              name: "state",
                                            },
                                            questionDotToken: false,
                                            arguments: [
                                              {
                                                kind: 227,
                                                loc: [19, 46, 19, 66],
                                                left: {
                                                  kind: 11,
                                                  loc: [19, 46, 19, 52],
                                                  text: "row ",
                                                },
                                                operatorToken: "+",
                                                right: {
                                                  kind: 227,
                                                  loc: [19, 56, 19, 65],
                                                  left: {
                                                    kind: 80,
                                                    loc: [19, 56, 19, 60],
                                                    text: "from",
                                                    bindingKey:
                                                      "from$ivufpeeypdun$2",
                                                  },
                                                  operatorToken: "+",
                                                  right: {
                                                    kind: 80,
                                                    loc: [19, 63, 19, 65],
                                                    text: "at",
                                                    bindingKey:
                                                      "at$ivufpeeypdun$4",
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
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
          kind: 244,
          loc: [23, 5, 23, 34],
          declarationList: {
            kind: 262,
            loc: [23, 5, 23, 33],
            declarations: [
              {
                kind: 261,
                loc: [23, 11, 23, 33],
                name: {
                  kind: 80,
                  loc: [23, 11, 23, 15],
                  text: "held",
                  bindingKey: "held$ivufpeeypdun$1",
                },
                initializer: {
                  kind: 214,
                  loc: [23, 18, 23, 33],
                  expression: {
                    kind: 1001,
                    loc: [23, 18, 23, 23],
                    name: "state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 214,
                      loc: [23, 24, 23, 32],
                      expression: {
                        kind: 80,
                        loc: [23, 24, 23, 29],
                        text: "build",
                        bindingKey: "build$ivufpeeypdun$0",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 9,
                          loc: [23, 30, 23, 31],
                          value: 1,
                        },
                      ],
                    },
                  ],
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [25, 5, 37, 7],
          expression: {
            kind: 285,
            loc: [26, 7, 36, 13],
            type: {
              kind: 11,
              loc: [26, 8, 26, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: 285,
                loc: [27, 9, 35, 14],
                type: {
                  kind: 11,
                  loc: [27, 10, 27, 12],
                  text: "ul",
                },
                attributes: [
                  {
                    name: "class",
                    initializer: {
                      kind: 11,
                      loc: [27, 19, 27, 25],
                      text: "rows",
                    },
                  },
                ],
                children: [
                  {
                    kind: 285,
                    loc: [28, 11, 34, 17],
                    type: {
                      kind: 1000,
                      loc: [28, 12, 28, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: 214,
                          loc: [28, 22, 28, 33],
                          expression: {
                            kind: 212,
                            loc: [28, 22, 28, 31],
                            expression: {
                              kind: 80,
                              loc: [28, 22, 28, 26],
                              text: "held",
                              bindingKey: "held$ivufpeeypdun$1",
                            },
                            questionDotToken: false,
                            name: "read",
                          },
                          questionDotToken: false,
                          arguments: [],
                        },
                      },
                    ],
                    children: [
                      {
                        kind: 220,
                        loc: [29, 14, 33, 14],
                        parameters: [
                          {
                            kind: 170,
                            loc: [29, 15, 29, 23],
                            name: {
                              kind: 80,
                              loc: [29, 15, 29, 18],
                              text: "row",
                              bindingKey: "row$ivufpeeypdun$5",
                            },
                          },
                        ],
                        body: {
                          kind: 285,
                          loc: [30, 15, 32, 20],
                          type: {
                            kind: 11,
                            loc: [30, 16, 30, 18],
                            text: "li",
                          },
                          attributes: [
                            {
                              name: "onclick",
                              initializer: {
                                kind: 220,
                                loc: [30, 28, 30, 60],
                                parameters: [],
                                body: {
                                  kind: 214,
                                  loc: [30, 34, 30, 60],
                                  expression: {
                                    kind: 212,
                                    loc: [30, 34, 30, 49],
                                    expression: {
                                      kind: 212,
                                      loc: [30, 34, 30, 43],
                                      expression: {
                                        kind: 80,
                                        loc: [30, 34, 30, 37],
                                        text: "row",
                                        bindingKey: "row$ivufpeeypdun$5",
                                      },
                                      questionDotToken: false,
                                      name: "label",
                                    },
                                    questionDotToken: false,
                                    name: "write",
                                  },
                                  questionDotToken: false,
                                  arguments: [
                                    {
                                      kind: 11,
                                      loc: [30, 50, 30, 59],
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
                              loc: [31, 18, 31, 34],
                              expression: {
                                kind: 212,
                                loc: [31, 18, 31, 32],
                                expression: {
                                  kind: 212,
                                  loc: [31, 18, 31, 27],
                                  expression: {
                                    kind: 80,
                                    loc: [31, 18, 31, 21],
                                    text: "row",
                                    bindingKey: "row$ivufpeeypdun$5",
                                  },
                                  questionDotToken: false,
                                  name: "label",
                                },
                                questionDotToken: false,
                                name: "read",
                              },
                              questionDotToken: false,
                              arguments: [],
                            },
                          ],
                        },
                      },
                    ],
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
export default _jsx(Rows, {});
