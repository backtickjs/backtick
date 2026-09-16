import { cs } from "@backtickjs/core";
// `Array` is reachable, but only as the schema fixes it: `from` and `of`, and
// nothing else. `isArray` answers a question a script's types have already
// answered, and `new Array(n)` and `Array(n)` build an array of holes.
// @ts-expect-error: Property 'isArray' does not exist on type 'ArrayConstructor'.
export const tested = cs.create(
  [7, 23, 7, 45],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/array-statics-omitted.test.tsx",
    fileHash: "1wnblg78115oo",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "()",
    loc: [7, 26, 7, 44],
    expression: {
      kind: "bltn",
      loc: [7, 26, 7, 39],
      name: "Array.isArray",
    },
    arguments: [
      {
        kind: "arr",
        loc: [7, 40, 7, 43],
        elements: [
          {
            kind: "number",
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
// @ts-expect-error: Expected 2 arguments, but got 1.
export const holes = cs.create(
  [13, 22, 13, 51],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/array-statics-omitted.test.tsx",
    fileHash: "1wnblg78115oo",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "()",
    loc: [13, 25, 13, 50],
    expression: {
      kind: "bltn",
      loc: [13, 25, 13, 35],
      name: "Array.from",
    },
    arguments: [
      {
        kind: "obj",
        loc: [13, 36, 13, 49],
        properties: [
          {
            kind: ":",
            loc: [13, 38, 13, 47],
            name: "length",
            initializer: {
              kind: "number",
              loc: [13, 46, 13, 47],
              value: 3,
            },
          },
        ],
      },
    ],
  }),
);
