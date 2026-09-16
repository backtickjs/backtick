import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A runtime object spliced into a script inlines as the plain data it is, so
// it can't carry `#` — the bundle's one reserved key — either.
it("reservedKeySplice", async (t) => {
  await snapshotCase(t, "reservedKeySplice", cs`${{ "#": "value" }}`);
});
