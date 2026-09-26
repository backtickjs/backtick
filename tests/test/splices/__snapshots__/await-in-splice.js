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
      "1bxbldnw0mfci:13:41",
      {
        params: [
          { kind: "splice", value: await fetchGreeting(), bindings: [] },
        ],
      },
      '($splice0) => $splice0() + "!"',
      '{"version":3,"file":"await-in-splice.test.jsx","sourceRoot":"","sources":["splices/await-in-splice.test.tsx"],"names":[],"mappings":"AAY4C,cAAA,UAAC,GAA0B,GAAG"}',
    ),
  );
});
