import { cs } from "@backtickjs/core";
// `Number` is reachable only as the schema fixes it: `EPSILON`, `isFinite`,
// `isInteger`, `parseFloat` and `parseInt`. Everything else the standard
// library hangs off it is a name no client answers for — `isNaN` among them,
// since this language has no `NaN` for it to find.
export const largest = cs.create(
  [7, 24, 7, 51],
  {
    version: "0.0.0",
    filePath: "number-statics-omitted.ts",
    fileHash: "20q00g0639qvh",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "bltn",
    loc: [7, 27, 7, 50],
    name: "Number.MAX_SAFE_INTEGER",
  }),
);
export const notANumber = cs.create(
  [9, 27, 9, 46],
  {
    version: "0.0.0",
    filePath: "number-statics-omitted.ts",
    fileHash: "20q00g0639qvh",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "()",
    loc: [9, 30, 9, 45],
    expression: {
      kind: "bltn",
      loc: [9, 30, 9, 42],
      name: "Number.isNaN",
    },
    arguments: [
      {
        kind: "number",
        loc: [9, 43, 9, 44],
        value: 1,
      },
    ],
  }),
);
