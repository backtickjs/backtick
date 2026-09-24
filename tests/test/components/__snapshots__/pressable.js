import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A drawing read the way Testing Library reads one: by role and by text, with
// a click a user would make.
// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  return cs.create(
    { start: { line: 15, column: 9 }, end: { line: 27, column: 4 } },
    {
      fileHash: "7huprcub5nk3",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 15, column: 12 }, end: { line: 27, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 16, column: 4 },
            end: { line: 16, column: 28 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 16, column: 10 },
                end: { line: 16, column: 27 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 16, column: 10 },
                  end: { line: 16, column: 15 },
                },
                name: "count",
                key: "count$7huprcub5nk3$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 16, column: 18 },
                  end: { line: 16, column: 27 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 16, column: 18 },
                    end: { line: 16, column: 24 },
                  },
                  key: "$state",
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 16, column: 25 },
                      end: { line: 16, column: 26 },
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
          loc: { start: { line: 17, column: 4 }, end: { line: 26, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 25, column: 15 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 22, column: 7 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 18, column: 7 },
                  end: { line: 18, column: 13 },
                },
                name: "button",
              },
              attributes: [
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 19, column: 8 },
                    end: { line: 19, column: 16 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 19, column: 8 },
                      end: { line: 19, column: 10 },
                    },
                    name: "id",
                  },
                  value: {
                    type: "Literal",
                    loc: {
                      start: { line: 19, column: 11 },
                      end: { line: 19, column: 16 },
                    },
                    value: "row",
                  },
                },
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 20, column: 8 },
                    end: { line: 20, column: 39 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 20, column: 8 },
                      end: { line: 20, column: 13 },
                    },
                    name: "style",
                  },
                  value: {
                    type: "Literal",
                    loc: {
                      start: { line: 20, column: 14 },
                      end: { line: 20, column: 39 },
                    },
                    value: "display: flex; gap: 8px",
                  },
                },
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 21, column: 8 },
                    end: { line: 21, column: 50 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 21, column: 8 },
                      end: { line: 21, column: 15 },
                    },
                    name: "onclick",
                  },
                  value: {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 21, column: 16 },
                      end: { line: 21, column: 50 },
                    },
                    expression: {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 21, column: 17 },
                        end: { line: 21, column: 49 },
                      },
                      params: [],
                      body: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 21, column: 23 },
                          end: { line: 21, column: 49 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 21, column: 23 },
                            end: { line: 21, column: 32 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 21, column: 23 },
                              end: { line: 21, column: 28 },
                            },
                            name: "count",
                            key: "count$7huprcub5nk3$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 21, column: 29 },
                              end: { line: 21, column: 32 },
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
                              start: { line: 21, column: 33 },
                              end: { line: 21, column: 48 },
                            },
                            operator: "+",
                            left: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 21, column: 33 },
                                end: { line: 21, column: 44 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 21, column: 33 },
                                  end: { line: 21, column: 42 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 21, column: 33 },
                                    end: { line: 21, column: 38 },
                                  },
                                  name: "count",
                                  key: "count$7huprcub5nk3$0",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 21, column: 39 },
                                    end: { line: 21, column: 42 },
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
                                start: { line: 21, column: 47 },
                                end: { line: 21, column: 48 },
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
                  start: { line: 23, column: 8 },
                  end: { line: 23, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 23, column: 8 },
                  end: { line: 23, column: 75 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 23, column: 8 },
                    end: { line: 23, column: 39 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 23, column: 9 },
                      end: { line: 23, column: 13 },
                    },
                    name: "span",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 23, column: 14 },
                        end: { line: 23, column: 38 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 23, column: 14 },
                          end: { line: 23, column: 19 },
                        },
                        name: "style",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 23, column: 20 },
                          end: { line: 23, column: 38 },
                        },
                        value: "font-weight: 700",
                      },
                    },
                  ],
                  selfClosing: false,
                },
                children: [
                  {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 23, column: 39 },
                      end: { line: 23, column: 68 },
                    },
                    expression: {
                      type: "ConditionalExpression",
                      loc: {
                        start: { line: 23, column: 40 },
                        end: { line: 23, column: 67 },
                      },
                      test: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 23, column: 40 },
                          end: { line: 23, column: 55 },
                        },
                        operator: ">",
                        left: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 23, column: 40 },
                            end: { line: 23, column: 51 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 23, column: 40 },
                              end: { line: 23, column: 49 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 23, column: 40 },
                                end: { line: 23, column: 45 },
                              },
                              name: "count",
                              key: "count$7huprcub5nk3$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 23, column: 46 },
                                end: { line: 23, column: 49 },
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
                            start: { line: 23, column: 54 },
                            end: { line: 23, column: 55 },
                          },
                          value: 0,
                        },
                      },
                      consequent: {
                        type: "Literal",
                        loc: {
                          start: { line: 23, column: 58 },
                          end: { line: 23, column: 61 },
                        },
                        value: "\u2611",
                      },
                      alternate: {
                        type: "Literal",
                        loc: {
                          start: { line: 23, column: 64 },
                          end: { line: 23, column: 67 },
                        },
                        value: "\u2610",
                      },
                    },
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 23, column: 68 },
                    end: { line: 23, column: 75 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 23, column: 70 },
                      end: { line: 23, column: 74 },
                    },
                    name: "span",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 24, column: 8 },
                  end: { line: 24, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 24, column: 8 },
                  end: { line: 24, column: 58 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 24, column: 8 },
                    end: { line: 24, column: 14 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 24, column: 9 },
                      end: { line: 24, column: 13 },
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
                      start: { line: 24, column: 14 },
                      end: { line: 24, column: 51 },
                    },
                    expression: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 24, column: 15 },
                        end: { line: 24, column: 50 },
                      },
                      operator: "+",
                      left: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 24, column: 15 },
                          end: { line: 24, column: 39 },
                        },
                        operator: "+",
                        left: {
                          type: "Literal",
                          loc: {
                            start: { line: 24, column: 15 },
                            end: { line: 24, column: 25 },
                          },
                          value: "pressed ",
                        },
                        right: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 24, column: 28 },
                            end: { line: 24, column: 39 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 24, column: 28 },
                              end: { line: 24, column: 37 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 24, column: 28 },
                                end: { line: 24, column: 33 },
                              },
                              name: "count",
                              key: "count$7huprcub5nk3$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 24, column: 34 },
                                end: { line: 24, column: 37 },
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
                          start: { line: 24, column: 42 },
                          end: { line: 24, column: 50 },
                        },
                        value: " times",
                      },
                    },
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 24, column: 51 },
                    end: { line: 24, column: 58 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 24, column: 53 },
                      end: { line: 24, column: 57 },
                    },
                    name: "span",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 25, column: 6 },
                  end: { line: 25, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 25, column: 6 },
                end: { line: 25, column: 15 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 25, column: 8 },
                  end: { line: 25, column: 14 },
                },
                name: "button",
              },
            },
          },
        },
      ],
    }),
    '$0 => {\n    const count = $0()(0);\n    return (<button id="row" style="display: flex; gap: 8px" onclick={() => count.set(count.get() + 1)}>\n        <span style="font-weight: 700">{count.get() > 0 ? "\u2611" : "\u2610"}</span>\n        <span>{"pressed " + count.get() + " times"}</span>\n      </button>);\n}',
    '{"version":3,"file":"pressable.test.jsx","sourceRoot":"","sources":["pressable.test.tsx"],"names":[],"mappings":"AAcY;IACR,MAAM,KAAK,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACxB,OAAO,CACL,CAAC,MAAM,CACL,EAAE,CAAC,KAAK,CACR,KAAK,CAAC,yBAAyB,CAC/B,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC,CAE1C;QAAA,CAAC,IAAI,CAAC,KAAK,CAAC,kBAAkB,CAAC,CAAC,KAAK,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,EAAE,IAAI,CAClE;QAAA,CAAC,IAAI,CAAC,CAAC,UAAU,GAAG,KAAK,CAAC,GAAG,EAAE,GAAG,QAAQ,CAAC,EAAE,IAAI,CACnD;MAAA,EAAE,MAAM,CAAC,CACV,CAAC;AACJ,CAAC,CAAA"}',
  );
}
describe("screen", () => {
  it("increments the counter", async () => {
    await render(_jsx(Row, {}));
    await userEvent.click(screen.getByRole("button", { name: /pressed/ }));
    assert.ok(screen.getByText("pressed 1 times"));
  });
  it("reads a fresh page in each test", async () => {
    await render(_jsx(Row, {}));
    assert.ok(screen.getByText("pressed 0 times"));
  });
});
describe("what each case compiles and bundles to", () => {
  it("Row", async (t) => {
    await snapshotCase(t, "Row", _jsx(Row, {}));
  });
});
