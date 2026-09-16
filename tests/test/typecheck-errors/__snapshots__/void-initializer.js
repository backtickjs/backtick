import { cs } from "@backtickjs/core";
// An action call produces no value: its `void` result can't initialize a
// variable — in a value script or an action.
const ping = cs.create(
  [5, 14, 8, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/void-initializer.test.tsx",
    fileHash: "3ch7rgcn8bjeq",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [5, 17, 8, 2],
    parameters: [],
    body: {
      kind: "{}",
      loc: [5, 23, 8, 2],
      statements: [
        {
          kind: "let",
          loc: [6, 3, 6, 13],
          name: {
            kind: "id",
            loc: [6, 7, 6, 8],
            text: "n",
            bindingKey: "n$3ch7rgcn8bjeq$0",
          },
          initializer: {
            kind: "number",
            loc: [6, 11, 6, 12],
            value: 0,
          },
        },
        {
          kind: "binop",
          loc: [7, 3, 7, 8],
          left: {
            kind: "id",
            loc: [7, 3, 7, 4],
            text: "n",
            bindingKey: "n$3ch7rgcn8bjeq$0",
          },
          operatorToken: "=",
          right: {
            kind: "number",
            loc: [7, 7, 7, 8],
            value: 1,
          },
        },
      ],
    },
  }),
);
const script = cs.create(
  [10, 16, 13, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/void-initializer.test.tsx",
    fileHash: "3ch7rgcn8bjeq",
    splices: { $ping: { value: ping, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [10, 19, 13, 2],
    statements: [
      {
        kind: "const",
        loc: [11, 3, 11, 21],
        name: {
          kind: "id",
          loc: [11, 9, 11, 10],
          text: "x",
          bindingKey: "x$3ch7rgcn8bjeq$1",
        },
        initializer: {
          kind: "()",
          loc: [11, 13, 11, 20],
          expression: {
            kind: "splice",
            loc: [11, 13, 11, 18],
            key: "$ping",
          },
          arguments: [],
        },
      },
      {
        kind: "return",
        loc: [12, 3, 12, 12],
        expression: {
          kind: "number",
          loc: [12, 10, 12, 11],
          value: 1,
        },
      },
    ],
  }),
);
const action = cs.create(
  [15, 16, 17, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/void-initializer.test.tsx",
    fileHash: "3ch7rgcn8bjeq",
    splices: { $ping: { value: ping, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [15, 19, 17, 2],
    statements: [
      {
        kind: "const",
        loc: [16, 3, 16, 21],
        name: {
          kind: "id",
          loc: [16, 9, 16, 10],
          text: "x",
          bindingKey: "x$3ch7rgcn8bjeq$2",
        },
        initializer: {
          kind: "()",
          loc: [16, 13, 16, 20],
          expression: {
            kind: "splice",
            loc: [16, 13, 16, 18],
            key: "$ping",
          },
          arguments: [],
        },
      },
    ],
  }),
);
// An error inside a checked initializer reports once: the duplicate copy
// the check sequences is shielded.
const label = cs.create(
  [21, 15, 23, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/void-initializer.test.tsx",
    fileHash: "3ch7rgcn8bjeq",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [21, 18, 23, 2],
    parameters: [
      {
        kind: "param",
        loc: [21, 19, 21, 31],
        name: {
          kind: "id",
          loc: [21, 19, 21, 23],
          text: "text",
          bindingKey: "text$3ch7rgcn8bjeq$3",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [21, 36, 23, 2],
      statements: [
        {
          kind: "return",
          loc: [22, 3, 22, 15],
          expression: {
            kind: "id",
            loc: [22, 10, 22, 14],
            text: "text",
            bindingKey: "text$3ch7rgcn8bjeq$3",
          },
        },
      ],
    },
  }),
);
const wrongArgument = cs.create(
  [25, 23, 29, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/void-initializer.test.tsx",
    fileHash: "3ch7rgcn8bjeq",
    splices: { $label: { value: label, params: [] } },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [25, 26, 29, 2],
    statements: [
      {
        kind: "const",
        loc: [27, 3, 27, 26],
        name: {
          kind: "id",
          loc: [27, 9, 27, 10],
          text: "x",
          bindingKey: "x$3ch7rgcn8bjeq$4",
        },
        initializer: {
          kind: "()",
          loc: [27, 13, 27, 25],
          expression: {
            kind: "splice",
            loc: [27, 13, 27, 19],
            key: "$label",
          },
          arguments: [
            {
              kind: "true",
              loc: [27, 20, 27, 24],
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [28, 3, 28, 12],
        expression: {
          kind: "number",
          loc: [28, 10, 28, 11],
          value: 1,
        },
      },
    ],
  }),
);
