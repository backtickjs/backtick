import { cs } from "@backtickjs/core";
const one = 1;
// An assertion needs no check of its own. What a script asserts about is a
// value it holds, so `void` is refused where every other non-value is — at the
// `ClientValue` boundary, coarsely and after the fact, which is what a type
// nothing can hold a value of is worth. Only a parameter needs saying earlier,
// because an annotation is not a value and reaches no boundary at all.
const asserted = cs.create(
  [10, 18, 13, 3],
  {
    version: "0.0.0",
    filePath: "void-assertion.ts",
    fileHash: "1gcpfwhj1qwx0",
    splices: { $one: { value: one, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [10, 21, 13, 2],
    statements: [
      {
        kind: "const",
        loc: [11, 3, 11, 26],
        name: {
          kind: "id",
          loc: [11, 9, 11, 10],
          text: "a",
          bindingKey: "a$1gcpfwhj1qwx0$0",
        },
        initializer: {
          kind: "splice",
          loc: [11, 13, 11, 17],
          key: "$one",
        },
      },
      {
        kind: "return",
        loc: [12, 3, 12, 17],
        expression: {
          kind: "binop",
          loc: [12, 10, 12, 16],
          left: {
            kind: "string",
            loc: [12, 10, 12, 12],
            text: "",
          },
          operatorToken: "+",
          right: {
            kind: "id",
            loc: [12, 15, 12, 16],
            text: "a",
            bindingKey: "a$1gcpfwhj1qwx0$0",
          },
        },
      },
    ],
  }),
);
