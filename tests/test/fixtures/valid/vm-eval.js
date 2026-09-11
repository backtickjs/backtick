import { jsx as _jsx } from "@backtickjs/web/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { cs, For, vm } from "@backtickjs/core";
// A bundle evaluated where a script stands, and used by its type: a drawing
// whose root is a list, placed as a child, and a number, added to.
async function Items() {
  return cs.create(
    [7, 10, 7, 85],
    {
      version: "0.0.0",
      filePath: "vm-eval.tsx",
      fileHash: "25vdx40iyy9v4",
      splices: { $For: { value: For, params: [] } },
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [7, 13, 7, 84],
      type: {
        kind: "splice",
        loc: [7, 14, 7, 17],
        key: "$For",
      },
      attributes: [
        {
          name: "each",
          initializer: {
            kind: "arr",
            loc: [7, 24, 7, 33],
            elements: [
              {
                kind: "number",
                loc: [7, 25, 7, 26],
                value: 1,
              },
              {
                kind: "number",
                loc: [7, 28, 7, 29],
                value: 2,
              },
              {
                kind: "number",
                loc: [7, 31, 7, 32],
                value: 3,
              },
            ],
          },
        },
      ],
      children: [
        {
          kind: "=>",
          loc: [7, 36, 7, 77],
          parameters: [
            {
              kind: "param",
              loc: [7, 37, 7, 46],
              name: {
                kind: "id",
                loc: [7, 37, 7, 38],
                text: "n",
                bindingKey: "n$25vdx40iyy9v4$0",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [7, 51, 7, 77],
            type: {
              kind: "string",
              loc: [7, 52, 7, 56],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [7, 58, 7, 69],
                left: {
                  kind: "string",
                  loc: [7, 58, 7, 65],
                  text: "item ",
                },
                operatorToken: "+",
                right: {
                  kind: "id",
                  loc: [7, 68, 7, 69],
                  text: "n",
                  bindingKey: "n$25vdx40iyy9v4$0",
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
const total = await bundler.run(41);
export default cs.create(
  [13, 16, 13, 78],
  {
    version: "0.0.0",
    filePath: "vm-eval.tsx",
    fileHash: "25vdx40iyy9v4",
    splices: {
      $vm: { value: vm, params: [] },
      $items: { value: items, params: [] },
      $total: { value: total, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "jsx",
    loc: [13, 19, 13, 77],
    type: {
      kind: "string",
      loc: [13, 20, 13, 23],
      text: "div",
    },
    attributes: [],
    children: [
      {
        kind: "()",
        loc: [13, 25, 13, 41],
        expression: {
          kind: ".",
          loc: [13, 25, 13, 33],
          expression: {
            kind: "splice",
            loc: [13, 25, 13, 28],
            key: "$vm",
          },
          name: "eval",
        },
        arguments: [
          {
            kind: "splice",
            loc: [13, 34, 13, 40],
            key: "$items",
          },
        ],
      },
      {
        kind: "jsx",
        loc: [13, 42, 13, 71],
        type: {
          kind: "string",
          loc: [13, 43, 13, 44],
          text: "b",
        },
        attributes: [],
        children: [
          {
            kind: "binop",
            loc: [13, 46, 13, 66],
            left: {
              kind: "()",
              loc: [13, 46, 13, 62],
              expression: {
                kind: ".",
                loc: [13, 46, 13, 54],
                expression: {
                  kind: "splice",
                  loc: [13, 46, 13, 49],
                  key: "$vm",
                },
                name: "eval",
              },
              arguments: [
                {
                  kind: "splice",
                  loc: [13, 55, 13, 61],
                  key: "$total",
                },
              ],
            },
            operatorToken: "+",
            right: {
              kind: "number",
              loc: [13, 65, 13, 66],
              value: 1,
            },
          },
        ],
      },
    ],
  }),
);
