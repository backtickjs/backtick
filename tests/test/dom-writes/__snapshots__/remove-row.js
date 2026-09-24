import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
// js-framework-benchmark's "remove row": one row in the middle goes. The rows
// after it close up by staying where they are, so what is written is the one
// removal.
async function RemovableRows() {
  return cs.create(
    { start: { line: 12, column: 9 }, end: { line: 35, column: 4 } },
    {
      filePath: "dom-writes/remove-row.test.tsx",
      fileHash: "1dh0kxf6cd5v6",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 12, column: 12 }, end: { line: 35, column: 3 } },
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
                key: "ids$1dh0kxf6cd5v6$0",
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
                  key: "$state",
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
          type: "ReturnStatement",
          loc: { start: { line: 14, column: 4 }, end: { line: 34, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 33, column: 14 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 15, column: 6 },
                end: { line: 15, column: 13 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 15, column: 7 },
                  end: { line: 15, column: 12 },
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
                  start: { line: 16, column: 8 },
                  end: { line: 16, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 16, column: 8 },
                  end: { line: 32, column: 16 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 16, column: 8 },
                    end: { line: 16, column: 15 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 16, column: 9 },
                      end: { line: 16, column: 14 },
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
                      start: { line: 17, column: 10 },
                      end: { line: 17, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 17, column: 10 },
                      end: { line: 31, column: 16 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 17, column: 10 },
                        end: { line: 17, column: 32 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 17, column: 11 },
                          end: { line: 17, column: 14 },
                        },
                        name: "For",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 17, column: 15 },
                            end: { line: 17, column: 31 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 17, column: 15 },
                              end: { line: 17, column: 19 },
                            },
                            name: "each",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 17, column: 20 },
                              end: { line: 17, column: 31 },
                            },
                            expression: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 17, column: 21 },
                                end: { line: 17, column: 30 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 17, column: 21 },
                                  end: { line: 17, column: 28 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 17, column: 21 },
                                    end: { line: 17, column: 24 },
                                  },
                                  name: "ids",
                                  key: "ids$1dh0kxf6cd5v6$0",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 17, column: 25 },
                                    end: { line: 17, column: 28 },
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
                          start: { line: 18, column: 12 },
                          end: { line: 18, column: 12 },
                        },
                        value: "\n            ",
                        raw: "\n            ",
                      },
                      {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 18, column: 12 },
                          end: { line: 30, column: 14 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 18, column: 13 },
                            end: { line: 30, column: 13 },
                          },
                          params: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 18, column: 14 },
                                end: { line: 18, column: 16 },
                              },
                              name: "id",
                              key: "id$1dh0kxf6cd5v6$1",
                            },
                          ],
                          body: {
                            type: "JSXElement",
                            loc: {
                              start: { line: 19, column: 14 },
                              end: { line: 29, column: 19 },
                            },
                            openingElement: {
                              type: "JSXOpeningElement",
                              loc: {
                                start: { line: 19, column: 14 },
                                end: { line: 19, column: 35 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 19, column: 15 },
                                  end: { line: 19, column: 17 },
                                },
                                name: "tr",
                              },
                              attributes: [
                                {
                                  type: "JSXAttribute",
                                  loc: {
                                    start: { line: 19, column: 18 },
                                    end: { line: 19, column: 34 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 19, column: 18 },
                                      end: { line: 19, column: 20 },
                                    },
                                    name: "id",
                                  },
                                  value: {
                                    type: "JSXExpressionContainer",
                                    loc: {
                                      start: { line: 19, column: 21 },
                                      end: { line: 19, column: 34 },
                                    },
                                    expression: {
                                      type: "BinaryExpression",
                                      loc: {
                                        start: { line: 19, column: 22 },
                                        end: { line: 19, column: 33 },
                                      },
                                      operator: "+",
                                      left: {
                                        type: "Literal",
                                        loc: {
                                          start: { line: 19, column: 22 },
                                          end: { line: 19, column: 28 },
                                        },
                                        value: "row-",
                                      },
                                      right: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 19, column: 31 },
                                          end: { line: 19, column: 33 },
                                        },
                                        name: "id",
                                        key: "id$1dh0kxf6cd5v6$1",
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
                                  start: { line: 20, column: 16 },
                                  end: { line: 20, column: 16 },
                                },
                                value: "\n                ",
                                raw: "\n                ",
                              },
                              {
                                type: "JSXElement",
                                loc: {
                                  start: { line: 20, column: 16 },
                                  end: { line: 28, column: 21 },
                                },
                                openingElement: {
                                  type: "JSXOpeningElement",
                                  loc: {
                                    start: { line: 20, column: 16 },
                                    end: { line: 20, column: 20 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 20, column: 17 },
                                      end: { line: 20, column: 19 },
                                    },
                                    name: "td",
                                  },
                                  attributes: [],
                                  selfClosing: false,
                                },
                                children: [
                                  {
                                    type: "JSXText",
                                    loc: {
                                      start: { line: 21, column: 18 },
                                      end: { line: 21, column: 18 },
                                    },
                                    value: "\n                  ",
                                    raw: "\n                  ",
                                  },
                                  {
                                    type: "JSXElement",
                                    loc: {
                                      start: { line: 21, column: 18 },
                                      end: { line: 27, column: 27 },
                                    },
                                    openingElement: {
                                      type: "JSXOpeningElement",
                                      loc: {
                                        start: { line: 21, column: 18 },
                                        end: { line: 25, column: 19 },
                                      },
                                      name: {
                                        type: "JSXIdentifier",
                                        loc: {
                                          start: { line: 21, column: 19 },
                                          end: { line: 21, column: 25 },
                                        },
                                        name: "button",
                                      },
                                      attributes: [
                                        {
                                          type: "JSXAttribute",
                                          loc: {
                                            start: { line: 22, column: 20 },
                                            end: { line: 24, column: 21 },
                                          },
                                          name: {
                                            type: "JSXIdentifier",
                                            loc: {
                                              start: { line: 22, column: 20 },
                                              end: { line: 22, column: 27 },
                                            },
                                            name: "onclick",
                                          },
                                          value: {
                                            type: "JSXExpressionContainer",
                                            loc: {
                                              start: { line: 22, column: 28 },
                                              end: { line: 24, column: 21 },
                                            },
                                            expression: {
                                              type: "ArrowFunctionExpression",
                                              loc: {
                                                start: { line: 22, column: 29 },
                                                end: { line: 23, column: 70 },
                                              },
                                              params: [],
                                              body: {
                                                type: "CallExpression",
                                                loc: {
                                                  start: {
                                                    line: 23,
                                                    column: 22,
                                                  },
                                                  end: { line: 23, column: 70 },
                                                },
                                                callee: {
                                                  type: "MemberExpression",
                                                  loc: {
                                                    start: {
                                                      line: 23,
                                                      column: 22,
                                                    },
                                                    end: {
                                                      line: 23,
                                                      column: 29,
                                                    },
                                                  },
                                                  object: {
                                                    type: "Identifier",
                                                    loc: {
                                                      start: {
                                                        line: 23,
                                                        column: 22,
                                                      },
                                                      end: {
                                                        line: 23,
                                                        column: 25,
                                                      },
                                                    },
                                                    name: "ids",
                                                    key: "ids$1dh0kxf6cd5v6$0",
                                                  },
                                                  property: {
                                                    type: "Identifier",
                                                    loc: {
                                                      start: {
                                                        line: 23,
                                                        column: 26,
                                                      },
                                                      end: {
                                                        line: 23,
                                                        column: 29,
                                                      },
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
                                                      start: {
                                                        line: 23,
                                                        column: 30,
                                                      },
                                                      end: {
                                                        line: 23,
                                                        column: 69,
                                                      },
                                                    },
                                                    callee: {
                                                      type: "MemberExpression",
                                                      loc: {
                                                        start: {
                                                          line: 23,
                                                          column: 30,
                                                        },
                                                        end: {
                                                          line: 23,
                                                          column: 46,
                                                        },
                                                      },
                                                      object: {
                                                        type: "CallExpression",
                                                        loc: {
                                                          start: {
                                                            line: 23,
                                                            column: 30,
                                                          },
                                                          end: {
                                                            line: 23,
                                                            column: 39,
                                                          },
                                                        },
                                                        callee: {
                                                          type: "MemberExpression",
                                                          loc: {
                                                            start: {
                                                              line: 23,
                                                              column: 30,
                                                            },
                                                            end: {
                                                              line: 23,
                                                              column: 37,
                                                            },
                                                          },
                                                          object: {
                                                            type: "Identifier",
                                                            loc: {
                                                              start: {
                                                                line: 23,
                                                                column: 30,
                                                              },
                                                              end: {
                                                                line: 23,
                                                                column: 33,
                                                              },
                                                            },
                                                            name: "ids",
                                                            key: "ids$1dh0kxf6cd5v6$0",
                                                          },
                                                          property: {
                                                            type: "Identifier",
                                                            loc: {
                                                              start: {
                                                                line: 23,
                                                                column: 34,
                                                              },
                                                              end: {
                                                                line: 23,
                                                                column: 37,
                                                              },
                                                            },
                                                            name: "get",
                                                          },
                                                          computed: false,
                                                          optional: false,
                                                        },
                                                        arguments: [],
                                                        optional: false,
                                                      },
                                                      property: {
                                                        type: "Identifier",
                                                        loc: {
                                                          start: {
                                                            line: 23,
                                                            column: 40,
                                                          },
                                                          end: {
                                                            line: 23,
                                                            column: 46,
                                                          },
                                                        },
                                                        name: "filter",
                                                      },
                                                      computed: false,
                                                      optional: false,
                                                    },
                                                    arguments: [
                                                      {
                                                        type: "ArrowFunctionExpression",
                                                        loc: {
                                                          start: {
                                                            line: 23,
                                                            column: 47,
                                                          },
                                                          end: {
                                                            line: 23,
                                                            column: 68,
                                                          },
                                                        },
                                                        params: [
                                                          {
                                                            type: "Identifier",
                                                            loc: {
                                                              start: {
                                                                line: 23,
                                                                column: 48,
                                                              },
                                                              end: {
                                                                line: 23,
                                                                column: 52,
                                                              },
                                                            },
                                                            name: "each",
                                                            key: "each$1dh0kxf6cd5v6$2",
                                                          },
                                                        ],
                                                        body: {
                                                          type: "BinaryExpression",
                                                          loc: {
                                                            start: {
                                                              line: 23,
                                                              column: 57,
                                                            },
                                                            end: {
                                                              line: 23,
                                                              column: 68,
                                                            },
                                                          },
                                                          operator: "!==",
                                                          left: {
                                                            type: "Identifier",
                                                            loc: {
                                                              start: {
                                                                line: 23,
                                                                column: 57,
                                                              },
                                                              end: {
                                                                line: 23,
                                                                column: 61,
                                                              },
                                                            },
                                                            name: "each",
                                                            key: "each$1dh0kxf6cd5v6$2",
                                                          },
                                                          right: {
                                                            type: "Identifier",
                                                            loc: {
                                                              start: {
                                                                line: 23,
                                                                column: 66,
                                                              },
                                                              end: {
                                                                line: 23,
                                                                column: 68,
                                                              },
                                                            },
                                                            name: "id",
                                                            key: "id$1dh0kxf6cd5v6$1",
                                                          },
                                                        },
                                                        expression: true,
                                                      },
                                                    ],
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
                                      selfClosing: false,
                                    },
                                    children: [
                                      {
                                        type: "JSXText",
                                        loc: {
                                          start: { line: 26, column: 20 },
                                          end: { line: 26, column: 20 },
                                        },
                                        value: "\n                    ",
                                        raw: "\n                    ",
                                      },
                                      {
                                        type: "JSXExpressionContainer",
                                        loc: {
                                          start: { line: 26, column: 20 },
                                          end: { line: 26, column: 36 },
                                        },
                                        expression: {
                                          type: "BinaryExpression",
                                          loc: {
                                            start: { line: 26, column: 21 },
                                            end: { line: 26, column: 35 },
                                          },
                                          operator: "+",
                                          left: {
                                            type: "Literal",
                                            loc: {
                                              start: { line: 26, column: 21 },
                                              end: { line: 26, column: 30 },
                                            },
                                            value: "remove ",
                                          },
                                          right: {
                                            type: "Identifier",
                                            loc: {
                                              start: { line: 26, column: 33 },
                                              end: { line: 26, column: 35 },
                                            },
                                            name: "id",
                                            key: "id$1dh0kxf6cd5v6$1",
                                          },
                                        },
                                      },
                                      {
                                        type: "JSXText",
                                        loc: {
                                          start: { line: 27, column: 18 },
                                          end: { line: 27, column: 18 },
                                        },
                                        value: "\n                  ",
                                        raw: "\n                  ",
                                      },
                                    ],
                                    closingElement: {
                                      type: "JSXClosingElement",
                                      loc: {
                                        start: { line: 27, column: 18 },
                                        end: { line: 27, column: 27 },
                                      },
                                      name: {
                                        type: "JSXIdentifier",
                                        loc: {
                                          start: { line: 27, column: 20 },
                                          end: { line: 27, column: 26 },
                                        },
                                        name: "button",
                                      },
                                    },
                                  },
                                  {
                                    type: "JSXText",
                                    loc: {
                                      start: { line: 28, column: 16 },
                                      end: { line: 28, column: 16 },
                                    },
                                    value: "\n                ",
                                    raw: "\n                ",
                                  },
                                ],
                                closingElement: {
                                  type: "JSXClosingElement",
                                  loc: {
                                    start: { line: 28, column: 16 },
                                    end: { line: 28, column: 21 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 28, column: 18 },
                                      end: { line: 28, column: 20 },
                                    },
                                    name: "td",
                                  },
                                },
                              },
                              {
                                type: "JSXText",
                                loc: {
                                  start: { line: 29, column: 14 },
                                  end: { line: 29, column: 14 },
                                },
                                value: "\n              ",
                                raw: "\n              ",
                              },
                            ],
                            closingElement: {
                              type: "JSXClosingElement",
                              loc: {
                                start: { line: 29, column: 14 },
                                end: { line: 29, column: 19 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 29, column: 16 },
                                  end: { line: 29, column: 18 },
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
                          start: { line: 31, column: 10 },
                          end: { line: 31, column: 10 },
                        },
                        value: "\n          ",
                        raw: "\n          ",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 31, column: 10 },
                        end: { line: 31, column: 16 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 31, column: 12 },
                          end: { line: 31, column: 15 },
                        },
                        name: "For",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 32, column: 8 },
                      end: { line: 32, column: 8 },
                    },
                    value: "\n        ",
                    raw: "\n        ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 32, column: 8 },
                    end: { line: 32, column: 16 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 32, column: 10 },
                      end: { line: 32, column: 15 },
                    },
                    name: "tbody",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 33, column: 6 },
                  end: { line: 33, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 33, column: 6 },
                end: { line: 33, column: 14 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 33, column: 8 },
                  end: { line: 33, column: 13 },
                },
                name: "table",
              },
            },
          },
        },
      ],
    }),
  );
}
it("a removal takes out the one row", async () => {
  const { container } = await render(_jsx(RemovableRows, {}));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "remove 3" }));
  assert.deepEqual(written(), ["tbody − tr#row-3"]);
});
