import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For } from "@backtickjs/core";
import { render } from "@backtickjs/web-testing";
import { snapshotCase } from "../snapshotCase.ts";
import { namespaced } from "./dom.ts";
// SVG written the way it is pasted: no tag says which language it is from.
// Where an element is drawn does — inside an `svg` it is SVG's, and a
// `foreignObject` holds HTML again — so a circle a host component or a function
// the script holds draws is SVG's once it stands inside the `svg`, and a
// `title` or an `a`, whose names both languages use, is whichever one encloses
// it.
async function Ring() {
  return cs.create(
    "8n845jjtfvwm:15:9",
    { splices: {}, captures: [] },
    () => ({
      type: "JSXElement",
      loc: { start: { line: 15, column: 12 }, end: { line: 15, column: 76 } },
      openingElement: {
        type: "JSXOpeningElement",
        loc: { start: { line: 15, column: 12 }, end: { line: 15, column: 76 } },
        name: {
          type: "JSXIdentifier",
          loc: {
            start: { line: 15, column: 13 },
            end: { line: 15, column: 19 },
          },
          name: "circle",
        },
        attributes: [
          {
            type: "JSXAttribute",
            loc: {
              start: { line: 15, column: 20 },
              end: { line: 15, column: 26 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 15, column: 20 },
                end: { line: 15, column: 22 },
              },
              name: "cx",
            },
            value: {
              type: "Literal",
              loc: {
                start: { line: 15, column: 23 },
                end: { line: 15, column: 26 },
              },
              value: "5",
            },
          },
          {
            type: "JSXAttribute",
            loc: {
              start: { line: 15, column: 27 },
              end: { line: 15, column: 33 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 15, column: 27 },
                end: { line: 15, column: 29 },
              },
              name: "cy",
            },
            value: {
              type: "Literal",
              loc: {
                start: { line: 15, column: 30 },
                end: { line: 15, column: 33 },
              },
              value: "5",
            },
          },
          {
            type: "JSXAttribute",
            loc: {
              start: { line: 15, column: 34 },
              end: { line: 15, column: 39 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 15, column: 34 },
                end: { line: 15, column: 35 },
              },
              name: "r",
            },
            value: {
              type: "Literal",
              loc: {
                start: { line: 15, column: 36 },
                end: { line: 15, column: 39 },
              },
              value: "4",
            },
          },
          {
            type: "JSXAttribute",
            loc: {
              start: { line: 15, column: 40 },
              end: { line: 15, column: 51 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 15, column: 40 },
                end: { line: 15, column: 44 },
              },
              name: "fill",
            },
            value: {
              type: "Literal",
              loc: {
                start: { line: 15, column: 45 },
                end: { line: 15, column: 51 },
              },
              value: "none",
            },
          },
          {
            type: "JSXAttribute",
            loc: {
              start: { line: 15, column: 52 },
              end: { line: 15, column: 73 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 15, column: 52 },
                end: { line: 15, column: 58 },
              },
              name: "stroke",
            },
            value: {
              type: "Literal",
              loc: {
                start: { line: 15, column: 59 },
                end: { line: 15, column: 73 },
              },
              value: "currentColor",
            },
          },
        ],
        selfClosing: true,
      },
      children: [],
      closingElement: null,
    }),
    '() => <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor"/>',
    '{"version":3,"file":"svg-namespace.test.jsx","sourceRoot":"","sources":["svg-namespace.test.tsx"],"names":[],"mappings":"AAcY,MAAA,CAAC,MAAM,CAAC,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,MAAM,CAAC,MAAM,CAAC,cAAc,EAAG,CAAA"}',
  );
}
const svgNamespace = cs.create(
  "8n845jjtfvwm:18:21",
  {
    splices: {
      $Ring: { value: Ring, params: [] },
      $For: { value: For, params: [] },
    },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 18, column: 24 }, end: { line: 37, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 19, column: 2 }, end: { line: 23, column: 4 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 19, column: 8 },
              end: { line: 23, column: 3 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 19, column: 8 },
                end: { line: 19, column: 11 },
              },
              name: "Dot",
              key: "Dot$8n845jjtfvwm$0",
            },
            init: {
              type: "ArrowFunctionExpression",
              loc: {
                start: { line: 19, column: 14 },
                end: { line: 23, column: 3 },
              },
              params: [
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 15 },
                    end: { line: 19, column: 20 },
                  },
                  name: "props",
                  key: "props$8n845jjtfvwm$1",
                },
              ],
              body: {
                type: "JSXElement",
                loc: {
                  start: { line: 20, column: 4 },
                  end: { line: 22, column: 13 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 20, column: 4 },
                    end: { line: 20, column: 38 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 20, column: 5 },
                      end: { line: 20, column: 11 },
                    },
                    name: "circle",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 20, column: 12 },
                        end: { line: 20, column: 24 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 20, column: 12 },
                          end: { line: 20, column: 14 },
                        },
                        name: "cx",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 20, column: 15 },
                          end: { line: 20, column: 24 },
                        },
                        expression: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 20, column: 16 },
                            end: { line: 20, column: 23 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 20, column: 16 },
                              end: { line: 20, column: 21 },
                            },
                            name: "props",
                            key: "props$8n845jjtfvwm$1",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 20, column: 22 },
                              end: { line: 20, column: 23 },
                            },
                            name: "x",
                          },
                          computed: false,
                          optional: false,
                        },
                      },
                    },
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 20, column: 25 },
                        end: { line: 20, column: 31 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 20, column: 25 },
                          end: { line: 20, column: 27 },
                        },
                        name: "cy",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 20, column: 28 },
                          end: { line: 20, column: 31 },
                        },
                        value: "5",
                      },
                    },
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 20, column: 32 },
                        end: { line: 20, column: 37 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 20, column: 32 },
                          end: { line: 20, column: 33 },
                        },
                        name: "r",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 20, column: 34 },
                          end: { line: 20, column: 37 },
                        },
                        value: "2",
                      },
                    },
                  ],
                  selfClosing: false,
                },
                children: [
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 21, column: 6 },
                      end: { line: 21, column: 6 },
                    },
                    value: "\n      ",
                    raw: "\n      ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 21, column: 6 },
                      end: { line: 21, column: 39 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 21, column: 6 },
                        end: { line: 21, column: 13 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 21, column: 7 },
                          end: { line: 21, column: 12 },
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
                          start: { line: 21, column: 13 },
                          end: { line: 21, column: 31 },
                        },
                        expression: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 21, column: 14 },
                            end: { line: 21, column: 30 },
                          },
                          operator: "+",
                          left: {
                            type: "Literal",
                            loc: {
                              start: { line: 21, column: 14 },
                              end: { line: 21, column: 20 },
                            },
                            value: "dot ",
                          },
                          right: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 21, column: 23 },
                              end: { line: 21, column: 30 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 21, column: 23 },
                                end: { line: 21, column: 28 },
                              },
                              name: "props",
                              key: "props$8n845jjtfvwm$1",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 21, column: 29 },
                                end: { line: 21, column: 30 },
                              },
                              name: "x",
                            },
                            computed: false,
                            optional: false,
                          },
                        },
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 21, column: 31 },
                        end: { line: 21, column: 39 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 21, column: 33 },
                          end: { line: 21, column: 38 },
                        },
                        name: "title",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 22, column: 4 },
                      end: { line: 22, column: 4 },
                    },
                    value: "\n    ",
                    raw: "\n    ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 22, column: 4 },
                    end: { line: 22, column: 13 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 22, column: 6 },
                      end: { line: 22, column: 12 },
                    },
                    name: "circle",
                  },
                },
              },
              expression: true,
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 25, column: 2 }, end: { line: 36, column: 4 } },
        argument: {
          type: "JSXElement",
          loc: {
            start: { line: 26, column: 4 },
            end: { line: 35, column: 10 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 26, column: 4 },
              end: { line: 26, column: 9 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 26, column: 5 },
                end: { line: 26, column: 8 },
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
                start: { line: 27, column: 6 },
                end: { line: 27, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 27, column: 6 },
                end: { line: 27, column: 38 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 27, column: 6 },
                  end: { line: 27, column: 24 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 27, column: 7 },
                    end: { line: 27, column: 8 },
                  },
                  name: "a",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 27, column: 9 },
                      end: { line: 27, column: 23 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 27, column: 9 },
                        end: { line: 27, column: 13 },
                      },
                      name: "href",
                    },
                    value: {
                      type: "Literal",
                      loc: {
                        start: { line: 27, column: 14 },
                        end: { line: 27, column: 23 },
                      },
                      value: "/shapes",
                    },
                  },
                ],
                selfClosing: false,
              },
              children: [
                {
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 27, column: 24 },
                    end: { line: 27, column: 34 },
                  },
                  expression: {
                    type: "Literal",
                    loc: {
                      start: { line: 27, column: 25 },
                      end: { line: 27, column: 33 },
                    },
                    value: "shapes",
                  },
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 27, column: 34 },
                  end: { line: 27, column: 38 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 27, column: 36 },
                    end: { line: 27, column: 37 },
                  },
                  name: "a",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 28, column: 6 },
                end: { line: 28, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 28, column: 6 },
                end: { line: 34, column: 12 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 28, column: 6 },
                  end: { line: 28, column: 43 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 28, column: 7 },
                    end: { line: 28, column: 10 },
                  },
                  name: "svg",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 28, column: 11 },
                      end: { line: 28, column: 30 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 28, column: 11 },
                        end: { line: 28, column: 18 },
                      },
                      name: "viewBox",
                    },
                    value: {
                      type: "Literal",
                      loc: {
                        start: { line: 28, column: 19 },
                        end: { line: 28, column: 30 },
                      },
                      value: "0 0 30 10",
                    },
                  },
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 28, column: 31 },
                      end: { line: 28, column: 42 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 28, column: 31 },
                        end: { line: 28, column: 36 },
                      },
                      name: "width",
                    },
                    value: {
                      type: "Literal",
                      loc: {
                        start: { line: 28, column: 37 },
                        end: { line: 28, column: 42 },
                      },
                      value: "120",
                    },
                  },
                ],
                selfClosing: false,
              },
              children: [
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 29, column: 8 },
                    end: { line: 29, column: 8 },
                  },
                  value: "\n        ",
                  raw: "\n        ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 29, column: 8 },
                    end: { line: 29, column: 16 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 29, column: 8 },
                      end: { line: 29, column: 16 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 29, column: 9 },
                        end: { line: 29, column: 13 },
                      },
                      name: "Ring",
                    },
                    attributes: [],
                    selfClosing: true,
                  },
                  children: [],
                  closingElement: null,
                },
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
                    end: { line: 30, column: 65 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 30, column: 8 },
                      end: { line: 30, column: 29 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 30, column: 9 },
                        end: { line: 30, column: 12 },
                      },
                      name: "For",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 30, column: 13 },
                          end: { line: 30, column: 28 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 30, column: 13 },
                            end: { line: 30, column: 17 },
                          },
                          name: "each",
                        },
                        value: {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 30, column: 18 },
                            end: { line: 30, column: 28 },
                          },
                          expression: {
                            type: "ArrayExpression",
                            loc: {
                              start: { line: 30, column: 19 },
                              end: { line: 30, column: 27 },
                            },
                            elements: [
                              {
                                type: "Literal",
                                loc: {
                                  start: { line: 30, column: 20 },
                                  end: { line: 30, column: 22 },
                                },
                                value: 10,
                              },
                              {
                                type: "Literal",
                                loc: {
                                  start: { line: 30, column: 24 },
                                  end: { line: 30, column: 26 },
                                },
                                value: 20,
                              },
                            ],
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
                        start: { line: 30, column: 29 },
                        end: { line: 30, column: 59 },
                      },
                      expression: {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 30, column: 30 },
                          end: { line: 30, column: 58 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 30, column: 31 },
                              end: { line: 30, column: 32 },
                            },
                            name: "x",
                            key: "x$8n845jjtfvwm$2",
                          },
                        ],
                        body: {
                          type: "JSXElement",
                          loc: {
                            start: { line: 30, column: 45 },
                            end: { line: 30, column: 58 },
                          },
                          openingElement: {
                            type: "JSXOpeningElement",
                            loc: {
                              start: { line: 30, column: 45 },
                              end: { line: 30, column: 58 },
                            },
                            name: {
                              type: "JSXIdentifier",
                              loc: {
                                start: { line: 30, column: 46 },
                                end: { line: 30, column: 49 },
                              },
                              name: "Dot",
                              key: "Dot$8n845jjtfvwm$0",
                            },
                            attributes: [
                              {
                                type: "JSXAttribute",
                                loc: {
                                  start: { line: 30, column: 50 },
                                  end: { line: 30, column: 55 },
                                },
                                name: {
                                  type: "JSXIdentifier",
                                  loc: {
                                    start: { line: 30, column: 50 },
                                    end: { line: 30, column: 51 },
                                  },
                                  name: "x",
                                },
                                value: {
                                  type: "JSXExpressionContainer",
                                  loc: {
                                    start: { line: 30, column: 52 },
                                    end: { line: 30, column: 55 },
                                  },
                                  expression: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 30, column: 53 },
                                      end: { line: 30, column: 54 },
                                    },
                                    name: "x",
                                    key: "x$8n845jjtfvwm$2",
                                  },
                                },
                              },
                            ],
                            selfClosing: true,
                          },
                          children: [],
                          closingElement: null,
                        },
                        expression: true,
                      },
                    },
                  ],
                  closingElement: {
                    type: "JSXClosingElement",
                    loc: {
                      start: { line: 30, column: 59 },
                      end: { line: 30, column: 65 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 30, column: 61 },
                        end: { line: 30, column: 64 },
                      },
                      name: "For",
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
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 31, column: 8 },
                    end: { line: 33, column: 24 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 31, column: 8 },
                      end: { line: 31, column: 58 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 31, column: 9 },
                        end: { line: 31, column: 22 },
                      },
                      name: "foreignObject",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 31, column: 23 },
                          end: { line: 31, column: 28 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 31, column: 23 },
                            end: { line: 31, column: 24 },
                          },
                          name: "x",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 31, column: 25 },
                            end: { line: 31, column: 28 },
                          },
                          value: "0",
                        },
                      },
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 31, column: 29 },
                          end: { line: 31, column: 34 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 31, column: 29 },
                            end: { line: 31, column: 30 },
                          },
                          name: "y",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 31, column: 31 },
                            end: { line: 31, column: 34 },
                          },
                          value: "0",
                        },
                      },
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 31, column: 35 },
                          end: { line: 31, column: 45 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 31, column: 35 },
                            end: { line: 31, column: 40 },
                          },
                          name: "width",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 31, column: 41 },
                            end: { line: 31, column: 45 },
                          },
                          value: "10",
                        },
                      },
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 31, column: 46 },
                          end: { line: 31, column: 57 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 31, column: 46 },
                            end: { line: 31, column: 52 },
                          },
                          name: "height",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 31, column: 53 },
                            end: { line: 31, column: 57 },
                          },
                          value: "10",
                        },
                      },
                    ],
                    selfClosing: false,
                  },
                  children: [
                    {
                      type: "JSXText",
                      loc: {
                        start: { line: 32, column: 10 },
                        end: { line: 32, column: 10 },
                      },
                      value: "\n          ",
                      raw: "\n          ",
                    },
                    {
                      type: "JSXElement",
                      loc: {
                        start: { line: 32, column: 10 },
                        end: { line: 32, column: 31 },
                      },
                      openingElement: {
                        type: "JSXOpeningElement",
                        loc: {
                          start: { line: 32, column: 10 },
                          end: { line: 32, column: 13 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 32, column: 11 },
                            end: { line: 32, column: 12 },
                          },
                          name: "p",
                        },
                        attributes: [],
                        selfClosing: false,
                      },
                      children: [
                        {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 32, column: 13 },
                            end: { line: 32, column: 27 },
                          },
                          expression: {
                            type: "Literal",
                            loc: {
                              start: { line: 32, column: 14 },
                              end: { line: 32, column: 26 },
                            },
                            value: "html again",
                          },
                        },
                      ],
                      closingElement: {
                        type: "JSXClosingElement",
                        loc: {
                          start: { line: 32, column: 27 },
                          end: { line: 32, column: 31 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 32, column: 29 },
                            end: { line: 32, column: 30 },
                          },
                          name: "p",
                        },
                      },
                    },
                    {
                      type: "JSXText",
                      loc: {
                        start: { line: 33, column: 8 },
                        end: { line: 33, column: 8 },
                      },
                      value: "\n        ",
                      raw: "\n        ",
                    },
                  ],
                  closingElement: {
                    type: "JSXClosingElement",
                    loc: {
                      start: { line: 33, column: 8 },
                      end: { line: 33, column: 24 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 33, column: 10 },
                        end: { line: 33, column: 23 },
                      },
                      name: "foreignObject",
                    },
                  },
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 34, column: 6 },
                    end: { line: 34, column: 6 },
                  },
                  value: "\n      ",
                  raw: "\n      ",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 34, column: 6 },
                  end: { line: 34, column: 12 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 34, column: 8 },
                    end: { line: 34, column: 11 },
                  },
                  name: "svg",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 35, column: 4 },
                end: { line: 35, column: 4 },
              },
              value: "\n    ",
              raw: "\n    ",
            },
          ],
          closingElement: {
            type: "JSXClosingElement",
            loc: {
              start: { line: 35, column: 4 },
              end: { line: 35, column: 10 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 35, column: 6 },
                end: { line: 35, column: 9 },
              },
              name: "div",
            },
          },
        },
      },
    ],
  }),
  '($0, $1) => {\n    const Dot = (props) => (<circle cx={props.x} cy="5" r="2">\n      <title>{"dot " + props.x}</title>\n    </circle>);\n    return (<div>\n      <a href="/shapes">{"shapes"}</a>\n      <svg viewBox="0 0 30 10" width="120">\n        <$0 />\n        <$1 each={[10, 20]}>{(x) => <Dot x={x}/>}</$1>\n        <foreignObject x="0" y="0" width="10" height="10">\n          <p>{"html again"}</p>\n        </foreignObject>\n      </svg>\n    </div>);\n}',
  '{"version":3,"file":"svg-namespace.test.jsx","sourceRoot":"","sources":["svg-namespace.test.tsx"],"names":[],"mappings":"AAiBwB;IACtB,MAAM,GAAG,GAAG,CAAC,KAAoB,EAAE,EAAE,CAAC,CACpC,CAAC,MAAM,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAC/B;MAAA,CAAC,KAAK,CAAC,CAAC,MAAM,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,KAAK,CAClC;IAAA,EAAE,MAAM,CAAC,CACV,CAAC;IAEF,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,CAAC,CAAC,IAAI,CAAC,SAAS,CAAC,CAAC,QAAQ,CAAC,EAAE,CAAC,CAC/B;MAAA,CAAC,GAAG,CAAC,OAAO,CAAC,WAAW,CAAC,KAAK,CAAC,KAAK,CAClC;QAAA,CAAC,EAAI,CAAC,AAAD,EACL;QAAA,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAS,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAG,CAAC,EAAE,EAAG,CACxD;QAAA,CAAC,aAAa,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,IAAI,CAAC,MAAM,CAAC,IAAI,CAC/C;UAAA,CAAC,CAAC,CAAC,CAAC,YAAY,CAAC,EAAE,CAAC,CACtB;QAAA,EAAE,aAAa,CACjB;MAAA,EAAE,GAAG,CACP;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC,CAAA"}',
);
it("svgNamespace", async (t) => {
  await snapshotCase(t, "svgNamespace", svgNamespace);
});
describe("an element's namespace", () => {
  it("is where the element is drawn", async () => {
    const { container } = await render(svgNamespace);
    // Sorted: a list builds its rows after the elements beside it, and the
    // order they are made in is not the claim.
    assert.deepEqual(namespaced(container).sort(), [
      "a",
      "div",
      "p",
      "svg:circle",
      "svg:circle",
      "svg:circle",
      "svg:foreignObject",
      "svg:svg",
      "svg:title",
      "svg:title",
    ]);
  });
});
