import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn } from "./dom.ts";
// A list whose every row reads the cell the selection is held in. A write
// re-runs the `href` of all three rows and moves it on two of them — the row
// selected, and the row that no longer is. The third recomputes the href it
// already had, and the host must not hear about it.
async function SelectableRows() {
  return cs.create(
    "2i3sz19b0mqz4:13:9",
    {
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 13, column: 12 }, end: { line: 29, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 14, column: 4 },
            end: { line: 14, column: 31 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 14, column: 10 },
                end: { line: 14, column: 30 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 10 },
                  end: { line: 14, column: 18 },
                },
                name: "selected",
                key: "selected$2i3sz19b0mqz4$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 14, column: 21 },
                  end: { line: 14, column: 30 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 14, column: 21 },
                    end: { line: 14, column: 27 },
                  },
                  key: "$state",
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 14, column: 28 },
                      end: { line: 14, column: 29 },
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
          loc: { start: { line: 15, column: 4 }, end: { line: 28, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 16, column: 6 },
              end: { line: 27, column: 12 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 16, column: 6 },
                end: { line: 16, column: 11 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 16, column: 7 },
                  end: { line: 16, column: 10 },
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
                  start: { line: 17, column: 8 },
                  end: { line: 17, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 17, column: 8 },
                  end: { line: 17, column: 59 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 17, column: 8 },
                    end: { line: 17, column: 46 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 17, column: 9 },
                      end: { line: 17, column: 13 },
                    },
                    name: "span",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 17, column: 14 },
                        end: { line: 17, column: 45 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 17, column: 14 },
                          end: { line: 17, column: 21 },
                        },
                        name: "onclick",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 17, column: 22 },
                          end: { line: 17, column: 45 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 17, column: 23 },
                            end: { line: 17, column: 44 },
                          },
                          params: [],
                          body: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 17, column: 29 },
                              end: { line: 17, column: 44 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 17, column: 29 },
                                end: { line: 17, column: 41 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 17, column: 29 },
                                  end: { line: 17, column: 37 },
                                },
                                name: "selected",
                                key: "selected$2i3sz19b0mqz4$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 17, column: 38 },
                                  end: { line: 17, column: 41 },
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
                                  start: { line: 17, column: 42 },
                                  end: { line: 17, column: 43 },
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
                      start: { line: 17, column: 46 },
                      end: { line: 17, column: 52 },
                    },
                    value: "select",
                    raw: "select",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 17, column: 52 },
                    end: { line: 17, column: 59 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 17, column: 54 },
                      end: { line: 17, column: 58 },
                    },
                    name: "span",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 18, column: 8 },
                  end: { line: 18, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 18, column: 8 },
                  end: { line: 26, column: 14 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 18, column: 8 },
                    end: { line: 18, column: 13 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 18, column: 9 },
                      end: { line: 18, column: 12 },
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
                      start: { line: 19, column: 10 },
                      end: { line: 19, column: 10 },
                    },
                    value: "\n          ",
                    raw: "\n          ",
                  },
                  {
                    type: "JSXElement",
                    loc: {
                      start: { line: 19, column: 10 },
                      end: { line: 25, column: 16 },
                    },
                    openingElement: {
                      type: "JSXOpeningElement",
                      loc: {
                        start: { line: 19, column: 10 },
                        end: { line: 19, column: 32 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 19, column: 11 },
                          end: { line: 19, column: 14 },
                        },
                        name: "For",
                      },
                      attributes: [
                        {
                          type: "JSXAttribute",
                          loc: {
                            start: { line: 19, column: 15 },
                            end: { line: 19, column: 31 },
                          },
                          name: {
                            type: "JSXIdentifier",
                            loc: {
                              start: { line: 19, column: 15 },
                              end: { line: 19, column: 19 },
                            },
                            name: "each",
                          },
                          value: {
                            type: "JSXExpressionContainer",
                            loc: {
                              start: { line: 19, column: 20 },
                              end: { line: 19, column: 31 },
                            },
                            expression: {
                              type: "ArrayExpression",
                              loc: {
                                start: { line: 19, column: 21 },
                                end: { line: 19, column: 30 },
                              },
                              elements: [
                                {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 19, column: 22 },
                                    end: { line: 19, column: 23 },
                                  },
                                  value: 0,
                                },
                                {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 19, column: 25 },
                                    end: { line: 19, column: 26 },
                                  },
                                  value: 1,
                                },
                                {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 19, column: 28 },
                                    end: { line: 19, column: 29 },
                                  },
                                  value: 2,
                                },
                              ],
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
                          start: { line: 20, column: 12 },
                          end: { line: 20, column: 12 },
                        },
                        value: "\n            ",
                        raw: "\n            ",
                      },
                      {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 20, column: 12 },
                          end: { line: 24, column: 14 },
                        },
                        expression: {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 20, column: 13 },
                            end: { line: 24, column: 13 },
                          },
                          params: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 20, column: 14 },
                                end: { line: 20, column: 16 },
                              },
                              name: "id",
                              key: "id$2i3sz19b0mqz4$1",
                            },
                          ],
                          body: {
                            type: "JSXElement",
                            loc: {
                              start: { line: 21, column: 14 },
                              end: { line: 23, column: 18 },
                            },
                            openingElement: {
                              type: "JSXOpeningElement",
                              loc: {
                                start: { line: 21, column: 14 },
                                end: { line: 21, column: 68 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 21, column: 15 },
                                  end: { line: 21, column: 16 },
                                },
                                name: "a",
                              },
                              attributes: [
                                {
                                  type: "JSXAttribute",
                                  loc: {
                                    start: { line: 21, column: 17 },
                                    end: { line: 21, column: 67 },
                                  },
                                  name: {
                                    type: "JSXIdentifier",
                                    loc: {
                                      start: { line: 21, column: 17 },
                                      end: { line: 21, column: 21 },
                                    },
                                    name: "href",
                                  },
                                  value: {
                                    type: "JSXExpressionContainer",
                                    loc: {
                                      start: { line: 21, column: 22 },
                                      end: { line: 21, column: 67 },
                                    },
                                    expression: {
                                      type: "ConditionalExpression",
                                      loc: {
                                        start: { line: 21, column: 23 },
                                        end: { line: 21, column: 66 },
                                      },
                                      test: {
                                        type: "BinaryExpression",
                                        loc: {
                                          start: { line: 21, column: 23 },
                                          end: { line: 21, column: 44 },
                                        },
                                        operator: "===",
                                        left: {
                                          type: "CallExpression",
                                          loc: {
                                            start: { line: 21, column: 23 },
                                            end: { line: 21, column: 37 },
                                          },
                                          callee: {
                                            type: "MemberExpression",
                                            loc: {
                                              start: { line: 21, column: 23 },
                                              end: { line: 21, column: 35 },
                                            },
                                            object: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 21, column: 23 },
                                                end: { line: 21, column: 31 },
                                              },
                                              name: "selected",
                                              key: "selected$2i3sz19b0mqz4$0",
                                            },
                                            property: {
                                              type: "Identifier",
                                              loc: {
                                                start: { line: 21, column: 32 },
                                                end: { line: 21, column: 35 },
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
                                          type: "Identifier",
                                          loc: {
                                            start: { line: 21, column: 42 },
                                            end: { line: 21, column: 44 },
                                          },
                                          name: "id",
                                          key: "id$2i3sz19b0mqz4$1",
                                        },
                                      },
                                      consequent: {
                                        type: "Literal",
                                        loc: {
                                          start: { line: 21, column: 47 },
                                          end: { line: 21, column: 54 },
                                        },
                                        value: "#open",
                                      },
                                      alternate: {
                                        type: "Literal",
                                        loc: {
                                          start: { line: 21, column: 57 },
                                          end: { line: 21, column: 66 },
                                        },
                                        value: "#closed",
                                      },
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
                                  start: { line: 22, column: 16 },
                                  end: { line: 22, column: 16 },
                                },
                                value: "\n                ",
                                raw: "\n                ",
                              },
                              {
                                type: "JSXExpressionContainer",
                                loc: {
                                  start: { line: 22, column: 16 },
                                  end: { line: 22, column: 29 },
                                },
                                expression: {
                                  type: "BinaryExpression",
                                  loc: {
                                    start: { line: 22, column: 17 },
                                    end: { line: 22, column: 28 },
                                  },
                                  operator: "+",
                                  left: {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 22, column: 17 },
                                      end: { line: 22, column: 23 },
                                    },
                                    value: "row ",
                                  },
                                  right: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 22, column: 26 },
                                      end: { line: 22, column: 28 },
                                    },
                                    name: "id",
                                    key: "id$2i3sz19b0mqz4$1",
                                  },
                                },
                              },
                              {
                                type: "JSXText",
                                loc: {
                                  start: { line: 23, column: 14 },
                                  end: { line: 23, column: 14 },
                                },
                                value: "\n              ",
                                raw: "\n              ",
                              },
                            ],
                            closingElement: {
                              type: "JSXClosingElement",
                              loc: {
                                start: { line: 23, column: 14 },
                                end: { line: 23, column: 18 },
                              },
                              name: {
                                type: "JSXIdentifier",
                                loc: {
                                  start: { line: 23, column: 16 },
                                  end: { line: 23, column: 17 },
                                },
                                name: "a",
                              },
                            },
                          },
                          expression: true,
                        },
                      },
                      {
                        type: "JSXText",
                        loc: {
                          start: { line: 25, column: 10 },
                          end: { line: 25, column: 10 },
                        },
                        value: "\n          ",
                        raw: "\n          ",
                      },
                    ],
                    closingElement: {
                      type: "JSXClosingElement",
                      loc: {
                        start: { line: 25, column: 10 },
                        end: { line: 25, column: 16 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 25, column: 12 },
                          end: { line: 25, column: 15 },
                        },
                        name: "For",
                      },
                    },
                  },
                  {
                    type: "JSXText",
                    loc: {
                      start: { line: 26, column: 8 },
                      end: { line: 26, column: 8 },
                    },
                    value: "\n        ",
                    raw: "\n        ",
                  },
                ],
                closingElement: {
                  type: "JSXClosingElement",
                  loc: {
                    start: { line: 26, column: 8 },
                    end: { line: 26, column: 14 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 26, column: 10 },
                      end: { line: 26, column: 13 },
                    },
                    name: "div",
                  },
                },
              },
              {
                type: "JSXText",
                loc: {
                  start: { line: 27, column: 6 },
                  end: { line: 27, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 27, column: 6 },
                end: { line: 27, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 27, column: 8 },
                  end: { line: 27, column: 11 },
                },
                name: "div",
              },
            },
          },
        },
      ],
    }),
    '($0, $1) => {\n    const selected = $0()(0);\n    return (<div>\n        <span onclick={() => selected.set(1)}>select</span>\n        <div>\n          <$1 each={[0, 1, 2]}>\n            {(id) => (<a href={selected.get() === id ? "#open" : "#closed"}>\n                {"row " + id}\n              </a>)}\n          </$1>\n        </div>\n      </div>);\n}',
    '{"version":3,"file":"unmoved-prop.test.jsx","sourceRoot":"","sources":["unmoved-prop.test.tsx"],"names":[],"mappings":"AAYY;IACR,MAAM,QAAQ,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IAC3B,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,CAAC,QAAQ,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,EAAE,IAAI,CAClD;QAAA,CAAC,GAAG,CACF;UAAA,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CACnB;YAAA,CAAC,CAAC,EAAU,EAAE,EAAE,CAAC,CACf,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,QAAQ,CAAC,GAAG,EAAE,KAAK,EAAE,CAAC,CAAC,CAAC,OAAO,CAAC,CAAC,CAAC,SAAS,CAAC,CACnD;gBAAA,CAAC,MAAM,GAAG,EAAE,CACd;cAAA,EAAE,CAAC,CAAC,CACL,CACH;UAAA,EAAE,EAAG,CACP;QAAA,EAAE,GAAG,CACP;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC,CAAA"}',
  );
}
describe("local state", () => {
  // A prop re-runs when something it read was written, which is not the same as
  // holding anything new: a cell a whole list reads decides one row's prop, and
  // every other row recomputes the value it already had. The host hears about
  // the two that moved and nothing else — a write per row per selection is what
  // a list of any size would otherwise cost.
  it("a prop that recomputed to what it held is not set again", async () => {
    const view = await drawn(_jsx(SelectableRows, {}));
    const [select, list] = children(view);
    assert.ok(select !== undefined && list !== undefined);
    // What the drawing wrote, watched the way a page watches itself: an
    // observer reports a write even where what it wrote is what the attribute
    // already held, which is the whole question here. Records are kept as
    // they arrive, since a click is awaited and the observer reports meanwhile.
    const records = [];
    const watching = new MutationObserver((arrived) =>
      records.push(...arrived),
    );
    watching.observe(view, { attributes: true, subtree: true });
    const written = () =>
      [...records.splice(0), ...watching.takeRecords()].map((record) => [
        [...list.children].indexOf(record.target),
        record.attributeName,
        record.target.getAttribute(record.attributeName),
      ]);
    const href = () =>
      [...list.children].map((row) => row.getAttribute("href"));
    assert.deepEqual(href(), ["#open", "#closed", "#closed"]);
    written();
    await userEvent.click(select);
    assert.deepEqual(href(), ["#closed", "#open", "#closed"]);
    // The row that was selected and the row now selected, in the order they
    // were built. The third row read the cell too, and had nothing to say.
    assert.deepEqual(written(), [
      [0, "href", "#closed"],
      [1, "href", "#open"],
    ]);
  });
});
it("SelectableRows", async (t) => {
  await snapshotCase(t, "SelectableRows", _jsx(SelectableRows, {}));
});
