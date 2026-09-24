import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A cell holding an enum, handed to a function whose parameter is that enum.
//
// The member is spliced as itself and the cell holds `Color` rather than
// `Color.Red`, so the other member is a value it takes. What a splice hands
// over keeps the width the host gave it: `cs.splice` reads it back unbound, and
// the binding it lands in decides the width the way TypeScript decides every
// other one — a member to its enum, as a `let` would.
var Color;
(function (Color) {
  Color[(Color["Red"] = 0)] = "Red";
  Color[(Color["Blue"] = 1)] = "Blue";
})(Color || (Color = {}));
const colorName = cs.create(
  { start: { line: 18, column: 48 }, end: { line: 20, column: 2 } },
  {
    filePath: "state/state-enum.test.tsx",
    fileHash: "30a9wee2eidm4",
    splices: { $0splice0: { value: Color.Blue, params: [] } },
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 18, column: 51 }, end: { line: 20, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 18, column: 52 }, end: { line: 18, column: 53 } },
        name: "c",
        key: "c$30a9wee2eidm4$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 18, column: 65 }, end: { line: 20, column: 1 } },
      body: [
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 19, column: 2 },
            end: { line: 19, column: 46 },
          },
          argument: {
            type: "ConditionalExpression",
            loc: {
              start: { line: 19, column: 9 },
              end: { line: 19, column: 45 },
            },
            test: {
              type: "BinaryExpression",
              loc: {
                start: { line: 19, column: 9 },
                end: { line: 19, column: 28 },
              },
              operator: "===",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 19, column: 9 },
                  end: { line: 19, column: 10 },
                },
                name: "c",
                key: "c$30a9wee2eidm4$0",
              },
              right: {
                type: "Splice",
                loc: {
                  start: { line: 19, column: 15 },
                  end: { line: 19, column: 28 },
                },
                key: "$0splice0",
              },
            },
            consequent: {
              type: "Literal",
              loc: {
                start: { line: 19, column: 31 },
                end: { line: 19, column: 37 },
              },
              value: "blue",
            },
            alternate: {
              type: "Literal",
              loc: {
                start: { line: 19, column: 40 },
                end: { line: 19, column: 45 },
              },
              value: "red",
            },
          },
        },
      ],
    },
    expression: false,
  }),
);
async function Swatch() {
  return cs.create(
    { start: { line: 23, column: 9 }, end: { line: 30, column: 4 } },
    {
      filePath: "state/state-enum.test.tsx",
      fileHash: "30a9wee2eidm4",
      splices: {
        $state: { value: state, params: [] },
        $0splice0: { value: Color.Red, params: [] },
        $0splice1: { value: Color.Blue, params: [] },
        $colorName: { value: colorName, params: [] },
      },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 23, column: 12 }, end: { line: 30, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 24, column: 4 },
            end: { line: 24, column: 38 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 24, column: 10 },
                end: { line: 24, column: 37 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 24, column: 10 },
                  end: { line: 24, column: 14 },
                },
                name: "held",
                key: "held$30a9wee2eidm4$1",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 24, column: 17 },
                  end: { line: 24, column: 37 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 24, column: 17 },
                    end: { line: 24, column: 23 },
                  },
                  key: "$state",
                },
                arguments: [
                  {
                    type: "Splice",
                    loc: {
                      start: { line: 24, column: 24 },
                      end: { line: 24, column: 36 },
                    },
                    key: "$0splice0",
                  },
                ],
                optional: false,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: { start: { line: 25, column: 4 }, end: { line: 29, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 26, column: 6 },
              end: { line: 28, column: 13 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 26, column: 6 },
                end: { line: 26, column: 52 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 26, column: 7 },
                  end: { line: 26, column: 11 },
                },
                name: "span",
              },
              attributes: [
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 26, column: 12 },
                    end: { line: 26, column: 51 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 26, column: 12 },
                      end: { line: 26, column: 19 },
                    },
                    name: "onclick",
                  },
                  value: {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 26, column: 20 },
                      end: { line: 26, column: 51 },
                    },
                    expression: {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 26, column: 21 },
                        end: { line: 26, column: 50 },
                      },
                      params: [],
                      body: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 26, column: 27 },
                          end: { line: 26, column: 50 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 26, column: 27 },
                            end: { line: 26, column: 35 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 26, column: 27 },
                              end: { line: 26, column: 31 },
                            },
                            name: "held",
                            key: "held$30a9wee2eidm4$1",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 26, column: 32 },
                              end: { line: 26, column: 35 },
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
                              start: { line: 26, column: 36 },
                              end: { line: 26, column: 49 },
                            },
                            key: "$0splice1",
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
                  start: { line: 27, column: 8 },
                  end: { line: 27, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 27, column: 8 },
                  end: { line: 27, column: 32 },
                },
                expression: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 27, column: 9 },
                    end: { line: 27, column: 31 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 27, column: 9 },
                      end: { line: 27, column: 19 },
                    },
                    key: "$colorName",
                  },
                  arguments: [
                    {
                      type: "CallExpression",
                      loc: {
                        start: { line: 27, column: 20 },
                        end: { line: 27, column: 30 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 27, column: 20 },
                          end: { line: 27, column: 28 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 27, column: 20 },
                            end: { line: 27, column: 24 },
                          },
                          name: "held",
                          key: "held$30a9wee2eidm4$1",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 27, column: 25 },
                            end: { line: 27, column: 28 },
                          },
                          name: "get",
                        },
                        computed: false,
                        optional: false,
                      },
                      arguments: [],
                      optional: false,
                    },
                  ],
                  optional: false,
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
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 28, column: 6 },
                end: { line: 28, column: 13 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 28, column: 8 },
                  end: { line: 28, column: 12 },
                },
                name: "span",
              },
            },
          },
        },
      ],
    }),
  );
}
it("Swatch", async (t) => {
  await snapshotCase(t, "Swatch", _jsx(Swatch, {}));
});
