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
      [13, 42, 13, 76],
      {
        version: "0.0.0",
        filePath: "splices/await-in-splice.test.tsx",
        fileHash: "1bxbldnw0mfci",
        splices: { $0splice0: { value: await fetchGreeting(), params: [] } },
        captures: [],
      },
      () => ({
        kind: "binop",
        loc: [13, 45, 13, 75],
        left: {
          kind: "splice",
          loc: [13, 45, 13, 69],
          key: "$0splice0",
        },
        operatorToken: "+",
        right: {
          kind: "string",
          loc: [13, 72, 13, 75],
          text: "!",
        },
      }),
    ),
  );
});
