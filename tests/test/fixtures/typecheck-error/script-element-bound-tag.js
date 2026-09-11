import { cs } from "@backtickjs/core";
// A component tag naming a binding the script holds calls it, so what the
// binding holds has to be a function: `Tag` here is a number.
const held = cs.create(
  [5, 14, 5, 42],
  {
    version: "0.0.0",
    filePath: "script-element-bound-tag.tsx",
    fileHash: "25t65ua6o2t2f",
    splices: {},
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
          bindingKey: "Tag$25t65ua6o2t2f$0",
        },
      },
    ],
    body: {
      kind: "jsx",
      loc: [5, 34, 5, 41],
      type: {
        kind: "id",
        loc: [5, 35, 5, 38],
        text: "Tag",
        bindingKey: "Tag$25t65ua6o2t2f$0",
      },
      attributes: [],
      children: [],
    },
  }),
);
