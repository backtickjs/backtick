import { jsx as _jsx } from "@backtickjs/web/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { cs, For } from "@backtickjs/core";
// A bundle whose root is a list, drawn by `<backtick />`.
//
// A list evaluates to a function — the accessor its members are read through —
// and a bundle that takes props also evaluates to one, so this is the shape
// where the two have to be told apart.
async function Items() {
  return cs.create(
    [10, 10, 10, 85],
    {
      version: "0.0.0",
      filePath: "backtick-for-root.tsx",
      fileHash: "2l51gjqokdxjm",
      splices: { $For: { value: For, params: [] } },
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [10, 13, 10, 84],
      type: {
        kind: "splice",
        loc: [10, 14, 10, 17],
        key: "$For",
      },
      attributes: [
        {
          name: "each",
          initializer: {
            kind: "arr",
            loc: [10, 24, 10, 33],
            elements: [
              {
                kind: "number",
                loc: [10, 25, 10, 26],
                value: 1,
              },
              {
                kind: "number",
                loc: [10, 28, 10, 29],
                value: 2,
              },
              {
                kind: "number",
                loc: [10, 31, 10, 32],
                value: 3,
              },
            ],
          },
        },
      ],
      children: [
        {
          kind: "=>",
          loc: [10, 36, 10, 77],
          parameters: [
            {
              kind: "param",
              loc: [10, 37, 10, 46],
              name: {
                kind: "id",
                loc: [10, 37, 10, 38],
                text: "n",
                bindingKey: "n$2l51gjqokdxjm$0",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [10, 51, 10, 77],
            type: {
              kind: "string",
              loc: [10, 52, 10, 56],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [10, 58, 10, 69],
                left: {
                  kind: "string",
                  loc: [10, 58, 10, 65],
                  text: "item ",
                },
                operatorToken: "+",
                right: {
                  kind: "id",
                  loc: [10, 68, 10, 69],
                  text: "n",
                  bindingKey: "n$2l51gjqokdxjm$0",
                },
              },
            ],
          },
        },
      ],
    }),
  );
}
const items = await bundler.run(_jsx(Items, {}));
export default cs.create(
  [15, 16, 15, 59],
  {
    version: "0.0.0",
    filePath: "backtick-for-root.tsx",
    fileHash: "2l51gjqokdxjm",
    splices: { $items: { value: items, params: [] } },
    captures: [],
  },
  () => ({
    kind: "jsx",
    loc: [15, 19, 15, 58],
    type: {
      kind: "string",
      loc: [15, 20, 15, 23],
      text: "div",
    },
    attributes: [],
    children: [
      {
        kind: "jsx",
        loc: [15, 24, 15, 52],
        type: {
          kind: "string",
          loc: [15, 25, 15, 33],
          text: "backtick",
        },
        attributes: [
          {
            name: "bundle",
            initializer: {
              kind: "splice",
              loc: [15, 42, 15, 48],
              key: "$items",
            },
          },
        ],
        children: [],
      },
    ],
  }),
);
