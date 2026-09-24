import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, text } from "./dom.ts";
// A keyed list driven by a cell. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
async function SwappableRows() {
  return cs.create(
    { start: { line: 12, column: 9 }, end: { line: 32, column: 4 } },
    {
      version: "0.0.0",
      filePath: "state/keyed-rows.test.tsx",
      fileHash: "89rxx0ivccc7",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 12, column: 12 }, end: { line: 32, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 13, column: 4 },
            end: { line: 13, column: 44 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 13, column: 10 },
                end: { line: 13, column: 43 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 13, column: 10 },
                  end: { line: 13, column: 13 },
                },
                name: "ids",
                key: "ids$89rxx0ivccc7$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 13, column: 16 },
                  end: { line: 13, column: 43 },
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
                      end: { line: 13, column: 42 },
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
                key: "swap$89rxx0ivccc7$1",
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
                            key: "held$89rxx0ivccc7$3",
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
                                key: "ids$89rxx0ivccc7$0",
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
                            key: "ids$89rxx0ivccc7$0",
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
                                    key: "held$89rxx0ivccc7$3",
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
                                    value: 0,
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
                                      key: "held$89rxx0ivccc7$3",
                                    },
                                    property: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 16, column: 32 },
                                        end: { line: 16, column: 33 },
                                      },
                                      value: 2,
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
                                value: 2,
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
                                  key: "held$89rxx0ivccc7$3",
                                },
                                property: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 16, column: 49 },
                                    end: { line: 16, column: 50 },
                                  },
                                  value: 0,
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
          type: "VariableDeclaration",
          loc: { start: { line: 18, column: 4 }, end: { line: 20, column: 6 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 18, column: 10 },
                end: { line: 20, column: 5 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 18, column: 10 },
                  end: { line: 18, column: 14 },
                },
                name: "drop",
                key: "drop$89rxx0ivccc7$2",
              },
              init: {
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 18, column: 17 },
                  end: { line: 20, column: 5 },
                },
                params: [],
                body: {
                  type: "BlockStatement",
                  loc: {
                    start: { line: 18, column: 23 },
                    end: { line: 20, column: 5 },
                  },
                  body: [
                    {
                      type: "ExpressionStatement",
                      loc: {
                        start: { line: 19, column: 6 },
                        end: { line: 19, column: 50 },
                      },
                      expression: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 19, column: 6 },
                          end: { line: 19, column: 49 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 19, column: 6 },
                            end: { line: 19, column: 13 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 6 },
                              end: { line: 19, column: 9 },
                            },
                            name: "ids",
                            key: "ids$89rxx0ivccc7$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 10 },
                              end: { line: 19, column: 13 },
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
                              start: { line: 19, column: 14 },
                              end: { line: 19, column: 48 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 19, column: 14 },
                                end: { line: 19, column: 30 },
                              },
                              object: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 19, column: 14 },
                                  end: { line: 19, column: 23 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 19, column: 14 },
                                    end: { line: 19, column: 21 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 19, column: 14 },
                                      end: { line: 19, column: 17 },
                                    },
                                    name: "ids",
                                    key: "ids$89rxx0ivccc7$0",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 19, column: 18 },
                                      end: { line: 19, column: 21 },
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
                                  start: { line: 19, column: 24 },
                                  end: { line: 19, column: 30 },
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
                                  start: { line: 19, column: 31 },
                                  end: { line: 19, column: 47 },
                                },
                                params: [
                                  {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 19, column: 32 },
                                      end: { line: 19, column: 34 },
                                    },
                                    name: "id",
                                    key: "id$89rxx0ivccc7$4",
                                  },
                                ],
                                body: {
                                  type: "BinaryExpression",
                                  loc: {
                                    start: { line: 19, column: 39 },
                                    end: { line: 19, column: 47 },
                                  },
                                  operator: "!==",
                                  left: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 19, column: 39 },
                                      end: { line: 19, column: 41 },
                                    },
                                    name: "id",
                                    key: "id$89rxx0ivccc7$4",
                                  },
                                  right: {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 19, column: 46 },
                                      end: { line: 19, column: 47 },
                                    },
                                    value: 2,
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
          loc: { start: { line: 21, column: 4 }, end: { line: 31, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 22, column: 6 },
              end: { line: 30, column: 12 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 22, column: 6 },
                end: { line: 22, column: 11 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 22, column: 7 },
                  end: { line: 22, column: 10 },
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
                  start: { line: 23, column: 8 },
                  end: { line: 23, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 23, column: 8 },
                  end: { line: 23, column: 40 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 23, column: 8 },
                    end: { line: 23, column: 29 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 23, column: 9 },
                      end: { line: 23, column: 13 },
                    },
                    name: "span",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 23, column: 14 },
                        end: { line: 23, column: 28 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 23, column: 14 },
                          end: { line: 23, column: 21 },
                        },
                        name: "onclick",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 23, column: 22 },
                          end: { line: 23, column: 28 },
                        },
                        expression: {
                          type: "Identifier",
                          loc: {
                            start: { line: 23, column: 23 },
                            end: { line: 23, column: 27 },
                          },
                          name: "swap",
                          key: "swap$89rxx0ivccc7$1",
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
                      start: { line: 23, column: 29 },
                      end: { line: 23, column: 33 },
                    },
                    value: "swap",
                    raw: "swap",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 23, column: 33 },
                    end: { line: 23, column: 40 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 23, column: 35 },
                      end: { line: 23, column: 39 },
                    },
                    name: "span",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 24, column: 8 },
                  end: { line: 24, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 24, column: 8 },
                  end: { line: 24, column: 40 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 24, column: 8 },
                    end: { line: 24, column: 29 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 24, column: 9 },
                      end: { line: 24, column: 13 },
                    },
                    name: "span",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 24, column: 14 },
                        end: { line: 24, column: 28 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 24, column: 14 },
                          end: { line: 24, column: 21 },
                        },
                        name: "onclick",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 24, column: 22 },
                          end: { line: 24, column: 28 },
                        },
                        expression: {
                          type: "Identifier",
                          loc: {
                            start: { line: 24, column: 23 },
                            end: { line: 24, column: 27 },
                          },
                          name: "drop",
                          key: "drop$89rxx0ivccc7$2",
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
                      start: { line: 24, column: 29 },
                      end: { line: 24, column: 33 },
                    },
                    value: "drop",
                    raw: "drop",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 24, column: 33 },
                    end: { line: 24, column: 40 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 24, column: 35 },
                      end: { line: 24, column: 39 },
                    },
                    name: "span",
                  },
                },
              },
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
                  end: { line: 29, column: 14 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 25, column: 8 },
                    end: { line: 25, column: 13 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 25, column: 9 },
                      end: { line: 25, column: 12 },
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
                      end: { line: 28, column: 16 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 26, column: 10 },
                        end: { line: 26, column: 32 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 26, column: 11 },
                          end: { line: 26, column: 14 },
                        },
                        name: "For",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 26, column: 15 },
                            end: { line: 26, column: 31 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 26, column: 15 },
                              end: { line: 26, column: 19 },
                            },
                            name: "each",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 26, column: 20 },
                              end: { line: 26, column: 31 },
                            },
                            expression: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 26, column: 21 },
                                end: { line: 26, column: 30 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 26, column: 21 },
                                  end: { line: 26, column: 28 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 26, column: 21 },
                                    end: { line: 26, column: 24 },
                                  },
                                  name: "ids",
                                  key: "ids$89rxx0ivccc7$0",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 26, column: 25 },
                                    end: { line: 26, column: 28 },
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
                          start: { line: 27, column: 12 },
                          end: { line: 27, column: 12 },
                        },
                        value: "\n            ",
                        raw: "\n            ",
                      },
                      {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 27, column: 12 },
                          end: { line: 27, column: 56 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 27, column: 13 },
                            end: { line: 27, column: 55 },
                          },
                          params: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 27, column: 14 },
                                end: { line: 27, column: 16 },
                              },
                              name: "id",
                              key: "id$89rxx0ivccc7$5",
                            },
                          ],
                          body: {
                            type: "JSXElement",
                            loc: {
                              start: { line: 27, column: 29 },
                              end: { line: 27, column: 55 },
                            },
                            openingElement: {
                              type: "JSXOpeningElement",
                              loc: {
                                start: { line: 27, column: 29 },
                                end: { line: 27, column: 35 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 27, column: 30 },
                                  end: { line: 27, column: 34 },
                                },
                                name: "span",
                              },
                              attributes: [],
                              selfClosing: false,
                            },
                            children: [
                              {
                                type: "JSXExpressionContainer",
                                loc: {
                                  start: { line: 27, column: 35 },
                                  end: { line: 27, column: 48 },
                                },
                                expression: {
                                  type: "BinaryExpression",
                                  loc: {
                                    start: { line: 27, column: 36 },
                                    end: { line: 27, column: 47 },
                                  },
                                  operator: "+",
                                  left: {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 27, column: 36 },
                                      end: { line: 27, column: 42 },
                                    },
                                    value: "row ",
                                  },
                                  right: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 27, column: 45 },
                                      end: { line: 27, column: 47 },
                                    },
                                    name: "id",
                                    key: "id$89rxx0ivccc7$5",
                                  },
                                },
                              },
                            ],
                            closingElement: {
                              type: "JSXClosingElement",
                              loc: {
                                start: { line: 27, column: 48 },
                                end: { line: 27, column: 55 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 27, column: 50 },
                                  end: { line: 27, column: 54 },
                                },
                                name: "span",
                              },
                            },
                          },
                          expression: true,
                        },
                      },
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 28, column: 10 },
                          end: { line: 28, column: 10 },
                        },
                        value: "\n          ",
                        raw: "\n          ",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 28, column: 10 },
                        end: { line: 28, column: 16 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 28, column: 12 },
                          end: { line: 28, column: 15 },
                        },
                        name: "For",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 29, column: 8 },
                      end: { line: 29, column: 8 },
                    },
                    value: "\n        ",
                    raw: "\n        ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 29, column: 8 },
                    end: { line: 29, column: 14 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 29, column: 10 },
                      end: { line: 29, column: 13 },
                    },
                    name: "div",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 30, column: 6 },
                  end: { line: 30, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 30, column: 6 },
                end: { line: 30, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 30, column: 8 },
                  end: { line: 30, column: 11 },
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
describe("local state", () => {
  // A list is declared, so the client walks the array itself and a member is
  // named by its own identity. What that has to buy is node identity: a row
  // that moved is the node it was, and a row that went took its own node with
  // it — neither is anything a snapshot of the drawn markup can see, so both
  // are asserted on the nodes these hold across the write.
  it("a reordered list moves the rows it already built", async () => {
    const view = await drawn(_jsx(SwappableRows, {}));
    const [swap, , list] = children(view);
    assert.ok(swap !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 2", "row 3"]);
    const [first, , third] = [...list.children];
    await userEvent.click(swap);
    assert.deepEqual([...list.children].map(text), ["row 3", "row 2", "row 1"]);
    // The two that swapped are the nodes they were, at each other's places.
    assert.equal([...list.children][0], third);
    assert.equal([...list.children][2], first);
  });
  it("a list a row was dropped from draws the rest", async () => {
    const view = await drawn(_jsx(SwappableRows, {}));
    const [, drop, list] = children(view);
    assert.ok(drop !== undefined && list !== undefined);
    const [first, , third] = [...list.children];
    await userEvent.click(drop);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 3"]);
    // Only the row that went was touched; the rest kept their nodes.
    assert.deepEqual([...list.children], [first, third]);
  });
});
it("SwappableRows", async (t) => {
  await snapshotCase(t, "SwappableRows", _jsx(SwappableRows, {}));
});
