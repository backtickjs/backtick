import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Comments in a client script are trivia: they survive formatting but are
// dropped from the virtual code and the bundle.
it("comments", async (t) => {
  await snapshotCase(
    t,
    "comments",
    cs.create(
      [11, 5, 23, 7],
      {
        version: "0.0.0",
        filePath: "expressions/comments.test.tsx",
        fileHash: "3lcac8ezsyzi3",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [11, 8, 23, 6],
        statements: [
          {
            kind: "const",
            loc: [13, 7, 13, 23],
            name: {
              kind: "id",
              loc: [13, 13, 13, 18],
              text: "count",
              bindingKey: "count$3lcac8ezsyzi3$0",
            },
            initializer: {
              kind: "number",
              loc: [13, 21, 13, 22],
              value: 1,
            },
          },
          {
            kind: "if",
            loc: [15, 7, 18, 8],
            expression: {
              kind: "binop",
              loc: [15, 11, 15, 22],
              left: {
                kind: "id",
                loc: [15, 11, 15, 16],
                text: "count",
                bindingKey: "count$3lcac8ezsyzi3$0",
              },
              operatorToken: "===",
              right: {
                kind: "number",
                loc: [15, 21, 15, 22],
                value: 1,
              },
            },
            thenStatement: {
              kind: "{}",
              loc: [15, 24, 18, 8],
              statements: [
                {
                  kind: "return",
                  loc: [17, 9, 17, 22],
                  expression: {
                    kind: "string",
                    loc: [17, 16, 17, 21],
                    text: "one",
                  },
                },
              ],
            },
            elseStatement: null,
          },
          {
            kind: "return",
            loc: [22, 7, 22, 21],
            expression: {
              kind: "string",
              loc: [22, 14, 22, 20],
              text: "many",
            },
          },
        ],
      }),
    ),
  );
});
