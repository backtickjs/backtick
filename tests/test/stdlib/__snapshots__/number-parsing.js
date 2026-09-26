import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A namespace static, reached the way `Math.floor` and `Array.from` are: the
// whole of `Number.parseInt` is one name the client answers, so `Number` is a
// front rather than a value and nothing is read off it.
async function Parsed() {
  return cs.create(
    "28kni4l69t7vb:9:9",
    { params: [] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 9, column: 12 }, end: { line: 14, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 10, column: 4 },
            end: { line: 10, column: 42 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 10, column: 10 },
                end: { line: 10, column: 41 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 10, column: 10 },
                  end: { line: 10, column: 15 },
                },
                name: "whole",
                key: "whole$28kni4l69t7vb$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 10, column: 18 },
                  end: { line: 10, column: 41 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 10, column: 18 },
                    end: { line: 10, column: 33 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 10, column: 18 },
                      end: { line: 10, column: 24 },
                    },
                    name: "Number",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 10, column: 25 },
                      end: { line: 10, column: 33 },
                    },
                    name: "parseInt",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 10, column: 34 },
                      end: { line: 10, column: 40 },
                    },
                    value: "42px",
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
            start: { line: 11, column: 4 },
            end: { line: 11, column: 44 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 11, column: 10 },
                end: { line: 11, column: 43 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 11, column: 10 },
                  end: { line: 11, column: 15 },
                },
                name: "based",
                key: "based$28kni4l69t7vb$1",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 11, column: 18 },
                  end: { line: 11, column: 43 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 11, column: 18 },
                    end: { line: 11, column: 33 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 11, column: 18 },
                      end: { line: 11, column: 24 },
                    },
                    name: "Number",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 11, column: 25 },
                      end: { line: 11, column: 33 },
                    },
                    name: "parseInt",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 11, column: 34 },
                      end: { line: 11, column: 38 },
                    },
                    value: "ff",
                  },
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 11, column: 40 },
                      end: { line: 11, column: 42 },
                    },
                    value: 16,
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
            start: { line: 12, column: 4 },
            end: { line: 12, column: 48 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 12, column: 10 },
                end: { line: 12, column: 47 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 12, column: 10 },
                  end: { line: 12, column: 20 },
                },
                name: "fractional",
                key: "fractional$28kni4l69t7vb$2",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 12, column: 23 },
                  end: { line: 12, column: 47 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 12, column: 23 },
                    end: { line: 12, column: 40 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 12, column: 23 },
                      end: { line: 12, column: 29 },
                    },
                    name: "Number",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 12, column: 30 },
                      end: { line: 12, column: 40 },
                    },
                    name: "parseFloat",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 12, column: 41 },
                      end: { line: 12, column: 46 },
                    },
                    value: "1.5",
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
            start: { line: 13, column: 4 },
            end: { line: 13, column: 58 },
          },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 13, column: 11 },
              end: { line: 13, column: 57 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 13, column: 11 },
                end: { line: 13, column: 17 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 13, column: 12 },
                  end: { line: 13, column: 16 },
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
                  start: { line: 13, column: 17 },
                  end: { line: 13, column: 50 },
                },
                expression: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 13, column: 18 },
                    end: { line: 13, column: 49 },
                  },
                  operator: "+",
                  left: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 13, column: 18 },
                      end: { line: 13, column: 44 },
                    },
                    operator: "+",
                    left: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 13, column: 18 },
                        end: { line: 13, column: 31 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 13, column: 18 },
                          end: { line: 13, column: 23 },
                        },
                        name: "whole",
                        key: "whole$28kni4l69t7vb$0",
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 13, column: 26 },
                          end: { line: 13, column: 31 },
                        },
                        name: "based",
                        key: "based$28kni4l69t7vb$1",
                      },
                    },
                    right: {
                      type: "Identifier",
                      loc: {
                        start: { line: 13, column: 34 },
                        end: { line: 13, column: 44 },
                      },
                      name: "fractional",
                      key: "fractional$28kni4l69t7vb$2",
                    },
                  },
                  right: {
                    type: "Literal",
                    loc: {
                      start: { line: 13, column: 47 },
                      end: { line: 13, column: 49 },
                    },
                    value: "",
                  },
                },
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 13, column: 50 },
                end: { line: 13, column: 57 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 13, column: 52 },
                  end: { line: 13, column: 56 },
                },
                name: "span",
              },
            },
          },
        },
      ],
    }),
    {
      code: 'export default () => {\n    const whole = Number.parseInt("42px");\n    const based = Number.parseInt("ff", 16);\n    const fractional = Number.parseFloat("1.5");\n    return <span>{whole + based + fractional + ""}</span>;\n};',
      map: '{"version":3,"file":"number-parsing.test.jsx","sourceRoot":"","sources":["number-parsing.test.tsx"],"names":[],"mappings":"eAQY;IACR,MAAM,KAAK,GAAG,MAAM,CAAC,QAAQ,CAAC,MAAM,CAAC,CAAC;IACtC,MAAM,KAAK,GAAG,MAAM,CAAC,QAAQ,CAAC,IAAI,EAAE,EAAE,CAAC,CAAC;IACxC,MAAM,UAAU,GAAG,MAAM,CAAC,UAAU,CAAC,KAAK,CAAC,CAAC;IAC5C,OAAO,CAAC,IAAI,CAAC,CAAC,KAAK,GAAG,KAAK,GAAG,UAAU,GAAG,EAAE,CAAC,EAAE,IAAI,CAAC,CAAC;AACxD,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
it("Parsed", async (t) => {
  await snapshotCase(t, "Parsed", _jsx(Parsed, {}));
});
