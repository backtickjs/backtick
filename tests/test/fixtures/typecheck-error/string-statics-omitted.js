import { cs } from "@backtickjs/core";
// `String` is reachable only as the schema fixes it: `fromCodePoint`, and
// nothing else. `fromCharCode` predates it and `raw` takes a template.
export const written = cs.create(
  [5, 24, 5, 51],
  {
    version: "0.0.0",
    filePath: "string-statics-omitted.ts",
    fileHash: "2tpsdsl2b0c00",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 214,
    loc: [5, 27, 5, 50],
    expression: {
      kind: 1001,
      loc: [5, 27, 5, 46],
      name: "String.fromCharCode",
    },
    questionDotToken: false,
    arguments: [
      {
        kind: 9,
        loc: [5, 47, 5, 49],
        value: 72,
      },
    ],
  }),
);
