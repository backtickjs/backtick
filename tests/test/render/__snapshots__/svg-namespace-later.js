import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { namespaced } from "./dom.ts";
// Drawn after the first pass: a row the list adds on a write, and a `title` a
// condition shows, are SVG's because of where they stand, and the `title` after
// the `svg` is HTML's again.
const svgNamespaceLater = cs.create(
  { start: { line: 12, column: 26 }, end: { line: 27, column: 2 } },
  {
    version: "0.0.0",
    filePath: "render/svg-namespace-later.test.tsx",
    fileHash: "1brs7fv34j5dk",
    splices: {
      $state: { value: state, params: [] },
      $For: { value: For, params: [] },
    },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 12, column: 29 }, end: { line: 27, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 26 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 13, column: 8 },
              end: { line: 13, column: 25 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 13, column: 8 },
                end: { line: 13, column: 10 },
              },
              name: "xs",
              key: "xs$1brs7fv34j5dk$0",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 13, column: 13 },
                end: { line: 13, column: 25 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 13, column: 13 },
                  end: { line: 13, column: 19 },
                },
                key: "$state",
              },
              arguments: [
                {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 13, column: 20 },
                    end: { line: 13, column: 24 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 21 },
                        end: { line: 13, column: 23 },
                      },
                      value: 10,
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
        loc: { start: { line: 14, column: 2 }, end: { line: 14, column: 30 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 14, column: 8 },
              end: { line: 14, column: 29 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 14, column: 8 },
                end: { line: 14, column: 13 },
              },
              name: "shown",
              key: "shown$1brs7fv34j5dk$1",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 14, column: 16 },
                end: { line: 14, column: 29 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 14, column: 16 },
                  end: { line: 14, column: 22 },
                },
                key: "$state",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 23 },
                    end: { line: 14, column: 28 },
                  },
                  value: false,
                },
              ],
              optional: false,
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 16, column: 2 }, end: { line: 26, column: 4 } },
        argument: {
          type: "JSXElement",
          loc: {
            start: { line: 17, column: 4 },
            end: { line: 25, column: 10 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 17, column: 4 },
              end: { line: 17, column: 9 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 17, column: 5 },
                end: { line: 17, column: 8 },
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
                start: { line: 18, column: 6 },
                end: { line: 18, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 21, column: 12 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 18, column: 6 },
                  end: { line: 18, column: 31 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 18, column: 7 },
                    end: { line: 18, column: 10 },
                  },
                  name: "svg",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 18, column: 11 },
                      end: { line: 18, column: 30 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 18, column: 11 },
                        end: { line: 18, column: 18 },
                      },
                      name: "viewBox",
                    },
                    value: {
                      type: "Literal",
                      loc: {
                        start: { line: 18, column: 19 },
                        end: { line: 18, column: 30 },
                      },
                      value: "0 0 30 10",
                    },
                  },
                ],
                selfClosing: false,
              },
              children: [
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 19, column: 8 },
                    end: { line: 19, column: 8 },
                  },
                  value: "\n        ",
                  raw: "\n        ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 19, column: 8 },
                    end: { line: 19, column: 79 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 19, column: 8 },
                      end: { line: 19, column: 29 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 19, column: 9 },
                        end: { line: 19, column: 12 },
                      },
                      name: "For",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 19, column: 13 },
                          end: { line: 19, column: 28 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 19, column: 13 },
                            end: { line: 19, column: 17 },
                          },
                          name: "each",
                        },
                        value: {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 19, column: 18 },
                            end: { line: 19, column: 28 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 19, column: 19 },
                              end: { line: 19, column: 27 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 19, column: 19 },
                                end: { line: 19, column: 25 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 19, column: 19 },
                                  end: { line: 19, column: 21 },
                                },
                                name: "xs",
                                key: "xs$1brs7fv34j5dk$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 19, column: 22 },
                                  end: { line: 19, column: 25 },
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
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 19, column: 29 },
                        end: { line: 19, column: 73 },
                      },
                      expression: {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 19, column: 30 },
                          end: { line: 19, column: 72 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 31 },
                              end: { line: 19, column: 32 },
                            },
                            name: "x",
                            key: "x$1brs7fv34j5dk$2",
                          },
                        ],
                        body: {
                          type: "JSXElement",
                          loc: {
                            start: { line: 19, column: 45 },
                            end: { line: 19, column: 72 },
                          },
                          openingElement: {
                            type: "JSXOpeningElement",
                            loc: {
                              start: { line: 19, column: 45 },
                              end: { line: 19, column: 52 },
                            },
                            name: {
                              type: "JSXIdentifier",
                              loc: {
                                start: { line: 19, column: 46 },
                                end: { line: 19, column: 51 },
                              },
                              name: "title",
                            },
                            attributes: [],
                            selfClosing: false,
                          },
                          children: [
                            {
                              type: "JSXExpressionContainer",
                              loc: {
                                start: { line: 19, column: 52 },
                                end: { line: 19, column: 64 },
                              },
                              expression: {
                                type: "BinaryExpression",
                                loc: {
                                  start: { line: 19, column: 53 },
                                  end: { line: 19, column: 63 },
                                },
                                operator: "+",
                                left: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 19, column: 53 },
                                    end: { line: 19, column: 59 },
                                  },
                                  value: "dot ",
                                },
                                right: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 19, column: 62 },
                                    end: { line: 19, column: 63 },
                                  },
                                  name: "x",
                                  key: "x$1brs7fv34j5dk$2",
                                },
                              },
                            },
                          ],
                          closingElement: {
                            type: "JSXClosingElement",
                            loc: {
                              start: { line: 19, column: 64 },
                              end: { line: 19, column: 72 },
                            },
                            name: {
                              type: "JSXIdentifier",
                              loc: {
                                start: { line: 19, column: 66 },
                                end: { line: 19, column: 71 },
                              },
                              name: "title",
                            },
                          },
                        },
                        expression: true,
                      },
                    },
                  ],
                  closingElement: {
                    type: "JSXClosingElement",
                    loc: {
                      start: { line: 19, column: 73 },
                      end: { line: 19, column: 79 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 19, column: 75 },
                        end: { line: 19, column: 78 },
                      },
                      name: "For",
                    },
                  },
                },
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
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 20, column: 8 },
                    end: { line: 20, column: 55 },
                  },
                  expression: {
                    type: "ConditionalExpression",
                    loc: {
                      start: { line: 20, column: 9 },
                      end: { line: 20, column: 54 },
                    },
                    test: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 20, column: 9 },
                        end: { line: 20, column: 20 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 20, column: 9 },
                          end: { line: 20, column: 18 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 20, column: 9 },
                            end: { line: 20, column: 14 },
                          },
                          name: "shown",
                          key: "shown$1brs7fv34j5dk$1",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 20, column: 15 },
                            end: { line: 20, column: 18 },
                          },
                          name: "get",
                        },
                        computed: false,
                        optional: false,
                      },
                      arguments: [],
                      optional: false,
                    },
                    consequent: {
                      type: "JSXElement",
                      loc: {
                        start: { line: 20, column: 23 },
                        end: { line: 20, column: 47 },
                      },
                      openingElement: {
                        type: "JSXOpeningElement",
                        loc: {
                          start: { line: 20, column: 23 },
                          end: { line: 20, column: 30 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 20, column: 24 },
                            end: { line: 20, column: 29 },
                          },
                          name: "title",
                        },
                        attributes: [],
                        selfClosing: false,
                      },
                      children: [
                        {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 20, column: 30 },
                            end: { line: 20, column: 39 },
                          },
                          expression: {
                            type: "Literal",
                            loc: {
                              start: { line: 20, column: 31 },
                              end: { line: 20, column: 38 },
                            },
                            value: "shown",
                          },
                        },
                      ],
                      closingElement: {
                        type: "JSXClosingElement",
                        loc: {
                          start: { line: 20, column: 39 },
                          end: { line: 20, column: 47 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 20, column: 41 },
                            end: { line: 20, column: 46 },
                          },
                          name: "title",
                        },
                      },
                    },
                    alternate: {
                      type: "Literal",
                      loc: {
                        start: { line: 20, column: 50 },
                        end: { line: 20, column: 54 },
                      },
                      value: null,
                    },
                  },
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 21, column: 6 },
                    end: { line: 21, column: 6 },
                  },
                  value: "\n      ",
                  raw: "\n      ",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 21, column: 6 },
                  end: { line: 21, column: 12 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 21, column: 8 },
                    end: { line: 21, column: 11 },
                  },
                  name: "svg",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 22, column: 6 },
                end: { line: 22, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 22, column: 6 },
                end: { line: 22, column: 30 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 22, column: 6 },
                  end: { line: 22, column: 13 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 22, column: 7 },
                    end: { line: 22, column: 12 },
                  },
                  name: "title",
                },
                attributes: [],
                selfClosing: false,
              },
              children: [
                {
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 22, column: 13 },
                    end: { line: 22, column: 22 },
                  },
                  expression: {
                    type: "Literal",
                    loc: {
                      start: { line: 22, column: 14 },
                      end: { line: 22, column: 21 },
                    },
                    value: "after",
                  },
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 22, column: 22 },
                  end: { line: 22, column: 30 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 22, column: 24 },
                    end: { line: 22, column: 29 },
                  },
                  name: "title",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 23, column: 6 },
                end: { line: 23, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 23, column: 6 },
                end: { line: 23, column: 59 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 23, column: 6 },
                  end: { line: 23, column: 47 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 23, column: 7 },
                    end: { line: 23, column: 13 },
                  },
                  name: "button",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 23, column: 14 },
                      end: { line: 23, column: 46 },
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
                        end: { line: 23, column: 46 },
                      },
                      expression: {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 23, column: 23 },
                          end: { line: 23, column: 45 },
                        },
                        params: [],
                        body: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 23, column: 29 },
                            end: { line: 23, column: 45 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 23, column: 29 },
                              end: { line: 23, column: 35 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 23, column: 29 },
                                end: { line: 23, column: 31 },
                              },
                              name: "xs",
                              key: "xs$1brs7fv34j5dk$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 23, column: 32 },
                                end: { line: 23, column: 35 },
                              },
                              name: "set",
                            },
                            computed: false,
                            optional: false,
                          },
                          arguments: [
                            {
                              type: "ArrayExpression",
                              loc: {
                                start: { line: 23, column: 36 },
                                end: { line: 23, column: 44 },
                              },
                              elements: [
                                {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 23, column: 37 },
                                    end: { line: 23, column: 39 },
                                  },
                                  value: 10,
                                },
                                {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 23, column: 41 },
                                    end: { line: 23, column: 43 },
                                  },
                                  value: 20,
                                },
                              ],
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
                    start: { line: 23, column: 47 },
                    end: { line: 23, column: 50 },
                  },
                  value: "add",
                  raw: "add",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 23, column: 50 },
                  end: { line: 23, column: 59 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 23, column: 52 },
                    end: { line: 23, column: 58 },
                  },
                  name: "button",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 24, column: 6 },
                end: { line: 24, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 24, column: 6 },
                end: { line: 24, column: 59 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 24, column: 6 },
                  end: { line: 24, column: 46 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 24, column: 7 },
                    end: { line: 24, column: 13 },
                  },
                  name: "button",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 24, column: 14 },
                      end: { line: 24, column: 45 },
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
                        end: { line: 24, column: 45 },
                      },
                      expression: {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 24, column: 23 },
                          end: { line: 24, column: 44 },
                        },
                        params: [],
                        body: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 24, column: 29 },
                            end: { line: 24, column: 44 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 24, column: 29 },
                              end: { line: 24, column: 38 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 24, column: 29 },
                                end: { line: 24, column: 34 },
                              },
                              name: "shown",
                              key: "shown$1brs7fv34j5dk$1",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 24, column: 35 },
                                end: { line: 24, column: 38 },
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
                                start: { line: 24, column: 39 },
                                end: { line: 24, column: 43 },
                              },
                              value: true,
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
                    start: { line: 24, column: 46 },
                    end: { line: 24, column: 50 },
                  },
                  value: "show",
                  raw: "show",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 24, column: 50 },
                  end: { line: 24, column: 59 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 24, column: 52 },
                    end: { line: 24, column: 58 },
                  },
                  name: "button",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 25, column: 4 },
                end: { line: 25, column: 4 },
              },
              value: "\n    ",
              raw: "\n    ",
            },
          ],
          closingElement: {
            type: "JSXClosingElement",
            loc: {
              start: { line: 25, column: 4 },
              end: { line: 25, column: 10 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 25, column: 6 },
                end: { line: 25, column: 9 },
              },
              name: "div",
            },
          },
        },
      },
    ],
  }),
);
it("svgNamespaceLater", async (t) => {
  await snapshotCase(t, "svgNamespaceLater", svgNamespaceLater);
});
describe("an element's namespace", () => {
  // Nothing walks down from the top when a list or a condition draws again, so
  // what it draws has to have kept the namespace from the first pass.
  it("is kept by what draws again later", async () => {
    const { container } = await render(svgNamespaceLater);
    assert.deepEqual(namespaced(container).sort(), [
      "button",
      "button",
      "div",
      "svg:svg",
      "svg:title",
      "title",
    ]);
    // What the two writes added, which is the claim: a title drawn later is
    // still SVG's, and the one beside it is still HTML's.
    const before = namespaced(container).sort();
    await userEvent.click(screen.getByRole("button", { name: "add" }));
    await userEvent.click(screen.getByRole("button", { name: "show" }));
    assert.deepEqual(added(before, namespaced(container).sort()), [
      "svg:title",
      "svg:title",
    ]);
  });
  // What the second list holds that the first did not, counting duplicates.
  function added(before, after) {
    const held = [...before];
    return after.filter((tag) => {
      const at = held.indexOf(tag);
      if (at === -1) {
        return true;
      }
      held.splice(at, 1);
      return false;
    });
  }
});
