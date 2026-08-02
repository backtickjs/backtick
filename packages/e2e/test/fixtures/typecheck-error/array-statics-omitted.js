import { cs } from "@backtickjs/core";
// `Array` is reachable, but only as `ClientArrayStatics` fixes it: one member,
// because there is one thing the language cannot do for itself.
export const listed = cs.create(
  [5, 23, 5, 41],
  {
    version: "0.0.0",
    filePath: "array-statics-omitted.ts",
    fileHash: "3mn5powltnqdh",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [5, 26, 5, 40],
    expression: {
      kind: 212,
      loc: [5, 26, 5, 34],
      expression: {
        kind: 1001,
        loc: [5, 26, 5, 31],
        name: "Array",
      },
      questionDotToken: false,
      name: "of",
    },
    questionDotToken: false,
    arguments: [
      {
        kind: 9,
        loc: [5, 35, 5, 36],
        value: 1,
      },
      {
        kind: 9,
        loc: [5, 38, 5, 39],
        value: 2,
      },
    ],
  }),
);
export const tested = cs.create(
  [7, 23, 7, 45],
  {
    version: "0.0.0",
    filePath: "array-statics-omitted.ts",
    fileHash: "3mn5powltnqdh",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [7, 26, 7, 44],
    expression: {
      kind: 212,
      loc: [7, 26, 7, 39],
      expression: {
        kind: 1001,
        loc: [7, 26, 7, 31],
        name: "Array",
      },
      questionDotToken: false,
      name: "isArray",
    },
    questionDotToken: false,
    arguments: [
      {
        kind: 210,
        loc: [7, 40, 7, 43],
        elements: [
          {
            kind: 9,
            loc: [7, 41, 7, 42],
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
  [12, 22, 12, 51],
  {
    version: "0.0.0",
    filePath: "array-statics-omitted.ts",
    fileHash: "3mn5powltnqdh",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [12, 25, 12, 50],
    expression: {
      kind: 212,
      loc: [12, 25, 12, 35],
      expression: {
        kind: 1001,
        loc: [12, 25, 12, 30],
        name: "Array",
      },
      questionDotToken: false,
      name: "from",
    },
    questionDotToken: false,
    arguments: [
      {
        kind: 211,
        loc: [12, 36, 12, 49],
        properties: [
          {
            kind: 304,
            loc: [12, 38, 12, 47],
            name: "length",
            initializer: {
              kind: 9,
              loc: [12, 46, 12, 47],
              value: 3,
            },
          },
        ],
      },
    ],
  }),
);
