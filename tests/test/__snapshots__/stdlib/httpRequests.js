import { cs, http, state } from "@backtickjs/core";
// Every answer reaches `onResponse`, and a throw from it reaches `onFailure`:
// a status is failed on by throwing, and so is a body that is not JSON.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
const httpRequests = cs.create(
  [9, 22, 39, 3],
  {
    version: "0.0.0",
    filePath: "httpRequests.tsx",
    fileHash: "3fdskuos6g5ea",
    splices: {
      $state: { value: state, params: [] },
      $http: { value: http, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [9, 25, 39, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [9, 31, 39, 2],
      statements: [
        {
          kind: "const",
          loc: [10, 3, 10, 34],
          name: {
            kind: "id",
            loc: [10, 9, 10, 13],
            text: "held",
            bindingKey: "held$3fdskuos6g5ea$0",
          },
          initializer: {
            kind: "()",
            loc: [10, 16, 10, 33],
            expression: {
              kind: "splice",
              loc: [10, 16, 10, 22],
              key: "$state",
            },
            arguments: [
              {
                kind: "string",
                loc: [10, 23, 10, 32],
                text: "waiting",
              },
            ],
          },
        },
        {
          kind: "()",
          loc: [12, 3, 24, 4],
          expression: {
            kind: ".",
            loc: [12, 3, 12, 12],
            expression: {
              kind: "splice",
              loc: [12, 3, 12, 8],
              key: "$http",
            },
            name: "get",
          },
          arguments: [
            {
              kind: "string",
              loc: [13, 5, 13, 53],
              text: "/cases/built-ins/Math/trunc/Math.trunc_Success",
            },
            {
              kind: "=>",
              loc: [14, 5, 19, 6],
              parameters: [
                {
                  kind: "param",
                  loc: [14, 6, 14, 28],
                  name: {
                    kind: "id",
                    loc: [14, 6, 14, 14],
                    text: "response",
                    bindingKey: "response$3fdskuos6g5ea$1",
                  },
                },
              ],
              body: {
                kind: "{}",
                loc: [14, 33, 19, 6],
                statements: [
                  {
                    kind: "if",
                    loc: [15, 7, 17, 8],
                    expression: {
                      kind: "binop",
                      loc: [15, 11, 15, 34],
                      left: {
                        kind: ".",
                        loc: [15, 11, 15, 26],
                        expression: {
                          kind: "id",
                          loc: [15, 11, 15, 19],
                          text: "response",
                          bindingKey: "response$3fdskuos6g5ea$1",
                        },
                        name: "status",
                      },
                      operatorToken: "!==",
                      right: {
                        kind: "number",
                        loc: [15, 31, 15, 34],
                        value: 200,
                      },
                    },
                    thenStatement: {
                      kind: "{}",
                      loc: [15, 36, 17, 8],
                      statements: [
                        {
                          kind: "throw",
                          loc: [16, 9, 16, 45],
                          expression: {
                            kind: "binop",
                            loc: [16, 15, 16, 44],
                            left: {
                              kind: "string",
                              loc: [16, 15, 16, 26],
                              text: "answered ",
                            },
                            operatorToken: "+",
                            right: {
                              kind: ".",
                              loc: [16, 29, 16, 44],
                              expression: {
                                kind: "id",
                                loc: [16, 29, 16, 37],
                                text: "response",
                                bindingKey: "response$3fdskuos6g5ea$1",
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
                    loc: [18, 7, 18, 74],
                    expression: {
                      kind: ".",
                      loc: [18, 7, 18, 17],
                      expression: {
                        kind: "id",
                        loc: [18, 7, 18, 11],
                        text: "held",
                        bindingKey: "held$3fdskuos6g5ea$0",
                      },
                      name: "write",
                    },
                    arguments: [
                      {
                        kind: "?:",
                        loc: [18, 18, 18, 73],
                        condition: {
                          kind: "binop",
                          loc: [18, 18, 18, 52],
                          left: {
                            kind: "()",
                            loc: [18, 18, 18, 43],
                            expression: {
                              kind: "bltn",
                              loc: [18, 18, 18, 28],
                              name: "JSON.parse",
                            },
                            arguments: [
                              {
                                kind: ".",
                                loc: [18, 29, 18, 42],
                                expression: {
                                  kind: "id",
                                  loc: [18, 29, 18, 37],
                                  text: "response",
                                  bindingKey: "response$3fdskuos6g5ea$1",
                                },
                                name: "data",
                              },
                            ],
                          },
                          operatorToken: "===",
                          right: {
                            kind: "null",
                            loc: [18, 48, 18, 52],
                          },
                        },
                        whenTrue: {
                          kind: "string",
                          loc: [18, 55, 18, 61],
                          text: "null",
                        },
                        whenFalse: {
                          kind: "string",
                          loc: [18, 64, 18, 73],
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
              loc: [20, 5, 22, 6],
              parameters: [
                {
                  kind: "param",
                  loc: [20, 6, 20, 21],
                  name: {
                    kind: "id",
                    loc: [20, 6, 20, 13],
                    text: "message",
                    bindingKey: "message$3fdskuos6g5ea$2",
                  },
                },
              ],
              body: {
                kind: "{}",
                loc: [20, 26, 22, 6],
                statements: [
                  {
                    kind: "()",
                    loc: [21, 7, 21, 40],
                    expression: {
                      kind: ".",
                      loc: [21, 7, 21, 17],
                      expression: {
                        kind: "id",
                        loc: [21, 7, 21, 11],
                        text: "held",
                        bindingKey: "held$3fdskuos6g5ea$0",
                      },
                      name: "write",
                    },
                    arguments: [
                      {
                        kind: "binop",
                        loc: [21, 18, 21, 39],
                        left: {
                          kind: "string",
                          loc: [21, 18, 21, 29],
                          text: "failed \u2014 ",
                        },
                        operatorToken: "+",
                        right: {
                          kind: "id",
                          loc: [21, 32, 21, 39],
                          text: "message",
                          bindingKey: "message$3fdskuos6g5ea$2",
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              kind: "obj",
              loc: [23, 5, 23, 22],
              properties: [
                {
                  kind: ":",
                  loc: [23, 7, 23, 20],
                  name: "timeout",
                  initializer: {
                    kind: "number",
                    loc: [23, 16, 23, 20],
                    value: 3000,
                  },
                },
              ],
            },
          ],
        },
        {
          kind: "()",
          loc: [26, 3, 36, 4],
          expression: {
            kind: ".",
            loc: [26, 3, 26, 13],
            expression: {
              kind: "splice",
              loc: [26, 3, 26, 8],
              key: "$http",
            },
            name: "post",
          },
          arguments: [
            {
              kind: "string",
              loc: [27, 5, 27, 13],
              text: "/cases",
            },
            {
              kind: "()",
              loc: [28, 5, 28, 57],
              expression: {
                kind: "bltn",
                loc: [28, 5, 28, 19],
                name: "JSON.stringify",
              },
              arguments: [
                {
                  kind: "obj",
                  loc: [28, 20, 28, 56],
                  properties: [
                    {
                      kind: ":",
                      loc: [28, 22, 28, 40],
                      name: "name",
                      initializer: {
                        kind: "string",
                        loc: [28, 28, 28, 40],
                        text: "Math.trunc",
                      },
                    },
                    {
                      kind: ":",
                      loc: [28, 42, 28, 54],
                      name: "passed",
                      initializer: {
                        kind: "true",
                        loc: [28, 50, 28, 54],
                      },
                    },
                  ],
                },
              ],
            },
            {
              kind: "=>",
              loc: [29, 5, 31, 6],
              parameters: [
                {
                  kind: "param",
                  loc: [29, 6, 29, 28],
                  name: {
                    kind: "id",
                    loc: [29, 6, 29, 14],
                    text: "response",
                    bindingKey: "response$3fdskuos6g5ea$3",
                  },
                },
              ],
              body: {
                kind: "{}",
                loc: [29, 33, 31, 6],
                statements: [
                  {
                    kind: "()",
                    loc: [30, 7, 30, 32],
                    expression: {
                      kind: ".",
                      loc: [30, 7, 30, 17],
                      expression: {
                        kind: "id",
                        loc: [30, 7, 30, 11],
                        text: "held",
                        bindingKey: "held$3fdskuos6g5ea$0",
                      },
                      name: "write",
                    },
                    arguments: [
                      {
                        kind: ".",
                        loc: [30, 18, 30, 31],
                        expression: {
                          kind: "id",
                          loc: [30, 18, 30, 26],
                          text: "response",
                          bindingKey: "response$3fdskuos6g5ea$3",
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
              loc: [32, 5, 34, 6],
              parameters: [
                {
                  kind: "param",
                  loc: [32, 6, 32, 21],
                  name: {
                    kind: "id",
                    loc: [32, 6, 32, 13],
                    text: "message",
                    bindingKey: "message$3fdskuos6g5ea$4",
                  },
                },
              ],
              body: {
                kind: "{}",
                loc: [32, 26, 34, 6],
                statements: [
                  {
                    kind: "()",
                    loc: [33, 7, 33, 26],
                    expression: {
                      kind: ".",
                      loc: [33, 7, 33, 17],
                      expression: {
                        kind: "id",
                        loc: [33, 7, 33, 11],
                        text: "held",
                        bindingKey: "held$3fdskuos6g5ea$0",
                      },
                      name: "write",
                    },
                    arguments: [
                      {
                        kind: "id",
                        loc: [33, 18, 33, 25],
                        text: "message",
                        bindingKey: "message$3fdskuos6g5ea$4",
                      },
                    ],
                  },
                ],
              },
            },
            {
              kind: "obj",
              loc: [35, 5, 35, 56],
              properties: [
                {
                  kind: ":",
                  loc: [35, 7, 35, 54],
                  name: "headers",
                  initializer: {
                    kind: "obj",
                    loc: [35, 16, 35, 54],
                    properties: [
                      {
                        kind: ":",
                        loc: [35, 18, 35, 52],
                        name: "content-type",
                        initializer: {
                          kind: "string",
                          loc: [35, 34, 35, 52],
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
          loc: [38, 3, 38, 22],
          expression: {
            kind: "()",
            loc: [38, 10, 38, 21],
            expression: {
              kind: ".",
              loc: [38, 10, 38, 19],
              expression: {
                kind: "id",
                loc: [38, 10, 38, 14],
                text: "held",
                bindingKey: "held$3fdskuos6g5ea$0",
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
