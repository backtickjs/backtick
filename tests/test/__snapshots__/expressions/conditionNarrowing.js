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
      filePath: "conditionNarrowing.tsx",
      fileHash: "fwx4ypfo22uw",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "true",
      loc: [10, 28, 10, 32],
    }),
  ),
};
const label = cs.create(
  [12, 72, 23, 3],
  {
    version: "0.0.0",
    filePath: "conditionNarrowing.tsx",
    fileHash: "fwx4ypfo22uw",
    splices: { $0splice0: { value: flags.strict, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [12, 75, 23, 2],
    parameters: [
      {
        kind: "param",
        loc: [13, 3, 13, 22],
        name: {
          kind: "id",
          loc: [13, 3, 13, 7],
          text: "text",
          bindingKey: "text$fwx4ypfo22uw$0",
        },
      },
      {
        kind: "param",
        loc: [14, 3, 14, 17],
        name: {
          kind: "id",
          loc: [14, 3, 14, 8],
          text: "upper",
          bindingKey: "upper$fwx4ypfo22uw$1",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [15, 6, 23, 2],
      statements: [
        {
          kind: "if",
          loc: [16, 3, 18, 4],
          expression: {
            kind: "binop",
            loc: [16, 7, 16, 29],
            left: {
              kind: "id",
              loc: [16, 7, 16, 12],
              text: "upper",
              bindingKey: "upper$fwx4ypfo22uw$1",
            },
            operatorToken: "&&",
            right: {
              kind: "binop",
              loc: [16, 16, 16, 29],
              left: {
                kind: "id",
                loc: [16, 16, 16, 20],
                text: "text",
                bindingKey: "text$fwx4ypfo22uw$0",
              },
              operatorToken: "!==",
              right: {
                kind: "null",
                loc: [16, 25, 16, 29],
              },
            },
          },
          thenStatement: {
            kind: "{}",
            loc: [16, 31, 18, 4],
            statements: [
              {
                kind: "return",
                loc: [17, 5, 17, 31],
                expression: {
                  kind: "()",
                  loc: [17, 12, 17, 30],
                  expression: {
                    kind: ".",
                    loc: [17, 12, 17, 28],
                    expression: {
                      kind: "id",
                      loc: [17, 12, 17, 16],
                      text: "text",
                      bindingKey: "text$fwx4ypfo22uw$0",
                    },
                    name: "toUpperCase",
                  },
                  arguments: [],
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: "if",
          loc: [19, 3, 21, 4],
          expression: {
            kind: "binop",
            loc: [19, 7, 19, 65],
            left: {
              kind: "binop",
              loc: [19, 7, 19, 39],
              left: {
                kind: "splice",
                loc: [19, 7, 19, 22],
                key: "$0splice0",
              },
              operatorToken: "&&",
              right: {
                kind: "binop",
                loc: [19, 26, 19, 39],
                left: {
                  kind: "id",
                  loc: [19, 26, 19, 30],
                  text: "text",
                  bindingKey: "text$fwx4ypfo22uw$0",
                },
                operatorToken: "!==",
                right: {
                  kind: "null",
                  loc: [19, 35, 19, 39],
                },
              },
            },
            operatorToken: "&&",
            right: {
              kind: "binop",
              loc: [19, 43, 19, 65],
              left: {
                kind: "()",
                loc: [19, 43, 19, 57],
                expression: {
                  kind: ".",
                  loc: [19, 43, 19, 54],
                  expression: {
                    kind: "id",
                    loc: [19, 43, 19, 47],
                    text: "text",
                    bindingKey: "text$fwx4ypfo22uw$0",
                  },
                  name: "charAt",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [19, 55, 19, 56],
                    value: 0,
                  },
                ],
              },
              operatorToken: "===",
              right: {
                kind: "string",
                loc: [19, 62, 19, 65],
                text: "!",
              },
            },
          },
          thenStatement: {
            kind: "{}",
            loc: [19, 67, 21, 4],
            statements: [
              {
                kind: "return",
                loc: [20, 5, 20, 29],
                expression: {
                  kind: "()",
                  loc: [20, 12, 20, 28],
                  expression: {
                    kind: ".",
                    loc: [20, 12, 20, 23],
                    expression: {
                      kind: "id",
                      loc: [20, 12, 20, 16],
                      text: "text",
                      bindingKey: "text$fwx4ypfo22uw$0",
                    },
                    name: "concat",
                  },
                  arguments: [
                    {
                      kind: "string",
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
          kind: "return",
          loc: [22, 3, 22, 17],
          expression: {
            kind: "string",
            loc: [22, 10, 22, 16],
            text: "none",
          },
        },
      ],
    },
  }),
);
const conditionNarrowing = cs.create(
  [25, 28, 30, 4],
  {
    version: "0.0.0",
    filePath: "conditionNarrowing.tsx",
    fileHash: "fwx4ypfo22uw",
    splices: { $label: { value: label, params: [] } },
    captures: [],
  },
  () => ({
    kind: "obj",
    loc: [25, 32, 30, 2],
    properties: [
      {
        kind: ":",
        loc: [26, 3, 26, 30],
        name: "missing",
        initializer: {
          kind: "()",
          loc: [26, 12, 26, 30],
          expression: {
            kind: "splice",
            loc: [26, 12, 26, 18],
            key: "$label",
          },
          arguments: [
            {
              kind: "null",
              loc: [26, 19, 26, 23],
            },
            {
              kind: "true",
              loc: [26, 25, 26, 29],
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [27, 3, 27, 28],
        name: "loud",
        initializer: {
          kind: "()",
          loc: [27, 9, 27, 28],
          expression: {
            kind: "splice",
            loc: [27, 9, 27, 15],
            key: "$label",
          },
          arguments: [
            {
              kind: "string",
              loc: [27, 16, 27, 21],
              text: "!hi",
            },
            {
              kind: "true",
              loc: [27, 23, 27, 27],
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [28, 3, 28, 30],
        name: "quiet",
        initializer: {
          kind: "()",
          loc: [28, 10, 28, 30],
          expression: {
            kind: "splice",
            loc: [28, 10, 28, 16],
            key: "$label",
          },
          arguments: [
            {
              kind: "string",
              loc: [28, 17, 28, 22],
              text: "!hi",
            },
            {
              kind: "false",
              loc: [28, 24, 28, 29],
            },
          ],
        },
      },
      {
        kind: ":",
        loc: [29, 3, 29, 29],
        name: "plain",
        initializer: {
          kind: "()",
          loc: [29, 10, 29, 29],
          expression: {
            kind: "splice",
            loc: [29, 10, 29, 16],
            key: "$label",
          },
          arguments: [
            {
              kind: "string",
              loc: [29, 17, 29, 21],
              text: "zz",
            },
            {
              kind: "false",
              loc: [29, 23, 29, 28],
            },
          ],
        },
      },
    ],
  }),
);
