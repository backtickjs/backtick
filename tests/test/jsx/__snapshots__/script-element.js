import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  return cs.create(
    "mvahdj0e0ick:10:9",
    { params: [{ kind: "splice", value: state, bindings: [] }] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 10, column: 12 }, end: { line: 32, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 11, column: 4 },
            end: { line: 11, column: 31 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 11, column: 10 },
                end: { line: 11, column: 30 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 11, column: 10 },
                  end: { line: 11, column: 15 },
                },
                name: "label",
                key: "label$mvahdj0e0ick$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 11, column: 18 },
                  end: { line: 11, column: 30 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 11, column: 18 },
                    end: { line: 11, column: 24 },
                  },
                  param: 0,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 11, column: 25 },
                      end: { line: 11, column: 29 },
                    },
                    value: "hi",
                  },
                ],
                optional: false,
              },
            },
          ],
        },
        {
          type: "VariableDeclaration",
          loc: { start: { line: 15, column: 4 }, end: { line: 29, column: 6 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 15, column: 10 },
                end: { line: 29, column: 5 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 10 },
                  end: { line: 15, column: 13 },
                },
                name: "row",
                key: "row$mvahdj0e0ick$1",
              },
              init: {
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 15, column: 16 },
                  end: { line: 29, column: 5 },
                },
                params: [
                  {
                    type: "Identifier",
                    loc: {
                      start: { line: 15, column: 17 },
                      end: { line: 15, column: 21 },
                    },
                    name: "size",
                    key: "size$mvahdj0e0ick$2",
                  },
                ],
                body: {
                  type: "BlockStatement",
                  loc: {
                    start: { line: 15, column: 34 },
                    end: { line: 29, column: 5 },
                  },
                  body: [
                    {
                      type: "VariableDeclaration",
                      loc: {
                        start: { line: 16, column: 6 },
                        end: { line: 16, column: 46 },
                      },
                      kind: "const",
                      declarations: [
                        {
                          type: "VariableDeclarator",
                          loc: {
                            start: { line: 16, column: 12 },
                            end: { line: 16, column: 45 },
                          },
                          id: {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 12 },
                              end: { line: 16, column: 15 },
                            },
                            name: "css",
                            key: "css$mvahdj0e0ick$3",
                          },
                          init: {
                            type: "BinaryExpression",
                            loc: {
                              start: { line: 16, column: 18 },
                              end: { line: 16, column: 45 },
                            },
                            operator: "+",
                            left: {
                              type: "BinaryExpression",
                              loc: {
                                start: { line: 16, column: 18 },
                                end: { line: 16, column: 38 },
                              },
                              operator: "+",
                              left: {
                                type: "Literal",
                                loc: {
                                  start: { line: 16, column: 18 },
                                  end: { line: 16, column: 31 },
                                },
                                value: "font-size: ",
                              },
                              right: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 16, column: 34 },
                                  end: { line: 16, column: 38 },
                                },
                                name: "size",
                                key: "size$mvahdj0e0ick$2",
                              },
                            },
                            right: {
                              type: "Literal",
                              loc: {
                                start: { line: 16, column: 41 },
                                end: { line: 16, column: 45 },
                              },
                              value: "px",
                            },
                          },
                        },
                      ],
                    },
                    {
                      type: "VariableDeclaration",
                      loc: {
                        start: { line: 17, column: 6 },
                        end: { line: 17, column: 44 },
                      },
                      kind: "const",
                      declarations: [
                        {
                          type: "VariableDeclarator",
                          loc: {
                            start: { line: 17, column: 12 },
                            end: { line: 17, column: 43 },
                          },
                          id: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 12 },
                              end: { line: 17, column: 17 },
                            },
                            name: "press",
                            key: "press$mvahdj0e0ick$4",
                          },
                          init: {
                            type: "ArrowFunctionExpression",
                            loc: {
                              start: { line: 17, column: 20 },
                              end: { line: 17, column: 43 },
                            },
                            params: [],
                            body: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 17, column: 26 },
                                end: { line: 17, column: 43 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 17, column: 26 },
                                  end: { line: 17, column: 35 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 17, column: 26 },
                                    end: { line: 17, column: 31 },
                                  },
                                  name: "label",
                                  key: "label$mvahdj0e0ick$0",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 17, column: 32 },
                                    end: { line: 17, column: 35 },
                                  },
                                  name: "set",
                                },
                                computed: false,
                                optional: false,
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 17, column: 36 },
                                    end: { line: 17, column: 42 },
                                  },
                                  value: "held",
                                },
                              ],
                              optional: false,
                            },
                            expression: true,
                          },
                        },
                      ],
                    },
                    {
                      type: "ReturnStatement",
                      loc: {
                        start: { line: 18, column: 6 },
                        end: { line: 28, column: 8 },
                      },
                      argument: {
                        type: "JSXElement",
                        loc: {
                          start: { line: 19, column: 8 },
                          end: { line: 27, column: 14 },
                        },
                        openingElement: {
                          type: "JSXOpeningElement",
                          loc: {
                            start: { line: 19, column: 8 },
                            end: { line: 19, column: 25 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 19, column: 9 },
                              end: { line: 19, column: 12 },
                            },
                            name: "div",
                          },
                          attributes: [
                            {
                              type: "JSXAttribute",
                              loc: {
                                start: { line: 19, column: 13 },
                                end: { line: 19, column: 24 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 19, column: 13 },
                                  end: { line: 19, column: 18 },
                                },
                                name: "style",
                              },
                              value: {
                                type: "JSXExpressionContainer",
                                loc: {
                                  start: { line: 19, column: 19 },
                                  end: { line: 19, column: 24 },
                                },
                                expression: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 19, column: 20 },
                                    end: { line: 19, column: 23 },
                                  },
                                  name: "css",
                                  key: "css$mvahdj0e0ick$3",
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
                              start: { line: 20, column: 10 },
                              end: { line: 20, column: 10 },
                            },
                            value: "\n          ",
                            raw: "\n          ",
                          },
                          {
                            type: "JSXElement",
                            loc: {
                              start: { line: 20, column: 10 },
                              end: { line: 22, column: 17 },
                            },
                            openingElement: {
                              type: "JSXOpeningElement",
                              loc: {
                                start: { line: 20, column: 10 },
                                end: { line: 20, column: 65 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 20, column: 11 },
                                  end: { line: 20, column: 15 },
                                },
                                name: "span",
                              },
                              attributes: [
                                {
                                  type: "JSXAttribute",
                                  loc: {
                                    start: { line: 20, column: 16 },
                                    end: { line: 20, column: 27 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 20, column: 16 },
                                      end: { line: 20, column: 21 },
                                    },
                                    name: "style",
                                  },
                                  value: {
                                    type: "JSXExpressionContainer",
                                    loc: {
                                      start: { line: 20, column: 22 },
                                      end: { line: 20, column: 27 },
                                    },
                                    expression: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 20, column: 23 },
                                        end: { line: 20, column: 26 },
                                      },
                                      name: "css",
                                      key: "css$mvahdj0e0ick$3",
                                    },
                                  },
                                },
                                {
                                  type: "JSXAttribute",
                                  loc: {
                                    start: { line: 20, column: 28 },
                                    end: { line: 20, column: 64 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 20, column: 28 },
                                      end: { line: 20, column: 35 },
                                    },
                                    name: "onclick",
                                  },
                                  value: {
                                    type: "JSXExpressionContainer",
                                    loc: {
                                      start: { line: 20, column: 36 },
                                      end: { line: 20, column: 64 },
                                    },
                                    expression: {
                                      type: "ArrowFunctionExpression",
                                      loc: {
                                        start: { line: 20, column: 37 },
                                        end: { line: 20, column: 63 },
                                      },
                                      params: [],
                                      body: {
                                        type: "CallExpression",
                                        loc: {
                                          start: { line: 20, column: 43 },
                                          end: { line: 20, column: 63 },
                                        },
                                        callee: {
                                          type: "MemberExpression",
                                          loc: {
                                            start: { line: 20, column: 43 },
                                            end: { line: 20, column: 52 },
                                          },
                                          object: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 20, column: 43 },
                                              end: { line: 20, column: 48 },
                                            },
                                            name: "label",
                                            key: "label$mvahdj0e0ick$0",
                                          },
                                          property: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 20, column: 49 },
                                              end: { line: 20, column: 52 },
                                            },
                                            name: "set",
                                          },
                                          computed: false,
                                          optional: false,
                                        },
                                        arguments: [
                                          {
                                            type: "Literal",
                                            loc: {
                                              start: { line: 20, column: 53 },
                                              end: { line: 20, column: 62 },
                                            },
                                            value: "pressed",
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
                                  start: { line: 21, column: 12 },
                                  end: { line: 21, column: 12 },
                                },
                                value: "\n            ",
                                raw: "\n            ",
                              },
                              {
                                type: "JSXExpressionContainer",
                                loc: {
                                  start: { line: 21, column: 12 },
                                  end: { line: 21, column: 25 },
                                },
                                expression: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 21, column: 13 },
                                    end: { line: 21, column: 24 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 21, column: 13 },
                                      end: { line: 21, column: 22 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 21, column: 13 },
                                        end: { line: 21, column: 18 },
                                      },
                                      name: "label",
                                      key: "label$mvahdj0e0ick$0",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 21, column: 19 },
                                        end: { line: 21, column: 22 },
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
                                  start: { line: 22, column: 10 },
                                  end: { line: 22, column: 10 },
                                },
                                value: "\n          ",
                                raw: "\n          ",
                              },
                            ],
                            closingElement: {
                              type: "JSXClosingElement",
                              loc: {
                                start: { line: 22, column: 10 },
                                end: { line: 22, column: 17 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 22, column: 12 },
                                  end: { line: 22, column: 16 },
                                },
                                name: "span",
                              },
                            },
                          },
                          {
                            type: "JSXText",
                            loc: {
                              start: { line: 23, column: 10 },
                              end: { line: 23, column: 10 },
                            },
                            value: "\n          ",
                            raw: "\n          ",
                          },
                          {
                            type: "JSXElement",
                            loc: {
                              start: { line: 23, column: 10 },
                              end: { line: 23, column: 51 },
                            },
                            openingElement: {
                              type: "JSXOpeningElement",
                              loc: {
                                start: { line: 23, column: 10 },
                                end: { line: 23, column: 39 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 23, column: 11 },
                                  end: { line: 23, column: 15 },
                                },
                                name: "span",
                              },
                              attributes: [
                                {
                                  type: "JSXAttribute",
                                  loc: {
                                    start: { line: 23, column: 16 },
                                    end: { line: 23, column: 38 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 23, column: 16 },
                                      end: { line: 23, column: 21 },
                                    },
                                    name: "style",
                                  },
                                  value: {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 23, column: 22 },
                                      end: { line: 23, column: 38 },
                                    },
                                    value: "font-size: 8px",
                                  },
                                },
                              ],
                              selfClosing: false,
                            },
                            children: [
                              {
                                type: "JSXText",
                                loc: {
                                  start: { line: 23, column: 39 },
                                  end: { line: 23, column: 44 },
                                },
                                value: "fixed",
                                raw: "fixed",
                              },
                            ],
                            closingElement: {
                              type: "JSXClosingElement",
                              loc: {
                                start: { line: 23, column: 44 },
                                end: { line: 23, column: 51 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 23, column: 46 },
                                  end: { line: 23, column: 50 },
                                },
                                name: "span",
                              },
                            },
                          },
                          {
                            type: "JSXText",
                            loc: {
                              start: { line: 24, column: 10 },
                              end: { line: 24, column: 10 },
                            },
                            value: "\n          ",
                            raw: "\n          ",
                          },
                          {
                            type: "JSXElement",
                            loc: {
                              start: { line: 24, column: 10 },
                              end: { line: 26, column: 17 },
                            },
                            openingElement: {
                              type: "JSXOpeningElement",
                              loc: {
                                start: { line: 24, column: 10 },
                                end: { line: 24, column: 44 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 24, column: 11 },
                                  end: { line: 24, column: 15 },
                                },
                                name: "span",
                              },
                              attributes: [
                                {
                                  type: "JSXAttribute",
                                  loc: {
                                    start: { line: 24, column: 16 },
                                    end: { line: 24, column: 27 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 24, column: 16 },
                                      end: { line: 24, column: 21 },
                                    },
                                    name: "style",
                                  },
                                  value: {
                                    type: "JSXExpressionContainer",
                                    loc: {
                                      start: { line: 24, column: 22 },
                                      end: { line: 24, column: 27 },
                                    },
                                    expression: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 24, column: 23 },
                                        end: { line: 24, column: 26 },
                                      },
                                      name: "css",
                                      key: "css$mvahdj0e0ick$3",
                                    },
                                  },
                                },
                                {
                                  type: "JSXAttribute",
                                  loc: {
                                    start: { line: 24, column: 28 },
                                    end: { line: 24, column: 43 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 24, column: 28 },
                                      end: { line: 24, column: 35 },
                                    },
                                    name: "onclick",
                                  },
                                  value: {
                                    type: "JSXExpressionContainer",
                                    loc: {
                                      start: { line: 24, column: 36 },
                                      end: { line: 24, column: 43 },
                                    },
                                    expression: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 24, column: 37 },
                                        end: { line: 24, column: 42 },
                                      },
                                      name: "press",
                                      key: "press$mvahdj0e0ick$4",
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
                                  start: { line: 25, column: 12 },
                                  end: { line: 26, column: 10 },
                                },
                                value: "\n            held\n          ",
                                raw: "\n            held\n          ",
                              },
                            ],
                            closingElement: {
                              type: "JSXClosingElement",
                              loc: {
                                start: { line: 26, column: 10 },
                                end: { line: 26, column: 17 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 26, column: 12 },
                                  end: { line: 26, column: 16 },
                                },
                                name: "span",
                              },
                            },
                          },
                          {
                            type: "JSXText",
                            loc: {
                              start: { line: 27, column: 8 },
                              end: { line: 27, column: 8 },
                            },
                            value: "\n        ",
                            raw: "\n        ",
                          },
                        ],
                        closingElement: {
                          type: "JSXClosingElement",
                          loc: {
                            start: { line: 27, column: 8 },
                            end: { line: 27, column: 14 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 27, column: 10 },
                              end: { line: 27, column: 13 },
                            },
                            name: "div",
                          },
                        },
                      },
                    },
                  ],
                },
                expression: false,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 31, column: 4 },
            end: { line: 31, column: 51 },
          },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 31, column: 11 },
              end: { line: 31, column: 50 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 31, column: 11 },
                end: { line: 31, column: 35 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 31, column: 12 },
                  end: { line: 31, column: 15 },
                },
                name: "div",
              },
              attributes: [
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 31, column: 16 },
                    end: { line: 31, column: 34 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 31, column: 16 },
                      end: { line: 31, column: 21 },
                    },
                    name: "style",
                  },
                  value: {
                    type: "Literal",
                    loc: {
                      start: { line: 31, column: 22 },
                      end: { line: 31, column: 34 },
                    },
                    value: "padding: 0",
                  },
                },
              ],
              selfClosing: false,
            },
            children: [
              {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 31, column: 35 },
                  end: { line: 31, column: 44 },
                },
                expression: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 31, column: 36 },
                    end: { line: 31, column: 43 },
                  },
                  callee: {
                    type: "Identifier",
                    loc: {
                      start: { line: 31, column: 36 },
                      end: { line: 31, column: 39 },
                    },
                    name: "row",
                    key: "row$mvahdj0e0ick$1",
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 31, column: 40 },
                        end: { line: 31, column: 42 },
                      },
                      value: 12,
                    },
                  ],
                  optional: false,
                },
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 31, column: 44 },
                end: { line: 31, column: 50 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 31, column: 46 },
                  end: { line: 31, column: 49 },
                },
                name: "div",
              },
            },
          },
        },
      ],
    }),
    {
      code: 'export default ($0) => {\n    const label = $0()("hi");\n    const row = (size) => {\n        const css = "font-size: " + size + "px";\n        const press = () => label.set("held");\n        return (<div style={css}>\n          <span style={css} onclick={() => label.set("pressed")}>\n            {label.get()}\n          </span>\n          <span style="font-size: 8px">fixed</span>\n          <span style={css} onclick={press}>\n            held\n          </span>\n        </div>);\n    };\n    return <div style="padding: 0">{row(12)}</div>;\n};',
      map: '{"version":3,"file":"script-element.test.jsx","sourceRoot":"","sources":["script-element.test.tsx"],"names":[],"mappings":"eASY;IACR,MAAM,KAAK,GAAG,IAAM,CAAC,IAAI,CAAC,CAAC;IAI3B,MAAM,GAAG,GAAG,CAAC,IAAY,EAAE,EAAE;QAC3B,MAAM,GAAG,GAAG,aAAa,GAAG,IAAI,GAAG,IAAI,CAAC;QACxC,MAAM,KAAK,GAAG,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,MAAM,CAAC,CAAC;QACtC,OAAO,CACL,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,CACd;UAAA,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC,CACpD;YAAA,CAAC,KAAK,CAAC,GAAG,EAAE,CACd;UAAA,EAAE,IAAI,CACN;UAAA,CAAC,IAAI,CAAC,KAAK,CAAC,gBAAgB,CAAC,KAAK,EAAE,IAAI,CACxC;UAAA,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,OAAO,CAAC,CAAC,KAAK,CAAC,CAC/B;;UACF,EAAE,IAAI,CACR;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;IACJ,CAAC,CAAC;IAEF,OAAO,CAAC,GAAG,CAAC,KAAK,CAAC,YAAY,CAAC,CAAC,GAAG,CAAC,EAAE,CAAC,CAAC,EAAE,GAAG,CAAC,CAAC;AACjD,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
it("Card", async (t) => {
  await snapshotCase(t, "Card", _jsx(Card, {}));
});
