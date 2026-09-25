import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A cell a script declares, and a button that writes it.
async function Counter() {
  return cs.create(
    "2x6geiwtygybj:10:9",
    { params: [{ kind: "splice", value: state, bindings: [] }] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 10, column: 12 }, end: { line: 18, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 11, column: 4 },
            end: { line: 11, column: 28 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 11, column: 10 },
                end: { line: 11, column: 27 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 11, column: 10 },
                  end: { line: 11, column: 15 },
                },
                name: "count",
                key: "count$2x6geiwtygybj$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 11, column: 18 },
                  end: { line: 11, column: 27 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 11, column: 18 },
                    end: { line: 11, column: 24 },
                  },
                  param: 0,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 11, column: 25 },
                      end: { line: 11, column: 26 },
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
          loc: { start: { line: 12, column: 4 }, end: { line: 17, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 16, column: 12 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 13, column: 6 },
                end: { line: 13, column: 11 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 13, column: 7 },
                  end: { line: 13, column: 10 },
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
                  start: { line: 14, column: 8 },
                  end: { line: 14, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 14, column: 8 },
                  end: { line: 14, column: 71 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 14, column: 8 },
                    end: { line: 14, column: 59 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 14, column: 9 },
                      end: { line: 14, column: 15 },
                    },
                    name: "button",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 14, column: 16 },
                        end: { line: 14, column: 58 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 14, column: 16 },
                          end: { line: 14, column: 23 },
                        },
                        name: "onclick",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 14, column: 24 },
                          end: { line: 14, column: 58 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 14, column: 25 },
                            end: { line: 14, column: 57 },
                          },
                          params: [],
                          body: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 14, column: 31 },
                              end: { line: 14, column: 57 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 14, column: 31 },
                                end: { line: 14, column: 40 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 14, column: 31 },
                                  end: { line: 14, column: 36 },
                                },
                                name: "count",
                                key: "count$2x6geiwtygybj$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 14, column: 37 },
                                  end: { line: 14, column: 40 },
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
                                  start: { line: 14, column: 41 },
                                  end: { line: 14, column: 56 },
                                },
                                operator: "+",
                                left: {
                                  type: "CallExpression",
                                  loc: {
                                    start: { line: 14, column: 41 },
                                    end: { line: 14, column: 52 },
                                  },
                                  callee: {
                                    type: "MemberExpression",
                                    loc: {
                                      start: { line: 14, column: 41 },
                                      end: { line: 14, column: 50 },
                                    },
                                    object: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 14, column: 41 },
                                        end: { line: 14, column: 46 },
                                      },
                                      name: "count",
                                      key: "count$2x6geiwtygybj$0",
                                    },
                                    property: {
                                      type: "Identifier",
                                      loc: {
                                        start: { line: 14, column: 47 },
                                        end: { line: 14, column: 50 },
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
                                    start: { line: 14, column: 55 },
                                    end: { line: 14, column: 56 },
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
                      start: { line: 14, column: 59 },
                      end: { line: 14, column: 62 },
                    },
                    value: "Add",
                    raw: "Add",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 14, column: 62 },
                    end: { line: 14, column: 71 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 14, column: 64 },
                      end: { line: 14, column: 70 },
                    },
                    name: "button",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 15, column: 8 },
                  end: { line: 15, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 15, column: 8 },
                  end: { line: 15, column: 40 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 15, column: 8 },
                    end: { line: 15, column: 11 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 15, column: 9 },
                      end: { line: 15, column: 10 },
                    },
                    name: "p",
                  },
                  attributes: [],
                  selfClosing: false,
                },
                children: [
                  {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 15, column: 11 },
                      end: { line: 15, column: 36 },
                    },
                    expression: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 15, column: 12 },
                        end: { line: 15, column: 35 },
                      },
                      operator: "+",
                      left: {
                        type: "Literal",
                        loc: {
                          start: { line: 15, column: 12 },
                          end: { line: 15, column: 21 },
                        },
                        value: "Count: ",
                      },
                      right: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 15, column: 24 },
                          end: { line: 15, column: 35 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 15, column: 24 },
                            end: { line: 15, column: 33 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 24 },
                              end: { line: 15, column: 29 },
                            },
                            name: "count",
                            key: "count$2x6geiwtygybj$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 30 },
                              end: { line: 15, column: 33 },
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
                    start: { line: 15, column: 36 },
                    end: { line: 15, column: 40 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 15, column: 38 },
                      end: { line: 15, column: 39 },
                    },
                    name: "p",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 16, column: 6 },
                  end: { line: 16, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 16, column: 6 },
                end: { line: 16, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 16, column: 8 },
                  end: { line: 16, column: 11 },
                },
                name: "div",
              },
            },
          },
        },
      ],
    }),
    'export default ($0) => {\n    const count = $0()(0);\n    return (<div>\n        <button onclick={() => count.set(count.get() + 1)}>Add</button>\n        <p>{"Count: " + count.get()}</p>\n      </div>);\n};',
    '{"version":3,"file":"counter.test.jsx","sourceRoot":"","sources":["counter.test.tsx"],"names":[],"mappings":"eASY;IACR,MAAM,KAAK,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACxB,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,MAAM,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC,CAAC,GAAG,EAAE,MAAM,CAC9D;QAAA,CAAC,CAAC,CAAC,CAAC,SAAS,GAAG,KAAK,CAAC,GAAG,EAAE,CAAC,EAAE,CAAC,CACjC;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
  );
}
describe("a counter", () => {
  it("Counter", async (t) => {
    await snapshotCase(t, "Counter", _jsx(Counter, {}));
  });
  it("increments on a click", async () => {
    await render(_jsx(Counter, {}));
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    assert.ok(screen.getByText("Count: 1"));
  });
});
