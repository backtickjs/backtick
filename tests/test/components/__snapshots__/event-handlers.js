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
      { start: { line: 15, column: 4 }, end: { line: 36, column: 6 } },
      {
        filePath: "components/event-handlers.test.tsx",
        fileHash: "33yj2jmcqxbde",
        splices: { $state: { value: state, params: [] } },
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 15, column: 7 }, end: { line: 36, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 16, column: 6 },
              end: { line: 16, column: 30 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 16, column: 12 },
                  end: { line: 16, column: 29 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 16, column: 12 },
                    end: { line: 16, column: 16 },
                  },
                  name: "said",
                  key: "said$33yj2jmcqxbde$0",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 16, column: 19 },
                    end: { line: 16, column: 29 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 16, column: 19 },
                      end: { line: 16, column: 25 },
                    },
                    key: "$state",
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 16, column: 26 },
                        end: { line: 16, column: 28 },
                      },
                      value: "",
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 35, column: 8 },
            },
            argument: {
              type: "JSXElement",
              loc: {
                start: { line: 19, column: 8 },
                end: { line: 34, column: 15 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 19, column: 8 },
                  end: { line: 24, column: 9 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 19, column: 9 },
                    end: { line: 19, column: 13 },
                  },
                  name: "form",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 20, column: 10 },
                      end: { line: 23, column: 12 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 20, column: 10 },
                        end: { line: 20, column: 18 },
                      },
                      name: "onsubmit",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 20, column: 19 },
                        end: { line: 23, column: 12 },
                      },
                      expression: {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 20, column: 20 },
                          end: { line: 23, column: 11 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 20, column: 21 },
                              end: { line: 20, column: 26 },
                            },
                            name: "event",
                            key: "event$33yj2jmcqxbde$1",
                          },
                        ],
                        body: {
                          type: "BlockStatement",
                          loc: {
                            start: { line: 20, column: 31 },
                            end: { line: 23, column: 11 },
                          },
                          body: [
                            {
                              type: "ExpressionStatement",
                              loc: {
                                start: { line: 21, column: 12 },
                                end: { line: 21, column: 35 },
                              },
                              expression: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 21, column: 12 },
                                  end: { line: 21, column: 34 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 21, column: 12 },
                                    end: { line: 21, column: 32 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 21, column: 12 },
                                      end: { line: 21, column: 17 },
                                    },
                                    name: "event",
                                    key: "event$33yj2jmcqxbde$1",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 21, column: 18 },
                                      end: { line: 21, column: 32 },
                                    },
                                    name: "preventDefault",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [],
                                optional: false,
                              },
                            },
                            {
                              type: "ExpressionStatement",
                              loc: {
                                start: { line: 22, column: 12 },
                                end: { line: 22, column: 58 },
                              },
                              expression: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 22, column: 12 },
                                  end: { line: 22, column: 57 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 22, column: 12 },
                                    end: { line: 22, column: 20 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 22, column: 12 },
                                      end: { line: 22, column: 16 },
                                    },
                                    name: "said",
                                    key: "said$33yj2jmcqxbde$0",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 22, column: 17 },
                                      end: { line: 22, column: 20 },
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
                                      start: { line: 22, column: 21 },
                                      end: { line: 22, column: 56 },
                                    },
                                    operator: "+",
                                    left: {
                                      type: "BinaryExpression",
                                      loc: {
                                        start: { line: 22, column: 21 },
                                        end: { line: 22, column: 37 },
                                      },
                                      operator: "+",
                                      left: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 22, column: 21 },
                                          end: { line: 22, column: 31 },
                                        },
                                        object: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 22, column: 21 },
                                            end: { line: 22, column: 26 },
                                          },
                                          name: "event",
                                          key: "event$33yj2jmcqxbde$1",
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 22, column: 27 },
                                            end: { line: 22, column: 31 },
                                          },
                                          name: "type",
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
                                        value: " ",
                                      },
                                    },
                                    right: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 22, column: 40 },
                                        end: { line: 22, column: 56 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 22, column: 40 },
                                          end: { line: 22, column: 45 },
                                        },
                                        name: "event",
                                        key: "event$33yj2jmcqxbde$1",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 22, column: 46 },
                                          end: { line: 22, column: 56 },
                                        },
                                        name: "cancelable",
                                      },
                                      computed: false,
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
                    },
                  },
                ],
                selfClosing: false,
              },
              children: [
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 25, column: 10 },
                    end: { line: 25, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 25, column: 10 },
                    end: { line: 25, column: 79 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 25, column: 10 },
                      end: { line: 25, column: 79 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 25, column: 11 },
                        end: { line: 25, column: 19 },
                      },
                      name: "textarea",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 25, column: 20 },
                          end: { line: 25, column: 76 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 25, column: 20 },
                            end: { line: 25, column: 27 },
                          },
                          name: "oninput",
                        },
                        value: {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 25, column: 28 },
                            end: { line: 25, column: 76 },
                          },
                          expression: {
                            type: "ArrowFunctionExpression",
                            loc: {
                              start: { line: 25, column: 29 },
                              end: { line: 25, column: 75 },
                            },
                            params: [
                              {
                                type: "Identifier",
                                loc: {
                                  start: { line: 25, column: 30 },
                                  end: { line: 25, column: 35 },
                                },
                                name: "event",
                                key: "event$33yj2jmcqxbde$2",
                              },
                            ],
                            body: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 25, column: 40 },
                                end: { line: 25, column: 75 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 25, column: 40 },
                                  end: { line: 25, column: 48 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 25, column: 40 },
                                    end: { line: 25, column: 44 },
                                  },
                                  name: "said",
                                  key: "said$33yj2jmcqxbde$0",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 25, column: 45 },
                                    end: { line: 25, column: 48 },
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
                                    start: { line: 25, column: 49 },
                                    end: { line: 25, column: 74 },
                                  },
                                  object: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 25, column: 49 },
                                      end: { line: 25, column: 68 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 25, column: 49 },
                                        end: { line: 25, column: 54 },
                                      },
                                      name: "event",
                                      key: "event$33yj2jmcqxbde$2",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 25, column: 55 },
                                        end: { line: 25, column: 68 },
                                      },
                                      name: "currentTarget",
                                    },
                                    computed: false,
                                    optional: false,
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 25, column: 69 },
                                      end: { line: 25, column: 74 },
                                    },
                                    name: "value",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                              ],
                              optional: false,
                            },
                            expression: true,
                          },
                        },
                      },
                    ],
                    selfClosing: true,
                  },
                  children: [],
                  closingElement: null,
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 26, column: 10 },
                    end: { line: 26, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 26, column: 10 },
                    end: { line: 26, column: 76 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 26, column: 10 },
                      end: { line: 26, column: 76 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 26, column: 11 },
                        end: { line: 26, column: 16 },
                      },
                      name: "input",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 26, column: 17 },
                          end: { line: 26, column: 73 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 26, column: 17 },
                            end: { line: 26, column: 24 },
                          },
                          name: "oninput",
                        },
                        value: {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 26, column: 25 },
                            end: { line: 26, column: 73 },
                          },
                          expression: {
                            type: "ArrowFunctionExpression",
                            loc: {
                              start: { line: 26, column: 26 },
                              end: { line: 26, column: 72 },
                            },
                            params: [
                              {
                                type: "Identifier",
                                loc: {
                                  start: { line: 26, column: 27 },
                                  end: { line: 26, column: 32 },
                                },
                                name: "event",
                                key: "event$33yj2jmcqxbde$3",
                              },
                            ],
                            body: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 26, column: 37 },
                                end: { line: 26, column: 72 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 26, column: 37 },
                                  end: { line: 26, column: 45 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 26, column: 37 },
                                    end: { line: 26, column: 41 },
                                  },
                                  name: "said",
                                  key: "said$33yj2jmcqxbde$0",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 26, column: 42 },
                                    end: { line: 26, column: 45 },
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
                                    start: { line: 26, column: 46 },
                                    end: { line: 26, column: 71 },
                                  },
                                  object: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 26, column: 46 },
                                      end: { line: 26, column: 65 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 26, column: 46 },
                                        end: { line: 26, column: 51 },
                                      },
                                      name: "event",
                                      key: "event$33yj2jmcqxbde$3",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 26, column: 52 },
                                        end: { line: 26, column: 65 },
                                      },
                                      name: "currentTarget",
                                    },
                                    computed: false,
                                    optional: false,
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 26, column: 66 },
                                      end: { line: 26, column: 71 },
                                    },
                                    name: "value",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                              ],
                              optional: false,
                            },
                            expression: true,
                          },
                        },
                      },
                    ],
                    selfClosing: true,
                  },
                  children: [],
                  closingElement: null,
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 27, column: 10 },
                    end: { line: 27, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 27, column: 10 },
                    end: { line: 33, column: 19 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 27, column: 10 },
                      end: { line: 31, column: 11 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 27, column: 11 },
                        end: { line: 27, column: 17 },
                      },
                      name: "button",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 28, column: 12 },
                          end: { line: 30, column: 13 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 28, column: 12 },
                            end: { line: 28, column: 19 },
                          },
                          name: "onclick",
                        },
                        value: {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 28, column: 20 },
                            end: { line: 30, column: 13 },
                          },
                          expression: {
                            type: "ArrowFunctionExpression",
                            loc: {
                              start: { line: 28, column: 21 },
                              end: { line: 29, column: 73 },
                            },
                            params: [
                              {
                                type: "Identifier",
                                loc: {
                                  start: { line: 28, column: 22 },
                                  end: { line: 28, column: 27 },
                                },
                                name: "event",
                                key: "event$33yj2jmcqxbde$4",
                              },
                            ],
                            body: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 29, column: 14 },
                                end: { line: 29, column: 73 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 29, column: 14 },
                                  end: { line: 29, column: 22 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 29, column: 14 },
                                    end: { line: 29, column: 18 },
                                  },
                                  name: "said",
                                  key: "said$33yj2jmcqxbde$0",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 29, column: 19 },
                                    end: { line: 29, column: 22 },
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
                                    start: { line: 29, column: 23 },
                                    end: { line: 29, column: 72 },
                                  },
                                  operator: "+",
                                  left: {
                                    type: "BinaryExpression",
                                    loc: {
                                      start: { line: 29, column: 23 },
                                      end: { line: 29, column: 42 },
                                    },
                                    operator: "+",
                                    left: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 29, column: 23 },
                                        end: { line: 29, column: 36 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 29, column: 23 },
                                          end: { line: 29, column: 28 },
                                        },
                                        name: "event",
                                        key: "event$33yj2jmcqxbde$4",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 29, column: 29 },
                                          end: { line: 29, column: 36 },
                                        },
                                        name: "clientX",
                                      },
                                      computed: false,
                                      optional: false,
                                    },
                                    right: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 29, column: 39 },
                                        end: { line: 29, column: 42 },
                                      },
                                      value: " ",
                                    },
                                  },
                                  right: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 29, column: 45 },
                                      end: { line: 29, column: 72 },
                                    },
                                    object: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 29, column: 45 },
                                        end: { line: 29, column: 64 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 29, column: 45 },
                                          end: { line: 29, column: 50 },
                                        },
                                        name: "event",
                                        key: "event$33yj2jmcqxbde$4",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 29, column: 51 },
                                          end: { line: 29, column: 64 },
                                        },
                                        name: "currentTarget",
                                      },
                                      computed: false,
                                      optional: false,
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 29, column: 65 },
                                        end: { line: 29, column: 72 },
                                      },
                                      name: "tagName",
                                    },
                                    computed: false,
                                    optional: false,
                                  },
                                },
                              ],
                              optional: false,
                            },
                            expression: true,
                          },
                        },
                      },
                    ],
                    selfClosing: false,
                  },
                  children: [
                    {
                      type: "JSXText",
                      loc: {
                        start: { line: 32, column: 12 },
                        end: { line: 32, column: 12 },
                      },
                      value: "\n            ",
                      raw: "\n            ",
                    },
                    {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 32, column: 12 },
                        end: { line: 32, column: 24 },
                      },
                      expression: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 32, column: 13 },
                          end: { line: 32, column: 23 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 32, column: 13 },
                            end: { line: 32, column: 21 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 32, column: 13 },
                              end: { line: 32, column: 17 },
                            },
                            name: "said",
                            key: "said$33yj2jmcqxbde$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 32, column: 18 },
                              end: { line: 32, column: 21 },
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
                    {
                      type: "JSXText",
                      loc: {
                        start: { line: 33, column: 10 },
                        end: { line: 33, column: 10 },
                      },
                      value: "\n          ",
                      raw: "\n          ",
                    },
                  ],
                  closingElement: {
                    type: "JSXClosingElement",
                    loc: {
                      start: { line: 33, column: 10 },
                      end: { line: 33, column: 19 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 33, column: 12 },
                        end: { line: 33, column: 18 },
                      },
                      name: "button",
                    },
                  },
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 34, column: 8 },
                    end: { line: 34, column: 8 },
                  },
                  value: "\n        ",
                  raw: "\n        ",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 34, column: 8 },
                  end: { line: 34, column: 15 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 34, column: 10 },
                    end: { line: 34, column: 14 },
                  },
                  name: "form",
                },
              },
            },
          },
        ],
      }),
      '$0 => {\n    const said = $0()("");\n    return (<form onsubmit={(event) => {\n            event.preventDefault();\n            said.set(event.type + " " + event.cancelable);\n        }}>\n          <textarea oninput={(event) => said.set(event.currentTarget.value)}/>\n          <input oninput={(event) => said.set(event.currentTarget.value)}/>\n          <button onclick={(event) => said.set(event.clientX + " " + event.currentTarget.tagName)}>\n            {said.get()}\n          </button>\n        </form>);\n}',
      '{"version":3,"file":"event-handlers.test.jsx","sourceRoot":"","sources":["event-handlers.test.tsx"],"names":[],"mappings":"AAcO;IACD,MAAM,IAAI,GAAG,IAAM,CAAC,EAAE,CAAC,CAAC;IAExB,OAAO,CACL,CAAC,IAAI,CACH,QAAQ,CAAC,CAAC,CAAC,KAAK,EAAE,EAAE;YAClB,KAAK,CAAC,cAAc,EAAE,CAAC;YACvB,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,IAAI,GAAG,GAAG,GAAG,KAAK,CAAC,UAAU,CAAC,CAAC;QAChD,CAAC,CAAC,CAEF;UAAA,CAAC,QAAQ,CAAC,OAAO,CAAC,CAAC,CAAC,KAAK,EAAE,EAAE,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,aAAa,CAAC,KAAK,CAAC,CAAC,EAClE;UAAA,CAAC,KAAK,CAAC,OAAO,CAAC,CAAC,CAAC,KAAK,EAAE,EAAE,CAAC,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,aAAa,CAAC,KAAK,CAAC,CAAC,EAC/D;UAAA,CAAC,MAAM,CACL,OAAO,CAAC,CAAC,CAAC,KAAK,EAAE,EAAE,CACjB,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,OAAO,GAAG,GAAG,GAAG,KAAK,CAAC,aAAa,CAAC,OAAO,CAC5D,CAAC,CAED;YAAA,CAAC,IAAI,CAAC,GAAG,EAAE,CACb;UAAA,EAAE,MAAM,CACV;QAAA,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC,CAAA"}',
    ),
  );
});
