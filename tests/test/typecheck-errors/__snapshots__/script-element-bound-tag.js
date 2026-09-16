import { cs } from "@backtickjs/core";
// A component tag naming a binding the script holds calls it, so what the
// binding holds has to be a function: `Tag` here is a number.
// @ts-expect-error: JSX element type 'Tag' does not have any construct or call signatures.
const held = cs.create(
  [6, 14, 6, 42],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/script-element-bound-tag.test.tsx",
    fileHash: "xwewmj2gozc5",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [6, 17, 6, 41],
    parameters: [
      {
        kind: "param",
        loc: [6, 18, 6, 29],
        name: {
          kind: "id",
          loc: [6, 18, 6, 21],
          text: "Tag",
          bindingKey: "Tag$xwewmj2gozc5$0",
        },
      },
    ],
    body: {
      kind: "jsx",
      loc: [6, 34, 6, 41],
      type: {
        kind: "id",
        loc: [6, 35, 6, 38],
        text: "Tag",
        bindingKey: "Tag$xwewmj2gozc5$0",
      },
      attributes: [],
      children: [],
    },
  }),
);
