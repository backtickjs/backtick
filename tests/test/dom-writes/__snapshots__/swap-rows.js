import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
// js-framework-benchmark's "swap rows": the second row and the second-to-last
// change places. The rows between them stay where they are, so what moves is
// the two rows and nothing else.
async function SwappableRows() {
  return cs.create(
    "2f4veetc9j0fm:12:9",
    {
      params: [
        { kind: "splice", value: state, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 12, column: 12 }, end: { line: 34, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 13, column: 4 },
            end: { line: 13, column: 50 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 13, column: 10 },
                end: { line: 13, column: 49 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 13, column: 10 },
                  end: { line: 13, column: 13 },
                },
                name: "ids",
                key: "ids$2f4veetc9j0fm$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 13, column: 16 },
                  end: { line: 13, column: 49 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 13, column: 16 },
                    end: { line: 13, column: 22 },
                  },
                  param: 0,
                },
                arguments: [
                  {
                    type: "ArrayExpression",
                    loc: {
                      start: { line: 13, column: 33 },
                      end: { line: 13, column: 48 },
                    },
                    elements: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 13, column: 34 },
                          end: { line: 13, column: 35 },
                        },
                        value: 1,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 13, column: 37 },
                          end: { line: 13, column: 38 },
                        },
                        value: 2,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 13, column: 40 },
                          end: { line: 13, column: 41 },
                        },
                        value: 3,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 13, column: 43 },
                          end: { line: 13, column: 44 },
                        },
                        value: 4,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 13, column: 46 },
                          end: { line: 13, column: 47 },
                        },
                        value: 5,
                      },
                    ],
                  },
                ],
                optional: false,
              },
            },
          ],
        },
        {
          type: "VariableDeclaration",
          loc: { start: { line: 14, column: 4 }, end: { line: 17, column: 6 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 14, column: 10 },
                end: { line: 17, column: 5 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 10 },
                  end: { line: 14, column: 14 },
                },
                name: "swap",
                key: "swap$2f4veetc9j0fm$1",
              },
              init: {
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 14, column: 17 },
                  end: { line: 17, column: 5 },
                },
                params: [],
                body: {
                  type: "BlockStatement",
                  loc: {
                    start: { line: 14, column: 23 },
                    end: { line: 17, column: 5 },
                  },
                  body: [
                    {
                      type: "VariableDeclaration",
                      loc: {
                        start: { line: 15, column: 6 },
                        end: { line: 15, column: 29 },
                      },
                      kind: "const",
                      declarations: [
                        {
                          type: "VariableDeclarator",
                          loc: {
                            start: { line: 15, column: 12 },
                            end: { line: 15, column: 28 },
                          },
                          id: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 12 },
                              end: { line: 15, column: 16 },
                            },
                            name: "held",
                            key: "held$2f4veetc9j0fm$2",
                          },
                          init: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 15, column: 19 },
                              end: { line: 15, column: 28 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 15, column: 19 },
                                end: { line: 15, column: 26 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 15, column: 19 },
                                  end: { line: 15, column: 22 },
                                },
                                name: "ids",
                                key: "ids$2f4veetc9j0fm$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 15, column: 23 },
                                  end: { line: 15, column: 26 },
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
                    {
                      type: "ExpressionStatement",
                      loc: {
                        start: { line: 16, column: 6 },
                        end: { line: 16, column: 54 },
                      },
                      expression: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 16, column: 6 },
                          end: { line: 16, column: 53 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 16, column: 6 },
                            end: { line: 16, column: 13 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 6 },
                              end: { line: 16, column: 9 },
                            },
                            name: "ids",
                            key: "ids$2f4veetc9j0fm$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 10 },
                              end: { line: 16, column: 13 },
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
                              start: { line: 16, column: 14 },
                              end: { line: 16, column: 52 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 16, column: 14 },
                                end: { line: 16, column: 40 },
                              },
                              object: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 16, column: 14 },
                                  end: { line: 16, column: 35 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 16, column: 14 },
                                    end: { line: 16, column: 23 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 16, column: 14 },
                                      end: { line: 16, column: 18 },
                                    },
                                    name: "held",
                                    key: "held$2f4veetc9j0fm$2",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 16, column: 19 },
                                      end: { line: 16, column: 23 },
                                    },
                                    name: "with",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [
                                  {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 16, column: 24 },
                                      end: { line: 16, column: 25 },
                                    },
                                    value: 1,
                                  },
                                  {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 16, column: 27 },
                                      end: { line: 16, column: 34 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 16, column: 27 },
                                        end: { line: 16, column: 31 },
                                      },
                                      name: "held",
                                      key: "held$2f4veetc9j0fm$2",
                                    },
                                    property: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 16, column: 32 },
                                        end: { line: 16, column: 33 },
                                      },
                                      value: 3,
                                    },
                                    computed: true,
                                    optional: false,
                                  },
                                ],
                                optional: false,
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 16, column: 36 },
                                  end: { line: 16, column: 40 },
                                },
                                name: "with",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [
                              {
                                type: "Literal",
                                loc: {
                                  start: { line: 16, column: 41 },
                                  end: { line: 16, column: 42 },
                                },
                                value: 3,
                              },
                              {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 16, column: 44 },
                                  end: { line: 16, column: 51 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 16, column: 44 },
                                    end: { line: 16, column: 48 },
                                  },
                                  name: "held",
                                  key: "held$2f4veetc9j0fm$2",
                                },
                                property: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 16, column: 49 },
                                    end: { line: 16, column: 50 },
                                  },
                                  value: 1,
                                },
                                computed: true,
                                optional: false,
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
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: { start: { line: 18, column: 4 }, end: { line: 33, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 32, column: 12 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 19, column: 6 },
                end: { line: 19, column: 11 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 19, column: 7 },
                  end: { line: 19, column: 10 },
                },
                name: "div",
              },
              attributes: [],
              selfClosing: false,
            },
            children: [
              {
                type: "JSXText",
                loc: {
                  start: { line: 20, column: 8 },
                  end: { line: 20, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 20, column: 8 },
                  end: { line: 20, column: 44 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 20, column: 8 },
                    end: { line: 20, column: 31 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 20, column: 9 },
                      end: { line: 20, column: 15 },
                    },
                    name: "button",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 20, column: 16 },
                        end: { line: 20, column: 30 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 20, column: 16 },
                          end: { line: 20, column: 23 },
                        },
                        name: "onclick",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 20, column: 24 },
                          end: { line: 20, column: 30 },
                        },
                        expression: {
                          type: "Identifier",
                          loc: {
                            start: { line: 20, column: 25 },
                            end: { line: 20, column: 29 },
                          },
                          name: "swap",
                          key: "swap$2f4veetc9j0fm$1",
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
                      start: { line: 20, column: 31 },
                      end: { line: 20, column: 35 },
                    },
                    value: "swap",
                    raw: "swap",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 20, column: 35 },
                    end: { line: 20, column: 44 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 20, column: 37 },
                      end: { line: 20, column: 43 },
                    },
                    name: "button",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 21, column: 8 },
                  end: { line: 21, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 21, column: 8 },
                  end: { line: 31, column: 16 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 21, column: 8 },
                    end: { line: 21, column: 15 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 21, column: 9 },
                      end: { line: 21, column: 14 },
                    },
                    name: "table",
                  },
                  attributes: [],
                  selfClosing: false,
                },
                children: [
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 22, column: 10 },
                      end: { line: 22, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 22, column: 10 },
                      end: { line: 30, column: 18 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 22, column: 10 },
                        end: { line: 22, column: 17 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 22, column: 11 },
                          end: { line: 22, column: 16 },
                        },
                        name: "tbody",
                      },
                      attributes: [],
                      selfClosing: false,
                    },
                    children: [
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 23, column: 12 },
                          end: { line: 23, column: 12 },
                        },
                        value: "\n            ",
                        raw: "\n            ",
                      },
                      {
                        type: "JSXElement",
                        loc: {
                          start: { line: 23, column: 12 },
                          end: { line: 29, column: 18 },
                        },
                        openingElement: {
                          type: "JSXOpeningElement",
                          loc: {
                            start: { line: 23, column: 12 },
                            end: { line: 23, column: 34 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 23, column: 13 },
                              end: { line: 23, column: 16 },
                            },
                            name: "For",
                            param: 1,
                          },
                          attributes: [
                            {
                              type: "JSXAttribute",
                              loc: {
                                start: { line: 23, column: 17 },
                                end: { line: 23, column: 33 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 23, column: 17 },
                                  end: { line: 23, column: 21 },
                                },
                                name: "each",
                              },
                              value: {
                                type: "JSXExpressionContainer",
                                loc: {
                                  start: { line: 23, column: 22 },
                                  end: { line: 23, column: 33 },
                                },
                                expression: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 23, column: 23 },
                                    end: { line: 23, column: 32 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 23, column: 23 },
                                      end: { line: 23, column: 30 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 23, column: 23 },
                                        end: { line: 23, column: 26 },
                                      },
                                      name: "ids",
                                      key: "ids$2f4veetc9j0fm$0",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 23, column: 27 },
                                        end: { line: 23, column: 30 },
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
                            },
                          ],
                          selfClosing: false,
                        },
                        children: [
                          {
                            type: "JSXText",
                            loc: {
                              start: { line: 24, column: 14 },
                              end: { line: 24, column: 14 },
                            },
                            value: "\n              ",
                            raw: "\n              ",
                          },
                          {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 24, column: 14 },
                              end: { line: 28, column: 16 },
                            },
                            expression: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 24, column: 15 },
                                end: { line: 28, column: 15 },
                              },
                              params: [
                                {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 24, column: 16 },
                                    end: { line: 24, column: 18 },
                                  },
                                  name: "id",
                                  key: "id$2f4veetc9j0fm$3",
                                },
                              ],
                              body: {
                                type: "JSXElement",
                                loc: {
                                  start: { line: 25, column: 16 },
                                  end: { line: 27, column: 21 },
                                },
                                openingElement: {
                                  type: "JSXOpeningElement",
                                  loc: {
                                    start: { line: 25, column: 16 },
                                    end: { line: 25, column: 37 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 25, column: 17 },
                                      end: { line: 25, column: 19 },
                                    },
                                    name: "tr",
                                  },
                                  attributes: [
                                    {
                                      type: "JSXAttribute",
                                      loc: {
                                        start: { line: 25, column: 20 },
                                        end: { line: 25, column: 36 },
                                      },
                                      name: {
                                        type: "JSXIdentifier",
                                        loc: {
                                          start: { line: 25, column: 20 },
                                          end: { line: 25, column: 22 },
                                        },
                                        name: "id",
                                      },
                                      value: {
                                        type: "JSXExpressionContainer",
                                        loc: {
                                          start: { line: 25, column: 23 },
                                          end: { line: 25, column: 36 },
                                        },
                                        expression: {
                                          type: "BinaryExpression",
                                          loc: {
                                            start: { line: 25, column: 24 },
                                            end: { line: 25, column: 35 },
                                          },
                                          operator: "+",
                                          left: {
                                            type: "Literal",
                                            loc: {
                                              start: { line: 25, column: 24 },
                                              end: { line: 25, column: 30 },
                                            },
                                            value: "row-",
                                          },
                                          right: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 25, column: 33 },
                                              end: { line: 25, column: 35 },
                                            },
                                            name: "id",
                                            key: "id$2f4veetc9j0fm$3",
                                          },
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
                                      start: { line: 26, column: 18 },
                                      end: { line: 26, column: 18 },
                                    },
                                    value: "\n                  ",
                                    raw: "\n                  ",
                                  },
                                  {
                                    type: "JSXElement",
                                    loc: {
                                      start: { line: 26, column: 18 },
                                      end: { line: 26, column: 40 },
                                    },
                                    openingElement: {
                                      type: "JSXOpeningElement",
                                      loc: {
                                        start: { line: 26, column: 18 },
                                        end: { line: 26, column: 22 },
                                      },
                                      name: {
                                        type: "JSXIdentifier",
                                        loc: {
                                          start: { line: 26, column: 19 },
                                          end: { line: 26, column: 21 },
                                        },
                                        name: "td",
                                      },
                                      attributes: [],
                                      selfClosing: false,
                                    },
                                    children: [
                                      {
                                        type: "JSXExpressionContainer",
                                        loc: {
                                          start: { line: 26, column: 22 },
                                          end: { line: 26, column: 35 },
                                        },
                                        expression: {
                                          type: "BinaryExpression",
                                          loc: {
                                            start: { line: 26, column: 23 },
                                            end: { line: 26, column: 34 },
                                          },
                                          operator: "+",
                                          left: {
                                            type: "Literal",
                                            loc: {
                                              start: { line: 26, column: 23 },
                                              end: { line: 26, column: 29 },
                                            },
                                            value: "row ",
                                          },
                                          right: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 26, column: 32 },
                                              end: { line: 26, column: 34 },
                                            },
                                            name: "id",
                                            key: "id$2f4veetc9j0fm$3",
                                          },
                                        },
                                      },
                                    ],
                                    closingElement: {
                                      type: "JSXClosingElement",
                                      loc: {
                                        start: { line: 26, column: 35 },
                                        end: { line: 26, column: 40 },
                                      },
                                      name: {
                                        type: "JSXIdentifier",
                                        loc: {
                                          start: { line: 26, column: 37 },
                                          end: { line: 26, column: 39 },
                                        },
                                        name: "td",
                                      },
                                    },
                                  },
                                  {
                                    type: "JSXText",
                                    loc: {
                                      start: { line: 27, column: 16 },
                                      end: { line: 27, column: 16 },
                                    },
                                    value: "\n                ",
                                    raw: "\n                ",
                                  },
                                ],
                                closingElement: {
                                  type: "JSXClosingElement",
                                  loc: {
                                    start: { line: 27, column: 16 },
                                    end: { line: 27, column: 21 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 27, column: 18 },
                                      end: { line: 27, column: 20 },
                                    },
                                    name: "tr",
                                  },
                                },
                              },
                              expression: true,
                            },
                          },
                          {
                            type: "JSXText",
                            loc: {
                              start: { line: 29, column: 12 },
                              end: { line: 29, column: 12 },
                            },
                            value: "\n            ",
                            raw: "\n            ",
                          },
                        ],
                        closingElement: {
                          type: "JSXClosingElement",
                          loc: {
                            start: { line: 29, column: 12 },
                            end: { line: 29, column: 18 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 29, column: 14 },
                              end: { line: 29, column: 17 },
                            },
                            name: "For",
                          },
                        },
                      },
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 30, column: 10 },
                          end: { line: 30, column: 10 },
                        },
                        value: "\n          ",
                        raw: "\n          ",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 30, column: 10 },
                        end: { line: 30, column: 18 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 30, column: 12 },
                          end: { line: 30, column: 17 },
                        },
                        name: "tbody",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 31, column: 8 },
                      end: { line: 31, column: 8 },
                    },
                    value: "\n        ",
                    raw: "\n        ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 31, column: 8 },
                    end: { line: 31, column: 16 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 31, column: 10 },
                      end: { line: 31, column: 15 },
                    },
                    name: "table",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 32, column: 6 },
                  end: { line: 32, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 32, column: 6 },
                end: { line: 32, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 32, column: 8 },
                  end: { line: 32, column: 11 },
                },
                name: "div",
              },
            },
          },
        },
      ],
    }),
    '($0, $1) => {\n    const ids = $0()([1, 2, 3, 4, 5]);\n    const swap = () => {\n        const held = ids.get();\n        ids.set(held.with(1, held[3]).with(3, held[1]));\n    };\n    return (<div>\n        <button onclick={swap}>swap</button>\n        <table>\n          <tbody>\n            <$1 each={ids.get()}>\n              {(id) => (<tr id={"row-" + id}>\n                  <td>{"row " + id}</td>\n                </tr>)}\n            </$1>\n          </tbody>\n        </table>\n      </div>);\n}',
    '{"version":3,"file":"swap-rows.test.jsx","sourceRoot":"","sources":["swap-rows.test.tsx"],"names":[],"mappings":"AAWY;IACR,MAAM,GAAG,GAAG,IAAM,CAAW,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC;IAC9C,MAAM,IAAI,GAAG,GAAG,EAAE;QAChB,MAAM,IAAI,GAAG,GAAG,CAAC,GAAG,EAAE,CAAC;QACvB,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;IAClD,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,EAAE,MAAM,CACnC;QAAA,CAAC,KAAK,CACJ;UAAA,CAAC,KAAK,CACJ;YAAA,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,GAAG,CAAC,GAAG,EAAE,CAAC,CACnB;cAAA,CAAC,CAAC,EAAU,EAAE,EAAE,CAAC,CACf,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,MAAM,GAAG,EAAE,CAAC,CAClB;kBAAA,CAAC,EAAE,CAAC,CAAC,MAAM,GAAG,EAAE,CAAC,EAAE,EAAE,CACvB;gBAAA,EAAE,EAAE,CAAC,CACN,CACH;YAAA,EAAE,EAAG,CACP;UAAA,EAAE,KAAK,CACT;QAAA,EAAE,KAAK,CACT;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC,CAAA"}',
  );
}
it("a swap moves the two rows it swapped", async () => {
  const { container } = await render(_jsx(SwappableRows, {}));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "swap" }));
  // Each move is the row leaving where it was and arriving where it goes.
  assert.deepEqual(written(), [
    "tbody − tr#row-4",
    "tbody + tr#row-4 before tr#row-3",
    "tbody − tr#row-2",
    "tbody + tr#row-2 before tr#row-5",
  ]);
});
