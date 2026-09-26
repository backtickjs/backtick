import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle evaluated among siblings. What it draws goes where the call stands,
// and nothing of its own does: the spans either side keep their order.
async function Other() {
  return cs.create(
    "1re1jas6fqiey:9:9",
    { params: [] },
    () => ({
      type: "JSXElement",
      loc: { start: { line: 9, column: 12 }, end: { line: 9, column: 44 } },
      openingElement: {
        type: "JSXOpeningElement",
        loc: { start: { line: 9, column: 12 }, end: { line: 9, column: 16 } },
        name: {
          type: "JSXIdentifier",
          loc: { start: { line: 9, column: 13 }, end: { line: 9, column: 15 } },
          name: "em",
        },
        attributes: [],
        selfClosing: false,
      },
      children: [
        {
          type: "JSXExpressionContainer",
          loc: { start: { line: 9, column: 16 }, end: { line: 9, column: 39 } },
          expression: {
            type: "Literal",
            loc: {
              start: { line: 9, column: 17 },
              end: { line: 9, column: 38 },
            },
            value: "from another bundle",
          },
        },
      ],
      closingElement: {
        type: "JSXClosingElement",
        loc: { start: { line: 9, column: 39 }, end: { line: 9, column: 44 } },
        name: {
          type: "JSXIdentifier",
          loc: { start: { line: 9, column: 41 }, end: { line: 9, column: 43 } },
          name: "em",
        },
      },
    }),
    {
      code: 'export default () => <em>{"from another bundle"}</em>;',
      map: '{"version":3,"file":"eval-siblings.test.jsx","sourceRoot":"","sources":["eval-siblings.test.tsx"],"names":[],"mappings":"eAQY,MAAA,CAAC,EAAE,CAAC,CAAC,qBAAqB,CAAC,EAAE,EAAE,CAAC"}',
    },
  );
}
const otherBundle = await bundler.run(_jsx(Other, {}));
it("evalSiblings", async (t) => {
  await snapshotCase(
    t,
    "evalSiblings",
    cs.create(
      "1re1jas6fqiey:18:4",
      { params: [{ kind: "splice", value: otherBundle, bindings: [] }] },
      () => ({
        type: "JSXElement",
        loc: { start: { line: 18, column: 7 }, end: { line: 22, column: 10 } },
        openingElement: {
          type: "JSXOpeningElement",
          loc: {
            start: { line: 18, column: 7 },
            end: { line: 18, column: 12 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 18, column: 8 },
              end: { line: 18, column: 11 },
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
              start: { line: 19, column: 6 },
              end: { line: 19, column: 6 },
            },
            value: "\n      ",
            raw: "\n      ",
          },
          {
            type: "JSXElement",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 19, column: 25 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 19, column: 6 },
                end: { line: 19, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 19, column: 7 },
                  end: { line: 19, column: 11 },
                },
                name: "span",
              },
              attributes: [],
              selfClosing: false,
            },
            children: [
              {
                type: "JSXText",
                loc: {
                  start: { line: 19, column: 12 },
                  end: { line: 19, column: 18 },
                },
                value: "before",
                raw: "before",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 19, column: 18 },
                end: { line: 19, column: 25 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 19, column: 20 },
                  end: { line: 19, column: 24 },
                },
                name: "span",
              },
            },
          },
          {
            type: "JSXText",
            loc: {
              start: { line: 20, column: 6 },
              end: { line: 20, column: 6 },
            },
            value: "\n      ",
            raw: "\n      ",
          },
          {
            type: "JSXExpressionContainer",
            loc: {
              start: { line: 20, column: 6 },
              end: { line: 20, column: 26 },
            },
            expression: {
              type: "CallExpression",
              loc: {
                start: { line: 20, column: 7 },
                end: { line: 20, column: 25 },
              },
              callee: {
                type: "Identifier",
                loc: {
                  start: { line: 20, column: 7 },
                  end: { line: 20, column: 11 },
                },
                name: "eval",
              },
              arguments: [
                {
                  type: "Splice",
                  loc: {
                    start: { line: 20, column: 12 },
                    end: { line: 20, column: 24 },
                  },
                  param: 0,
                },
              ],
              optional: false,
            },
          },
          {
            type: "JSXText",
            loc: {
              start: { line: 21, column: 6 },
              end: { line: 21, column: 6 },
            },
            value: "\n      ",
            raw: "\n      ",
          },
          {
            type: "JSXElement",
            loc: {
              start: { line: 21, column: 6 },
              end: { line: 21, column: 24 },
            },
            openingElement: {
              type: "JSXOpeningElement",
              loc: {
                start: { line: 21, column: 6 },
                end: { line: 21, column: 12 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 21, column: 7 },
                  end: { line: 21, column: 11 },
                },
                name: "span",
              },
              attributes: [],
              selfClosing: false,
            },
            children: [
              {
                type: "JSXText",
                loc: {
                  start: { line: 21, column: 12 },
                  end: { line: 21, column: 17 },
                },
                value: "after",
                raw: "after",
              },
            ],
            closingElement: {
              type: "JSXClosingElement",
              loc: {
                start: { line: 21, column: 17 },
                end: { line: 21, column: 24 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 21, column: 19 },
                  end: { line: 21, column: 23 },
                },
                name: "span",
              },
            },
          },
          {
            type: "JSXText",
            loc: {
              start: { line: 22, column: 4 },
              end: { line: 22, column: 4 },
            },
            value: "\n    ",
            raw: "\n    ",
          },
        ],
        closingElement: {
          type: "JSXClosingElement",
          loc: {
            start: { line: 22, column: 4 },
            end: { line: 22, column: 10 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 22, column: 6 },
              end: { line: 22, column: 9 },
            },
            name: "div",
          },
        },
      }),
      {
        code: "export default ($0) => <div>\n      <span>before</span>\n      {eval($0())}\n      <span>after</span>\n    </div>;",
        map: '{"version":3,"file":"eval-siblings.test.jsx","sourceRoot":"","sources":["eval-siblings.test.tsx"],"names":[],"mappings":"eAiBO,QAAA,CAAC,GAAG,CACL;MAAA,CAAC,IAAI,CAAC,MAAM,EAAE,IAAI,CAClB;MAAA,CAAC,IAAI,CAAC,IAAY,CAAC,CACnB;MAAA,CAAC,IAAI,CAAC,KAAK,EAAE,IAAI,CACnB;IAAA,EAAE,GAAG,CAAC"}',
      },
    ),
  );
});
