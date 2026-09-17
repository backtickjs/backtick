import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Handlers — action arrows — are values: an object carries them, and
// storing one is not calling it.
const beep: Client<void> = cs.lift((() => {
    let __cs_n = 0;
    __cs_n = cs.const(1);
})());

const onTap: Client<(id: number) => void> = cs.lift(cs.const((__cs_id: number) => {
    cs.statement((cs.splice((beep)) satisfies typeof cs.ClientUnknown));
}));

it("handlerObject", async (t) => {
  await snapshotCase(
    t,
    "handlerObject",
    cs.lift((() => {
    const __cs_handlers = cs.const({ tap: (cs.splice((onTap)) satisfies typeof cs.ClientUnknown), hold: (cs.splice((onTap)) satisfies typeof cs.ClientUnknown) });
    return cs.const(__cs_handlers);
})()),
  );
});
