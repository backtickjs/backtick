import { cs } from "@backtickjs/core";
// A tag names what the host's JSX namespace answers for, never a binding the
// script holds: `Tag` here is a parameter, and the element is not named by it.
const held = cs.create(
  [5, 14, 5, 42],
  {
    version: "0.0.0",
    filePath: "script-element-bound-tag.tsx",
    fileHash: "3fbb3ihku5tcs",
    kind: "value",
    splices: { $Tag: Tag },
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [5, 17, 5, 41],
    parameters: [
      {
        kind: 170,
        loc: [5, 18, 5, 29],
        name: {
          kind: 80,
          loc: [5, 18, 5, 21],
          text: "Tag",
          bindingKey: "Tag$3fbb3ihku5tcs$0",
        },
      },
    ],
    body: {
      kind: 285,
      loc: [5, 34, 5, 41],
      type: {
        kind: 11,
        loc: [5, 35, 5, 38],
        text: "Tag",
      },
      attributes: [],
      children: [],
    },
  }),
);
