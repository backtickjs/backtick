import { cs } from "@backtickjs/core";
// A component tag naming a binding the script holds calls it, so what the
// binding holds has to be a function: `Tag` here is a number.
// @ts-expect-error: JSX element type 'Tag' does not have any construct or call signatures.
const held = cs.create(
  "xwewmj2gozc5:6:13",
  { params: [] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 6, column: 16 }, end: { line: 6, column: 40 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 6, column: 17 }, end: { line: 6, column: 20 } },
        name: "Tag",
        key: "Tag$xwewmj2gozc5$0",
      },
    ],
    body: {
      type: "JSXElement",
      loc: { start: { line: 6, column: 33 }, end: { line: 6, column: 40 } },
      openingElement: {
        type: "JSXOpeningElement",
        loc: { start: { line: 6, column: 33 }, end: { line: 6, column: 40 } },
        name: {
          type: "JSXIdentifier",
          loc: { start: { line: 6, column: 34 }, end: { line: 6, column: 37 } },
          name: "Tag",
          key: "Tag$xwewmj2gozc5$0",
        },
        attributes: [],
        selfClosing: true,
      },
      children: [],
      closingElement: null,
    },
    expression: true,
  }),
  {
    code: "export default () => (Tag) => <Tag />;",
    map: '{"version":3,"file":"script-element-bound-tag.test.jsx","sourceRoot":"","sources":["script-element-bound-tag.test.tsx"],"names":[],"mappings":"eAKgB,MAAA,CAAC,GAAW,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,AAAD,EAAG"}',
    imports: [],
    exportAt: 0,
  },
);
