import { cs } from "@backtickjs/core";
// `-` is arithmetic, so its operand is a number — TypeScript's own rule, and
// the reason this one needs no check of the language's own.
export default cs.create(
  [5, 16, 5, 43],
  {
    version: "0.0.0",
    filePath: "negate-non-number.ts",
    fileHash: "vzc9wv11z8g7",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 220,
    loc: [5, 19, 5, 42],
    parameters: [
      {
        kind: 170,
        loc: [5, 20, 5, 32],
        name: {
          kind: 80,
          loc: [5, 20, 5, 24],
          text: "name",
          bindingKey: "name$vzc9wv11z8g7$0",
        },
      },
    ],
    body: {
      kind: 225,
      loc: [5, 37, 5, 42],
      operator: "-",
      operand: {
        kind: 80,
        loc: [5, 38, 5, 42],
        text: "name",
        bindingKey: "name$vzc9wv11z8g7$0",
      },
    },
  }),
);
