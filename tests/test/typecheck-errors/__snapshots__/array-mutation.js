import { cs } from "@backtickjs/core";
// Mutators aren't part of the client array API: an array is a value, and
// `pop` would also produce `undefined`, which the language doesn't have.
const script = cs.create(
  [5, 16, 10, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/array-mutation.test.tsx",
    fileHash: "2d3i2zxwdlwvi",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [5, 19, 10, 2],
    statements: [
      {
        kind: "const",
        loc: [6, 3, 6, 27],
        name: {
          kind: "id",
          loc: [6, 9, 6, 14],
          text: "coins",
          bindingKey: "coins$2d3i2zxwdlwvi$0",
        },
        initializer: {
          kind: "arr",
          loc: [6, 17, 6, 26],
          elements: [
            {
              kind: "number",
              loc: [6, 18, 6, 19],
              value: 1,
            },
            {
              kind: "number",
              loc: [6, 21, 6, 22],
              value: 2,
            },
            {
              kind: "number",
              loc: [6, 24, 6, 25],
              value: 3,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [8, 3, 8, 28],
        name: {
          kind: "id",
          loc: [8, 9, 8, 13],
          text: "last",
          bindingKey: "last$2d3i2zxwdlwvi$1",
        },
        initializer: {
          kind: "()",
          loc: [8, 16, 8, 27],
          expression: {
            kind: ".",
            loc: [8, 16, 8, 25],
            expression: {
              kind: "id",
              loc: [8, 16, 8, 21],
              text: "coins",
              bindingKey: "coins$2d3i2zxwdlwvi$0",
            },
            name: "pop",
          },
          arguments: [],
        },
      },
      {
        kind: "return",
        loc: [9, 3, 9, 12],
        expression: {
          kind: "number",
          loc: [9, 10, 9, 11],
          value: 1,
        },
      },
    ],
  }),
);
const action = cs.create(
  [12, 16, 16, 3],
  {
    version: "0.0.0",
    filePath: "typecheck-errors/array-mutation.test.tsx",
    fileHash: "2d3i2zxwdlwvi",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [12, 19, 16, 2],
    statements: [
      {
        kind: "const",
        loc: [13, 3, 13, 24],
        name: {
          kind: "id",
          loc: [13, 9, 13, 14],
          text: "coins",
          bindingKey: "coins$2d3i2zxwdlwvi$2",
        },
        initializer: {
          kind: "arr",
          loc: [13, 17, 13, 23],
          elements: [
            {
              kind: "number",
              loc: [13, 18, 13, 19],
              value: 1,
            },
            {
              kind: "number",
              loc: [13, 21, 13, 22],
              value: 2,
            },
          ],
        },
      },
      {
        kind: "()",
        loc: [15, 3, 15, 16],
        expression: {
          kind: ".",
          loc: [15, 3, 15, 13],
          expression: {
            kind: "id",
            loc: [15, 3, 15, 8],
            text: "coins",
            bindingKey: "coins$2d3i2zxwdlwvi$2",
          },
          name: "push",
        },
        arguments: [
          {
            kind: "number",
            loc: [15, 14, 15, 15],
            value: 3,
          },
        ],
      },
    ],
  }),
);
