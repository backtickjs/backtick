import { cs } from "@backtickjs/core";
// A statement discards its expression, which is only silent for `void` — an
// action's result. Discarding a value is a mistake; calling an action is
// the point.
const getValue = cs.create(
  [6, 18, 8, 3],
  {
    version: "0.0.0",
    filePath: "discarded-value.ts",
    fileHash: "2at3b932vh0hl",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 220,
    loc: [6, 21, 8, 2],
    parameters: [],
    body: {
      kind: 242,
      loc: [6, 27, 8, 2],
      statements: [
        {
          kind: 254,
          loc: [7, 3, 7, 12],
          expression: {
            kind: 9,
            loc: [7, 10, 7, 11],
            value: 1,
          },
        },
      ],
    },
  }),
);
const ping = cs.create(
  [10, 14, 13, 3],
  {
    version: "0.0.0",
    filePath: "discarded-value.ts",
    fileHash: "2at3b932vh0hl",
    splices: {},
    captures: [],
  },
  () => ({
    kind: 220,
    loc: [10, 17, 13, 2],
    parameters: [],
    body: {
      kind: 242,
      loc: [10, 23, 13, 2],
      statements: [
        {
          kind: 244,
          loc: [11, 3, 11, 13],
          declarationList: {
            kind: 262,
            loc: [11, 3, 11, 12],
            declarations: [
              {
                kind: 261,
                loc: [11, 7, 11, 12],
                name: {
                  kind: 80,
                  loc: [11, 7, 11, 8],
                  text: "n",
                  bindingKey: "n$2at3b932vh0hl$0",
                },
                initializer: {
                  kind: 9,
                  loc: [11, 11, 11, 12],
                  value: 0,
                },
              },
            ],
            keyword: "let",
          },
        },
        {
          kind: 227,
          loc: [12, 3, 12, 8],
          left: {
            kind: 80,
            loc: [12, 3, 12, 4],
            text: "n",
            bindingKey: "n$2at3b932vh0hl$0",
          },
          operatorToken: "=",
          right: {
            kind: 9,
            loc: [12, 7, 12, 8],
            value: 1,
          },
        },
      ],
    },
  }),
);
const action = cs.create(
  [15, 16, 18, 3],
  {
    version: "0.0.0",
    filePath: "discarded-value.ts",
    fileHash: "2at3b932vh0hl",
    splices: {
      $ping: { value: ping, params: [] },
      $getValue: { value: getValue, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: 242,
    loc: [15, 19, 18, 2],
    statements: [
      {
        kind: 214,
        loc: [16, 3, 16, 10],
        expression: {
          kind: 1000,
          loc: [16, 3, 16, 8],
          key: "$ping",
        },
        questionDotToken: false,
        arguments: [],
      },
      {
        kind: 214,
        loc: [17, 3, 17, 14],
        expression: {
          kind: 1000,
          loc: [17, 3, 17, 12],
          key: "$getValue",
        },
        questionDotToken: false,
        arguments: [],
      },
    ],
  }),
);
// The same rule in a script that returns: the position is what decides, so a
// discarded value fails here too while the action beside it stands.
const valued = cs.create(
  [22, 16, 26, 3],
  {
    version: "0.0.0",
    filePath: "discarded-value.ts",
    fileHash: "2at3b932vh0hl",
    splices: {
      $ping: { value: ping, params: [] },
      $getValue: { value: getValue, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: 242,
    loc: [22, 19, 26, 2],
    statements: [
      {
        kind: 214,
        loc: [23, 3, 23, 10],
        expression: {
          kind: 1000,
          loc: [23, 3, 23, 8],
          key: "$ping",
        },
        questionDotToken: false,
        arguments: [],
      },
      {
        kind: 214,
        loc: [24, 3, 24, 14],
        expression: {
          kind: 1000,
          loc: [24, 3, 24, 12],
          key: "$getValue",
        },
        questionDotToken: false,
        arguments: [],
      },
      {
        kind: 254,
        loc: [25, 3, 25, 12],
        expression: {
          kind: 9,
          loc: [25, 10, 25, 11],
          value: 1,
        },
      },
    ],
  }),
);
