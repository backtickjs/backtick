import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { render, screen } from "@backtickjs/web-testing";
import { settled } from "../render/dom.ts";
import { snapshotCase } from "../snapshotCase.ts";
// A component is built once, however what it drew changes afterwards.
//
// `insert` reads what it was given inside the computation it makes, so a member
// that answers with a way of asking used to tie the two together: what it drew
// changing ran the expression that made it, which was the component again —
// with new cells, and whatever it did on the way in done over.
//
// Two of them answer that way: a bundle drawn where it stands, which is this
// file, and a list, which `render/for-builds-once.test.tsx` covers. The list is
// the one that says where the fault was — a drawn bundle is not special, so
// neither is the fix.
//
// Driven rather than snapshotted, because what is wrong is not what was drawn
// but how many times it was: a drawing that settles and one that never does
// look the same in a snapshot of either.
// A component that draws a bundle it is still waiting for.
//
// What this pins is that it is built once. `insert` reads what it was given
// inside the computation it makes, so a drawing that watches itself used to tie
// the two together: the answer arriving changed the drawing, which ran the
// expression that made it, which was this component again — new cells, and the
// wait started over.
//
// The condition stands under `<>`, where a child position watches it: at the
// block's root it would be read once, when the block ran.
//
// `asked` is the page's, so it survives a rebuild and counts them. It also ends
// one: once it stops answering, a write of `null` over `null` changes nothing
// and nothing runs again — a loop that would otherwise have no end.
async function Answer() {
  return cs.create(
    "2f6ulv1ojihe6:42:9",
    { params: [] },
    () => ({
      type: "JSXElement",
      loc: { start: { line: 42, column: 12 }, end: { line: 42, column: 33 } },
      openingElement: {
        type: "JSXOpeningElement",
        loc: { start: { line: 42, column: 12 }, end: { line: 42, column: 16 } },
        name: {
          type: "JSXIdentifier",
          loc: {
            start: { line: 42, column: 13 },
            end: { line: 42, column: 15 },
          },
          name: "em",
        },
        attributes: [],
        selfClosing: false,
      },
      children: [
        {
          type: "JSXExpressionContainer",
          loc: {
            start: { line: 42, column: 16 },
            end: { line: 42, column: 28 },
          },
          expression: {
            type: "Literal",
            loc: {
              start: { line: 42, column: 17 },
              end: { line: 42, column: 27 },
            },
            value: "answered",
          },
        },
      ],
      closingElement: {
        type: "JSXClosingElement",
        loc: { start: { line: 42, column: 28 }, end: { line: 42, column: 33 } },
        name: {
          type: "JSXIdentifier",
          loc: {
            start: { line: 42, column: 30 },
            end: { line: 42, column: 32 },
          },
          name: "em",
        },
      },
    }),
    {
      code: 'export default () => <em>{"answered"}</em>;',
      map: '{"version":3,"file":"eval-builds-once.test.jsx","sourceRoot":"","sources":["eval-builds-once.test.tsx"],"names":[],"mappings":"eAyCY,MAAA,CAAC,EAAE,CAAC,CAAC,UAAU,CAAC,EAAE,EAAE,CAAC"}',
    },
  );
}
const answer = await bundler.run(_jsx(Answer, {}));
async function Waiting({ ask }) {
  return cs.create(
    "2f6ulv1ojihe6:52:9",
    {
      params: [
        { kind: "splice", value: state, bindings: [] },
        { kind: "splice", value: window, bindings: [] },
        { kind: "splice", value: ask, bindings: [] },
      ],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 52, column: 12 }, end: { line: 62, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 53, column: 4 },
            end: { line: 53, column: 63 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 53, column: 10 },
                end: { line: 53, column: 62 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 53, column: 10 },
                  end: { line: 53, column: 15 },
                },
                name: "drawn",
                key: "drawn$2f6ulv1ojihe6$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 53, column: 18 },
                  end: { line: 53, column: 62 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 53, column: 18 },
                    end: { line: 53, column: 24 },
                  },
                  param: 0,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 53, column: 57 },
                      end: { line: 53, column: 61 },
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
          type: "VariableDeclaration",
          loc: {
            start: { line: 54, column: 4 },
            end: { line: 54, column: 67 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 54, column: 10 },
                end: { line: 54, column: 66 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 54, column: 10 },
                  end: { line: 54, column: 17 },
                },
                name: "started",
                key: "started$2f6ulv1ojihe6$1",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 54, column: 20 },
                  end: { line: 54, column: 66 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 54, column: 20 },
                    end: { line: 54, column: 38 },
                  },
                  object: {
                    type: "Splice",
                    loc: {
                      start: { line: 54, column: 20 },
                      end: { line: 54, column: 27 },
                    },
                    param: 1,
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 54, column: 28 },
                      end: { line: 54, column: 38 },
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
                      start: { line: 54, column: 39 },
                      end: { line: 54, column: 62 },
                    },
                    params: [],
                    body: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 54, column: 45 },
                        end: { line: 54, column: 62 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 54, column: 45 },
                          end: { line: 54, column: 54 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 54, column: 45 },
                            end: { line: 54, column: 50 },
                          },
                          name: "drawn",
                          key: "drawn$2f6ulv1ojihe6$0",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 54, column: 51 },
                            end: { line: 54, column: 54 },
                          },
                          name: "set",
                        },
                        computed: false,
                        optional: false,
                      },
                      arguments: [
                        {
                          type: "CallExpression",
                          loc: {
                            start: { line: 54, column: 55 },
                            end: { line: 54, column: 61 },
                          },
                          callee: {
                            type: "Splice",
                            loc: {
                              start: { line: 54, column: 55 },
                              end: { line: 54, column: 59 },
                            },
                            param: 2,
                          },
                          arguments: [],
                          optional: false,
                        },
                      ],
                      optional: false,
                    },
                    expression: true,
                  },
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 54, column: 64 },
                      end: { line: 54, column: 65 },
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
          loc: { start: { line: 55, column: 4 }, end: { line: 61, column: 6 } },
          argument: {
            type: "JSXFragment",
            loc: {
              start: { line: 56, column: 6 },
              end: { line: 60, column: 9 },
            },
            openingFragment: {
              type: "JSXOpeningFragment",
              loc: {
                start: { line: 56, column: 6 },
                end: { line: 56, column: 8 },
              },
            },
            children: [
              {
                type: "JSXText",
                loc: {
                  start: { line: 57, column: 8 },
                  end: { line: 57, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 57, column: 8 },
                  end: { line: 59, column: 57 },
                },
                expression: {
                  type: "ConditionalExpression",
                  loc: {
                    start: { line: 57, column: 9 },
                    end: { line: 59, column: 56 },
                  },
                  test: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 57, column: 9 },
                      end: { line: 57, column: 29 },
                    },
                    operator: "===",
                    left: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 57, column: 9 },
                        end: { line: 57, column: 20 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 57, column: 9 },
                          end: { line: 57, column: 18 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 57, column: 9 },
                            end: { line: 57, column: 14 },
                          },
                          name: "drawn",
                          key: "drawn$2f6ulv1ojihe6$0",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 57, column: 15 },
                            end: { line: 57, column: 18 },
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
                        start: { line: 57, column: 25 },
                        end: { line: 57, column: 29 },
                      },
                      value: null,
                    },
                  },
                  consequent: {
                    type: "Literal",
                    loc: {
                      start: { line: 58, column: 12 },
                      end: { line: 58, column: 16 },
                    },
                    value: null,
                  },
                  alternate: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 59, column: 12 },
                      end: { line: 59, column: 56 },
                    },
                    callee: {
                      type: "Identifier",
                      loc: {
                        start: { line: 59, column: 12 },
                        end: { line: 59, column: 16 },
                      },
                      name: "eval",
                    },
                    arguments: [
                      {
                        type: "CallExpression",
                        loc: {
                          start: { line: 59, column: 17 },
                          end: { line: 59, column: 28 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 59, column: 17 },
                            end: { line: 59, column: 26 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 59, column: 17 },
                              end: { line: 59, column: 22 },
                            },
                            name: "drawn",
                            key: "drawn$2f6ulv1ojihe6$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 59, column: 23 },
                              end: { line: 59, column: 26 },
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
                  start: { line: 60, column: 6 },
                  end: { line: 60, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingFragment: {
              type: "JSXClosingFragment",
              loc: {
                start: { line: 60, column: 6 },
                end: { line: 60, column: 9 },
              },
            },
          },
        },
      ],
    }),
    {
      code: "export default ($0, $1, $2) => {\n    const drawn = $0()(null);\n    const started = $1().setTimeout(() => drawn.set($2()()), 0);\n    return (<>\n        {drawn.get() === null\n            ? null\n            : eval(drawn.get())}\n      </>);\n};",
      map: '{"version":3,"file":"eval-builds-once.test.jsx","sourceRoot":"","sources":["eval-builds-once.test.tsx"],"names":[],"mappings":"eAmDY;IACR,MAAM,KAAK,GAAG,IAAM,CAAiC,IAAI,CAAC,CAAC;IAC3D,MAAM,OAAO,GAAG,IAAO,CAAC,UAAU,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,IAAI,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IAC/D,OAAO,CACL,EACE;QAAA,CAAC,KAAK,CAAC,GAAG,EAAE,KAAK,IAAI;YACnB,CAAC,CAAC,IAAI;YACN,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,GAAG,EAA6B,CAAC,CAClD;MAAA,GAAG,CACJ,CAAC;AACJ,CAAC"}',
    },
  );
}
const evalBuildsOnce = cs.create(
  "2f6ulv1ojihe6:65:23",
  {
    params: [
      { kind: "splice", value: state, bindings: [] },
      { kind: "splice", value: answer, bindings: [] },
      { kind: "tag", value: Waiting },
    ],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 65, column: 26 }, end: { line: 79, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 66, column: 2 }, end: { line: 66, column: 26 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 66, column: 8 },
              end: { line: 66, column: 25 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 66, column: 8 },
                end: { line: 66, column: 13 },
              },
              name: "asked",
              key: "asked$2f6ulv1ojihe6$2",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 66, column: 16 },
                end: { line: 66, column: 25 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 66, column: 16 },
                  end: { line: 66, column: 22 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 66, column: 23 },
                    end: { line: 66, column: 24 },
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
        loc: { start: { line: 68, column: 2 }, end: { line: 78, column: 4 } },
        argument: {
          type: "JSXElement",
          loc: {
            start: { line: 69, column: 4 },
            end: { line: 77, column: 10 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 69, column: 4 },
              end: { line: 69, column: 9 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 69, column: 5 },
                end: { line: 69, column: 8 },
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
                start: { line: 70, column: 6 },
                end: { line: 70, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 70, column: 6 },
                end: { line: 70, column: 43 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 70, column: 6 },
                  end: { line: 70, column: 12 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 70, column: 7 },
                    end: { line: 70, column: 11 },
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
                    start: { line: 70, column: 12 },
                    end: { line: 70, column: 36 },
                  },
                  expression: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 70, column: 13 },
                      end: { line: 70, column: 35 },
                    },
                    operator: "+",
                    left: {
                      type: "Literal",
                      loc: {
                        start: { line: 70, column: 13 },
                        end: { line: 70, column: 21 },
                      },
                      value: "asked ",
                    },
                    right: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 70, column: 24 },
                        end: { line: 70, column: 35 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 70, column: 24 },
                          end: { line: 70, column: 33 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 70, column: 24 },
                            end: { line: 70, column: 29 },
                          },
                          name: "asked",
                          key: "asked$2f6ulv1ojihe6$2",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 70, column: 30 },
                            end: { line: 70, column: 33 },
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
                  start: { line: 70, column: 36 },
                  end: { line: 70, column: 43 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 70, column: 38 },
                    end: { line: 70, column: 42 },
                  },
                  name: "span",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 71, column: 6 },
                end: { line: 71, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 71, column: 6 },
                end: { line: 76, column: 8 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 71, column: 6 },
                  end: { line: 76, column: 8 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 71, column: 7 },
                    end: { line: 71, column: 14 },
                  },
                  name: "Waiting",
                  param: 2,
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 72, column: 8 },
                      end: { line: 75, column: 10 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 72, column: 8 },
                        end: { line: 72, column: 11 },
                      },
                      name: "ask",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 72, column: 12 },
                        end: { line: 75, column: 10 },
                      },
                      expression: {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 72, column: 13 },
                          end: { line: 75, column: 9 },
                        },
                        params: [],
                        body: {
                          type: "BlockStatement",
                          loc: {
                            start: { line: 72, column: 19 },
                            end: { line: 75, column: 9 },
                          },
                          body: [
                            {
                              type: "ExpressionStatement",
                              loc: {
                                start: { line: 73, column: 10 },
                                end: { line: 73, column: 37 },
                              },
                              expression: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 73, column: 10 },
                                  end: { line: 73, column: 36 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 73, column: 10 },
                                    end: { line: 73, column: 19 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 73, column: 10 },
                                      end: { line: 73, column: 15 },
                                    },
                                    name: "asked",
                                    key: "asked$2f6ulv1ojihe6$2",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 73, column: 16 },
                                      end: { line: 73, column: 19 },
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
                                      start: { line: 73, column: 20 },
                                      end: { line: 73, column: 35 },
                                    },
                                    operator: "+",
                                    left: {
                                      type: "CallExpression",
                                      loc: {
                                        start: { line: 73, column: 20 },
                                        end: { line: 73, column: 31 },
                                      },
                                      callee: {
                                        type: "MemberExpression",
                                        loc: {
                                          start: { line: 73, column: 20 },
                                          end: { line: 73, column: 29 },
                                        },
                                        object: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 73, column: 20 },
                                            end: { line: 73, column: 25 },
                                          },
                                          name: "asked",
                                          key: "asked$2f6ulv1ojihe6$2",
                                        },
                                        property: {
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 73, column: 26 },
                                            end: { line: 73, column: 29 },
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
                                        start: { line: 73, column: 34 },
                                        end: { line: 73, column: 35 },
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
                                start: { line: 74, column: 10 },
                                end: { line: 74, column: 50 },
                              },
                              argument: {
                                type: "ConditionalExpression",
                                loc: {
                                  start: { line: 74, column: 17 },
                                  end: { line: 74, column: 49 },
                                },
                                test: {
                                  type: "BinaryExpression",
                                  loc: {
                                    start: { line: 74, column: 17 },
                                    end: { line: 74, column: 32 },
                                  },
                                  operator: ">",
                                  left: {
                                    type: "CallExpression",
                                    loc: {
                                      start: { line: 74, column: 17 },
                                      end: { line: 74, column: 28 },
                                    },
                                    callee: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 74, column: 17 },
                                        end: { line: 74, column: 26 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 74, column: 17 },
                                          end: { line: 74, column: 22 },
                                        },
                                        name: "asked",
                                        key: "asked$2f6ulv1ojihe6$2",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 74, column: 23 },
                                          end: { line: 74, column: 26 },
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
                                      start: { line: 74, column: 31 },
                                      end: { line: 74, column: 32 },
                                    },
                                    value: 4,
                                  },
                                },
                                consequent: {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 74, column: 35 },
                                    end: { line: 74, column: 39 },
                                  },
                                  value: null,
                                },
                                alternate: {
                                  type: "Splice",
                                  loc: {
                                    start: { line: 74, column: 42 },
                                    end: { line: 74, column: 49 },
                                  },
                                  param: 1,
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
                start: { line: 77, column: 4 },
                end: { line: 77, column: 4 },
              },
              value: "\n    ",
              raw: "\n    ",
            },
          ],
          closingElement: {
            type: "JSXClosingElement",
            loc: {
              start: { line: 77, column: 4 },
              end: { line: 77, column: 10 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 77, column: 6 },
                end: { line: 77, column: 9 },
              },
              name: "div",
            },
          },
        },
      },
    ],
  }),
  {
    code: 'export default ($0, $1, $2) => {\n    const asked = $0()(0);\n    return (<div>\n      <span>{"asked " + asked.get()}</span>\n      <$2 ask={() => {\n            asked.set(asked.get() + 1);\n            return asked.get() > 4 ? null : $1();\n        }}/>\n    </div>);\n};',
    map: '{"version":3,"file":"eval-builds-once.test.jsx","sourceRoot":"","sources":["eval-builds-once.test.tsx"],"names":[],"mappings":"eAgE0B;IACxB,MAAM,KAAK,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IAExB,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,IAAI,CAAC,CAAC,QAAQ,GAAG,KAAK,CAAC,GAAG,EAAE,CAAC,EAAE,IAAI,CACpC;MAAA,CAAC,EAAO,CACN,GAAG,CAAC,CAAC,GAAG,EAAE;YACR,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC;YAC3B,OAAO,KAAK,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,IAAO,CAAC;QAC1C,CAAC,CAAC,EAEN;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
  },
);
it("evalBuildsOnce", async (t) => {
  await snapshotCase(t, "evalBuildsOnce", evalBuildsOnce);
});
describe("a component that draws a bundle", () => {
  it("is built once, and draws what arrives", async () => {
    await render(evalBuildsOnce);
    // Nothing to draw yet, and the wait has not been made twice.
    assert.ok(screen.getByText("asked 0"));
    assert.equal(screen.queryByText("answered"), null);
    await settled();
    assert.ok(screen.getByText("answered"));
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});
