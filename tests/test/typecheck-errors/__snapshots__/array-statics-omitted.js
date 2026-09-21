import { cs } from "@backtickjs/core";
// `Array` is reachable, but only as the schema fixes it: `from`, `isArray` and
// `of`, and nothing else. `new Array(n)` and `Array(n)` build an array of
// holes.
//
// And the mapper is required, where the standard library makes it optional.
// Without one this answers with holes, and a hole reads as `undefined` — the
// one thing this language has no value for.
// @ts-expect-error: Expected 2 arguments, but got 1.
export const holes = cs.create(
  [11, 22, 11, 51],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/array-statics-omitted.test.tsx",
    fileHash: "3079knj6pevb2",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "()",
    loc: [11, 25, 11, 50],
    expression: {
      kind: "bltn",
      loc: [11, 25, 11, 35],
      name: "Array.from",
    },
    arguments: [
      {
        kind: "obj",
        loc: [11, 36, 11, 49],
        properties: [
          {
            kind: ":",
            loc: [11, 38, 11, 47],
            name: {
              kind: "string",
              loc: [11, 38, 11, 44],
              text: "length",
            },
            initializer: {
              kind: "number",
              loc: [11, 46, 11, 47],
              value: 3,
            },
          },
        ],
      },
    ],
  }),
);
