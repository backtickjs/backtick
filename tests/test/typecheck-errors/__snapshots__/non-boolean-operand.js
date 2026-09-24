import { cs } from "@backtickjs/core";
// `&&`/`||` operate on booleans and always yield one: the guard and default
// idioms that lean on truthiness (`count && flag`, `value || fallback`) are
// type errors on each non-boolean operand. Defaulting is `??`.
export default cs.create(
  { start: { line: 6, column: 15 }, end: { line: 9, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/non-boolean-operand.test.tsx",
    fileHash: "31w10vl5tonbf",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 6, column: 18 }, end: { line: 9, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 6, column: 19 }, end: { line: 6, column: 24 } },
        name: "count",
        bindingKey: "count$31w10vl5tonbf$0",
      },
      {
        type: "Identifier",
        loc: { start: { line: 6, column: 34 }, end: { line: 6, column: 38 } },
        name: "flag",
        bindingKey: "flag$31w10vl5tonbf$1",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 6, column: 52 }, end: { line: 9, column: 1 } },
      body: [
        {
          type: "ReturnStatement",
          loc: { start: { line: 8, column: 2 }, end: { line: 8, column: 35 } },
          argument: {
            type: "LogicalExpression",
            loc: {
              start: { line: 8, column: 9 },
              end: { line: 8, column: 34 },
            },
            operator: "||",
            left: {
              type: "LogicalExpression",
              loc: {
                start: { line: 8, column: 10 },
                end: { line: 8, column: 23 },
              },
              operator: "&&",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 8, column: 10 },
                  end: { line: 8, column: 15 },
                },
                name: "count",
                bindingKey: "count$31w10vl5tonbf$0",
              },
              right: {
                type: "Identifier",
                loc: {
                  start: { line: 8, column: 19 },
                  end: { line: 8, column: 23 },
                },
                name: "flag",
                bindingKey: "flag$31w10vl5tonbf$1",
              },
            },
            right: {
              type: "Literal",
              loc: {
                start: { line: 8, column: 28 },
                end: { line: 8, column: 34 },
              },
              value: "none",
            },
          },
        },
      ],
    },
    expression: false,
  }),
);
