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
      { start: { line: 16, column: 4 }, end: { line: 49, column: 6 } },
      {
        filePath: "stdlib/fetch.test.tsx",
        fileHash: "2oxvexs6ogdoj",
        splices: {
          $state: { value: state, params: [] },
          $window: { value: window, params: [] },
        },
        captures: [],
      },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 16, column: 7 }, end: { line: 49, column: 5 } },
        params: [],
        body: {
          type: "BlockStatement",
          loc: {
            start: { line: 16, column: 13 },
            end: { line: 49, column: 5 },
          },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 17, column: 6 },
                end: { line: 17, column: 37 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 17, column: 12 },
                    end: { line: 17, column: 36 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 12 },
                      end: { line: 17, column: 16 },
                    },
                    name: "held",
                    key: "held$2oxvexs6ogdoj$0",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 17, column: 19 },
                      end: { line: 17, column: 36 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 17, column: 19 },
                        end: { line: 17, column: 25 },
                      },
                      key: "$state",
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 17, column: 26 },
                          end: { line: 17, column: 35 },
                        },
                        value: "waiting",
                      },
                    ],
                    optional: false,
                  },
                },
              ],
            },
            {
              type: "ExpressionStatement",
              loc: {
                start: { line: 19, column: 6 },
                end: { line: 31, column: 8 },
              },
              expression: {
                type: "CallExpression",
                loc: {
                  start: { line: 19, column: 6 },
                  end: { line: 31, column: 7 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 19, column: 6 },
                    end: { line: 19, column: 19 },
                  },
                  object: {
                    type: "Splice",
                    loc: {
                      start: { line: 19, column: 6 },
                      end: { line: 19, column: 13 },
                    },
                    key: "$window",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 19, column: 14 },
                      end: { line: 19, column: 19 },
                    },
                    name: "fetch",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 20, column: 8 },
                      end: { line: 20, column: 56 },
                    },
                    value: "/cases/built-ins/Math/trunc/Math.trunc_Success",
                  },
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 21, column: 8 },
                      end: { line: 26, column: 9 },
                    },
                    params: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 21, column: 9 },
                          end: { line: 21, column: 17 },
                        },
                        name: "response",
                        key: "response$2oxvexs6ogdoj$1",
                      },
                    ],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 21, column: 32 },
                        end: { line: 26, column: 9 },
                      },
                      body: [
                        {
                          type: "IfStatement",
                          loc: {
                            start: { line: 22, column: 10 },
                            end: { line: 24, column: 11 },
                          },
                          test: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 22, column: 14 },
                              end: { line: 22, column: 37 },
                            },
                            operator: "!==",
                            left: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 22, column: 14 },
                                end: { line: 22, column: 29 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 22, column: 14 },
                                  end: { line: 22, column: 22 },
                                },
                                name: "response",
                                key: "response$2oxvexs6ogdoj$1",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 22, column: 23 },
                                  end: { line: 22, column: 29 },
                                },
                                name: "status",
                              },
                              computed: false,
                              optional: false,
                            },
                            right: {
                              type: "Literal",
                              loc: {
                                start: { line: 22, column: 34 },
                                end: { line: 22, column: 37 },
                              },
                              value: 200,
                            },
                          },
                          consequent: {
                            type: "BlockStatement",
                            loc: {
                              start: { line: 22, column: 39 },
                              end: { line: 24, column: 11 },
                            },
                            body: [
                              {
                                type: "ThrowStatement",
                                loc: {
                                  start: { line: 23, column: 12 },
                                  end: { line: 23, column: 48 },
                                },
                                argument: {
                                  type: "BinaryExpression",
                                  loc: {
                                    start: { line: 23, column: 18 },
                                    end: { line: 23, column: 47 },
                                  },
                                  operator: "+",
                                  left: {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 23, column: 18 },
                                      end: { line: 23, column: 29 },
                                    },
                                    value: "answered ",
                                  },
                                  right: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 23, column: 32 },
                                      end: { line: 23, column: 47 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 23, column: 32 },
                                        end: { line: 23, column: 40 },
                                      },
                                      name: "response",
                                      key: "response$2oxvexs6ogdoj$1",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 23, column: 41 },
                                        end: { line: 23, column: 47 },
                                      },
                                      name: "status",
                                    },
                                    computed: false,
                                    optional: false,
                                  },
                                },
                              },
                            ],
                          },
                          alternate: null,
                        },
                        {
                          type: "ExpressionStatement",
                          loc: {
                            start: { line: 25, column: 10 },
                            end: { line: 25, column: 76 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 25, column: 10 },
                              end: { line: 25, column: 75 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 25, column: 10 },
                                end: { line: 25, column: 18 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 25, column: 10 },
                                  end: { line: 25, column: 14 },
                                },
                                name: "held",
                                key: "held$2oxvexs6ogdoj$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 25, column: 15 },
                                  end: { line: 25, column: 18 },
                                },
                                name: "set",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [
                              {
                                type: "ConditionalExpression",
                                loc: {
                                  start: { line: 25, column: 19 },
                                  end: { line: 25, column: 74 },
                                },
                                test: {
                                  type: "BinaryExpression",
                                  loc: {
                                    start: { line: 25, column: 19 },
                                    end: { line: 25, column: 53 },
                                  },
                                  operator: "===",
                                  left: {
                                    type: "CallExpression",
                                    loc: {
                                      start: { line: 25, column: 19 },
                                      end: { line: 25, column: 44 },
                                    },
                                    callee: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 25, column: 19 },
                                        end: { line: 25, column: 29 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 25, column: 19 },
                                          end: { line: 25, column: 23 },
                                        },
                                        name: "JSON",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 25, column: 24 },
                                          end: { line: 25, column: 29 },
                                        },
                                        name: "parse",
                                      },
                                      computed: false,
                                      optional: false,
                                    },
                                    arguments: [
                                      {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 25, column: 30 },
                                          end: { line: 25, column: 43 },
                                        },
                                        object: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 25, column: 30 },
                                            end: { line: 25, column: 38 },
                                          },
                                          name: "response",
                                          key: "response$2oxvexs6ogdoj$1",
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 25, column: 39 },
                                            end: { line: 25, column: 43 },
                                          },
                                          name: "text",
                                        },
                                        computed: false,
                                        optional: false,
                                      },
                                    ],
                                    optional: false,
                                  },
                                  right: {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 25, column: 49 },
                                      end: { line: 25, column: 53 },
                                    },
                                    value: null,
                                  },
                                },
                                consequent: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 25, column: 56 },
                                    end: { line: 25, column: 62 },
                                  },
                                  value: "null",
                                },
                                alternate: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 25, column: 65 },
                                    end: { line: 25, column: 74 },
                                  },
                                  value: "a value",
                                },
                              },
                            ],
                            optional: false,
                          },
                        },
                      ],
                    },
                    expression: false,
                  },
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 27, column: 8 },
                      end: { line: 29, column: 9 },
                    },
                    params: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 27, column: 9 },
                          end: { line: 27, column: 16 },
                        },
                        name: "message",
                        key: "message$2oxvexs6ogdoj$2",
                      },
                    ],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 27, column: 29 },
                        end: { line: 29, column: 9 },
                      },
                      body: [
                        {
                          type: "ExpressionStatement",
                          loc: {
                            start: { line: 28, column: 10 },
                            end: { line: 28, column: 42 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 28, column: 10 },
                              end: { line: 28, column: 41 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 28, column: 10 },
                                end: { line: 28, column: 18 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 28, column: 10 },
                                  end: { line: 28, column: 14 },
                                },
                                name: "held",
                                key: "held$2oxvexs6ogdoj$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 28, column: 15 },
                                  end: { line: 28, column: 18 },
                                },
                                name: "set",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [
                              {
                                type: "BinaryExpression",
                                loc: {
                                  start: { line: 28, column: 19 },
                                  end: { line: 28, column: 40 },
                                },
                                operator: "+",
                                left: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 28, column: 19 },
                                    end: { line: 28, column: 30 },
                                  },
                                  value: "failed \u2014 ",
                                },
                                right: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 28, column: 33 },
                                    end: { line: 28, column: 40 },
                                  },
                                  name: "message",
                                  key: "message$2oxvexs6ogdoj$2",
                                },
                              },
                            ],
                            optional: false,
                          },
                        },
                      ],
                    },
                    expression: false,
                  },
                  {
                    type: "ObjectExpression",
                    loc: {
                      start: { line: 30, column: 8 },
                      end: { line: 30, column: 25 },
                    },
                    properties: [
                      {
                        type: "Property",
                        loc: {
                          start: { line: 30, column: 10 },
                          end: { line: 30, column: 23 },
                        },
                        key: {
                          type: "Identifier",
                          loc: {
                            start: { line: 30, column: 10 },
                            end: { line: 30, column: 17 },
                          },
                          name: "timeout",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 30, column: 19 },
                            end: { line: 30, column: 23 },
                          },
                          value: 3000,
                        },
                        kind: "init",
                        computed: false,
                        method: false,
                        shorthand: false,
                      },
                    ],
                  },
                ],
                optional: false,
              },
            },
            {
              type: "ExpressionStatement",
              loc: {
                start: { line: 33, column: 6 },
                end: { line: 46, column: 8 },
              },
              expression: {
                type: "CallExpression",
                loc: {
                  start: { line: 33, column: 6 },
                  end: { line: 46, column: 7 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 33, column: 6 },
                    end: { line: 33, column: 19 },
                  },
                  object: {
                    type: "Splice",
                    loc: {
                      start: { line: 33, column: 6 },
                      end: { line: 33, column: 13 },
                    },
                    key: "$window",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 33, column: 14 },
                      end: { line: 33, column: 19 },
                    },
                    name: "fetch",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 34, column: 8 },
                      end: { line: 34, column: 16 },
                    },
                    value: "/cases",
                  },
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 35, column: 8 },
                      end: { line: 37, column: 9 },
                    },
                    params: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 35, column: 9 },
                          end: { line: 35, column: 17 },
                        },
                        name: "response",
                        key: "response$2oxvexs6ogdoj$3",
                      },
                    ],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 35, column: 32 },
                        end: { line: 37, column: 9 },
                      },
                      body: [
                        {
                          type: "ExpressionStatement",
                          loc: {
                            start: { line: 36, column: 10 },
                            end: { line: 36, column: 34 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 36, column: 10 },
                              end: { line: 36, column: 33 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 36, column: 10 },
                                end: { line: 36, column: 18 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 36, column: 10 },
                                  end: { line: 36, column: 14 },
                                },
                                name: "held",
                                key: "held$2oxvexs6ogdoj$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 36, column: 15 },
                                  end: { line: 36, column: 18 },
                                },
                                name: "set",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [
                              {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 36, column: 19 },
                                  end: { line: 36, column: 32 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 36, column: 19 },
                                    end: { line: 36, column: 27 },
                                  },
                                  name: "response",
                                  key: "response$2oxvexs6ogdoj$3",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 36, column: 28 },
                                    end: { line: 36, column: 32 },
                                  },
                                  name: "text",
                                },
                                computed: false,
                                optional: false,
                              },
                            ],
                            optional: false,
                          },
                        },
                      ],
                    },
                    expression: false,
                  },
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 38, column: 8 },
                      end: { line: 40, column: 9 },
                    },
                    params: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 38, column: 9 },
                          end: { line: 38, column: 16 },
                        },
                        name: "message",
                        key: "message$2oxvexs6ogdoj$4",
                      },
                    ],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 38, column: 29 },
                        end: { line: 40, column: 9 },
                      },
                      body: [
                        {
                          type: "ExpressionStatement",
                          loc: {
                            start: { line: 39, column: 10 },
                            end: { line: 39, column: 28 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 39, column: 10 },
                              end: { line: 39, column: 27 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 39, column: 10 },
                                end: { line: 39, column: 18 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 39, column: 10 },
                                  end: { line: 39, column: 14 },
                                },
                                name: "held",
                                key: "held$2oxvexs6ogdoj$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 39, column: 15 },
                                  end: { line: 39, column: 18 },
                                },
                                name: "set",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [
                              {
                                type: "Identifier",
                                loc: {
                                  start: { line: 39, column: 19 },
                                  end: { line: 39, column: 26 },
                                },
                                name: "message",
                                key: "message$2oxvexs6ogdoj$4",
                              },
                            ],
                            optional: false,
                          },
                        },
                      ],
                    },
                    expression: false,
                  },
                  {
                    type: "ObjectExpression",
                    loc: {
                      start: { line: 41, column: 8 },
                      end: { line: 45, column: 9 },
                    },
                    properties: [
                      {
                        type: "Property",
                        loc: {
                          start: { line: 42, column: 10 },
                          end: { line: 42, column: 24 },
                        },
                        key: {
                          type: "Identifier",
                          loc: {
                            start: { line: 42, column: 10 },
                            end: { line: 42, column: 16 },
                          },
                          name: "method",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 42, column: 18 },
                            end: { line: 42, column: 24 },
                          },
                          value: "POST",
                        },
                        kind: "init",
                        computed: false,
                        method: false,
                        shorthand: false,
                      },
                      {
                        type: "Property",
                        loc: {
                          start: { line: 43, column: 10 },
                          end: { line: 43, column: 57 },
                        },
                        key: {
                          type: "Identifier",
                          loc: {
                            start: { line: 43, column: 10 },
                            end: { line: 43, column: 17 },
                          },
                          name: "headers",
                        },
                        value: {
                          type: "ObjectExpression",
                          loc: {
                            start: { line: 43, column: 19 },
                            end: { line: 43, column: 57 },
                          },
                          properties: [
                            {
                              type: "Property",
                              loc: {
                                start: { line: 43, column: 21 },
                                end: { line: 43, column: 55 },
                              },
                              key: {
                                type: "Literal",
                                loc: {
                                  start: { line: 43, column: 21 },
                                  end: { line: 43, column: 35 },
                                },
                                value: "content-type",
                              },
                              value: {
                                type: "Literal",
                                loc: {
                                  start: { line: 43, column: 37 },
                                  end: { line: 43, column: 55 },
                                },
                                value: "application/json",
                              },
                              kind: "init",
                              computed: false,
                              method: false,
                              shorthand: false,
                            },
                          ],
                        },
                        kind: "init",
                        computed: false,
                        method: false,
                        shorthand: false,
                      },
                      {
                        type: "Property",
                        loc: {
                          start: { line: 44, column: 10 },
                          end: { line: 44, column: 68 },
                        },
                        key: {
                          type: "Identifier",
                          loc: {
                            start: { line: 44, column: 10 },
                            end: { line: 44, column: 14 },
                          },
                          name: "body",
                        },
                        value: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 44, column: 16 },
                            end: { line: 44, column: 68 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 44, column: 16 },
                              end: { line: 44, column: 30 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 44, column: 16 },
                                end: { line: 44, column: 20 },
                              },
                              name: "JSON",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 44, column: 21 },
                                end: { line: 44, column: 30 },
                              },
                              name: "stringify",
                            },
                            computed: false,
                            optional: false,
                          },
                          arguments: [
                            {
                              type: "ObjectExpression",
                              loc: {
                                start: { line: 44, column: 31 },
                                end: { line: 44, column: 67 },
                              },
                              properties: [
                                {
                                  type: "Property",
                                  loc: {
                                    start: { line: 44, column: 33 },
                                    end: { line: 44, column: 51 },
                                  },
                                  key: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 44, column: 33 },
                                      end: { line: 44, column: 37 },
                                    },
                                    name: "name",
                                  },
                                  value: {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 44, column: 39 },
                                      end: { line: 44, column: 51 },
                                    },
                                    value: "Math.trunc",
                                  },
                                  kind: "init",
                                  computed: false,
                                  method: false,
                                  shorthand: false,
                                },
                                {
                                  type: "Property",
                                  loc: {
                                    start: { line: 44, column: 53 },
                                    end: { line: 44, column: 65 },
                                  },
                                  key: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 44, column: 53 },
                                      end: { line: 44, column: 59 },
                                    },
                                    name: "passed",
                                  },
                                  value: {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 44, column: 61 },
                                      end: { line: 44, column: 65 },
                                    },
                                    value: true,
                                  },
                                  kind: "init",
                                  computed: false,
                                  method: false,
                                  shorthand: false,
                                },
                              ],
                            },
                          ],
                          optional: false,
                        },
                        kind: "init",
                        computed: false,
                        method: false,
                        shorthand: false,
                      },
                    ],
                  },
                ],
                optional: false,
              },
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 48, column: 6 },
                end: { line: 48, column: 24 },
              },
              argument: {
                type: "CallExpression",
                loc: {
                  start: { line: 48, column: 13 },
                  end: { line: 48, column: 23 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 48, column: 13 },
                    end: { line: 48, column: 21 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 48, column: 13 },
                      end: { line: 48, column: 17 },
                    },
                    name: "held",
                    key: "held$2oxvexs6ogdoj$0",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 48, column: 18 },
                      end: { line: 48, column: 21 },
                    },
                    name: "get",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [],
                optional: false,
              },
            },
          ],
        },
        expression: false,
      }),
    ),
  );
});
