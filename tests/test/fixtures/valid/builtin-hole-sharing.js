import { cs, state } from "@backtickjs/core";
const make = (f) =>
  cs.create(
    [4, 3, 6, 5],
    {
      version: "0.0.0",
      filePath: "builtin-hole-sharing.ts",
      fileHash: "1javurj6oomvn",
      splices: { $f: { value: f, params: [] } },
      captures: [],
    },
    () => ({
      kind: 242,
      loc: [4, 6, 6, 4],
      statements: [
        {
          kind: 254,
          loc: [5, 5, 5, 25],
          expression: {
            kind: 214,
            loc: [5, 12, 5, 24],
            expression: {
              kind: 212,
              loc: [5, 12, 5, 22],
              expression: {
                kind: 214,
                loc: [5, 12, 5, 17],
                expression: {
                  kind: 1000,
                  loc: [5, 12, 5, 14],
                  key: "$f",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 9,
                    loc: [5, 15, 5, 16],
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
  [8, 17, 8, 50],
  {
    version: "0.0.0",
    filePath: "builtin-hole-sharing.ts",
    fileHash: "1javurj6oomvn",
    splices: { $state: { value: state, params: [] } },
    captures: [],
  },
  () => ({
    kind: 220,
    loc: [8, 20, 8, 49],
    parameters: [
      {
        kind: 170,
        loc: [8, 21, 8, 30],
        name: {
          kind: 80,
          loc: [8, 21, 8, 22],
          text: "n",
          bindingKey: "n$1javurj6oomvn$0",
        },
      },
    ],
    body: {
      kind: 214,
      loc: [8, 35, 8, 49],
      expression: {
        kind: 1000,
        loc: [8, 35, 8, 41],
        key: "$state",
      },
      questionDotToken: false,
      arguments: [
        {
          kind: 227,
          loc: [8, 42, 8, 48],
          left: {
            kind: 80,
            loc: [8, 42, 8, 43],
            text: "n",
            bindingKey: "n$1javurj6oomvn$0",
          },
          operatorToken: "+",
          right: {
            kind: 9,
            loc: [8, 46, 8, 48],
            value: 10,
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [10, 16, 12, 3],
  {
    version: "0.0.0",
    filePath: "builtin-hole-sharing.ts",
    fileHash: "1javurj6oomvn",
    splices: {
      $0splice0: { value: make(state), params: [] },
      $0splice1: { value: make(wrapped), params: [] },
    },
    captures: [],
  },
  () => ({
    kind: 242,
    loc: [10, 19, 12, 2],
    statements: [
      {
        kind: 254,
        loc: [11, 3, 11, 44],
        expression: {
          kind: 227,
          loc: [11, 10, 11, 43],
          left: {
            kind: 1000,
            loc: [11, 10, 11, 24],
            key: "$0splice0",
          },
          operatorToken: "+",
          right: {
            kind: 1000,
            loc: [11, 27, 11, 43],
            key: "$0splice1",
          },
        },
      },
    ],
  }),
);
