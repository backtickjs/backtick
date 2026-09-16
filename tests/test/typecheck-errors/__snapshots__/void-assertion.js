import { cs } from "@backtickjs/core";
const one = 1;
// An assertion needs no check of its own. What a script asserts about is a
// value it holds, so `void` is refused where every other non-value is — at the
// `ClientValue` boundary, coarsely and after the fact, which is what a type
// nothing can hold a value of is worth. Only a parameter needs saying earlier,
// because an annotation is not a value and reaches no boundary at all.
const asserted = cs.create(
  [10, 18, 14, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/void-assertion.test.tsx",
    fileHash: "2ot05umo7ygwp",
    splices: { $one: { value: one, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [10, 21, 14, 2],
    statements: [
      {
        kind: "const",
        loc: [12, 3, 12, 26],
        name: {
          kind: "id",
          loc: [12, 9, 12, 10],
          text: "a",
          bindingKey: "a$2ot05umo7ygwp$0",
        },
        initializer: {
          kind: "splice",
          loc: [12, 13, 12, 17],
          key: "$one",
        },
      },
      {
        kind: "return",
        loc: [13, 3, 13, 17],
        expression: {
          kind: "binop",
          loc: [13, 10, 13, 16],
          left: {
            kind: "string",
            loc: [13, 10, 13, 12],
            text: "",
          },
          operatorToken: "+",
          right: {
            kind: "id",
            loc: [13, 15, 13, 16],
            text: "a",
            bindingKey: "a$2ot05umo7ygwp$0",
          },
        },
      },
    ],
  }),
);
