import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// An action — a block with no `return` — types `Client<void>` natively and
// composes as a block running it in statement position.
const effects: Client<void> = cs.lift((() => {
  const __cs_x = 1;
})());

const composed: Client<void> = cs.lift((() => {
  (cs.splice((effects)));
})());

it("actionComposition", async (t) => {
  await snapshotCase(
    t,
    "actionComposition",
    cs.lift((() => {
      (cs.splice((composed)));
    })()),
  );
});
