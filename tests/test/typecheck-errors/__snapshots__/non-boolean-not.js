import { cs } from "@backtickjs/core";
// The operand of `!` is a condition, so a number is a type error rather than
// a coercion.
// @ts-expect-error: Argument of type 'number' is not assignable to parameter of type 'boolean'.
export default cs.create(
  [6, 16, 6, 45],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/non-boolean-not.test.tsx",
    fileHash: "3imwfwdjuhdbp",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [6, 19, 6, 44],
    parameters: [
      {
        kind: "param",
        loc: [6, 20, 6, 33],
        name: {
          kind: "id",
          loc: [6, 20, 6, 25],
          text: "count",
          bindingKey: "count$3imwfwdjuhdbp$0",
        },
      },
    ],
    body: {
      kind: "prefixop",
      loc: [6, 38, 6, 44],
      operator: "!",
      operand: {
        kind: "id",
        loc: [6, 39, 6, 44],
        text: "count",
        bindingKey: "count$3imwfwdjuhdbp$0",
      },
    },
  }),
);
