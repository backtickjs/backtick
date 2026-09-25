import { cs } from "@backtickjs/core";
// The script between them binds `Badge` to a number, and the nearest binding is
// the one a tag names: the innermost `<Badge />` calls a number.
export default cs.create(
  "83k1lytjebk3:5:15",
  {
    params: [
      {
        kind: "splice",
        value: cs.create(
          "83k1lytjebk3:7:11",
          {
            params: [
              {
                kind: "splice",
                value: cs.create(
                  "83k1lytjebk3:10:13",
                  {
                    params: [{ kind: "capture", key: "Badge$83k1lytjebk3$2" }],
                  },
                  () => ({
                    type: "JSXElement",
                    loc: {
                      start: { line: 10, column: 16 },
                      end: { line: 10, column: 31 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 10, column: 16 },
                        end: { line: 10, column: 31 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 10, column: 17 },
                          end: { line: 10, column: 22 },
                        },
                        name: "Badge",
                        key: "Badge$83k1lytjebk3$2",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 10, column: 23 },
                            end: { line: 10, column: 28 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 10, column: 23 },
                              end: { line: 10, column: 24 },
                            },
                            name: "n",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 10, column: 25 },
                              end: { line: 10, column: 28 },
                            },
                            expression: {
                              type: "Literal",
                              loc: {
                                start: { line: 10, column: 26 },
                                end: { line: 10, column: 27 },
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
                  '{"version":3,"file":"script-bound-tag-shadowed.test.jsx","sourceRoot":"","sources":["script-bound-tag-shadowed.test.tsx"],"names":[],"mappings":"AASgB,MAAA,CAAC,EAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAG,CAAA"}',
                ),
                bindings: ["Badge$83k1lytjebk3$2"],
              },
            ],
          },
          () => ({
            type: "BlockStatement",
            loc: {
              start: { line: 7, column: 14 },
              end: { line: 11, column: 3 },
            },
            body: [
              {
                type: "VariableDeclaration",
                loc: {
                  start: { line: 8, column: 4 },
                  end: { line: 8, column: 20 },
                },
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    loc: {
                      start: { line: 8, column: 10 },
                      end: { line: 8, column: 19 },
                    },
                    id: {
                      type: "Identifier",
                      loc: {
                        start: { line: 8, column: 10 },
                        end: { line: 8, column: 15 },
                      },
                      name: "Badge",
                      key: "Badge$83k1lytjebk3$2",
                    },
                    init: {
                      type: "Literal",
                      loc: {
                        start: { line: 8, column: 18 },
                        end: { line: 8, column: 19 },
                      },
                      value: 5,
                    },
                  },
                ],
              },
              {
                type: "ReturnStatement",
                loc: {
                  start: { line: 10, column: 4 },
                  end: { line: 10, column: 34 },
                },
                argument: {
                  type: "Splice",
                  loc: {
                    start: { line: 10, column: 11 },
                    end: { line: 10, column: 33 },
                  },
                  param: 0,
                },
              },
            ],
          }),
          "$0 => {\n    const Badge = 5;\n    return $0(Badge);\n}",
          '{"version":3,"file":"script-bound-tag-shadowed.test.jsx","sourceRoot":"","sources":["script-bound-tag-shadowed.test.tsx"],"names":[],"mappings":"AAMc;IACV,MAAM,KAAK,GAAG,CAAC,CAAC;IAEhB,OAAO,SAAC,CAAsB;AAChC,CAAC,CAAA"}',
        ),
        bindings: [],
      },
    ],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 5, column: 18 }, end: { line: 12, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 6, column: 2 }, end: { line: 6, column: 58 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 6, column: 8 },
              end: { line: 6, column: 57 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 6, column: 8 },
                end: { line: 6, column: 13 },
              },
              name: "Badge",
              key: "Badge$83k1lytjebk3$0",
            },
            init: {
              type: "ArrowFunctionExpression",
              loc: {
                start: { line: 6, column: 16 },
                end: { line: 6, column: 57 },
              },
              params: [
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 6, column: 17 },
                    end: { line: 6, column: 18 },
                  },
                  name: "p",
                  key: "p$83k1lytjebk3$1",
                },
              ],
              body: {
                type: "JSXElement",
                loc: {
                  start: { line: 6, column: 38 },
                  end: { line: 6, column: 57 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 6, column: 38 },
                    end: { line: 6, column: 41 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 6, column: 39 },
                      end: { line: 6, column: 40 },
                    },
                    name: "b",
                  },
                  attributes: [],
                  selfClosing: false,
                },
                children: [
                  {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 6, column: 41 },
                      end: { line: 6, column: 53 },
                    },
                    expression: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 6, column: 42 },
                        end: { line: 6, column: 52 },
                      },
                      operator: "+",
                      left: {
                        type: "Literal",
                        loc: {
                          start: { line: 6, column: 42 },
                          end: { line: 6, column: 46 },
                        },
                        value: "n ",
                      },
                      right: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 6, column: 49 },
                          end: { line: 6, column: 52 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 6, column: 49 },
                            end: { line: 6, column: 50 },
                          },
                          name: "p",
                          key: "p$83k1lytjebk3$1",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 6, column: 51 },
                            end: { line: 6, column: 52 },
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
                    start: { line: 6, column: 53 },
                    end: { line: 6, column: 57 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 6, column: 55 },
                      end: { line: 6, column: 56 },
                    },
                    name: "b",
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
        loc: { start: { line: 7, column: 2 }, end: { line: 11, column: 6 } },
        argument: {
          type: "Splice",
          loc: { start: { line: 7, column: 9 }, end: { line: 11, column: 5 } },
          param: 0,
        },
      },
    ],
  }),
  '$0 => {\n    const Badge = (p) => <b>{"n " + p.n}</b>;\n    return $0();\n}',
  '{"version":3,"file":"script-bound-tag-shadowed.test.jsx","sourceRoot":"","sources":["script-bound-tag-shadowed.test.tsx"],"names":[],"mappings":"AAIkB;IAChB,MAAM,KAAK,GAAG,CAAC,CAAgB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IACxD,OAAO,IAAC,CAIJ;AACN,CAAC,CAAA"}',
);
