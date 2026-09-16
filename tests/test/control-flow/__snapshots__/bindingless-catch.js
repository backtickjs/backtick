import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A `catch` without a binding: the try node's `param` is null and the
// handler runs with no new binding in scope.
it("bindinglessCatch", async (t) => {
  await snapshotCase(
    t,
    "bindinglessCatch",
    cs.create(
      [11, 5, 17, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/bindingless-catch.test.tsx",
        fileHash: "1lr2275tf95wm",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [11, 8, 17, 6],
        statements: [
          {
            kind: "try",
            loc: [12, 7, 16, 8],
            tryBlock: {
              kind: "{}",
              loc: [12, 11, 14, 8],
              statements: [
                {
                  kind: "throw",
                  loc: [13, 9, 13, 22],
                  expression: {
                    kind: "string",
                    loc: [13, 15, 13, 21],
                    text: "boom",
                  },
                },
              ],
            },
            catchClause: {
              kind: "catch",
              loc: [14, 9, 16, 8],
              variableDeclaration: null,
              block: {
                kind: "{}",
                loc: [14, 15, 16, 8],
                statements: [
                  {
                    kind: "return",
                    loc: [15, 9, 15, 25],
                    expression: {
                      kind: "string",
                      loc: [15, 16, 15, 24],
                      text: "caught",
                    },
                  },
                ],
              },
            },
          },
        ],
      }),
    ),
  );
});
