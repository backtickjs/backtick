import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A checked condition containing its own tested positions: `keep(a && b)` is
// checked (a call), and inside it `a` and `b` are checked (identifiers). The
// check's trailing bare duplicate must stay check-free and suppressed — a
// duplicate that re-checked its operands would grow by a copy per nesting
// level and re-report every operand mismatch at a second virtual position —
// so the virtual code and mappings pin the duplicate staying bare.
const gate = cs.create(
  [11, 58, 20, 3],
  {
    version: "0.0.0",
    filePath: "expressions/nested-condition-check.test.tsx",
    fileHash: "25ylu92dfkakl",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [11, 61, 20, 2],
    parameters: [
      {
        kind: "param",
        loc: [12, 3, 12, 13],
        name: {
          kind: "id",
          loc: [12, 3, 12, 4],
          text: "a",
          bindingKey: "a$25ylu92dfkakl$0",
        },
      },
      {
        kind: "param",
        loc: [13, 3, 13, 13],
        name: {
          kind: "id",
          loc: [13, 3, 13, 4],
          text: "b",
          bindingKey: "b$25ylu92dfkakl$1",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [14, 6, 20, 2],
      statements: [
        {
          kind: "const",
          loc: [15, 3, 15, 36],
          name: {
            kind: "id",
            loc: [15, 9, 15, 13],
            text: "keep",
            bindingKey: "keep$25ylu92dfkakl$2",
          },
          initializer: {
            kind: "=>",
            loc: [15, 16, 15, 35],
            parameters: [
              {
                kind: "param",
                loc: [15, 17, 15, 28],
                name: {
                  kind: "id",
                  loc: [15, 17, 15, 19],
                  text: "on",
                  bindingKey: "on$25ylu92dfkakl$3",
                },
              },
            ],
            body: {
              kind: "id",
              loc: [15, 33, 15, 35],
              text: "on",
              bindingKey: "on$25ylu92dfkakl$3",
            },
          },
        },
        {
          kind: "if",
          loc: [16, 3, 18, 4],
          expression: {
            kind: "()",
            loc: [16, 7, 16, 19],
            expression: {
              kind: "id",
              loc: [16, 7, 16, 11],
              text: "keep",
              bindingKey: "keep$25ylu92dfkakl$2",
            },
            arguments: [
              {
                kind: "binop",
                loc: [16, 12, 16, 18],
                left: {
                  kind: "id",
                  loc: [16, 12, 16, 13],
                  text: "a",
                  bindingKey: "a$25ylu92dfkakl$0",
                },
                operatorToken: "&&",
                right: {
                  kind: "id",
                  loc: [16, 17, 16, 18],
                  text: "b",
                  bindingKey: "b$25ylu92dfkakl$1",
                },
              },
            ],
          },
          thenStatement: {
            kind: "{}",
            loc: [16, 21, 18, 4],
            statements: [
              {
                kind: "return",
                loc: [17, 5, 17, 19],
                expression: {
                  kind: "string",
                  loc: [17, 12, 17, 18],
                  text: "kept",
                },
              },
            ],
          },
          elseStatement: null,
        },
        {
          kind: "return",
          loc: [19, 3, 19, 20],
          expression: {
            kind: "string",
            loc: [19, 10, 19, 19],
            text: "dropped",
          },
        },
      ],
    },
  }),
);
it("nestedConditionCheck", async (t) => {
  await snapshotCase(
    t,
    "nestedConditionCheck",
    cs.create(
      [26, 5, 29, 8],
      {
        version: "0.0.0",
        filePath: "expressions/nested-condition-check.test.tsx",
        fileHash: "25ylu92dfkakl",
        splices: { $gate: { value: gate, params: [] } },
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [26, 9, 29, 6],
        properties: [
          {
            kind: ":",
            loc: [27, 7, 27, 30],
            name: {
              kind: "string",
              loc: [27, 7, 27, 11],
              text: "both",
            },
            initializer: {
              kind: "()",
              loc: [27, 13, 27, 30],
              expression: {
                kind: "splice",
                loc: [27, 13, 27, 18],
                key: "$gate",
              },
              arguments: [
                {
                  kind: "true",
                  loc: [27, 19, 27, 23],
                },
                {
                  kind: "true",
                  loc: [27, 25, 27, 29],
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [28, 7, 28, 30],
            name: {
              kind: "string",
              loc: [28, 7, 28, 10],
              text: "one",
            },
            initializer: {
              kind: "()",
              loc: [28, 12, 28, 30],
              expression: {
                kind: "splice",
                loc: [28, 12, 28, 17],
                key: "$gate",
              },
              arguments: [
                {
                  kind: "true",
                  loc: [28, 18, 28, 22],
                },
                {
                  kind: "false",
                  loc: [28, 24, 28, 29],
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
