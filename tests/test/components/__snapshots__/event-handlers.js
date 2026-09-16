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
      [15, 5, 38, 7],
      {
        version: "0.0.0",
        filePath: "components/event-handlers.test.tsx",
        fileHash: "15h39nxs8s3ee",
        splices: { $state: { value: state, params: [] } },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [15, 8, 38, 6],
        statements: [
          {
            kind: "const",
            loc: [16, 7, 16, 31],
            name: {
              kind: "id",
              loc: [16, 13, 16, 17],
              text: "said",
              bindingKey: "said$15h39nxs8s3ee$0",
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
            loc: [18, 7, 37, 9],
            expression: {
              kind: "jsx",
              loc: [19, 9, 36, 16],
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
                          bindingKey: "event$15h39nxs8s3ee$1",
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
                              bindingKey: "event$15h39nxs8s3ee$1",
                            },
                            name: "preventDefault",
                          },
                          arguments: [],
                        },
                        {
                          kind: "()",
                          loc: [22, 13, 22, 60],
                          expression: {
                            kind: ".",
                            loc: [22, 13, 22, 23],
                            expression: {
                              kind: "id",
                              loc: [22, 13, 22, 17],
                              text: "said",
                              bindingKey: "said$15h39nxs8s3ee$0",
                            },
                            name: "write",
                          },
                          arguments: [
                            {
                              kind: "binop",
                              loc: [22, 24, 22, 59],
                              left: {
                                kind: "binop",
                                loc: [22, 24, 22, 40],
                                left: {
                                  kind: ".",
                                  loc: [22, 24, 22, 34],
                                  expression: {
                                    kind: "id",
                                    loc: [22, 24, 22, 29],
                                    text: "event",
                                    bindingKey: "event$15h39nxs8s3ee$1",
                                  },
                                  name: "type",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "string",
                                  loc: [22, 37, 22, 40],
                                  text: " ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: ".",
                                loc: [22, 43, 22, 59],
                                expression: {
                                  kind: "id",
                                  loc: [22, 43, 22, 48],
                                  text: "event",
                                  bindingKey: "event$15h39nxs8s3ee$1",
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
                  loc: [25, 11, 27, 13],
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
                        loc: [26, 22, 26, 70],
                        parameters: [
                          {
                            kind: "param",
                            loc: [26, 23, 26, 28],
                            name: {
                              kind: "id",
                              loc: [26, 23, 26, 28],
                              text: "event",
                              bindingKey: "event$15h39nxs8s3ee$2",
                            },
                          },
                        ],
                        body: {
                          kind: "()",
                          loc: [26, 33, 26, 70],
                          expression: {
                            kind: ".",
                            loc: [26, 33, 26, 43],
                            expression: {
                              kind: "id",
                              loc: [26, 33, 26, 37],
                              text: "said",
                              bindingKey: "said$15h39nxs8s3ee$0",
                            },
                            name: "write",
                          },
                          arguments: [
                            {
                              kind: ".",
                              loc: [26, 44, 26, 69],
                              expression: {
                                kind: ".",
                                loc: [26, 44, 26, 63],
                                expression: {
                                  kind: "id",
                                  loc: [26, 44, 26, 49],
                                  text: "event",
                                  bindingKey: "event$15h39nxs8s3ee$2",
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
                  loc: [28, 11, 28, 79],
                  type: {
                    kind: "string",
                    loc: [28, 12, 28, 17],
                    text: "input",
                  },
                  attributes: [
                    {
                      name: "oninput",
                      initializer: {
                        kind: "=>",
                        loc: [28, 27, 28, 75],
                        parameters: [
                          {
                            kind: "param",
                            loc: [28, 28, 28, 33],
                            name: {
                              kind: "id",
                              loc: [28, 28, 28, 33],
                              text: "event",
                              bindingKey: "event$15h39nxs8s3ee$3",
                            },
                          },
                        ],
                        body: {
                          kind: "()",
                          loc: [28, 38, 28, 75],
                          expression: {
                            kind: ".",
                            loc: [28, 38, 28, 48],
                            expression: {
                              kind: "id",
                              loc: [28, 38, 28, 42],
                              text: "said",
                              bindingKey: "said$15h39nxs8s3ee$0",
                            },
                            name: "write",
                          },
                          arguments: [
                            {
                              kind: ".",
                              loc: [28, 49, 28, 74],
                              expression: {
                                kind: ".",
                                loc: [28, 49, 28, 68],
                                expression: {
                                  kind: "id",
                                  loc: [28, 49, 28, 54],
                                  text: "event",
                                  bindingKey: "event$15h39nxs8s3ee$3",
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
                  loc: [29, 11, 35, 20],
                  type: {
                    kind: "string",
                    loc: [29, 12, 29, 18],
                    text: "button",
                  },
                  attributes: [
                    {
                      name: "onclick",
                      initializer: {
                        kind: "=>",
                        loc: [30, 22, 31, 76],
                        parameters: [
                          {
                            kind: "param",
                            loc: [30, 23, 30, 28],
                            name: {
                              kind: "id",
                              loc: [30, 23, 30, 28],
                              text: "event",
                              bindingKey: "event$15h39nxs8s3ee$4",
                            },
                          },
                        ],
                        body: {
                          kind: "()",
                          loc: [31, 15, 31, 76],
                          expression: {
                            kind: ".",
                            loc: [31, 15, 31, 25],
                            expression: {
                              kind: "id",
                              loc: [31, 15, 31, 19],
                              text: "said",
                              bindingKey: "said$15h39nxs8s3ee$0",
                            },
                            name: "write",
                          },
                          arguments: [
                            {
                              kind: "binop",
                              loc: [31, 26, 31, 75],
                              left: {
                                kind: "binop",
                                loc: [31, 26, 31, 45],
                                left: {
                                  kind: ".",
                                  loc: [31, 26, 31, 39],
                                  expression: {
                                    kind: "id",
                                    loc: [31, 26, 31, 31],
                                    text: "event",
                                    bindingKey: "event$15h39nxs8s3ee$4",
                                  },
                                  name: "clientX",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "string",
                                  loc: [31, 42, 31, 45],
                                  text: " ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: ".",
                                loc: [31, 48, 31, 75],
                                expression: {
                                  kind: ".",
                                  loc: [31, 48, 31, 67],
                                  expression: {
                                    kind: "id",
                                    loc: [31, 48, 31, 53],
                                    text: "event",
                                    bindingKey: "event$15h39nxs8s3ee$4",
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
                      loc: [34, 14, 34, 25],
                      expression: {
                        kind: ".",
                        loc: [34, 14, 34, 23],
                        expression: {
                          kind: "id",
                          loc: [34, 14, 34, 18],
                          text: "said",
                          bindingKey: "said$15h39nxs8s3ee$0",
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
    ),
  );
});
