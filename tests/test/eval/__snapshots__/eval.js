import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, For } from "@backtickjs/core";
import { render } from "@backtickjs/web-testing";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle evaluated where a script stands, and used by its type: a drawing
// whose root is a list, placed as a child, and a number, added to.
async function Items() {
  return cs.create(
    "3crw4saj766qu:11:9",
    { params: [{ kind: "tag", value: For }] },
    () => ({
      type: "JSXElement",
      loc: { start: { line: 11, column: 12 }, end: { line: 13, column: 8 } },
      openingElement: {
        type: "JSXOpeningElement",
        loc: { start: { line: 11, column: 12 }, end: { line: 11, column: 34 } },
        name: {
          type: "JSXIdentifier",
          loc: {
            start: { line: 11, column: 13 },
            end: { line: 11, column: 16 },
          },
          name: "For",
          param: 0,
        },
        attributes: [
          {
            type: "JSXAttribute",
            loc: {
              start: { line: 11, column: 17 },
              end: { line: 11, column: 33 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 11, column: 17 },
                end: { line: 11, column: 21 },
              },
              name: "each",
            },
            value: {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 11, column: 22 },
                end: { line: 11, column: 33 },
              },
              expression: {
                type: "ArrayExpression",
                loc: {
                  start: { line: 11, column: 23 },
                  end: { line: 11, column: 32 },
                },
                elements: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 11, column: 24 },
                      end: { line: 11, column: 25 },
                    },
                    value: 1,
                  },
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 11, column: 27 },
                      end: { line: 11, column: 28 },
                    },
                    value: 2,
                  },
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 11, column: 30 },
                      end: { line: 11, column: 31 },
                    },
                    value: 3,
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
          loc: { start: { line: 12, column: 4 }, end: { line: 12, column: 4 } },
          value: "\n    ",
          raw: "\n    ",
        },
        {
          type: "JSXExpressionContainer",
          loc: {
            start: { line: 12, column: 4 },
            end: { line: 12, column: 47 },
          },
          expression: {
            type: "ArrowFunctionExpression",
            loc: {
              start: { line: 12, column: 5 },
              end: { line: 12, column: 46 },
            },
            params: [
              {
                type: "Identifier",
                loc: {
                  start: { line: 12, column: 6 },
                  end: { line: 12, column: 7 },
                },
                name: "n",
                key: "n$3crw4saj766qu$0",
              },
            ],
            body: {
              type: "JSXElement",
              loc: {
                start: { line: 12, column: 20 },
                end: { line: 12, column: 46 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 12, column: 20 },
                  end: { line: 12, column: 26 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 12, column: 21 },
                    end: { line: 12, column: 25 },
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
                    start: { line: 12, column: 26 },
                    end: { line: 12, column: 39 },
                  },
                  expression: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 12, column: 27 },
                      end: { line: 12, column: 38 },
                    },
                    operator: "+",
                    left: {
                      type: "Literal",
                      loc: {
                        start: { line: 12, column: 27 },
                        end: { line: 12, column: 34 },
                      },
                      value: "item ",
                    },
                    right: {
                      type: "Identifier",
                      loc: {
                        start: { line: 12, column: 37 },
                        end: { line: 12, column: 38 },
                      },
                      name: "n",
                      key: "n$3crw4saj766qu$0",
                    },
                  },
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 12, column: 39 },
                  end: { line: 12, column: 46 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 12, column: 41 },
                    end: { line: 12, column: 45 },
                  },
                  name: "span",
                },
              },
            },
            expression: true,
          },
        },
        {
          type: "JSXText",
          loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 2 } },
          value: "\n  ",
          raw: "\n  ",
        },
      ],
      closingElement: {
        type: "JSXClosingElement",
        loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 8 } },
        name: {
          type: "JSXIdentifier",
          loc: { start: { line: 13, column: 4 }, end: { line: 13, column: 7 } },
          name: "For",
        },
      },
    }),
    '$0 => <$0 each={[1, 2, 3]}>\n    {(n) => <span>{"item " + n}</span>}\n  </$0>',
    '{"version":3,"file":"eval.test.jsx","sourceRoot":"","sources":["eval.test.tsx"],"names":[],"mappings":"AAUY,MAAA,CAAC,EAAG,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC,CAC7B;IAAA,CAAC,CAAC,CAAS,EAAE,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,OAAO,GAAG,CAAC,CAAC,EAAE,IAAI,CAAC,CAC5C;EAAA,EAAE,EAAG,CAAC,CAAA"}',
  );
}
const items = await bundler.run(_jsx(Items, {}));
const total = await bundler.run(41);
const evaluated = cs.create(
  "3crw4saj766qu:19:18",
  {
    params: [
      { kind: "splice", value: items, bindings: [] },
      { kind: "splice", value: total, bindings: [] },
    ],
  },
  () => ({
    type: "JSXElement",
    loc: { start: { line: 19, column: 21 }, end: { line: 22, column: 6 } },
    openingElement: {
      type: "JSXOpeningElement",
      loc: { start: { line: 19, column: 21 }, end: { line: 19, column: 26 } },
      name: {
        type: "JSXIdentifier",
        loc: { start: { line: 19, column: 22 }, end: { line: 19, column: 25 } },
        name: "div",
      },
      attributes: [],
      selfClosing: false,
    },
    children: [
      {
        type: "JSXText",
        loc: { start: { line: 20, column: 2 }, end: { line: 20, column: 2 } },
        value: "\n  ",
        raw: "\n  ",
      },
      {
        type: "JSXExpressionContainer",
        loc: { start: { line: 20, column: 2 }, end: { line: 20, column: 16 } },
        expression: {
          type: "CallExpression",
          loc: {
            start: { line: 20, column: 3 },
            end: { line: 20, column: 15 },
          },
          callee: {
            type: "Identifier",
            loc: {
              start: { line: 20, column: 3 },
              end: { line: 20, column: 7 },
            },
            name: "eval",
          },
          arguments: [
            {
              type: "Splice",
              loc: {
                start: { line: 20, column: 8 },
                end: { line: 20, column: 14 },
              },
              param: 0,
            },
          ],
          optional: false,
        },
      },
      {
        type: "JSXText",
        loc: { start: { line: 21, column: 2 }, end: { line: 21, column: 2 } },
        value: "\n  ",
        raw: "\n  ",
      },
      {
        type: "JSXElement",
        loc: { start: { line: 21, column: 2 }, end: { line: 21, column: 27 } },
        openingElement: {
          type: "JSXOpeningElement",
          loc: { start: { line: 21, column: 2 }, end: { line: 21, column: 5 } },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 21, column: 3 },
              end: { line: 21, column: 4 },
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
              start: { line: 21, column: 5 },
              end: { line: 21, column: 23 },
            },
            expression: {
              type: "BinaryExpression",
              loc: {
                start: { line: 21, column: 6 },
                end: { line: 21, column: 22 },
              },
              operator: "+",
              left: {
                type: "CallExpression",
                loc: {
                  start: { line: 21, column: 6 },
                  end: { line: 21, column: 18 },
                },
                callee: {
                  type: "Identifier",
                  loc: {
                    start: { line: 21, column: 6 },
                    end: { line: 21, column: 10 },
                  },
                  name: "eval",
                },
                arguments: [
                  {
                    type: "Splice",
                    loc: {
                      start: { line: 21, column: 11 },
                      end: { line: 21, column: 17 },
                    },
                    param: 1,
                  },
                ],
                optional: false,
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 21, column: 21 },
                  end: { line: 21, column: 22 },
                },
                value: 1,
              },
            },
          },
        ],
        closingElement: {
          type: "JSXClosingElement",
          loc: {
            start: { line: 21, column: 23 },
            end: { line: 21, column: 27 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 21, column: 25 },
              end: { line: 21, column: 26 },
            },
            name: "b",
          },
        },
      },
      {
        type: "JSXText",
        loc: { start: { line: 22, column: 0 }, end: { line: 22, column: 0 } },
        value: "\n",
        raw: "\n",
      },
    ],
    closingElement: {
      type: "JSXClosingElement",
      loc: { start: { line: 22, column: 0 }, end: { line: 22, column: 6 } },
      name: {
        type: "JSXIdentifier",
        loc: { start: { line: 22, column: 2 }, end: { line: 22, column: 5 } },
        name: "div",
      },
    },
  }),
  "($0, $1) => <div>\n  {eval($0())}\n  <b>{eval($1()) + 1}</b>\n</div>",
  '{"version":3,"file":"eval.test.jsx","sourceRoot":"","sources":["eval.test.tsx"],"names":[],"mappings":"AAkBqB,YAAA,CAAC,GAAG,CACvB;EAAA,CAAC,IAAI,CAAC,IAAM,CAAC,CACb;EAAA,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,IAAM,CAAC,GAAG,CAAC,CAAC,EAAE,CAAC,CAC1B;AAAA,EAAE,GAAG,CAAC,CAAA"}',
);
it("eval", async (t) => {
  await snapshotCase(t, "eval", evaluated);
});
describe("a bundle a script runs with eval", () => {
  it("draws one whose root is a <For />, and answers one that is a value", async () => {
    const { container } = await render(evaluated);
    const div = container.firstElementChild;
    assert.deepEqual(
      [...div.childNodes].map((child) => child.textContent),
      ["item 1", "item 2", "item 3", "42"],
    );
  });
});
