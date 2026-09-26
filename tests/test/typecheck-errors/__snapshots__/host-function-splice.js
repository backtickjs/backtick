import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs } from "@backtickjs/core";
// A host function is not spliceable (see `Spliceable`): only a tag may name
// one, as a component. Client behaviour is `cs`.
function Card(props) {
  return _jsx("h2", { children: props.title });
}
export default cs.create(
  "1cgjxfb71wjwz:10:15",
  {
    params: [
      { kind: "splice", value: Card, bindings: [] },
      { kind: "tag", value: Card },
    ],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 10, column: 18 }, end: { line: 14, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 12, column: 2 }, end: { line: 12, column: 24 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 12, column: 8 },
              end: { line: 12, column: 23 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 12, column: 8 },
                end: { line: 12, column: 15 },
              },
              name: "Heading",
              key: "Heading$1cgjxfb71wjwz$0",
            },
            init: {
              type: "Splice",
              loc: {
                start: { line: 12, column: 18 },
                end: { line: 12, column: 23 },
              },
              param: 0,
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 30 } },
        argument: {
          type: "JSXElement",
          loc: {
            start: { line: 13, column: 9 },
            end: { line: 13, column: 29 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 13, column: 9 },
              end: { line: 13, column: 29 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 13, column: 10 },
                end: { line: 13, column: 14 },
              },
              name: "Card",
              param: 1,
            },
            attributes: [
              {
                type: "JSXAttribute",
                loc: {
                  start: { line: 13, column: 15 },
                  end: { line: 13, column: 26 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 13, column: 15 },
                    end: { line: 13, column: 20 },
                  },
                  name: "title",
                },
                value: {
                  type: "Literal",
                  loc: {
                    start: { line: 13, column: 21 },
                    end: { line: 13, column: 26 },
                  },
                  value: "tag",
                },
              },
            ],
            selfClosing: true,
          },
          children: [],
          closingElement: null,
        },
      },
    ],
  }),
  {
    code: 'export default ($0, $1) => {\n    const Heading = $0();\n    return <$1 title="tag"/>;\n};',
    map: '{"version":3,"file":"host-function-splice.test.jsx","sourceRoot":"","sources":["host-function-splice.test.tsx"],"names":[],"mappings":"eASkB;IAEhB,MAAM,OAAO,GAAG,IAAK,CAAC;IACtB,OAAO,CAAC,EAAI,CAAC,KAAK,CAAC,KAAK,EAAG,CAAC;AAC9B,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
