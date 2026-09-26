import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/web-testing";
import { snapshotCase } from "../snapshotCase.ts";
import { settled } from "./dom.ts";
// The same claim as `evaluateBuildsOnce`, with no bundle in it.
//
// A component is built once, however what it drew changes afterwards. `<For />`
// answers with a way of asking, the way a drawn bundle does, so if the fault
// were the drawn bundle's this would be untouched — and it is not.
//
// `asked` is the page's, so it survives a rebuild and counts them, and it ends
// one: once it stops saying yes, nothing is written and nothing runs again.
const answerItems = ["one", "two"];
async function WaitingList({ more }) {
  return cs.create(
    "3l16jad540350:21:9",
    {
      params: [
        { kind: "splice", value: state, bindings: [] },
        { kind: "splice", value: window, bindings: [] },
        { kind: "splice", value: more, bindings: [] },
        { kind: "splice", value: answerItems, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 21, column: 12 }, end: { line: 31, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 22, column: 4 },
            end: { line: 22, column: 39 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 22, column: 10 },
                end: { line: 22, column: 38 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 22, column: 10 },
                  end: { line: 22, column: 15 },
                },
                name: "items",
                key: "items$3l16jad540350$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 22, column: 18 },
                  end: { line: 22, column: 38 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 22, column: 18 },
                    end: { line: 22, column: 24 },
                  },
                  param: 0,
                },
                arguments: [
                  {
                    type: "ArrayExpression",
                    loc: {
                      start: { line: 22, column: 35 },
                      end: { line: 22, column: 37 },
                    },
                    elements: [],
                  },
                ],
                optional: false,
              },
            },
          ],
        },
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 24, column: 4 },
            end: { line: 28, column: 10 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 24, column: 10 },
                end: { line: 28, column: 9 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 24, column: 10 },
                  end: { line: 24, column: 17 },
                },
                name: "started",
                key: "started$3l16jad540350$1",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 24, column: 20 },
                  end: { line: 28, column: 9 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 24, column: 20 },
                    end: { line: 24, column: 38 },
                  },
                  object: {
                    type: "Splice",
                    loc: {
                      start: { line: 24, column: 20 },
                      end: { line: 24, column: 27 },
                    },
                    param: 1,
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 24, column: 28 },
                      end: { line: 24, column: 38 },
                    },
                    name: "setTimeout",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 24, column: 39 },
                      end: { line: 28, column: 5 },
                    },
                    params: [],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 24, column: 45 },
                        end: { line: 28, column: 5 },
                      },
                      body: [
                        {
                          type: "IfStatement",
                          loc: {
                            start: { line: 25, column: 6 },
                            end: { line: 27, column: 7 },
                          },
                          test: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 25, column: 10 },
                              end: { line: 25, column: 17 },
                            },
                            callee: {
                              type: "Splice",
                              loc: {
                                start: { line: 25, column: 10 },
                                end: { line: 25, column: 15 },
                              },
                              param: 2,
                            },
                            arguments: [],
                            optional: false,
                          },
                          consequent: {
                            type: "BlockStatement",
                            loc: {
                              start: { line: 25, column: 19 },
                              end: { line: 27, column: 7 },
                            },
                            body: [
                              {
                                type: "ExpressionStatement",
                                loc: {
                                  start: { line: 26, column: 8 },
                                  end: { line: 26, column: 32 },
                                },
                                expression: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 26, column: 8 },
                                    end: { line: 26, column: 31 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 26, column: 8 },
                                      end: { line: 26, column: 17 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 26, column: 8 },
                                        end: { line: 26, column: 13 },
                                      },
                                      name: "items",
                                      key: "items$3l16jad540350$0",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 26, column: 14 },
                                        end: { line: 26, column: 17 },
                                      },
                                      name: "set",
                                    },
                                    computed: false,
                                    optional: false,
                                  },
                                  arguments: [
                                    {
                                      type: "Splice",
                                      loc: {
                                        start: { line: 26, column: 18 },
                                        end: { line: 26, column: 30 },
                                      },
                                      param: 3,
                                    },
                                  ],
                                  optional: false,
                                },
                              },
                            ],
                          },
                          alternate: null,
                        },
                      ],
                    },
                    expression: false,
                  },
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 28, column: 7 },
                      end: { line: 28, column: 8 },
                    },
                    value: 0,
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
            start: { line: 30, column: 4 },
            end: { line: 30, column: 77 },
          },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 30, column: 11 },
              end: { line: 30, column: 76 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 30, column: 11 },
                end: { line: 30, column: 35 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 30, column: 12 },
                  end: { line: 30, column: 15 },
                },
                name: "For",
                param: 4,
              },
              attributes: [
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 30, column: 16 },
                    end: { line: 30, column: 34 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 30, column: 16 },
                      end: { line: 30, column: 20 },
                    },
                    name: "each",
                  },
                  value: {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 30, column: 21 },
                      end: { line: 30, column: 34 },
                    },
                    expression: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 30, column: 22 },
                        end: { line: 30, column: 33 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 30, column: 22 },
                          end: { line: 30, column: 31 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 30, column: 22 },
                            end: { line: 30, column: 27 },
                          },
                          name: "items",
                          key: "items$3l16jad540350$0",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 30, column: 28 },
                            end: { line: 30, column: 31 },
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
                  start: { line: 30, column: 35 },
                  end: { line: 30, column: 70 },
                },
                expression: {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 30, column: 36 },
                    end: { line: 30, column: 69 },
                  },
                  params: [
                    {
                      type: "Identifier",
                      loc: {
                        start: { line: 30, column: 37 },
                        end: { line: 30, column: 41 },
                      },
                      name: "item",
                      key: "item$3l16jad540350$2",
                    },
                  ],
                  body: {
                    type: "JSXElement",
                    loc: {
                      start: { line: 30, column: 54 },
                      end: { line: 30, column: 69 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 30, column: 54 },
                        end: { line: 30, column: 58 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 30, column: 55 },
                          end: { line: 30, column: 57 },
                        },
                        name: "em",
                      },
                      attributes: [],
                      selfClosing: false,
                    },
                    children: [
                      {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 30, column: 58 },
                          end: { line: 30, column: 64 },
                        },
                        expression: {
                          type: "Identifier",
                          loc: {
                            start: { line: 30, column: 59 },
                            end: { line: 30, column: 63 },
                          },
                          name: "item",
                          key: "item$3l16jad540350$2",
                        },
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 30, column: 64 },
                        end: { line: 30, column: 69 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 30, column: 66 },
                          end: { line: 30, column: 68 },
                        },
                        name: "em",
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
                start: { line: 30, column: 70 },
                end: { line: 30, column: 76 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 30, column: 72 },
                  end: { line: 30, column: 75 },
                },
                name: "For",
              },
            },
          },
        },
      ],
    }),
    {
      code: "export default ($0, $1, $2, $3, $4) => {\n    const items = $0()([]);\n    const started = $1().setTimeout(() => {\n        if ($2()()) {\n            items.set($3());\n        }\n    }, 0);\n    return <$4 each={items.get()}>{(item) => <em>{item}</em>}</$4>;\n};",
      map: '{"version":3,"file":"for-builds-once.test.jsx","sourceRoot":"","sources":["for-builds-once.test.tsx"],"names":[],"mappings":"eAoBY;IACR,MAAM,KAAK,GAAG,IAAM,CAAW,EAAE,CAAC,CAAC;IAEnC,MAAM,OAAO,GAAG,IAAO,CAAC,UAAU,CAAC,GAAG,EAAE;QACtC,IAAI,IAAK,EAAE,EAAE,CAAC;YACZ,KAAK,CAAC,GAAG,CAAC,IAAY,CAAC,CAAC;QAC1B,CAAC;IACH,CAAC,EAAE,CAAC,CAAC,CAAC;IAEN,OAAO,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,IAAY,EAAE,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,EAAE,EAAE,CAAC,CAAC,EAAE,EAAG,CAAC,CAAC;AAC3E,CAAC"}',
    },
  );
}
const forBuildsOnce = cs.create(
  "3l16jad540350:34:22",
  {
    params: [
      { kind: "splice", value: state, bindings: [] },
      { kind: "tag", value: WaitingList },
    ],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 34, column: 25 }, end: { line: 48, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 35, column: 2 }, end: { line: 35, column: 26 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 35, column: 8 },
              end: { line: 35, column: 25 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 35, column: 8 },
                end: { line: 35, column: 13 },
              },
              name: "asked",
              key: "asked$3l16jad540350$3",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 35, column: 16 },
                end: { line: 35, column: 25 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 35, column: 16 },
                  end: { line: 35, column: 22 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 35, column: 23 },
                    end: { line: 35, column: 24 },
                  },
                  value: 0,
                },
              ],
              optional: false,
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 37, column: 2 }, end: { line: 47, column: 4 } },
        argument: {
          type: "JSXElement",
          loc: {
            start: { line: 38, column: 4 },
            end: { line: 46, column: 10 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 38, column: 4 },
              end: { line: 38, column: 9 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 38, column: 5 },
                end: { line: 38, column: 8 },
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
                start: { line: 39, column: 6 },
                end: { line: 39, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 39, column: 6 },
                end: { line: 39, column: 43 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 39, column: 6 },
                  end: { line: 39, column: 12 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 39, column: 7 },
                    end: { line: 39, column: 11 },
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
                    start: { line: 39, column: 12 },
                    end: { line: 39, column: 36 },
                  },
                  expression: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 39, column: 13 },
                      end: { line: 39, column: 35 },
                    },
                    operator: "+",
                    left: {
                      type: "Literal",
                      loc: {
                        start: { line: 39, column: 13 },
                        end: { line: 39, column: 21 },
                      },
                      value: "asked ",
                    },
                    right: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 39, column: 24 },
                        end: { line: 39, column: 35 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 39, column: 24 },
                          end: { line: 39, column: 33 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 39, column: 24 },
                            end: { line: 39, column: 29 },
                          },
                          name: "asked",
                          key: "asked$3l16jad540350$3",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 39, column: 30 },
                            end: { line: 39, column: 33 },
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
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 39, column: 36 },
                  end: { line: 39, column: 43 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 39, column: 38 },
                    end: { line: 39, column: 42 },
                  },
                  name: "span",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 40, column: 6 },
                end: { line: 40, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 40, column: 6 },
                end: { line: 45, column: 8 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 40, column: 6 },
                  end: { line: 45, column: 8 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 40, column: 7 },
                    end: { line: 40, column: 18 },
                  },
                  name: "WaitingList",
                  param: 1,
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 41, column: 8 },
                      end: { line: 44, column: 10 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 41, column: 8 },
                        end: { line: 41, column: 12 },
                      },
                      name: "more",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 41, column: 13 },
                        end: { line: 44, column: 10 },
                      },
                      expression: {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 41, column: 14 },
                          end: { line: 44, column: 9 },
                        },
                        params: [],
                        body: {
                          type: "BlockStatement",
                          loc: {
                            start: { line: 41, column: 20 },
                            end: { line: 44, column: 9 },
                          },
                          body: [
                            {
                              type: "ExpressionStatement",
                              loc: {
                                start: { line: 42, column: 10 },
                                end: { line: 42, column: 37 },
                              },
                              expression: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 42, column: 10 },
                                  end: { line: 42, column: 36 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 42, column: 10 },
                                    end: { line: 42, column: 19 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 42, column: 10 },
                                      end: { line: 42, column: 15 },
                                    },
                                    name: "asked",
                                    key: "asked$3l16jad540350$3",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 42, column: 16 },
                                      end: { line: 42, column: 19 },
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
                                      start: { line: 42, column: 20 },
                                      end: { line: 42, column: 35 },
                                    },
                                    operator: "+",
                                    left: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 42, column: 20 },
                                        end: { line: 42, column: 31 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 42, column: 20 },
                                          end: { line: 42, column: 29 },
                                        },
                                        object: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 42, column: 20 },
                                            end: { line: 42, column: 25 },
                                          },
                                          name: "asked",
                                          key: "asked$3l16jad540350$3",
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 42, column: 26 },
                                            end: { line: 42, column: 29 },
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
                                        start: { line: 42, column: 34 },
                                        end: { line: 42, column: 35 },
                                      },
                                      value: 1,
                                    },
                                  },
                                ],
                                optional: false,
                              },
                            },
                            {
                              type: "ReturnStatement",
                              loc: {
                                start: { line: 43, column: 10 },
                                end: { line: 43, column: 33 },
                              },
                              argument: {
                                type: "BinaryExpression",
                                loc: {
                                  start: { line: 43, column: 17 },
                                  end: { line: 43, column: 32 },
                                },
                                operator: "<",
                                left: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 43, column: 17 },
                                    end: { line: 43, column: 28 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 43, column: 17 },
                                      end: { line: 43, column: 26 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 43, column: 17 },
                                        end: { line: 43, column: 22 },
                                      },
                                      name: "asked",
                                      key: "asked$3l16jad540350$3",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 43, column: 23 },
                                        end: { line: 43, column: 26 },
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
                                    start: { line: 43, column: 31 },
                                    end: { line: 43, column: 32 },
                                  },
                                  value: 5,
                                },
                              },
                            },
                          ],
                        },
                        expression: false,
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
                start: { line: 46, column: 4 },
                end: { line: 46, column: 4 },
              },
              value: "\n    ",
              raw: "\n    ",
            },
          ],
          closingElement: {
            type: "JSXClosingElement",
            loc: {
              start: { line: 46, column: 4 },
              end: { line: 46, column: 10 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 46, column: 6 },
                end: { line: 46, column: 9 },
              },
              name: "div",
            },
          },
        },
      },
    ],
  }),
  {
    code: 'export default ($0, $1) => {\n    const asked = $0()(0);\n    return (<div>\n      <span>{"asked " + asked.get()}</span>\n      <$1 more={() => {\n            asked.set(asked.get() + 1);\n            return asked.get() < 5;\n        }}/>\n    </div>);\n};',
    map: '{"version":3,"file":"for-builds-once.test.jsx","sourceRoot":"","sources":["for-builds-once.test.tsx"],"names":[],"mappings":"eAiCyB;IACvB,MAAM,KAAK,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IAExB,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,IAAI,CAAC,CAAC,QAAQ,GAAG,KAAK,CAAC,GAAG,EAAE,CAAC,EAAE,IAAI,CACpC;MAAA,CAAC,EAAW,CACV,IAAI,CAAC,CAAC,GAAG,EAAE;YACT,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC;YAC3B,OAAO,KAAK,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC;QACzB,CAAC,CAAC,EAEN;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
  },
);
it("forBuildsOnce", async (t) => {
  await snapshotCase(t, "forBuildsOnce", forBuildsOnce);
});
describe("a component that draws a list", () => {
  // The same claim with no bundle in it: `<For />` answers with a way of asking
  // too, so a fault in what draws a bundle would leave this alone.
  it("is built once, and draws what arrives", async () => {
    const { container } = await render(forBuildsOnce);
    assert.ok(screen.getByText("asked 0"));
    await settled();
    assert.equal(container.querySelectorAll("em").length, 2);
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});
