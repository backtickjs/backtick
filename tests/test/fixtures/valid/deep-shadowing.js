import { cs } from "@backtickjs/core";
// `cs`base`` is written under the outer `base`, but is threaded through two host
// functions that each shadow `base` with their own binding. The captured value
// must reach the leaf untouched, so the threaded channel is renamed away from
// every `base` it passes through.
export default cs.create(
  [7, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "deep-shadowing.ts",
    fileHash: "1q50brt6ov79t",
    splices: {
      $0splice0: {
        value: outer(
          cs.create(
            [9, 18, 9, 26],
            {
              version: "0.0.0",
              filePath: "deep-shadowing.ts",
              fileHash: "1q50brt6ov79t",
              splices: {},
              captures: ["base$1q50brt6ov79t$0"],
            },
            () => ({
              kind: 80,
              loc: [9, 21, 9, 25],
              text: "base",
              bindingKey: "base$1q50brt6ov79t$0",
            }),
          ),
        ),
        params: ["base$1q50brt6ov79t$0"],
      },
    },
    captures: [],
  },
  () => ({
    kind: 242,
    loc: [7, 19, 10, 2],
    statements: [
      {
        kind: 244,
        loc: [8, 3, 8, 19],
        declarationList: {
          kind: 262,
          loc: [8, 3, 8, 18],
          declarations: [
            {
              kind: 261,
              loc: [8, 9, 8, 18],
              name: {
                kind: 80,
                loc: [8, 9, 8, 13],
                text: "base",
                bindingKey: "base$1q50brt6ov79t$0",
              },
              initializer: {
                kind: 9,
                loc: [8, 16, 8, 18],
                value: 10,
              },
            },
          ],
          keyword: "const",
        },
      },
      {
        kind: 254,
        loc: [9, 3, 9, 29],
        expression: {
          kind: 1000,
          loc: [9, 10, 9, 28],
          key: "$0splice0",
        },
      },
    ],
  }),
);
function outer(inner) {
  return cs.create(
    [13, 10, 16, 5],
    {
      version: "0.0.0",
      filePath: "deep-shadowing.ts",
      fileHash: "1q50brt6ov79t",
      splices: { $0splice0: { value: middle(inner), params: [] } },
      captures: [],
    },
    () => ({
      kind: 242,
      loc: [13, 13, 16, 4],
      statements: [
        {
          kind: 244,
          loc: [14, 5, 14, 20],
          declarationList: {
            kind: 262,
            loc: [14, 5, 14, 19],
            declarations: [
              {
                kind: 261,
                loc: [14, 11, 14, 19],
                name: {
                  kind: 80,
                  loc: [14, 11, 14, 15],
                  text: "base",
                  bindingKey: "base$1q50brt6ov79t$1",
                },
                initializer: {
                  kind: 9,
                  loc: [14, 18, 14, 19],
                  value: 1,
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [15, 5, 15, 36],
          expression: {
            kind: 227,
            loc: [15, 12, 15, 35],
            left: {
              kind: 80,
              loc: [15, 12, 15, 16],
              text: "base",
              bindingKey: "base$1q50brt6ov79t$1",
            },
            operatorToken: "+",
            right: {
              kind: 1000,
              loc: [15, 19, 15, 35],
              key: "$0splice0",
            },
          },
        },
      ],
    }),
  );
}
function middle(inner) {
  return cs.create(
    [20, 10, 23, 5],
    {
      version: "0.0.0",
      filePath: "deep-shadowing.ts",
      fileHash: "1q50brt6ov79t",
      splices: { $inner: { value: inner, params: [] } },
      captures: [],
    },
    () => ({
      kind: 242,
      loc: [20, 13, 23, 4],
      statements: [
        {
          kind: 244,
          loc: [21, 5, 21, 20],
          declarationList: {
            kind: 262,
            loc: [21, 5, 21, 19],
            declarations: [
              {
                kind: 261,
                loc: [21, 11, 21, 19],
                name: {
                  kind: 80,
                  loc: [21, 11, 21, 15],
                  text: "base",
                  bindingKey: "base$1q50brt6ov79t$2",
                },
                initializer: {
                  kind: 9,
                  loc: [21, 18, 21, 19],
                  value: 2,
                },
              },
            ],
            keyword: "const",
          },
        },
        {
          kind: 254,
          loc: [22, 5, 22, 26],
          expression: {
            kind: 227,
            loc: [22, 12, 22, 25],
            left: {
              kind: 80,
              loc: [22, 12, 22, 16],
              text: "base",
              bindingKey: "base$1q50brt6ov79t$2",
            },
            operatorToken: "*",
            right: {
              kind: 1000,
              loc: [22, 19, 22, 25],
              key: "$inner",
            },
          },
        },
      ],
    }),
  );
}
