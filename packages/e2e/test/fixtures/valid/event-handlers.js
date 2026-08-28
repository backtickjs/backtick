import { cs, state } from "@backtickjs/core";
// A handler is handed what the DOM hands it, and which event that is comes from
// the DOM rather than from the sound of the name: `click` is a `PointerEvent`,
// `dblclick` a `MouseEvent`, `input` an `InputEvent`.
//
// The parameters are left to be inferred. Writing the type out reaches the
// browser's own `PointerEvent` instead of this schema's — the DOM's globals are
// in scope here and shadow it — so annotating one is a thing that does not work
// yet, and this fixture is where that will be noticed when it does.
export default cs.create(
  [11, 16, 36, 3],
  {
    version: "0.0.0",
    filePath: "event-handlers.tsx",
    fileHash: "26363es09aqh2",
    kind: "value",
    splices: { $state: state },
    captures: [],
    spliceParams: { $state: [] },
  },
  () => ({
    kind: 242,
    loc: [11, 19, 36, 2],
    statements: [
      {
        kind: 244,
        loc: [12, 3, 12, 27],
        declarationList: {
          kind: 262,
          loc: [12, 3, 12, 26],
          declarations: [
            {
              kind: 261,
              loc: [12, 9, 12, 26],
              name: {
                kind: 80,
                loc: [12, 9, 12, 13],
                text: "said",
                bindingKey: "said$26363es09aqh2$0",
              },
              initializer: {
                kind: 214,
                loc: [12, 16, 12, 26],
                expression: {
                  kind: 1000,
                  loc: [12, 16, 12, 22],
                  key: "$state",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 11,
                    loc: [12, 23, 12, 25],
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
        loc: [14, 3, 35, 5],
        expression: {
          kind: 285,
          loc: [15, 5, 34, 12],
          type: {
            kind: 11,
            loc: [15, 6, 15, 10],
            text: "form",
          },
          attributes: [
            {
              name: "onsubmit",
              initializer: {
                kind: 220,
                loc: [16, 17, 21, 8],
                parameters: [
                  {
                    kind: 170,
                    loc: [16, 18, 16, 23],
                    name: {
                      kind: 80,
                      loc: [16, 18, 16, 23],
                      text: "event",
                      bindingKey: "event$26363es09aqh2$1",
                    },
                  },
                ],
                body: {
                  kind: 242,
                  loc: [16, 28, 21, 8],
                  statements: [
                    {
                      kind: 214,
                      loc: [18, 9, 18, 31],
                      expression: {
                        kind: 212,
                        loc: [18, 9, 18, 29],
                        expression: {
                          kind: 80,
                          loc: [18, 9, 18, 14],
                          text: "event",
                          bindingKey: "event$26363es09aqh2$1",
                        },
                        questionDotToken: false,
                        name: "preventDefault",
                      },
                      questionDotToken: false,
                      arguments: [],
                    },
                    {
                      kind: 214,
                      loc: [19, 9, 19, 32],
                      expression: {
                        kind: 212,
                        loc: [19, 9, 19, 30],
                        expression: {
                          kind: 80,
                          loc: [19, 9, 19, 14],
                          text: "event",
                          bindingKey: "event$26363es09aqh2$1",
                        },
                        questionDotToken: false,
                        name: "stopPropagation",
                      },
                      questionDotToken: false,
                      arguments: [],
                    },
                    {
                      kind: 214,
                      loc: [20, 9, 20, 87],
                      expression: {
                        kind: 212,
                        loc: [20, 9, 20, 19],
                        expression: {
                          kind: 80,
                          loc: [20, 9, 20, 13],
                          text: "said",
                          bindingKey: "said$26363es09aqh2$0",
                        },
                        questionDotToken: false,
                        name: "write",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 227,
                          loc: [20, 20, 20, 86],
                          left: {
                            kind: 227,
                            loc: [20, 20, 20, 61],
                            left: {
                              kind: 227,
                              loc: [20, 20, 20, 55],
                              left: {
                                kind: 227,
                                loc: [20, 20, 20, 36],
                                left: {
                                  kind: 212,
                                  loc: [20, 20, 20, 30],
                                  expression: {
                                    kind: 80,
                                    loc: [20, 20, 20, 25],
                                    text: "event",
                                    bindingKey: "event$26363es09aqh2$1",
                                  },
                                  questionDotToken: false,
                                  name: "type",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: 11,
                                  loc: [20, 33, 20, 36],
                                  text: " ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: 212,
                                loc: [20, 39, 20, 55],
                                expression: {
                                  kind: 80,
                                  loc: [20, 39, 20, 44],
                                  text: "event",
                                  bindingKey: "event$26363es09aqh2$1",
                                },
                                questionDotToken: false,
                                name: "cancelable",
                              },
                            },
                            operatorToken: "+",
                            right: {
                              kind: 11,
                              loc: [20, 58, 20, 61],
                              text: " ",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: 212,
                            loc: [20, 64, 20, 86],
                            expression: {
                              kind: 80,
                              loc: [20, 64, 20, 69],
                              text: "event",
                              bindingKey: "event$26363es09aqh2$1",
                            },
                            questionDotToken: false,
                            name: "defaultPrevented",
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
              loc: [23, 7, 32, 16],
              type: {
                kind: 11,
                loc: [23, 8, 23, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: 220,
                    loc: [24, 18, 26, 10],
                    parameters: [
                      {
                        kind: 170,
                        loc: [24, 19, 24, 24],
                        name: {
                          kind: 80,
                          loc: [24, 19, 24, 24],
                          text: "event",
                          bindingKey: "event$26363es09aqh2$2",
                        },
                      },
                    ],
                    body: {
                      kind: 242,
                      loc: [24, 29, 26, 10],
                      statements: [
                        {
                          kind: 214,
                          loc: [25, 11, 25, 83],
                          expression: {
                            kind: 212,
                            loc: [25, 11, 25, 21],
                            expression: {
                              kind: 80,
                              loc: [25, 11, 25, 15],
                              text: "said",
                              bindingKey: "said$26363es09aqh2$0",
                            },
                            questionDotToken: false,
                            name: "write",
                          },
                          questionDotToken: false,
                          arguments: [
                            {
                              kind: 227,
                              loc: [25, 22, 25, 82],
                              left: {
                                kind: 227,
                                loc: [25, 22, 25, 67],
                                left: {
                                  kind: 227,
                                  loc: [25, 22, 25, 61],
                                  left: {
                                    kind: 227,
                                    loc: [25, 22, 25, 41],
                                    left: {
                                      kind: 212,
                                      loc: [25, 22, 25, 35],
                                      expression: {
                                        kind: 80,
                                        loc: [25, 22, 25, 27],
                                        text: "event",
                                        bindingKey: "event$26363es09aqh2$2",
                                      },
                                      questionDotToken: false,
                                      name: "clientX",
                                    },
                                    operatorToken: "+",
                                    right: {
                                      kind: 11,
                                      loc: [25, 38, 25, 41],
                                      text: " ",
                                    },
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: 212,
                                    loc: [25, 44, 25, 61],
                                    expression: {
                                      kind: 80,
                                      loc: [25, 44, 25, 49],
                                      text: "event",
                                      bindingKey: "event$26363es09aqh2$2",
                                    },
                                    questionDotToken: false,
                                    name: "pointerType",
                                  },
                                },
                                operatorToken: "+",
                                right: {
                                  kind: 11,
                                  loc: [25, 64, 25, 67],
                                  text: " ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: 212,
                                loc: [25, 70, 25, 82],
                                expression: {
                                  kind: 80,
                                  loc: [25, 70, 25, 75],
                                  text: "event",
                                  bindingKey: "event$26363es09aqh2$2",
                                },
                                questionDotToken: false,
                                name: "altKey",
                              },
                            },
                          ],
                        },
                      ],
                    },
                  },
                },
                {
                  name: "onkeydown",
                  initializer: {
                    kind: 220,
                    loc: [27, 20, 29, 10],
                    parameters: [
                      {
                        kind: 170,
                        loc: [27, 21, 27, 26],
                        name: {
                          kind: 80,
                          loc: [27, 21, 27, 26],
                          text: "event",
                          bindingKey: "event$26363es09aqh2$3",
                        },
                      },
                    ],
                    body: {
                      kind: 242,
                      loc: [27, 31, 29, 10],
                      statements: [
                        {
                          kind: 214,
                          loc: [28, 11, 28, 75],
                          expression: {
                            kind: 212,
                            loc: [28, 11, 28, 21],
                            expression: {
                              kind: 80,
                              loc: [28, 11, 28, 15],
                              text: "said",
                              bindingKey: "said$26363es09aqh2$0",
                            },
                            questionDotToken: false,
                            name: "write",
                          },
                          questionDotToken: false,
                          arguments: [
                            {
                              kind: 227,
                              loc: [28, 22, 28, 74],
                              left: {
                                kind: 227,
                                loc: [28, 22, 28, 58],
                                left: {
                                  kind: 227,
                                  loc: [28, 22, 28, 52],
                                  left: {
                                    kind: 227,
                                    loc: [28, 22, 28, 37],
                                    left: {
                                      kind: 212,
                                      loc: [28, 22, 28, 31],
                                      expression: {
                                        kind: 80,
                                        loc: [28, 22, 28, 27],
                                        text: "event",
                                        bindingKey: "event$26363es09aqh2$3",
                                      },
                                      questionDotToken: false,
                                      name: "key",
                                    },
                                    operatorToken: "+",
                                    right: {
                                      kind: 11,
                                      loc: [28, 34, 28, 37],
                                      text: " ",
                                    },
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: 212,
                                    loc: [28, 40, 28, 52],
                                    expression: {
                                      kind: 80,
                                      loc: [28, 40, 28, 45],
                                      text: "event",
                                      bindingKey: "event$26363es09aqh2$3",
                                    },
                                    questionDotToken: false,
                                    name: "repeat",
                                  },
                                },
                                operatorToken: "+",
                                right: {
                                  kind: 11,
                                  loc: [28, 55, 28, 58],
                                  text: " ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: 212,
                                loc: [28, 61, 28, 74],
                                expression: {
                                  kind: 80,
                                  loc: [28, 61, 28, 66],
                                  text: "event",
                                  bindingKey: "event$26363es09aqh2$3",
                                },
                                questionDotToken: false,
                                name: "ctrlKey",
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
                  kind: 214,
                  loc: [31, 10, 31, 21],
                  expression: {
                    kind: 212,
                    loc: [31, 10, 31, 19],
                    expression: {
                      kind: 80,
                      loc: [31, 10, 31, 14],
                      text: "said",
                      bindingKey: "said$26363es09aqh2$0",
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
              loc: [33, 7, 33, 65],
              type: {
                kind: 11,
                loc: [33, 8, 33, 13],
                text: "input",
              },
              attributes: [
                {
                  name: "oninput",
                  initializer: {
                    kind: 220,
                    loc: [33, 23, 33, 61],
                    parameters: [
                      {
                        kind: 170,
                        loc: [33, 24, 33, 29],
                        name: {
                          kind: 80,
                          loc: [33, 24, 33, 29],
                          text: "event",
                          bindingKey: "event$26363es09aqh2$4",
                        },
                      },
                    ],
                    body: {
                      kind: 214,
                      loc: [33, 34, 33, 61],
                      expression: {
                        kind: 212,
                        loc: [33, 34, 33, 44],
                        expression: {
                          kind: 80,
                          loc: [33, 34, 33, 38],
                          text: "said",
                          bindingKey: "said$26363es09aqh2$0",
                        },
                        questionDotToken: false,
                        name: "write",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 212,
                          loc: [33, 45, 33, 60],
                          expression: {
                            kind: 80,
                            loc: [33, 45, 33, 50],
                            text: "event",
                            bindingKey: "event$26363es09aqh2$4",
                          },
                          questionDotToken: false,
                          name: "inputType",
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
