import { cs } from "@backtickjs/core";
// Where the two rules part company, pinned so a client implementer can see it:
// `names[9]` types as `string`, because TypeScript's indexed access says the
// element type, and reads as null, because the runtime read is total. Nothing
// faults; the type simply doesn't mention the floor under it.
export default cs.create(
  [7, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "index-past-end.ts",
    fileHash: "2hkx7916f6ioy",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [7, 19, 10, 2],
    statements: [
      {
        kind: "const",
        loc: [8, 3, 8, 33],
        name: {
          kind: "id",
          loc: [8, 9, 8, 14],
          text: "names",
          bindingKey: "names$2hkx7916f6ioy$0",
        },
        initializer: {
          kind: "arr",
          loc: [8, 17, 8, 32],
          elements: [
            {
              kind: "string",
              loc: [8, 18, 8, 24],
              text: "zero",
            },
            {
              kind: "string",
              loc: [8, 26, 8, 31],
              text: "one",
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [9, 3, 9, 19],
        expression: {
          kind: "[]",
          loc: [9, 10, 9, 18],
          expression: {
            kind: "id",
            loc: [9, 10, 9, 15],
            text: "names",
            bindingKey: "names$2hkx7916f6ioy$0",
          },
          argumentExpression: {
            kind: "number",
            loc: [9, 16, 9, 17],
            value: 9,
          },
        },
      },
    ],
  }),
);
