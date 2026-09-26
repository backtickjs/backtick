import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
// A child reading a cell it was handed, in all three positions at once: a prop,
// a text child, and a branch deciding which elements exist. The script that
// declares the cell never reads it, so a write reaches each `ReadingRow` with
// the arguments it already had — the same handle object, the same id.
//
// Nothing a row was given is different, and everything it draws is. Skipping
// on the arguments alone leaves both rows stale: a handle is one object
// whatever its cell holds. The branch is the half no amount of recomputing a
// prop can answer for.
const ReadingRow = async ({ id, selected }) =>
  _jsxs("div", {
    children: [
      _jsx("span", {
        style: cs.create(
          "asvx80rnl1z5:27:13",
          {
            params: [
              { kind: "splice", value: selected, bindings: [] },
              { kind: "splice", value: id, bindings: [] },
            ],
          },
          () => ({
            type: "BinaryExpression",
            loc: {
              start: { line: 27, column: 16 },
              end: { line: 27, column: 74 },
            },
            operator: "+",
            left: {
              type: "BinaryExpression",
              loc: {
                start: { line: 27, column: 16 },
                end: { line: 27, column: 67 },
              },
              operator: "+",
              left: {
                type: "Literal",
                loc: {
                  start: { line: 27, column: 16 },
                  end: { line: 27, column: 29 },
                },
                value: "font-size: ",
              },
              right: {
                type: "ConditionalExpression",
                loc: {
                  start: { line: 27, column: 33 },
                  end: { line: 27, column: 66 },
                },
                test: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 27, column: 33 },
                    end: { line: 27, column: 56 },
                  },
                  operator: "===",
                  left: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 27, column: 33 },
                      end: { line: 27, column: 48 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 27, column: 33 },
                        end: { line: 27, column: 46 },
                      },
                      object: {
                        type: "Splice",
                        loc: {
                          start: { line: 27, column: 33 },
                          end: { line: 27, column: 42 },
                        },
                        param: 0,
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 27, column: 43 },
                          end: { line: 27, column: 46 },
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
                    type: "Splice",
                    loc: {
                      start: { line: 27, column: 53 },
                      end: { line: 27, column: 56 },
                    },
                    param: 1,
                  },
                },
                consequent: {
                  type: "Literal",
                  loc: {
                    start: { line: 27, column: 59 },
                    end: { line: 27, column: 61 },
                  },
                  value: 20,
                },
                alternate: {
                  type: "Literal",
                  loc: {
                    start: { line: 27, column: 64 },
                    end: { line: 27, column: 66 },
                  },
                  value: 16,
                },
              },
            },
            right: {
              type: "Literal",
              loc: {
                start: { line: 27, column: 70 },
                end: { line: 27, column: 74 },
              },
              value: "px",
            },
          }),
          {
            code: 'export default ($0, $1) => "font-size: " + ($0().get() === $1() ? 20 : 16) + "px";',
            map: '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["local-state-child-reads.test.tsx"],"names":[],"mappings":"eA0BgB,YAAA,aAAa,GAAG,CAAC,IAAS,CAAC,GAAG,EAAE,KAAK,IAAG,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,CAAC,GAAG,IAAI"}',
          },
        ),
        children: cs.create(
          "asvx80rnl1z5:29:7",
          {
            params: [
              { kind: "splice", value: id, bindings: [] },
              { kind: "splice", value: selected, bindings: [] },
            ],
          },
          () => ({
            type: "BinaryExpression",
            loc: {
              start: { line: 29, column: 10 },
              end: { line: 29, column: 49 },
            },
            operator: "+",
            left: {
              type: "BinaryExpression",
              loc: {
                start: { line: 29, column: 10 },
                end: { line: 29, column: 31 },
              },
              operator: "+",
              left: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 29, column: 10 },
                  end: { line: 29, column: 22 },
                },
                operator: "+",
                left: {
                  type: "Literal",
                  loc: {
                    start: { line: 29, column: 10 },
                    end: { line: 29, column: 16 },
                  },
                  value: "row ",
                },
                right: {
                  type: "Splice",
                  loc: {
                    start: { line: 29, column: 19 },
                    end: { line: 29, column: 22 },
                  },
                  param: 0,
                },
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 29, column: 25 },
                  end: { line: 29, column: 31 },
                },
                value: " of ",
              },
            },
            right: {
              type: "CallExpression",
              loc: {
                start: { line: 29, column: 34 },
                end: { line: 29, column: 49 },
              },
              callee: {
                type: "MemberExpression",
                loc: {
                  start: { line: 29, column: 34 },
                  end: { line: 29, column: 47 },
                },
                object: {
                  type: "Splice",
                  loc: {
                    start: { line: 29, column: 34 },
                    end: { line: 29, column: 43 },
                  },
                  param: 1,
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 29, column: 44 },
                    end: { line: 29, column: 47 },
                  },
                  name: "get",
                },
                computed: false,
                optional: false,
              },
              arguments: [],
              optional: false,
            },
          }),
          {
            code: 'export default ($0, $1) => "row " + $0() + " of " + $1().get();',
            map: '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["local-state-child-reads.test.tsx"],"names":[],"mappings":"eA4BU,YAAA,MAAM,GAAG,IAAG,GAAG,MAAM,GAAG,IAAS,CAAC,GAAG,EAAE"}',
          },
        ),
      }),
      cs.create(
        "asvx80rnl1z5:31:5",
        {
          params: [
            { kind: "splice", value: selected, bindings: [] },
            { kind: "splice", value: id, bindings: [] },
            {
              kind: "splice",
              value: _jsx("span", { children: "marker" }),
              bindings: [],
            },
          ],
        },
        () => ({
          type: "ConditionalExpression",
          loc: {
            start: { line: 31, column: 8 },
            end: { line: 31, column: 65 },
          },
          test: {
            type: "BinaryExpression",
            loc: {
              start: { line: 31, column: 8 },
              end: { line: 31, column: 31 },
            },
            operator: "===",
            left: {
              type: "CallExpression",
              loc: {
                start: { line: 31, column: 8 },
                end: { line: 31, column: 23 },
              },
              callee: {
                type: "MemberExpression",
                loc: {
                  start: { line: 31, column: 8 },
                  end: { line: 31, column: 21 },
                },
                object: {
                  type: "Splice",
                  loc: {
                    start: { line: 31, column: 8 },
                    end: { line: 31, column: 17 },
                  },
                  param: 0,
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 31, column: 18 },
                    end: { line: 31, column: 21 },
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
              type: "Splice",
              loc: {
                start: { line: 31, column: 28 },
                end: { line: 31, column: 31 },
              },
              param: 1,
            },
          },
          consequent: {
            type: "Splice",
            loc: {
              start: { line: 31, column: 34 },
              end: { line: 31, column: 58 },
            },
            param: 2,
          },
          alternate: {
            type: "Literal",
            loc: {
              start: { line: 31, column: 61 },
              end: { line: 31, column: 65 },
            },
            value: null,
          },
        }),
        {
          code: "export default ($0, $1, $2) => $0().get() === $1() ? $2() : null;",
          map: '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["local-state-child-reads.test.tsx"],"names":[],"mappings":"eA8BQ,gBAAA,IAAS,CAAC,GAAG,EAAE,KAAK,IAAG,CAAC,CAAC,CAAC,IAAC,CAAwB,CAAC,CAAC,IAAI"}',
        },
      ),
    ],
  });
