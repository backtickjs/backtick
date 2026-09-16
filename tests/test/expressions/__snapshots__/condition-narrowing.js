import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Narrowing must survive the boolean-condition checks: the tested condition
// stays in place in the virtual code (its check reads a sequenced
// duplicate), so `text !== null` still narrows `text` in the branch it
// guards and from a `&&` left operand into the right. The conditions cover
// each checked shape: a bare boolean identifier, a braced splice (whose
// duplicate re-renders the host expression), and comparison/`&&` forms that
// are boolean by construction and need no check.
const flags = {
  strict: cs.create(
    [12, 25, 12, 33],
    {
      version: "0.0.0",
      filePath: "expressions/condition-narrowing.test.tsx",
      fileHash: "2dyt2z4zc0eux",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "true",
      loc: [12, 28, 12, 32],
    }),
  ),
};
const label = cs.create(
  [14, 72, 25, 3],
  {
    version: "0.0.0",
    filePath: "expressions/condition-narrowing.test.tsx",
    fileHash: "2dyt2z4zc0eux",
    splices: { $0splice0: { value: flags.strict, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [14, 75, 25, 2],
    parameters: [
      {
        kind: "param",
        loc: [15, 3, 15, 22],
        name: {
          kind: "id",
          loc: [15, 3, 15, 7],
          text: "text",
          bindingKey: "text$2dyt2z4zc0eux$0",
        },
      },
      {
        kind: "param",
        loc: [16, 3, 16, 17],
        name: {
          kind: "id",
          loc: [16, 3, 16, 8],
          text: "upper",
          bindingKey: "upper$2dyt2z4zc0eux$1",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [17, 6, 25, 2],
      statements: [
        {
          kind: "if",
          loc: [18, 3, 20, 4],
          expression: {
            kind: "binop",
            loc: [18, 7, 18, 29],
            left: {
              kind: "id",
              loc: [18, 7, 18, 12],
              text: "upper",
              bindingKey: "upper$2dyt2z4zc0eux$1",
            },
            operatorToken: "&&",
            right: {
              kind: "binop",
              loc: [18, 16, 18, 29],
              left: {
                kind: "id",
                loc: [18, 16, 18, 20],
                text: "text",
                bindingKey: "text$2dyt2z4zc0eux$0",
              },
              operatorToken: "!==",
              right: {
                kind: "null",
                loc: [18, 25, 18, 29],
              },
            },
          },
          thenStatement: {
            kind: "{}",
            loc: [18, 31, 20, 4],
            statements: [
              {
                kind: "return",
                loc: [19, 5, 19, 31],
                expression: {
                  kind: "()",
                  loc: [19, 12, 19, 30],
                  expression: {
                    kind: ".",
                    loc: [19, 12, 19, 28],
                    expression: {
                      kind: "id",
                      loc: [19, 12, 19, 16],
                      text: "text",
                      bindingKey: "text$2dyt2z4zc0eux$0",
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
          loc: [21, 3, 23, 4],
          expression: {
            kind: "binop",
            loc: [21, 7, 21, 65],
            left: {
              kind: "binop",
              loc: [21, 7, 21, 39],
              left: {
                kind: "splice",
                loc: [21, 7, 21, 22],
                key: "$0splice0",
              },
              operatorToken: "&&",
              right: {
                kind: "binop",
                loc: [21, 26, 21, 39],
                left: {
                  kind: "id",
                  loc: [21, 26, 21, 30],
                  text: "text",
                  bindingKey: "text$2dyt2z4zc0eux$0",
                },
                operatorToken: "!==",
                right: {
                  kind: "null",
                  loc: [21, 35, 21, 39],
                },
              },
            },
            operatorToken: "&&",
            right: {
              kind: "binop",
              loc: [21, 43, 21, 65],
              left: {
                kind: "()",
                loc: [21, 43, 21, 57],
                expression: {
                  kind: ".",
                  loc: [21, 43, 21, 54],
                  expression: {
                    kind: "id",
                    loc: [21, 43, 21, 47],
                    text: "text",
                    bindingKey: "text$2dyt2z4zc0eux$0",
                  },
                  name: "charAt",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [21, 55, 21, 56],
                    value: 0,
                  },
                ],
              },
              operatorToken: "===",
              right: {
                kind: "string",
                loc: [21, 62, 21, 65],
                text: "!",
              },
            },
          },
          thenStatement: {
            kind: "{}",
            loc: [21, 67, 23, 4],
            statements: [
              {
                kind: "return",
                loc: [22, 5, 22, 29],
                expression: {
                  kind: "()",
                  loc: [22, 12, 22, 28],
                  expression: {
                    kind: ".",
                    loc: [22, 12, 22, 23],
                    expression: {
                      kind: "id",
                      loc: [22, 12, 22, 16],
                      text: "text",
                      bindingKey: "text$2dyt2z4zc0eux$0",
                    },
                    name: "concat",
                  },
                  arguments: [
                    {
                      kind: "string",
                      loc: [22, 24, 22, 27],
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
          loc: [24, 3, 24, 17],
          expression: {
            kind: "string",
            loc: [24, 10, 24, 16],
            text: "none",
          },
        },
      ],
    },
  }),
);
it("conditionNarrowing", async (t) => {
  await snapshotCase(
    t,
    "conditionNarrowing",
    cs.create(
      [31, 5, 36, 8],
      {
        version: "0.0.0",
        filePath: "expressions/condition-narrowing.test.tsx",
        fileHash: "2dyt2z4zc0eux",
        splices: { $label: { value: label, params: [] } },
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [31, 9, 36, 6],
        properties: [
          {
            kind: ":",
            loc: [32, 7, 32, 34],
            name: "missing",
            initializer: {
              kind: "()",
              loc: [32, 16, 32, 34],
              expression: {
                kind: "splice",
                loc: [32, 16, 32, 22],
                key: "$label",
              },
              arguments: [
                {
                  kind: "null",
                  loc: [32, 23, 32, 27],
                },
                {
                  kind: "true",
                  loc: [32, 29, 32, 33],
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [33, 7, 33, 32],
            name: "loud",
            initializer: {
              kind: "()",
              loc: [33, 13, 33, 32],
              expression: {
                kind: "splice",
                loc: [33, 13, 33, 19],
                key: "$label",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [33, 20, 33, 25],
                  text: "!hi",
                },
                {
                  kind: "true",
                  loc: [33, 27, 33, 31],
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [34, 7, 34, 34],
            name: "quiet",
            initializer: {
              kind: "()",
              loc: [34, 14, 34, 34],
              expression: {
                kind: "splice",
                loc: [34, 14, 34, 20],
                key: "$label",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [34, 21, 34, 26],
                  text: "!hi",
                },
                {
                  kind: "false",
                  loc: [34, 28, 34, 33],
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [35, 7, 35, 33],
            name: "plain",
            initializer: {
              kind: "()",
              loc: [35, 14, 35, 33],
              expression: {
                kind: "splice",
                loc: [35, 14, 35, 20],
                key: "$label",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [35, 21, 35, 25],
                  text: "zz",
                },
                {
                  kind: "false",
                  loc: [35, 27, 35, 32],
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
