import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// A component may answer with a script, but the answer stands where a drawing
// would — so it is expanded in value position, and an action, which completes
// without returning, has nothing to draw.
async function Panel() {
  return cs.create(
    "1y32lnuqpkjgj:7:9",
    { params: [{ kind: "splice", value: state, bindings: [] }] },
    () => ({
      type: "BlockStatement",
      loc: { start: { line: 7, column: 12 }, end: { line: 10, column: 3 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: { start: { line: 8, column: 4 }, end: { line: 8, column: 24 } },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 8, column: 10 },
                end: { line: 8, column: 23 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 8, column: 10 },
                  end: { line: 8, column: 11 },
                },
                name: "n",
                key: "n$1y32lnuqpkjgj$0",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 8, column: 14 },
                  end: { line: 8, column: 23 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 8, column: 14 },
                    end: { line: 8, column: 20 },
                  },
                  param: 0,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 8, column: 21 },
                      end: { line: 8, column: 22 },
                    },
                    value: 2,
                  },
                ],
                optional: false,
              },
            },
          ],
        },
        {
          type: "ExpressionStatement",
          loc: { start: { line: 9, column: 4 }, end: { line: 9, column: 13 } },
          expression: {
            type: "CallExpression",
            loc: {
              start: { line: 9, column: 4 },
              end: { line: 9, column: 12 },
            },
            callee: {
              type: "MemberExpression",
              loc: {
                start: { line: 9, column: 4 },
                end: { line: 9, column: 9 },
              },
              object: {
                type: "Identifier",
                loc: {
                  start: { line: 9, column: 4 },
                  end: { line: 9, column: 5 },
                },
                name: "n",
                key: "n$1y32lnuqpkjgj$0",
              },
              property: {
                type: "Identifier",
                loc: {
                  start: { line: 9, column: 6 },
                  end: { line: 9, column: 9 },
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
                  start: { line: 9, column: 10 },
                  end: { line: 9, column: 11 },
                },
                value: 3,
              },
            ],
            optional: false,
          },
        },
      ],
    }),
    "$0 => {\n    const n = $0()(2);\n    n.set(3);\n}",
    '{"version":3,"file":"component-answers-action.test.jsx","sourceRoot":"","sources":["component-answers-action.test.tsx"],"names":[],"mappings":"AAMY;IACR,MAAM,CAAC,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACpB,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;AACX,CAAC,CAAA"}',
  );
}
// @ts-expect-error: 'Panel' cannot be used as a JSX component.
export default _jsx(Panel, {});
