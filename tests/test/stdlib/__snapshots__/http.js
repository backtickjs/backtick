import { it } from "node:test";
import { cs, http, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Every answer reaches `onResponse`, and a throw from it reaches `onFailure`:
// a status is failed on by throwing, and so is a body that is not JSON.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
it("httpRequests", async (t) => {
  await snapshotCase(
    t,
    "httpRequests",
    cs.create(
      [15, 5, 45, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/http.test.tsx",
        fileHash: "349zba2rn0t2v",
        splices: {
          $state: { value: state, params: [] },
          $http: { value: http, params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [15, 8, 45, 6],
        parameters: [],
        body: {
          kind: "{}",
          loc: [15, 14, 45, 6],
          statements: [
            {
              kind: "const",
              loc: [16, 7, 16, 38],
              name: {
                kind: "id",
                loc: [16, 13, 16, 17],
                text: "held",
                bindingKey: "held$349zba2rn0t2v$0",
              },
              initializer: {
                kind: "()",
                loc: [16, 20, 16, 37],
                expression: {
                  kind: "splice",
                  loc: [16, 20, 16, 26],
                  key: "$state",
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [16, 27, 16, 36],
                    text: "waiting",
                  },
                ],
              },
            },
            {
              kind: "()",
              loc: [18, 7, 30, 8],
              expression: {
                kind: ".",
                loc: [18, 7, 18, 16],
                expression: {
                  kind: "splice",
                  loc: [18, 7, 18, 12],
                  key: "$http",
                },
                name: "get",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [19, 9, 19, 57],
                  text: "/cases/built-ins/Math/trunc/Math.trunc_Success",
                },
                {
                  kind: "=>",
                  loc: [20, 9, 25, 10],
                  parameters: [
                    {
                      kind: "param",
                      loc: [20, 10, 20, 32],
                      name: {
                        kind: "id",
                        loc: [20, 10, 20, 18],
                        text: "response",
                        bindingKey: "response$349zba2rn0t2v$1",
                      },
                    },
                  ],
                  body: {
                    kind: "{}",
                    loc: [20, 37, 25, 10],
                    statements: [
                      {
                        kind: "if",
                        loc: [21, 11, 23, 12],
                        expression: {
                          kind: "binop",
                          loc: [21, 15, 21, 38],
                          left: {
                            kind: ".",
                            loc: [21, 15, 21, 30],
                            expression: {
                              kind: "id",
                              loc: [21, 15, 21, 23],
                              text: "response",
                              bindingKey: "response$349zba2rn0t2v$1",
                            },
                            name: "status",
                          },
                          operatorToken: "!==",
                          right: {
                            kind: "number",
                            loc: [21, 35, 21, 38],
                            value: 200,
                          },
                        },
                        thenStatement: {
                          kind: "{}",
                          loc: [21, 40, 23, 12],
                          statements: [
                            {
                              kind: "throw",
                              loc: [22, 13, 22, 49],
                              expression: {
                                kind: "binop",
                                loc: [22, 19, 22, 48],
                                left: {
                                  kind: "string",
                                  loc: [22, 19, 22, 30],
                                  text: "answered ",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: ".",
                                  loc: [22, 33, 22, 48],
                                  expression: {
                                    kind: "id",
                                    loc: [22, 33, 22, 41],
                                    text: "response",
                                    bindingKey: "response$349zba2rn0t2v$1",
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
                        loc: [24, 11, 24, 76],
                        expression: {
                          kind: ".",
                          loc: [24, 11, 24, 19],
                          expression: {
                            kind: "id",
                            loc: [24, 11, 24, 15],
                            text: "held",
                            bindingKey: "held$349zba2rn0t2v$0",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "?:",
                            loc: [24, 20, 24, 75],
                            condition: {
                              kind: "binop",
                              loc: [24, 20, 24, 54],
                              left: {
                                kind: "()",
                                loc: [24, 20, 24, 45],
                                expression: {
                                  kind: "bltn",
                                  loc: [24, 20, 24, 30],
                                  name: "JSON.parse",
                                },
                                arguments: [
                                  {
                                    kind: ".",
                                    loc: [24, 31, 24, 44],
                                    expression: {
                                      kind: "id",
                                      loc: [24, 31, 24, 39],
                                      text: "response",
                                      bindingKey: "response$349zba2rn0t2v$1",
                                    },
                                    name: "data",
                                  },
                                ],
                              },
                              operatorToken: "===",
                              right: {
                                kind: "null",
                                loc: [24, 50, 24, 54],
                              },
                            },
                            whenTrue: {
                              kind: "string",
                              loc: [24, 57, 24, 63],
                              text: "null",
                            },
                            whenFalse: {
                              kind: "string",
                              loc: [24, 66, 24, 75],
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
                  loc: [26, 9, 28, 10],
                  parameters: [
                    {
                      kind: "param",
                      loc: [26, 10, 26, 25],
                      name: {
                        kind: "id",
                        loc: [26, 10, 26, 17],
                        text: "message",
                        bindingKey: "message$349zba2rn0t2v$2",
                      },
                    },
                  ],
                  body: {
                    kind: "{}",
                    loc: [26, 30, 28, 10],
                    statements: [
                      {
                        kind: "()",
                        loc: [27, 11, 27, 42],
                        expression: {
                          kind: ".",
                          loc: [27, 11, 27, 19],
                          expression: {
                            kind: "id",
                            loc: [27, 11, 27, 15],
                            text: "held",
                            bindingKey: "held$349zba2rn0t2v$0",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "binop",
                            loc: [27, 20, 27, 41],
                            left: {
                              kind: "string",
                              loc: [27, 20, 27, 31],
                              text: "failed \u2014 ",
                            },
                            operatorToken: "+",
                            right: {
                              kind: "id",
                              loc: [27, 34, 27, 41],
                              text: "message",
                              bindingKey: "message$349zba2rn0t2v$2",
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  kind: "obj",
                  loc: [29, 9, 29, 26],
                  properties: [
                    {
                      kind: ":",
                      loc: [29, 11, 29, 24],
                      name: "timeout",
                      initializer: {
                        kind: "number",
                        loc: [29, 20, 29, 24],
                        value: 3000,
                      },
                    },
                  ],
                },
              ],
            },
            {
              kind: "()",
              loc: [32, 7, 42, 8],
              expression: {
                kind: ".",
                loc: [32, 7, 32, 17],
                expression: {
                  kind: "splice",
                  loc: [32, 7, 32, 12],
                  key: "$http",
                },
                name: "post",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [33, 9, 33, 17],
                  text: "/cases",
                },
                {
                  kind: "()",
                  loc: [34, 9, 34, 61],
                  expression: {
                    kind: "bltn",
                    loc: [34, 9, 34, 23],
                    name: "JSON.stringify",
                  },
                  arguments: [
                    {
                      kind: "obj",
                      loc: [34, 24, 34, 60],
                      properties: [
                        {
                          kind: ":",
                          loc: [34, 26, 34, 44],
                          name: "name",
                          initializer: {
                            kind: "string",
                            loc: [34, 32, 34, 44],
                            text: "Math.trunc",
                          },
                        },
                        {
                          kind: ":",
                          loc: [34, 46, 34, 58],
                          name: "passed",
                          initializer: {
                            kind: "true",
                            loc: [34, 54, 34, 58],
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  kind: "=>",
                  loc: [35, 9, 37, 10],
                  parameters: [
                    {
                      kind: "param",
                      loc: [35, 10, 35, 32],
                      name: {
                        kind: "id",
                        loc: [35, 10, 35, 18],
                        text: "response",
                        bindingKey: "response$349zba2rn0t2v$3",
                      },
                    },
                  ],
                  body: {
                    kind: "{}",
                    loc: [35, 37, 37, 10],
                    statements: [
                      {
                        kind: "()",
                        loc: [36, 11, 36, 34],
                        expression: {
                          kind: ".",
                          loc: [36, 11, 36, 19],
                          expression: {
                            kind: "id",
                            loc: [36, 11, 36, 15],
                            text: "held",
                            bindingKey: "held$349zba2rn0t2v$0",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: ".",
                            loc: [36, 20, 36, 33],
                            expression: {
                              kind: "id",
                              loc: [36, 20, 36, 28],
                              text: "response",
                              bindingKey: "response$349zba2rn0t2v$3",
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
                  loc: [38, 9, 40, 10],
                  parameters: [
                    {
                      kind: "param",
                      loc: [38, 10, 38, 25],
                      name: {
                        kind: "id",
                        loc: [38, 10, 38, 17],
                        text: "message",
                        bindingKey: "message$349zba2rn0t2v$4",
                      },
                    },
                  ],
                  body: {
                    kind: "{}",
                    loc: [38, 30, 40, 10],
                    statements: [
                      {
                        kind: "()",
                        loc: [39, 11, 39, 28],
                        expression: {
                          kind: ".",
                          loc: [39, 11, 39, 19],
                          expression: {
                            kind: "id",
                            loc: [39, 11, 39, 15],
                            text: "held",
                            bindingKey: "held$349zba2rn0t2v$0",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "id",
                            loc: [39, 20, 39, 27],
                            text: "message",
                            bindingKey: "message$349zba2rn0t2v$4",
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  kind: "obj",
                  loc: [41, 9, 41, 60],
                  properties: [
                    {
                      kind: ":",
                      loc: [41, 11, 41, 58],
                      name: "headers",
                      initializer: {
                        kind: "obj",
                        loc: [41, 20, 41, 58],
                        properties: [
                          {
                            kind: ":",
                            loc: [41, 22, 41, 56],
                            name: "content-type",
                            initializer: {
                              kind: "string",
                              loc: [41, 38, 41, 56],
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
              loc: [44, 7, 44, 25],
              expression: {
                kind: "()",
                loc: [44, 14, 44, 24],
                expression: {
                  kind: ".",
                  loc: [44, 14, 44, 22],
                  expression: {
                    kind: "id",
                    loc: [44, 14, 44, 18],
                    text: "held",
                    bindingKey: "held$349zba2rn0t2v$0",
                  },
                  name: "get",
                },
                arguments: [],
              },
            },
          ],
        },
      }),
    ),
  );
});
