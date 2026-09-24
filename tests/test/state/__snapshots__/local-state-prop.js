import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
// A cell crossing a component boundary: declared once by the script that draws
// the pair, handed to each child as a prop, so both read one storage. The cell
// is an ordinary client value — the prop takes it the way it takes any other —
// which is what makes a write through either child reach the same storage.
const SharedCounter = async ({ size }) =>
  _jsx("span", {
    style: cs.create(
      { start: { line: 15, column: 11 }, end: { line: 15, column: 49 } },
      {
        fileHash: "1myb4rrcna327",
        splices: { $size: { value: size, params: [] } },
        captures: [],
      },
      () => ({
        type: "BinaryExpression",
        loc: { start: { line: 15, column: 14 }, end: { line: 15, column: 48 } },
        operator: "+",
        left: {
          type: "BinaryExpression",
          loc: {
            start: { line: 15, column: 14 },
            end: { line: 15, column: 41 },
          },
          operator: "+",
          left: {
            type: "Literal",
            loc: {
              start: { line: 15, column: 14 },
              end: { line: 15, column: 27 },
            },
            value: "font-size: ",
          },
          right: {
            type: "CallExpression",
            loc: {
              start: { line: 15, column: 30 },
              end: { line: 15, column: 41 },
            },
            callee: {
              type: "MemberExpression",
              loc: {
                start: { line: 15, column: 30 },
                end: { line: 15, column: 39 },
              },
              object: {
                type: "Splice",
                loc: {
                  start: { line: 15, column: 30 },
                  end: { line: 15, column: 35 },
                },
                key: "$size",
              },
              property: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 36 },
                  end: { line: 15, column: 39 },
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
            start: { line: 15, column: 44 },
            end: { line: 15, column: 48 },
          },
          value: "px",
        },
      }),
      '$0 => "font-size: " + $0().get() + "px"',
      '{"version":3,"file":"local-state-prop.test.jsx","sourceRoot":"","sources":["local-state-prop.test.tsx"],"names":[],"mappings":"AAcc,MAAA,aAAa,GAAG,IAAK,CAAC,GAAG,EAAE,GAAG,IAAI,CAAA"}',
    ),
    onclick: cs.create(
      { start: { line: 16, column: 13 }, end: { line: 18, column: 6 } },
      {
        fileHash: "1myb4rrcna327",
        splices: { $size: { value: size, params: [] } },
        captures: [],
      },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 16, column: 16 }, end: { line: 18, column: 5 } },
        params: [],
        body: {
          type: "BlockStatement",
          loc: {
            start: { line: 16, column: 22 },
            end: { line: 18, column: 5 },
          },
          body: [
            {
              type: "ExpressionStatement",
              loc: {
                start: { line: 17, column: 6 },
                end: { line: 17, column: 33 },
              },
              expression: {
                type: "CallExpression",
                loc: {
                  start: { line: 17, column: 6 },
                  end: { line: 17, column: 32 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 17, column: 6 },
                    end: { line: 17, column: 15 },
                  },
                  object: {
                    type: "Splice",
                    loc: {
                      start: { line: 17, column: 6 },
                      end: { line: 17, column: 11 },
                    },
                    key: "$size",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 12 },
                      end: { line: 17, column: 15 },
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
                      start: { line: 17, column: 16 },
                      end: { line: 17, column: 31 },
                    },
                    operator: "+",
                    left: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 17, column: 16 },
                        end: { line: 17, column: 27 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 17, column: 16 },
                          end: { line: 17, column: 25 },
                        },
                        object: {
                          type: "Splice",
                          loc: {
                            start: { line: 17, column: 16 },
                            end: { line: 17, column: 21 },
                          },
                          key: "$size",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 17, column: 22 },
                            end: { line: 17, column: 25 },
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
                        start: { line: 17, column: 30 },
                        end: { line: 17, column: 31 },
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
      }),
      "$0 => () => {\n    $0().set($0().get() + 1);\n}",
      '{"version":3,"file":"local-state-prop.test.jsx","sourceRoot":"","sources":["local-state-prop.test.tsx"],"names":[],"mappings":"AAegB,MAAA,GAAG,EAAE;IACf,IAAK,CAAC,GAAG,CAAC,IAAK,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC;AAC7B,CAAC,CAAA"}',
    ),
    children: "press",
  });
