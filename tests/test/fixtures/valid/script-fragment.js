import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs } from "@backtickjs/core";
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
    fileHash: "eweogd4x2tuk",
    splices: {},
    captures: [],
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
          bindingKey: "name$eweogd4x2tuk$0",
        },
      },
    ],
    body: {
      kind: 210,
      loc: [10, 3, 15, 6],
      elements: [
        {
          kind: 285,
          loc: [11, 5, 11, 41],
          type: {
            kind: 11,
            loc: [11, 6, 11, 10],
            text: "span",
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
          type: {
            kind: 11,
            loc: [12, 6, 12, 10],
            text: "span",
          },
          attributes: [],
          children: [
            {
              kind: 80,
              loc: [13, 8, 13, 12],
              text: "name",
              bindingKey: "name$eweogd4x2tuk$0",
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
              bindingKey: "name$eweogd4x2tuk$0",
            },
          ],
        },
      ],
    },
  }),
);
export default _jsx("div", {
  children: cs.create(
    [18, 22, 18, 38],
    {
      version: "0.0.0",
      filePath: "script-fragment.tsx",
      fileHash: "eweogd4x2tuk",
      splices: { $listed: { value: listed, params: [] } },
      captures: [],
    },
    () => ({
      kind: 214,
      loc: [18, 25, 18, 37],
      expression: {
        kind: 1000,
        loc: [18, 25, 18, 32],
        key: "$listed",
      },
      questionDotToken: false,
      arguments: [
        {
          kind: 11,
          loc: [18, 33, 18, 36],
          text: "x",
        },
      ],
    }),
  ),
});
