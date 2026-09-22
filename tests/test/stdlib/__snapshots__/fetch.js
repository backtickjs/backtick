import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/web-sdk";
import { snapshotCase } from "../snapshotCase.ts";
// Every answer reaches `onResponse`, and a throw from it reaches `onFailure`:
// a status is failed on by throwing, and so is a body that is not JSON.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
it("fetchRequests", async (t) => {
  await snapshotCase(
    t,
    "fetchRequests",
    cs.create(
      [16, 5, 49, 7],
      {
        version: "0.0.0",
        filePath: "stdlib/fetch.test.tsx",
        fileHash: "2oxvexs6ogdoj",
        splices: {
          $state: { value: state, params: [] },
          $window: { value: window, params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [16, 8, 49, 6],
        parameters: [],
        body: {
          kind: "{}",
          loc: [16, 14, 49, 6],
          statements: [
            {
              kind: "const",
              loc: [17, 7, 17, 38],
              name: {
                kind: "id",
                loc: [17, 13, 17, 17],
                text: "held",
                bindingKey: "held$2oxvexs6ogdoj$0",
              },
              initializer: {
                kind: "()",
                loc: [17, 20, 17, 37],
                expression: {
                  kind: "splice",
                  loc: [17, 20, 17, 26],
                  key: "$state",
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [17, 27, 17, 36],
                    text: "waiting",
                  },
                ],
              },
            },
            {
              kind: "()",
              loc: [19, 7, 31, 8],
              expression: {
                kind: ".",
                loc: [19, 7, 19, 20],
                expression: {
                  kind: "splice",
                  loc: [19, 7, 19, 14],
                  key: "$window",
                },
                name: "fetch",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [20, 9, 20, 57],
                  text: "/cases/built-ins/Math/trunc/Math.trunc_Success",
                },
                {
                  kind: "=>",
                  loc: [21, 9, 26, 10],
                  parameters: [
                    {
                      kind: "param",
                      loc: [21, 10, 21, 28],
                      name: {
                        kind: "id",
                        loc: [21, 10, 21, 18],
                        text: "response",
                        bindingKey: "response$2oxvexs6ogdoj$1",
                      },
                    },
                  ],
                  body: {
                    kind: "{}",
                    loc: [21, 33, 26, 10],
                    statements: [
                      {
                        kind: "if",
                        loc: [22, 11, 24, 12],
                        expression: {
                          kind: "binop",
                          loc: [22, 15, 22, 38],
                          left: {
                            kind: ".",
                            loc: [22, 15, 22, 30],
                            expression: {
                              kind: "id",
                              loc: [22, 15, 22, 23],
                              text: "response",
                              bindingKey: "response$2oxvexs6ogdoj$1",
                            },
                            name: "status",
                          },
                          operatorToken: "!==",
                          right: {
                            kind: "number",
                            loc: [22, 35, 22, 38],
                            value: 200,
                          },
                        },
                        thenStatement: {
                          kind: "{}",
                          loc: [22, 40, 24, 12],
                          statements: [
                            {
                              kind: "throw",
                              loc: [23, 13, 23, 49],
                              expression: {
                                kind: "binop",
                                loc: [23, 19, 23, 48],
                                left: {
                                  kind: "string",
                                  loc: [23, 19, 23, 30],
                                  text: "answered ",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: ".",
                                  loc: [23, 33, 23, 48],
                                  expression: {
                                    kind: "id",
                                    loc: [23, 33, 23, 41],
                                    text: "response",
                                    bindingKey: "response$2oxvexs6ogdoj$1",
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
                        loc: [25, 11, 25, 76],
                        expression: {
                          kind: ".",
                          loc: [25, 11, 25, 19],
                          expression: {
                            kind: "id",
                            loc: [25, 11, 25, 15],
                            text: "held",
                            bindingKey: "held$2oxvexs6ogdoj$0",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "?:",
                            loc: [25, 20, 25, 75],
                            condition: {
                              kind: "binop",
                              loc: [25, 20, 25, 54],
                              left: {
                                kind: "()",
                                loc: [25, 20, 25, 45],
                                expression: {
                                  kind: "bltn",
                                  loc: [25, 20, 25, 30],
                                  name: "JSON.parse",
                                },
                                arguments: [
                                  {
                                    kind: ".",
                                    loc: [25, 31, 25, 44],
                                    expression: {
                                      kind: "id",
                                      loc: [25, 31, 25, 39],
                                      text: "response",
                                      bindingKey: "response$2oxvexs6ogdoj$1",
                                    },
                                    name: "text",
                                  },
                                ],
                              },
                              operatorToken: "===",
                              right: {
                                kind: "null",
                                loc: [25, 50, 25, 54],
                              },
                            },
                            whenTrue: {
                              kind: "string",
                              loc: [25, 57, 25, 63],
                              text: "null",
                            },
                            whenFalse: {
                              kind: "string",
                              loc: [25, 66, 25, 75],
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
                  loc: [27, 9, 29, 10],
                  parameters: [
                    {
                      kind: "param",
                      loc: [27, 10, 27, 25],
                      name: {
                        kind: "id",
                        loc: [27, 10, 27, 17],
                        text: "message",
                        bindingKey: "message$2oxvexs6ogdoj$2",
                      },
                    },
                  ],
                  body: {
                    kind: "{}",
                    loc: [27, 30, 29, 10],
                    statements: [
                      {
                        kind: "()",
                        loc: [28, 11, 28, 42],
                        expression: {
                          kind: ".",
                          loc: [28, 11, 28, 19],
                          expression: {
                            kind: "id",
                            loc: [28, 11, 28, 15],
                            text: "held",
                            bindingKey: "held$2oxvexs6ogdoj$0",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "binop",
                            loc: [28, 20, 28, 41],
                            left: {
                              kind: "string",
                              loc: [28, 20, 28, 31],
                              text: "failed \u2014 ",
                            },
                            operatorToken: "+",
                            right: {
                              kind: "id",
                              loc: [28, 34, 28, 41],
                              text: "message",
                              bindingKey: "message$2oxvexs6ogdoj$2",
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  kind: "obj",
                  loc: [30, 9, 30, 26],
                  properties: [
                    {
                      kind: ":",
                      loc: [30, 11, 30, 24],
                      name: {
                        kind: "string",
                        loc: [30, 11, 30, 18],
                        text: "timeout",
                      },
                      initializer: {
                        kind: "number",
                        loc: [30, 20, 30, 24],
                        value: 3000,
                      },
                    },
                  ],
                },
              ],
            },
            {
              kind: "()",
              loc: [33, 7, 46, 8],
              expression: {
                kind: ".",
                loc: [33, 7, 33, 20],
                expression: {
                  kind: "splice",
                  loc: [33, 7, 33, 14],
                  key: "$window",
                },
                name: "fetch",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [34, 9, 34, 17],
                  text: "/cases",
                },
                {
                  kind: "=>",
                  loc: [35, 9, 37, 10],
                  parameters: [
                    {
                      kind: "param",
                      loc: [35, 10, 35, 28],
                      name: {
                        kind: "id",
                        loc: [35, 10, 35, 18],
                        text: "response",
                        bindingKey: "response$2oxvexs6ogdoj$3",
                      },
                    },
                  ],
                  body: {
                    kind: "{}",
                    loc: [35, 33, 37, 10],
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
                            bindingKey: "held$2oxvexs6ogdoj$0",
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
                              bindingKey: "response$2oxvexs6ogdoj$3",
                            },
                            name: "text",
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
                        bindingKey: "message$2oxvexs6ogdoj$4",
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
                            bindingKey: "held$2oxvexs6ogdoj$0",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "id",
                            loc: [39, 20, 39, 27],
                            text: "message",
                            bindingKey: "message$2oxvexs6ogdoj$4",
                          },
                        ],
                      },
                    ],
                  },
                },
                {
                  kind: "obj",
                  loc: [41, 9, 45, 10],
                  properties: [
                    {
                      kind: ":",
                      loc: [42, 11, 42, 25],
                      name: {
                        kind: "string",
                        loc: [42, 11, 42, 17],
                        text: "method",
                      },
                      initializer: {
                        kind: "string",
                        loc: [42, 19, 42, 25],
                        text: "POST",
                      },
                    },
                    {
                      kind: ":",
                      loc: [43, 11, 43, 58],
                      name: {
                        kind: "string",
                        loc: [43, 11, 43, 18],
                        text: "headers",
                      },
                      initializer: {
                        kind: "obj",
                        loc: [43, 20, 43, 58],
                        properties: [
                          {
                            kind: ":",
                            loc: [43, 22, 43, 56],
                            name: {
                              kind: "string",
                              loc: [43, 22, 43, 36],
                              text: "content-type",
                            },
                            initializer: {
                              kind: "string",
                              loc: [43, 38, 43, 56],
                              text: "application/json",
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: ":",
                      loc: [44, 11, 44, 69],
                      name: {
                        kind: "string",
                        loc: [44, 11, 44, 15],
                        text: "body",
                      },
                      initializer: {
                        kind: "()",
                        loc: [44, 17, 44, 69],
                        expression: {
                          kind: "bltn",
                          loc: [44, 17, 44, 31],
                          name: "JSON.stringify",
                        },
                        arguments: [
                          {
                            kind: "obj",
                            loc: [44, 32, 44, 68],
                            properties: [
                              {
                                kind: ":",
                                loc: [44, 34, 44, 52],
                                name: {
                                  kind: "string",
                                  loc: [44, 34, 44, 38],
                                  text: "name",
                                },
                                initializer: {
                                  kind: "string",
                                  loc: [44, 40, 44, 52],
                                  text: "Math.trunc",
                                },
                              },
                              {
                                kind: ":",
                                loc: [44, 54, 44, 66],
                                name: {
                                  kind: "string",
                                  loc: [44, 54, 44, 60],
                                  text: "passed",
                                },
                                initializer: {
                                  kind: "true",
                                  loc: [44, 62, 44, 66],
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
            {
              kind: "return",
              loc: [48, 7, 48, 25],
              expression: {
                kind: "()",
                loc: [48, 14, 48, 24],
                expression: {
                  kind: ".",
                  loc: [48, 14, 48, 22],
                  expression: {
                    kind: "id",
                    loc: [48, 14, 48, 18],
                    text: "held",
                    bindingKey: "held$2oxvexs6ogdoj$0",
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
