import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A fragment a script writes: its children where it stands, and no node of its
// own — the same `Fragment` element the tree path writes for `<>`.
//
// And text as JSX reads it, which is not `trim()`. Across lines it is one
// sentence; on one line its spaces are its own; and the space between two
// expressions survives, where trimming would take it.
const listed = cs.create(
  "3pjkiwnta5gua:11:15",
  { params: [] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 11, column: 18 }, end: { line: 18, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 11, column: 19 }, end: { line: 11, column: 23 } },
        name: "name",
        key: "name$3pjkiwnta5gua$0",
      },
    ],
    body: {
      type: "JSXFragment",
      loc: { start: { line: 12, column: 2 }, end: { line: 17, column: 5 } },
      openingFragment: {
        type: "JSXOpeningFragment",
        loc: { start: { line: 12, column: 2 }, end: { line: 12, column: 4 } },
      },
      children: [
        {
          type: "JSXText",
          loc: { start: { line: 13, column: 4 }, end: { line: 13, column: 4 } },
          value: "\n    ",
          raw: "\n    ",
        },
        {
          type: "JSXElement",
          loc: {
            start: { line: 13, column: 4 },
            end: { line: 13, column: 40 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 13, column: 4 },
              end: { line: 13, column: 10 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 13, column: 5 },
                end: { line: 13, column: 9 },
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
                start: { line: 13, column: 10 },
                end: { line: 13, column: 33 },
              },
              value: "a sentence across lines",
              raw: "a sentence across lines",
            },
          ],
          closingElement: {
            type: "JSXClosingElement",
            loc: {
              start: { line: 13, column: 33 },
              end: { line: 13, column: 40 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 13, column: 35 },
                end: { line: 13, column: 39 },
              },
              name: "span",
            },
          },
        },
        {
          type: "JSXText",
          loc: { start: { line: 14, column: 4 }, end: { line: 14, column: 4 } },
          value: "\n    ",
          raw: "\n    ",
        },
        {
          type: "JSXElement",
          loc: {
            start: { line: 14, column: 4 },
            end: { line: 16, column: 11 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 14, column: 4 },
              end: { line: 14, column: 10 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 14, column: 5 },
                end: { line: 14, column: 9 },
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
                start: { line: 15, column: 6 },
                end: { line: 15, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 15, column: 6 },
                end: { line: 15, column: 12 },
              },
              expression: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 7 },
                  end: { line: 15, column: 11 },
                },
                name: "name",
                key: "name$3pjkiwnta5gua$0",
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 15, column: 13 },
                end: { line: 15, column: 13 },
              },
              value: " ",
              raw: " ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 15, column: 13 },
                end: { line: 15, column: 19 },
              },
              expression: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 14 },
                  end: { line: 15, column: 18 },
                },
                name: "name",
                key: "name$3pjkiwnta5gua$0",
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 16, column: 4 },
                end: { line: 16, column: 4 },
              },
              value: "\n    ",
              raw: "\n    ",
            },
          ],
          closingElement: {
            type: "JSXClosingElement",
            loc: {
              start: { line: 16, column: 4 },
              end: { line: 16, column: 11 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 16, column: 6 },
                end: { line: 16, column: 10 },
              },
              name: "span",
            },
          },
        },
        {
          type: "JSXText",
          loc: { start: { line: 17, column: 2 }, end: { line: 17, column: 2 } },
          value: "\n  ",
          raw: "\n  ",
        },
      ],
      closingFragment: {
        type: "JSXClosingFragment",
        loc: { start: { line: 17, column: 2 }, end: { line: 17, column: 5 } },
      },
    },
    expression: true,
  }),
  {
    code: "export default () => (name) => (<>\n    <span>a sentence across lines</span>\n    <span>\n      {name} {name}\n    </span>\n  </>);",
    map: '{"version":3,"file":"script-fragment.test.jsx","sourceRoot":"","sources":["script-fragment.test.tsx"],"names":[],"mappings":"eAUkB,MAAA,CAAC,IAAY,EAAE,EAAE,CAAC,CAClC,EACE;IAAA,CAAC,IAAI,CAAC,uBAAuB,EAAE,IAAI,CACnC;IAAA,CAAC,IAAI,CACH;MAAA,CAAC,IAAI,CAAE,CAAA,CAAC,IAAI,CACd;IAAA,EAAE,IAAI,CACR;EAAA,GAAG,CACJ"}',
  },
);
it("scriptFragment", async (t) => {
  await snapshotCase(
    t,
    "scriptFragment",
    _jsx("div", {
      children: cs.create(
        "3pjkiwnta5gua:21:48",
        { params: [{ kind: "splice", value: listed, bindings: [] }] },
        () => ({
          type: "CallExpression",
          loc: {
            start: { line: 21, column: 51 },
            end: { line: 21, column: 63 },
          },
          callee: {
            type: "Splice",
            loc: {
              start: { line: 21, column: 51 },
              end: { line: 21, column: 58 },
            },
            param: 0,
          },
          arguments: [
            {
              type: "Literal",
              loc: {
                start: { line: 21, column: 59 },
                end: { line: 21, column: 62 },
              },
              value: "x",
            },
          ],
          optional: false,
        }),
        {
          code: 'export default ($0) => $0()("x");',
          map: '{"version":3,"file":"script-fragment.test.jsx","sourceRoot":"","sources":["script-fragment.test.tsx"],"names":[],"mappings":"eAoBmD,QAAA,IAAO,CAAC,GAAG,CAAC"}',
        },
      ),
    }),
  );
});
