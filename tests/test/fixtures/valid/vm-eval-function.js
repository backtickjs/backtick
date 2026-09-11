import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";
// A bundle whose value is a function: evaluated, then called like any other.
// One answers a string; the other a drawing, handed its props as a value.
const greet = await bundler.run(
  cs.create(
    [6, 33, 6, 70],
    {
      version: "0.0.0",
      filePath: "vm-eval-function.tsx",
      fileHash: "1f4tbn3qwjm6y",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [6, 36, 6, 69],
      parameters: [
        {
          kind: "param",
          loc: [6, 37, 6, 49],
          name: {
            kind: "id",
            loc: [6, 37, 6, 41],
            text: "name",
            bindingKey: "name$1f4tbn3qwjm6y$0",
          },
        },
      ],
      body: {
        kind: "binop",
        loc: [6, 54, 6, 69],
        left: {
          kind: "string",
          loc: [6, 54, 6, 62],
          text: "hello ",
        },
        operatorToken: "+",
        right: {
          kind: "id",
          loc: [6, 65, 6, 69],
          text: "name",
          bindingKey: "name$1f4tbn3qwjm6y$0",
        },
      },
    }),
  ),
);
const badge = await bundler.run(
  cs.create(
    [8, 3, 8, 68],
    {
      version: "0.0.0",
      filePath: "vm-eval-function.tsx",
      fileHash: "1f4tbn3qwjm6y",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [8, 6, 8, 67],
      parameters: [
        {
          kind: "param",
          loc: [8, 7, 8, 31],
          name: {
            kind: "id",
            loc: [8, 7, 8, 12],
            text: "props",
            bindingKey: "props$1f4tbn3qwjm6y$1",
          },
        },
      ],
      body: {
        kind: "jsx",
        loc: [8, 36, 8, 67],
        type: {
          kind: "string",
          loc: [8, 37, 8, 38],
          text: "b",
        },
        attributes: [],
        children: [
          {
            kind: "binop",
            loc: [8, 40, 8, 62],
            left: {
              kind: "string",
              loc: [8, 40, 8, 48],
              text: "count ",
            },
            operatorToken: "+",
            right: {
              kind: ".",
              loc: [8, 51, 8, 62],
              expression: {
                kind: "id",
                loc: [8, 51, 8, 56],
                text: "props",
                bindingKey: "props$1f4tbn3qwjm6y$1",
              },
              name: "count",
            },
          },
        ],
      },
    }),
  ),
);
export default cs.create(
  [11, 16, 14, 8],
  {
    version: "0.0.0",
    filePath: "vm-eval-function.tsx",
    fileHash: "1f4tbn3qwjm6y",
    splices: {
      $vm: { value: vm, params: [] },
      $greet: { value: greet, params: [] },
      $badge: { value: badge, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "jsx",
    loc: [11, 19, 14, 7],
    type: {
      kind: "string",
      loc: [11, 20, 11, 23],
      text: "div",
    },
    attributes: [],
    children: [
      {
        kind: "jsx",
        loc: [12, 3, 12, 41],
        type: {
          kind: "string",
          loc: [12, 4, 12, 8],
          text: "span",
        },
        attributes: [],
        children: [
          {
            kind: "()",
            loc: [12, 10, 12, 33],
            expression: {
              kind: "()",
              loc: [12, 10, 12, 26],
              expression: {
                kind: ".",
                loc: [12, 10, 12, 18],
                expression: {
                  kind: "splice",
                  loc: [12, 10, 12, 13],
                  key: "$vm",
                },
                name: "eval",
              },
              arguments: [
                {
                  kind: "splice",
                  loc: [12, 19, 12, 25],
                  key: "$greet",
                },
              ],
            },
            arguments: [
              {
                kind: "string",
                loc: [12, 27, 12, 32],
                text: "ada",
              },
            ],
          },
        ],
      },
      {
        kind: "()",
        loc: [13, 4, 13, 34],
        expression: {
          kind: "()",
          loc: [13, 4, 13, 20],
          expression: {
            kind: ".",
            loc: [13, 4, 13, 12],
            expression: {
              kind: "splice",
              loc: [13, 4, 13, 7],
              key: "$vm",
            },
            name: "eval",
          },
          arguments: [
            {
              kind: "splice",
              loc: [13, 13, 13, 19],
              key: "$badge",
            },
          ],
        },
        arguments: [
          {
            kind: "obj",
            loc: [13, 21, 13, 33],
            properties: [
              {
                kind: ":",
                loc: [13, 23, 13, 31],
                name: "count",
                initializer: {
                  kind: "number",
                  loc: [13, 30, 13, 31],
                  value: 3,
                },
              },
            ],
          },
        ],
      },
    ],
  }),
);
