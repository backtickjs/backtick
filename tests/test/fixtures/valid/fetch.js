import { cs, fetch, state } from "@backtickjs/core";
// Reading the body is a second turn, the way it is on the web: `fetch` answers
// with a response, and the response is asked for its body.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
export default cs.create(
  [8, 16, 34, 3],
  {
    version: "0.0.0",
    filePath: "fetch.ts",
    fileHash: "z0x1leig0sdk",
    splices: {
      $state: { value: state, params: [] },
      $fetch: { value: fetch, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [8, 19, 34, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [8, 25, 34, 2],
      statements: [
        {
          kind: "const",
          loc: [9, 3, 9, 34],
          name: {
            kind: "id",
            loc: [9, 9, 9, 13],
            text: "held",
            bindingKey: "held$z0x1leig0sdk$0",
          },
          initializer: {
            kind: "()",
            loc: [9, 16, 9, 33],
            expression: {
              kind: "splice",
              loc: [9, 16, 9, 22],
              key: "$state",
            },
            arguments: [
              {
                kind: "string",
                loc: [9, 23, 9, 32],
                text: "waiting",
              },
            ],
          },
        },
        {
          kind: "()",
          loc: [11, 3, 31, 4],
          expression: {
            kind: "splice",
            loc: [11, 3, 11, 9],
            key: "$fetch",
          },
          arguments: [
            {
              kind: "string",
              loc: [12, 5, 12, 53],
              text: "/cases/built-ins/Math/trunc/Math.trunc_Success",
            },
            {
              kind: "=>",
              loc: [13, 5, 26, 6],
              parameters: [
                {
                  kind: "param",
                  loc: [13, 6, 13, 24],
                  name: {
                    kind: "id",
                    loc: [13, 6, 13, 14],
                    text: "response",
                    bindingKey: "response$z0x1leig0sdk$1",
                  },
                },
              ],
              body: {
                kind: "{}",
                loc: [13, 29, 26, 6],
                statements: [
                  {
                    kind: "if",
                    loc: [14, 7, 25, 8],
                    expression: {
                      kind: "unop",
                      loc: [14, 11, 14, 23],
                      operator: "!",
                      operand: {
                        kind: ".",
                        loc: [14, 12, 14, 23],
                        expression: {
                          kind: "id",
                          loc: [14, 12, 14, 20],
                          text: "response",
                          bindingKey: "response$z0x1leig0sdk$1",
                        },
                        name: "ok",
                      },
                    },
                    thenStatement: {
                      kind: "{}",
                      loc: [14, 25, 16, 8],
                      statements: [
                        {
                          kind: "()",
                          loc: [15, 9, 15, 50],
                          expression: {
                            kind: ".",
                            loc: [15, 9, 15, 19],
                            expression: {
                              kind: "id",
                              loc: [15, 9, 15, 13],
                              text: "held",
                              bindingKey: "held$z0x1leig0sdk$0",
                            },
                            name: "write",
                          },
                          arguments: [
                            {
                              kind: "binop",
                              loc: [15, 20, 15, 49],
                              left: {
                                kind: "string",
                                loc: [15, 20, 15, 31],
                                text: "answered ",
                              },
                              operatorToken: "+",
                              right: {
                                kind: ".",
                                loc: [15, 34, 15, 49],
                                expression: {
                                  kind: "id",
                                  loc: [15, 34, 15, 42],
                                  text: "response",
                                  bindingKey: "response$z0x1leig0sdk$1",
                                },
                                name: "status",
                              },
                            },
                          ],
                        },
                      ],
                    },
                    elseStatement: {
                      kind: "{}",
                      loc: [16, 14, 25, 8],
                      statements: [
                        {
                          kind: "()",
                          loc: [17, 9, 24, 10],
                          expression: {
                            kind: ".",
                            loc: [17, 9, 17, 22],
                            expression: {
                              kind: "id",
                              loc: [17, 9, 17, 17],
                              text: "response",
                              bindingKey: "response$z0x1leig0sdk$1",
                            },
                            name: "text",
                          },
                          arguments: [
                            {
                              kind: "=>",
                              loc: [18, 11, 20, 12],
                              parameters: [
                                {
                                  kind: "param",
                                  loc: [18, 12, 18, 24],
                                  name: {
                                    kind: "id",
                                    loc: [18, 12, 18, 16],
                                    text: "text",
                                    bindingKey: "text$z0x1leig0sdk$2",
                                  },
                                },
                              ],
                              body: {
                                kind: "{}",
                                loc: [18, 29, 20, 12],
                                statements: [
                                  {
                                    kind: "()",
                                    loc: [19, 13, 19, 29],
                                    expression: {
                                      kind: ".",
                                      loc: [19, 13, 19, 23],
                                      expression: {
                                        kind: "id",
                                        loc: [19, 13, 19, 17],
                                        text: "held",
                                        bindingKey: "held$z0x1leig0sdk$0",
                                      },
                                      name: "write",
                                    },
                                    arguments: [
                                      {
                                        kind: "id",
                                        loc: [19, 24, 19, 28],
                                        text: "text",
                                        bindingKey: "text$z0x1leig0sdk$2",
                                      },
                                    ],
                                  },
                                ],
                              },
                            },
                            {
                              kind: "=>",
                              loc: [21, 11, 23, 12],
                              parameters: [
                                {
                                  kind: "param",
                                  loc: [21, 12, 21, 26],
                                  name: {
                                    kind: "id",
                                    loc: [21, 12, 21, 18],
                                    text: "reason",
                                    bindingKey: "reason$z0x1leig0sdk$3",
                                  },
                                },
                              ],
                              body: {
                                kind: "{}",
                                loc: [21, 31, 23, 12],
                                statements: [
                                  {
                                    kind: "()",
                                    loc: [22, 13, 22, 55],
                                    expression: {
                                      kind: ".",
                                      loc: [22, 13, 22, 23],
                                      expression: {
                                        kind: "id",
                                        loc: [22, 13, 22, 17],
                                        text: "held",
                                        bindingKey: "held$z0x1leig0sdk$0",
                                      },
                                      name: "write",
                                    },
                                    arguments: [
                                      {
                                        kind: "binop",
                                        loc: [22, 24, 22, 54],
                                        left: {
                                          kind: "string",
                                          loc: [22, 24, 22, 45],
                                          text: "the body stopped \u2014 ",
                                        },
                                        operatorToken: "+",
                                        right: {
                                          kind: "id",
                                          loc: [22, 48, 22, 54],
                                          text: "reason",
                                          bindingKey: "reason$z0x1leig0sdk$3",
                                        },
                                      },
                                    ],
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              kind: "=>",
              loc: [27, 5, 29, 6],
              parameters: [
                {
                  kind: "param",
                  loc: [27, 6, 27, 20],
                  name: {
                    kind: "id",
                    loc: [27, 6, 27, 12],
                    text: "reason",
                    bindingKey: "reason$z0x1leig0sdk$4",
                  },
                },
              ],
              body: {
                kind: "{}",
                loc: [27, 25, 29, 6],
                statements: [
                  {
                    kind: "()",
                    loc: [28, 7, 28, 49],
                    expression: {
                      kind: ".",
                      loc: [28, 7, 28, 17],
                      expression: {
                        kind: "id",
                        loc: [28, 7, 28, 11],
                        text: "held",
                        bindingKey: "held$z0x1leig0sdk$0",
                      },
                      name: "write",
                    },
                    arguments: [
                      {
                        kind: "binop",
                        loc: [28, 18, 28, 48],
                        left: {
                          kind: "string",
                          loc: [28, 18, 28, 39],
                          text: "nothing answered \u2014 ",
                        },
                        operatorToken: "+",
                        right: {
                          kind: "id",
                          loc: [28, 42, 28, 48],
                          text: "reason",
                          bindingKey: "reason$z0x1leig0sdk$4",
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              kind: "obj",
              loc: [30, 5, 30, 22],
              properties: [
                {
                  kind: ":",
                  loc: [30, 7, 30, 20],
                  name: "method",
                  initializer: {
                    kind: "string",
                    loc: [30, 15, 30, 20],
                    text: "GET",
                  },
                },
              ],
            },
          ],
        },
        {
          kind: "return",
          loc: [33, 3, 33, 22],
          expression: {
            kind: "()",
            loc: [33, 10, 33, 21],
            expression: {
              kind: ".",
              loc: [33, 10, 33, 19],
              expression: {
                kind: "id",
                loc: [33, 10, 33, 14],
                text: "held",
                bindingKey: "held$z0x1leig0sdk$0",
              },
              name: "read",
            },
            arguments: [],
          },
        },
      ],
    },
  }),
);
