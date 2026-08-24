import { cs, state } from "@backtickjs/core";
// One script location, reached twice: once with a builtin filling its hole and
// once with a script. They are two entries, because a builtin is written into
// the body — `#f1` writes `state` and takes no parameter, where `#f2` takes the
// thunk every other splice takes.
//
// Sharing one entry would be a miscompile: whichever arrived first fixes the
// body, and the other reference then passes an argument nothing reads, or
// passes none where one is read. `wrapped` adds ten so that shows in the value
// as well as in the bundle — shared, `1 + 1`; separate, `1 + 11`.
const make = (f) =>
  cs.create(
    [14, 3, 16, 5],
    {
      version: "0.0.0",
      filePath: "builtin-hole-sharing.ts",
      fileHash: "1ynn192cxw48k",
      kind: "value",
      splices: { $f: f },
      captures: [],
      spliceParams: { $f: [] },
    },
    () => ({
      kind: 242,
      loc: [14, 6, 16, 4],
      statements: [
        {
          kind: 254,
          loc: [15, 5, 15, 25],
          expression: {
            kind: 214,
            loc: [15, 12, 15, 24],
            expression: {
              kind: 212,
              loc: [15, 12, 15, 22],
              expression: {
                kind: 214,
                loc: [15, 12, 15, 17],
                expression: {
                  kind: 1000,
                  loc: [15, 12, 15, 14],
                  key: "$f",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 9,
                    loc: [15, 15, 15, 16],
                    value: 1,
                  },
                ],
              },
              questionDotToken: false,
              name: "read",
            },
            questionDotToken: false,
            arguments: [],
          },
        },
      ],
    }),
  );
const wrapped = cs.create(
  [18, 17, 18, 50],
  {
    version: "0.0.0",
    filePath: "builtin-hole-sharing.ts",
    fileHash: "1ynn192cxw48k",
    kind: "value",
    splices: { $state: state },
    captures: [],
    spliceParams: { $state: [] },
  },
  () => ({
    kind: 220,
    loc: [18, 20, 18, 49],
    parameters: [
      {
        kind: 170,
        loc: [18, 21, 18, 30],
        name: {
          kind: 80,
          loc: [18, 21, 18, 22],
          text: "n",
          bindingKey: "n$1ynn192cxw48k$0",
        },
      },
    ],
    body: {
      kind: 214,
      loc: [18, 35, 18, 49],
      expression: {
        kind: 1000,
        loc: [18, 35, 18, 41],
        key: "$state",
      },
      questionDotToken: false,
      arguments: [
        {
          kind: 227,
          loc: [18, 42, 18, 48],
          left: {
            kind: 80,
            loc: [18, 42, 18, 43],
            text: "n",
            bindingKey: "n$1ynn192cxw48k$0",
          },
          operatorToken: "+",
          right: {
            kind: 9,
            loc: [18, 46, 18, 48],
            value: 10,
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [20, 16, 22, 3],
  {
    version: "0.0.0",
    filePath: "builtin-hole-sharing.ts",
    fileHash: "1ynn192cxw48k",
    kind: "value",
    splices: { $0splice0: make(state), $0splice1: make(wrapped) },
    captures: [],
    spliceParams: { $0splice0: [], $0splice1: [] },
  },
  () => ({
    kind: 242,
    loc: [20, 19, 22, 2],
    statements: [
      {
        kind: 254,
        loc: [21, 3, 21, 44],
        expression: {
          kind: 227,
          loc: [21, 10, 21, 43],
          left: {
            kind: 1000,
            loc: [21, 10, 21, 24],
            key: "$0splice0",
          },
          operatorToken: "+",
          right: {
            kind: 1000,
            loc: [21, 27, 21, 43],
            key: "$0splice1",
          },
        },
      },
    ],
  }),
);
