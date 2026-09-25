import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep: Client<void> = cs.lift((() => {
    let __cs_n = 0;
    __cs_n = 1;
})());

const onTap: Client<(id: number) => void> = cs.lift((__cs_id: number) => {
    cs.splice((beep) satisfies typeof cs.Spliceable);
});

it("handlerObject", async (t) => {
  await snapshotCase(
    t,
    "handlerObject",
    cs.lift((() => {
    const __cs_handlers = { tap: cs.splice((onTap) satisfies typeof cs.Spliceable), hold: cs.splice((onTap) satisfies typeof cs.Spliceable) };
    return __cs_handlers;
})()),
  );
});
