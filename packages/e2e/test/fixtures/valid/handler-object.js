import { cs } from "@backtickjs/core";
// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep = cs.create(
  [5, 28, 8, 3],
  {
    version: "0.0.0",
    filePath: "handler-object.ts",
    fileHash: "gyja921xjk87",
    kind: "action",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [5, 31, 8, 2],
    statements: [
      {
        kind: 261,
        loc: [6, 3, 6, 13],
        name: {
          kind: 80,
          loc: [6, 7, 6, 8],
          text: "n",
          bindingKey: "n$gyja921xjk87$0",
        },
        initializer: {
          kind: 9,
          loc: [6, 11, 6, 12],
          value: 0,
        },
        keyword: "let",
      },
      {
        kind: 227,
        loc: [7, 3, 7, 8],
        left: {
          kind: 80,
          loc: [7, 3, 7, 4],
          text: "n",
          bindingKey: "n$gyja921xjk87$0",
        },
        operatorToken: "=",
        right: {
          kind: 9,
          loc: [7, 7, 7, 8],
          value: 1,
        },
      },
    ],
  }),
);
const onTap = cs.create(
  [10, 45, 12, 3],
  {
    version: "0.0.0",
    filePath: "handler-object.ts",
    fileHash: "gyja921xjk87",
    kind: "value",
    splices: { $beep: beep },
    captures: [],
    spliceParams: { $beep: [] },
  },
  () => ({
    kind: 220,
    loc: [10, 48, 12, 2],
    parameters: [
      {
        kind: 170,
        loc: [10, 49, 10, 59],
        name: {
          kind: 80,
          loc: [10, 49, 10, 51],
          text: "id",
          bindingKey: "id$gyja921xjk87$1",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [10, 64, 12, 2],
      statements: [
        {
          kind: 1000,
          loc: [11, 3, 11, 8],
          key: "$beep",
        },
      ],
    },
  }),
);
export default cs.create(
  [14, 16, 20, 3],
  {
    version: "0.0.0",
    filePath: "handler-object.ts",
    fileHash: "gyja921xjk87",
    kind: "value",
    splices: { $onTap: onTap },
    captures: [],
    spliceParams: { $onTap: [] },
  },
  () => ({
    kind: 242,
    loc: [14, 19, 20, 2],
    statements: [
      {
        kind: 261,
        loc: [15, 3, 18, 5],
        name: {
          kind: 80,
          loc: [15, 9, 15, 17],
          text: "handlers",
          bindingKey: "handlers$gyja921xjk87$2",
        },
        initializer: {
          kind: 211,
          loc: [15, 20, 18, 4],
          properties: [
            {
              kind: 304,
              loc: [16, 5, 16, 16],
              name: "tap",
              initializer: {
                kind: 1000,
                loc: [16, 10, 16, 16],
                key: "$onTap",
              },
            },
            {
              kind: 304,
              loc: [17, 5, 17, 17],
              name: "hold",
              initializer: {
                kind: 1000,
                loc: [17, 11, 17, 17],
                key: "$onTap",
              },
            },
          ],
        },
        keyword: "const",
      },
      {
        kind: 254,
        loc: [19, 3, 19, 19],
        expression: {
          kind: 80,
          loc: [19, 10, 19, 18],
          text: "handlers",
          bindingKey: "handlers$gyja921xjk87$2",
        },
      },
    ],
  }),
);
