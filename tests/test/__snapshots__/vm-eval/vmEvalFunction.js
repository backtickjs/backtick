import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";
// A bundle whose value is a function: evaluated, then called like any other.
// One answers a string; the other a drawing, handed its props as a value.
const greet = await bundler.run(
  cs.create(
    [6, 33, 6, 70],
    {
      version: "0.0.0",
      filePath: "vmEvalFunction.tsx",
      fileHash: "3qgzlmtf71kcu",
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
            bindingKey: "name$3qgzlmtf71kcu$0",
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
          bindingKey: "name$3qgzlmtf71kcu$0",
        },
      },
    }),
  ),
);
const badge = await bundler.run(
  cs.create(
    [9, 3, 9, 68],
    {
      version: "0.0.0",
      filePath: "vmEvalFunction.tsx",
      fileHash: "3qgzlmtf71kcu",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [9, 6, 9, 67],
      parameters: [
        {
          kind: "param",
          loc: [9, 7, 9, 31],
          name: {
            kind: "id",
            loc: [9, 7, 9, 12],
            text: "props",
            bindingKey: "props$3qgzlmtf71kcu$1",
          },
        },
      ],
      body: {
        kind: "jsx",
        loc: [9, 36, 9, 67],
        type: {
          kind: "string",
          loc: [9, 37, 9, 38],
          text: "b",
        },
        attributes: [],
        children: [
          {
            kind: "binop",
            loc: [9, 40, 9, 62],
            left: {
              kind: "string",
              loc: [9, 40, 9, 48],
              text: "count ",
            },
            operatorToken: "+",
            right: {
              kind: ".",
              loc: [9, 51, 9, 62],
              expression: {
                kind: "id",
                loc: [9, 51, 9, 56],
                text: "props",
                bindingKey: "props$3qgzlmtf71kcu$1",
              },
              name: "count",
            },
          },
        ],
      },
    }),
  ),
);
const vmEvalFunction = cs.create(
  [12, 24, 15, 8],
  {
    version: "0.0.0",
    filePath: "vmEvalFunction.tsx",
    fileHash: "3qgzlmtf71kcu",
    splices: {
      $vm: { value: vm, params: [] },
      $greet: { value: greet, params: [] },
      $badge: { value: badge, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "jsx",
    loc: [12, 27, 15, 7],
    type: {
      kind: "string",
      loc: [12, 28, 12, 31],
      text: "div",
    },
    attributes: [],
    children: [
      {
        kind: "jsx",
        loc: [13, 3, 13, 41],
        type: {
          kind: "string",
          loc: [13, 4, 13, 8],
          text: "span",
        },
        attributes: [],
        children: [
          {
            kind: "()",
            loc: [13, 10, 13, 33],
            expression: {
              kind: "()",
              loc: [13, 10, 13, 26],
              expression: {
                kind: ".",
                loc: [13, 10, 13, 18],
                expression: {
                  kind: "splice",
                  loc: [13, 10, 13, 13],
                  key: "$vm",
                },
                name: "eval",
              },
              arguments: [
                {
                  kind: "splice",
                  loc: [13, 19, 13, 25],
                  key: "$greet",
                },
              ],
            },
            arguments: [
              {
                kind: "string",
                loc: [13, 27, 13, 32],
                text: "ada",
              },
            ],
          },
        ],
      },
      {
        kind: "()",
        loc: [14, 4, 14, 34],
        expression: {
          kind: "()",
          loc: [14, 4, 14, 20],
          expression: {
            kind: ".",
            loc: [14, 4, 14, 12],
            expression: {
              kind: "splice",
              loc: [14, 4, 14, 7],
              key: "$vm",
            },
            name: "eval",
          },
          arguments: [
            {
              kind: "splice",
              loc: [14, 13, 14, 19],
              key: "$badge",
            },
          ],
        },
        arguments: [
          {
            kind: "obj",
            loc: [14, 21, 14, 33],
            properties: [
              {
                kind: ":",
                loc: [14, 23, 14, 31],
                name: "count",
                initializer: {
                  kind: "number",
                  loc: [14, 30, 14, 31],
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
