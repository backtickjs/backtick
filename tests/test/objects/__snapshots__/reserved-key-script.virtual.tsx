import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `#` stays reserved inside a script body: an object literal serializes as
// the plain object it spells, so it can't carry the discriminant key.
it("reservedKeyScript", async (t) => {
  await snapshotCase(t, "reservedKeyScript", cs.lift({ "#": "value" }));
});
