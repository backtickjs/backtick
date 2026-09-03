import { cs } from "@backtickjs/core";
// A tag names what the host's JSX namespace answers for, never a binding the
// script holds: `Tag` here is a parameter, and the element is not named by it.
const held = cs.create(
  [5, 14, 5, 42],
  {
    version: "0.0.0",
    filePath: "script-element-bound-tag.tsx",
    fileHash: "3fbb3ihku5tcs",
    splices: { $Tag: { value: Tag, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [5, 17, 5, 41],
    parameters: [
      {
        kind: "param",
        loc: [5, 18, 5, 29],
        name: {
          kind: "id",
          loc: [5, 18, 5, 21],
          text: "Tag",
          bindingKey: "Tag$3fbb3ihku5tcs$0",
        },
      },
    ],
    body: {
      kind: "jsx",
      loc: [5, 34, 5, 41],
      type: {
        kind: "splice",
        loc: [5, 35, 5, 38],
        key: "$Tag",
      },
      attributes: [],
      children: [],
    },
  }),
);
