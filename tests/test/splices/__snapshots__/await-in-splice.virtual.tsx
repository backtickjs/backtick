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
  await snapshotCase(t, "awaitInSplice", cs.lift(cs.splice(await fetchGreeting()) + "!"));
});
