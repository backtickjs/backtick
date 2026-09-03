import { cs } from "@backtickjs/core";
// Mutators aren't part of the client array API: an array is a value, and
// `pop` would also produce `undefined`, which the language doesn't have.
const script = cs.create(
  [5, 16, 9, 3],
  {
    version: "0.0.0",
    filePath: "array-mutation.ts",
    fileHash: "3m6roaxdg127n",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [5, 19, 9, 2],
    statements: [
      {
        kind: "const",
        loc: [6, 3, 6, 27],
        name: {
          kind: "id",
          loc: [6, 9, 6, 14],
          text: "coins",
          bindingKey: "coins$3m6roaxdg127n$0",
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
        loc: [7, 3, 7, 28],
        name: {
          kind: "id",
          loc: [7, 9, 7, 13],
          text: "last",
          bindingKey: "last$3m6roaxdg127n$1",
        },
        initializer: {
          kind: "()",
          loc: [7, 16, 7, 27],
          expression: {
            kind: ".",
            loc: [7, 16, 7, 25],
            expression: {
              kind: "id",
              loc: [7, 16, 7, 21],
              text: "coins",
              bindingKey: "coins$3m6roaxdg127n$0",
            },
            name: "pop",
          },
          arguments: [],
        },
      },
      {
        kind: "return",
        loc: [8, 3, 8, 12],
        expression: {
          kind: "number",
          loc: [8, 10, 8, 11],
          value: 1,
        },
      },
    ],
  }),
);
const action = cs.create(
  [11, 16, 14, 3],
  {
    version: "0.0.0",
    filePath: "array-mutation.ts",
    fileHash: "3m6roaxdg127n",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [11, 19, 14, 2],
    statements: [
      {
        kind: "const",
        loc: [12, 3, 12, 24],
        name: {
          kind: "id",
          loc: [12, 9, 12, 14],
          text: "coins",
          bindingKey: "coins$3m6roaxdg127n$2",
        },
        initializer: {
          kind: "arr",
          loc: [12, 17, 12, 23],
          elements: [
            {
              kind: "number",
              loc: [12, 18, 12, 19],
              value: 1,
            },
            {
              kind: "number",
              loc: [12, 21, 12, 22],
              value: 2,
            },
          ],
        },
      },
      {
        kind: "()",
        loc: [13, 3, 13, 16],
        expression: {
          kind: ".",
          loc: [13, 3, 13, 13],
          expression: {
            kind: "id",
            loc: [13, 3, 13, 8],
            text: "coins",
            bindingKey: "coins$3m6roaxdg127n$2",
          },
          name: "push",
        },
        arguments: [
          {
            kind: "number",
            loc: [13, 14, 13, 15],
            value: 3,
          },
        ],
      },
    ],
  }),
);
