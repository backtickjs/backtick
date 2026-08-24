import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, For, state } from "@backtickjs/core";
// A keyed list driven by a cell. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
//
// What that has to buy is node identity: a reorder moves the nodes already
// built, and a removal takes one node with it and leaves the rest alone.
// `state.test.ts` holds the nodes across a write and checks exactly that,
// which is the half a snapshot of the drawn markup cannot see.
async function Rows() {
  return cs.create(
    [12, 10, 31, 5],
    {
      version: "0.0.0",
      filePath: "keyed-rows.tsx",
      fileHash: "1879rjsuy33z2",
      kind: "value",
      splices: { $state: state, $For: For },
      captures: [],
      spliceParams: { $state: [] },
    },
    () => ({
      kind: 242,
      loc: [12, 13, 31, 4],
      statements: [
        {
          kind: 244,
          loc: [13, 5, 13, 45],
          declarationList: {
            kind: 262,
            loc: [13, 5, 13, 44],
            declarations: [
              {
                kind: 261,
                loc: [13, 11, 13, 44],
                name: {
                  kind: 80,
                  loc: [13, 11, 13, 14],
                  text: "ids",
                  bindingKey: "ids$1879rjsuy33z2$0",
                },
                initializer: {
                  kind: 214,
                  loc: [13, 17, 13, 44],
                  expression: {
                    kind: 1000,
                    loc: [13, 17, 13, 23],
                    key: "$state",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 210,
                      loc: [13, 34, 13, 43],
                      elements: [
                        {
                          kind: 9,
                          loc: [13, 35, 13, 36],
                          value: 1,
                        },
                        {
                          kind: 9,
                          loc: [13, 38, 13, 39],
                          value: 2,
                        },
                        {
                          kind: 9,
                          loc: [13, 41, 13, 42],
                          value: 3,
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
          kind: 244,
          loc: [14, 5, 16, 7],
          declarationList: {
            kind: 262,
            loc: [14, 5, 16, 6],
            declarations: [
              {
                kind: 261,
                loc: [14, 11, 16, 6],
                name: {
                  kind: 80,
                  loc: [14, 11, 14, 15],
                  text: "swap",
                  bindingKey: "swap$1879rjsuy33z2$1",
                },
                initializer: {
                  kind: 220,
                  loc: [14, 18, 16, 6],
                  parameters: [],
                  body: {
                    kind: 242,
                    loc: [14, 24, 16, 6],
                    statements: [
                      {
                        kind: 214,
                        loc: [15, 7, 15, 67],
                        expression: {
                          kind: 212,
                          loc: [15, 7, 15, 17],
                          expression: {
                            kind: 80,
                            loc: [15, 7, 15, 10],
                            text: "ids",
                            bindingKey: "ids$1879rjsuy33z2$0",
                          },
                          questionDotToken: false,
                          name: "update",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 220,
                            loc: [15, 18, 15, 66],
                            parameters: [
                              {
                                kind: 170,
                                loc: [15, 19, 15, 23],
                                name: {
                                  kind: 80,
                                  loc: [15, 19, 15, 23],
                                  text: "held",
                                  bindingKey: "held$1879rjsuy33z2$3",
                                },
                              },
                            ],
                            body: {
                              kind: 214,
                              loc: [15, 28, 15, 66],
                              expression: {
                                kind: 212,
                                loc: [15, 28, 15, 54],
                                expression: {
                                  kind: 214,
                                  loc: [15, 28, 15, 49],
                                  expression: {
                                    kind: 212,
                                    loc: [15, 28, 15, 37],
                                    expression: {
                                      kind: 80,
                                      loc: [15, 28, 15, 32],
                                      text: "held",
                                      bindingKey: "held$1879rjsuy33z2$3",
                                    },
                                    questionDotToken: false,
                                    name: "with",
                                  },
                                  questionDotToken: false,
                                  arguments: [
                                    {
                                      kind: 9,
                                      loc: [15, 38, 15, 39],
                                      value: 0,
                                    },
                                    {
                                      kind: 213,
                                      loc: [15, 41, 15, 48],
                                      expression: {
                                        kind: 80,
                                        loc: [15, 41, 15, 45],
                                        text: "held",
                                        bindingKey: "held$1879rjsuy33z2$3",
                                      },
                                      argumentExpression: {
                                        kind: 9,
                                        loc: [15, 46, 15, 47],
                                        value: 2,
                                      },
                                    },
                                  ],
                                },
                                questionDotToken: false,
                                name: "with",
                              },
                              questionDotToken: false,
                              arguments: [
                                {
                                  kind: 9,
                                  loc: [15, 55, 15, 56],
                                  value: 2,
                                },
                                {
                                  kind: 213,
                                  loc: [15, 58, 15, 65],
                                  expression: {
                                    kind: 80,
                                    loc: [15, 58, 15, 62],
                                    text: "held",
                                    bindingKey: "held$1879rjsuy33z2$3",
                                  },
                                  argumentExpression: {
                                    kind: 9,
                                    loc: [15, 63, 15, 64],
                                    value: 0,
                                  },
                                },
                              ],
                            },
                          },
                        ],
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
          loc: [17, 5, 19, 7],
          declarationList: {
            kind: 262,
            loc: [17, 5, 19, 6],
            declarations: [
              {
                kind: 261,
                loc: [17, 11, 19, 6],
                name: {
                  kind: 80,
                  loc: [17, 11, 17, 15],
                  text: "drop",
                  bindingKey: "drop$1879rjsuy33z2$2",
                },
                initializer: {
                  kind: 220,
                  loc: [17, 18, 19, 6],
                  parameters: [],
                  body: {
                    kind: 242,
                    loc: [17, 24, 19, 6],
                    statements: [
                      {
                        kind: 214,
                        loc: [18, 7, 18, 58],
                        expression: {
                          kind: 212,
                          loc: [18, 7, 18, 17],
                          expression: {
                            kind: 80,
                            loc: [18, 7, 18, 10],
                            text: "ids",
                            bindingKey: "ids$1879rjsuy33z2$0",
                          },
                          questionDotToken: false,
                          name: "update",
                        },
                        questionDotToken: false,
                        arguments: [
                          {
                            kind: 220,
                            loc: [18, 18, 18, 57],
                            parameters: [
                              {
                                kind: 170,
                                loc: [18, 19, 18, 23],
                                name: {
                                  kind: 80,
                                  loc: [18, 19, 18, 23],
                                  text: "held",
                                  bindingKey: "held$1879rjsuy33z2$4",
                                },
                              },
                            ],
                            body: {
                              kind: 214,
                              loc: [18, 28, 18, 57],
                              expression: {
                                kind: 212,
                                loc: [18, 28, 18, 39],
                                expression: {
                                  kind: 80,
                                  loc: [18, 28, 18, 32],
                                  text: "held",
                                  bindingKey: "held$1879rjsuy33z2$4",
                                },
                                questionDotToken: false,
                                name: "filter",
                              },
                              questionDotToken: false,
                              arguments: [
                                {
                                  kind: 220,
                                  loc: [18, 40, 18, 56],
                                  parameters: [
                                    {
                                      kind: 170,
                                      loc: [18, 41, 18, 43],
                                      name: {
                                        kind: 80,
                                        loc: [18, 41, 18, 43],
                                        text: "id",
                                        bindingKey: "id$1879rjsuy33z2$5",
                                      },
                                    },
                                  ],
                                  body: {
                                    kind: 227,
                                    loc: [18, 48, 18, 56],
                                    left: {
                                      kind: 80,
                                      loc: [18, 48, 18, 50],
                                      text: "id",
                                      bindingKey: "id$1879rjsuy33z2$5",
                                    },
                                    operatorToken: "!==",
                                    right: {
                                      kind: 9,
                                      loc: [18, 55, 18, 56],
                                      value: 2,
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        ],
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
          loc: [20, 5, 30, 7],
          expression: {
            kind: 285,
            loc: [21, 7, 29, 13],
            type: {
              kind: 11,
              loc: [21, 8, 21, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: 285,
                loc: [22, 9, 22, 41],
                type: {
                  kind: 11,
                  loc: [22, 10, 22, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: 80,
                      loc: [22, 24, 22, 28],
                      text: "swap",
                      bindingKey: "swap$1879rjsuy33z2$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: 11,
                    loc: [22, 30, 22, 34],
                    text: "swap",
                  },
                ],
              },
              {
                kind: 285,
                loc: [23, 9, 23, 41],
                type: {
                  kind: 11,
                  loc: [23, 10, 23, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: 80,
                      loc: [23, 24, 23, 28],
                      text: "drop",
                      bindingKey: "drop$1879rjsuy33z2$2",
                    },
                  },
                ],
                children: [
                  {
                    kind: 11,
                    loc: [23, 30, 23, 34],
                    text: "drop",
                  },
                ],
              },
              {
                kind: 285,
                loc: [24, 9, 28, 15],
                type: {
                  kind: 11,
                  loc: [24, 10, 24, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: 285,
                    loc: [25, 11, 27, 17],
                    type: {
                      kind: 1000,
                      loc: [25, 12, 25, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: 214,
                          loc: [25, 22, 25, 32],
                          expression: {
                            kind: 212,
                            loc: [25, 22, 25, 30],
                            expression: {
                              kind: 80,
                              loc: [25, 22, 25, 25],
                              text: "ids",
                              bindingKey: "ids$1879rjsuy33z2$0",
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
                        loc: [26, 14, 26, 56],
                        parameters: [
                          {
                            kind: 170,
                            loc: [26, 15, 26, 25],
                            name: {
                              kind: 80,
                              loc: [26, 15, 26, 17],
                              text: "id",
                              bindingKey: "id$1879rjsuy33z2$6",
                            },
                          },
                        ],
                        body: {
                          kind: 285,
                          loc: [26, 30, 26, 56],
                          type: {
                            kind: 11,
                            loc: [26, 31, 26, 35],
                            text: "span",
                          },
                          attributes: [],
                          children: [
                            {
                              kind: 227,
                              loc: [26, 37, 26, 48],
                              left: {
                                kind: 11,
                                loc: [26, 37, 26, 43],
                                text: "row ",
                              },
                              operatorToken: "+",
                              right: {
                                kind: 80,
                                loc: [26, 46, 26, 48],
                                text: "id",
                                bindingKey: "id$1879rjsuy33z2$6",
                              },
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
