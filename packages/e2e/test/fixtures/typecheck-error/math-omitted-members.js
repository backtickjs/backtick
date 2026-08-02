import { cs } from "@backtickjs/core";
// `Math` is reachable, but only as `ClientMath` fixes it. What is left out is
// left out on purpose: `sin`, `cos`, `exp`, `log` and `pow` are not specified
// to the last bit by IEEE 754, so two conforming hosts may disagree about
// them. (`random` disagrees with itself, and is admitted anyway — see
// `ClientMath`.)
export const transcendental = cs.create(
  [8, 31, 8, 46],
  {
    version: "0.0.0",
    filePath: "math-omitted-members.ts",
    fileHash: "1dx0tqzuxngr9",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [8, 34, 8, 45],
    expression: {
      kind: 212,
      loc: [8, 34, 8, 42],
      expression: {
        kind: 1001,
        loc: [8, 34, 8, 38],
        name: "Math",
      },
      questionDotToken: false,
      name: "sin",
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
export const raised = cs.create(
  [10, 23, 10, 41],
  {
    version: "0.0.0",
    filePath: "math-omitted-members.ts",
    fileHash: "1dx0tqzuxngr9",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [10, 26, 10, 40],
    expression: {
      kind: 212,
      loc: [10, 26, 10, 34],
      expression: {
        kind: 1001,
        loc: [10, 26, 10, 30],
        name: "Math",
      },
      questionDotToken: false,
      name: "pow",
    },
    questionDotToken: false,
    arguments: [
      {
        kind: 9,
        loc: [10, 35, 10, 36],
        value: 2,
      },
      {
        kind: 9,
        loc: [10, 38, 10, 39],
        value: 8,
      },
    ],
  }),
);
// `min` takes at least one argument, where the standard library takes none and
// answers `Infinity` — an empty answer that isn't this language's absent one.
export const empty = cs.create(
  [14, 22, 14, 36],
  {
    version: "0.0.0",
    filePath: "math-omitted-members.ts",
    fileHash: "1dx0tqzuxngr9",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [14, 25, 14, 35],
    expression: {
      kind: 212,
      loc: [14, 25, 14, 33],
      expression: {
        kind: 1001,
        loc: [14, 25, 14, 29],
        name: "Math",
      },
      questionDotToken: false,
      name: "min",
    },
    questionDotToken: false,
    arguments: [],
  }),
);
