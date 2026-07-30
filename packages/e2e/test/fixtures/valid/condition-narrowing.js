import { cs } from "@backtickjs/core";
// Narrowing must survive the boolean-condition checks: the tested condition
// stays in place in the virtual code (its check reads a sequenced
// duplicate), so `text !== null` still narrows `text` in the branch it
// guards and from a `&&` left operand into the right. The conditions cover
// each checked shape: a bare boolean identifier, a braced splice (whose
// duplicate re-renders the host expression), and comparison/`&&` forms that
// are boolean by construction and need no check.
const flags = {
  strict: cs.create(
    [10, 25, 10, 33],
    {
      version: "0.0.0",
      filePath: "condition-narrowing.ts",
      fileHash: "3ciy5yb38f51h",
      kind: "value",
      splices: {},
      captures: [],
      spliceParams: {},
    },
    () => ({
      kind: 112,
      loc: [10, 28, 10, 32],
    }),
  ),
};
const label = cs.create(
  [12, 72, 23, 3],
  {
    version: "0.0.0",
    filePath: "condition-narrowing.ts",
    fileHash: "3ciy5yb38f51h",
    kind: "value",
    splices: { $0splice0: flags.strict },
    captures: [],
    spliceParams: { $0splice0: [] },
  },
  () => ({
    kind: 220,
    loc: [12, 75, 23, 2],
    parameters: [
      {
        kind: 170,
        loc: [13, 3, 13, 22],
        name: {
          kind: 80,
          loc: [13, 3, 13, 7],
          text: "text",
          bindingKey: "text$3ciy5yb38f51h$0",
        },
      },
      {
        kind: 170,
        loc: [14, 3, 14, 17],
        name: {
          kind: 80,
          loc: [14, 3, 14, 8],
          text: "upper",
          bindingKey: "upper$3ciy5yb38f51h$1",
        },
      },
    ],
    body: {
      kind: 242,
      loc: [15, 6, 23, 2],
      statements: [
        {
          kind: 246,
          loc: [16, 3, 18, 4],
          expression: {
            kind: 227,
            loc: [16, 7, 16, 29],
            left: {
              kind: 80,
              loc: [16, 7, 16, 12],
              text: "upper",
              bindingKey: "upper$3ciy5yb38f51h$1",
            },
            operatorToken: "&&",
            right: {
              kind: 227,
              loc: [16, 16, 16, 29],
              left: {
                kind: 80,
                loc: [16, 16, 16, 20],
                text: "text",
                bindingKey: "text$3ciy5yb38f51h$0",
              },
              operatorToken: "!==",
              right: {
                kind: 106,
                loc: [16, 25, 16, 29],
              },
            },
          },
          thenStatement: {
            kind: 242,
            loc: [16, 31, 18, 4],
            statements: [
              {
                kind: 254,
                loc: [17, 5, 17, 31],
                expression: {
                  kind: 214,
                  loc: [17, 12, 17, 30],
                  expression: {
                    kind: 212,
                    loc: [17, 12, 17, 28],
                    expression: {
                      kind: 80,
                      loc: [17, 12, 17, 16],
                      text: "text",
                      bindingKey: "text$3ciy5yb38f51h$0",
                    },
                    questionDotToken: false,
                    name: "toUpperCase",
                  },
                  questionDotToken: false,
                  arguments: [],
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: 246,
          loc: [19, 3, 21, 4],
          expression: {
            kind: 227,
            loc: [19, 7, 19, 65],
            left: {
              kind: 227,
              loc: [19, 7, 19, 39],
              left: {
                kind: 1000,
                loc: [19, 7, 19, 22],
                key: "$0splice0",
              },
              operatorToken: "&&",
              right: {
                kind: 227,
                loc: [19, 26, 19, 39],
                left: {
                  kind: 80,
                  loc: [19, 26, 19, 30],
                  text: "text",
                  bindingKey: "text$3ciy5yb38f51h$0",
                },
                operatorToken: "!==",
                right: {
                  kind: 106,
                  loc: [19, 35, 19, 39],
                },
              },
            },
            operatorToken: "&&",
            right: {
              kind: 227,
              loc: [19, 43, 19, 65],
              left: {
                kind: 214,
                loc: [19, 43, 19, 57],
                expression: {
                  kind: 212,
                  loc: [19, 43, 19, 54],
                  expression: {
                    kind: 80,
                    loc: [19, 43, 19, 47],
                    text: "text",
                    bindingKey: "text$3ciy5yb38f51h$0",
                  },
                  questionDotToken: false,
                  name: "charAt",
                },
                questionDotToken: false,
                arguments: [
                  {
                    kind: 9,
                    loc: [19, 55, 19, 56],
                    value: 0,
                  },
                ],
              },
              operatorToken: "===",
              right: {
                kind: 11,
                loc: [19, 62, 19, 65],
                text: "!",
              },
            },
          },
          thenStatement: {
            kind: 242,
            loc: [19, 67, 21, 4],
            statements: [
              {
                kind: 254,
                loc: [20, 5, 20, 29],
                expression: {
                  kind: 214,
                  loc: [20, 12, 20, 28],
                  expression: {
                    kind: 212,
                    loc: [20, 12, 20, 23],
                    expression: {
                      kind: 80,
                      loc: [20, 12, 20, 16],
                      text: "text",
                      bindingKey: "text$3ciy5yb38f51h$0",
                    },
                    questionDotToken: false,
                    name: "concat",
                  },
                  questionDotToken: false,
                  arguments: [
                    {
                      kind: 11,
                      loc: [20, 24, 20, 27],
                      text: "?",
                    },
                  ],
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: 254,
          loc: [22, 3, 22, 17],
          expression: {
            kind: 11,
            loc: [22, 10, 22, 16],
            text: "none",
          },
        },
      ],
    },
  }),
);
export default cs.create(
  [25, 16, 30, 4],
  {
    version: "0.0.0",
    filePath: "condition-narrowing.ts",
    fileHash: "3ciy5yb38f51h",
    kind: "value",
    splices: { $label: label },
    captures: [],
    spliceParams: { $label: [] },
  },
  () => ({
    kind: 211,
    loc: [25, 20, 30, 2],
    properties: [
      {
        kind: 304,
        loc: [26, 3, 26, 30],
        name: "missing",
        initializer: {
          kind: 214,
          loc: [26, 12, 26, 30],
          expression: {
            kind: 1000,
            loc: [26, 12, 26, 18],
            key: "$label",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 106,
              loc: [26, 19, 26, 23],
            },
            {
              kind: 112,
              loc: [26, 25, 26, 29],
            },
          ],
        },
      },
      {
        kind: 304,
        loc: [27, 3, 27, 28],
        name: "loud",
        initializer: {
          kind: 214,
          loc: [27, 9, 27, 28],
          expression: {
            kind: 1000,
            loc: [27, 9, 27, 15],
            key: "$label",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 11,
              loc: [27, 16, 27, 21],
              text: "!hi",
            },
            {
              kind: 112,
              loc: [27, 23, 27, 27],
            },
          ],
        },
      },
      {
        kind: 304,
        loc: [28, 3, 28, 30],
        name: "quiet",
        initializer: {
          kind: 214,
          loc: [28, 10, 28, 30],
          expression: {
            kind: 1000,
            loc: [28, 10, 28, 16],
            key: "$label",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 11,
              loc: [28, 17, 28, 22],
              text: "!hi",
            },
            {
              kind: 97,
              loc: [28, 24, 28, 29],
            },
          ],
        },
      },
      {
        kind: 304,
        loc: [29, 3, 29, 29],
        name: "plain",
        initializer: {
          kind: 214,
          loc: [29, 10, 29, 29],
          expression: {
            kind: 1000,
            loc: [29, 10, 29, 16],
            key: "$label",
          },
          questionDotToken: false,
          arguments: [
            {
              kind: 11,
              loc: [29, 17, 29, 21],
              text: "zz",
            },
            {
              kind: 97,
              loc: [29, 23, 29, 28],
            },
          ],
        },
      },
    ],
  }),
);
