import { cs } from "@backtickjs/core";
// `Array` is reachable, but only as the schema fixes it: `from` and `of`, and
// nothing else. `isArray` answers a question a script's types have already
// answered, and `new Array(n)` and `Array(n)` build an array of holes.
export const tested = cs.create(
  [6, 23, 6, 45],
  {
    version: "0.0.0",
    filePath: "array-statics-omitted.ts",
    fileHash: "1qrydkqzmuq91",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [6, 26, 6, 44],
    expression: {
      kind: 1001,
      loc: [6, 26, 6, 39],
      name: "Array.isArray",
    },
    questionDotToken: false,
    arguments: [
      {
        kind: 210,
        loc: [6, 40, 6, 43],
        elements: [
          {
            kind: 9,
            loc: [6, 41, 6, 42],
            value: 1,
          },
        ],
      },
    ],
  }),
);
// And the mapper is required, where the standard library makes it optional.
// Without one this answers with holes, and a hole reads as `undefined` — the
// one thing this language has no value for.
export const holes = cs.create(
  [11, 22, 11, 51],
  {
    version: "0.0.0",
    filePath: "array-statics-omitted.ts",
    fileHash: "1qrydkqzmuq91",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [11, 25, 11, 50],
    expression: {
      kind: 1001,
      loc: [11, 25, 11, 35],
      name: "Array.from",
    },
    questionDotToken: false,
    arguments: [
      {
        kind: 211,
        loc: [11, 36, 11, 49],
        properties: [
          {
            kind: 304,
            loc: [11, 38, 11, 47],
            name: "length",
            initializer: {
              kind: 9,
              loc: [11, 46, 11, 47],
              value: 3,
            },
          },
        ],
      },
    ],
  }),
);
