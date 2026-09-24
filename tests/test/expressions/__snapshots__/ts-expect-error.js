import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A checker directive written in a script covers the statement below it, as it
// does in TypeScript. The typecheck of this file is the assertion: it passes
// only while the error is there and the directive suppresses it.
it("tsExpectError", async (t) => {
  await snapshotCase(
    t,
    "tsExpectError",
    cs.create(
      { start: { line: 12, column: 4 }, end: { line: 16, column: 6 } },
      {
        version: "0.0.0",
        filePath: "expressions/ts-expect-error.test.tsx",
        fileHash: "353rib4gy05pn",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 16, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 34 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 14, column: 12 },
                  end: { line: 14, column: 33 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 12 },
                    end: { line: 14, column: 17 },
                  },
                  name: "count",
                  key: "count$353rib4gy05pn$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 14, column: 28 },
                    end: { line: 14, column: 33 },
                  },
                  value: "one",
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 15, column: 19 },
            },
            argument: {
              type: "Identifier",
              loc: {
                start: { line: 15, column: 13 },
                end: { line: 15, column: 18 },
              },
              name: "count",
              key: "count$353rib4gy05pn$0",
            },
          },
        ],
      }),
    ),
  );
});
