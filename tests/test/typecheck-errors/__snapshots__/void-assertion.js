import { cs } from "@backtickjs/core";
const one = 1;
// An assertion needs no check of its own. What a script asserts about is a
// value it holds, so `void` is refused where every other non-value is — at the
// `ClientValue` boundary, coarsely and after the fact, which is what a type
// nothing can hold a value of is worth. Only a parameter needs saying earlier,
// because an annotation is not a value and reaches no boundary at all.
const asserted = cs.create(
  { start: { line: 10, column: 17 }, end: { line: 14, column: 2 } },
  {
    version: "0.0.0",
    filePath: "typecheck-errors/void-assertion.test.tsx",
    fileHash: "2ot05umo7ygwp",
    splices: { $one: { value: one, params: [] } },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 10, column: 20 }, end: { line: 14, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 12, column: 2 }, end: { line: 12, column: 25 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 12, column: 8 },
              end: { line: 12, column: 24 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 12, column: 8 },
                end: { line: 12, column: 9 },
              },
              name: "a",
              bindingKey: "a$2ot05umo7ygwp$0",
            },
            init: {
              type: "Splice",
              loc: {
                start: { line: 12, column: 12 },
                end: { line: 12, column: 16 },
              },
              key: "$one",
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 16 } },
        argument: {
          type: "BinaryExpression",
          loc: {
            start: { line: 13, column: 9 },
            end: { line: 13, column: 15 },
          },
          operator: "+",
          left: {
            type: "Literal",
            loc: {
              start: { line: 13, column: 9 },
              end: { line: 13, column: 11 },
            },
            value: "",
          },
          right: {
            type: "Identifier",
            loc: {
              start: { line: 13, column: 14 },
              end: { line: 13, column: 15 },
            },
            name: "a",
            bindingKey: "a$2ot05umo7ygwp$0",
          },
        },
      },
    ],
  }),
);
