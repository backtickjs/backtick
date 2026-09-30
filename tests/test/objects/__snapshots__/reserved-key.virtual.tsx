import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `#` is the bundle's one reserved key — the discriminant of every node — so
// a plain data object can't carry it.
it("reservedKey", async (t) => {
  await snapshotCase(t, "reservedKey", cs.lift(() => cs.splice({ "#": "value" })));
});
