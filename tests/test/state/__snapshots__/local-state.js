import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { drawn, fontSize } from "./dom.ts";
// A cell a script declares, read and written by what it draws. The script owns
// the storage, so the display and the handler are two readers of one binding
// and share one cell: `read()` is an input — a value that re-evaluates when the
// cell changes — and `write` is an effect, which only an action can perform.
async function Stepper() {
  return cs.create(
    { start: { line: 13, column: 9 }, end: { line: 25, column: 4 } },
    {
      fileHash: "2gygj47yf1nf5",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 13, column: 12 }, end: { line: 25, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 14, column: 4 },
            end: { line: 14, column: 28 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 14, column: 10 },
                end: { line: 14, column: 27 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 10 },
                  end: { line: 14, column: 14 },
                },
                name: "size",
                key: "size$2gygj47yf1nf5$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 14, column: 17 },
                  end: { line: 14, column: 27 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 14, column: 17 },
                    end: { line: 14, column: 23 },
                  },
                  key: "$state",
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 14, column: 24 },
                      end: { line: 14, column: 26 },
                    },
                    value: 16,
                  },
                ],
                optional: false,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: { start: { line: 15, column: 4 }, end: { line: 24, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 16, column: 6 },
              end: { line: 23, column: 13 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 16, column: 6 },
                end: { line: 21, column: 7 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 16, column: 7 },
                  end: { line: 16, column: 11 },
                },
                name: "span",
              },
              attributes: [
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 17, column: 8 },
                    end: { line: 17, column: 49 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 17, column: 8 },
                      end: { line: 17, column: 13 },
                    },
                    name: "style",
                  },
                  value: {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 17, column: 14 },
                      end: { line: 17, column: 49 },
                    },
                    expression: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 17, column: 15 },
                        end: { line: 17, column: 48 },
                      },
                      operator: "+",
                      left: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 17, column: 15 },
                          end: { line: 17, column: 41 },
                        },
                        operator: "+",
                        left: {
                          type: "Literal",
                          loc: {
                            start: { line: 17, column: 15 },
                            end: { line: 17, column: 28 },
                          },
                          value: "font-size: ",
                        },
                        right: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 17, column: 31 },
                            end: { line: 17, column: 41 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 17, column: 31 },
                              end: { line: 17, column: 39 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 17, column: 31 },
                                end: { line: 17, column: 35 },
                              },
                              name: "size",
                              key: "size$2gygj47yf1nf5$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 17, column: 36 },
                                end: { line: 17, column: 39 },
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
                          start: { line: 17, column: 44 },
                          end: { line: 17, column: 48 },
                        },
                        value: "px",
                      },
                    },
                  },
                },
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 18, column: 8 },
                    end: { line: 20, column: 10 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 18, column: 8 },
                      end: { line: 18, column: 15 },
                    },
                    name: "onclick",
                  },
                  value: {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 18, column: 16 },
                      end: { line: 20, column: 10 },
                    },
                    expression: {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 18, column: 17 },
                        end: { line: 20, column: 9 },
                      },
                      params: [],
                      body: {
                        type: "BlockStatement",
                        loc: {
                          start: { line: 18, column: 23 },
                          end: { line: 20, column: 9 },
                        },
                        body: [
                          {
                            type: "ExpressionStatement",
                            loc: {
                              start: { line: 19, column: 10 },
                              end: { line: 19, column: 35 },
                            },
                            expression: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 19, column: 10 },
                                end: { line: 19, column: 34 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 19, column: 10 },
                                  end: { line: 19, column: 18 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 19, column: 10 },
                                    end: { line: 19, column: 14 },
                                  },
                                  name: "size",
                                  key: "size$2gygj47yf1nf5$0",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 19, column: 15 },
                                    end: { line: 19, column: 18 },
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
                                    start: { line: 19, column: 19 },
                                    end: { line: 19, column: 33 },
                                  },
                                  operator: "+",
                                  left: {
                                    type: "CallExpression",
                                    loc: {
                                      start: { line: 19, column: 19 },
                                      end: { line: 19, column: 29 },
                                    },
                                    callee: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 19, column: 19 },
                                        end: { line: 19, column: 27 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 19, column: 19 },
                                          end: { line: 19, column: 23 },
                                        },
                                        name: "size",
                                        key: "size$2gygj47yf1nf5$0",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 19, column: 24 },
                                          end: { line: 19, column: 27 },
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
                                      start: { line: 19, column: 32 },
                                      end: { line: 19, column: 33 },
                                    },
                                    value: 1,
                                  },
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
                },
              ],
              selfClosing: false,
            },
            children: [
              {
                type: "JSXText",
                loc: {
                  start: { line: 22, column: 8 },
                  end: { line: 23, column: 6 },
                },
                value: "\n        press\n      ",
                raw: "\n        press\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 23, column: 6 },
                end: { line: 23, column: 13 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 23, column: 8 },
                  end: { line: 23, column: 12 },
                },
                name: "span",
              },
            },
          },
        },
      ],
    }),
    '$0 => {\n    const size = $0()(16);\n    return (<span style={"font-size: " + size.get() + "px"} onclick={() => {\n            size.set(size.get() + 1);\n        }}>\n        press\n      </span>);\n}',
    '{"version":3,"file":"local-state.test.jsx","sourceRoot":"","sources":["local-state.test.tsx"],"names":[],"mappings":"AAYY;IACR,MAAM,IAAI,GAAG,IAAM,CAAC,EAAE,CAAC,CAAC;IACxB,OAAO,CACL,CAAC,IAAI,CACH,KAAK,CAAC,CAAC,aAAa,GAAG,IAAI,CAAC,GAAG,EAAE,GAAG,IAAI,CAAC,CACzC,OAAO,CAAC,CAAC,GAAG,EAAE;YACZ,IAAI,CAAC,GAAG,CAAC,IAAI,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC;QAC3B,CAAC,CAAC,CAEF;;MACF,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC,CAAA"}',
  );
}
describe("local state", () => {
  it("renders the cell's initial value", async () => {
    const text = await drawn(_jsx(Stepper, {}));
    assert.equal(fontSize(text), 16);
  });
  it("a write persists and re-renders the instance", async () => {
    const text = await drawn(_jsx(Stepper, {}));
    await userEvent.click(text);
    assert.equal(fontSize(text), 17);
  });
  it("the display and the handler share one cell", async () => {
    const text = await drawn(_jsx(Stepper, {}));
    // Each write reads the value the previous one stored — the handler's
    // `read()` and the display's are the same cell, not two snapshots.
    await userEvent.click(text);
    await userEvent.click(text);
    await userEvent.click(text);
    assert.equal(fontSize(text), 19);
  });
  it("a handle captured before a write keeps working after it", async () => {
    const text = await drawn(_jsx(Stepper, {}));
    // The host holds the handler across re-renders; the handle resolves its
    // cell by name at call time, so the stale closure still writes the
    // instance's live storage. One registration per event, reading whatever
    // the prop holds now — so the click after a write runs the handler the
    // write left behind, not the one that was registered first.
    await userEvent.click(text);
    await userEvent.click(text);
    assert.equal(fontSize(text), 18);
  });
});
it("Stepper", async (t) => {
  await snapshotCase(t, "Stepper", _jsx(Stepper, {}));
});