async function SharingPanel() {
  return cs.create(
    { start: { line: 25, column: 9 }, end: { line: 33, column: 4 } },
    {
      fileHash: "1myb4rrcna327",
      splices: {
        $state: { value: state, params: [] },
        $SharedCounter: { value: SharedCounter, params: [] },
      },
      captures: [],
    },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 25, column: 12 }, end: { line: 33, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 26, column: 4 },
            end: { line: 26, column: 28 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 26, column: 10 },
                end: { line: 26, column: 27 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 26, column: 10 },
                  end: { line: 26, column: 14 },
                },
                name: "size",
                key: "size$1myb4rrcna327$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 26, column: 17 },
                  end: { line: 26, column: 27 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 26, column: 17 },
                    end: { line: 26, column: 23 },
                  },
                  key: "$state",
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 26, column: 24 },
                      end: { line: 26, column: 26 },
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
          loc: { start: { line: 27, column: 4 }, end: { line: 32, column: 6 } },
          argument: {
            type: "JSXElement",
            loc: {
              start: { line: 28, column: 6 },
              end: { line: 31, column: 12 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 28, column: 6 },
                end: { line: 28, column: 11 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 28, column: 7 },
                  end: { line: 28, column: 10 },
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
                  start: { line: 29, column: 8 },
                  end: { line: 29, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 29, column: 8 },
                  end: { line: 29, column: 37 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 29, column: 8 },
                    end: { line: 29, column: 37 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 29, column: 9 },
                      end: { line: 29, column: 22 },
                    },
                    name: "SharedCounter",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 29, column: 23 },
                        end: { line: 29, column: 34 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 29, column: 23 },
                          end: { line: 29, column: 27 },
                        },
                        name: "size",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 29, column: 28 },
                          end: { line: 29, column: 34 },
                        },
                        expression: {
                          type: "Identifier",
                          loc: {
                            start: { line: 29, column: 29 },
                            end: { line: 29, column: 33 },
                          },
                          name: "size",
                          key: "size$1myb4rrcna327$0",
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
                  start: { line: 30, column: 8 },
                  end: { line: 30, column: 8 },
                },
                value: "\n        ",
                raw: "\n        ",
              },
              {
                type: "JSXElement",
                loc: {
                  start: { line: 30, column: 8 },
                  end: { line: 30, column: 37 },
                },
                openingElement: {
                  type: "JSXOpeningElement",
                  loc: {
                    start: { line: 30, column: 8 },
                    end: { line: 30, column: 37 },
                  },
                  name: {
                    type: "JSXIdentifier",
                    loc: {
                      start: { line: 30, column: 9 },
                      end: { line: 30, column: 22 },
                    },
                    name: "SharedCounter",
                  },
                  attributes: [
                    {
                      type: "JSXAttribute",
                      loc: {
                        start: { line: 30, column: 23 },
                        end: { line: 30, column: 34 },
                      },
                      name: {
                        type: "JSXIdentifier",
                        loc: {
                          start: { line: 30, column: 23 },
                          end: { line: 30, column: 27 },
                        },
                        name: "size",
                      },
                      value: {
                        type: "JSXExpressionContainer",
                        loc: {
                          start: { line: 30, column: 28 },
                          end: { line: 30, column: 34 },
                        },
                        expression: {
                          type: "Identifier",
                          loc: {
                            start: { line: 30, column: 29 },
                            end: { line: 30, column: 33 },
                          },
                          name: "size",
                          key: "size$1myb4rrcna327$0",
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
                  start: { line: 31, column: 6 },
                  end: { line: 31, column: 6 },
                },
                value: "\n      ",
                raw: "\n      ",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 31, column: 6 },
                end: { line: 31, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 31, column: 8 },
                  end: { line: 31, column: 11 },
                },
                name: "div",
              },
            },
          },
        },
      ],
    }),
    "($0, $1) => {\n    const size = $0()(16);\n    return (<div>\n        <$1 size={size}/>\n        <$1 size={size}/>\n      </div>);\n}",
    '{"version":3,"file":"local-state-prop.test.jsx","sourceRoot":"","sources":["local-state-prop.test.tsx"],"names":[],"mappings":"AAwBY;IACR,MAAM,IAAI,GAAG,IAAM,CAAC,EAAE,CAAC,CAAC;IACxB,OAAO,CACL,CAAC,GAAG,CACF;QAAA,CAAC,EAAa,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,EAC1B;QAAA,CAAC,EAAa,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,EAC5B;MAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC,CAAA"}',
  );
}
describe("local state", () => {
  it("a cell passed as a prop is one storage, shared by both children", async () => {
    const view = await drawn(_jsx(SharingPanel, {}));
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    // The parent declared the cell and handed it to both, so a write through
    // one child's handle moves the other's display too.
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 17);
  });
});
it("SharingPanel", async (t) => {
  await snapshotCase(t, "SharingPanel", _jsx(SharingPanel, {}));
});
