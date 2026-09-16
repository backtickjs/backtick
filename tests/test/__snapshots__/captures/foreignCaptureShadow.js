import { cs } from "@backtickjs/core";
// Two distinct captures of one entry that want the same name.
//
// An entry's own free variables can never collide — within one script `base`
// resolves outward to exactly one binding. But an entry also receives whatever
// the arguments it inlines capture, and a fragment written under the outer
// `base` can be carried by host code into a script written under the inner one.
// Both then land in the same environment, under the same source name.
//
// Everything stays nested so both bindings are actually in scope where they are
// threaded to — carrying the fragment somewhere the outer `base` does not
// enclose is a different error.
function innerBase(carried) {
  return cs.create(
    [16, 10, 19, 5],
    {
      version: "0.0.0",
      filePath: "foreignCaptureShadow.tsx",
      fileHash: "37goae93fclz8",
      splices: {
        $0splice0: {
          value: cs.create(
            [18, 14, 18, 33],
            {
              version: "0.0.0",
              filePath: "foreignCaptureShadow.tsx",
              fileHash: "37goae93fclz8",
              splices: { $carried: { value: carried, params: [] } },
              captures: ["base$37goae93fclz8$0"],
            },
            () => ({
              kind: "binop",
              loc: [18, 17, 18, 32],
              left: {
                kind: "id",
                loc: [18, 17, 18, 21],
                text: "base",
                bindingKey: "base$37goae93fclz8$0",
              },
              operatorToken: "+",
              right: {
                kind: "splice",
                loc: [18, 24, 18, 32],
                key: "$carried",
              },
            }),
          ),
          params: ["base$37goae93fclz8$0"],
        },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [16, 13, 19, 4],
      statements: [
        {
          kind: "const",
          loc: [17, 5, 17, 22],
          name: {
            kind: "id",
            loc: [17, 11, 17, 15],
            text: "base",
            bindingKey: "base$37goae93fclz8$0",
          },
          initializer: {
            kind: "number",
            loc: [17, 18, 17, 21],
            value: 100,
          },
        },
        {
          kind: "return",
          loc: [18, 5, 18, 35],
          expression: {
            kind: "splice",
            loc: [18, 12, 18, 34],
            key: "$0splice0",
          },
        },
      ],
    }),
  );
}
const foreignCaptureShadow = cs.create(
  [22, 30, 25, 3],
  {
    version: "0.0.0",
    filePath: "foreignCaptureShadow.tsx",
    fileHash: "37goae93fclz8",
    splices: {
      $0splice0: {
        value: innerBase(
          cs.create(
            [24, 22, 24, 30],
            {
              version: "0.0.0",
              filePath: "foreignCaptureShadow.tsx",
              fileHash: "37goae93fclz8",
              splices: {},
              captures: ["base$37goae93fclz8$1"],
            },
            () => ({
              kind: "id",
              loc: [24, 25, 24, 29],
              text: "base",
              bindingKey: "base$37goae93fclz8$1",
            }),
          ),
        ),
        params: ["base$37goae93fclz8$1"],
      },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [22, 33, 25, 2],
    statements: [
      {
        kind: "const",
        loc: [23, 3, 23, 18],
        name: {
          kind: "id",
          loc: [23, 9, 23, 13],
          text: "base",
          bindingKey: "base$37goae93fclz8$1",
        },
        initializer: {
          kind: "number",
          loc: [23, 16, 23, 17],
          value: 1,
        },
      },
      {
        kind: "return",
        loc: [24, 3, 24, 33],
        expression: {
          kind: "splice",
          loc: [24, 10, 24, 32],
          key: "$0splice0",
        },
      },
    ],
  }),
);
