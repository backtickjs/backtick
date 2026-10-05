import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Only the bare `#` key is reserved: a plain data object is free to use keys
// that merely start with `#`, even ones spelled like the tagged forms.
it("hashKeyData", async (t) => {
  await snapshotCase(t, "hashKeyData", cs.lift((() => () => (cs.splice({ "#call": "#f0" })))()));
});
