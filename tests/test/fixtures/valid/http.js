import { cs, http, state } from "@backtickjs/core";
// Every answer reaches `onResponse`, and a throw from it reaches `onFailure`:
// a status is failed on by throwing, and so is a body that is not JSON.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
export default cs.create(
  [8, 16, 38, 3],
  {
    version: "0.0.0",
    filePath: "http.ts",
    fileHash: "175bwstlflpi",
    splices: {
      $state: { value: state, params: [] },
      $http: { value: http, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [8, 19, 38, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [8, 25, 38, 2],
      statements: [
        {
          kind: "const",
          loc: [9, 3, 9, 34],
          name: {
            kind: "id",
            loc: [9, 9, 9, 13],
            text: "held",
            bindingKey: "held$175bwstlflpi$0",
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
          loc: [11, 3, 23, 4],
          expression: {
            kind: ".",
            loc: [11, 3, 11, 12],
            expression: {
              kind: "splice",
              loc: [11, 3, 11, 8],
              key: "$http",
            },
            name: "get",
          },
          arguments: [
            {
              kind: "string",
              loc: [12, 5, 12, 53],
              text: "/cases/built-ins/Math/trunc/Math.trunc_Success",
            },
            {
              kind: "=>",
              loc: [13, 5, 18, 6],
              parameters: [
                {
                  kind: "param",
                  loc: [13, 6, 13, 28],
                  name: {
                    kind: "id",
                    loc: [13, 6, 13, 14],
                    text: "response",
                    bindingKey: "response$175bwstlflpi$1",
                  },
                },
              ],
              body: {
                kind: "{}",
                loc: [13, 33, 18, 6],
                statements: [
                  {
                    kind: "if",
                    loc: [14, 7, 16, 8],
                    expression: {
                      kind: "binop",
                      loc: [14, 11, 14, 34],
                      left: {
                        kind: ".",
                        loc: [14, 11, 14, 26],
                        expression: {
                          kind: "id",
                          loc: [14, 11, 14, 19],
                          text: "response",
                          bindingKey: "response$175bwstlflpi$1",
                        },
                        name: "status",
                      },
                      operatorToken: "!==",
                      right: {
                        kind: "number",
                        loc: [14, 31, 14, 34],
                        value: 200,
                      },
                    },
                    thenStatement: {
                      kind: "{}",
                      loc: [14, 36, 16, 8],
                      statements: [
                        {
                          kind: "throw",
                          loc: [15, 9, 15, 45],
                          expression: {
                            kind: "binop",
                            loc: [15, 15, 15, 44],
                            left: {
                              kind: "string",
                              loc: [15, 15, 15, 26],
                              text: "answered ",
                            },
                            operatorToken: "+",
                            right: {
                              kind: ".",
                              loc: [15, 29, 15, 44],
                              expression: {
                                kind: "id",
                                loc: [15, 29, 15, 37],
                                text: "response",
                                bindingKey: "response$175bwstlflpi$1",
                              },
                              name: "status",
                            },
                          },
                        },
                      ],
                    },
                    elseStatement: null,
                  },
                  {
                    kind: "()",
                    loc: [17, 7, 17, 74],
                    expression: {
                      kind: ".",
                      loc: [17, 7, 17, 17],
                      expression: {
                        kind: "id",
                        loc: [17, 7, 17, 11],
                        text: "held",
                        bindingKey: "held$175bwstlflpi$0",
                      },
                      name: "write",
                    },
                    arguments: [
                      {
                        kind: "?:",
                        loc: [17, 18, 17, 73],
                        condition: {
                          kind: "binop",
                          loc: [17, 18, 17, 52],
                          left: {
                            kind: "()",
                            loc: [17, 18, 17, 43],
                            expression: {
                              kind: "bltn",
                              loc: [17, 18, 17, 28],
                              name: "JSON.parse",
                            },
                            arguments: [
                              {
                                kind: ".",
                                loc: [17, 29, 17, 42],
                                expression: {
                                  kind: "id",
                                  loc: [17, 29, 17, 37],
                                  text: "response",
                                  bindingKey: "response$175bwstlflpi$1",
                                },
                                name: "data",
                              },
                            ],
                          },
                          operatorToken: "===",
                          right: {
                            kind: "null",
                            loc: [17, 48, 17, 52],
                          },
                        },
                        whenTrue: {
                          kind: "string",
                          loc: [17, 55, 17, 61],
                          text: "null",
                        },
                        whenFalse: {
                          kind: "string",
                          loc: [17, 64, 17, 73],
                          text: "a value",
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              kind: "=>",
              loc: [19, 5, 21, 6],
              parameters: [
                {
                  kind: "param",
                  loc: [19, 6, 19, 21],
                  name: {
                    kind: "id",
                    loc: [19, 6, 19, 13],
                    text: "message",
                    bindingKey: "message$175bwstlflpi$2",
                  },
                },
              ],
              body: {
                kind: "{}",
                loc: [19, 26, 21, 6],
                statements: [
                  {
                    kind: "()",
                    loc: [20, 7, 20, 40],
                    expression: {
                      kind: ".",
                      loc: [20, 7, 20, 17],
                      expression: {
                        kind: "id",
                        loc: [20, 7, 20, 11],
                        text: "held",
                        bindingKey: "held$175bwstlflpi$0",
                      },
                      name: "write",
                    },
                    arguments: [
                      {
                        kind: "binop",
                        loc: [20, 18, 20, 39],
                        left: {
                          kind: "string",
                          loc: [20, 18, 20, 29],
                          text: "failed \u2014 ",
                        },
                        operatorToken: "+",
                        right: {
                          kind: "id",
                          loc: [20, 32, 20, 39],
                          text: "message",
                          bindingKey: "message$175bwstlflpi$2",
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              kind: "obj",
              loc: [22, 5, 22, 22],
              properties: [
                {
                  kind: ":",
                  loc: [22, 7, 22, 20],
                  name: "timeout",
                  initializer: {
                    kind: "number",
                    loc: [22, 16, 22, 20],
                    value: 3000,
                  },
                },
              ],
            },
          ],
        },
        {
          kind: "()",
          loc: [25, 3, 35, 4],
          expression: {
            kind: ".",
            loc: [25, 3, 25, 13],
            expression: {
              kind: "splice",
              loc: [25, 3, 25, 8],
              key: "$http",
            },
            name: "post",
          },
          arguments: [
            {
              kind: "string",
              loc: [26, 5, 26, 13],
              text: "/cases",
            },
            {
              kind: "()",
              loc: [27, 5, 27, 57],
              expression: {
                kind: "bltn",
                loc: [27, 5, 27, 19],
                name: "JSON.stringify",
              },
              arguments: [
                {
                  kind: "obj",
                  loc: [27, 20, 27, 56],
                  properties: [
                    {
                      kind: ":",
                      loc: [27, 22, 27, 40],
                      name: "name",
                      initializer: {
                        kind: "string",
                        loc: [27, 28, 27, 40],
                        text: "Math.trunc",
                      },
                    },
                    {
                      kind: ":",
                      loc: [27, 42, 27, 54],
                      name: "passed",
                      initializer: {
                        kind: "true",
                        loc: [27, 50, 27, 54],
                      },
                    },
                  ],
                },
              ],
            },
            {
              kind: "=>",
              loc: [28, 5, 30, 6],
              parameters: [
                {
                  kind: "param",
                  loc: [28, 6, 28, 28],
                  name: {
                    kind: "id",
                    loc: [28, 6, 28, 14],
                    text: "response",
                    bindingKey: "response$175bwstlflpi$3",
                  },
                },
              ],
              body: {
                kind: "{}",
                loc: [28, 33, 30, 6],
                statements: [
                  {
                    kind: "()",
                    loc: [29, 7, 29, 32],
                    expression: {
                      kind: ".",
                      loc: [29, 7, 29, 17],
                      expression: {
                        kind: "id",
                        loc: [29, 7, 29, 11],
                        text: "held",
                        bindingKey: "held$175bwstlflpi$0",
                      },
                      name: "write",
                    },
                    arguments: [
                      {
                        kind: ".",
                        loc: [29, 18, 29, 31],
                        expression: {
                          kind: "id",
                          loc: [29, 18, 29, 26],
                          text: "response",
                          bindingKey: "response$175bwstlflpi$3",
                        },
                        name: "data",
                      },
                    ],
                  },
                ],
              },
            },
            {
              kind: "=>",
              loc: [31, 5, 33, 6],
              parameters: [
                {
                  kind: "param",
                  loc: [31, 6, 31, 21],
                  name: {
                    kind: "id",
                    loc: [31, 6, 31, 13],
                    text: "message",
                    bindingKey: "message$175bwstlflpi$4",
                  },
                },
              ],
              body: {
                kind: "{}",
                loc: [31, 26, 33, 6],
                statements: [
                  {
                    kind: "()",
                    loc: [32, 7, 32, 26],
                    expression: {
                      kind: ".",
                      loc: [32, 7, 32, 17],
                      expression: {
                        kind: "id",
                        loc: [32, 7, 32, 11],
                        text: "held",
                        bindingKey: "held$175bwstlflpi$0",
                      },
                      name: "write",
                    },
                    arguments: [
                      {
                        kind: "id",
                        loc: [32, 18, 32, 25],
                        text: "message",
                        bindingKey: "message$175bwstlflpi$4",
                      },
                    ],
                  },
                ],
              },
            },
            {
              kind: "obj",
              loc: [34, 5, 34, 56],
              properties: [
                {
                  kind: ":",
                  loc: [34, 7, 34, 54],
                  name: "headers",
                  initializer: {
                    kind: "obj",
                    loc: [34, 16, 34, 54],
                    properties: [
                      {
                        kind: ":",
                        loc: [34, 18, 34, 52],
                        name: "content-type",
                        initializer: {
                          kind: "string",
                          loc: [34, 34, 34, 52],
                          text: "application/json",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          kind: "return",
          loc: [37, 3, 37, 22],
          expression: {
            kind: "()",
            loc: [37, 10, 37, 21],
            expression: {
              kind: ".",
              loc: [37, 10, 37, 19],
              expression: {
                kind: "id",
                loc: [37, 10, 37, 14],
                text: "held",
                bindingKey: "held$175bwstlflpi$0",
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
