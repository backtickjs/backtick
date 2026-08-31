import { cs } from "@backtickjs/core";
// `Number` is reachable only as the schema fixes it: `EPSILON`, `isFinite`,
// `isInteger`, `parseFloat` and `parseInt`. Everything else the standard
// library hangs off it is a name no client answers for.
export const largest = cs.create(
  [6, 24, 6, 51],
  {
    version: "0.0.0",
    filePath: "number-statics-omitted.ts",
    fileHash: "2d029pqxveh70",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 1001,
    loc: [6, 27, 6, 50],
    name: "Number.MAX_SAFE_INTEGER",
  }),
);
export const notANumber = cs.create(
  [8, 27, 8, 46],
  {
    version: "0.0.0",
    filePath: "number-statics-omitted.ts",
    fileHash: "2d029pqxveh70",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [8, 30, 8, 45],
    expression: {
      kind: 1001,
      loc: [8, 30, 8, 42],
      name: "Number.isNaN",
    },
    questionDotToken: false,
    arguments: [
      {
        kind: 9,
        loc: [8, 43, 8, 44],
        value: 1,
      },
    ],
  }),
);
