import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { drawn } from "./dom.ts";
// `set` stores what it is given. A function is a value like any other, so it
// is kept, not called with the previous value.
async function Greeting() {
  return cs.create(
    "1zi7if3ybm5dh:11:9",
    { splices: { $state: { value: state, params: [] } }, captures: [] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 11, column: 12 }, end: { line: 18, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 12, column: 4 },
            end: { line: 12, column: 75 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 12, column: 10 },
                end: { line: 12, column: 74 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 12, column: 10 },
                  end: { line: 12, column: 15 },
                },
                name: "greet",
                key: "greet$1zi7if3ybm5dh$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 12, column: 18 },
                  end: { line: 12, column: 74 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 12, column: 18 },
                    end: { line: 12, column: 24 },
                  },
                  key: "$state",
                },
                arguments: [
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 12, column: 51 },
                      end: { line: 12, column: 73 },
                    },
                    params: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 12, column: 52 },
                          end: { line: 12, column: 56 },
                        },
                        name: "name",
                        key: "name$1zi7if3ybm5dh$1",
                      },
                    ],
                    body: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 12, column: 61 },
                        end: { line: 12, column: 73 },
                      },
                      operator: "+",
                      left: {
                        type: "Literal",
                        loc: {
                          start: { line: 12, column: 61 },
                          end: { line: 12, column: 66 },
                        },
                        value: "hi ",
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 12, column: 69 },
                          end: { line: 12, column: 73 },
                        },
                        name: "name",
                        key: "name$1zi7if3ybm5dh$1",
                      },
                    },
                    expression: true,
                  },
                ],
                optional: false,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: { start: { line: 13, column: 4 }, end: { line: 17, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 16, column: 13 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 14, column: 6 },
                end: { line: 14, column: 63 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 14, column: 7 },
                  end: { line: 14, column: 11 },
                },
                name: "span",
              },
              attributes: [
                {
                  type: "JSXAttribute",
                  loc: {
                    start: { line: 14, column: 12 },
                    end: { line: 14, column: 62 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 14, column: 12 },
                      end: { line: 14, column: 19 },
                    },
                    name: "onclick",
                  },
                  value: {
                    type: "JSXExpressionContainer",
                    loc: {
                      start: { line: 14, column: 20 },
                      end: { line: 14, column: 62 },
                    },
                    expression: {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 14, column: 21 },
                        end: { line: 14, column: 61 },
                      },
                      params: [],
                      body: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 14, column: 27 },
                          end: { line: 14, column: 61 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 14, column: 27 },
                            end: { line: 14, column: 36 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 14, column: 27 },
                              end: { line: 14, column: 32 },
                            },
                            name: "greet",
                            key: "greet$1zi7if3ybm5dh$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 14, column: 33 },
                              end: { line: 14, column: 36 },
                            },
                            name: "set",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "ArrowFunctionExpression",
                            loc: {
                              start: { line: 14, column: 37 },
                              end: { line: 14, column: 60 },
                            },
                            params: [
                              {
                                type: "Identifier",
                                loc: {
                                  start: { line: 14, column: 38 },
                                  end: { line: 14, column: 42 },
                                },
                                name: "name",
                                key: "name$1zi7if3ybm5dh$2",
                              },
                            ],
                            body: {
                              type: "BinaryExpression",
                              loc: {
                                start: { line: 14, column: 47 },
                                end: { line: 14, column: 60 },
                              },
                              operator: "+",
                              left: {
                                type: "Literal",
                                loc: {
                                  start: { line: 14, column: 47 },
                                  end: { line: 14, column: 53 },
                                },
                                value: "bye ",
                              },
                              right: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 14, column: 56 },
                                  end: { line: 14, column: 60 },
                                },
                                name: "name",
                                key: "name$1zi7if3ybm5dh$2",
                              },
                            },
                            expression: true,
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
                  start: { line: 15, column: 8 },
                  end: { line: 15, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 15, column: 8 },
                  end: { line: 15, column: 28 },
                },
                expression: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 15, column: 9 },
                    end: { line: 15, column: 27 },
                  },
                  callee: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 15, column: 9 },
                      end: { line: 15, column: 20 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 15, column: 9 },
                        end: { line: 15, column: 18 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 15, column: 9 },
                          end: { line: 15, column: 14 },
                        },
                        name: "greet",
                        key: "greet$1zi7if3ybm5dh$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 15, column: 15 },
                          end: { line: 15, column: 18 },
                        },
                        name: "get",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [],
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 15, column: 21 },
                        end: { line: 15, column: 26 },
                      },
                      value: "ada",
                    },
                  ],
                  optional: false,
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
                end: { line: 16, column: 13 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 16, column: 8 },
                  end: { line: 16, column: 12 },
                },
                name: "span",
              },
            },
          },
        },
      ],
    }),
    '$0 => {\n    const greet = $0()((name) => "hi " + name);\n    return (<span onclick={() => greet.set((name) => "bye " + name)}>\n        {greet.get()("ada")}\n      </span>);\n}',
    '{"version":3,"file":"set-stores-function.test.jsx","sourceRoot":"","sources":["set-stores-function.test.tsx"],"names":[],"mappings":"AAUY;IACR,MAAM,KAAK,GAAG,IAAM,CAA2B,CAAC,IAAI,EAAE,EAAE,CAAC,KAAK,GAAG,IAAI,CAAC,CAAC;IACvE,OAAO,CACL,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,CAAC,CAAC,IAAI,EAAE,EAAE,CAAC,MAAM,GAAG,IAAI,CAAC,CAAC,CACtD;QAAA,CAAC,KAAK,CAAC,GAAG,EAAE,CAAC,KAAK,CAAC,CACrB;MAAA,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC,CAAA"}',
  );
}
it("`set` stores a function without calling it", async () => {
  const text = await drawn(_jsx(Greeting, {}));
  assert.equal(text.textContent, "hi ada");
  await userEvent.click(text);
  assert.equal(text.textContent, "bye ada");
});
it("Greeting", async (t) => {
  await snapshotCase(t, "Greeting", _jsx(Greeting, {}));
});
