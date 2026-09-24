import { cs } from "@backtickjs/core";
// A computed key is a string: JavaScript would convert a number, and a client
// that isn't JavaScript has no such conversion to agree on.
// @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'string'.
export default cs.create(
  { start: { line: 6, column: 15 }, end: { line: 6, column: 52 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/computed-key-type.test.tsx",
    fileHash: "zs52vif1gagd",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 6, column: 18 }, end: { line: 6, column: 51 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 6, column: 19 }, end: { line: 6, column: 21 } },
        name: "at",
        bindingKey: "at$zs52vif1gagd$0",
      },
    ],
    body: {
      type: "ObjectExpression",
      loc: { start: { line: 6, column: 35 }, end: { line: 6, column: 50 } },
      properties: [
        {
          type: "Property",
          loc: { start: { line: 6, column: 37 }, end: { line: 6, column: 48 } },
          key: {
            type: "Identifier",
            loc: {
              start: { line: 6, column: 38 },
              end: { line: 6, column: 40 },
            },
            name: "at",
            bindingKey: "at$zs52vif1gagd$0",
          },
          value: {
            type: "Literal",
            loc: {
              start: { line: 6, column: 43 },
              end: { line: 6, column: 48 },
            },
            value: "one",
          },
          kind: "init",
          computed: true,
          method: false,
          shorthand: false,
        },
      ],
    },
    expression: true,
  }),
);
