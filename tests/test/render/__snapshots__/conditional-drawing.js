import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/web-testing";
import { snapshotCase } from "../snapshotCase.ts";
// A block whose drawing is a conditional, and a write that answers it.
//
// Two claims, because a fix that only meets one is worse than none: the
// component is built once, and what it draws changes. Stopping the rebuild by
// never running the block again would pass the first and leave the page on the
// branch it started with.
// A component whose whole drawing is a conditional on a cell of its own, which
// something writes once from outside the block.
//
// The fragment is what makes this work, and it is why a drawing answers with an
// element: a conditional standing at a block's root has nowhere to be watched,
// so `insert` reads it inside the computation it makes — and the write that
// answers the condition re-runs that computation, which is this component
// again, with a cell that has never been written and a timer that has never
// fired. Under `<>` the conditional is a child, and a child position owns a
// computation of its own.
//
// `builds` is the page's, so it survives a rebuild and counts them. It also
// ends one: once it stops saying yes, nothing is written and nothing runs
// again. Without that, this case does not stop.
async function Held({ again }) {
  return cs.create(
    { start: { line: 31, column: 9 }, end: { line: 41, column: 4 } },
    {
      fileHash: "zlju6cob2npz",
      splices: {
        $state: { value: state, params: [] },
        $window: { value: window, params: [] },
        $again: { value: again, params: [] },
      },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 31, column: 12 }, end: { line: 41, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 32, column: 4 },
            end: { line: 32, column: 32 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 32, column: 10 },
                end: { line: 32, column: 31 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 32, column: 10 },
                  end: { line: 32, column: 15 },
                },
                name: "shown",
                key: "shown$zlju6cob2npz$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 32, column: 18 },
                  end: { line: 32, column: 31 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 32, column: 18 },
                    end: { line: 32, column: 24 },
                  },
                  key: "$state",
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 32, column: 25 },
                      end: { line: 32, column: 30 },
                    },
                    value: false,
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
            start: { line: 34, column: 4 },
            end: { line: 38, column: 10 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 34, column: 10 },
                end: { line: 38, column: 9 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 34, column: 10 },
                  end: { line: 34, column: 17 },
                },
                name: "started",
                key: "started$zlju6cob2npz$1",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 34, column: 20 },
                  end: { line: 38, column: 9 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 34, column: 20 },
                    end: { line: 34, column: 38 },
                  },
                  object: {
                    type: "Splice",
                    loc: {
                      start: { line: 34, column: 20 },
                      end: { line: 34, column: 27 },
                    },
                    key: "$window",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 34, column: 28 },
                      end: { line: 34, column: 38 },
                    },
                    name: "setTimeout",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 34, column: 39 },
                      end: { line: 38, column: 5 },
                    },
                    params: [],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 34, column: 45 },
                        end: { line: 38, column: 5 },
                      },
                      body: [
                        {
                          type: "IfStatement",
                          loc: {
                            start: { line: 35, column: 6 },
                            end: { line: 37, column: 7 },
                          },
                          test: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 35, column: 10 },
                              end: { line: 35, column: 18 },
                            },
                            callee: {
                              type: "Splice",
                              loc: {
                                start: { line: 35, column: 10 },
                                end: { line: 35, column: 16 },
                              },
                              key: "$again",
                            },
                            arguments: [],
                            optional: false,
                          },
                          consequent: {
                            type: "BlockStatement",
                            loc: {
                              start: { line: 35, column: 20 },
                              end: { line: 37, column: 7 },
                            },
                            body: [
                              {
                                type: "ExpressionStatement",
                                loc: {
                                  start: { line: 36, column: 8 },
                                  end: { line: 36, column: 24 },
                                },
                                expression: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 36, column: 8 },
                                    end: { line: 36, column: 23 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 36, column: 8 },
                                      end: { line: 36, column: 17 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 36, column: 8 },
                                        end: { line: 36, column: 13 },
                                      },
                                      name: "shown",
                                      key: "shown$zlju6cob2npz$0",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 36, column: 14 },
                                        end: { line: 36, column: 17 },
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
                                        start: { line: 36, column: 18 },
                                        end: { line: 36, column: 22 },
                                      },
                                      value: true,
                                    },
                                  ],
                                  optional: false,
                                },
                              },
                            ],
                          },
                          alternate: null,
                        },
                      ],
                    },
                    expression: false,
                  },
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 38, column: 7 },
                      end: { line: 38, column: 8 },
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
          type: "ReturnStatement",
          loc: {
            start: { line: 40, column: 4 },
            end: { line: 40, column: 64 },
          },
          argument: {
            type: "JSXFragment",
            loc: {
              start: { line: 40, column: 11 },
              end: { line: 40, column: 63 },
            },
            openingFragment: {
              type: "JSXOpeningFragment",
              loc: {
                start: { line: 40, column: 11 },
                end: { line: 40, column: 13 },
              },
            },
            children: [
              {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 40, column: 13 },
                  end: { line: 40, column: 60 },
                },
                expression: {
                  type: "ConditionalExpression",
                  loc: {
                    start: { line: 40, column: 14 },
                    end: { line: 40, column: 59 },
                  },
                  test: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 40, column: 14 },
                      end: { line: 40, column: 25 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 40, column: 14 },
                        end: { line: 40, column: 23 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 40, column: 14 },
                          end: { line: 40, column: 19 },
                        },
                        name: "shown",
                        key: "shown$zlju6cob2npz$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 40, column: 20 },
                          end: { line: 40, column: 23 },
                        },
                        name: "get",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [],
                    optional: false,
                  },
                  consequent: {
                    type: "JSXElement",
                    loc: {
                      start: { line: 40, column: 28 },
                      end: { line: 40, column: 42 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 40, column: 28 },
                        end: { line: 40, column: 32 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 40, column: 29 },
                          end: { line: 40, column: 31 },
                        },
                        name: "em",
                      },
                      attributes: [],
                      selfClosing: false,
                    },
                    children: [
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 40, column: 32 },
                          end: { line: 40, column: 37 },
                        },
                        value: "shown",
                        raw: "shown",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 40, column: 37 },
                        end: { line: 40, column: 42 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 40, column: 39 },
                          end: { line: 40, column: 41 },
                        },
                        name: "em",
                      },
                    },
                  },
                  alternate: {
                    type: "JSXElement",
                    loc: {
                      start: { line: 40, column: 45 },
                      end: { line: 40, column: 59 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 40, column: 45 },
                        end: { line: 40, column: 48 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 40, column: 46 },
                          end: { line: 40, column: 47 },
                        },
                        name: "i",
                      },
                      attributes: [],
                      selfClosing: false,
                    },
                    children: [
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 40, column: 48 },
                          end: { line: 40, column: 55 },
                        },
                        value: "waiting",
                        raw: "waiting",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 40, column: 55 },
                        end: { line: 40, column: 59 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 40, column: 57 },
                          end: { line: 40, column: 58 },
                        },
                        name: "i",
                      },
                    },
                  },
                },
              },
            ],
            closingFragment: {
              type: "JSXClosingFragment",
              loc: {
                start: { line: 40, column: 60 },
                end: { line: 40, column: 63 },
              },
            },
          },
        },
      ],
    }),
    "($0, $1, $2) => {\n    const shown = $0()(false);\n    const started = $1().setTimeout(() => {\n        if ($2()()) {\n            shown.set(true);\n        }\n    }, 0);\n    return <>{shown.get() ? <em>shown</em> : <i>waiting</i>}</>;\n}",
    '{"version":3,"file":"conditional-drawing.test.jsx","sourceRoot":"","sources":["conditional-drawing.test.tsx"],"names":[],"mappings":"AA8BY;IACR,MAAM,KAAK,GAAG,IAAM,CAAC,KAAK,CAAC,CAAC;IAE5B,MAAM,OAAO,GAAG,IAAO,CAAC,UAAU,CAAC,GAAG,EAAE;QACtC,IAAI,IAAM,EAAE,EAAE,CAAC;YACb,KAAK,CAAC,GAAG,CAAC,IAAI,CAAC,CAAC;QAClB,CAAC;IACH,CAAC,EAAE,CAAC,CAAC,CAAC;IAEN,OAAO,EAAE,CAAC,KAAK,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,KAAK,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,OAAO,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC;AAC9D,CAAC,CAAA"}',
  );
}
const conditionalDrawing = cs.create(
  { start: { line: 44, column: 27 }, end: { line: 60, column: 2 } },
  {
    fileHash: "zlju6cob2npz",
    splices: {
      $state: { value: state, params: [] },
      $Held: { value: Held, params: [] },
    },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 44, column: 30 }, end: { line: 60, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 45, column: 2 }, end: { line: 45, column: 27 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 45, column: 8 },
              end: { line: 45, column: 26 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 45, column: 8 },
                end: { line: 45, column: 14 },
              },
              name: "builds",
              key: "builds$zlju6cob2npz$2",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 45, column: 17 },
                end: { line: 45, column: 26 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 45, column: 17 },
                  end: { line: 45, column: 23 },
                },
                key: "$state",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 45, column: 24 },
                    end: { line: 45, column: 25 },
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
        type: "ReturnStatement",
        loc: { start: { line: 47, column: 2 }, end: { line: 59, column: 4 } },
        argument: {
          type: "JSXElement",
          loc: {
            start: { line: 48, column: 4 },
            end: { line: 58, column: 10 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 48, column: 4 },
              end: { line: 48, column: 9 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 48, column: 5 },
                end: { line: 48, column: 8 },
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
                start: { line: 49, column: 6 },
                end: { line: 49, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 49, column: 6 },
                end: { line: 49, column: 45 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 49, column: 6 },
                  end: { line: 49, column: 12 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 49, column: 7 },
                    end: { line: 49, column: 11 },
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
                    start: { line: 49, column: 12 },
                    end: { line: 49, column: 38 },
                  },
                  expression: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 49, column: 13 },
                      end: { line: 49, column: 37 },
                    },
                    operator: "+",
                    left: {
                      type: "Literal",
                      loc: {
                        start: { line: 49, column: 13 },
                        end: { line: 49, column: 22 },
                      },
                      value: "builds ",
                    },
                    right: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 49, column: 25 },
                        end: { line: 49, column: 37 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 49, column: 25 },
                          end: { line: 49, column: 35 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 49, column: 25 },
                            end: { line: 49, column: 31 },
                          },
                          name: "builds",
                          key: "builds$zlju6cob2npz$2",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 49, column: 32 },
                            end: { line: 49, column: 35 },
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
                  start: { line: 49, column: 38 },
                  end: { line: 49, column: 45 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 49, column: 40 },
                    end: { line: 49, column: 44 },
                  },
                  name: "span",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 50, column: 6 },
                end: { line: 50, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 50, column: 6 },
                end: { line: 57, column: 16 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 50, column: 6 },
                  end: { line: 50, column: 15 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 50, column: 7 },
                    end: { line: 50, column: 14 },
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
                    start: { line: 51, column: 8 },
                    end: { line: 51, column: 8 },
                  },
                  value: "\n        ",
                  raw: "\n        ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 51, column: 8 },
                    end: { line: 56, column: 10 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 51, column: 8 },
                      end: { line: 56, column: 10 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 51, column: 9 },
                        end: { line: 51, column: 13 },
                      },
                      name: "Held",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 52, column: 10 },
                          end: { line: 55, column: 12 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 52, column: 10 },
                            end: { line: 52, column: 15 },
                          },
                          name: "again",
                        },
                        value: {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 52, column: 16 },
                            end: { line: 55, column: 12 },
                          },
                          expression: {
                            type: "ArrowFunctionExpression",
                            loc: {
                              start: { line: 52, column: 17 },
                              end: { line: 55, column: 11 },
                            },
                            params: [],
                            body: {
                              type: "BlockStatement",
                              loc: {
                                start: { line: 52, column: 23 },
                                end: { line: 55, column: 11 },
                              },
                              body: [
                                {
                                  type: "ExpressionStatement",
                                  loc: {
                                    start: { line: 53, column: 12 },
                                    end: { line: 53, column: 41 },
                                  },
                                  expression: {
                                    type: "CallExpression",
                                    loc: {
                                      start: { line: 53, column: 12 },
                                      end: { line: 53, column: 40 },
                                    },
                                    callee: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 53, column: 12 },
                                        end: { line: 53, column: 22 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 53, column: 12 },
                                          end: { line: 53, column: 18 },
                                        },
                                        name: "builds",
                                        key: "builds$zlju6cob2npz$2",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 53, column: 19 },
                                          end: { line: 53, column: 22 },
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
                                          start: { line: 53, column: 23 },
                                          end: { line: 53, column: 39 },
                                        },
                                        operator: "+",
                                        left: {
                                          type: "CallExpression",
                                          loc: {
                                            start: { line: 53, column: 23 },
                                            end: { line: 53, column: 35 },
                                          },
                                          callee: {
                                            type: "MemberExpression",
                                            loc: {
                                              start: { line: 53, column: 23 },
                                              end: { line: 53, column: 33 },
                                            },
                                            object: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 53, column: 23 },
                                                end: { line: 53, column: 29 },
                                              },
                                              name: "builds",
                                              key: "builds$zlju6cob2npz$2",
                                            },
                                            property: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 53, column: 30 },
                                                end: { line: 53, column: 33 },
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
                                            start: { line: 53, column: 38 },
                                            end: { line: 53, column: 39 },
                                          },
                                          value: 1,
                                        },
                                      },
                                    ],
                                    optional: false,
                                  },
                                },
                                {
                                  type: "ReturnStatement",
                                  loc: {
                                    start: { line: 54, column: 12 },
                                    end: { line: 54, column: 36 },
                                  },
                                  argument: {
                                    type: "BinaryExpression",
                                    loc: {
                                      start: { line: 54, column: 19 },
                                      end: { line: 54, column: 35 },
                                    },
                                    operator: "<",
                                    left: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 54, column: 19 },
                                        end: { line: 54, column: 31 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 54, column: 19 },
                                          end: { line: 54, column: 29 },
                                        },
                                        object: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 54, column: 19 },
                                            end: { line: 54, column: 25 },
                                          },
                                          name: "builds",
                                          key: "builds$zlju6cob2npz$2",
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 54, column: 26 },
                                            end: { line: 54, column: 29 },
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
                                        start: { line: 54, column: 34 },
                                        end: { line: 54, column: 35 },
                                      },
                                      value: 5,
                                    },
                                  },
                                },
                              ],
                            },
                            expression: false,
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
                    start: { line: 57, column: 6 },
                    end: { line: 57, column: 6 },
                  },
                  value: "\n      ",
                  raw: "\n      ",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 57, column: 6 },
                  end: { line: 57, column: 16 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 57, column: 8 },
                    end: { line: 57, column: 15 },
                  },
                  name: "section",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 58, column: 4 },
                end: { line: 58, column: 4 },
              },
              value: "\n    ",
              raw: "\n    ",
            },
          ],
          closingElement: {
            type: "JSXClosingElement",
            loc: {
              start: { line: 58, column: 4 },
              end: { line: 58, column: 10 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 58, column: 6 },
                end: { line: 58, column: 9 },
              },
              name: "div",
            },
          },
        },
      },
    ],
  }),
  '($0, $1) => {\n    const builds = $0()(0);\n    return (<div>\n      <span>{"builds " + builds.get()}</span>\n      <section>\n        <$1 again={() => {\n            builds.set(builds.get() + 1);\n            return builds.get() < 5;\n        }}/>\n      </section>\n    </div>);\n}',
  '{"version":3,"file":"conditional-drawing.test.jsx","sourceRoot":"","sources":["conditional-drawing.test.tsx"],"names":[],"mappings":"AA2C8B;IAC5B,MAAM,MAAM,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IAEzB,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,IAAI,CAAC,CAAC,SAAS,GAAG,MAAM,CAAC,GAAG,EAAE,CAAC,EAAE,IAAI,CACtC;MAAA,CAAC,OAAO,CACN;QAAA,CAAC,EAAI,CACH,KAAK,CAAC,CAAC,GAAG,EAAE;YACV,MAAM,CAAC,GAAG,CAAC,MAAM,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC;YAC7B,OAAO,MAAM,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC;QAC1B,CAAC,CAAC,EAEN;MAAA,EAAE,OAAO,CACX;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC,CAAA"}',
);
describe("a component whose drawing is a conditional", () => {
  it("is built once, and draws the branch the write chose", async () => {
    await render(conditionalDrawing);
    // Nothing has answered the condition yet: the count is of blocks that have
    // reached their timer, and the first has not.
    assert.ok(screen.getByText("builds 0"));
    assert.ok(screen.getByText("waiting"));
    // Long enough for the timer the component set, and for a component built
    // again to have set another.
    await new Promise((settle) => setTimeout(settle, 100));
    assert.ok(
      screen.queryByText("builds 1"),
      "the component was built again for what it drew",
    );
    assert.ok(
      screen.queryByText("shown"),
      "the conditional did not draw the branch the write chose",
    );
    assert.equal(screen.queryByText("waiting"), null);
  });
});
describe("what each case compiles and bundles to", () => {
  it("conditionalDrawing", async (t) => {
    await snapshotCase(t, "conditionalDrawing", conditionalDrawing);
  });
});
