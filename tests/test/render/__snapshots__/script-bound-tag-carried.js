import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A host component whose script declares its own `Badge`, and draws what it was
// handed beside it.
async function Panel(props) {
  return cs.create(
    "2nh9ihk3oddge:12:9",
    { splices: { $props: { value: props, params: [] } }, captures: [] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 12, column: 12 }, end: { line: 20, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 13, column: 4 },
            end: { line: 13, column: 64 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 13, column: 10 },
                end: { line: 13, column: 63 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 13, column: 10 },
                  end: { line: 13, column: 15 },
                },
                name: "Badge",
                key: "Badge$2nh9ihk3oddge$0",
              },
              init: {
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 13, column: 18 },
                  end: { line: 13, column: 63 },
                },
                params: [
                  {
                    type: "Identifier",
                    loc: {
                      start: { line: 13, column: 19 },
                      end: { line: 13, column: 20 },
                    },
                    name: "p",
                    key: "p$2nh9ihk3oddge$1",
                  },
                ],
                body: {
                  type: "JSXElement",
                  loc: {
                    start: { line: 13, column: 40 },
                    end: { line: 13, column: 63 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 13, column: 40 },
                      end: { line: 13, column: 43 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 13, column: 41 },
                        end: { line: 13, column: 42 },
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
                        start: { line: 13, column: 43 },
                        end: { line: 13, column: 59 },
                      },
                      expression: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 13, column: 44 },
                          end: { line: 13, column: 58 },
                        },
                        operator: "+",
                        left: {
                          type: "Literal",
                          loc: {
                            start: { line: 13, column: 44 },
                            end: { line: 13, column: 52 },
                          },
                          value: "panel ",
                        },
                        right: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 13, column: 55 },
                            end: { line: 13, column: 58 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 13, column: 55 },
                              end: { line: 13, column: 56 },
                            },
                            name: "p",
                            key: "p$2nh9ihk3oddge$1",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 13, column: 57 },
                              end: { line: 13, column: 58 },
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
                      start: { line: 13, column: 59 },
                      end: { line: 13, column: 63 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 13, column: 61 },
                        end: { line: 13, column: 62 },
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
          loc: { start: { line: 14, column: 4 }, end: { line: 19, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 18, column: 16 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 15, column: 6 },
                end: { line: 15, column: 15 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 15, column: 7 },
                  end: { line: 15, column: 14 },
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
                  start: { line: 16, column: 8 },
                  end: { line: 16, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 16, column: 8 },
                  end: { line: 16, column: 23 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 16, column: 8 },
                    end: { line: 16, column: 23 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 16, column: 9 },
                      end: { line: 16, column: 14 },
                    },
                    name: "Badge",
                    key: "Badge$2nh9ihk3oddge$0",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 16, column: 15 },
                        end: { line: 16, column: 20 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 16, column: 15 },
                          end: { line: 16, column: 16 },
                        },
                        name: "n",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 16, column: 17 },
                          end: { line: 16, column: 20 },
                        },
                        expression: {
                          type: "Literal",
                          loc: {
                            start: { line: 16, column: 18 },
                            end: { line: 16, column: 19 },
                          },
                          value: 0,
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
                  start: { line: 17, column: 8 },
                  end: { line: 17, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 17, column: 8 },
                  end: { line: 17, column: 21 },
                },
                expression: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 17, column: 9 },
                    end: { line: 17, column: 20 },
                  },
                  object: {
                    type: "Splice",
                    loc: {
                      start: { line: 17, column: 9 },
                      end: { line: 17, column: 15 },
                    },
                    key: "$props",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 16 },
                      end: { line: 17, column: 20 },
                    },
                    name: "body",
                  },
                  computed: false,
                  optional: false,
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 18, column: 6 },
                  end: { line: 18, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 18, column: 16 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 18, column: 8 },
                  end: { line: 18, column: 15 },
                },
                name: "section",
              },
            },
          },
        },
      ],
    }),
    '$0 => {\n    const Badge = (p) => <i>{"panel " + p.n}</i>;\n    return (<section>\n        <Badge n={0}/>\n        {$0().body}\n      </section>);\n}',
    '{"version":3,"file":"script-bound-tag-carried.test.jsx","sourceRoot":"","sources":["script-bound-tag-carried.test.tsx"],"names":[],"mappings":"AAWY;IACR,MAAM,KAAK,GAAG,CAAC,CAAgB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,GAAG,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IAC5D,OAAO,CACL,CAAC,OAAO,CACN;QAAA,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EACZ;QAAA,CAAC,IAAM,CAAC,IAAI,CACd;MAAA,EAAE,OAAO,CAAC,CACX,CAAC;AACJ,CAAC,CAAA"}',
  );
}
// A script handed to `Panel` as a prop, naming a function the script around it
// holds. It lands inside `Panel`'s script, whose own `Badge` is in scope there
// — and still calls the one it was written under, since that is the binding it
// carries. The tag holds children too, read through the same record.
const scriptBoundTagCarried = cs.create(
  "2nh9ihk3oddge:27:30",
  {
    splices: {
      $state: { value: state, params: [] },
      $0splice0: {
        value: cs.create(
          "2nh9ihk3oddge:40:12",
          {
            splices: {},
            captures: ["Badge$2nh9ihk3oddge$3", "count$2nh9ihk3oddge$2"],
          },
          () => ({
            type: "JSXElement",
            loc: {
              start: { line: 40, column: 15 },
              end: { line: 42, column: 18 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 40, column: 15 },
                end: { line: 40, column: 38 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 40, column: 16 },
                  end: { line: 40, column: 21 },
                },
                name: "Badge",
                key: "Badge$2nh9ihk3oddge$3",
              },
              attributes: [
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 40, column: 22 },
                    end: { line: 40, column: 37 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 40, column: 22 },
                      end: { line: 40, column: 23 },
                    },
                    name: "n",
                  },
                  value: {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 40, column: 24 },
                      end: { line: 40, column: 37 },
                    },
                    expression: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 40, column: 25 },
                        end: { line: 40, column: 36 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 40, column: 25 },
                          end: { line: 40, column: 34 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 40, column: 25 },
                            end: { line: 40, column: 30 },
                          },
                          name: "count",
                          key: "count$2nh9ihk3oddge$2",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 40, column: 31 },
                            end: { line: 40, column: 34 },
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
                  start: { line: 41, column: 12 },
                  end: { line: 41, column: 12 },
                },
                value: "\n            ",
                raw: "\n            ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 41, column: 12 },
                  end: { line: 41, column: 41 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 41, column: 12 },
                    end: { line: 41, column: 15 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 41, column: 13 },
                      end: { line: 41, column: 14 },
                    },
                    name: "u",
                  },
                  attributes: [],
                  selfClosing: false,
                },
                children: [
                  {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 41, column: 15 },
                      end: { line: 41, column: 37 },
                    },
                    expression: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 41, column: 16 },
                        end: { line: 41, column: 36 },
                      },
                      operator: "+",
                      left: {
                        type: "Literal",
                        loc: {
                          start: { line: 41, column: 16 },
                          end: { line: 41, column: 22 },
                        },
                        value: "kid ",
                      },
                      right: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 41, column: 25 },
                          end: { line: 41, column: 36 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 41, column: 25 },
                            end: { line: 41, column: 34 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 41, column: 25 },
                              end: { line: 41, column: 30 },
                            },
                            name: "count",
                            key: "count$2nh9ihk3oddge$2",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 41, column: 31 },
                              end: { line: 41, column: 34 },
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
                    start: { line: 41, column: 37 },
                    end: { line: 41, column: 41 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 41, column: 39 },
                      end: { line: 41, column: 40 },
                    },
                    name: "u",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 42, column: 10 },
                  end: { line: 42, column: 10 },
                },
                value: "\n          ",
                raw: "\n          ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 42, column: 10 },
                end: { line: 42, column: 18 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 42, column: 12 },
                  end: { line: 42, column: 17 },
                },
                name: "Badge",
                key: "Badge$2nh9ihk3oddge$3",
              },
            },
          }),
          '($0, $1) => <$0 n={$1.get()}>\n            <u>{"kid " + $1.get()}</u>\n          </$0>',
          '{"version":3,"file":"script-bound-tag-carried.test.jsx","sourceRoot":"","sources":["script-bound-tag-carried.test.tsx"],"names":[],"mappings":"AAuCe,YAAA,CAAC,EAAK,CAAC,CAAC,CAAC,CAAC,EAAK,CAAC,GAAG,EAAE,CAAC,CACzB;YAAA,CAAC,CAAC,CAAC,CAAC,MAAM,GAAG,EAAK,CAAC,GAAG,EAAE,CAAC,EAAE,CAAC,CAC9B;UAAA,EAAE,EAAK,CAAC,CAAA"}',
        ),
        params: ["count$2nh9ihk3oddge$2", "Badge$2nh9ihk3oddge$3"],
      },
      $Panel: { value: Panel, params: [] },
    },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 27, column: 33 }, end: { line: 48, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 28, column: 2 }, end: { line: 28, column: 26 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 28, column: 8 },
              end: { line: 28, column: 25 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 28, column: 8 },
                end: { line: 28, column: 13 },
              },
              name: "count",
              key: "count$2nh9ihk3oddge$2",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 28, column: 16 },
                end: { line: 28, column: 25 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 28, column: 16 },
                  end: { line: 28, column: 22 },
                },
                key: "$state",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 23 },
                    end: { line: 28, column: 24 },
                  },
                  value: 0,
                },
              ],
              optional: false,
            },
          },
        ],
      },
      {
        type: "VariableDeclaration",
        loc: { start: { line: 29, column: 2 }, end: { line: 34, column: 4 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 29, column: 8 },
              end: { line: 34, column: 3 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 29, column: 8 },
                end: { line: 29, column: 13 },
              },
              name: "Badge",
              key: "Badge$2nh9ihk3oddge$3",
            },
            init: {
              type: "ArrowFunctionExpression",
              loc: {
                start: { line: 29, column: 16 },
                end: { line: 34, column: 3 },
              },
              params: [
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 29, column: 17 },
                    end: { line: 29, column: 18 },
                  },
                  name: "p",
                  key: "p$2nh9ihk3oddge$4",
                },
              ],
              body: {
                type: "JSXElement",
                loc: {
                  start: { line: 30, column: 4 },
                  end: { line: 33, column: 8 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 30, column: 4 },
                    end: { line: 30, column: 7 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 30, column: 5 },
                      end: { line: 30, column: 6 },
                    },
                    name: "b",
                  },
                  attributes: [],
                  selfClosing: false,
                },
                children: [
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 31, column: 6 },
                      end: { line: 31, column: 6 },
                    },
                    value: "\n      ",
                    raw: "\n      ",
                  },
                  {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 31, column: 6 },
                      end: { line: 31, column: 22 },
                    },
                    expression: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 31, column: 7 },
                        end: { line: 31, column: 21 },
                      },
                      operator: "+",
                      left: {
                        type: "Literal",
                        loc: {
                          start: { line: 31, column: 7 },
                          end: { line: 31, column: 15 },
                        },
                        value: "outer ",
                      },
                      right: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 31, column: 18 },
                          end: { line: 31, column: 21 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 31, column: 18 },
                            end: { line: 31, column: 19 },
                          },
                          name: "p",
                          key: "p$2nh9ihk3oddge$4",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 31, column: 20 },
                            end: { line: 31, column: 21 },
                          },
                          name: "n",
                        },
                        computed: false,
                        optional: false,
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
                  {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 32, column: 6 },
                      end: { line: 32, column: 18 },
                    },
                    expression: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 32, column: 7 },
                        end: { line: 32, column: 17 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 32, column: 7 },
                          end: { line: 32, column: 8 },
                        },
                        name: "p",
                        key: "p$2nh9ihk3oddge$4",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 32, column: 9 },
                          end: { line: 32, column: 17 },
                        },
                        name: "children",
                      },
                      computed: false,
                      optional: false,
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 33, column: 4 },
                      end: { line: 33, column: 4 },
                    },
                    value: "\n    ",
                    raw: "\n    ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 33, column: 4 },
                    end: { line: 33, column: 8 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 33, column: 6 },
                      end: { line: 33, column: 7 },
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
        loc: { start: { line: 36, column: 2 }, end: { line: 47, column: 4 } },
        argument: {
          type: "JSXElement",
          loc: {
            start: { line: 37, column: 4 },
            end: { line: 46, column: 10 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 37, column: 4 },
              end: { line: 37, column: 9 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 37, column: 5 },
                end: { line: 37, column: 8 },
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
                start: { line: 38, column: 6 },
                end: { line: 38, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 38, column: 6 },
                end: { line: 44, column: 8 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 38, column: 6 },
                  end: { line: 44, column: 8 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 38, column: 7 },
                    end: { line: 38, column: 12 },
                  },
                  name: "Panel",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 39, column: 8 },
                      end: { line: 43, column: 9 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 39, column: 8 },
                        end: { line: 39, column: 12 },
                      },
                      name: "body",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 39, column: 13 },
                        end: { line: 43, column: 9 },
                      },
                      expression: {
                        type: "Splice",
                        loc: {
                          start: { line: 40, column: 10 },
                          end: { line: 42, column: 20 },
                        },
                        key: "$0splice0",
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
                start: { line: 45, column: 6 },
                end: { line: 45, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 45, column: 6 },
                end: { line: 45, column: 70 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 45, column: 6 },
                  end: { line: 45, column: 57 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 45, column: 7 },
                    end: { line: 45, column: 13 },
                  },
                  name: "button",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 45, column: 14 },
                      end: { line: 45, column: 56 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 45, column: 14 },
                        end: { line: 45, column: 21 },
                      },
                      name: "onclick",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 45, column: 22 },
                        end: { line: 45, column: 56 },
                      },
                      expression: {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 45, column: 23 },
                          end: { line: 45, column: 55 },
                        },
                        params: [],
                        body: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 45, column: 29 },
                            end: { line: 45, column: 55 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 45, column: 29 },
                              end: { line: 45, column: 38 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 45, column: 29 },
                                end: { line: 45, column: 34 },
                              },
                              name: "count",
                              key: "count$2nh9ihk3oddge$2",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 45, column: 35 },
                                end: { line: 45, column: 38 },
                              },
                              name: "set",
                            },
                            computed: false,
                            optional: false,
                          },
                          arguments: [
                            {
                              type: "BinaryExpression",
                              loc: {
                                start: { line: 45, column: 39 },
                                end: { line: 45, column: 54 },
                              },
                              operator: "+",
                              left: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 45, column: 39 },
                                  end: { line: 45, column: 50 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 45, column: 39 },
                                    end: { line: 45, column: 48 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 45, column: 39 },
                                      end: { line: 45, column: 44 },
                                    },
                                    name: "count",
                                    key: "count$2nh9ihk3oddge$2",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 45, column: 45 },
                                      end: { line: 45, column: 48 },
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
                                  start: { line: 45, column: 53 },
                                  end: { line: 45, column: 54 },
                                },
                                value: 1,
                              },
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
                    start: { line: 45, column: 57 },
                    end: { line: 45, column: 61 },
                  },
                  value: "more",
                  raw: "more",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 45, column: 61 },
                  end: { line: 45, column: 70 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 45, column: 63 },
                    end: { line: 45, column: 69 },
                  },
                  name: "button",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 46, column: 4 },
                end: { line: 46, column: 4 },
              },
              value: "\n    ",
              raw: "\n    ",
            },
          ],
          closingElement: {
            type: "JSXClosingElement",
            loc: {
              start: { line: 46, column: 4 },
              end: { line: 46, column: 10 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 46, column: 6 },
                end: { line: 46, column: 9 },
              },
              name: "div",
            },
          },
        },
      },
    ],
  }),
  '($0, $1, $2) => {\n    const count = $0()(0);\n    const Badge = (p) => (<b>\n      {"outer " + p.n}\n      {p.children}\n    </b>);\n    return (<div>\n      <$2 body={$1(count, Badge)}/>\n      <button onclick={() => count.set(count.get() + 1)}>more</button>\n    </div>);\n}',
  '{"version":3,"file":"script-bound-tag-carried.test.jsx","sourceRoot":"","sources":["script-bound-tag-carried.test.tsx"],"names":[],"mappings":"AA0BiC;IAC/B,MAAM,KAAK,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACxB,MAAM,KAAK,GAAG,CAAC,CAA2C,EAAE,EAAE,CAAC,CAC7D,CAAC,CAAC,CACA;MAAA,CAAC,QAAQ,GAAG,CAAC,CAAC,CAAC,CACf;MAAA,CAAC,CAAC,CAAC,QAAQ,CACb;IAAA,EAAE,CAAC,CAAC,CACL,CAAC;IAEF,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,EAAK,CACJ,IAAI,CAAC,CACH,gBAGF,CAAC,EAEH;MAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CACjE;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC,CAAA"}',
);
it("scriptBoundTagCarried", async (t) => {
  await snapshotCase(t, "scriptBoundTagCarried", scriptBoundTagCarried);
});
describe("a tag naming a function the script holds", () => {
  it("calls the one it was written under, drawn where another is in scope", async () => {
    await render(scriptBoundTagCarried);
    const panel = screen.getByText("panel 0");
    const badge = screen.getByText("outer 0");
    assert.equal(badge.tagName.toLowerCase(), "b");
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(screen.getByText("outer 1"), badge, "the same <b>");
    assert.ok(screen.getByText("kid 1"));
    assert.equal(
      screen.getByText("panel 0"),
      panel,
      "the panel's own, untouched",
    );
  });
});
