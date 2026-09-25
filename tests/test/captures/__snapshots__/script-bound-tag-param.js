import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A tag naming a parameter of an arrow in the enclosing script. The nested
// scripts sit inside the arrow's body, so the parameter reaches them through
// the holes they fill rather than as a capture of the whole script.
it("scriptBoundTagParam", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagParam",
    cs.create(
      "3ehgcl2xwg3z1:13:4",
      {
        params: [
          {
            kind: "splice",
            value: cs.create(
              "3ehgcl2xwg3z1:16:13",
              { params: [{ kind: "capture", key: "Row$3ehgcl2xwg3z1$1" }] },
              () => ({
                type: "JSXElement",
                loc: {
                  start: { line: 16, column: 16 },
                  end: { line: 16, column: 29 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 16, column: 16 },
                    end: { line: 16, column: 29 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 16, column: 17 },
                      end: { line: 16, column: 20 },
                    },
                    name: "Row",
                    key: "Row$3ehgcl2xwg3z1$1",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 16, column: 21 },
                        end: { line: 16, column: 26 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 16, column: 21 },
                          end: { line: 16, column: 22 },
                        },
                        name: "n",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 16, column: 23 },
                          end: { line: 16, column: 26 },
                        },
                        expression: {
                          type: "Literal",
                          loc: {
                            start: { line: 16, column: 24 },
                            end: { line: 16, column: 25 },
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
              "$0 => <$0 n={1}/>",
              '{"version":3,"file":"script-bound-tag-param.test.jsx","sourceRoot":"","sources":["script-bound-tag-param.test.tsx"],"names":[],"mappings":"AAegB,MAAA,CAAC,EAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAG,CAAA"}',
            ),
            bindings: ["Row$3ehgcl2xwg3z1$1"],
          },
          {
            kind: "splice",
            value: cs.create(
              "3ehgcl2xwg3z1:17:13",
              { params: [{ kind: "capture", key: "Row$3ehgcl2xwg3z1$1" }] },
              () => ({
                type: "JSXElement",
                loc: {
                  start: { line: 17, column: 16 },
                  end: { line: 17, column: 29 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 17, column: 16 },
                    end: { line: 17, column: 29 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 17, column: 17 },
                      end: { line: 17, column: 20 },
                    },
                    name: "Row",
                    key: "Row$3ehgcl2xwg3z1$1",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 17, column: 21 },
                        end: { line: 17, column: 26 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 17, column: 21 },
                          end: { line: 17, column: 22 },
                        },
                        name: "n",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 17, column: 23 },
                          end: { line: 17, column: 26 },
                        },
                        expression: {
                          type: "Literal",
                          loc: {
                            start: { line: 17, column: 24 },
                            end: { line: 17, column: 25 },
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
              }),
              "$0 => <$0 n={2}/>",
              '{"version":3,"file":"script-bound-tag-param.test.jsx","sourceRoot":"","sources":["script-bound-tag-param.test.tsx"],"names":[],"mappings":"AAgBgB,MAAA,CAAC,EAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAG,CAAA"}',
            ),
            bindings: ["Row$3ehgcl2xwg3z1$1"],
          },
        ],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 13, column: 7 }, end: { line: 21, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 19, column: 8 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 14, column: 12 },
                  end: { line: 19, column: 7 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 12 },
                    end: { line: 14, column: 17 },
                  },
                  name: "twice",
                  key: "twice$3ehgcl2xwg3z1$0",
                },
                init: {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 14, column: 20 },
                    end: { line: 19, column: 7 },
                  },
                  params: [
                    {
                      type: "Identifier",
                      loc: {
                        start: { line: 14, column: 21 },
                        end: { line: 14, column: 24 },
                      },
                      name: "Row",
                      key: "Row$3ehgcl2xwg3z1$1",
                    },
                  ],
                  body: {
                    type: "JSXElement",
                    loc: {
                      start: { line: 15, column: 8 },
                      end: { line: 18, column: 13 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 15, column: 8 },
                        end: { line: 15, column: 12 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 15, column: 9 },
                          end: { line: 15, column: 11 },
                        },
                        name: "ul",
                      },
                      attributes: [],
                      selfClosing: false,
                    },
                    children: [
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 16, column: 10 },
                          end: { line: 16, column: 10 },
                        },
                        value: "\n          ",
                        raw: "\n          ",
                      },
                      {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 16, column: 10 },
                          end: { line: 16, column: 32 },
                        },
                        expression: {
                          type: "Splice",
                          loc: {
                            start: { line: 16, column: 11 },
                            end: { line: 16, column: 31 },
                          },
                          param: 0,
                        },
                      },
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 17, column: 10 },
                          end: { line: 17, column: 10 },
                        },
                        value: "\n          ",
                        raw: "\n          ",
                      },
                      {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 17, column: 10 },
                          end: { line: 17, column: 32 },
                        },
                        expression: {
                          type: "Splice",
                          loc: {
                            start: { line: 17, column: 11 },
                            end: { line: 17, column: 31 },
                          },
                          param: 1,
                        },
                      },
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 18, column: 8 },
                          end: { line: 18, column: 8 },
                        },
                        value: "\n        ",
                        raw: "\n        ",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 18, column: 8 },
                        end: { line: 18, column: 13 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 18, column: 10 },
                          end: { line: 18, column: 12 },
                        },
                        name: "ul",
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
              start: { line: 20, column: 6 },
              end: { line: 20, column: 66 },
            },
            argument: {
              type: "CallExpression",
              loc: {
                start: { line: 20, column: 13 },
                end: { line: 20, column: 65 },
              },
              callee: {
                type: "Identifier",
                loc: {
                  start: { line: 20, column: 13 },
                  end: { line: 20, column: 18 },
                },
                name: "twice",
                key: "twice$3ehgcl2xwg3z1$0",
              },
              arguments: [
                {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 20, column: 19 },
                    end: { line: 20, column: 64 },
                  },
                  params: [
                    {
                      type: "Identifier",
                      loc: {
                        start: { line: 20, column: 20 },
                        end: { line: 20, column: 21 },
                      },
                      name: "p",
                      key: "p$3ehgcl2xwg3z1$2",
                    },
                  ],
                  body: {
                    type: "JSXElement",
                    loc: {
                      start: { line: 20, column: 41 },
                      end: { line: 20, column: 64 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 20, column: 41 },
                        end: { line: 20, column: 45 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 20, column: 42 },
                          end: { line: 20, column: 44 },
                        },
                        name: "li",
                      },
                      attributes: [],
                      selfClosing: false,
                    },
                    children: [
                      {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 20, column: 45 },
                          end: { line: 20, column: 59 },
                        },
                        expression: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 20, column: 46 },
                            end: { line: 20, column: 58 },
                          },
                          operator: "+",
                          left: {
                            type: "Literal",
                            loc: {
                              start: { line: 20, column: 46 },
                              end: { line: 20, column: 52 },
                            },
                            value: "row ",
                          },
                          right: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 20, column: 55 },
                              end: { line: 20, column: 58 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 20, column: 55 },
                                end: { line: 20, column: 56 },
                              },
                              name: "p",
                              key: "p$3ehgcl2xwg3z1$2",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 20, column: 57 },
                                end: { line: 20, column: 58 },
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
                        start: { line: 20, column: 59 },
                        end: { line: 20, column: 64 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 20, column: 61 },
                          end: { line: 20, column: 63 },
                        },
                        name: "li",
                      },
                    },
                  },
                  expression: true,
                },
              ],
              optional: false,
            },
          },
        ],
      }),
      '($0, $1) => {\n    const twice = (Row) => (<ul>\n          {$0(Row)}\n          {$1(Row)}\n        </ul>);\n    return twice((p) => <li>{"row " + p.n}</li>);\n}',
      '{"version":3,"file":"script-bound-tag-param.test.jsx","sourceRoot":"","sources":["script-bound-tag-param.test.tsx"],"names":[],"mappings":"AAYO;IACD,MAAM,KAAK,GAAG,CAAC,GAA0C,EAAE,EAAE,CAAC,CAC5D,CAAC,EAAE,CACD;UAAA,CAAC,OAAoB,CACrB;UAAA,CAAC,OAAoB,CACvB;QAAA,EAAE,EAAE,CAAC,CACN,CAAC;IACF,OAAO,KAAK,CAAC,CAAC,CAAgB,EAAE,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,MAAM,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,CAAC;AAC9D,CAAC,CAAA"}',
    ),
  );
});
