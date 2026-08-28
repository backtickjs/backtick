import { cs, state } from "@backtickjs/core";
// A handler is handed what the DOM hands it, and which event that is comes from
// the DOM: `click` is a `PointerEvent`, `input` an `InputEvent`.
//
// `currentTarget` is the element the handler is on rather than the DOM's opaque
// `EventTarget`, which is what makes reading a field's value sayable — the DOM
// expects a cast there, and this language has none.
export default cs.create(
  [9, 16, 26, 3],
  {
    version: "0.0.0",
    filePath: "event-handlers.tsx",
    fileHash: "3amz4o8kezaww",
    kind: "value",
    splices: { $state: state },
    captures: [],
    spliceParams: { $state: [] },
  },
  () => ({
    kind: 242,
    loc: [9, 19, 26, 2],
    statements: [
      {
        kind: 244,
        loc: [10, 3, 10, 27],
        declarationList: {
          kind: 262,
          loc: [10, 3, 10, 26],
          declarations: [
            {
              kind: 261,
              loc: [10, 9, 10, 26],
              name: {
                kind: 80,
                loc: [10, 9, 10, 13],
                text: "said",
                bindingKey: "said$3amz4o8kezaww$0",
              },
              initializer: {
                kind: 214,
                loc: [10, 16, 10, 26],
                expression: {
                  kind: 1000,
                  loc: [10, 16, 10, 22],
                  key: "$state",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 11,
                    loc: [10, 23, 10, 25],
                    text: "",
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
        loc: [12, 3, 25, 5],
        expression: {
          kind: 285,
          loc: [13, 5, 24, 12],
          type: {
            kind: 11,
            loc: [13, 6, 13, 10],
            text: "form",
          },
          attributes: [
            {
              name: "onsubmit",
              initializer: {
                kind: 220,
                loc: [14, 17, 17, 8],
                parameters: [
                  {
                    kind: 170,
                    loc: [14, 18, 14, 23],
                    name: {
                      kind: 80,
                      loc: [14, 18, 14, 23],
                      text: "event",
                      bindingKey: "event$3amz4o8kezaww$1",
                    },
                  },
                ],
                body: {
                  kind: 242,
                  loc: [14, 28, 17, 8],
                  statements: [
                    {
                      kind: 214,
                      loc: [15, 9, 15, 31],
                      expression: {
                        kind: 212,
                        loc: [15, 9, 15, 29],
                        expression: {
                          kind: 80,
                          loc: [15, 9, 15, 14],
                          text: "event",
                          bindingKey: "event$3amz4o8kezaww$1",
                        },
                        questionDotToken: false,
                        name: "preventDefault",
                      },
                      questionDotToken: false,
                      arguments: [],
                    },
                    {
                      kind: 214,
                      loc: [16, 9, 16, 56],
                      expression: {
                        kind: 212,
                        loc: [16, 9, 16, 19],
                        expression: {
                          kind: 80,
                          loc: [16, 9, 16, 13],
                          text: "said",
                          bindingKey: "said$3amz4o8kezaww$0",
                        },
                        questionDotToken: false,
                        name: "write",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 227,
                          loc: [16, 20, 16, 55],
                          left: {
                            kind: 227,
                            loc: [16, 20, 16, 36],
                            left: {
                              kind: 212,
                              loc: [16, 20, 16, 30],
                              expression: {
                                kind: 80,
                                loc: [16, 20, 16, 25],
                                text: "event",
                                bindingKey: "event$3amz4o8kezaww$1",
                              },
                              questionDotToken: false,
                              name: "type",
                            },
                            operatorToken: "+",
                            right: {
                              kind: 11,
                              loc: [16, 33, 16, 36],
                              text: " ",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: 212,
                            loc: [16, 39, 16, 55],
                            expression: {
                              kind: 80,
                              loc: [16, 39, 16, 44],
                              text: "event",
                              bindingKey: "event$3amz4o8kezaww$1",
                            },
                            questionDotToken: false,
                            name: "cancelable",
                          },
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
              kind: 285,
              loc: [19, 7, 19, 78],
              type: {
                kind: 11,
                loc: [19, 8, 19, 16],
                text: "textarea",
              },
              attributes: [
                {
                  name: "oninput",
                  initializer: {
                    kind: 220,
                    loc: [19, 26, 19, 74],
                    parameters: [
                      {
                        kind: 170,
                        loc: [19, 27, 19, 32],
                        name: {
                          kind: 80,
                          loc: [19, 27, 19, 32],
                          text: "event",
                          bindingKey: "event$3amz4o8kezaww$2",
                        },
                      },
                    ],
                    body: {
                      kind: 214,
                      loc: [19, 37, 19, 74],
                      expression: {
                        kind: 212,
                        loc: [19, 37, 19, 47],
                        expression: {
                          kind: 80,
                          loc: [19, 37, 19, 41],
                          text: "said",
                          bindingKey: "said$3amz4o8kezaww$0",
                        },
                        questionDotToken: false,
                        name: "write",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 212,
                          loc: [19, 48, 19, 73],
                          expression: {
                            kind: 212,
                            loc: [19, 48, 19, 67],
                            expression: {
                              kind: 80,
                              loc: [19, 48, 19, 53],
                              text: "event",
                              bindingKey: "event$3amz4o8kezaww$2",
                            },
                            questionDotToken: false,
                            name: "currentTarget",
                          },
                          questionDotToken: false,
                          name: "value",
                        },
                      ],
                    },
                  },
                },
              ],
              children: [],
            },
            {
              kind: 285,
              loc: [20, 7, 20, 75],
              type: {
                kind: 11,
                loc: [20, 8, 20, 13],
                text: "input",
              },
              attributes: [
                {
                  name: "oninput",
                  initializer: {
                    kind: 220,
                    loc: [20, 23, 20, 71],
                    parameters: [
                      {
                        kind: 170,
                        loc: [20, 24, 20, 29],
                        name: {
                          kind: 80,
                          loc: [20, 24, 20, 29],
                          text: "event",
                          bindingKey: "event$3amz4o8kezaww$3",
                        },
                      },
                    ],
                    body: {
                      kind: 214,
                      loc: [20, 34, 20, 71],
                      expression: {
                        kind: 212,
                        loc: [20, 34, 20, 44],
                        expression: {
                          kind: 80,
                          loc: [20, 34, 20, 38],
                          text: "said",
                          bindingKey: "said$3amz4o8kezaww$0",
                        },
                        questionDotToken: false,
                        name: "write",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 212,
                          loc: [20, 45, 20, 70],
                          expression: {
                            kind: 212,
                            loc: [20, 45, 20, 64],
                            expression: {
                              kind: 80,
                              loc: [20, 45, 20, 50],
                              text: "event",
                              bindingKey: "event$3amz4o8kezaww$3",
                            },
                            questionDotToken: false,
                            name: "currentTarget",
                          },
                          questionDotToken: false,
                          name: "value",
                        },
                      ],
                    },
                  },
                },
              ],
              children: [],
            },
            {
              kind: 285,
              loc: [21, 7, 23, 16],
              type: {
                kind: 11,
                loc: [21, 8, 21, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: 220,
                    loc: [21, 24, 21, 96],
                    parameters: [
                      {
                        kind: 170,
                        loc: [21, 25, 21, 30],
                        name: {
                          kind: 80,
                          loc: [21, 25, 21, 30],
                          text: "event",
                          bindingKey: "event$3amz4o8kezaww$4",
                        },
                      },
                    ],
                    body: {
                      kind: 214,
                      loc: [21, 35, 21, 96],
                      expression: {
                        kind: 212,
                        loc: [21, 35, 21, 45],
                        expression: {
                          kind: 80,
                          loc: [21, 35, 21, 39],
                          text: "said",
                          bindingKey: "said$3amz4o8kezaww$0",
                        },
                        questionDotToken: false,
                        name: "write",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 227,
                          loc: [21, 46, 21, 95],
                          left: {
                            kind: 227,
                            loc: [21, 46, 21, 65],
                            left: {
                              kind: 212,
                              loc: [21, 46, 21, 59],
                              expression: {
                                kind: 80,
                                loc: [21, 46, 21, 51],
                                text: "event",
                                bindingKey: "event$3amz4o8kezaww$4",
                              },
                              questionDotToken: false,
                              name: "clientX",
                            },
                            operatorToken: "+",
                            right: {
                              kind: 11,
                              loc: [21, 62, 21, 65],
                              text: " ",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: 212,
                            loc: [21, 68, 21, 95],
                            expression: {
                              kind: 212,
                              loc: [21, 68, 21, 87],
                              expression: {
                                kind: 80,
                                loc: [21, 68, 21, 73],
                                text: "event",
                                bindingKey: "event$3amz4o8kezaww$4",
                              },
                              questionDotToken: false,
                              name: "currentTarget",
                            },
                            questionDotToken: false,
                            name: "tagName",
                          },
                        },
                      ],
                    },
                  },
                },
              ],
              children: [
                {
                  kind: 214,
                  loc: [22, 10, 22, 21],
                  expression: {
                    kind: 212,
                    loc: [22, 10, 22, 19],
                    expression: {
                      kind: 80,
                      loc: [22, 10, 22, 14],
                      text: "said",
                      bindingKey: "said$3amz4o8kezaww$0",
                    },
                    questionDotToken: false,
                    name: "read",
                  },
                  questionDotToken: false,
                  arguments: [],
                },
              ],
            },
          ],
        },
      },
    ],
  }),
);
