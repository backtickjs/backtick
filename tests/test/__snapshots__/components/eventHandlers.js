import { cs, state } from "@backtickjs/core";
// A handler is handed what the DOM hands it, and which event that is comes from
// the DOM: `click` is a `PointerEvent`, `input` an `InputEvent`.
//
// `currentTarget` is the element the handler is on rather than the DOM's opaque
// `EventTarget`, which is what makes reading a field's value sayable — the DOM
// expects a cast there, and this language has none.
const eventHandlers = cs.create(
  [9, 23, 30, 3],
  {
    version: "0.0.0",
    filePath: "eventHandlers.tsx",
    fileHash: "23hlnsr6bi0o4",
    splices: { $state: { value: state, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [9, 26, 30, 2],
    statements: [
      {
        kind: "const",
        loc: [10, 3, 10, 27],
        name: {
          kind: "id",
          loc: [10, 9, 10, 13],
          text: "said",
          bindingKey: "said$23hlnsr6bi0o4$0",
        },
        initializer: {
          kind: "()",
          loc: [10, 16, 10, 26],
          expression: {
            kind: "splice",
            loc: [10, 16, 10, 22],
            key: "$state",
          },
          arguments: [
            {
              kind: "string",
              loc: [10, 23, 10, 25],
              text: "",
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [12, 3, 29, 5],
        expression: {
          kind: "jsx",
          loc: [13, 5, 28, 12],
          type: {
            kind: "string",
            loc: [13, 6, 13, 10],
            text: "form",
          },
          attributes: [
            {
              name: "onsubmit",
              initializer: {
                kind: "=>",
                loc: [14, 17, 17, 8],
                parameters: [
                  {
                    kind: "param",
                    loc: [14, 18, 14, 23],
                    name: {
                      kind: "id",
                      loc: [14, 18, 14, 23],
                      text: "event",
                      bindingKey: "event$23hlnsr6bi0o4$1",
                    },
                  },
                ],
                body: {
                  kind: "{}",
                  loc: [14, 28, 17, 8],
                  statements: [
                    {
                      kind: "()",
                      loc: [15, 9, 15, 31],
                      expression: {
                        kind: ".",
                        loc: [15, 9, 15, 29],
                        expression: {
                          kind: "id",
                          loc: [15, 9, 15, 14],
                          text: "event",
                          bindingKey: "event$23hlnsr6bi0o4$1",
                        },
                        name: "preventDefault",
                      },
                      arguments: [],
                    },
                    {
                      kind: "()",
                      loc: [16, 9, 16, 56],
                      expression: {
                        kind: ".",
                        loc: [16, 9, 16, 19],
                        expression: {
                          kind: "id",
                          loc: [16, 9, 16, 13],
                          text: "said",
                          bindingKey: "said$23hlnsr6bi0o4$0",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [16, 20, 16, 55],
                          left: {
                            kind: "binop",
                            loc: [16, 20, 16, 36],
                            left: {
                              kind: ".",
                              loc: [16, 20, 16, 30],
                              expression: {
                                kind: "id",
                                loc: [16, 20, 16, 25],
                                text: "event",
                                bindingKey: "event$23hlnsr6bi0o4$1",
                              },
                              name: "type",
                            },
                            operatorToken: "+",
                            right: {
                              kind: "string",
                              loc: [16, 33, 16, 36],
                              text: " ",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: ".",
                            loc: [16, 39, 16, 55],
                            expression: {
                              kind: "id",
                              loc: [16, 39, 16, 44],
                              text: "event",
                              bindingKey: "event$23hlnsr6bi0o4$1",
                            },
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
              kind: "jsx",
              loc: [19, 7, 19, 78],
              type: {
                kind: "string",
                loc: [19, 8, 19, 16],
                text: "textarea",
              },
              attributes: [
                {
                  name: "oninput",
                  initializer: {
                    kind: "=>",
                    loc: [19, 26, 19, 74],
                    parameters: [
                      {
                        kind: "param",
                        loc: [19, 27, 19, 32],
                        name: {
                          kind: "id",
                          loc: [19, 27, 19, 32],
                          text: "event",
                          bindingKey: "event$23hlnsr6bi0o4$2",
                        },
                      },
                    ],
                    body: {
                      kind: "()",
                      loc: [19, 37, 19, 74],
                      expression: {
                        kind: ".",
                        loc: [19, 37, 19, 47],
                        expression: {
                          kind: "id",
                          loc: [19, 37, 19, 41],
                          text: "said",
                          bindingKey: "said$23hlnsr6bi0o4$0",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: ".",
                          loc: [19, 48, 19, 73],
                          expression: {
                            kind: ".",
                            loc: [19, 48, 19, 67],
                            expression: {
                              kind: "id",
                              loc: [19, 48, 19, 53],
                              text: "event",
                              bindingKey: "event$23hlnsr6bi0o4$2",
                            },
                            name: "currentTarget",
                          },
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
              kind: "jsx",
              loc: [20, 7, 20, 75],
              type: {
                kind: "string",
                loc: [20, 8, 20, 13],
                text: "input",
              },
              attributes: [
                {
                  name: "oninput",
                  initializer: {
                    kind: "=>",
                    loc: [20, 23, 20, 71],
                    parameters: [
                      {
                        kind: "param",
                        loc: [20, 24, 20, 29],
                        name: {
                          kind: "id",
                          loc: [20, 24, 20, 29],
                          text: "event",
                          bindingKey: "event$23hlnsr6bi0o4$3",
                        },
                      },
                    ],
                    body: {
                      kind: "()",
                      loc: [20, 34, 20, 71],
                      expression: {
                        kind: ".",
                        loc: [20, 34, 20, 44],
                        expression: {
                          kind: "id",
                          loc: [20, 34, 20, 38],
                          text: "said",
                          bindingKey: "said$23hlnsr6bi0o4$0",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: ".",
                          loc: [20, 45, 20, 70],
                          expression: {
                            kind: ".",
                            loc: [20, 45, 20, 64],
                            expression: {
                              kind: "id",
                              loc: [20, 45, 20, 50],
                              text: "event",
                              bindingKey: "event$23hlnsr6bi0o4$3",
                            },
                            name: "currentTarget",
                          },
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
              kind: "jsx",
              loc: [21, 7, 27, 16],
              type: {
                kind: "string",
                loc: [21, 8, 21, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [22, 18, 23, 72],
                    parameters: [
                      {
                        kind: "param",
                        loc: [22, 19, 22, 24],
                        name: {
                          kind: "id",
                          loc: [22, 19, 22, 24],
                          text: "event",
                          bindingKey: "event$23hlnsr6bi0o4$4",
                        },
                      },
                    ],
                    body: {
                      kind: "()",
                      loc: [23, 11, 23, 72],
                      expression: {
                        kind: ".",
                        loc: [23, 11, 23, 21],
                        expression: {
                          kind: "id",
                          loc: [23, 11, 23, 15],
                          text: "said",
                          bindingKey: "said$23hlnsr6bi0o4$0",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [23, 22, 23, 71],
                          left: {
                            kind: "binop",
                            loc: [23, 22, 23, 41],
                            left: {
                              kind: ".",
                              loc: [23, 22, 23, 35],
                              expression: {
                                kind: "id",
                                loc: [23, 22, 23, 27],
                                text: "event",
                                bindingKey: "event$23hlnsr6bi0o4$4",
                              },
                              name: "clientX",
                            },
                            operatorToken: "+",
                            right: {
                              kind: "string",
                              loc: [23, 38, 23, 41],
                              text: " ",
                            },
                          },
                          operatorToken: "+",
                          right: {
                            kind: ".",
                            loc: [23, 44, 23, 71],
                            expression: {
                              kind: ".",
                              loc: [23, 44, 23, 63],
                              expression: {
                                kind: "id",
                                loc: [23, 44, 23, 49],
                                text: "event",
                                bindingKey: "event$23hlnsr6bi0o4$4",
                              },
                              name: "currentTarget",
                            },
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
                  kind: "()",
                  loc: [26, 10, 26, 21],
                  expression: {
                    kind: ".",
                    loc: [26, 10, 26, 19],
                    expression: {
                      kind: "id",
                      loc: [26, 10, 26, 14],
                      text: "said",
                      bindingKey: "said$23hlnsr6bi0o4$0",
                    },
                    name: "read",
                  },
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
