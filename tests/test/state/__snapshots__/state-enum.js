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
  "30a9wee2eidm4:18:48",
  { params: [{ kind: "splice", value: Color.Blue, bindings: [] }] },
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
                param: 0,
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
  'export default ($0) => (c) => {\n    return c === $0() ? "blue" : "red";\n};',
  '{"version":3,"file":"state-enum.test.jsx","sourceRoot":"","sources":["state-enum.test.tsx"],"names":[],"mappings":"eAiBmD,QAAA,CAAC,CAAQ,EAAE,EAAE;IAC9D,OAAO,CAAC,KAAK,IAAC,CAAa,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,KAAK,CAAC;AAC9C,CAAC"}',
);
async function Swatch() {
  return cs.create(
    "30a9wee2eidm4:23:9",
    {
      params: [
        { kind: "splice", value: state, bindings: [] },
        { kind: "splice", value: Color.Red, bindings: [] },
        { kind: "splice", value: Color.Blue, bindings: [] },
        { kind: "splice", value: colorName, bindings: [] },
      ],
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
                  param: 0,
                },
                arguments: [
                  {
                    type: "Splice",
                    loc: {
                      start: { line: 24, column: 24 },
                      end: { line: 24, column: 36 },
                    },
                    param: 1,
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
                            param: 2,
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
                    param: 3,
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
    "export default ($0, $1, $2, $3) => {\n    const held = $0()($1());\n    return (<span onclick={() => held.set($2())}>\n        {$3()(held.get())}\n      </span>);\n};",
    '{"version":3,"file":"state-enum.test.jsx","sourceRoot":"","sources":["state-enum.test.tsx"],"names":[],"mappings":"eAsBY;IACR,MAAM,IAAI,GAAG,IAAM,CAAC,IAAC,CAAY,CAAC;IAClC,OAAO,CACL,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,IAAI,CAAC,GAAG,CAAC,IAAC,CAAa,CAAC,CAC3C;QAAA,CAAC,IAAU,CAAC,IAAI,CAAC,GAAG,EAAE,CAAC,CACzB;MAAA,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC"}',
  );
}
it("Swatch", async (t) => {
  await snapshotCase(t, "Swatch", _jsx(Swatch, {}));
});
