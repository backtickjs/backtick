import { cs } from "@backtickjs/core";
// A checked condition containing its own tested positions: `keep(a && b)` is
// checked (a call), and inside it `a` and `b` are checked (identifiers). The
// check's trailing bare duplicate must stay check-free and suppressed — a
// duplicate that re-checked its operands would grow by a copy per nesting
// level and re-report every operand mismatch at a second virtual position —
// so the virtual code and mappings pin the duplicate staying bare.
const gate = cs.create(
  [9, 58, 18, 3],
  {
    version: "0.0.0",
    filePath: "nested-condition-check.ts",
    fileHash: "2nymys98gllff",
    kind: "value",
    splices: {},
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 220,
    loc: [9, 61, 18, 2],
    parameters: [
      {
        kind: 170,
        loc: [10, 3, 10, 13],
        name: {
          kind: 80,
          loc: [10, 3, 10, 4],
          text: "a",
          bindingKey: "a$2nymys98gllff$0",
        },
      },
      {
        kind: 170,
        loc: [11, 3, 11, 13],
        name: {
          kind: 80,
          loc: [11, 3, 11, 4],
          text: "b",
          bindingKey: "b$2nymys98gllff$1",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [12, 6, 18, 2],
      statements: [
        {
          kind: 261,
          loc: [13, 3, 13, 36],
          name: {
            kind: 80,
            loc: [13, 9, 13, 13],
            text: "keep",
            bindingKey: "keep$2nymys98gllff$2",
          },
          initializer: {
            kind: 220,
            loc: [13, 16, 13, 35],
            parameters: [
              {
                kind: 170,
                loc: [13, 17, 13, 28],
                name: {
                  kind: 80,
                  loc: [13, 17, 13, 19],
                  text: "on",
                  bindingKey: "on$2nymys98gllff$3",
                },
              },
            ],
            body: {
              kind: 80,
              loc: [13, 33, 13, 35],
              text: "on",
              bindingKey: "on$2nymys98gllff$3",
            },
          },
          keyword: "const",
        },
        {
          kind: 246,
          loc: [14, 3, 16, 4],
          expression: {
            kind: 214,
            loc: [14, 7, 14, 19],
            expression: {
              kind: 80,
              loc: [14, 7, 14, 11],
              text: "keep",
              bindingKey: "keep$2nymys98gllff$2",
            },
            questionDotToken: false,
            arguments: [
              {
                kind: 227,
                loc: [14, 12, 14, 18],
                left: {
                  kind: 80,
                  loc: [14, 12, 14, 13],
                  text: "a",
                  bindingKey: "a$2nymys98gllff$0",
                },
                operatorToken: "&&",
                right: {
                  kind: 80,
                  loc: [14, 17, 14, 18],
                  text: "b",
                  bindingKey: "b$2nymys98gllff$1",
                },
              },
            ],
          },
          thenStatement: {
            kind: 242,
            loc: [14, 21, 16, 4],
            statements: [
              {
                kind: 254,
                loc: [15, 5, 15, 19],
                expression: {
                  kind: 11,
                  loc: [15, 12, 15, 18],
                  text: "kept",
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: 254,
          loc: [17, 3, 17, 20],
          expression: {
            kind: 11,
            loc: [17, 10, 17, 19],
            text: "dropped",
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [20, 16, 23, 4],
  {
    version: "0.0.0",
    filePath: "nested-condition-check.ts",
    fileHash: "2nymys98gllff",
    kind: "value",
    splices: { $gate: gate },
    captures: [],
    spliceParams: { $gate: [] },
  },
  () => ({
    kind: 211,
    loc: [20, 20, 23, 2],
    properties: [
      {
        kind: 304,
        loc: [21, 3, 21, 26],
        name: "both",
        initializer: {
          kind: 214,
          loc: [21, 9, 21, 26],
          expression: {
            kind: 1000,
            loc: [21, 9, 21, 14],
            key: "$gate",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 112,
              loc: [21, 15, 21, 19],
            },
            {
              kind: 112,
              loc: [21, 21, 21, 25],
            },
          ],
        },
      },
      {
        kind: 304,
        loc: [22, 3, 22, 26],
        name: "one",
        initializer: {
          kind: 214,
          loc: [22, 8, 22, 26],
          expression: {
            kind: 1000,
            loc: [22, 8, 22, 13],
            key: "$gate",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 112,
              loc: [22, 14, 22, 18],
            },
            {
              kind: 97,
              loc: [22, 20, 22, 25],
            },
          ],
        },
      },
    ],
  }),
);
