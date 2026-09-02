import { cs } from "@backtickjs/core";
// `?:` tests a boolean — no truthiness — evaluates only the taken branch,
// and its condition narrows like an `if`'s.
const pick = cs.create(
  [5, 14, 7, 3],
  {
    version: "0.0.0",
    filePath: "ternary.ts",
    fileHash: "2bgu1tn5wjo9o",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [5, 17, 7, 2],
    parameters: [
      {
        kind: 170,
        loc: [5, 18, 5, 34],
        name: {
          kind: 80,
          loc: [5, 18, 5, 19],
          text: "n",
          bindingKey: "n$2bgu1tn5wjo9o$0",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [5, 39, 7, 2],
      statements: [
        {
          kind: 254,
          loc: [6, 3, 6, 33],
          expression: {
            kind: 228,
            loc: [6, 10, 6, 32],
            condition: {
              kind: 227,
              loc: [6, 10, 6, 20],
              left: {
                kind: 80,
                loc: [6, 10, 6, 11],
                text: "n",
                bindingKey: "n$2bgu1tn5wjo9o$0",
              },
              operatorToken: "===",
              right: {
                kind: 106,
                loc: [6, 16, 6, 20],
              },
            },
            whenTrue: {
              kind: 9,
              loc: [6, 23, 6, 24],
              value: 0,
            },
            whenFalse: {
              kind: 227,
              loc: [6, 27, 6, 32],
              left: {
                kind: 80,
                loc: [6, 27, 6, 28],
                text: "n",
                bindingKey: "n$2bgu1tn5wjo9o$0",
              },
              operatorToken: "+",
              right: {
                kind: 9,
                loc: [6, 31, 6, 32],
                value: 1,
              },
            },
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [9, 16, 12, 4],
  {
    version: "0.0.0",
    filePath: "ternary.ts",
    fileHash: "2bgu1tn5wjo9o",
    splices: { $pick: pick },
    captures: [],
    spliceParams: { $pick: [] },
  },
  () => ({
    kind: 211,
    loc: [9, 20, 12, 2],
    properties: [
      {
        kind: 304,
        loc: [10, 3, 10, 22],
        name: "absent",
        initializer: {
          kind: 214,
          loc: [10, 11, 10, 22],
          expression: {
            kind: 1000,
            loc: [10, 11, 10, 16],
            key: "$pick",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 106,
              loc: [10, 17, 10, 21],
            },
          ],
        },
      },
      {
        kind: 304,
        loc: [11, 3, 11, 20],
        name: "present",
        initializer: {
          kind: 214,
          loc: [11, 12, 11, 20],
          expression: {
            kind: 1000,
            loc: [11, 12, 11, 17],
            key: "$pick",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 9,
              loc: [11, 18, 11, 19],
              value: 4,
            },
          ],
        },
      },
    ],
  }),
);
