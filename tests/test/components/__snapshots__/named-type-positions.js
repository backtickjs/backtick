import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
async function Rows() {
  return cs.create(
    "1xb9ns0x2f3vb:18:9",
    {
      params: [
        { kind: "splice", value: state, bindings: [] },
        { kind: "tag", value: For },
      ],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 18, column: 12 }, end: { line: 34, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 19, column: 4 },
            end: { line: 19, column: 35 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 19, column: 10 },
                end: { line: 19, column: 34 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 19, column: 10 },
                  end: { line: 19, column: 14 },
                },
                name: "rows",
                key: "rows$1xb9ns0x2f3vb$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 19, column: 17 },
                  end: { line: 19, column: 34 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 19, column: 17 },
                    end: { line: 19, column: 23 },
                  },
                  param: 0,
                },
                arguments: [
                  {
                    type: "ArrayExpression",
                    loc: {
                      start: { line: 19, column: 31 },
                      end: { line: 19, column: 33 },
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
          loc: { start: { line: 20, column: 4 }, end: { line: 22, column: 6 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 20, column: 10 },
                end: { line: 22, column: 5 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 20, column: 10 },
                  end: { line: 20, column: 13 },
                },
                name: "add",
                key: "add$1xb9ns0x2f3vb$1",
              },
              init: {
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 20, column: 16 },
                  end: { line: 22, column: 5 },
                },
                params: [
                  {
                    type: "Identifier",
                    loc: {
                      start: { line: 20, column: 17 },
                      end: { line: 20, column: 20 },
                    },
                    name: "row",
                    key: "row$1xb9ns0x2f3vb$3",
                  },
                ],
                body: {
                  type: "BlockStatement",
                  loc: {
                    start: { line: 20, column: 30 },
                    end: { line: 22, column: 5 },
                  },
                  body: [
                    {
                      type: "ExpressionStatement",
                      loc: {
                        start: { line: 21, column: 6 },
                        end: { line: 21, column: 22 },
                      },
                      expression: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 21, column: 6 },
                          end: { line: 21, column: 21 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 21, column: 6 },
                            end: { line: 21, column: 14 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 21, column: 6 },
                              end: { line: 21, column: 10 },
                            },
                            name: "rows",
                            key: "rows$1xb9ns0x2f3vb$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 21, column: 11 },
                              end: { line: 21, column: 14 },
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
                              start: { line: 21, column: 15 },
                              end: { line: 21, column: 20 },
                            },
                            elements: [
                              {
                                type: "Identifier",
                                loc: {
                                  start: { line: 21, column: 16 },
                                  end: { line: 21, column: 19 },
                                },
                                name: "row",
                                key: "row$1xb9ns0x2f3vb$3",
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
          type: "VariableDeclaration",
          loc: { start: { line: 23, column: 4 }, end: { line: 25, column: 6 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 23, column: 10 },
                end: { line: 25, column: 5 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 23, column: 10 },
                  end: { line: 23, column: 15 },
                },
                name: "label",
                key: "label$1xb9ns0x2f3vb$2",
              },
              init: {
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 23, column: 18 },
                  end: { line: 25, column: 5 },
                },
                params: [
                  {
                    type: "Identifier",
                    loc: {
                      start: { line: 23, column: 19 },
                      end: { line: 23, column: 22 },
                    },
                    name: "row",
                    key: "row$1xb9ns0x2f3vb$4",
                  },
                ],
                body: {
                  type: "BlockStatement",
                  loc: {
                    start: { line: 23, column: 32 },
                    end: { line: 25, column: 5 },
                  },
                  body: [
                    {
                      type: "ReturnStatement",
                      loc: {
                        start: { line: 24, column: 6 },
                        end: { line: 24, column: 23 },
                      },
                      argument: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 24, column: 13 },
                          end: { line: 24, column: 22 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 24, column: 13 },
                            end: { line: 24, column: 16 },
                          },
                          name: "row",
                          key: "row$1xb9ns0x2f3vb$4",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 24, column: 17 },
                            end: { line: 24, column: 22 },
                          },
                          name: "label",
                        },
                        computed: false,
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
          loc: { start: { line: 26, column: 4 }, end: { line: 33, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 27, column: 6 },
              end: { line: 32, column: 12 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 27, column: 6 },
                end: { line: 27, column: 11 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 27, column: 7 },
                  end: { line: 27, column: 10 },
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
                  start: { line: 28, column: 8 },
                  end: { line: 28, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 28, column: 8 },
                  end: { line: 28, column: 69 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 28, column: 8 },
                    end: { line: 28, column: 59 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 28, column: 9 },
                      end: { line: 28, column: 13 },
                    },
                    name: "span",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 28, column: 14 },
                        end: { line: 28, column: 58 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 28, column: 14 },
                          end: { line: 28, column: 21 },
                        },
                        name: "onclick",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 28, column: 22 },
                          end: { line: 28, column: 58 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 28, column: 23 },
                            end: { line: 28, column: 57 },
                          },
                          params: [],
                          body: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 28, column: 29 },
                              end: { line: 28, column: 57 },
                            },
                            callee: {
                              type: "Identifier",
                              loc: {
                                start: { line: 28, column: 29 },
                                end: { line: 28, column: 32 },
                              },
                              name: "add",
                              key: "add$1xb9ns0x2f3vb$1",
                            },
                            arguments: [
                              {
                                type: "ObjectExpression",
                                loc: {
                                  start: { line: 28, column: 33 },
                                  end: { line: 28, column: 56 },
                                },
                                properties: [
                                  {
                                    type: "Property",
                                    loc: {
                                      start: { line: 28, column: 35 },
                                      end: { line: 28, column: 40 },
                                    },
                                    key: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 28, column: 35 },
                                        end: { line: 28, column: 37 },
                                      },
                                      name: "id",
                                    },
                                    value: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 28, column: 39 },
                                        end: { line: 28, column: 40 },
                                      },
                                      value: 1,
                                    },
                                    kind: "init",
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                  },
                                  {
                                    type: "Property",
                                    loc: {
                                      start: { line: 28, column: 42 },
                                      end: { line: 28, column: 54 },
                                    },
                                    key: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 28, column: 42 },
                                        end: { line: 28, column: 47 },
                                      },
                                      name: "label",
                                    },
                                    value: {
                                      type: "Literal",
                                      loc: {
                                        start: { line: 28, column: 49 },
                                        end: { line: 28, column: 54 },
                                      },
                                      value: "one",
                                    },
                                    kind: "init",
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                  },
                                ],
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
                      start: { line: 28, column: 59 },
                      end: { line: 28, column: 62 },
                    },
                    value: "add",
                    raw: "add",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 28, column: 62 },
                    end: { line: 28, column: 69 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 28, column: 64 },
                      end: { line: 28, column: 68 },
                    },
                    name: "span",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 29, column: 8 },
                  end: { line: 29, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 29, column: 8 },
                  end: { line: 31, column: 14 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 29, column: 8 },
                    end: { line: 29, column: 13 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 29, column: 9 },
                      end: { line: 29, column: 12 },
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
                      start: { line: 30, column: 10 },
                      end: { line: 30, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 30, column: 10 },
                      end: { line: 30, column: 80 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 30, column: 10 },
                        end: { line: 30, column: 33 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 30, column: 11 },
                          end: { line: 30, column: 14 },
                        },
                        name: "For",
                        param: 1,
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 30, column: 15 },
                            end: { line: 30, column: 32 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 30, column: 15 },
                              end: { line: 30, column: 19 },
                            },
                            name: "each",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 30, column: 20 },
                              end: { line: 30, column: 32 },
                            },
                            expression: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 30, column: 21 },
                                end: { line: 30, column: 31 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 30, column: 21 },
                                  end: { line: 30, column: 29 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 30, column: 21 },
                                    end: { line: 30, column: 25 },
                                  },
                                  name: "rows",
                                  key: "rows$1xb9ns0x2f3vb$0",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 30, column: 26 },
                                    end: { line: 30, column: 29 },
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
                          start: { line: 30, column: 33 },
                          end: { line: 30, column: 74 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 30, column: 34 },
                            end: { line: 30, column: 73 },
                          },
                          params: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 30, column: 35 },
                                end: { line: 30, column: 38 },
                              },
                              name: "row",
                              key: "row$1xb9ns0x2f3vb$5",
                            },
                          ],
                          body: {
                            type: "JSXElement",
                            loc: {
                              start: { line: 30, column: 48 },
                              end: { line: 30, column: 73 },
                            },
                            openingElement: {
                              type: "JSXOpeningElement",
                              loc: {
                                start: { line: 30, column: 48 },
                                end: { line: 30, column: 54 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 30, column: 49 },
                                  end: { line: 30, column: 53 },
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
                                  start: { line: 30, column: 54 },
                                  end: { line: 30, column: 66 },
                                },
                                expression: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 30, column: 55 },
                                    end: { line: 30, column: 65 },
                                  },
                                  callee: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 30, column: 55 },
                                      end: { line: 30, column: 60 },
                                    },
                                    name: "label",
                                    key: "label$1xb9ns0x2f3vb$2",
                                  },
                                  arguments: [
                                    {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 30, column: 61 },
                                        end: { line: 30, column: 64 },
                                      },
                                      name: "row",
                                      key: "row$1xb9ns0x2f3vb$5",
                                    },
                                  ],
                                  optional: false,
                                },
                              },
                            ],
                            closingElement: {
                              type: "JSXClosingElement",
                              loc: {
                                start: { line: 30, column: 66 },
                                end: { line: 30, column: 73 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 30, column: 68 },
                                  end: { line: 30, column: 72 },
                                },
                                name: "span",
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
                        start: { line: 30, column: 74 },
                        end: { line: 30, column: 80 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 30, column: 76 },
                          end: { line: 30, column: 79 },
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
    'export default ($0, $1) => {\n    const rows = $0()([]);\n    const add = (row) => {\n        rows.set([row]);\n    };\n    const label = (row) => {\n        return row.label;\n    };\n    return (<div>\n        <span onclick={() => add({ id: 1, label: "one" })}>add</span>\n        <div>\n          <$1 each={rows.get()}>{(row) => <span>{label(row)}</span>}</$1>\n        </div>\n      </div>);\n};',
    '{"version":3,"file":"named-type-positions.test.jsx","sourceRoot":"","sources":["named-type-positions.test.tsx"],"names":[],"mappings":"eAiBY;IACR,MAAM,IAAI,GAAG,IAAM,CAAQ,EAAE,CAAC,CAAC;IAC/B,MAAM,GAAG,GAAG,CAAC,GAAQ,EAAE,EAAE;QACvB,IAAI,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC;IAClB,CAAC,CAAC;IACF,MAAM,KAAK,GAAG,CAAC,GAAQ,EAAE,EAAE;QACzB,OAAO,GAAG,CAAC,KAAK,CAAC;IACnB,CAAC,CAAC;IACF,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,GAAG,CAAC,EAAE,EAAE,EAAE,CAAC,EAAE,KAAK,EAAE,KAAK,EAAE,CAAC,CAAC,CAAC,GAAG,EAAE,IAAI,CAC5D;QAAA,CAAC,GAAG,CACF;UAAA,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,GAAQ,EAAE,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,GAAG,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC,EAAE,EAAG,CACvE;QAAA,EAAE,GAAG,CACP;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
  );
}
it("Rows", async (t) => {
  await snapshotCase(t, "Rows", _jsx(Rows, {}));
});
