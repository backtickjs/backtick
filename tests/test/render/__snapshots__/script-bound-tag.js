import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A tag naming a function the script holds — here a bundle that takes props,
// evaluated. It is called with its props read on access, the way a component's
// are, so `count` follows the cell without the badge being drawn again.
const badge = await bundler.run(
  cs.create(
    "1g4jdt9f1nmyq:13:2",
    { splices: {}, captures: [] },
    () => ({
      type: "ArrowFunctionExpression",
      loc: { start: { line: 13, column: 5 }, end: { line: 13, column: 66 } },
      params: [
        {
          type: "Identifier",
          loc: {
            start: { line: 13, column: 6 },
            end: { line: 13, column: 11 },
          },
          name: "props",
          key: "props$1g4jdt9f1nmyq$0",
        },
      ],
      body: {
        type: "JSXElement",
        loc: { start: { line: 13, column: 35 }, end: { line: 13, column: 66 } },
        openingElement: {
          type: "JSXOpeningElement",
          loc: {
            start: { line: 13, column: 35 },
            end: { line: 13, column: 38 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 13, column: 36 },
              end: { line: 13, column: 37 },
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
              start: { line: 13, column: 38 },
              end: { line: 13, column: 62 },
            },
            expression: {
              type: "BinaryExpression",
              loc: {
                start: { line: 13, column: 39 },
                end: { line: 13, column: 61 },
              },
              operator: "+",
              left: {
                type: "Literal",
                loc: {
                  start: { line: 13, column: 39 },
                  end: { line: 13, column: 47 },
                },
                value: "count ",
              },
              right: {
                type: "MemberExpression",
                loc: {
                  start: { line: 13, column: 50 },
                  end: { line: 13, column: 61 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 50 },
                    end: { line: 13, column: 55 },
                  },
                  name: "props",
                  key: "props$1g4jdt9f1nmyq$0",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 56 },
                    end: { line: 13, column: 61 },
                  },
                  name: "count",
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
            start: { line: 13, column: 62 },
            end: { line: 13, column: 66 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 13, column: 64 },
              end: { line: 13, column: 65 },
            },
            name: "b",
          },
        },
      },
      expression: true,
    }),
    '() => (props) => <b>{"count " + props.count}</b>',
    '{"version":3,"file":"script-bound-tag.test.jsx","sourceRoot":"","sources":["script-bound-tag.test.tsx"],"names":[],"mappings":"AAYK,MAAA,CAAC,KAAwB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,GAAG,KAAK,CAAC,KAAK,CAAC,EAAE,CAAC,CAAC,CAAA"}',
  ),
);
const scriptBoundTag = cs.create(
  "1g4jdt9f1nmyq:16:23",
  {
    splices: {
      $state: { value: state, params: [] },
      $badge: { value: badge, params: [] },
    },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 16, column: 26 }, end: { line: 26, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 17, column: 2 }, end: { line: 17, column: 26 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 17, column: 8 },
              end: { line: 17, column: 25 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 17, column: 8 },
                end: { line: 17, column: 13 },
              },
              name: "count",
              key: "count$1g4jdt9f1nmyq$1",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 17, column: 16 },
                end: { line: 17, column: 25 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 17, column: 16 },
                  end: { line: 17, column: 22 },
                },
                key: "$state",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 17, column: 23 },
                    end: { line: 17, column: 24 },
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
        loc: { start: { line: 18, column: 2 }, end: { line: 18, column: 29 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 18, column: 8 },
              end: { line: 18, column: 28 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 18, column: 8 },
                end: { line: 18, column: 13 },
              },
              name: "Badge",
              key: "Badge$1g4jdt9f1nmyq$2",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 18, column: 16 },
                end: { line: 18, column: 28 },
              },
              callee: {
                type: "Identifier",
                loc: {
                  start: { line: 18, column: 16 },
                  end: { line: 18, column: 20 },
                },
                name: "eval",
              },
              arguments: [
                {
                  type: "Splice",
                  loc: {
                    start: { line: 18, column: 21 },
                    end: { line: 18, column: 27 },
                  },
                  key: "$badge",
                },
              ],
              optional: false,
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 20, column: 2 }, end: { line: 25, column: 4 } },
        argument: {
          type: "JSXElement",
          loc: {
            start: { line: 21, column: 4 },
            end: { line: 24, column: 10 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 21, column: 4 },
              end: { line: 21, column: 9 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 21, column: 5 },
                end: { line: 21, column: 8 },
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
                start: { line: 22, column: 6 },
                end: { line: 22, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 22, column: 6 },
                end: { line: 22, column: 35 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 22, column: 6 },
                  end: { line: 22, column: 35 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 22, column: 7 },
                    end: { line: 22, column: 12 },
                  },
                  name: "Badge",
                  key: "Badge$1g4jdt9f1nmyq$2",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 22, column: 13 },
                      end: { line: 22, column: 32 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 22, column: 13 },
                        end: { line: 22, column: 18 },
                      },
                      name: "count",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 22, column: 19 },
                        end: { line: 22, column: 32 },
                      },
                      expression: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 22, column: 20 },
                          end: { line: 22, column: 31 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 22, column: 20 },
                            end: { line: 22, column: 29 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 22, column: 20 },
                              end: { line: 22, column: 25 },
                            },
                            name: "count",
                            key: "count$1g4jdt9f1nmyq$1",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 22, column: 26 },
                              end: { line: 22, column: 29 },
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
                selfClosing: true,
              },
              children: [],
              closingElement: null,
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 23, column: 6 },
                end: { line: 23, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 23, column: 6 },
                end: { line: 23, column: 70 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 23, column: 6 },
                  end: { line: 23, column: 57 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 23, column: 7 },
                    end: { line: 23, column: 13 },
                  },
                  name: "button",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 23, column: 14 },
                      end: { line: 23, column: 56 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 23, column: 14 },
                        end: { line: 23, column: 21 },
                      },
                      name: "onclick",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 23, column: 22 },
                        end: { line: 23, column: 56 },
                      },
                      expression: {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 23, column: 23 },
                          end: { line: 23, column: 55 },
                        },
                        params: [],
                        body: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 23, column: 29 },
                            end: { line: 23, column: 55 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 23, column: 29 },
                              end: { line: 23, column: 38 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 23, column: 29 },
                                end: { line: 23, column: 34 },
                              },
                              name: "count",
                              key: "count$1g4jdt9f1nmyq$1",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 23, column: 35 },
                                end: { line: 23, column: 38 },
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
                                start: { line: 23, column: 39 },
                                end: { line: 23, column: 54 },
                              },
                              operator: "+",
                              left: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 23, column: 39 },
                                  end: { line: 23, column: 50 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 23, column: 39 },
                                    end: { line: 23, column: 48 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 23, column: 39 },
                                      end: { line: 23, column: 44 },
                                    },
                                    name: "count",
                                    key: "count$1g4jdt9f1nmyq$1",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 23, column: 45 },
                                      end: { line: 23, column: 48 },
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
                                  start: { line: 23, column: 53 },
                                  end: { line: 23, column: 54 },
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
                    start: { line: 23, column: 57 },
                    end: { line: 23, column: 61 },
                  },
                  value: "more",
                  raw: "more",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 23, column: 61 },
                  end: { line: 23, column: 70 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 23, column: 63 },
                    end: { line: 23, column: 69 },
                  },
                  name: "button",
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 24, column: 4 },
                end: { line: 24, column: 4 },
              },
              value: "\n    ",
              raw: "\n    ",
            },
          ],
          closingElement: {
            type: "JSXClosingElement",
            loc: {
              start: { line: 24, column: 4 },
              end: { line: 24, column: 10 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 24, column: 6 },
                end: { line: 24, column: 9 },
              },
              name: "div",
            },
          },
        },
      },
    ],
  }),
  "($0, $1) => {\n    const count = $0()(0);\n    const Badge = eval($1());\n    return (<div>\n      <Badge count={count.get()}/>\n      <button onclick={() => count.set(count.get() + 1)}>more</button>\n    </div>);\n}",
  '{"version":3,"file":"script-bound-tag.test.jsx","sourceRoot":"","sources":["script-bound-tag.test.tsx"],"names":[],"mappings":"AAe0B;IACxB,MAAM,KAAK,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACxB,MAAM,KAAK,GAAG,IAAI,CAAC,IAAM,CAAC,CAAC;IAE3B,OAAO,CACL,CAAC,GAAG,CACF;MAAA,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,GAAG,EAAE,CAAC,EAC1B;MAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,IAAI,EAAE,MAAM,CACjE;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC,CAAA"}',
);
it("scriptBoundTag", async (t) => {
  await snapshotCase(t, "scriptBoundTag", scriptBoundTag);
});
describe("a tag naming a function the script holds", () => {
  it("keeps a prop live without drawing the function again", async () => {
    await render(scriptBoundTag);
    const badge = screen.getByText("count 0");
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(
      screen.getByText("count 1"),
      badge,
      "the same <b>, updated rather than drawn again",
    );
  });
});
