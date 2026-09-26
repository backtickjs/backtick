import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
// State belongs to the script that declares it, and a script entry is applied
// once per place that reaches it — so two `<OwnCounter />` tags are two
// applications of one entry, and each declares a cell of its own.
async function OwnCounter() {
  return cs.create(
    "4rab33ccyjy9:12:9",
    { params: [{ kind: "splice", value: state, bindings: [] }] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 12, column: 12 }, end: { line: 24, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 13, column: 4 },
            end: { line: 13, column: 28 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 13, column: 10 },
                end: { line: 13, column: 27 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 13, column: 10 },
                  end: { line: 13, column: 14 },
                },
                name: "size",
                key: "size$4rab33ccyjy9$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 13, column: 17 },
                  end: { line: 13, column: 27 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 13, column: 17 },
                    end: { line: 13, column: 23 },
                  },
                  param: 0,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 13, column: 24 },
                      end: { line: 13, column: 26 },
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
          loc: { start: { line: 14, column: 4 }, end: { line: 23, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 22, column: 13 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 15, column: 6 },
                end: { line: 20, column: 7 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 15, column: 7 },
                  end: { line: 15, column: 11 },
                },
                name: "span",
              },
              attributes: [
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 16, column: 8 },
                    end: { line: 16, column: 49 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 16, column: 8 },
                      end: { line: 16, column: 13 },
                    },
                    name: "style",
                  },
                  value: {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 16, column: 14 },
                      end: { line: 16, column: 49 },
                    },
                    expression: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 16, column: 15 },
                        end: { line: 16, column: 48 },
                      },
                      operator: "+",
                      left: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 16, column: 15 },
                          end: { line: 16, column: 41 },
                        },
                        operator: "+",
                        left: {
                          type: "Literal",
                          loc: {
                            start: { line: 16, column: 15 },
                            end: { line: 16, column: 28 },
                          },
                          value: "font-size: ",
                        },
                        right: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 16, column: 31 },
                            end: { line: 16, column: 41 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 16, column: 31 },
                              end: { line: 16, column: 39 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 16, column: 31 },
                                end: { line: 16, column: 35 },
                              },
                              name: "size",
                              key: "size$4rab33ccyjy9$0",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 16, column: 36 },
                                end: { line: 16, column: 39 },
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
                          start: { line: 16, column: 44 },
                          end: { line: 16, column: 48 },
                        },
                        value: "px",
                      },
                    },
                  },
                },
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 17, column: 8 },
                    end: { line: 19, column: 10 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 17, column: 8 },
                      end: { line: 17, column: 15 },
                    },
                    name: "onclick",
                  },
                  value: {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 17, column: 16 },
                      end: { line: 19, column: 10 },
                    },
                    expression: {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 17, column: 17 },
                        end: { line: 19, column: 9 },
                      },
                      params: [],
                      body: {
                        type: "BlockStatement",
                        loc: {
                          start: { line: 17, column: 23 },
                          end: { line: 19, column: 9 },
                        },
                        body: [
                          {
                            type: "ExpressionStatement",
                            loc: {
                              start: { line: 18, column: 10 },
                              end: { line: 18, column: 35 },
                            },
                            expression: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 18, column: 10 },
                                end: { line: 18, column: 34 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 18, column: 10 },
                                  end: { line: 18, column: 18 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 18, column: 10 },
                                    end: { line: 18, column: 14 },
                                  },
                                  name: "size",
                                  key: "size$4rab33ccyjy9$0",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 18, column: 15 },
                                    end: { line: 18, column: 18 },
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
                                    start: { line: 18, column: 19 },
                                    end: { line: 18, column: 33 },
                                  },
                                  operator: "+",
                                  left: {
                                    type: "CallExpression",
                                    loc: {
                                      start: { line: 18, column: 19 },
                                      end: { line: 18, column: 29 },
                                    },
                                    callee: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 18, column: 19 },
                                        end: { line: 18, column: 27 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 18, column: 19 },
                                          end: { line: 18, column: 23 },
                                        },
                                        name: "size",
                                        key: "size$4rab33ccyjy9$0",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 18, column: 24 },
                                          end: { line: 18, column: 27 },
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
                                      start: { line: 18, column: 32 },
                                      end: { line: 18, column: 33 },
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
                  start: { line: 21, column: 8 },
                  end: { line: 22, column: 6 },
                },
                value: "\n        press\n      ",
                raw: "\n        press\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 22, column: 6 },
                end: { line: 22, column: 13 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 22, column: 8 },
                  end: { line: 22, column: 12 },
                },
                name: "span",
              },
            },
          },
        },
      ],
    }),
    {
      code: 'export default ($0) => {\n    const size = $0()(16);\n    return (<span style={"font-size: " + size.get() + "px"} onclick={() => {\n            size.set(size.get() + 1);\n        }}>\n        press\n      </span>);\n};',
      map: '{"version":3,"file":"local-state-instances.test.jsx","sourceRoot":"","sources":["local-state-instances.test.tsx"],"names":[],"mappings":"eAWY;IACR,MAAM,IAAI,GAAG,IAAM,CAAC,EAAE,CAAC,CAAC;IACxB,OAAO,CACL,CAAC,IAAI,CACH,KAAK,CAAC,CAAC,aAAa,GAAG,IAAI,CAAC,GAAG,EAAE,GAAG,IAAI,CAAC,CACzC,OAAO,CAAC,CAAC,GAAG,EAAE;YACZ,IAAI,CAAC,GAAG,CAAC,IAAI,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC;QAC3B,CAAC,CAAC,CAEF;;MACF,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
const instances = _jsxs("div", {
  children: [_jsx(OwnCounter, {}), _jsx(OwnCounter, {})],
});
describe("local state", () => {
  it("two invocations of one component hold independent cells", async () => {
    const view = await drawn(instances);
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 16);
  });
});
it("instances", async (t) => {
  await snapshotCase(t, "instances", instances);
});
