import { cs } from "@backtickjs/core";
// A bundle drawn inside a drawing, and a bundle that is not there yet.
//
// What lands in the drawing is what the inner bundle drew — no element of its
// own. A backtick draws no node, the way a list does not, so nothing of the tag
// reaches the target.
const held = JSON.stringify({
  functions: { "0": ["=>", [], ["el", "em", {}, "from another bundle"]] },
  root: ["()", ["fn", "0"], []],
});
export default cs.create(
  [13, 16, 20, 2],
  {
    version: "0.0.0",
    filePath: "backtick-tag.tsx",
    fileHash: "3gjjofa7q3mtq",
    splices: { $held: { value: held, params: [] } },
    captures: [],
  },
  () => ({
    kind: "jsx",
    loc: [14, 3, 19, 9],
    type: {
      kind: "string",
      loc: [14, 4, 14, 7],
      text: "div",
    },
    attributes: [],
    children: [
      {
        kind: "jsx",
        loc: [15, 5, 15, 24],
        type: {
          kind: "string",
          loc: [15, 6, 15, 10],
          text: "span",
        },
        attributes: [],
        children: [
          {
            kind: "string",
            loc: [15, 11, 15, 17],
            text: "before",
          },
        ],
      },
      {
        kind: "jsx",
        loc: [16, 5, 16, 32],
        type: {
          kind: "string",
          loc: [16, 6, 16, 14],
          text: "backtick",
        },
        attributes: [
          {
            name: "bundle",
            initializer: {
              kind: "splice",
              loc: [16, 23, 16, 28],
              key: "$held",
            },
          },
        ],
        children: [],
      },
      {
        kind: "jsx",
        loc: [17, 5, 17, 31],
        type: {
          kind: "string",
          loc: [17, 6, 17, 14],
          text: "backtick",
        },
        attributes: [
          {
            name: "bundle",
            initializer: {
              kind: "null",
              loc: [17, 23, 17, 27],
            },
          },
        ],
        children: [],
      },
      {
        kind: "jsx",
        loc: [18, 5, 18, 23],
        type: {
          kind: "string",
          loc: [18, 6, 18, 10],
          text: "span",
        },
        attributes: [],
        children: [
          {
            kind: "string",
            loc: [18, 11, 18, 16],
            text: "after",
          },
        ],
      },
    ],
  }),
);
