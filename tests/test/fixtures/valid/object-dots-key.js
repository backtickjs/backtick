import { cs } from "@backtickjs/core";
// A property literally named `...`, in a literal a spread also runs through —
// which is the one shape where both are entries of the same node. The format
// tells them apart by the entry's first slot, and `...` is a name a property
// may have, so this is where the two could be confused.
export default cs.create(
  [7, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "object-dots-key.ts",
    fileHash: "23li8rbc5k7mc",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [7, 19, 10, 2],
    statements: [
      {
        kind: "const",
        loc: [8, 3, 8, 25],
        name: {
          kind: "id",
          loc: [8, 9, 8, 13],
          text: "base",
          bindingKey: "base$23li8rbc5k7mc$0",
        },
        initializer: {
          kind: "obj",
          loc: [8, 16, 8, 24],
          properties: [
            {
              kind: ":",
              loc: [8, 18, 8, 22],
              name: "a",
              initializer: {
                kind: "number",
                loc: [8, 21, 8, 22],
                value: 1,
              },
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [9, 3, 9, 32],
        expression: {
          kind: "obj",
          loc: [9, 10, 9, 31],
          properties: [
            {
              kind: "...",
              loc: [9, 12, 9, 19],
              expression: {
                kind: "id",
                loc: [9, 15, 9, 19],
                text: "base",
                bindingKey: "base$23li8rbc5k7mc$0",
              },
            },
            {
              kind: ":",
              loc: [9, 21, 9, 29],
              name: "...",
              initializer: {
                kind: "number",
                loc: [9, 28, 9, 29],
                value: 2,
              },
            },
          ],
        },
      },
    ],
  }),
);
