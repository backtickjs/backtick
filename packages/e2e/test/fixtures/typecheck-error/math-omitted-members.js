import { cs } from "@backtickjs/core";
// `Math` is JavaScript's own, as the standard library declares it through
// ES2015 — so what is left out is what came after it. `f16round` is ES2025's.
//
// The one place the signatures depart is `min`/`max`, and that departure is
// not here: they take the library's rest parameter, and an empty call is
// refused by the client rather than by the typechecker. See `globals.test.ts`.
export const halved = cs.create(
  [9, 23, 9, 43],
  {
    version: "0.0.0",
    filePath: "math-omitted-members.ts",
    fileHash: "3i88rbbd8nxvb",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 214,
    loc: [9, 26, 9, 42],
    expression: {
      kind: 212,
      loc: [9, 26, 9, 39],
      expression: {
        kind: 1001,
        loc: [9, 26, 9, 30],
        name: "Math",
      },
      questionDotToken: false,
      name: "f16round",
    },
    questionDotToken: false,
    arguments: [
      {
        kind: 9,
        loc: [9, 40, 9, 41],
        value: 1,
      },
    ],
  }),
);
