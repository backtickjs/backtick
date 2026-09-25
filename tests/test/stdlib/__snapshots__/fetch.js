import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { snapshotCase } from "../snapshotCase.ts";
// The platform's own `fetch`: a status is failed on by throwing, and so is a
// body that is not JSON, and either reaches the `catch`.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
it("fetchRequests", async (t) => {
  await snapshotCase(
    t,
    "fetchRequests",
    cs.create(
      "32y7bkpf4sqjs:15:4",
      {
        params: [
          { kind: "splice", value: state, bindings: [] },
          { kind: "splice", value: window, bindings: [] },
        ],
      },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 15, column: 7 }, end: { line: 52, column: 5 } },
        params: [],
        body: {
          type: "BlockStatement",
          loc: {
            start: { line: 15, column: 13 },
            end: { line: 52, column: 5 },
          },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 16, column: 6 },
                end: { line: 16, column: 37 },
              },
              kind: "const",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 16, column: 12 },
                    end: { line: 16, column: 36 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 16, column: 12 },
                      end: { line: 16, column: 16 },
                    },
                    name: "held",
                    key: "held$32y7bkpf4sqjs$0",
                  },
                  init: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 16, column: 19 },
                      end: { line: 16, column: 36 },
                    },
                    callee: {
                      type: "Splice",
                      loc: {
                        start: { line: 16, column: 19 },
                        end: { line: 16, column: 25 },
                      },
                      param: 0,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 16, column: 26 },
                          end: { line: 16, column: 35 },
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
                start: { line: 18, column: 6 },
                end: { line: 33, column: 11 },
              },
              expression: {
                type: "CallExpression",
                loc: {
                  start: { line: 18, column: 6 },
                  end: { line: 33, column: 10 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 18, column: 6 },
                    end: { line: 31, column: 14 },
                  },
                  object: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 18, column: 6 },
                      end: { line: 30, column: 10 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 18, column: 6 },
                        end: { line: 28, column: 13 },
                      },
                      object: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 18, column: 6 },
                          end: { line: 27, column: 10 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 18, column: 6 },
                            end: { line: 22, column: 13 },
                          },
                          object: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 18, column: 6 },
                              end: { line: 21, column: 10 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 18, column: 6 },
                                end: { line: 19, column: 14 },
                              },
                              object: {
                                type: "Splice",
                                loc: {
                                  start: { line: 18, column: 6 },
                                  end: { line: 18, column: 13 },
                                },
                                param: 1,
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 19, column: 9 },
                                  end: { line: 19, column: 14 },
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
                                  start: { line: 19, column: 15 },
                                  end: { line: 19, column: 63 },
                                },
                                value:
                                  "/cases/built-ins/Math/trunc/Math.trunc_Success",
                              },
                              {
                                type: "ObjectExpression",
                                loc: {
                                  start: { line: 19, column: 65 },
                                  end: { line: 21, column: 9 },
                                },
                                properties: [
                                  {
                                    type: "Property",
                                    loc: {
                                      start: { line: 20, column: 10 },
                                      end: { line: 20, column: 51 },
                                    },
                                    key: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 20, column: 10 },
                                        end: { line: 20, column: 16 },
                                      },
                                      name: "signal",
                                    },
                                    value: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 20, column: 18 },
                                        end: { line: 20, column: 51 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 20, column: 18 },
                                          end: { line: 20, column: 45 },
                                        },
                                        object: {
                                          type: "MemberExpression",
                                          loc: {
                                            start: { line: 20, column: 18 },
                                            end: { line: 20, column: 37 },
                                          },
                                          object: {
                                            type: "Splice",
                                            loc: {
                                              start: { line: 20, column: 18 },
                                              end: { line: 20, column: 25 },
                                            },
                                            param: 1,
                                          },
                                          property: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 20, column: 26 },
                                              end: { line: 20, column: 37 },
                                            },
                                            name: "AbortSignal",
                                          },
                                          computed: false,
                                          optional: false,
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 20, column: 38 },
                                            end: { line: 20, column: 45 },
                                          },
                                          name: "timeout",
                                        },
                                        computed: false,
                                        optional: false,
                                      },
                                      arguments: [
                                        {
                                          type: "Literal",
                                          loc: {
                                            start: { line: 20, column: 46 },
                                            end: { line: 20, column: 50 },
                                          },
                                          value: 3000,
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
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 22, column: 9 },
                              end: { line: 22, column: 13 },
                            },
                            name: "then",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "ArrowFunctionExpression",
                            loc: {
                              start: { line: 22, column: 14 },
                              end: { line: 27, column: 9 },
                            },
                            params: [
                              {
                                type: "Identifier",
                                loc: {
                                  start: { line: 22, column: 15 },
                                  end: { line: 22, column: 23 },
                                },
                                name: "response",
                                key: "response$32y7bkpf4sqjs$1",
                              },
                            ],
                            body: {
                              type: "BlockStatement",
                              loc: {
                                start: { line: 22, column: 38 },
                                end: { line: 27, column: 9 },
                              },
                              body: [
                                {
                                  type: "IfStatement",
                                  loc: {
                                    start: { line: 23, column: 10 },
                                    end: { line: 25, column: 11 },
                                  },
                                  test: {
                                    type: "BinaryExpression",
                                    loc: {
                                      start: { line: 23, column: 14 },
                                      end: { line: 23, column: 37 },
                                    },
                                    operator: "!==",
                                    left: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 23, column: 14 },
                                        end: { line: 23, column: 29 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 23, column: 14 },
                                          end: { line: 23, column: 22 },
                                        },
                                        name: "response",
                                        key: "response$32y7bkpf4sqjs$1",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 23, column: 23 },
                                          end: { line: 23, column: 29 },
                                        },
                                        name: "status",
                                      },
                                      computed: false,
                                      optional: false,
                                    },
                                    right: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 23, column: 34 },
                                        end: { line: 23, column: 37 },
                                      },
                                      value: 200,
                                    },
                                  },
                                  consequent: {
                                    type: "BlockStatement",
                                    loc: {
                                      start: { line: 23, column: 39 },
                                      end: { line: 25, column: 11 },
                                    },
                                    body: [
                                      {
                                        type: "ThrowStatement",
                                        loc: {
                                          start: { line: 24, column: 12 },
                                          end: { line: 24, column: 48 },
                                        },
                                        argument: {
                                          type: "BinaryExpression",
                                          loc: {
                                            start: { line: 24, column: 18 },
                                            end: { line: 24, column: 47 },
                                          },
                                          operator: "+",
                                          left: {
                                            type: "Literal",
                                            loc: {
                                              start: { line: 24, column: 18 },
                                              end: { line: 24, column: 29 },
                                            },
                                            value: "answered ",
                                          },
                                          right: {
                                            type: "MemberExpression",
                                            loc: {
                                              start: { line: 24, column: 32 },
                                              end: { line: 24, column: 47 },
                                            },
                                            object: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 24, column: 32 },
                                                end: { line: 24, column: 40 },
                                              },
                                              name: "response",
                                              key: "response$32y7bkpf4sqjs$1",
                                            },
                                            property: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 24, column: 41 },
                                                end: { line: 24, column: 47 },
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
                                  type: "ReturnStatement",
                                  loc: {
                                    start: { line: 26, column: 10 },
                                    end: { line: 26, column: 33 },
                                  },
                                  argument: {
                                    type: "CallExpression",
                                    loc: {
                                      start: { line: 26, column: 17 },
                                      end: { line: 26, column: 32 },
                                    },
                                    callee: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 26, column: 17 },
                                        end: { line: 26, column: 30 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 26, column: 17 },
                                          end: { line: 26, column: 25 },
                                        },
                                        name: "response",
                                        key: "response$32y7bkpf4sqjs$1",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 26, column: 26 },
                                          end: { line: 26, column: 30 },
                                        },
                                        name: "json",
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
                          },
                        ],
                        optional: false,
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 28, column: 9 },
                          end: { line: 28, column: 13 },
                        },
                        name: "then",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 28, column: 14 },
                          end: { line: 30, column: 9 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 28, column: 15 },
                              end: { line: 28, column: 20 },
                            },
                            name: "value",
                            key: "value$32y7bkpf4sqjs$2",
                          },
                        ],
                        body: {
                          type: "BlockStatement",
                          loc: {
                            start: { line: 28, column: 34 },
                            end: { line: 30, column: 9 },
                          },
                          body: [
                            {
                              type: "ExpressionStatement",
                              loc: {
                                start: { line: 29, column: 10 },
                                end: { line: 29, column: 56 },
                              },
                              expression: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 29, column: 10 },
                                  end: { line: 29, column: 55 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 29, column: 10 },
                                    end: { line: 29, column: 18 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 29, column: 10 },
                                      end: { line: 29, column: 14 },
                                    },
                                    name: "held",
                                    key: "held$32y7bkpf4sqjs$0",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 29, column: 15 },
                                      end: { line: 29, column: 18 },
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
                                      start: { line: 29, column: 19 },
                                      end: { line: 29, column: 54 },
                                    },
                                    test: {
                                      type: "BinaryExpression",
                                      loc: {
                                        start: { line: 29, column: 19 },
                                        end: { line: 29, column: 33 },
                                      },
                                      operator: "===",
                                      left: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 29, column: 19 },
                                          end: { line: 29, column: 24 },
                                        },
                                        name: "value",
                                        key: "value$32y7bkpf4sqjs$2",
                                      },
                                      right: {
                                        type: "Literal",
                                        loc: {
                                          start: { line: 29, column: 29 },
                                          end: { line: 29, column: 33 },
                                        },
                                        value: null,
                                      },
                                    },
                                    consequent: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 29, column: 36 },
                                        end: { line: 29, column: 42 },
                                      },
                                      value: "null",
                                    },
                                    alternate: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 29, column: 45 },
                                        end: { line: 29, column: 54 },
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
                    ],
                    optional: false,
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 31, column: 9 },
                      end: { line: 31, column: 14 },
                    },
                    name: "catch",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 31, column: 15 },
                      end: { line: 33, column: 9 },
                    },
                    params: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 31, column: 16 },
                          end: { line: 31, column: 21 },
                        },
                        name: "error",
                        key: "error$32y7bkpf4sqjs$3",
                      },
                    ],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 31, column: 35 },
                        end: { line: 33, column: 9 },
                      },
                      body: [
                        {
                          type: "ExpressionStatement",
                          loc: {
                            start: { line: 32, column: 10 },
                            end: { line: 32, column: 48 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 32, column: 10 },
                              end: { line: 32, column: 47 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 32, column: 10 },
                                end: { line: 32, column: 18 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 32, column: 10 },
                                  end: { line: 32, column: 14 },
                                },
                                name: "held",
                                key: "held$32y7bkpf4sqjs$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 32, column: 15 },
                                  end: { line: 32, column: 18 },
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
                                  start: { line: 32, column: 19 },
                                  end: { line: 32, column: 46 },
                                },
                                operator: "+",
                                left: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 32, column: 19 },
                                    end: { line: 32, column: 30 },
                                  },
                                  value: "failed \u2014 ",
                                },
                                right: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 32, column: 33 },
                                    end: { line: 32, column: 46 },
                                  },
                                  callee: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 32, column: 33 },
                                      end: { line: 32, column: 39 },
                                    },
                                    name: "String",
                                  },
                                  arguments: [
                                    {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 32, column: 40 },
                                        end: { line: 32, column: 45 },
                                      },
                                      name: "error",
                                      key: "error$32y7bkpf4sqjs$3",
                                    },
                                  ],
                                  optional: false,
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
                ],
                optional: false,
              },
            },
            {
              type: "ExpressionStatement",
              loc: {
                start: { line: 35, column: 6 },
                end: { line: 49, column: 10 },
              },
              expression: {
                type: "CallExpression",
                loc: {
                  start: { line: 35, column: 6 },
                  end: { line: 49, column: 9 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 35, column: 6 },
                    end: { line: 42, column: 13 },
                  },
                  object: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 35, column: 6 },
                      end: { line: 41, column: 54 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 35, column: 6 },
                        end: { line: 41, column: 13 },
                      },
                      object: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 35, column: 6 },
                          end: { line: 40, column: 10 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 35, column: 6 },
                            end: { line: 36, column: 14 },
                          },
                          object: {
                            type: "Splice",
                            loc: {
                              start: { line: 35, column: 6 },
                              end: { line: 35, column: 13 },
                            },
                            param: 1,
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 36, column: 9 },
                              end: { line: 36, column: 14 },
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
                              start: { line: 36, column: 15 },
                              end: { line: 36, column: 23 },
                            },
                            value: "/cases",
                          },
                          {
                            type: "ObjectExpression",
                            loc: {
                              start: { line: 36, column: 25 },
                              end: { line: 40, column: 9 },
                            },
                            properties: [
                              {
                                type: "Property",
                                loc: {
                                  start: { line: 37, column: 10 },
                                  end: { line: 37, column: 24 },
                                },
                                key: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 37, column: 10 },
                                    end: { line: 37, column: 16 },
                                  },
                                  name: "method",
                                },
                                value: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 37, column: 18 },
                                    end: { line: 37, column: 24 },
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
                                  start: { line: 38, column: 10 },
                                  end: { line: 38, column: 57 },
                                },
                                key: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 38, column: 10 },
                                    end: { line: 38, column: 17 },
                                  },
                                  name: "headers",
                                },
                                value: {
                                  type: "ObjectExpression",
                                  loc: {
                                    start: { line: 38, column: 19 },
                                    end: { line: 38, column: 57 },
                                  },
                                  properties: [
                                    {
                                      type: "Property",
                                      loc: {
                                        start: { line: 38, column: 21 },
                                        end: { line: 38, column: 55 },
                                      },
                                      key: {
                                        type: "Literal",
                                        loc: {
                                          start: { line: 38, column: 21 },
                                          end: { line: 38, column: 35 },
                                        },
                                        value: "content-type",
                                      },
                                      value: {
                                        type: "Literal",
                                        loc: {
                                          start: { line: 38, column: 37 },
                                          end: { line: 38, column: 55 },
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
                                  start: { line: 39, column: 10 },
                                  end: { line: 39, column: 68 },
                                },
                                key: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 39, column: 10 },
                                    end: { line: 39, column: 14 },
                                  },
                                  name: "body",
                                },
                                value: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 39, column: 16 },
                                    end: { line: 39, column: 68 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 39, column: 16 },
                                      end: { line: 39, column: 30 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 39, column: 16 },
                                        end: { line: 39, column: 20 },
                                      },
                                      name: "JSON",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 39, column: 21 },
                                        end: { line: 39, column: 30 },
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
                                        start: { line: 39, column: 31 },
                                        end: { line: 39, column: 67 },
                                      },
                                      properties: [
                                        {
                                          type: "Property",
                                          loc: {
                                            start: { line: 39, column: 33 },
                                            end: { line: 39, column: 51 },
                                          },
                                          key: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 39, column: 33 },
                                              end: { line: 39, column: 37 },
                                            },
                                            name: "name",
                                          },
                                          value: {
                                            type: "Literal",
                                            loc: {
                                              start: { line: 39, column: 39 },
                                              end: { line: 39, column: 51 },
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
                                            start: { line: 39, column: 53 },
                                            end: { line: 39, column: 65 },
                                          },
                                          key: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 39, column: 53 },
                                              end: { line: 39, column: 59 },
                                            },
                                            name: "passed",
                                          },
                                          value: {
                                            type: "Literal",
                                            loc: {
                                              start: { line: 39, column: 61 },
                                              end: { line: 39, column: 65 },
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
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 41, column: 9 },
                          end: { line: 41, column: 13 },
                        },
                        name: "then",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 41, column: 14 },
                          end: { line: 41, column: 53 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 41, column: 15 },
                              end: { line: 41, column: 23 },
                            },
                            name: "response",
                            key: "response$32y7bkpf4sqjs$4",
                          },
                        ],
                        body: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 41, column: 38 },
                            end: { line: 41, column: 53 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 41, column: 38 },
                              end: { line: 41, column: 51 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 41, column: 38 },
                                end: { line: 41, column: 46 },
                              },
                              name: "response",
                              key: "response$32y7bkpf4sqjs$4",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 41, column: 47 },
                                end: { line: 41, column: 51 },
                              },
                              name: "text",
                            },
                            computed: false,
                            optional: false,
                          },
                          arguments: [],
                          optional: false,
                        },
                        expression: true,
                      },
                    ],
                    optional: false,
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 42, column: 9 },
                      end: { line: 42, column: 13 },
                    },
                    name: "then",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 43, column: 10 },
                      end: { line: 45, column: 11 },
                    },
                    params: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 43, column: 11 },
                          end: { line: 43, column: 15 },
                        },
                        name: "text",
                        key: "text$32y7bkpf4sqjs$5",
                      },
                    ],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 43, column: 28 },
                        end: { line: 45, column: 11 },
                      },
                      body: [
                        {
                          type: "ExpressionStatement",
                          loc: {
                            start: { line: 44, column: 12 },
                            end: { line: 44, column: 27 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 44, column: 12 },
                              end: { line: 44, column: 26 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 44, column: 12 },
                                end: { line: 44, column: 20 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 44, column: 12 },
                                  end: { line: 44, column: 16 },
                                },
                                name: "held",
                                key: "held$32y7bkpf4sqjs$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 44, column: 17 },
                                  end: { line: 44, column: 20 },
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
                                  start: { line: 44, column: 21 },
                                  end: { line: 44, column: 25 },
                                },
                                name: "text",
                                key: "text$32y7bkpf4sqjs$5",
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
                      start: { line: 46, column: 10 },
                      end: { line: 48, column: 11 },
                    },
                    params: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 46, column: 11 },
                          end: { line: 46, column: 16 },
                        },
                        name: "error",
                        key: "error$32y7bkpf4sqjs$6",
                      },
                    ],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 46, column: 30 },
                        end: { line: 48, column: 11 },
                      },
                      body: [
                        {
                          type: "ExpressionStatement",
                          loc: {
                            start: { line: 47, column: 12 },
                            end: { line: 47, column: 36 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 47, column: 12 },
                              end: { line: 47, column: 35 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 47, column: 12 },
                                end: { line: 47, column: 20 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 47, column: 12 },
                                  end: { line: 47, column: 16 },
                                },
                                name: "held",
                                key: "held$32y7bkpf4sqjs$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 47, column: 17 },
                                  end: { line: 47, column: 20 },
                                },
                                name: "set",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [
                              {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 47, column: 21 },
                                  end: { line: 47, column: 34 },
                                },
                                callee: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 47, column: 21 },
                                    end: { line: 47, column: 27 },
                                  },
                                  name: "String",
                                },
                                arguments: [
                                  {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 47, column: 28 },
                                      end: { line: 47, column: 33 },
                                    },
                                    name: "error",
                                    key: "error$32y7bkpf4sqjs$6",
                                  },
                                ],
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
                ],
                optional: false,
              },
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 51, column: 6 },
                end: { line: 51, column: 24 },
              },
              argument: {
                type: "CallExpression",
                loc: {
                  start: { line: 51, column: 13 },
                  end: { line: 51, column: 23 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 51, column: 13 },
                    end: { line: 51, column: 21 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 51, column: 13 },
                      end: { line: 51, column: 17 },
                    },
                    name: "held",
                    key: "held$32y7bkpf4sqjs$0",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 51, column: 18 },
                      end: { line: 51, column: 21 },
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
      'export default ($0, $1) => () => {\n    const held = $0()("waiting");\n    $1()\n        .fetch("/cases/built-ins/Math/trunc/Math.trunc_Success", {\n        signal: $1().AbortSignal.timeout(3000),\n    })\n        .then((response) => {\n        if (response.status !== 200) {\n            throw "answered " + response.status;\n        }\n        return response.json();\n    })\n        .then((value) => {\n        held.set(value === null ? "null" : "a value");\n    })\n        .catch((error) => {\n        held.set("failed \u2014 " + String(error));\n    });\n    $1()\n        .fetch("/cases", {\n        method: "POST",\n        headers: { "content-type": "application/json" },\n        body: JSON.stringify({ name: "Math.trunc", passed: true }),\n    })\n        .then((response) => response.text())\n        .then((text) => {\n        held.set(text);\n    }, (error) => {\n        held.set(String(error));\n    });\n    return held.get();\n};',
      '{"version":3,"file":"fetch.test.jsx","sourceRoot":"","sources":["fetch.test.tsx"],"names":[],"mappings":"eAcO,YAAA,GAAG,EAAE;IACN,MAAM,IAAI,GAAG,IAAM,CAAC,SAAS,CAAC,CAAC;IAE/B,IAAO;SACJ,KAAK,CAAC,gDAAgD,EAAE;QACvD,MAAM,EAAE,IAAO,CAAC,WAAW,CAAC,OAAO,CAAC,IAAI,CAAC;KAC1C,CAAC;SACD,IAAI,CAAC,CAAC,QAAkB,EAAE,EAAE;QAC3B,IAAI,QAAQ,CAAC,MAAM,KAAK,GAAG,EAAE,CAAC;YAC5B,MAAM,WAAW,GAAG,QAAQ,CAAC,MAAM,CAAC;QACtC,CAAC;QACD,OAAO,QAAQ,CAAC,IAAI,EAAE,CAAC;IACzB,CAAC,CAAC;SACD,IAAI,CAAC,CAAC,KAAc,EAAE,EAAE;QACvB,IAAI,CAAC,GAAG,CAAC,KAAK,KAAK,IAAI,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC;IAChD,CAAC,CAAC;SACD,KAAK,CAAC,CAAC,KAAc,EAAE,EAAE;QACxB,IAAI,CAAC,GAAG,CAAC,WAAW,GAAG,MAAM,CAAC,KAAK,CAAC,CAAC,CAAC;IACxC,CAAC,CAAC,CAAC;IAEL,IAAO;SACJ,KAAK,CAAC,QAAQ,EAAE;QACf,MAAM,EAAE,MAAM;QACd,OAAO,EAAE,EAAE,cAAc,EAAE,kBAAkB,EAAE;QAC/C,IAAI,EAAE,IAAI,CAAC,SAAS,CAAC,EAAE,IAAI,EAAE,YAAY,EAAE,MAAM,EAAE,IAAI,EAAE,CAAC;KAC3D,CAAC;SACD,IAAI,CAAC,CAAC,QAAkB,EAAE,EAAE,CAAC,QAAQ,CAAC,IAAI,EAAE,CAAC;SAC7C,IAAI,CACH,CAAC,IAAY,EAAE,EAAE;QACf,IAAI,CAAC,GAAG,CAAC,IAAI,CAAC,CAAC;IACjB,CAAC,EACD,CAAC,KAAc,EAAE,EAAE;QACjB,IAAI,CAAC,GAAG,CAAC,MAAM,CAAC,KAAK,CAAC,CAAC,CAAC;IAC1B,CAAC,CACF,CAAC;IAEJ,OAAO,IAAI,CAAC,GAAG,EAAE,CAAC;AACpB,CAAC"}',
    ),
  );
});
