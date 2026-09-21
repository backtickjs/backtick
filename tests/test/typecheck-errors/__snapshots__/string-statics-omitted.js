import { cs } from "@backtickjs/core";
// `String` is reachable only as the schema fixes it: `fromCharCode` and
// `fromCodePoint`, and nothing else. `raw` takes a template, which a client
// script can't hold.
// @ts-expect-error: Property 'raw' does not exist on type 'StringConstructor'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
export const written = cs.create(
  [7, 24, 7, 54],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/string-statics-omitted.test.tsx",
    fileHash: "1y8lclmcnvsl5",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "()",
    loc: [7, 27, 7, 53],
    expression: {
      kind: "bltn",
      loc: [7, 27, 7, 37],
      name: "String.raw",
    },
    arguments: [
      {
        kind: "obj",
        loc: [7, 38, 7, 52],
        properties: [
          {
            kind: ":",
            loc: [7, 40, 7, 50],
            name: {
              kind: "string",
              loc: [7, 40, 7, 43],
              text: "raw",
            },
            initializer: {
              kind: "arr",
              loc: [7, 45, 7, 50],
              elements: [
                {
                  kind: "string",
                  loc: [7, 46, 7, 49],
                  text: "a",
                },
              ],
            },
          },
        ],
      },
    ],
  }),
);
