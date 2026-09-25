import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A list whose members carry storage of their own: `build` declares a cell per
// row, and the cell the list reads holds those cells along with the rows. A
// press writes into one row's cell, so only what read that cell runs again —
// the array is the array it was, and no other row moves.
//
// What a cell starts at is the other half of this: the initial is a call here,
// not data, which is what a cell declared where it is evaluated allows.
async function MemberRows() {
  return cs.create(
    "30ur5mgzea4v6:19:9",
    {
      params: [
        { kind: "splice", value: state, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 19, column: 12 }, end: { line: 41, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: { start: { line: 20, column: 4 }, end: { line: 24, column: 6 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 20, column: 10 },
                end: { line: 24, column: 5 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 20, column: 10 },
                  end: { line: 20, column: 15 },
                },
                name: "build",
                key: "build$30ur5mgzea4v6$0",
              },
              init: {
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 20, column: 18 },
                  end: { line: 24, column: 5 },
                },
                params: [
                  {
                    type: "Identifier",
                    loc: {
                      start: { line: 20, column: 19 },
                      end: { line: 20, column: 23 },
                    },
                    name: "from",
                    key: "from$30ur5mgzea4v6$2",
                  },
                ],
                body: {
                  type: "BlockStatement",
                  loc: {
                    start: { line: 20, column: 36 },
                    end: { line: 24, column: 5 },
                  },
                  body: [
                    {
                      type: "ReturnStatement",
                      loc: {
                        start: { line: 21, column: 6 },
                        end: { line: 23, column: 9 },
                      },
                      argument: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 21, column: 13 },
                          end: { line: 23, column: 8 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 21, column: 13 },
                            end: { line: 21, column: 23 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 21, column: 13 },
                              end: { line: 21, column: 18 },
                            },
                            name: "Array",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 21, column: 19 },
                              end: { line: 21, column: 23 },
                            },
                            name: "from",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "ObjectExpression",
                            loc: {
                              start: { line: 21, column: 24 },
                              end: { line: 21, column: 37 },
                            },
                            properties: [
                              {
                                type: "Property",
                                loc: {
                                  start: { line: 21, column: 26 },
                                  end: { line: 21, column: 35 },
                                },
                                key: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 21, column: 26 },
                                    end: { line: 21, column: 32 },
                                  },
                                  name: "length",
                                },
                                value: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 21, column: 34 },
                                    end: { line: 21, column: 35 },
                                  },
                                  value: 3,
                                },
                                kind: "init",
                                computed: false,
                                method: false,
                                shorthand: false,
                              },
                            ],
                          },
                          {
                            type: "ArrowFunctionExpression",
                            loc: {
                              start: { line: 21, column: 39 },
                              end: { line: 23, column: 7 },
                            },
                            params: [
                              {
                                type: "Identifier",
                                loc: {
                                  start: { line: 21, column: 40 },
                                  end: { line: 21, column: 41 },
                                },
                                name: "_",
                                key: "_$30ur5mgzea4v6$3",
                              },
                              {
                                type: "Identifier",
                                loc: {
                                  start: { line: 21, column: 43 },
                                  end: { line: 21, column: 45 },
                                },
                                name: "at",
                                key: "at$30ur5mgzea4v6$4",
                              },
                            ],
                            body: {
                              type: "BlockStatement",
                              loc: {
                                start: { line: 21, column: 50 },
                                end: { line: 23, column: 7 },
                              },
                              body: [
                                {
                                  type: "ReturnStatement",
                                  loc: {
                                    start: { line: 22, column: 8 },
                                    end: { line: 22, column: 70 },
                                  },
                                  argument: {
                                    type: "ObjectExpression",
                                    loc: {
                                      start: { line: 22, column: 15 },
                                      end: { line: 22, column: 69 },
                                    },
                                    properties: [
                                      {
                                        type: "Property",
                                        loc: {
                                          start: { line: 22, column: 17 },
                                          end: { line: 22, column: 30 },
                                        },
                                        key: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 22, column: 17 },
                                            end: { line: 22, column: 19 },
                                          },
                                          name: "id",
                                        },
                                        value: {
                                          type: "BinaryExpression",
                                          loc: {
                                            start: { line: 22, column: 21 },
                                            end: { line: 22, column: 30 },
                                          },
                                          operator: "+",
                                          left: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 22, column: 21 },
                                              end: { line: 22, column: 25 },
                                            },
                                            name: "from",
                                            key: "from$30ur5mgzea4v6$2",
                                          },
                                          right: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 22, column: 28 },
                                              end: { line: 22, column: 30 },
                                            },
                                            name: "at",
                                            key: "at$30ur5mgzea4v6$4",
                                          },
                                        },
                                        kind: "init",
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                      },
                                      {
                                        type: "Property",
                                        loc: {
                                          start: { line: 22, column: 32 },
                                          end: { line: 22, column: 67 },
                                        },
                                        key: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 22, column: 32 },
                                            end: { line: 22, column: 37 },
                                          },
                                          name: "label",
                                        },
                                        value: {
                                          type: "CallExpression",
                                          loc: {
                                            start: { line: 22, column: 39 },
                                            end: { line: 22, column: 67 },
                                          },
                                          callee: {
                                            type: "Splice",
                                            loc: {
                                              start: { line: 22, column: 39 },
                                              end: { line: 22, column: 45 },
                                            },
                                            param: 0,
                                          },
                                          arguments: [
                                            {
                                              type: "BinaryExpression",
                                              loc: {
                                                start: { line: 22, column: 46 },
                                                end: { line: 22, column: 66 },
                                              },
                                              operator: "+",
                                              left: {
                                                type: "Literal",
                                                loc: {
                                                  start: {
                                                    line: 22,
                                                    column: 46,
                                                  },
                                                  end: { line: 22, column: 52 },
                                                },
                                                value: "row ",
                                              },
                                              right: {
                                                type: "BinaryExpression",
                                                loc: {
                                                  start: {
                                                    line: 22,
                                                    column: 56,
                                                  },
                                                  end: { line: 22, column: 65 },
                                                },
                                                operator: "+",
                                                left: {
                                                  type: "Identifier",
                                                  loc: {
                                                    start: {
                                                      line: 22,
                                                      column: 56,
                                                    },
                                                    end: {
                                                      line: 22,
                                                      column: 60,
                                                    },
                                                  },
                                                  name: "from",
                                                  key: "from$30ur5mgzea4v6$2",
                                                },
                                                right: {
                                                  type: "Identifier",
                                                  loc: {
                                                    start: {
                                                      line: 22,
                                                      column: 63,
                                                    },
                                                    end: {
                                                      line: 22,
                                                      column: 65,
                                                    },
                                                  },
                                                  name: "at",
                                                  key: "at$30ur5mgzea4v6$4",
                                                },
                                              },
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
                                },
                              ],
                            },
                            expression: false,
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
          type: "VariableDeclaration",
          loc: {
            start: { line: 26, column: 4 },
            end: { line: 26, column: 34 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 26, column: 10 },
                end: { line: 26, column: 33 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 26, column: 10 },
                  end: { line: 26, column: 14 },
                },
                name: "held",
                key: "held$30ur5mgzea4v6$1",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 26, column: 17 },
                  end: { line: 26, column: 33 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 26, column: 17 },
                    end: { line: 26, column: 23 },
                  },
                  param: 0,
                },
                arguments: [
                  {
                    type: "CallExpression",
                    loc: {
                      start: { line: 26, column: 24 },
                      end: { line: 26, column: 32 },
                    },
                    callee: {
                      type: "Identifier",
                      loc: {
                        start: { line: 26, column: 24 },
                        end: { line: 26, column: 29 },
                      },
                      name: "build",
                      key: "build$30ur5mgzea4v6$0",
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 26, column: 30 },
                          end: { line: 26, column: 31 },
                        },
                        value: 1,
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
        {
          type: "ReturnStatement",
          loc: { start: { line: 28, column: 4 }, end: { line: 40, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 29, column: 6 },
              end: { line: 39, column: 12 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 29, column: 6 },
                end: { line: 29, column: 11 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 29, column: 7 },
                  end: { line: 29, column: 10 },
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
                  start: { line: 30, column: 8 },
                  end: { line: 30, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 30, column: 8 },
                  end: { line: 38, column: 13 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 30, column: 8 },
                    end: { line: 30, column: 25 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 30, column: 9 },
                      end: { line: 30, column: 11 },
                    },
                    name: "ul",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 30, column: 12 },
                        end: { line: 30, column: 24 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 30, column: 12 },
                          end: { line: 30, column: 17 },
                        },
                        name: "class",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 30, column: 18 },
                          end: { line: 30, column: 24 },
                        },
                        value: "rows",
                      },
                    },
                  ],
                  selfClosing: false,
                },
                children: [
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 31, column: 10 },
                      end: { line: 31, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 31, column: 10 },
                      end: { line: 37, column: 16 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 31, column: 10 },
                        end: { line: 31, column: 33 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 31, column: 11 },
                          end: { line: 31, column: 14 },
                        },
                        name: "For",
                        param: 1,
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 31, column: 15 },
                            end: { line: 31, column: 32 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 31, column: 15 },
                              end: { line: 31, column: 19 },
                            },
                            name: "each",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 31, column: 20 },
                              end: { line: 31, column: 32 },
                            },
                            expression: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 31, column: 21 },
                                end: { line: 31, column: 31 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 31, column: 21 },
                                  end: { line: 31, column: 29 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 31, column: 21 },
                                    end: { line: 31, column: 25 },
                                  },
                                  name: "held",
                                  key: "held$30ur5mgzea4v6$1",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 31, column: 26 },
                                    end: { line: 31, column: 29 },
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
                          end: { line: 36, column: 14 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 32, column: 13 },
                            end: { line: 36, column: 13 },
                          },
                          params: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 32, column: 14 },
                                end: { line: 32, column: 17 },
                              },
                              name: "row",
                              key: "row$30ur5mgzea4v6$5",
                            },
                          ],
                          body: {
                            type: "JSXElement",
                            loc: {
                              start: { line: 33, column: 14 },
                              end: { line: 35, column: 19 },
                            },
                            openingElement: {
                              type: "JSXOpeningElement",
                              loc: {
                                start: { line: 33, column: 14 },
                                end: { line: 33, column: 59 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 33, column: 15 },
                                  end: { line: 33, column: 17 },
                                },
                                name: "li",
                              },
                              attributes: [
                                {
                                  type: "JSXAttribute",
                                  loc: {
                                    start: { line: 33, column: 18 },
                                    end: { line: 33, column: 58 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 33, column: 18 },
                                      end: { line: 33, column: 25 },
                                    },
                                    name: "onclick",
                                  },
                                  value: {
                                    type: "JSXExpressionContainer",
                                    loc: {
                                      start: { line: 33, column: 26 },
                                      end: { line: 33, column: 58 },
                                    },
                                    expression: {
                                      type: "ArrowFunctionExpression",
                                      loc: {
                                        start: { line: 33, column: 27 },
                                        end: { line: 33, column: 57 },
                                      },
                                      params: [],
                                      body: {
                                        type: "CallExpression",
                                        loc: {
                                          start: { line: 33, column: 33 },
                                          end: { line: 33, column: 57 },
                                        },
                                        callee: {
                                          type: "MemberExpression",
                                          loc: {
                                            start: { line: 33, column: 33 },
                                            end: { line: 33, column: 46 },
                                          },
                                          object: {
                                            type: "MemberExpression",
                                            loc: {
                                              start: { line: 33, column: 33 },
                                              end: { line: 33, column: 42 },
                                            },
                                            object: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 33, column: 33 },
                                                end: { line: 33, column: 36 },
                                              },
                                              name: "row",
                                              key: "row$30ur5mgzea4v6$5",
                                            },
                                            property: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 33, column: 37 },
                                                end: { line: 33, column: 42 },
                                              },
                                              name: "label",
                                            },
                                            computed: false,
                                            optional: false,
                                          },
                                          property: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 33, column: 43 },
                                              end: { line: 33, column: 46 },
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
                                              start: { line: 33, column: 47 },
                                              end: { line: 33, column: 56 },
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
                                  start: { line: 34, column: 16 },
                                  end: { line: 34, column: 16 },
                                },
                                value: "\n                ",
                                raw: "\n                ",
                              },
                              {
                                type: "JSXExpressionContainer",
                                loc: {
                                  start: { line: 34, column: 16 },
                                  end: { line: 34, column: 33 },
                                },
                                expression: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 34, column: 17 },
                                    end: { line: 34, column: 32 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 34, column: 17 },
                                      end: { line: 34, column: 30 },
                                    },
                                    object: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 34, column: 17 },
                                        end: { line: 34, column: 26 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 34, column: 17 },
                                          end: { line: 34, column: 20 },
                                        },
                                        name: "row",
                                        key: "row$30ur5mgzea4v6$5",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 34, column: 21 },
                                          end: { line: 34, column: 26 },
                                        },
                                        name: "label",
                                      },
                                      computed: false,
                                      optional: false,
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 34, column: 27 },
                                        end: { line: 34, column: 30 },
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
                                  start: { line: 35, column: 14 },
                                  end: { line: 35, column: 14 },
                                },
                                value: "\n              ",
                                raw: "\n              ",
                              },
                            ],
                            closingElement: {
                              type: "JSXClosingElement",
                              loc: {
                                start: { line: 35, column: 14 },
                                end: { line: 35, column: 19 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 35, column: 16 },
                                  end: { line: 35, column: 18 },
                                },
                                name: "li",
                              },
                            },
                          },
                          expression: true,
                        },
                      },
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 37, column: 10 },
                          end: { line: 37, column: 10 },
                        },
                        value: "\n          ",
                        raw: "\n          ",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 37, column: 10 },
                        end: { line: 37, column: 16 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 37, column: 12 },
                          end: { line: 37, column: 15 },
                        },
                        name: "For",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 38, column: 8 },
                      end: { line: 38, column: 8 },
                    },
                    value: "\n        ",
                    raw: "\n        ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 38, column: 8 },
                    end: { line: 38, column: 13 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 38, column: 10 },
                      end: { line: 38, column: 12 },
                    },
                    name: "ul",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 39, column: 6 },
                  end: { line: 39, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 39, column: 6 },
                end: { line: 39, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 39, column: 8 },
                  end: { line: 39, column: 11 },
                },
                name: "div",
              },
            },
          },
        },
      ],
    }),
    'export default ($0, $1) => {\n    const build = (from) => {\n        return Array.from({ length: 3 }, (_, at) => {\n            return { id: from + at, label: $0()("row " + (from + at)) };\n        });\n    };\n    const held = $0()(build(1));\n    return (<div>\n        <ul class="rows">\n          <$1 each={held.get()}>\n            {(row) => (<li onclick={() => row.label.set("pressed")}>\n                {row.label.get()}\n              </li>)}\n          </$1>\n        </ul>\n      </div>);\n};',
    '{"version":3,"file":"member-state.test.jsx","sourceRoot":"","sources":["member-state.test.tsx"],"names":[],"mappings":"eAkBY;IACR,MAAM,KAAK,GAAG,CAAC,IAAY,EAAE,EAAE;QAC7B,OAAO,KAAK,CAAC,IAAI,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,EAAE,CAAC,CAAC,EAAE,EAAE,EAAE,EAAE;YACzC,OAAO,EAAE,EAAE,EAAE,IAAI,GAAG,EAAE,EAAE,KAAK,EAAE,IAAM,CAAC,MAAM,GAAG,CAAC,IAAI,GAAG,EAAE,CAAC,CAAC,EAAE,CAAC;QAChE,CAAC,CAAC,CAAC;IACL,CAAC,CAAC;IAEF,MAAM,IAAI,GAAG,IAAM,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC;IAE9B,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,EAAE,CAAC,KAAK,CAAC,MAAM,CACd;UAAA,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,GAAG,EAAE,CAAC,CACpB;YAAA,CAAC,CAAC,GAAQ,EAAE,EAAE,CAAC,CACb,CAAC,EAAE,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,CAAC,SAAS,CAAC,CAAC,CAC1C;gBAAA,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAE,CAClB;cAAA,EAAE,EAAE,CAAC,CACN,CACH;UAAA,EAAE,EAAG,CACP;QAAA,EAAE,EAAE,CACN;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
  );
}
it("MemberRows", async (t) => {
  await snapshotCase(t, "MemberRows", _jsx(MemberRows, {}));
});
