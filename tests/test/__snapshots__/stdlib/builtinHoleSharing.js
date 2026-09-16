import { cs, state } from "@backtickjs/core";
const make = (f) =>
  cs.create(
    [5, 3, 7, 5],
    {
      version: "0.0.0",
      filePath: "builtinHoleSharing.tsx",
      fileHash: "1wmknwe5rs2b2",
      splices: { $f: { value: f, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [5, 6, 7, 4],
      statements: [
        {
          kind: "return",
          loc: [6, 5, 6, 25],
          expression: {
            kind: "()",
            loc: [6, 12, 6, 24],
            expression: {
              kind: ".",
              loc: [6, 12, 6, 22],
              expression: {
                kind: "()",
                loc: [6, 12, 6, 17],
                expression: {
                  kind: "splice",
                  loc: [6, 12, 6, 14],
                  key: "$f",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [6, 15, 6, 16],
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
  [9, 17, 9, 50],
  {
    version: "0.0.0",
    filePath: "builtinHoleSharing.tsx",
    fileHash: "1wmknwe5rs2b2",
    splices: { $state: { value: state, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [9, 20, 9, 49],
    parameters: [
      {
        kind: "param",
        loc: [9, 21, 9, 30],
        name: {
          kind: "id",
          loc: [9, 21, 9, 22],
          text: "n",
          bindingKey: "n$1wmknwe5rs2b2$0",
        },
      },
    ],
    body: {
      kind: "()",
      loc: [9, 35, 9, 49],
      expression: {
        kind: "splice",
        loc: [9, 35, 9, 41],
        key: "$state",
      },
      arguments: [
        {
          kind: "binop",
          loc: [9, 42, 9, 48],
          left: {
            kind: "id",
            loc: [9, 42, 9, 43],
            text: "n",
            bindingKey: "n$1wmknwe5rs2b2$0",
          },
          operatorToken: "+",
          right: {
            kind: "number",
            loc: [9, 46, 9, 48],
            value: 10,
          },
        },
      ],
    },
  }),
);
const builtinHoleSharing = cs.create(
  [11, 28, 13, 3],
  {
    version: "0.0.0",
    filePath: "builtinHoleSharing.tsx",
    fileHash: "1wmknwe5rs2b2",
    splices: {
      $0splice0: { value: make(state), params: [] },
      $0splice1: { value: make(wrapped), params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [11, 31, 13, 2],
    statements: [
      {
        kind: "return",
        loc: [12, 3, 12, 44],
        expression: {
          kind: "binop",
          loc: [12, 10, 12, 43],
          left: {
            kind: "splice",
            loc: [12, 10, 12, 24],
            key: "$0splice0",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [12, 27, 12, 43],
            key: "$0splice1",
          },
        },
      },
    ],
  }),
);
