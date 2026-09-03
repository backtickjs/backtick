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
              kind: "id",
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
    kind: "{}",
    loc: [7, 19, 10, 2],
    statements: [
      {
        kind: "const",
        loc: [8, 3, 8, 19],
        name: {
          kind: "id",
          loc: [8, 9, 8, 13],
          text: "base",
          bindingKey: "base$1q50brt6ov79t$0",
        },
        initializer: {
          kind: "number",
          loc: [8, 16, 8, 18],
          value: 10,
        },
      },
      {
        kind: "return",
        loc: [9, 3, 9, 29],
        expression: {
          kind: "splice",
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
      kind: "{}",
      loc: [13, 13, 16, 4],
      statements: [
        {
          kind: "const",
          loc: [14, 5, 14, 20],
          name: {
            kind: "id",
            loc: [14, 11, 14, 15],
            text: "base",
            bindingKey: "base$1q50brt6ov79t$1",
          },
          initializer: {
            kind: "number",
            loc: [14, 18, 14, 19],
            value: 1,
          },
        },
        {
          kind: "return",
          loc: [15, 5, 15, 36],
          expression: {
            kind: "binop",
            loc: [15, 12, 15, 35],
            left: {
              kind: "id",
              loc: [15, 12, 15, 16],
              text: "base",
              bindingKey: "base$1q50brt6ov79t$1",
            },
            operatorToken: "+",
            right: {
              kind: "splice",
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
      kind: "{}",
      loc: [20, 13, 23, 4],
      statements: [
        {
          kind: "const",
          loc: [21, 5, 21, 20],
          name: {
            kind: "id",
            loc: [21, 11, 21, 15],
            text: "base",
            bindingKey: "base$1q50brt6ov79t$2",
          },
          initializer: {
            kind: "number",
            loc: [21, 18, 21, 19],
            value: 2,
          },
        },
        {
          kind: "return",
          loc: [22, 5, 22, 26],
          expression: {
            kind: "binop",
            loc: [22, 12, 22, 25],
            left: {
              kind: "id",
              loc: [22, 12, 22, 16],
              text: "base",
              bindingKey: "base$1q50brt6ov79t$2",
            },
            operatorToken: "*",
            right: {
              kind: "splice",
              loc: [22, 19, 22, 25],
              key: "$inner",
            },
          },
        },
      ],
    }),
  );
}
