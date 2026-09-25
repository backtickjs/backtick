import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle a page does not have yet, and what stands in until it does.
//
// Both reads are where they stand, inside the drawing: that is what makes the
// condition follow the cell. Reading it once into a `const` would narrow the
// type and freeze the drawing — the script body runs once, so the loading
// state would never resolve. So the second read is asserted instead, which
// the condition beside it is what makes true.
it("evalLoading", async (t) => {
  await snapshotCase(
    t,
    "evalLoading",
    cs.create(
      "2t6t5dze0269t:17:4",
      { params: [{ kind: "splice", value: state, bindings: [] }] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 17, column: 7 }, end: { line: 29, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 64 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 18, column: 12 },
                  end: { line: 18, column: 63 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 16 },
                  },
                  name: "held",
                  key: "held$2t6t5dze0269t$0",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 18, column: 19 },
                    end: { line: 18, column: 63 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 18, column: 19 },
                      end: { line: 18, column: 25 },
                    },
                    param: 0,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 18, column: 58 },
                        end: { line: 18, column: 62 },
                      },
                      value: null,
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
              start: { line: 20, column: 6 },
              end: { line: 28, column: 8 },
            },
            argument: {
              type: "JSXElement",
              loc: {
                start: { line: 21, column: 8 },
                end: { line: 27, column: 14 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 21, column: 8 },
                  end: { line: 21, column: 13 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 21, column: 9 },
                    end: { line: 21, column: 12 },
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
                    start: { line: 22, column: 10 },
                    end: { line: 22, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 22, column: 10 },
                    end: { line: 26, column: 12 },
                  },
                  expression: {
                    type: "ConditionalExpression",
                    loc: {
                      start: { line: 22, column: 11 },
                      end: { line: 26, column: 11 },
                    },
                    test: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 22, column: 11 },
                        end: { line: 22, column: 30 },
                      },
                      operator: "===",
                      left: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 22, column: 11 },
                          end: { line: 22, column: 21 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 22, column: 11 },
                            end: { line: 22, column: 19 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 22, column: 11 },
                              end: { line: 22, column: 15 },
                            },
                            name: "held",
                            key: "held$2t6t5dze0269t$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 22, column: 16 },
                              end: { line: 22, column: 19 },
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
                          start: { line: 22, column: 26 },
                          end: { line: 22, column: 30 },
                        },
                        value: null,
                      },
                    },
                    consequent: {
                      type: "JSXElement",
                      loc: {
                        start: { line: 23, column: 12 },
                        end: { line: 23, column: 33 },
                      },
                      openingElement: {
                        type: "JSXOpeningElement",
                        loc: {
                          start: { line: 23, column: 12 },
                          end: { line: 23, column: 18 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 23, column: 13 },
                            end: { line: 23, column: 17 },
                          },
                          name: "span",
                        },
                        attributes: [],
                        selfClosing: false,
                      },
                      children: [
                        {
                          type: "JSXText",
                          loc: {
                            start: { line: 23, column: 18 },
                            end: { line: 23, column: 26 },
                          },
                          value: "loading\u2026",
                          raw: "loading\u2026",
                        },
                      ],
                      closingElement: {
                        type: "JSXClosingElement",
                        loc: {
                          start: { line: 23, column: 26 },
                          end: { line: 23, column: 33 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 23, column: 28 },
                            end: { line: 23, column: 32 },
                          },
                          name: "span",
                        },
                      },
                    },
                    alternate: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 25, column: 12 },
                        end: { line: 25, column: 55 },
                      },
                      callee: {
                        type: "Identifier",
                        loc: {
                          start: { line: 25, column: 12 },
                          end: { line: 25, column: 16 },
                        },
                        name: "eval",
                      },
                      arguments: [
                        {
                          type: "CallExpression",
                          loc: {
                            start: { line: 25, column: 17 },
                            end: { line: 25, column: 27 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 25, column: 17 },
                              end: { line: 25, column: 25 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 25, column: 17 },
                                end: { line: 25, column: 21 },
                              },
                              name: "held",
                              key: "held$2t6t5dze0269t$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 25, column: 22 },
                                end: { line: 25, column: 25 },
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
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 27, column: 8 },
                    end: { line: 27, column: 8 },
                  },
                  value: "\n        ",
                  raw: "\n        ",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 27, column: 8 },
                  end: { line: 27, column: 14 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 27, column: 10 },
                    end: { line: 27, column: 13 },
                  },
                  name: "div",
                },
              },
            },
          },
        ],
      }),
      "$0 => {\n    const held = $0()(null);\n    return (<div>\n          {held.get() === null ? (<span>loading\u2026</span>) : (eval(held.get()))}\n        </div>);\n}",
      '{"version":3,"file":"eval-loading.test.jsx","sourceRoot":"","sources":["eval-loading.test.tsx"],"names":[],"mappings":"AAgBO;IACD,MAAM,IAAI,GAAG,IAAM,CAAiC,IAAI,CAAC,CAAC;IAE1D,OAAO,CACL,CAAC,GAAG,CACF;UAAA,CAAC,IAAI,CAAC,GAAG,EAAE,KAAK,IAAI,CAAC,CAAC,CAAC,CACrB,CAAC,IAAI,CAAC,QAAQ,EAAE,IAAI,CAAC,CACtB,CAAC,CAAC,CAAC,CACF,IAAI,CAAC,IAAI,CAAC,GAAG,EAA6B,CAAC,CAC5C,CACH;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC,CAAA"}',
    ),
  );
});
