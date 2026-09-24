import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
// js-framework-benchmark's "partial update": every other row's label grows,
// and each label is a cell of its own. Writing one is a write to that row's
// text, and nothing else: no row is rebuilt, and no other row hears of it.
async function Labels() {
  return cs.create(
    { start: { line: 12, column: 9 }, end: { line: 39, column: 4 } },
    {
      version: "0.0.0",
      filePath: "dom-writes/partial-update.test.tsx",
      fileHash: "2tlccuo5yvrz7",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 12, column: 12 }, end: { line: 39, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: { start: { line: 13, column: 4 }, end: { line: 16, column: 8 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 13, column: 10 },
                end: { line: 16, column: 7 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 13, column: 10 },
                  end: { line: 13, column: 14 },
                },
                name: "rows",
                key: "rows$2tlccuo5yvrz7$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 13, column: 17 },
                  end: { line: 16, column: 7 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 13, column: 17 },
                    end: { line: 13, column: 33 },
                  },
                  object: {
                    type: "ArrayExpression",
                    loc: {
                      start: { line: 13, column: 17 },
                      end: { line: 13, column: 29 },
                    },
                    elements: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 13, column: 18 },
                          end: { line: 13, column: 19 },
                        },
                        value: 1,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 13, column: 21 },
                          end: { line: 13, column: 22 },
                        },
                        value: 2,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 13, column: 24 },
                          end: { line: 13, column: 25 },
                        },
                        value: 3,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 13, column: 27 },
                          end: { line: 13, column: 28 },
                        },
                        value: 4,
                      },
                    ],
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 13, column: 30 },
                      end: { line: 13, column: 33 },
                    },
                    name: "map",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 13, column: 34 },
                      end: { line: 16, column: 6 },
                    },
                    params: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 13, column: 35 },
                          end: { line: 13, column: 37 },
                        },
                        name: "id",
                        key: "id$2tlccuo5yvrz7$2",
                      },
                    ],
                    body: {
                      type: "ObjectExpression",
                      loc: {
                        start: { line: 13, column: 51 },
                        end: { line: 16, column: 5 },
                      },
                      properties: [
                        {
                          type: "Property",
                          loc: {
                            start: { line: 14, column: 6 },
                            end: { line: 14, column: 12 },
                          },
                          key: {
                            type: "Identifier",
                            loc: {
                              start: { line: 14, column: 6 },
                              end: { line: 14, column: 8 },
                            },
                            name: "id",
                          },
                          value: {
                            type: "Identifier",
                            loc: {
                              start: { line: 14, column: 10 },
                              end: { line: 14, column: 12 },
                            },
                            name: "id",
                            key: "id$2tlccuo5yvrz7$2",
                          },
                          kind: "init",
                          computed: false,
                          method: false,
                          shorthand: false,
                        },
                        {
                          type: "Property",
                          loc: {
                            start: { line: 15, column: 6 },
                            end: { line: 15, column: 32 },
                          },
                          key: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 6 },
                              end: { line: 15, column: 11 },
                            },
                            name: "label",
                          },
                          value: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 15, column: 13 },
                              end: { line: 15, column: 32 },
                            },
                            callee: {
                              type: "Splice",
                              loc: {
                                start: { line: 15, column: 13 },
                                end: { line: 15, column: 19 },
                              },
                              key: "$state",
                            },
                            arguments: [
                              {
                                type: "BinaryExpression",
                                loc: {
                                  start: { line: 15, column: 20 },
                                  end: { line: 15, column: 31 },
                                },
                                operator: "+",
                                left: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 15, column: 20 },
                                    end: { line: 15, column: 26 },
                                  },
                                  value: "row ",
                                },
                                right: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 15, column: 29 },
                                    end: { line: 15, column: 31 },
                                  },
                                  name: "id",
                                  key: "id$2tlccuo5yvrz7$2",
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
                    expression: true,
                  },
                ],
                optional: false,
              },
            },
          ],
        },
        {
          type: "VariableDeclaration",
          loc: { start: { line: 17, column: 4 }, end: { line: 22, column: 6 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 17, column: 10 },
                end: { line: 22, column: 5 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 17, column: 10 },
                  end: { line: 17, column: 16 },
                },
                name: "update",
                key: "update$2tlccuo5yvrz7$1",
              },
              init: {
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 17, column: 19 },
                  end: { line: 22, column: 5 },
                },
                params: [],
                body: {
                  type: "BlockStatement",
                  loc: {
                    start: { line: 17, column: 25 },
                    end: { line: 22, column: 5 },
                  },
                  body: [
                    {
                      type: "ForStatement",
                      loc: {
                        start: { line: 18, column: 6 },
                        end: { line: 21, column: 7 },
                      },
                      init: {
                        type: "VariableDeclaration",
                        loc: {
                          start: { line: 18, column: 11 },
                          end: { line: 18, column: 24 },
                        },
                        kind: "let",
                        declarations: [
                          {
                            type: "VariableDeclarator",
                            loc: {
                              start: { line: 18, column: 15 },
                              end: { line: 18, column: 24 },
                            },
                            id: {
                              type: "Identifier",
                              loc: {
                                start: { line: 18, column: 15 },
                                end: { line: 18, column: 20 },
                              },
                              name: "index",
                              key: "index$2tlccuo5yvrz7$3",
                            },
                            init: {
                              type: "Literal",
                              loc: {
                                start: { line: 18, column: 23 },
                                end: { line: 18, column: 24 },
                              },
                              value: 0,
                            },
                          },
                        ],
                      },
                      test: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 18, column: 26 },
                          end: { line: 18, column: 45 },
                        },
                        operator: "<",
                        left: {
                          type: "Identifier",
                          loc: {
                            start: { line: 18, column: 26 },
                            end: { line: 18, column: 31 },
                          },
                          name: "index",
                          key: "index$2tlccuo5yvrz7$3",
                        },
                        right: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 18, column: 34 },
                            end: { line: 18, column: 45 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 18, column: 34 },
                              end: { line: 18, column: 38 },
                            },
                            name: "rows",
                            key: "rows$2tlccuo5yvrz7$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 18, column: 39 },
                              end: { line: 18, column: 45 },
                            },
                            name: "length",
                          },
                          computed: false,
                          optional: false,
                        },
                      },
                      update: {
                        type: "AssignmentExpression",
                        loc: {
                          start: { line: 18, column: 47 },
                          end: { line: 18, column: 64 },
                        },
                        operator: "=",
                        left: {
                          type: "Identifier",
                          loc: {
                            start: { line: 18, column: 47 },
                            end: { line: 18, column: 52 },
                          },
                          name: "index",
                          key: "index$2tlccuo5yvrz7$3",
                        },
                        right: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 18, column: 55 },
                            end: { line: 18, column: 64 },
                          },
                          operator: "+",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 18, column: 55 },
                              end: { line: 18, column: 60 },
                            },
                            name: "index",
                            key: "index$2tlccuo5yvrz7$3",
                          },
                          right: {
                            type: "Literal",
                            loc: {
                              start: { line: 18, column: 63 },
                              end: { line: 18, column: 64 },
                            },
                            value: 2,
                          },
                        },
                      },
                      body: {
                        type: "BlockStatement",
                        loc: {
                          start: { line: 18, column: 66 },
                          end: { line: 21, column: 7 },
                        },
                        body: [
                          {
                            type: "VariableDeclaration",
                            loc: {
                              start: { line: 19, column: 8 },
                              end: { line: 19, column: 40 },
                            },
                            kind: "const",
                            declarations: [
                              {
                                type: "VariableDeclarator",
                                loc: {
                                  start: { line: 19, column: 14 },
                                  end: { line: 19, column: 39 },
                                },
                                id: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 19, column: 14 },
                                    end: { line: 19, column: 19 },
                                  },
                                  name: "label",
                                  key: "label$2tlccuo5yvrz7$4",
                                },
                                init: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 19, column: 22 },
                                    end: { line: 19, column: 39 },
                                  },
                                  object: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 19, column: 22 },
                                      end: { line: 19, column: 33 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 19, column: 22 },
                                        end: { line: 19, column: 26 },
                                      },
                                      name: "rows",
                                      key: "rows$2tlccuo5yvrz7$0",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 19, column: 27 },
                                        end: { line: 19, column: 32 },
                                      },
                                      name: "index",
                                      key: "index$2tlccuo5yvrz7$3",
                                    },
                                    computed: true,
                                    optional: false,
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 19, column: 34 },
                                      end: { line: 19, column: 39 },
                                    },
                                    name: "label",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                              },
                            ],
                          },
                          {
                            type: "ExpressionStatement",
                            loc: {
                              start: { line: 20, column: 8 },
                              end: { line: 20, column: 40 },
                            },
                            expression: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 20, column: 8 },
                                end: { line: 20, column: 39 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 20, column: 8 },
                                  end: { line: 20, column: 17 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 20, column: 8 },
                                    end: { line: 20, column: 13 },
                                  },
                                  name: "label",
                                  key: "label$2tlccuo5yvrz7$4",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 20, column: 14 },
                                    end: { line: 20, column: 17 },
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
                                    start: { line: 20, column: 18 },
                                    end: { line: 20, column: 38 },
                                  },
                                  operator: "+",
                                  left: {
                                    type: "CallExpression",
                                    loc: {
                                      start: { line: 20, column: 18 },
                                      end: { line: 20, column: 29 },
                                    },
                                    callee: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 20, column: 18 },
                                        end: { line: 20, column: 27 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 20, column: 18 },
                                          end: { line: 20, column: 23 },
                                        },
                                        name: "label",
                                        key: "label$2tlccuo5yvrz7$4",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 20, column: 24 },
                                          end: { line: 20, column: 27 },
                                        },
                                        name: "get",
                                      },
                                      computed: false,
                                      optional: false,
                                    },
                                    arguments: [],
                                    optional: false,
                                  },
                                  right: {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 20, column: 32 },
                                      end: { line: 20, column: 38 },
                                    },
                                    value: " !!!",
                                  },
                                },
                              ],
                              optional: false,
                            },
                          },
                        ],
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
          loc: { start: { line: 23, column: 4 }, end: { line: 38, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 24, column: 6 },
              end: { line: 37, column: 12 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 24, column: 6 },
                end: { line: 24, column: 11 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 24, column: 7 },
                  end: { line: 24, column: 10 },
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
                  start: { line: 25, column: 8 },
                  end: { line: 25, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 25, column: 8 },
                  end: { line: 25, column: 48 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 25, column: 8 },
                    end: { line: 25, column: 33 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 25, column: 9 },
                      end: { line: 25, column: 15 },
                    },
                    name: "button",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 25, column: 16 },
                        end: { line: 25, column: 32 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 25, column: 16 },
                          end: { line: 25, column: 23 },
                        },
                        name: "onclick",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 25, column: 24 },
                          end: { line: 25, column: 32 },
                        },
                        expression: {
                          type: "Identifier",
                          loc: {
                            start: { line: 25, column: 25 },
                            end: { line: 25, column: 31 },
                          },
                          name: "update",
                          key: "update$2tlccuo5yvrz7$1",
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
                      start: { line: 25, column: 33 },
                      end: { line: 25, column: 39 },
                    },
                    value: "update",
                    raw: "update",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 25, column: 39 },
                    end: { line: 25, column: 48 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 25, column: 41 },
                      end: { line: 25, column: 47 },
                    },
                    name: "button",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 26, column: 8 },
                  end: { line: 26, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 26, column: 8 },
                  end: { line: 36, column: 16 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 26, column: 8 },
                    end: { line: 26, column: 15 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 26, column: 9 },
                      end: { line: 26, column: 14 },
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
                      end: { line: 35, column: 18 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 27, column: 10 },
                        end: { line: 27, column: 17 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 27, column: 11 },
                          end: { line: 27, column: 16 },
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
                          start: { line: 28, column: 12 },
                          end: { line: 28, column: 12 },
                        },
                        value: "\n            ",
                        raw: "\n            ",
                      },
                      {
                        type: "JSXElement",
                        loc: {
                          start: { line: 28, column: 12 },
                          end: { line: 34, column: 18 },
                        },
                        openingElement: {
                          type: "JSXOpeningElement",
                          loc: {
                            start: { line: 28, column: 12 },
                            end: { line: 28, column: 29 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 28, column: 13 },
                              end: { line: 28, column: 16 },
                            },
                            name: "For",
                          },
                          attributes: [
                            {
                              type: "JSXAttribute",
                              loc: {
                                start: { line: 28, column: 17 },
                                end: { line: 28, column: 28 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 28, column: 17 },
                                  end: { line: 28, column: 21 },
                                },
                                name: "each",
                              },
                              value: {
                                type: "JSXExpressionContainer",
                                loc: {
                                  start: { line: 28, column: 22 },
                                  end: { line: 28, column: 28 },
                                },
                                expression: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 28, column: 23 },
                                    end: { line: 28, column: 27 },
                                  },
                                  name: "rows",
                                  key: "rows$2tlccuo5yvrz7$0",
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
                              start: { line: 29, column: 14 },
                              end: { line: 29, column: 14 },
                            },
                            value: "\n              ",
                            raw: "\n              ",
                          },
                          {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 29, column: 14 },
                              end: { line: 33, column: 16 },
                            },
                            expression: {
                              type: "ArrowFunctionExpression",
                              loc: {
                                start: { line: 29, column: 15 },
                                end: { line: 33, column: 15 },
                              },
                              params: [
                                {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 29, column: 16 },
                                    end: { line: 29, column: 19 },
                                  },
                                  name: "row",
                                  key: "row$2tlccuo5yvrz7$5",
                                },
                              ],
                              body: {
                                type: "JSXElement",
                                loc: {
                                  start: { line: 30, column: 16 },
                                  end: { line: 32, column: 21 },
                                },
                                openingElement: {
                                  type: "JSXOpeningElement",
                                  loc: {
                                    start: { line: 30, column: 16 },
                                    end: { line: 30, column: 41 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 30, column: 17 },
                                      end: { line: 30, column: 19 },
                                    },
                                    name: "tr",
                                  },
                                  attributes: [
                                    {
                                      type: "JSXAttribute",
                                      loc: {
                                        start: { line: 30, column: 20 },
                                        end: { line: 30, column: 40 },
                                      },
                                      name: {
                                        type: "JSXIdentifier",
                                        loc: {
                                          start: { line: 30, column: 20 },
                                          end: { line: 30, column: 22 },
                                        },
                                        name: "id",
                                      },
                                      value: {
                                        type: "JSXExpressionContainer",
                                        loc: {
                                          start: { line: 30, column: 23 },
                                          end: { line: 30, column: 40 },
                                        },
                                        expression: {
                                          type: "BinaryExpression",
                                          loc: {
                                            start: { line: 30, column: 24 },
                                            end: { line: 30, column: 39 },
                                          },
                                          operator: "+",
                                          left: {
                                            type: "Literal",
                                            loc: {
                                              start: { line: 30, column: 24 },
                                              end: { line: 30, column: 30 },
                                            },
                                            value: "row-",
                                          },
                                          right: {
                                            type: "MemberExpression",
                                            loc: {
                                              start: { line: 30, column: 33 },
                                              end: { line: 30, column: 39 },
                                            },
                                            object: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 30, column: 33 },
                                                end: { line: 30, column: 36 },
                                              },
                                              name: "row",
                                              key: "row$2tlccuo5yvrz7$5",
                                            },
                                            property: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 30, column: 37 },
                                                end: { line: 30, column: 39 },
                                              },
                                              name: "id",
                                            },
                                            computed: false,
                                            optional: false,
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
                                      start: { line: 31, column: 18 },
                                      end: { line: 31, column: 18 },
                                    },
                                    value: "\n                  ",
                                    raw: "\n                  ",
                                  },
                                  {
                                    type: "JSXElement",
                                    loc: {
                                      start: { line: 31, column: 18 },
                                      end: { line: 31, column: 44 },
                                    },
                                    openingElement: {
                                      type: "JSXOpeningElement",
                                      loc: {
                                        start: { line: 31, column: 18 },
                                        end: { line: 31, column: 22 },
                                      },
                                      name: {
                                        type: "JSXIdentifier",
                                        loc: {
                                          start: { line: 31, column: 19 },
                                          end: { line: 31, column: 21 },
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
                                          start: { line: 31, column: 22 },
                                          end: { line: 31, column: 39 },
                                        },
                                        expression: {
                                          type: "CallExpression",
                                          loc: {
                                            start: { line: 31, column: 23 },
                                            end: { line: 31, column: 38 },
                                          },
                                          callee: {
                                            type: "MemberExpression",
                                            loc: {
                                              start: { line: 31, column: 23 },
                                              end: { line: 31, column: 36 },
                                            },
                                            object: {
                                              type: "MemberExpression",
                                              loc: {
                                                start: { line: 31, column: 23 },
                                                end: { line: 31, column: 32 },
                                              },
                                              object: {
                                                type: "Identifier",
                                                loc: {
                                                  start: {
                                                    line: 31,
                                                    column: 23,
                                                  },
                                                  end: { line: 31, column: 26 },
                                                },
                                                name: "row",
                                                key: "row$2tlccuo5yvrz7$5",
                                              },
                                              property: {
                                                type: "Identifier",
                                                loc: {
                                                  start: {
                                                    line: 31,
                                                    column: 27,
                                                  },
                                                  end: { line: 31, column: 32 },
                                                },
                                                name: "label",
                                              },
                                              computed: false,
                                              optional: false,
                                            },
                                            property: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 31, column: 33 },
                                                end: { line: 31, column: 36 },
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
                                    closingElement: {
                                      type: "JSXClosingElement",
                                      loc: {
                                        start: { line: 31, column: 39 },
                                        end: { line: 31, column: 44 },
                                      },
                                      name: {
                                        type: "JSXIdentifier",
                                        loc: {
                                          start: { line: 31, column: 41 },
                                          end: { line: 31, column: 43 },
                                        },
                                        name: "td",
                                      },
                                    },
                                  },
                                  {
                                    type: "JSXText",
                                    loc: {
                                      start: { line: 32, column: 16 },
                                      end: { line: 32, column: 16 },
                                    },
                                    value: "\n                ",
                                    raw: "\n                ",
                                  },
                                ],
                                closingElement: {
                                  type: "JSXClosingElement",
                                  loc: {
                                    start: { line: 32, column: 16 },
                                    end: { line: 32, column: 21 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 32, column: 18 },
                                      end: { line: 32, column: 20 },
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
                              start: { line: 34, column: 12 },
                              end: { line: 34, column: 12 },
                            },
                            value: "\n            ",
                            raw: "\n            ",
                          },
                        ],
                        closingElement: {
                          type: "JSXClosingElement",
                          loc: {
                            start: { line: 34, column: 12 },
                            end: { line: 34, column: 18 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 34, column: 14 },
                              end: { line: 34, column: 17 },
                            },
                            name: "For",
                          },
                        },
                      },
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 35, column: 10 },
                          end: { line: 35, column: 10 },
                        },
                        value: "\n          ",
                        raw: "\n          ",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 35, column: 10 },
                        end: { line: 35, column: 18 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 35, column: 12 },
                          end: { line: 35, column: 17 },
                        },
                        name: "tbody",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 36, column: 8 },
                      end: { line: 36, column: 8 },
                    },
                    value: "\n        ",
                    raw: "\n        ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 36, column: 8 },
                    end: { line: 36, column: 16 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 36, column: 10 },
                      end: { line: 36, column: 15 },
                    },
                    name: "table",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 37, column: 6 },
                  end: { line: 37, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 37, column: 6 },
                end: { line: 37, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 37, column: 8 },
                  end: { line: 37, column: 11 },
                },
                name: "div",
              },
            },
          },
        },
      ],
    }),
  );
}
it("a label written changes that label's text and nothing else", async () => {
  const { container } = await render(_jsx(Labels, {}));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "update" }));
  assert.deepEqual(written(), [
    'text: "row 1" → "row 1 !!!"',
    'text: "row 3" → "row 3 !!!"',
  ]);
});
