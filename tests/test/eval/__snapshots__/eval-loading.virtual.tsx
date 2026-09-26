import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import type { BacktickElement, Bundle } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A bundle a page does not have yet, and what stands in until it does.
//
// Both reads are where they stand, inside the drawing: that is what makes the
// condition follow the signal. Reading it once into a `const` would narrow the
// type and freeze the drawing — the script body runs once, so the loading
// state would never resolve. So the second read is asserted instead, which
// the condition beside it is what makes true.
it("evalLoading", async (t) => {
  await snapshotCase(
    t,
    "evalLoading",
    cs.lift((() => {
    const __cs_held = cs.splice((createSignal) satisfies typeof cs.Spliceable)<Bundle<BacktickElement> | null>(null);
    return <div>{cs.lift(__cs_held[0]() === null ? <span>loading…</span> : eval(__cs_held[0]() as Bundle<BacktickElement>))}</div>;
})()),
  );
});
