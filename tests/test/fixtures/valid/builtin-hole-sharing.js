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
      kind: "{}",
      loc: [4, 6, 6, 4],
      statements: [
        {
          kind: "return",
          loc: [5, 5, 5, 25],
          expression: {
            kind: "()",
            loc: [5, 12, 5, 24],
            expression: {
              kind: ".",
              loc: [5, 12, 5, 22],
              expression: {
                kind: "()",
                loc: [5, 12, 5, 17],
                expression: {
                  kind: "splice",
                  loc: [5, 12, 5, 14],
                  key: "$f",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [5, 15, 5, 16],
                    value: 1,
                  },
                ],
              },
              name: "read",
            },
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
    kind: "=>",
    loc: [8, 20, 8, 49],
    parameters: [
      {
        kind: "param",
        loc: [8, 21, 8, 30],
        name: {
          kind: "id",
          loc: [8, 21, 8, 22],
          text: "n",
          bindingKey: "n$1javurj6oomvn$0",
        },
      },
    ],
    body: {
      kind: "()",
      loc: [8, 35, 8, 49],
      expression: {
        kind: "splice",
        loc: [8, 35, 8, 41],
        key: "$state",
      },
      arguments: [
        {
          kind: "binop",
          loc: [8, 42, 8, 48],
          left: {
            kind: "id",
            loc: [8, 42, 8, 43],
            text: "n",
            bindingKey: "n$1javurj6oomvn$0",
          },
          operatorToken: "+",
          right: {
            kind: "number",
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
    kind: "{}",
    loc: [10, 19, 12, 2],
    statements: [
      {
        kind: "return",
        loc: [11, 3, 11, 44],
        expression: {
          kind: "binop",
          loc: [11, 10, 11, 43],
          left: {
            kind: "splice",
            loc: [11, 10, 11, 24],
            key: "$0splice0",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [11, 27, 11, 43],
            key: "$0splice1",
          },
        },
      },
    ],
  }),
);
