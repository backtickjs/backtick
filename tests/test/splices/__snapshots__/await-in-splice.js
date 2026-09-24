import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
async function fetchGreeting() {
  return "hello";
}
// A spliced host expression evaluates in the template's own scope — the
// compiled output wraps it in no function — so `await` works wherever the
// template itself may await, here at module top level.
it("awaitInSplice", async (t) => {
  await snapshotCase(
    t,
    "awaitInSplice",
    cs.create(
      { start: { line: 13, column: 41 }, end: { line: 13, column: 75 } },
      {
        version: "0.0.0",
        filePath: "splices/await-in-splice.test.tsx",
        fileHash: "1bxbldnw0mfci",
        splices: { $0splice0: { value: await fetchGreeting(), params: [] } },
        captures: [],
      },
      () => ({
        type: "BinaryExpression",
        loc: { start: { line: 13, column: 44 }, end: { line: 13, column: 74 } },
        operator: "+",
        left: {
          type: "Splice",
          loc: {
            start: { line: 13, column: 44 },
            end: { line: 13, column: 68 },
          },
          key: "$0splice0",
        },
        right: {
          type: "Literal",
          loc: {
            start: { line: 13, column: 71 },
            end: { line: 13, column: 74 },
          },
          value: "!",
        },
      }),
    ),
  );
});
