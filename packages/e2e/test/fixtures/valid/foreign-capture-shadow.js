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
function inner(carried) {
  return cs.create(
    [15, 10, 18, 5],
    {
      version: "0.0.0",
      filePath: "foreign-capture-shadow.ts",
      fileHash: "2dzpugititb9o",
      kind: "value",
      splices: {
        $0splice0: cs.create(
          [17, 14, 17, 33],
          {
            version: "0.0.0",
            filePath: "foreign-capture-shadow.ts",
            fileHash: "2dzpugititb9o",
            kind: "value",
            splices: { $carried: carried },
            captures: ["base$2dzpugititb9o$0"],
            spliceParams: { $carried: [] },
          },
          () => ({
            kind: 227,
            loc: [17, 17, 17, 32],
            left: {
              kind: 80,
              loc: [17, 17, 17, 21],
              text: "base",
              bindingKey: "base$2dzpugititb9o$0",
            },
            operatorToken: "+",
            right: {
              kind: 1000,
              loc: [17, 24, 17, 32],
              key: "$carried",
            },
          }),
        ),
      },
      captures: [],
      spliceParams: { $0splice0: ["base$2dzpugititb9o$0"] },
    },
    () => ({
      kind: 242,
      loc: [15, 13, 18, 4],
      statements: [
        {
          kind: 261,
          loc: [16, 5, 16, 22],
          name: {
            kind: 80,
            loc: [16, 11, 16, 15],
            text: "base",
            bindingKey: "base$2dzpugititb9o$0",
          },
          initializer: {
            kind: 9,
            loc: [16, 18, 16, 21],
            value: 100,
          },
          keyword: "const",
        },
        {
          kind: 254,
          loc: [17, 5, 17, 35],
          expression: {
            kind: 1000,
            loc: [17, 12, 17, 34],
            key: "$0splice0",
          },
        },
      ],
    }),
  );
}
export default cs.create(
  [21, 16, 24, 3],
  {
    version: "0.0.0",
    filePath: "foreign-capture-shadow.ts",
    fileHash: "2dzpugititb9o",
    kind: "value",
    splices: {
      $0splice0: inner(
        cs.create(
          [23, 18, 23, 26],
          {
            version: "0.0.0",
            filePath: "foreign-capture-shadow.ts",
            fileHash: "2dzpugititb9o",
            kind: "value",
            splices: {},
            captures: ["base$2dzpugititb9o$1"],
            spliceParams: {},
          },
          () => ({
            kind: 80,
            loc: [23, 21, 23, 25],
            text: "base",
            bindingKey: "base$2dzpugititb9o$1",
          }),
        ),
      ),
    },
    captures: [],
    spliceParams: { $0splice0: ["base$2dzpugititb9o$1"] },
  },
  () => ({
    kind: 242,
    loc: [21, 19, 24, 2],
    statements: [
      {
        kind: 261,
        loc: [22, 3, 22, 18],
        name: {
          kind: 80,
          loc: [22, 9, 22, 13],
          text: "base",
          bindingKey: "base$2dzpugititb9o$1",
        },
        initializer: {
          kind: 9,
          loc: [22, 16, 22, 17],
          value: 1,
        },
        keyword: "const",
      },
      {
        kind: 254,
        loc: [23, 3, 23, 29],
        expression: {
          kind: 1000,
          loc: [23, 10, 23, 28],
          key: "$0splice0",
        },
      },
    ],
  }),
);
