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
      [12, 5, 16, 7],
      {
        version: "0.0.0",
        filePath: "expressions/ts-expect-error.test.tsx",
        fileHash: "353rib4gy05pn",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [12, 8, 16, 6],
        statements: [
          {
            kind: "const",
            loc: [14, 7, 14, 35],
            name: {
              kind: "id",
              loc: [14, 13, 14, 18],
              text: "count",
              bindingKey: "count$353rib4gy05pn$0",
            },
            initializer: {
              kind: "string",
              loc: [14, 29, 14, 34],
              text: "one",
            },
          },
          {
            kind: "return",
            loc: [15, 7, 15, 20],
            expression: {
              kind: "id",
              loc: [15, 14, 15, 19],
              text: "count",
              bindingKey: "count$353rib4gy05pn$0",
            },
          },
        ],
      }),
    ),
  );
});
