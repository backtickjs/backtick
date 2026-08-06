import { jsx as _jsx } from "@backtickjs/core/jsx-runtime";
import { cs, View } from "@backtickjs/core";
// A fragment a script writes: its children where it stands, and no node of its
// own — the same `Fragment` element the tree path writes for `<>`.
//
// And text as JSX reads it, which is not `trim()`. Across lines it is one
// sentence; on one line its spaces are its own; and the space between two
// expressions survives, where trimming would take it.
const listed = cs.create(
  [9, 16, 16, 3],
  {
    version: "0.0.0",
    filePath: "script-fragment.tsx",
    fileHash: "3kv5kwgfahv4i",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [9, 19, 16, 2],
    parameters: [
      {
        kind: 170,
        loc: [9, 20, 9, 32],
        name: {
          kind: 80,
          loc: [9, 20, 9, 24],
          text: "name",
          bindingKey: "name$3kv5kwgfahv4i$0",
        },
      },
    ],
    body: {
      kind: 285,
      loc: [10, 3, 15, 6],
      tagName: {
        kind: 11,
        loc: [10, 3, 15, 6],
        text: "Fragment",
      },
      attributes: [],
      children: [
        {
          kind: 285,
          loc: [11, 5, 11, 41],
          tagName: {
            kind: 11,
            loc: [11, 6, 11, 10],
            text: "Text",
          },
          attributes: [],
          children: [
            {
              kind: 11,
              loc: [11, 11, 11, 34],
              text: "a sentence across lines",
            },
          ],
        },
        {
          kind: 285,
          loc: [12, 5, 14, 12],
          tagName: {
            kind: 11,
            loc: [12, 6, 12, 10],
            text: "Text",
          },
          attributes: [],
          children: [
            {
              kind: 80,
              loc: [13, 8, 13, 12],
              text: "name",
              bindingKey: "name$3kv5kwgfahv4i$0",
            },
            {
              kind: 11,
              loc: [13, 14, 13, 14],
              text: " ",
            },
            {
              kind: 80,
              loc: [13, 15, 13, 19],
              text: "name",
              bindingKey: "name$3kv5kwgfahv4i$0",
            },
          ],
        },
      ],
    },
  }),
);
export default _jsx(View, {
  children: cs.create(
    [18, 23, 18, 39],
    {
      version: "0.0.0",
      filePath: "script-fragment.tsx",
      fileHash: "3kv5kwgfahv4i",
      kind: "value",
      splices: { $listed: listed },
      captures: [],
      spliceParams: { $listed: [] },
    },
    () => ({
      kind: 214,
      loc: [18, 26, 18, 38],
      expression: {
        kind: 1000,
        loc: [18, 26, 18, 33],
        key: "$listed",
      },
      questionDotToken: false,
      arguments: [
        {
          kind: 11,
          loc: [18, 34, 18, 37],
          text: "x",
        },
      ],
    }),
  ),
});
