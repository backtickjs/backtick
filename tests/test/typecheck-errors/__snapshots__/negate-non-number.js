import { cs } from "@backtickjs/core";
// `-` is arithmetic, so its operand is a number — TypeScript's own rule, and
// the reason this one needs no check of the language's own.
// @ts-expect-error: Argument of type 'string' is not assignable to parameter of type 'number'.
export default cs.create(
  [6, 16, 6, 43],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/negate-non-number.test.tsx",
    fileHash: "63bu3dmolvh8",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [6, 19, 6, 42],
    parameters: [
      {
        kind: "param",
        loc: [6, 20, 6, 32],
        name: {
          kind: "id",
          loc: [6, 20, 6, 24],
          text: "name",
          bindingKey: "name$63bu3dmolvh8$0",
        },
      },
    ],
    body: {
      kind: "prefixop",
      loc: [6, 37, 6, 42],
      operator: "-",
      operand: {
        kind: "id",
        loc: [6, 38, 6, 42],
        text: "name",
        bindingKey: "name$63bu3dmolvh8$0",
      },
    },
  }),
);
