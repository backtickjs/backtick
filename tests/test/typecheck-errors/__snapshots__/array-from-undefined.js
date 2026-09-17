import { cs } from "@backtickjs/core";
// A mapper that answers with nothing, and an array that never leaves the
// script. What catches it is the bound on `Array.from`'s type parameter:
// `T extends ClientValue`, which `undefined` is not.
//
// Without the bound this is still an error — nothing reads a member off a
// `void[]` — but three of them, thirty columns away, one dumping the whole
// union of client types. Here it is one, on the mapper that is wrong.
// @ts-expect-error: Argument of type '() => void' is not assignable to parameter of type '(v: ClientValue, k: number) => ClientValue'.
export const counted = cs.create(
  [11, 24, 11, 70],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/array-from-undefined.test.tsx",
    fileHash: "50yj8ocllx6z",
    splices: {},
    captures: [],
  },
  () => ({
    kind: ".",
    loc: [11, 27, 11, 69],
    expression: {
      kind: "()",
      loc: [11, 27, 11, 62],
      expression: {
        kind: "bltn",
        loc: [11, 27, 11, 37],
        name: "Array.from",
      },
      arguments: [
        {
          kind: "obj",
          loc: [11, 38, 11, 51],
          properties: [
            {
              kind: ":",
              loc: [11, 40, 11, 49],
              name: {
                kind: "string",
                loc: [11, 40, 11, 46],
                text: "length",
              },
              initializer: {
                kind: "number",
                loc: [11, 48, 11, 49],
                value: 3,
              },
            },
          ],
        },
        {
          kind: "=>",
          loc: [11, 53, 11, 61],
          parameters: [],
          body: {
            kind: "{}",
            loc: [11, 59, 11, 61],
            statements: [],
          },
        },
      ],
    },
    name: "length",
  }),
);
