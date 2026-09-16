import { cs } from "@backtickjs/core";
// `cs`base`` is written under the outer `base`, but is threaded through two host
// functions that each shadow `base` with their own binding. The captured value
// must reach the leaf untouched, so the threaded channel is renamed away from
// every `base` it passes through.
const deepShadowing = cs.create(
  [8, 23, 11, 3],
  {
    version: "0.0.0",
    filePath: "deepShadowing.tsx",
    fileHash: "2b9c5en0ob4n9",
    splices: {
      $0splice0: {
        value: outerBase(
          cs.create(
            [10, 22, 10, 30],
            {
              version: "0.0.0",
              filePath: "deepShadowing.tsx",
              fileHash: "2b9c5en0ob4n9",
              splices: {},
              captures: ["base$2b9c5en0ob4n9$0"],
            },
            () => ({
              kind: "id",
              loc: [10, 25, 10, 29],
              text: "base",
              bindingKey: "base$2b9c5en0ob4n9$0",
            }),
          ),
        ),
        params: ["base$2b9c5en0ob4n9$0"],
      },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [8, 26, 11, 2],
    statements: [
      {
        kind: "const",
        loc: [9, 3, 9, 19],
        name: {
          kind: "id",
          loc: [9, 9, 9, 13],
          text: "base",
          bindingKey: "base$2b9c5en0ob4n9$0",
        },
        initializer: {
          kind: "number",
          loc: [9, 16, 9, 18],
          value: 10,
        },
      },
      {
        kind: "return",
        loc: [10, 3, 10, 33],
        expression: {
          kind: "splice",
          loc: [10, 10, 10, 32],
          key: "$0splice0",
        },
      },
    ],
  }),
);
function outerBase(inner) {
  return cs.create(
    [14, 10, 17, 5],
    {
      version: "0.0.0",
      filePath: "deepShadowing.tsx",
      fileHash: "2b9c5en0ob4n9",
      splices: { $0splice0: { value: middleBase(inner), params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [14, 13, 17, 4],
      statements: [
        {
          kind: "const",
          loc: [15, 5, 15, 20],
          name: {
            kind: "id",
            loc: [15, 11, 15, 15],
            text: "base",
            bindingKey: "base$2b9c5en0ob4n9$1",
          },
          initializer: {
            kind: "number",
            loc: [15, 18, 15, 19],
            value: 1,
          },
        },
        {
          kind: "return",
          loc: [16, 5, 16, 40],
          expression: {
            kind: "binop",
            loc: [16, 12, 16, 39],
            left: {
              kind: "id",
              loc: [16, 12, 16, 16],
              text: "base",
              bindingKey: "base$2b9c5en0ob4n9$1",
            },
            operatorToken: "+",
            right: {
              kind: "splice",
              loc: [16, 19, 16, 39],
              key: "$0splice0",
            },
          },
        },
      ],
    }),
  );
}
function middleBase(inner) {
  return cs.create(
    [21, 10, 24, 5],
    {
      version: "0.0.0",
      filePath: "deepShadowing.tsx",
      fileHash: "2b9c5en0ob4n9",
      splices: { $inner: { value: inner, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [21, 13, 24, 4],
      statements: [
        {
          kind: "const",
          loc: [22, 5, 22, 20],
          name: {
            kind: "id",
            loc: [22, 11, 22, 15],
            text: "base",
            bindingKey: "base$2b9c5en0ob4n9$2",
          },
          initializer: {
            kind: "number",
            loc: [22, 18, 22, 19],
            value: 2,
          },
        },
        {
          kind: "return",
          loc: [23, 5, 23, 26],
          expression: {
            kind: "binop",
            loc: [23, 12, 23, 25],
            left: {
              kind: "id",
              loc: [23, 12, 23, 16],
              text: "base",
              bindingKey: "base$2b9c5en0ob4n9$2",
            },
            operatorToken: "*",
            right: {
              kind: "splice",
              loc: [23, 19, 23, 25],
              key: "$inner",
            },
          },
        },
      ],
    }),
  );
}
