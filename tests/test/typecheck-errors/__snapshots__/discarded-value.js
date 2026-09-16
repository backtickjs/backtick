import { cs } from "@backtickjs/core";
// A statement discards its expression, which is only silent for `void` — an
// action's result. Discarding a value is a mistake; calling an action is
// the point.
const getValue = cs.create(
  [6, 18, 8, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/discarded-value.test.tsx",
    fileHash: "15c51klv9dnfh",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [6, 21, 8, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [6, 27, 8, 2],
      statements: [
        {
          kind: "return",
          loc: [7, 3, 7, 12],
          expression: {
            kind: "number",
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
    filePath: "typecheck-errors/discarded-value.test.tsx",
    fileHash: "15c51klv9dnfh",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [10, 17, 13, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [10, 23, 13, 2],
      statements: [
        {
          kind: "let",
          loc: [11, 3, 11, 13],
          name: {
            kind: "id",
            loc: [11, 7, 11, 8],
            text: "n",
            bindingKey: "n$15c51klv9dnfh$0",
          },
          initializer: {
            kind: "number",
            loc: [11, 11, 11, 12],
            value: 0,
          },
        },
        {
          kind: "binop",
          loc: [12, 3, 12, 8],
          left: {
            kind: "id",
            loc: [12, 3, 12, 4],
            text: "n",
            bindingKey: "n$15c51klv9dnfh$0",
          },
          operatorToken: "=",
          right: {
            kind: "number",
            loc: [12, 7, 12, 8],
            value: 1,
          },
        },
      ],
    },
  }),
);
const action = cs.create(
  [15, 16, 19, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/discarded-value.test.tsx",
    fileHash: "15c51klv9dnfh",
    splices: {
      $ping: { value: ping, params: [] },
      $getValue: { value: getValue, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [15, 19, 19, 2],
    statements: [
      {
        kind: "()",
        loc: [16, 3, 16, 10],
        expression: {
          kind: "splice",
          loc: [16, 3, 16, 8],
          key: "$ping",
        },
        arguments: [],
      },
      {
        kind: "()",
        loc: [18, 3, 18, 14],
        expression: {
          kind: "splice",
          loc: [18, 3, 18, 12],
          key: "$getValue",
        },
        arguments: [],
      },
    ],
  }),
);
// The same rule in a script that returns: the position is what decides, so a
// discarded value fails here too while the action beside it stands.
const valued = cs.create(
  [23, 16, 28, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/discarded-value.test.tsx",
    fileHash: "15c51klv9dnfh",
    splices: {
      $ping: { value: ping, params: [] },
      $getValue: { value: getValue, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [23, 19, 28, 2],
    statements: [
      {
        kind: "()",
        loc: [24, 3, 24, 10],
        expression: {
          kind: "splice",
          loc: [24, 3, 24, 8],
          key: "$ping",
        },
        arguments: [],
      },
      {
        kind: "()",
        loc: [26, 3, 26, 14],
        expression: {
          kind: "splice",
          loc: [26, 3, 26, 12],
          key: "$getValue",
        },
        arguments: [],
      },
      {
        kind: "return",
        loc: [27, 3, 27, 12],
        expression: {
          kind: "number",
          loc: [27, 10, 27, 11],
          value: 1,
        },
      },
    ],
  }),
);
