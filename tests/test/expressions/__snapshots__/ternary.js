import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `?:` tests a boolean — no truthiness — evaluates only the taken branch,
// and its condition narrows like an `if`'s.
const pick = cs.create(
  [7, 14, 9, 3],
  {
    version: "0.0.0",
    filePath: "expressions/ternary.test.tsx",
    fileHash: "27ii4cz5ah9i8",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [7, 17, 9, 2],
    parameters: [
      {
        kind: "param",
        loc: [7, 18, 7, 34],
        name: {
          kind: "id",
          loc: [7, 18, 7, 19],
          text: "n",
          bindingKey: "n$27ii4cz5ah9i8$0",
        },
      },
    ],
    body: {
      kind: "{}",
      loc: [7, 39, 9, 2],
      statements: [
        {
          kind: "return",
          loc: [8, 3, 8, 33],
          expression: {
            kind: "?:",
            loc: [8, 10, 8, 32],
            condition: {
              kind: "binop",
              loc: [8, 10, 8, 20],
              left: {
                kind: "id",
                loc: [8, 10, 8, 11],
                text: "n",
                bindingKey: "n$27ii4cz5ah9i8$0",
              },
              operatorToken: "===",
              right: {
                kind: "null",
                loc: [8, 16, 8, 20],
              },
            },
            whenTrue: {
              kind: "number",
              loc: [8, 23, 8, 24],
              value: 0,
            },
            whenFalse: {
              kind: "binop",
              loc: [8, 27, 8, 32],
              left: {
                kind: "id",
                loc: [8, 27, 8, 28],
                text: "n",
                bindingKey: "n$27ii4cz5ah9i8$0",
              },
              operatorToken: "+",
              right: {
                kind: "number",
                loc: [8, 31, 8, 32],
                value: 1,
              },
            },
          },
        },
      ],
    },
  }),
);
it("ternary", async (t) => {
  await snapshotCase(
    t,
    "ternary",
    cs.create(
      [15, 5, 18, 8],
      {
        version: "0.0.0",
        filePath: "expressions/ternary.test.tsx",
        fileHash: "27ii4cz5ah9i8",
        splices: { $pick: { value: pick, params: [] } },
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [15, 9, 18, 6],
        properties: [
          {
            kind: ":",
            loc: [16, 7, 16, 26],
            name: {
              kind: "string",
              loc: [16, 7, 16, 13],
              text: "absent",
            },
            initializer: {
              kind: "()",
              loc: [16, 15, 16, 26],
              expression: {
                kind: "splice",
                loc: [16, 15, 16, 20],
                key: "$pick",
              },
              arguments: [
                {
                  kind: "null",
                  loc: [16, 21, 16, 25],
                },
              ],
            },
          },
          {
            kind: ":",
            loc: [17, 7, 17, 24],
            name: {
              kind: "string",
              loc: [17, 7, 17, 14],
              text: "present",
            },
            initializer: {
              kind: "()",
              loc: [17, 16, 17, 24],
              expression: {
                kind: "splice",
                loc: [17, 16, 17, 21],
                key: "$pick",
              },
              arguments: [
                {
                  kind: "number",
                  loc: [17, 22, 17, 23],
                  value: 4,
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
