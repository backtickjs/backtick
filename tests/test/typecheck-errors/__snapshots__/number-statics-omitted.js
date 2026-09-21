import { cs } from "@backtickjs/core";
// `Number` is reachable only as the schema fixes it: `EPSILON`, `MAX_VALUE`,
// `MIN_VALUE`, `MAX_SAFE_INTEGER`, `MIN_SAFE_INTEGER`, `isFinite`, `isInteger`,
// `isSafeInteger`, `parseFloat` and `parseInt`. Everything else the standard
// library hangs off it is a name no client answers for — `isNaN` among them,
// since this language has no `NaN` for it to find.
// @ts-expect-error: Property 'POSITIVE_INFINITY' does not exist on type 'NumberConstructor'.
export const infinite = cs.create(
  [9, 25, 9, 53],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/number-statics-omitted.test.tsx",
    fileHash: "1w4yithbyetel",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "bltn",
    loc: [9, 28, 9, 52],
    name: "Number.POSITIVE_INFINITY",
  }),
);
// @ts-expect-error: Property 'isNaN' does not exist on type 'NumberConstructor'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
export const notANumber = cs.create(
  [12, 27, 12, 46],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/number-statics-omitted.test.tsx",
    fileHash: "1w4yithbyetel",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "()",
    loc: [12, 30, 12, 45],
    expression: {
      kind: "bltn",
      loc: [12, 30, 12, 42],
      name: "Number.isNaN",
    },
    arguments: [
      {
        kind: "number",
        loc: [12, 43, 12, 44],
        value: 1,
      },
    ],
  }),
);
