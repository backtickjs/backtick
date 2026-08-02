import { cs } from "@backtickjs/core";
// `Math` is reachable, but only as `ClientMath` fixes it. What is left out is
// left out on purpose: `sin`, `cos`, `exp`, `log` and `pow` are not specified
// to the last bit by IEEE 754, so two conforming hosts may disagree about
// them, and `random` makes what a bundle draws unreproducible.
export const transcendental = cs.create(
  [7, 31, 7, 46],
  {
    version: "0.0.0",
    filePath: "math-omitted-members.ts",
    fileHash: "19bh49dob2obv",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [7, 34, 7, 45],
    expression: {
      kind: 212,
      loc: [7, 34, 7, 42],
      expression: {
        kind: 1001,
        loc: [7, 34, 7, 38],
        name: "Math",
      },
      questionDotToken: false,
      name: "sin",
    },
    questionDotToken: false,
    arguments: [
      {
        kind: 9,
        loc: [7, 43, 7, 44],
        value: 1,
      },
    ],
  }),
);
export const raised = cs.create(
  [9, 23, 9, 41],
  {
    version: "0.0.0",
    filePath: "math-omitted-members.ts",
    fileHash: "19bh49dob2obv",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [9, 26, 9, 40],
    expression: {
      kind: 212,
      loc: [9, 26, 9, 34],
      expression: {
        kind: 1001,
        loc: [9, 26, 9, 30],
        name: "Math",
      },
      questionDotToken: false,
      name: "pow",
    },
    questionDotToken: false,
    arguments: [
      {
        kind: 9,
        loc: [9, 35, 9, 36],
        value: 2,
      },
      {
        kind: 9,
        loc: [9, 38, 9, 39],
        value: 8,
      },
    ],
  }),
);
export const unreproducible = cs.create(
  [11, 31, 11, 48],
  {
    version: "0.0.0",
    filePath: "math-omitted-members.ts",
    fileHash: "19bh49dob2obv",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [11, 34, 11, 47],
    expression: {
      kind: 212,
      loc: [11, 34, 11, 45],
      expression: {
        kind: 1001,
        loc: [11, 34, 11, 38],
        name: "Math",
      },
      questionDotToken: false,
      name: "random",
    },
    questionDotToken: false,
    arguments: [],
  }),
);
// `min` takes at least one argument, where the standard library takes none and
// answers `Infinity` — an empty answer that isn't this language's absent one.
export const empty = cs.create(
  [15, 22, 15, 36],
  {
    version: "0.0.0",
    filePath: "math-omitted-members.ts",
    fileHash: "19bh49dob2obv",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [15, 25, 15, 35],
    expression: {
      kind: 212,
      loc: [15, 25, 15, 33],
      expression: {
        kind: 1001,
        loc: [15, 25, 15, 29],
        name: "Math",
      },
      questionDotToken: false,
      name: "min",
    },
    questionDotToken: false,
    arguments: [],
  }),
);
