import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bare `return` exits an action early; the completion is null either way.
it("earlyReturn", async (t) => {
  await snapshotCase(
    t,
    "earlyReturn",
    cs.create(
      [10, 5, 16, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/early-return.test.tsx",
        fileHash: "33mpmt8iae2c7",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [10, 8, 16, 6],
        statements: [
          {
            kind: "let",
            loc: [11, 7, 11, 17],
            name: {
              kind: "id",
              loc: [11, 11, 11, 12],
              text: "n",
              bindingKey: "n$33mpmt8iae2c7$0",
            },
            initializer: {
              kind: "number",
              loc: [11, 15, 11, 16],
              value: 0,
            },
          },
          {
            kind: "if",
            loc: [12, 7, 14, 8],
            expression: {
              kind: "binop",
              loc: [12, 11, 12, 18],
              left: {
                kind: "id",
                loc: [12, 11, 12, 12],
                text: "n",
                bindingKey: "n$33mpmt8iae2c7$0",
              },
              operatorToken: "===",
              right: {
                kind: "number",
                loc: [12, 17, 12, 18],
                value: 0,
              },
            },
            thenStatement: {
              kind: "{}",
              loc: [12, 20, 14, 8],
              statements: [
                {
                  kind: "return",
                  loc: [13, 9, 13, 16],
                  expression: {
                    kind: "undefined",
                    loc: [13, 9, 13, 16],
                  },
                },
              ],
            },
            elseStatement: null,
          },
          {
            kind: "binop",
            loc: [15, 7, 15, 12],
            left: {
              kind: "id",
              loc: [15, 7, 15, 8],
              text: "n",
              bindingKey: "n$33mpmt8iae2c7$0",
            },
            operatorToken: "=",
            right: {
              kind: "number",
              loc: [15, 11, 15, 12],
              value: 1,
            },
          },
        ],
      }),
    ),
  );
});