async function ReadingPanel() {
  return cs.create(
    "asvx80rnl1z5:36:9",
    {
      params: [
        { kind: "splice", value: state, bindings: [] },
        { kind: "tag", value: ReadingRow },
      ],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 36, column: 12 }, end: { line: 45, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 37, column: 4 },
            end: { line: 37, column: 31 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 37, column: 10 },
                end: { line: 37, column: 30 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 37, column: 10 },
                  end: { line: 37, column: 18 },
                },
                name: "selected",
                key: "selected$asvx80rnl1z5$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 37, column: 21 },
                  end: { line: 37, column: 30 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 37, column: 21 },
                    end: { line: 37, column: 27 },
                  },
                  param: 0,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 37, column: 28 },
                      end: { line: 37, column: 29 },
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
          loc: { start: { line: 38, column: 4 }, end: { line: 44, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 39, column: 6 },
              end: { line: 43, column: 12 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 39, column: 6 },
                end: { line: 39, column: 11 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 39, column: 7 },
                  end: { line: 39, column: 10 },
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
                  start: { line: 40, column: 8 },
                  end: { line: 40, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 40, column: 8 },
                  end: { line: 40, column: 59 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 40, column: 8 },
                    end: { line: 40, column: 46 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 40, column: 9 },
                      end: { line: 40, column: 13 },
                    },
                    name: "span",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 40, column: 14 },
                        end: { line: 40, column: 45 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 40, column: 14 },
                          end: { line: 40, column: 21 },
                        },
                        name: "onclick",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 40, column: 22 },
                          end: { line: 40, column: 45 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 40, column: 23 },
                            end: { line: 40, column: 44 },
                          },
                          params: [],
                          body: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 40, column: 29 },
                              end: { line: 40, column: 44 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 40, column: 29 },
                                end: { line: 40, column: 41 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 40, column: 29 },
                                  end: { line: 40, column: 37 },
                                },
                                name: "selected",
                                key: "selected$asvx80rnl1z5$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 40, column: 38 },
                                  end: { line: 40, column: 41 },
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
                                  start: { line: 40, column: 42 },
                                  end: { line: 40, column: 43 },
                                },
                                value: 1,
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
                      start: { line: 40, column: 46 },
                      end: { line: 40, column: 52 },
                    },
                    value: "select",
                    raw: "select",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 40, column: 52 },
                    end: { line: 40, column: 59 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 40, column: 54 },
                      end: { line: 40, column: 58 },
                    },
                    name: "span",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 41, column: 8 },
                  end: { line: 41, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 41, column: 8 },
                  end: { line: 41, column: 49 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 41, column: 8 },
                    end: { line: 41, column: 49 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 41, column: 9 },
                      end: { line: 41, column: 19 },
                    },
                    name: "ReadingRow",
                    param: 1,
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 41, column: 20 },
                        end: { line: 41, column: 26 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 41, column: 20 },
                          end: { line: 41, column: 22 },
                        },
                        name: "id",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 41, column: 23 },
                          end: { line: 41, column: 26 },
                        },
                        expression: {
                          type: "Literal",
                          loc: {
                            start: { line: 41, column: 24 },
                            end: { line: 41, column: 25 },
                          },
                          value: 0,
                        },
                      },
                    },
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 41, column: 27 },
                        end: { line: 41, column: 46 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 41, column: 27 },
                          end: { line: 41, column: 35 },
                        },
                        name: "selected",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 41, column: 36 },
                          end: { line: 41, column: 46 },
                        },
                        expression: {
                          type: "Identifier",
                          loc: {
                            start: { line: 41, column: 37 },
                            end: { line: 41, column: 45 },
                          },
                          name: "selected",
                          key: "selected$asvx80rnl1z5$0",
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
                  start: { line: 42, column: 8 },
                  end: { line: 42, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 42, column: 8 },
                  end: { line: 42, column: 49 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 42, column: 8 },
                    end: { line: 42, column: 49 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 42, column: 9 },
                      end: { line: 42, column: 19 },
                    },
                    name: "ReadingRow",
                    param: 1,
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 42, column: 20 },
                        end: { line: 42, column: 26 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 42, column: 20 },
                          end: { line: 42, column: 22 },
                        },
                        name: "id",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 42, column: 23 },
                          end: { line: 42, column: 26 },
                        },
                        expression: {
                          type: "Literal",
                          loc: {
                            start: { line: 42, column: 24 },
                            end: { line: 42, column: 25 },
                          },
                          value: 1,
                        },
                      },
                    },
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 42, column: 27 },
                        end: { line: 42, column: 46 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 42, column: 27 },
                          end: { line: 42, column: 35 },
                        },
                        name: "selected",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 42, column: 36 },
                          end: { line: 42, column: 46 },
                        },
                        expression: {
                          type: "Identifier",
                          loc: {
                            start: { line: 42, column: 37 },
                            end: { line: 42, column: 45 },
                          },
                          name: "selected",
                          key: "selected$asvx80rnl1z5$0",
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
                  start: { line: 43, column: 6 },
                  end: { line: 43, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 43, column: 6 },
                end: { line: 43, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 43, column: 8 },
                  end: { line: 43, column: 11 },
                },
                name: "div",
              },
            },
          },
        },
      ],
    }),
    {
      code: "export default ($0, $1) => {\n    const selected = $0()(0);\n    return (<div>\n        <span onclick={() => selected.set(1)}>select</span>\n        <$1 id={0} selected={selected}/>\n        <$1 id={1} selected={selected}/>\n      </div>);\n};",
      map: '{"version":3,"file":"local-state-child-reads.test.jsx","sourceRoot":"","sources":["local-state-child-reads.test.tsx"],"names":[],"mappings":"eAmCY;IACR,MAAM,QAAQ,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IAC3B,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,QAAQ,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,EAAE,IAAI,CAClD;QAAA,CAAC,EAAU,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,CAAC,CAAC,QAAQ,CAAC,EACtC;QAAA,CAAC,EAAU,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,QAAQ,CAAC,CAAC,QAAQ,CAAC,EACxC;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
    },
  );
}
// What one `ReadingRow` draws, in the three positions it read the cell from: a
// prop, a text child, and a branch.
function readRow(row) {
  const [label, marker] = children(row);
  assert.ok(label !== undefined, "expected a label");
  return {
    size: fontSize(label),
    text: label.firstChild?.nodeValue,
    marked: marker !== undefined,
  };
}
describe("local state", () => {
  it("a child redraws everything it read of a cell it was handed", async () => {
    const view = await drawn(_jsx(ReadingPanel, {}));
    const [button, ...rows] = children(view);
    assert.ok(button !== undefined && rows.length === 2);
    // Nothing either row was given changes across the write — the same handle
    // object and the same id — so every assertion here is one the arguments
    // alone cannot answer. A prop, a text child, and a branch, per row.
    assert.deepEqual(rows.map(readRow), [
      { size: 20, text: "row 0 of 0", marked: true },
      { size: 16, text: "row 1 of 0", marked: false },
    ]);
    await userEvent.click(button);
    assert.deepEqual(rows.map(readRow), [
      { size: 16, text: "row 0 of 1", marked: false },
      { size: 20, text: "row 1 of 1", marked: true },
    ]);
  });
});
it("ReadingPanel", async (t) => {
  await snapshotCase(t, "ReadingPanel", _jsx(ReadingPanel, {}));
});
