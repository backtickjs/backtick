import { cs } from "@backtickjs/core";
// Mutators aren't part of the client array API: an array is a value, and
// `pop` would also produce `undefined`, which the language doesn't have.
const script = cs.create(
  [5, 16, 9, 3],
  {
    version: "0.0.0",
    filePath: "array-mutation.ts",
    fileHash: "3m6roaxdg127n",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [5, 19, 9, 2],
    statements: [
      {
        kind: 261,
        loc: [6, 3, 6, 27],
        name: {
          kind: 80,
          loc: [6, 9, 6, 14],
          text: "coins",
          bindingKey: "coins$3m6roaxdg127n$0",
        },
        initializer: {
          kind: 210,
          loc: [6, 17, 6, 26],
          elements: [
            {
              kind: 9,
              loc: [6, 18, 6, 19],
              value: 1,
            },
            {
              kind: 9,
              loc: [6, 21, 6, 22],
              value: 2,
            },
            {
              kind: 9,
              loc: [6, 24, 6, 25],
              value: 3,
            },
          ],
        },
        keyword: "const",
      },
      {
        kind: 261,
        loc: [7, 3, 7, 28],
        name: {
          kind: 80,
          loc: [7, 9, 7, 13],
          text: "last",
          bindingKey: "last$3m6roaxdg127n$1",
        },
        initializer: {
          kind: 214,
          loc: [7, 16, 7, 27],
          expression: {
            kind: 212,
            loc: [7, 16, 7, 25],
            expression: {
              kind: 80,
              loc: [7, 16, 7, 21],
              text: "coins",
              bindingKey: "coins$3m6roaxdg127n$0",
            },
            questionDotToken: false,
            name: "pop",
          },
          questionDotToken: false,
          arguments: [],
        },
        keyword: "const",
      },
      {
        kind: 254,
        loc: [8, 3, 8, 12],
        expression: {
          kind: 9,
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
    kind: "action",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [11, 19, 14, 2],
    statements: [
      {
        kind: 261,
        loc: [12, 3, 12, 24],
        name: {
          kind: 80,
          loc: [12, 9, 12, 14],
          text: "coins",
          bindingKey: "coins$3m6roaxdg127n$2",
        },
        initializer: {
          kind: 210,
          loc: [12, 17, 12, 23],
          elements: [
            {
              kind: 9,
              loc: [12, 18, 12, 19],
              value: 1,
            },
            {
              kind: 9,
              loc: [12, 21, 12, 22],
              value: 2,
            },
          ],
        },
        keyword: "const",
      },
      {
        kind: 214,
        loc: [13, 3, 13, 16],
        expression: {
          kind: 212,
          loc: [13, 3, 13, 13],
          expression: {
            kind: 80,
            loc: [13, 3, 13, 8],
            text: "coins",
            bindingKey: "coins$3m6roaxdg127n$2",
          },
          questionDotToken: false,
          name: "push",
        },
        questionDotToken: false,
        arguments: [
          {
            kind: 9,
            loc: [13, 14, 13, 15],
            value: 3,
          },
        ],
      },
    ],
  }),
);
