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
    splices: {},
    captures: [],
  },
  () => ({
    kind: ".",
    loc: [10, 27, 10, 69],
    expression: {
      kind: "()",
      loc: [10, 27, 10, 62],
      expression: {
        kind: "bltn",
        loc: [10, 27, 10, 37],
        name: "Array.from",
      },
      arguments: [
        {
          kind: "obj",
          loc: [10, 38, 10, 51],
          properties: [
            {
              kind: ":",
              loc: [10, 40, 10, 49],
              name: "length",
              initializer: {
                kind: "number",
                loc: [10, 48, 10, 49],
                value: 3,
              },
            },
          ],
        },
        {
          kind: "=>",
          loc: [10, 53, 10, 61],
          parameters: [],
          body: {
            kind: "{}",
            loc: [10, 59, 10, 61],
            statements: [],
          },
        },
      ],
    },
    name: "length",
  }),
);
