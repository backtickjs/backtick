import { cs, state } from "@backtickjs/core";
// A handler is handed what the DOM hands it, and which event that is comes from
// the DOM rather than from the sound of the name: `click` is a `PointerEvent`,
// `dblclick` a `MouseEvent`, `input` an `InputEvent`.
//
// The types are imported rather than named bare. The names are the DOM's on
// purpose, so a bare one reaches the browser's global instead — an import is
// what shadows it, and without one the two read as unrelated types with the
// same name.
export default cs.create(
  [17, 16, 42, 3],
  {
    version: "0.0.0",
    filePath: "event-handlers.tsx",
    fileHash: "qgp928dy3drl",
    kind: "value",
    splices: { $state: state },
    captures: [],
    spliceParams: { $state: [] },
  },
  () => ({
    kind: 242,
    loc: [17, 19, 42, 2],
    statements: [
      {
        kind: 244,
        loc: [18, 3, 18, 27],
        declarationList: {
          kind: 262,
          loc: [18, 3, 18, 26],
          declarations: [
            {
              kind: 261,
              loc: [18, 9, 18, 26],
              name: {
                kind: 80,
                loc: [18, 9, 18, 13],
                text: "said",
                bindingKey: "said$qgp928dy3drl$0",
              },
              initializer: {
                kind: 214,
                loc: [18, 16, 18, 26],
                expression: {
                  kind: 1000,
                  loc: [18, 16, 18, 22],
                  key: "$state",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 11,
                    loc: [18, 23, 18, 25],
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
        loc: [20, 3, 41, 5],
        expression: {
          kind: 285,
          loc: [21, 5, 40, 12],
          type: {
            kind: 11,
            loc: [21, 6, 21, 10],
            text: "form",
          },
          attributes: [
            {
              name: "onsubmit",
              initializer: {
                kind: 220,
                loc: [22, 17, 27, 8],
                parameters: [
                  {
                    kind: 170,
                    loc: [22, 18, 22, 36],
                    name: {
                      kind: 80,
                      loc: [22, 18, 22, 23],
                      text: "event",
                      bindingKey: "event$qgp928dy3drl$1",
                    },
                  },
                ],
                body: {
                  kind: 242,
                  loc: [22, 41, 27, 8],
                  statements: [
                    {
                      kind: 214,
                      loc: [24, 9, 24, 31],
                      expression: {
                        kind: 212,
                        loc: [24, 9, 24, 29],
                        expression: {
                          kind: 80,
                          loc: [24, 9, 24, 14],
                          text: "event",
                          bindingKey: "event$qgp928dy3drl$1",
                        },
                        questionDotToken: false,
                        name: "preventDefault",
                      },
                      questionDotToken: false,
                      arguments: [],
                    },
                    {
                      kind: 214,
                      loc: [25, 9, 25, 32],
                      expression: {
                        kind: 212,
                        loc: [25, 9, 25, 30],
                        expression: {
                          kind: 80,
                          loc: [25, 9, 25, 14],
                          text: "event",
                          bindingKey: "event$qgp928dy3drl$1",
                        },
                        questionDotToken: false,
                        name: "stopPropagation",
                      },
                      questionDotToken: false,
                      arguments: [],
                    },
                    {
                      kind: 214,
                      loc: [26, 9, 26, 87],
                      expression: {
                        kind: 212,
                        loc: [26, 9, 26, 19],
                        expression: {
                          kind: 80,
                          loc: [26, 9, 26, 13],
                          text: "said",
                          bindingKey: "said$qgp928dy3drl$0",
                        },
                        questionDotToken: false,
                        name: "write",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 227,
                          loc: [26, 20, 26, 86],
                          left: {
                            kind: 227,
                            loc: [26, 20, 26, 61],
                            left: {
                              kind: 227,
                              loc: [26, 20, 26, 55],
                              left: {
                                kind: 227,
                                loc: [26, 20, 26, 36],
                                left: {
                                  kind: 212,
                                  loc: [26, 20, 26, 30],
                                  expression: {
                                    kind: 80,
                                    loc: [26, 20, 26, 25],
                                    text: "event",
                                    bindingKey: "event$qgp928dy3drl$1",
                                  },
                                  questionDotToken: false,
                                  name: "type",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: 11,
                                  loc: [26, 33, 26, 36],
                                  text: " ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: 212,
                                loc: [26, 39, 26, 55],
                                expression: {
                                  kind: 80,
                                  loc: [26, 39, 26, 44],
                                  text: "event",
                                  bindingKey: "event$qgp928dy3drl$1",
                                },
                                questionDotToken: false,
                                name: "cancelable",
                              },
                            },
                            operatorToken: "+",
                            right: {
                              kind: 11,
                              loc: [26, 58, 26, 61],
                              text: " ",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: 212,
                            loc: [26, 64, 26, 86],
                            expression: {
                              kind: 80,
                              loc: [26, 64, 26, 69],
                              text: "event",
                              bindingKey: "event$qgp928dy3drl$1",
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
              loc: [29, 7, 38, 16],
              type: {
                kind: 11,
                loc: [29, 8, 29, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: 220,
                    loc: [30, 18, 32, 10],
                    parameters: [
                      {
                        kind: 170,
                        loc: [30, 19, 30, 38],
                        name: {
                          kind: 80,
                          loc: [30, 19, 30, 24],
                          text: "event",
                          bindingKey: "event$qgp928dy3drl$2",
                        },
                      },
                    ],
                    body: {
                      kind: 242,
                      loc: [30, 43, 32, 10],
                      statements: [
                        {
                          kind: 214,
                          loc: [31, 11, 31, 83],
                          expression: {
                            kind: 212,
                            loc: [31, 11, 31, 21],
                            expression: {
                              kind: 80,
                              loc: [31, 11, 31, 15],
                              text: "said",
                              bindingKey: "said$qgp928dy3drl$0",
                            },
                            questionDotToken: false,
                            name: "write",
                          },
                          questionDotToken: false,
                          arguments: [
                            {
                              kind: 227,
                              loc: [31, 22, 31, 82],
                              left: {
                                kind: 227,
                                loc: [31, 22, 31, 67],
                                left: {
                                  kind: 227,
                                  loc: [31, 22, 31, 61],
                                  left: {
                                    kind: 227,
                                    loc: [31, 22, 31, 41],
                                    left: {
                                      kind: 212,
                                      loc: [31, 22, 31, 35],
                                      expression: {
                                        kind: 80,
                                        loc: [31, 22, 31, 27],
                                        text: "event",
                                        bindingKey: "event$qgp928dy3drl$2",
                                      },
                                      questionDotToken: false,
                                      name: "clientX",
                                    },
                                    operatorToken: "+",
                                    right: {
                                      kind: 11,
                                      loc: [31, 38, 31, 41],
                                      text: " ",
                                    },
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: 212,
                                    loc: [31, 44, 31, 61],
                                    expression: {
                                      kind: 80,
                                      loc: [31, 44, 31, 49],
                                      text: "event",
                                      bindingKey: "event$qgp928dy3drl$2",
                                    },
                                    questionDotToken: false,
                                    name: "pointerType",
                                  },
                                },
                                operatorToken: "+",
                                right: {
                                  kind: 11,
                                  loc: [31, 64, 31, 67],
                                  text: " ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: 212,
                                loc: [31, 70, 31, 82],
                                expression: {
                                  kind: 80,
                                  loc: [31, 70, 31, 75],
                                  text: "event",
                                  bindingKey: "event$qgp928dy3drl$2",
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
                    loc: [33, 20, 35, 10],
                    parameters: [
                      {
                        kind: 170,
                        loc: [33, 21, 33, 41],
                        name: {
                          kind: 80,
                          loc: [33, 21, 33, 26],
                          text: "event",
                          bindingKey: "event$qgp928dy3drl$3",
                        },
                      },
                    ],
                    body: {
                      kind: 242,
                      loc: [33, 46, 35, 10],
                      statements: [
                        {
                          kind: 214,
                          loc: [34, 11, 34, 75],
                          expression: {
                            kind: 212,
                            loc: [34, 11, 34, 21],
                            expression: {
                              kind: 80,
                              loc: [34, 11, 34, 15],
                              text: "said",
                              bindingKey: "said$qgp928dy3drl$0",
                            },
                            questionDotToken: false,
                            name: "write",
                          },
                          questionDotToken: false,
                          arguments: [
                            {
                              kind: 227,
                              loc: [34, 22, 34, 74],
                              left: {
                                kind: 227,
                                loc: [34, 22, 34, 58],
                                left: {
                                  kind: 227,
                                  loc: [34, 22, 34, 52],
                                  left: {
                                    kind: 227,
                                    loc: [34, 22, 34, 37],
                                    left: {
                                      kind: 212,
                                      loc: [34, 22, 34, 31],
                                      expression: {
                                        kind: 80,
                                        loc: [34, 22, 34, 27],
                                        text: "event",
                                        bindingKey: "event$qgp928dy3drl$3",
                                      },
                                      questionDotToken: false,
                                      name: "key",
                                    },
                                    operatorToken: "+",
                                    right: {
                                      kind: 11,
                                      loc: [34, 34, 34, 37],
                                      text: " ",
                                    },
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: 212,
                                    loc: [34, 40, 34, 52],
                                    expression: {
                                      kind: 80,
                                      loc: [34, 40, 34, 45],
                                      text: "event",
                                      bindingKey: "event$qgp928dy3drl$3",
                                    },
                                    questionDotToken: false,
                                    name: "repeat",
                                  },
                                },
                                operatorToken: "+",
                                right: {
                                  kind: 11,
                                  loc: [34, 55, 34, 58],
                                  text: " ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: 212,
                                loc: [34, 61, 34, 74],
                                expression: {
                                  kind: 80,
                                  loc: [34, 61, 34, 66],
                                  text: "event",
                                  bindingKey: "event$qgp928dy3drl$3",
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
                  loc: [37, 10, 37, 21],
                  expression: {
                    kind: 212,
                    loc: [37, 10, 37, 19],
                    expression: {
                      kind: 80,
                      loc: [37, 10, 37, 14],
                      text: "said",
                      bindingKey: "said$qgp928dy3drl$0",
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
              loc: [39, 7, 39, 77],
              type: {
                kind: 11,
                loc: [39, 8, 39, 13],
                text: "input",
              },
              attributes: [
                {
                  name: "oninput",
                  initializer: {
                    kind: 220,
                    loc: [39, 23, 39, 73],
                    parameters: [
                      {
                        kind: 170,
                        loc: [39, 24, 39, 41],
                        name: {
                          kind: 80,
                          loc: [39, 24, 39, 29],
                          text: "event",
                          bindingKey: "event$qgp928dy3drl$4",
                        },
                      },
                    ],
                    body: {
                      kind: 214,
                      loc: [39, 46, 39, 73],
                      expression: {
                        kind: 212,
                        loc: [39, 46, 39, 56],
                        expression: {
                          kind: 80,
                          loc: [39, 46, 39, 50],
                          text: "said",
                          bindingKey: "said$qgp928dy3drl$0",
                        },
                        questionDotToken: false,
                        name: "write",
                      },
                      questionDotToken: false,
                      arguments: [
                        {
                          kind: 212,
                          loc: [39, 57, 39, 72],
                          expression: {
                            kind: 80,
                            loc: [39, 57, 39, 62],
                            text: "event",
                            bindingKey: "event$qgp928dy3drl$4",
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
