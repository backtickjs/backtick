import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, text } from "./dom.ts";
// A list whose drawing reads where a member sits as well as what it is.
//
// The index is storage, not a number: a rotation moves every member without
// changing any of them, so a row keeps the node it had and only what read
// `index` runs again. Reading it eagerly — the number at the moment the row was
// drawn — leaves all three stale.
async function RotatingRows() {
  return cs.create(
    { start: { line: 16, column: 9 }, end: { line: 34, column: 4 } },
    {
      filePath: "state/for-index.test.tsx",
      fileHash: "3hac73x1hhg8m",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 16, column: 12 }, end: { line: 34, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 17, column: 4 },
            end: { line: 17, column: 52 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 17, column: 10 },
                end: { line: 17, column: 51 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 17, column: 10 },
                  end: { line: 17, column: 15 },
                },
                name: "names",
                key: "names$3hac73x1hhg8m$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 17, column: 18 },
                  end: { line: 17, column: 51 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 17, column: 18 },
                    end: { line: 17, column: 24 },
                  },
                  key: "$state",
                },
                arguments: [
                  {
                    type: "ArrayExpression",
                    loc: {
                      start: { line: 17, column: 35 },
                      end: { line: 17, column: 50 },
                    },
                    elements: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 17, column: 36 },
                          end: { line: 17, column: 39 },
                        },
                        value: "a",
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 17, column: 41 },
                          end: { line: 17, column: 44 },
                        },
                        value: "b",
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 17, column: 46 },
                          end: { line: 17, column: 49 },
                        },
                        value: "c",
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
          loc: { start: { line: 18, column: 4 }, end: { line: 21, column: 6 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 18, column: 10 },
                end: { line: 21, column: 5 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 18, column: 10 },
                  end: { line: 18, column: 16 },
                },
                name: "rotate",
                key: "rotate$3hac73x1hhg8m$1",
              },
              init: {
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 18, column: 19 },
                  end: { line: 21, column: 5 },
                },
                params: [],
                body: {
                  type: "BlockStatement",
                  loc: {
                    start: { line: 18, column: 25 },
                    end: { line: 21, column: 5 },
                  },
                  body: [
                    {
                      type: "VariableDeclaration",
                      loc: {
                        start: { line: 19, column: 6 },
                        end: { line: 19, column: 31 },
                      },
                      kind: "const",
                      declarations: [
                        {
                          type: "VariableDeclarator",
                          loc: {
                            start: { line: 19, column: 12 },
                            end: { line: 19, column: 30 },
                          },
                          id: {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 12 },
                              end: { line: 19, column: 16 },
                            },
                            name: "held",
                            key: "held$3hac73x1hhg8m$2",
                          },
                          init: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 19, column: 19 },
                              end: { line: 19, column: 30 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 19, column: 19 },
                                end: { line: 19, column: 28 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 19, column: 19 },
                                  end: { line: 19, column: 24 },
                                },
                                name: "names",
                                key: "names$3hac73x1hhg8m$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 19, column: 25 },
                                  end: { line: 19, column: 28 },
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
                        start: { line: 20, column: 6 },
                        end: { line: 20, column: 45 },
                      },
                      expression: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 20, column: 6 },
                          end: { line: 20, column: 44 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 20, column: 6 },
                            end: { line: 20, column: 15 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 20, column: 6 },
                              end: { line: 20, column: 11 },
                            },
                            name: "names",
                            key: "names$3hac73x1hhg8m$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 20, column: 12 },
                              end: { line: 20, column: 15 },
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
                              start: { line: 20, column: 16 },
                              end: { line: 20, column: 43 },
                            },
                            elements: [
                              {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 20, column: 17 },
                                  end: { line: 20, column: 24 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 20, column: 17 },
                                    end: { line: 20, column: 21 },
                                  },
                                  name: "held",
                                  key: "held$3hac73x1hhg8m$2",
                                },
                                property: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 20, column: 22 },
                                    end: { line: 20, column: 23 },
                                  },
                                  value: 2,
                                },
                                computed: true,
                                optional: false,
                              },
                              {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 20, column: 26 },
                                  end: { line: 20, column: 33 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 20, column: 26 },
                                    end: { line: 20, column: 30 },
                                  },
                                  name: "held",
                                  key: "held$3hac73x1hhg8m$2",
                                },
                                property: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 20, column: 31 },
                                    end: { line: 20, column: 32 },
                                  },
                                  value: 0,
                                },
                                computed: true,
                                optional: false,
                              },
                              {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 20, column: 35 },
                                  end: { line: 20, column: 42 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 20, column: 35 },
                                    end: { line: 20, column: 39 },
                                  },
                                  name: "held",
                                  key: "held$3hac73x1hhg8m$2",
                                },
                                property: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 20, column: 40 },
                                    end: { line: 20, column: 41 },
                                  },
                                  value: 1,
                                },
                                computed: true,
                                optional: false,
                              },
                            ],
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
          loc: { start: { line: 22, column: 4 }, end: { line: 33, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 23, column: 6 },
              end: { line: 32, column: 12 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 23, column: 6 },
                end: { line: 23, column: 11 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 23, column: 7 },
                  end: { line: 23, column: 10 },
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
                  end: { line: 24, column: 44 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 24, column: 8 },
                    end: { line: 24, column: 31 },
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
                        end: { line: 24, column: 30 },
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
                          end: { line: 24, column: 30 },
                        },
                        expression: {
                          type: "Identifier",
                          loc: {
                            start: { line: 24, column: 23 },
                            end: { line: 24, column: 29 },
                          },
                          name: "rotate",
                          key: "rotate$3hac73x1hhg8m$1",
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
                      start: { line: 24, column: 31 },
                      end: { line: 24, column: 37 },
                    },
                    value: "rotate",
                    raw: "rotate",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 24, column: 37 },
                    end: { line: 24, column: 44 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 24, column: 39 },
                      end: { line: 24, column: 43 },
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
                  end: { line: 31, column: 14 },
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
                      end: { line: 30, column: 16 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 26, column: 10 },
                        end: { line: 26, column: 34 },
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
                            end: { line: 26, column: 33 },
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
                              end: { line: 26, column: 33 },
                            },
                            expression: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 26, column: 21 },
                                end: { line: 26, column: 32 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 26, column: 21 },
                                  end: { line: 26, column: 30 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 26, column: 21 },
                                    end: { line: 26, column: 26 },
                                  },
                                  name: "names",
                                  key: "names$3hac73x1hhg8m$0",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 26, column: 27 },
                                    end: { line: 26, column: 30 },
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
                          end: { line: 29, column: 14 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 27, column: 13 },
                            end: { line: 29, column: 13 },
                          },
                          params: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 27, column: 14 },
                                end: { line: 27, column: 18 },
                              },
                              name: "name",
                              key: "name$3hac73x1hhg8m$3",
                            },
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 27, column: 28 },
                                end: { line: 27, column: 33 },
                              },
                              name: "index",
                              key: "index$3hac73x1hhg8m$4",
                            },
                          ],
                          body: {
                            type: "JSXElement",
                            loc: {
                              start: { line: 28, column: 14 },
                              end: { line: 28, column: 56 },
                            },
                            openingElement: {
                              type: "JSXOpeningElement",
                              loc: {
                                start: { line: 28, column: 14 },
                                end: { line: 28, column: 20 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 28, column: 15 },
                                  end: { line: 28, column: 19 },
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
                                  start: { line: 28, column: 20 },
                                  end: { line: 28, column: 49 },
                                },
                                expression: {
                                  type: "BinaryExpression",
                                  loc: {
                                    start: { line: 28, column: 21 },
                                    end: { line: 28, column: 48 },
                                  },
                                  operator: "+",
                                  left: {
                                    type: "BinaryExpression",
                                    loc: {
                                      start: { line: 28, column: 21 },
                                      end: { line: 28, column: 34 },
                                    },
                                    operator: "+",
                                    left: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 28, column: 21 },
                                        end: { line: 28, column: 25 },
                                      },
                                      name: "name",
                                      key: "name$3hac73x1hhg8m$3",
                                    },
                                    right: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 28, column: 28 },
                                        end: { line: 28, column: 34 },
                                      },
                                      value: " at ",
                                    },
                                  },
                                  right: {
                                    type: "CallExpression",
                                    loc: {
                                      start: { line: 28, column: 37 },
                                      end: { line: 28, column: 48 },
                                    },
                                    callee: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 28, column: 37 },
                                        end: { line: 28, column: 46 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 28, column: 37 },
                                          end: { line: 28, column: 42 },
                                        },
                                        name: "index",
                                        key: "index$3hac73x1hhg8m$4",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 28, column: 43 },
                                          end: { line: 28, column: 46 },
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
                                start: { line: 28, column: 49 },
                                end: { line: 28, column: 56 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 28, column: 51 },
                                  end: { line: 28, column: 55 },
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
                        end: { line: 30, column: 16 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 30, column: 12 },
                          end: { line: 30, column: 15 },
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
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 31, column: 8 },
                    end: { line: 31, column: 14 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 31, column: 10 },
                      end: { line: 31, column: 13 },
                    },
                    name: "div",
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
  );
}
describe("local state", () => {
  it("a moved row keeps its node and reads its new index", async () => {
    const view = await drawn(_jsx(RotatingRows, {}));
    const [rotate, list] = children(view);
    assert.ok(rotate !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), [
      "a at 0",
      "b at 1",
      "c at 2",
    ]);
    const held = [...list.children][0];
    await userEvent.click(rotate);
    // Nothing about a member changed, so every row is the node it was — and
    // the index each one draws is the position it now sits at.
    assert.deepEqual([...list.children].map(text), [
      "c at 0",
      "a at 1",
      "b at 2",
    ]);
    assert.equal(list.children[1], held);
  });
});
it("RotatingRows", async (t) => {
  await snapshotCase(t, "RotatingRows", _jsx(RotatingRows, {}));
});
