import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// What a cell holds is the initial widened, so a second value of the same kind
// goes in after it. Each write is the assertion — every one is an error the
// moment `$state` reads its initial narrowly.
//
// A function is the one initial that does not widen on its own: what an arrow
// answers with widens only against a contextual type, and `$state` takes its
// initial unbound so that every other kind does widen. Written out, the type
// argument is the contextual type — `$state<() => number>` holds a function
// answering with any number rather than only the one it was built from.
//
// `Stepper` covers a number, and `Swatch` a numeric enum handed to a function
// typed as it.
var Tone;
(function (Tone) {
  Tone["Warm"] = "warm";
  Tone["Cool"] = "cool";
})(Tone || (Tone = {}));
async function Widened() {
  return cs.create(
    "2832bhm4681w5:23:9",
    {
      params: [
        { kind: "splice", value: state, bindings: [] },
        { kind: "splice", value: Tone.Warm, bindings: [] },
        { kind: "splice", value: Tone.Cool, bindings: [] },
      ],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 23, column: 12 }, end: { line: 38, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 24, column: 4 },
            end: { line: 24, column: 30 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 24, column: 10 },
                end: { line: 24, column: 29 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 24, column: 10 },
                  end: { line: 24, column: 14 },
                },
                name: "flag",
                key: "flag$2832bhm4681w5$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 24, column: 17 },
                  end: { line: 24, column: 29 },
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
                    type: "Literal",
                    loc: {
                      start: { line: 24, column: 24 },
                      end: { line: 24, column: 28 },
                    },
                    value: true,
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
            start: { line: 25, column: 4 },
            end: { line: 25, column: 38 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 25, column: 10 },
                end: { line: 25, column: 37 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 25, column: 10 },
                  end: { line: 25, column: 14 },
                },
                name: "tone",
                key: "tone$2832bhm4681w5$1",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 25, column: 17 },
                  end: { line: 25, column: 37 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 25, column: 17 },
                    end: { line: 25, column: 23 },
                  },
                  param: 0,
                },
                arguments: [
                  {
                    type: "Splice",
                    loc: {
                      start: { line: 25, column: 24 },
                      end: { line: 25, column: 36 },
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
          type: "VariableDeclaration",
          loc: {
            start: { line: 26, column: 4 },
            end: { line: 26, column: 47 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 26, column: 10 },
                end: { line: 26, column: 46 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 26, column: 10 },
                  end: { line: 26, column: 14 },
                },
                name: "step",
                key: "step$2832bhm4681w5$2",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 26, column: 17 },
                  end: { line: 26, column: 46 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 26, column: 17 },
                    end: { line: 26, column: 23 },
                  },
                  param: 0,
                },
                arguments: [
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 26, column: 38 },
                      end: { line: 26, column: 45 },
                    },
                    params: [],
                    body: {
                      type: "Literal",
                      loc: {
                        start: { line: 26, column: 44 },
                        end: { line: 26, column: 45 },
                      },
                      value: 0,
                    },
                    expression: true,
                  },
                ],
                optional: false,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: { start: { line: 27, column: 4 }, end: { line: 37, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 28, column: 6 },
              end: { line: 36, column: 13 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 28, column: 6 },
                end: { line: 34, column: 7 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 28, column: 7 },
                  end: { line: 28, column: 11 },
                },
                name: "span",
              },
              attributes: [
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 29, column: 8 },
                    end: { line: 33, column: 10 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 29, column: 8 },
                      end: { line: 29, column: 15 },
                    },
                    name: "onclick",
                  },
                  value: {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 29, column: 16 },
                      end: { line: 33, column: 10 },
                    },
                    expression: {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 29, column: 17 },
                        end: { line: 33, column: 9 },
                      },
                      params: [],
                      body: {
                        type: "BlockStatement",
                        loc: {
                          start: { line: 29, column: 23 },
                          end: { line: 33, column: 9 },
                        },
                        body: [
                          {
                            type: "ExpressionStatement",
                            loc: {
                              start: { line: 30, column: 10 },
                              end: { line: 30, column: 26 },
                            },
                            expression: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 30, column: 10 },
                                end: { line: 30, column: 25 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 30, column: 10 },
                                  end: { line: 30, column: 18 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 30, column: 10 },
                                    end: { line: 30, column: 14 },
                                  },
                                  name: "flag",
                                  key: "flag$2832bhm4681w5$0",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 30, column: 15 },
                                    end: { line: 30, column: 18 },
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
                                    start: { line: 30, column: 19 },
                                    end: { line: 30, column: 24 },
                                  },
                                  value: false,
                                },
                              ],
                              optional: false,
                            },
                          },
                          {
                            type: "ExpressionStatement",
                            loc: {
                              start: { line: 31, column: 10 },
                              end: { line: 31, column: 33 },
                            },
                            expression: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 31, column: 10 },
                                end: { line: 31, column: 32 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 31, column: 10 },
                                  end: { line: 31, column: 18 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 31, column: 10 },
                                    end: { line: 31, column: 14 },
                                  },
                                  name: "tone",
                                  key: "tone$2832bhm4681w5$1",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 31, column: 15 },
                                    end: { line: 31, column: 18 },
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
                                    start: { line: 31, column: 19 },
                                    end: { line: 31, column: 31 },
                                  },
                                  param: 2,
                                },
                              ],
                              optional: false,
                            },
                          },
                          {
                            type: "ExpressionStatement",
                            loc: {
                              start: { line: 32, column: 10 },
                              end: { line: 32, column: 28 },
                            },
                            expression: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 32, column: 10 },
                                end: { line: 32, column: 27 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 32, column: 10 },
                                  end: { line: 32, column: 18 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 32, column: 10 },
                                    end: { line: 32, column: 14 },
                                  },
                                  name: "step",
                                  key: "step$2832bhm4681w5$2",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 32, column: 15 },
                                    end: { line: 32, column: 18 },
                                  },
                                  name: "set",
                                },
                                computed: false,
                                optional: false,
                              },
                              arguments: [
                                {
                                  type: "ArrowFunctionExpression",
                                  loc: {
                                    start: { line: 32, column: 19 },
                                    end: { line: 32, column: 26 },
                                  },
                                  params: [],
                                  body: {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 32, column: 25 },
                                      end: { line: 32, column: 26 },
                                    },
                                    value: 1,
                                  },
                                  expression: true,
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
                },
              ],
              selfClosing: false,
            },
            children: [
              {
                type: "JSXText",
                loc: {
                  start: { line: 35, column: 8 },
                  end: { line: 35, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 35, column: 8 },
                  end: { line: 35, column: 60 },
                },
                expression: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 35, column: 9 },
                    end: { line: 35, column: 59 },
                  },
                  operator: "+",
                  left: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 35, column: 9 },
                      end: { line: 35, column: 44 },
                    },
                    operator: "+",
                    left: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 35, column: 9 },
                        end: { line: 35, column: 38 },
                      },
                      operator: "+",
                      left: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 35, column: 9 },
                          end: { line: 35, column: 25 },
                        },
                        operator: "+",
                        left: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 35, column: 9 },
                            end: { line: 35, column: 19 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 35, column: 9 },
                              end: { line: 35, column: 17 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 35, column: 9 },
                                end: { line: 35, column: 13 },
                              },
                              name: "flag",
                              key: "flag$2832bhm4681w5$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 35, column: 14 },
                                end: { line: 35, column: 17 },
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
                            start: { line: 35, column: 22 },
                            end: { line: 35, column: 25 },
                          },
                          value: " ",
                        },
                      },
                      right: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 35, column: 28 },
                          end: { line: 35, column: 38 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 35, column: 28 },
                            end: { line: 35, column: 36 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 35, column: 28 },
                              end: { line: 35, column: 32 },
                            },
                            name: "tone",
                            key: "tone$2832bhm4681w5$1",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 35, column: 33 },
                              end: { line: 35, column: 36 },
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
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 35, column: 41 },
                        end: { line: 35, column: 44 },
                      },
                      value: " ",
                    },
                  },
                  right: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 35, column: 47 },
                      end: { line: 35, column: 59 },
                    },
                    callee: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 35, column: 47 },
                        end: { line: 35, column: 57 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 35, column: 47 },
                          end: { line: 35, column: 55 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 35, column: 47 },
                            end: { line: 35, column: 51 },
                          },
                          name: "step",
                          key: "step$2832bhm4681w5$2",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 35, column: 52 },
                            end: { line: 35, column: 55 },
                          },
                          name: "get",
                        },
                        computed: false,
                        optional: false,
                      },
                      arguments: [],
                      optional: false,
                    },
                    arguments: [],
                    optional: false,
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 36, column: 6 },
                  end: { line: 36, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 36, column: 6 },
                end: { line: 36, column: 13 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 36, column: 8 },
                  end: { line: 36, column: 12 },
                },
                name: "span",
              },
            },
          },
        },
      ],
    }),
    {
      code: 'export default ($0, $1, $2) => {\n    const flag = $0()(true);\n    const tone = $0()($1());\n    const step = $0()(() => 0);\n    return (<span onclick={() => {\n            flag.set(false);\n            tone.set($2());\n            step.set(() => 1);\n        }}>\n        {flag.get() + " " + tone.get() + " " + step.get()()}\n      </span>);\n};',
      map: '{"version":3,"file":"state-widening.test.jsx","sourceRoot":"","sources":["state-widening.test.tsx"],"names":[],"mappings":"eAsBY;IACR,MAAM,IAAI,GAAG,IAAM,CAAC,IAAI,CAAC,CAAC;IAC1B,MAAM,IAAI,GAAG,IAAM,CAAC,IAAC,CAAY,CAAC;IAClC,MAAM,IAAI,GAAG,IAAM,CAAe,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC;IAC3C,OAAO,CACL,CAAC,IAAI,CACH,OAAO,CAAC,CAAC,GAAG,EAAE;YACZ,IAAI,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC;YAChB,IAAI,CAAC,GAAG,CAAC,IAAC,CAAY,CAAC;YACvB,IAAI,CAAC,GAAG,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC;QACpB,CAAC,CAAC,CAEF;QAAA,CAAC,IAAI,CAAC,GAAG,EAAE,GAAG,GAAG,GAAG,IAAI,CAAC,GAAG,EAAE,GAAG,GAAG,GAAG,IAAI,CAAC,GAAG,EAAE,EAAE,CACrD;MAAA,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
it("Widened", async (t) => {
  await snapshotCase(t, "Widened", _jsx(Widened, {}));
});
