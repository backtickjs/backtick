import { cs } from "@backtickjs/core";
// `Number` is reachable only as the schema fixes it: `EPSILON`, `MAX_VALUE`,
// `isFinite`, `isInteger`, `parseFloat` and `parseInt`. Everything else the standard
// library hangs off it is a name no client answers for — `isNaN` among them,
// since this language has no `NaN` for it to find.
// @ts-expect-error: Property 'MAX_SAFE_INTEGER' does not exist on type 'NumberConstructor'.
export const largest = cs.create(
  [8, 24, 8, 51],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/number-statics-omitted.test.tsx",
    fileHash: "3omc1yqaryj78",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "bltn",
    loc: [8, 27, 8, 50],
    name: "Number.MAX_SAFE_INTEGER",
  }),
);
// @ts-expect-error: Property 'isNaN' does not exist on type 'NumberConstructor'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
export const notANumber = cs.create(
  [11, 27, 11, 46],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/number-statics-omitted.test.tsx",
    fileHash: "3omc1yqaryj78",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "()",
    loc: [11, 30, 11, 45],
    expression: {
      kind: "bltn",
      loc: [11, 30, 11, 42],
      name: "Number.isNaN",
    },
    arguments: [
      {
        kind: "number",
        loc: [11, 43, 11, 44],
        value: 1,
      },
    ],
  }),
);
