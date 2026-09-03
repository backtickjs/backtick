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
  },
  () => ({
    kind: "=>",
    loc: [5, 17, 7, 2],
    parameters: [
      {
        kind: "param",
        loc: [5, 18, 5, 34],
        name: {
          kind: "id",
          loc: [5, 18, 5, 19],
          text: "n",
          bindingKey: "n$2bgu1tn5wjo9o$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [5, 39, 7, 2],
      statements: [
        {
          kind: "return",
          loc: [6, 3, 6, 33],
          expression: {
            kind: "?:",
            loc: [6, 10, 6, 32],
            condition: {
              kind: "binop",
              loc: [6, 10, 6, 20],
              left: {
                kind: "id",
                loc: [6, 10, 6, 11],
                text: "n",
                bindingKey: "n$2bgu1tn5wjo9o$0",
              },
              operatorToken: "===",
              right: {
                kind: "null",
                loc: [6, 16, 6, 20],
              },
            },
            whenTrue: {
              kind: "number",
              loc: [6, 23, 6, 24],
              value: 0,
            },
            whenFalse: {
              kind: "binop",
              loc: [6, 27, 6, 32],
              left: {
                kind: "id",
                loc: [6, 27, 6, 28],
                text: "n",
                bindingKey: "n$2bgu1tn5wjo9o$0",
              },
              operatorToken: "+",
              right: {
                kind: "number",
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
    splices: { $pick: { value: pick, params: [] } },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [9, 20, 12, 2],
    properties: [
      {
        kind: ":",
        loc: [10, 3, 10, 22],
        name: "absent",
        initializer: {
          kind: "()",
          loc: [10, 11, 10, 22],
          expression: {
            kind: "splice",
            loc: [10, 11, 10, 16],
            key: "$pick",
          },
          arguments: [
            {
              kind: "null",
              loc: [10, 17, 10, 21],
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [11, 3, 11, 20],
        name: "present",
        initializer: {
          kind: "()",
          loc: [11, 12, 11, 20],
          expression: {
            kind: "splice",
            loc: [11, 12, 11, 17],
            key: "$pick",
          },
          arguments: [
            {
              kind: "number",
              loc: [11, 18, 11, 19],
              value: 4,
            },
          ],
        },
      },
    ],
  }),
);
