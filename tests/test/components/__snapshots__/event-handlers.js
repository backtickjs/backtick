import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A handler is handed what the DOM hands it, and which event that is comes
// from the DOM: `click` is a `PointerEvent`, `input` an `InputEvent`.
//
// `currentTarget` is the element the handler is on rather than the DOM's
// opaque `EventTarget`, which is what makes reading a field's value sayable —
// the DOM expects a cast there, and this language has none.
it("eventHandlers", async (t) => {
  await snapshotCase(
    t,
    "eventHandlers",
    cs.create(
      [15, 5, 36, 7],
      {
        version: "0.0.0",
        filePath: "components/event-handlers.test.tsx",
        fileHash: "33yj2jmcqxbde",
        splices: { $state: { value: state, params: [] } },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [15, 8, 36, 6],
        statements: [
          {
            kind: "const",
            loc: [16, 7, 16, 31],
            name: {
              kind: "id",
              loc: [16, 13, 16, 17],
              text: "said",
              bindingKey: "said$33yj2jmcqxbde$0",
            },
            initializer: {
              kind: "()",
              loc: [16, 20, 16, 30],
              expression: {
                kind: "splice",
                loc: [16, 20, 16, 26],
                key: "$state",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [16, 27, 16, 29],
                  text: "",
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [18, 7, 35, 9],
            expression: {
              kind: "jsx",
              loc: [19, 9, 34, 16],
              type: {
                kind: "string",
                loc: [19, 10, 19, 14],
                text: "form",
              },
              attributes: [
                {
                  name: "onsubmit",
                  initializer: {
                    kind: "=>",
                    loc: [20, 21, 23, 12],
                    parameters: [
                      {
                        kind: "param",
                        loc: [20, 22, 20, 27],
                        name: {
                          kind: "id",
                          loc: [20, 22, 20, 27],
                          text: "event",
                          bindingKey: "event$33yj2jmcqxbde$1",
                        },
                      },
                    ],
                    body: {
                      kind: "{}",
                      loc: [20, 32, 23, 12],
                      statements: [
                        {
                          kind: "()",
                          loc: [21, 13, 21, 35],
                          expression: {
                            kind: ".",
                            loc: [21, 13, 21, 33],
                            expression: {
                              kind: "id",
                              loc: [21, 13, 21, 18],
                              text: "event",
                              bindingKey: "event$33yj2jmcqxbde$1",
                            },
                            name: "preventDefault",
                          },
                          arguments: [],
                        },
                        {
                          kind: "()",
                          loc: [22, 13, 22, 58],
                          expression: {
                            kind: ".",
                            loc: [22, 13, 22, 21],
                            expression: {
                              kind: "id",
                              loc: [22, 13, 22, 17],
                              text: "said",
                              bindingKey: "said$33yj2jmcqxbde$0",
                            },
                            name: "set",
                          },
                          arguments: [
                            {
                              kind: "binop",
                              loc: [22, 22, 22, 57],
                              left: {
                                kind: "binop",
                                loc: [22, 22, 22, 38],
                                left: {
                                  kind: ".",
                                  loc: [22, 22, 22, 32],
                                  expression: {
                                    kind: "id",
                                    loc: [22, 22, 22, 27],
                                    text: "event",
                                    bindingKey: "event$33yj2jmcqxbde$1",
                                  },
                                  name: "type",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "string",
                                  loc: [22, 35, 22, 38],
                                  text: " ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: ".",
                                loc: [22, 41, 22, 57],
                                expression: {
                                  kind: "id",
                                  loc: [22, 41, 22, 46],
                                  text: "event",
                                  bindingKey: "event$33yj2jmcqxbde$1",
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
                  loc: [25, 11, 25, 80],
                  type: {
                    kind: "string",
                    loc: [25, 12, 25, 20],
                    text: "textarea",
                  },
                  attributes: [
                    {
                      name: "oninput",
                      initializer: {
                        kind: "=>",
                        loc: [25, 30, 25, 76],
                        parameters: [
                          {
                            kind: "param",
                            loc: [25, 31, 25, 36],
                            name: {
                              kind: "id",
                              loc: [25, 31, 25, 36],
                              text: "event",
                              bindingKey: "event$33yj2jmcqxbde$2",
                            },
                          },
                        ],
                        body: {
                          kind: "()",
                          loc: [25, 41, 25, 76],
                          expression: {
                            kind: ".",
                            loc: [25, 41, 25, 49],
                            expression: {
                              kind: "id",
                              loc: [25, 41, 25, 45],
                              text: "said",
                              bindingKey: "said$33yj2jmcqxbde$0",
                            },
                            name: "set",
                          },
                          arguments: [
                            {
                              kind: ".",
                              loc: [25, 50, 25, 75],
                              expression: {
                                kind: ".",
                                loc: [25, 50, 25, 69],
                                expression: {
                                  kind: "id",
                                  loc: [25, 50, 25, 55],
                                  text: "event",
                                  bindingKey: "event$33yj2jmcqxbde$2",
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
                  loc: [26, 11, 26, 77],
                  type: {
                    kind: "string",
                    loc: [26, 12, 26, 17],
                    text: "input",
                  },
                  attributes: [
                    {
                      name: "oninput",
                      initializer: {
                        kind: "=>",
                        loc: [26, 27, 26, 73],
                        parameters: [
                          {
                            kind: "param",
                            loc: [26, 28, 26, 33],
                            name: {
                              kind: "id",
                              loc: [26, 28, 26, 33],
                              text: "event",
                              bindingKey: "event$33yj2jmcqxbde$3",
                            },
                          },
                        ],
                        body: {
                          kind: "()",
                          loc: [26, 38, 26, 73],
                          expression: {
                            kind: ".",
                            loc: [26, 38, 26, 46],
                            expression: {
                              kind: "id",
                              loc: [26, 38, 26, 42],
                              text: "said",
                              bindingKey: "said$33yj2jmcqxbde$0",
                            },
                            name: "set",
                          },
                          arguments: [
                            {
                              kind: ".",
                              loc: [26, 47, 26, 72],
                              expression: {
                                kind: ".",
                                loc: [26, 47, 26, 66],
                                expression: {
                                  kind: "id",
                                  loc: [26, 47, 26, 52],
                                  text: "event",
                                  bindingKey: "event$33yj2jmcqxbde$3",
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
                  loc: [27, 11, 33, 20],
                  type: {
                    kind: "string",
                    loc: [27, 12, 27, 18],
                    text: "button",
                  },
                  attributes: [
                    {
                      name: "onclick",
                      initializer: {
                        kind: "=>",
                        loc: [28, 22, 29, 74],
                        parameters: [
                          {
                            kind: "param",
                            loc: [28, 23, 28, 28],
                            name: {
                              kind: "id",
                              loc: [28, 23, 28, 28],
                              text: "event",
                              bindingKey: "event$33yj2jmcqxbde$4",
                            },
                          },
                        ],
                        body: {
                          kind: "()",
                          loc: [29, 15, 29, 74],
                          expression: {
                            kind: ".",
                            loc: [29, 15, 29, 23],
                            expression: {
                              kind: "id",
                              loc: [29, 15, 29, 19],
                              text: "said",
                              bindingKey: "said$33yj2jmcqxbde$0",
                            },
                            name: "set",
                          },
                          arguments: [
                            {
                              kind: "binop",
                              loc: [29, 24, 29, 73],
                              left: {
                                kind: "binop",
                                loc: [29, 24, 29, 43],
                                left: {
                                  kind: ".",
                                  loc: [29, 24, 29, 37],
                                  expression: {
                                    kind: "id",
                                    loc: [29, 24, 29, 29],
                                    text: "event",
                                    bindingKey: "event$33yj2jmcqxbde$4",
                                  },
                                  name: "clientX",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "string",
                                  loc: [29, 40, 29, 43],
                                  text: " ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: ".",
                                loc: [29, 46, 29, 73],
                                expression: {
                                  kind: ".",
                                  loc: [29, 46, 29, 65],
                                  expression: {
                                    kind: "id",
                                    loc: [29, 46, 29, 51],
                                    text: "event",
                                    bindingKey: "event$33yj2jmcqxbde$4",
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
                      loc: [32, 14, 32, 24],
                      expression: {
                        kind: ".",
                        loc: [32, 14, 32, 22],
                        expression: {
                          kind: "id",
                          loc: [32, 14, 32, 18],
                          text: "said",
                          bindingKey: "said$33yj2jmcqxbde$0",
                        },
                        name: "get",
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
    ),
  );
});
