import { cs } from "@backtickjs/core";
// `String` is reachable only as the schema fixes it: `fromCodePoint`, and
// nothing else. `fromCharCode` predates it and `raw` takes a template.
// @ts-expect-error: Property 'fromCharCode' does not exist on type 'StringConstructor'.
export const written = cs.create(
  [6, 24, 6, 51],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/string-statics-omitted.test.tsx",
    fileHash: "1eej1hy8ykrhd",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "()",
    loc: [6, 27, 6, 50],
    expression: {
      kind: "bltn",
      loc: [6, 27, 6, 46],
      name: "String.fromCharCode",
    },
    arguments: [
      {
        kind: "number",
        loc: [6, 47, 6, 49],
        value: 72,
      },
    ],
  }),
);
