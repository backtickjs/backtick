import { cs } from "@backtickjs/core";
// A mapper that answers with nothing, and an array that never leaves the
// script. What catches it is the bound on `Array.from`'s type parameter:
// `T extends ClientValue`, which `undefined` is not.
//
// Without the bound this is still an error — nothing reads a member off a
// `void[]` — but three of them, thirty columns away, one dumping the whole
// union of client types. Here it is one, on the mapper that is wrong.
export const counted = cs.create(
  [10, 24, 10, 70],
  {
    version: "0.0.0",
    filePath: "array-from-undefined.ts",
    fileHash: "1kakqhyj595y2",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 212,
    loc: [10, 27, 10, 69],
    expression: {
      kind: 214,
      loc: [10, 27, 10, 62],
      expression: {
        kind: 1001,
        loc: [10, 27, 10, 37],
        name: "Array.from",
      },
      questionDotToken: false,
      arguments: [
        {
          kind: 211,
          loc: [10, 38, 10, 51],
          properties: [
            {
              kind: 304,
              loc: [10, 40, 10, 49],
              name: "length",
              initializer: {
                kind: 9,
                loc: [10, 48, 10, 49],
                value: 3,
              },
            },
          ],
        },
        {
          kind: 220,
          loc: [10, 53, 10, 61],
          parameters: [],
          body: {
            kind: 242,
            loc: [10, 59, 10, 61],
            statements: [],
          },
        },
      ],
    },
    questionDotToken: false,
    name: "length",
  }),
);
