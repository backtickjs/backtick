import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A host component, and a binding of the same name an enclosing script holds.
// Scope decides: the nested script's `<Card>` is the captured function, and
// only the one outside every script binding it is the host's.
async function Card(props) {
  return _jsx("h2", { children: props.title });
}
// Instantiated twice with different labels, so the enclosing script is
// polymorphic and its nested script's captures arrive through a thunk.
function labelled(label) {
  return cs.create(
    { start: { line: 16, column: 9 }, end: { line: 19, column: 4 } },
    {
      filePath: "captures/script-bound-tag-capture-shadow.test.tsx",
      fileHash: "2mv5sg07ackia",
      splices: {
        $label: { value: label, params: [] },
        $0splice0: {
          value: cs.create(
            { start: { line: 18, column: 17 }, end: { line: 18, column: 35 } },
            {
              filePath: "captures/script-bound-tag-capture-shadow.test.tsx",
              fileHash: "2mv5sg07ackia",
              splices: {},
              captures: ["Card$2mv5sg07ackia$0"],
            },
            () => ({
              type: "JSXElement",
              loc: {
                start: { line: 18, column: 20 },
                end: { line: 18, column: 34 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 18, column: 20 },
                  end: { line: 18, column: 34 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 18, column: 21 },
                    end: { line: 18, column: 25 },
                  },
                  name: "Card",
                  key: "Card$2mv5sg07ackia$0",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 18, column: 26 },
                      end: { line: 18, column: 31 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 18, column: 26 },
                        end: { line: 18, column: 27 },
                      },
                      name: "n",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 18, column: 28 },
                        end: { line: 18, column: 31 },
                      },
                      expression: {
                        type: "Literal",
                        loc: {
                          start: { line: 18, column: 29 },
                          end: { line: 18, column: 30 },
                        },
                        value: 1,
                      },
                    },
                  },
                ],
                selfClosing: true,
              },
              children: [],
              closingElement: null,
            }),
          ),
          params: ["Card$2mv5sg07ackia$0"],
        },
      },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 16, column: 12 }, end: { line: 19, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 17, column: 4 },
            end: { line: 17, column: 69 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 17, column: 10 },
                end: { line: 17, column: 68 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 17, column: 10 },
                  end: { line: 17, column: 14 },
                },
                name: "Card",
                key: "Card$2mv5sg07ackia$0",
              },
              init: {
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 17, column: 17 },
                  end: { line: 17, column: 68 },
                },
                params: [
                  {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 18 },
                      end: { line: 17, column: 23 },
                    },
                    name: "props",
                    key: "props$2mv5sg07ackia$1",
                  },
                ],
                body: {
                  type: "JSXElement",
                  loc: {
                    start: { line: 17, column: 43 },
                    end: { line: 17, column: 68 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 17, column: 43 },
                      end: { line: 17, column: 46 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 17, column: 44 },
                        end: { line: 17, column: 45 },
                      },
                      name: "i",
                    },
                    attributes: [],
                    selfClosing: false,
                  },
                  children: [
                    {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 17, column: 46 },
                        end: { line: 17, column: 64 },
                      },
                      expression: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 17, column: 47 },
                          end: { line: 17, column: 63 },
                        },
                        operator: "+",
                        left: {
                          type: "Splice",
                          loc: {
                            start: { line: 17, column: 47 },
                            end: { line: 17, column: 53 },
                          },
                          key: "$label",
                        },
                        right: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 17, column: 56 },
                            end: { line: 17, column: 63 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 56 },
                              end: { line: 17, column: 61 },
                            },
                            name: "props",
                            key: "props$2mv5sg07ackia$1",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 62 },
                              end: { line: 17, column: 63 },
                            },
                            name: "n",
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
                      start: { line: 17, column: 64 },
                      end: { line: 17, column: 68 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 17, column: 66 },
                        end: { line: 17, column: 67 },
                      },
                      name: "i",
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
          loc: {
            start: { line: 18, column: 4 },
            end: { line: 18, column: 42 },
          },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 18, column: 11 },
              end: { line: 18, column: 41 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 18, column: 11 },
                end: { line: 18, column: 14 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 18, column: 12 },
                  end: { line: 18, column: 13 },
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
                  start: { line: 18, column: 14 },
                  end: { line: 18, column: 37 },
                },
                expression: {
                  type: "Splice",
                  loc: {
                    start: { line: 18, column: 15 },
                    end: { line: 18, column: 36 },
                  },
                  key: "$0splice0",
                },
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 18, column: 37 },
                end: { line: 18, column: 41 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 18, column: 39 },
                  end: { line: 18, column: 40 },
                },
                name: "p",
              },
            },
          },
        },
      ],
    }),
  );
}
it("scriptBoundTagCaptureShadow", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagCaptureShadow",
    cs.create(
      { start: { line: 26, column: 4 }, end: { line: 30, column: 11 } },
      {
        filePath: "captures/script-bound-tag-capture-shadow.test.tsx",
        fileHash: "2mv5sg07ackia",
        splices: {
          $0splice0: {
            value: labelled(
              cs.create(
                {
                  start: { line: 28, column: 18 },
                  end: { line: 28, column: 25 },
                },
                {
                  filePath: "captures/script-bound-tag-capture-shadow.test.tsx",
                  fileHash: "2mv5sg07ackia",
                  splices: {},
                  captures: [],
                },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 21 },
                    end: { line: 28, column: 24 },
                  },
                  value: "a",
                }),
              ),
            ),
            params: [],
          },
          $0splice1: {
            value: labelled(
              cs.create(
                {
                  start: { line: 29, column: 18 },
                  end: { line: 29, column: 25 },
                },
                {
                  filePath: "captures/script-bound-tag-capture-shadow.test.tsx",
                  fileHash: "2mv5sg07ackia",
                  splices: {},
                  captures: [],
                },
                () => ({
                  type: "Literal",
                  loc: {
                    start: { line: 29, column: 21 },
                    end: { line: 29, column: 24 },
                  },
                  value: "b",
                }),
              ),
            ),
            params: [],
          },
          $Card: { value: Card, params: [] },
        },
        captures: [],
      },
      () => ({
        type: "JSXElement",
        loc: { start: { line: 26, column: 7 }, end: { line: 30, column: 10 } },
        openingElement: {
          type: "JSXOpeningElement",
          loc: {
            start: { line: 26, column: 7 },
            end: { line: 26, column: 12 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 26, column: 8 },
              end: { line: 26, column: 11 },
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
              end: { line: 27, column: 27 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 27, column: 6 },
                end: { line: 27, column: 27 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 27, column: 7 },
                  end: { line: 27, column: 11 },
                },
                name: "Card",
              },
              attributes: [
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 27, column: 12 },
                    end: { line: 27, column: 24 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 27, column: 12 },
                      end: { line: 27, column: 17 },
                    },
                    name: "title",
                  },
                  value: {
                    type: "Literal",
                    loc: {
                      start: { line: 27, column: 18 },
                      end: { line: 27, column: 24 },
                    },
                    value: "host",
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
              start: { line: 28, column: 6 },
              end: { line: 28, column: 6 },
            },
            value: "\n      ",
            raw: "\n      ",
          },
          {
            type: "JSXExpressionContainer",
            loc: {
              start: { line: 28, column: 6 },
              end: { line: 28, column: 28 },
            },
            expression: {
              type: "Splice",
              loc: {
                start: { line: 28, column: 7 },
                end: { line: 28, column: 27 },
              },
              key: "$0splice0",
            },
          },
          {
            type: "JSXText",
            loc: {
              start: { line: 29, column: 6 },
              end: { line: 29, column: 6 },
            },
            value: "\n      ",
            raw: "\n      ",
          },
          {
            type: "JSXExpressionContainer",
            loc: {
              start: { line: 29, column: 6 },
              end: { line: 29, column: 28 },
            },
            expression: {
              type: "Splice",
              loc: {
                start: { line: 29, column: 7 },
                end: { line: 29, column: 27 },
              },
              key: "$0splice1",
            },
          },
          {
            type: "JSXText",
            loc: {
              start: { line: 30, column: 4 },
              end: { line: 30, column: 4 },
            },
            value: "\n    ",
            raw: "\n    ",
          },
        ],
        closingElement: {
          type: "JSXClosingElement",
          loc: {
            start: { line: 30, column: 4 },
            end: { line: 30, column: 10 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 30, column: 6 },
              end: { line: 30, column: 9 },
            },
            name: "div",
          },
        },
      }),
    ),
  );
});
// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same
// name is the host's component, spliced as before.
it("scriptBoundTagScope", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagScope",
    cs.create(
      { start: { line: 41, column: 4 }, end: { line: 57, column: 6 } },
      {
        filePath: "captures/script-bound-tag-capture-shadow.test.tsx",
        fileHash: "2mv5sg07ackia",
        splices: { $Card: { value: Card, params: [] } },
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 41, column: 7 }, end: { line: 57, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 42, column: 6 },
              end: { line: 47, column: 8 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 42, column: 12 },
                  end: { line: 47, column: 7 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 42, column: 12 },
                    end: { line: 42, column: 17 },
                  },
                  name: "twice",
                  key: "twice$2mv5sg07ackia$2",
                },
                init: {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 42, column: 20 },
                    end: { line: 47, column: 7 },
                  },
                  params: [
                    {
                      type: "Identifier",
                      loc: {
                        start: { line: 42, column: 21 },
                        end: { line: 42, column: 25 },
                      },
                      name: "Card",
                      key: "Card$2mv5sg07ackia$3",
                    },
                  ],
                  body: {
                    type: "JSXElement",
                    loc: {
                      start: { line: 43, column: 8 },
                      end: { line: 46, column: 14 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 43, column: 8 },
                        end: { line: 43, column: 13 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 43, column: 9 },
                          end: { line: 43, column: 12 },
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
                          start: { line: 44, column: 10 },
                          end: { line: 44, column: 10 },
                        },
                        value: "\n          ",
                        raw: "\n          ",
                      },
                      {
                        type: "JSXElement",
                        loc: {
                          start: { line: 44, column: 10 },
                          end: { line: 44, column: 24 },
                        },
                        openingElement: {
                          type: "JSXOpeningElement",
                          loc: {
                            start: { line: 44, column: 10 },
                            end: { line: 44, column: 24 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 44, column: 11 },
                              end: { line: 44, column: 15 },
                            },
                            name: "Card",
                            key: "Card$2mv5sg07ackia$3",
                          },
                          attributes: [
                            {
                              type: "JSXAttribute",
                              loc: {
                                start: { line: 44, column: 16 },
                                end: { line: 44, column: 21 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 44, column: 16 },
                                  end: { line: 44, column: 17 },
                                },
                                name: "n",
                              },
                              value: {
                                type: "JSXExpressionContainer",
                                loc: {
                                  start: { line: 44, column: 18 },
                                  end: { line: 44, column: 21 },
                                },
                                expression: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 44, column: 19 },
                                    end: { line: 44, column: 20 },
                                  },
                                  value: 1,
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
                          start: { line: 45, column: 10 },
                          end: { line: 45, column: 10 },
                        },
                        value: "\n          ",
                        raw: "\n          ",
                      },
                      {
                        type: "JSXElement",
                        loc: {
                          start: { line: 45, column: 10 },
                          end: { line: 45, column: 24 },
                        },
                        openingElement: {
                          type: "JSXOpeningElement",
                          loc: {
                            start: { line: 45, column: 10 },
                            end: { line: 45, column: 24 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 45, column: 11 },
                              end: { line: 45, column: 15 },
                            },
                            name: "Card",
                            key: "Card$2mv5sg07ackia$3",
                          },
                          attributes: [
                            {
                              type: "JSXAttribute",
                              loc: {
                                start: { line: 45, column: 16 },
                                end: { line: 45, column: 21 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 45, column: 16 },
                                  end: { line: 45, column: 17 },
                                },
                                name: "n",
                              },
                              value: {
                                type: "JSXExpressionContainer",
                                loc: {
                                  start: { line: 45, column: 18 },
                                  end: { line: 45, column: 21 },
                                },
                                expression: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 45, column: 19 },
                                    end: { line: 45, column: 20 },
                                  },
                                  value: 2,
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
                          start: { line: 46, column: 8 },
                          end: { line: 46, column: 8 },
                        },
                        value: "\n        ",
                        raw: "\n        ",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 46, column: 8 },
                        end: { line: 46, column: 14 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 46, column: 10 },
                          end: { line: 46, column: 13 },
                        },
                        name: "div",
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
            loc: {
              start: { line: 49, column: 6 },
              end: { line: 56, column: 8 },
            },
            argument: {
              type: "JSXElement",
              loc: {
                start: { line: 50, column: 8 },
                end: { line: 55, column: 18 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 50, column: 8 },
                  end: { line: 50, column: 17 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 50, column: 9 },
                    end: { line: 50, column: 16 },
                  },
                  name: "section",
                },
                attributes: [],
                selfClosing: false,
              },
              children: [
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 51, column: 10 },
                    end: { line: 51, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 51, column: 10 },
                    end: { line: 51, column: 31 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 51, column: 10 },
                      end: { line: 51, column: 31 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 51, column: 11 },
                        end: { line: 51, column: 15 },
                      },
                      name: "Card",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 51, column: 16 },
                          end: { line: 51, column: 28 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 51, column: 16 },
                            end: { line: 51, column: 21 },
                          },
                          name: "title",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 51, column: 22 },
                            end: { line: 51, column: 28 },
                          },
                          value: "host",
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
                    start: { line: 52, column: 10 },
                    end: { line: 52, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 52, column: 10 },
                    end: { line: 54, column: 13 },
                  },
                  expression: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 52, column: 11 },
                      end: { line: 54, column: 12 },
                    },
                    callee: {
                      type: "Identifier",
                      loc: {
                        start: { line: 52, column: 11 },
                        end: { line: 52, column: 16 },
                      },
                      name: "twice",
                      key: "twice$2mv5sg07ackia$2",
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 52, column: 17 },
                          end: { line: 54, column: 11 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 52, column: 18 },
                              end: { line: 52, column: 23 },
                            },
                            name: "props",
                            key: "props$2mv5sg07ackia$4",
                          },
                        ],
                        body: {
                          type: "JSXElement",
                          loc: {
                            start: { line: 53, column: 12 },
                            end: { line: 53, column: 37 },
                          },
                          openingElement: {
                            type: "JSXOpeningElement",
                            loc: {
                              start: { line: 53, column: 12 },
                              end: { line: 53, column: 15 },
                            },
                            name: {
                              type: "JSXIdentifier",
                              loc: {
                                start: { line: 53, column: 13 },
                                end: { line: 53, column: 14 },
                              },
                              name: "i",
                            },
                            attributes: [],
                            selfClosing: false,
                          },
                          children: [
                            {
                              type: "JSXExpressionContainer",
                              loc: {
                                start: { line: 53, column: 15 },
                                end: { line: 53, column: 33 },
                              },
                              expression: {
                                type: "BinaryExpression",
                                loc: {
                                  start: { line: 53, column: 16 },
                                  end: { line: 53, column: 32 },
                                },
                                operator: "+",
                                left: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 53, column: 16 },
                                    end: { line: 53, column: 22 },
                                  },
                                  value: "row ",
                                },
                                right: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 53, column: 25 },
                                    end: { line: 53, column: 32 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 53, column: 25 },
                                      end: { line: 53, column: 30 },
                                    },
                                    name: "props",
                                    key: "props$2mv5sg07ackia$4",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 53, column: 31 },
                                      end: { line: 53, column: 32 },
                                    },
                                    name: "n",
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
                              start: { line: 53, column: 33 },
                              end: { line: 53, column: 37 },
                            },
                            name: {
                              type: "JSXIdentifier",
                              loc: {
                                start: { line: 53, column: 35 },
                                end: { line: 53, column: 36 },
                              },
                              name: "i",
                            },
                          },
                        },
                        expression: true,
                      },
                    ],
                    optional: false,
                  },
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 55, column: 8 },
                    end: { line: 55, column: 8 },
                  },
                  value: "\n        ",
                  raw: "\n        ",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 55, column: 8 },
                  end: { line: 55, column: 18 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 55, column: 10 },
                    end: { line: 55, column: 17 },
                  },
                  name: "section",
                },
              },
            },
          },
        ],
      }),
    ),
  );
});
