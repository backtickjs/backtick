import { cs } from "@backtickjs/core";
// A condition must be a boolean: the language has no truthiness, so a
// string tested directly is a type error.
export default cs.create(
  { start: { line: 5, column: 15 }, end: { line: 11, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/non-boolean-condition.test.tsx",
    fileHash: "e0jptcfnt0fh",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 5, column: 18 }, end: { line: 11, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 5, column: 19 }, end: { line: 5, column: 23 } },
        name: "name",
        bindingKey: "name$e0jptcfnt0fh$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 5, column: 36 }, end: { line: 11, column: 1 } },
      body: [
        {
          type: "IfStatement",
          loc: { start: { line: 7, column: 2 }, end: { line: 9, column: 3 } },
          test: {
            type: "Identifier",
            loc: {
              start: { line: 7, column: 6 },
              end: { line: 7, column: 10 },
            },
            name: "name",
            bindingKey: "name$e0jptcfnt0fh$0",
          },
          consequent: {
            type: "BlockStatement",
            loc: {
              start: { line: 7, column: 12 },
              end: { line: 9, column: 3 },
            },
            body: [
              {
                type: "ReturnStatement",
                loc: {
                  start: { line: 8, column: 4 },
                  end: { line: 8, column: 16 },
                },
                argument: {
                  type: "Identifier",
                  loc: {
                    start: { line: 8, column: 11 },
                    end: { line: 8, column: 15 },
                  },
                  name: "name",
                  bindingKey: "name$e0jptcfnt0fh$0",
                },
              },
            ],
          },
          alternate: null,
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 10, column: 2 },
            end: { line: 10, column: 21 },
          },
          argument: {
            type: "Literal",
            loc: {
              start: { line: 10, column: 9 },
              end: { line: 10, column: 20 },
            },
            value: "anonymous",
          },
        },
      ],
    },
    expression: false,
  }),
);
