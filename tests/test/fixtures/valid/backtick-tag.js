import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
async function Other() {
  return cs.create(
    [5, 10, 5, 46],
    {
      version: "0.0.0",
      filePath: "backtick-tag.tsx",
      fileHash: "4mv5pfbwzd9z",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [5, 13, 5, 45],
      type: {
        kind: "string",
        loc: [5, 14, 5, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "string",
          loc: [5, 18, 5, 39],
          text: "from another bundle",
        },
      ],
    }),
  );
}
const held = await bundler.run(_jsx(Other, {}));
export default cs.create(
  [10, 16, 17, 2],
  {
    version: "0.0.0",
    filePath: "backtick-tag.tsx",
    fileHash: "4mv5pfbwzd9z",
    splices: { $held: { value: held, params: [] } },
    captures: [],
  },
  () => ({
    kind: "jsx",
    loc: [11, 3, 16, 9],
    type: {
      kind: "string",
      loc: [11, 4, 11, 7],
      text: "div",
    },
    attributes: [],
    children: [
      {
        kind: "jsx",
        loc: [12, 5, 12, 24],
        type: {
          kind: "string",
          loc: [12, 6, 12, 10],
          text: "span",
        },
        attributes: [],
        children: [
          {
            kind: "string",
            loc: [12, 11, 12, 17],
            text: "before",
          },
        ],
      },
      {
        kind: "jsx",
        loc: [13, 5, 13, 32],
        type: {
          kind: "string",
          loc: [13, 6, 13, 14],
          text: "backtick",
        },
        attributes: [
          {
            name: "bundle",
            initializer: {
              kind: "splice",
              loc: [13, 23, 13, 28],
              key: "$held",
            },
          },
        ],
        children: [],
      },
      {
        kind: "jsx",
        loc: [14, 5, 14, 31],
        type: {
          kind: "string",
          loc: [14, 6, 14, 14],
          text: "backtick",
        },
        attributes: [
          {
            name: "bundle",
            initializer: {
              kind: "null",
              loc: [14, 23, 14, 27],
            },
          },
        ],
        children: [],
      },
      {
        kind: "jsx",
        loc: [15, 5, 15, 23],
        type: {
          kind: "string",
          loc: [15, 6, 15, 10],
          text: "span",
        },
        attributes: [],
        children: [
          {
            kind: "string",
            loc: [15, 11, 15, 16],
            text: "after",
          },
        ],
      },
    ],
  }),
);
