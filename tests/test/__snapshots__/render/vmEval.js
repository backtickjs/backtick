import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { cs, For, vm } from "@backtickjs/core";
// A bundle evaluated where a script stands, and used by its type: a drawing
// whose root is a list, placed as a child, and a number, added to.
async function Items() {
  return cs.create(
    [7, 10, 9, 10],
    {
      version: "0.0.0",
      filePath: "vmEval.tsx",
      fileHash: "1lvuqq09ysevw",
      splices: { $For: { value: For, params: [] } },
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [7, 13, 9, 9],
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
          loc: [8, 6, 8, 47],
          parameters: [
            {
              kind: "param",
              loc: [8, 7, 8, 16],
              name: {
                kind: "id",
                loc: [8, 7, 8, 8],
                text: "n",
                bindingKey: "n$1lvuqq09ysevw$0",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [8, 21, 8, 47],
            type: {
              kind: "string",
              loc: [8, 22, 8, 26],
              text: "span",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [8, 28, 8, 39],
                left: {
                  kind: "string",
                  loc: [8, 28, 8, 35],
                  text: "item ",
                },
                operatorToken: "+",
                right: {
                  kind: "id",
                  loc: [8, 38, 8, 39],
                  text: "n",
                  bindingKey: "n$1lvuqq09ysevw$0",
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
const vmEval = cs.create(
  [16, 16, 19, 8],
  {
    version: "0.0.0",
    filePath: "vmEval.tsx",
    fileHash: "1lvuqq09ysevw",
    splices: {
      $vm: { value: vm, params: [] },
      $items: { value: items, params: [] },
      $total: { value: total, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "jsx",
    loc: [16, 19, 19, 7],
    type: {
      kind: "string",
      loc: [16, 20, 16, 23],
      text: "div",
    },
    attributes: [],
    children: [
      {
        kind: "()",
        loc: [17, 4, 17, 20],
        expression: {
          kind: ".",
          loc: [17, 4, 17, 12],
          expression: {
            kind: "splice",
            loc: [17, 4, 17, 7],
            key: "$vm",
          },
          name: "eval",
        },
        arguments: [
          {
            kind: "splice",
            loc: [17, 13, 17, 19],
            key: "$items",
          },
        ],
      },
      {
        kind: "jsx",
        loc: [18, 3, 18, 32],
        type: {
          kind: "string",
          loc: [18, 4, 18, 5],
          text: "b",
        },
        attributes: [],
        children: [
          {
            kind: "binop",
            loc: [18, 7, 18, 27],
            left: {
              kind: "()",
              loc: [18, 7, 18, 23],
              expression: {
                kind: ".",
                loc: [18, 7, 18, 15],
                expression: {
                  kind: "splice",
                  loc: [18, 7, 18, 10],
                  key: "$vm",
                },
                name: "eval",
              },
              arguments: [
                {
                  kind: "splice",
                  loc: [18, 16, 18, 22],
                  key: "$total",
                },
              ],
            },
            operatorToken: "+",
            right: {
              kind: "number",
              loc: [18, 26, 18, 27],
              value: 1,
            },
          },
        ],
      },
    ],
  }),
);
