import { cs } from "@backtickjs/core";
// The operand of `!` is a condition, so a number is a type error rather than
// a coercion.
export default cs.create(
  [5, 16, 5, 45],
  {
    version: "0.0.0",
    filePath: "non-boolean-not.ts",
    fileHash: "2891cfe99vhux",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [5, 19, 5, 44],
    parameters: [
      {
        kind: "param",
        loc: [5, 20, 5, 33],
        name: {
          kind: "id",
          loc: [5, 20, 5, 25],
          text: "count",
          bindingKey: "count$2891cfe99vhux$0",
        },
      },
    ],
    body: {
      kind: "unop",
      loc: [5, 38, 5, 44],
      operator: "!",
      operand: {
        kind: "id",
        loc: [5, 39, 5, 44],
        text: "count",
        bindingKey: "count$2891cfe99vhux$0",
      },
    },
  }),
);
