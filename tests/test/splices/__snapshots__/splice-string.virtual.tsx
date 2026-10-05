import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A runtime string splice inlines as itself — quotes, newlines, and
// backslashes intact.
const value = 'say "hi"\n\\done';

it("spliceString", async (t) => {
  await snapshotCase(t, "spliceString", cs.lift((() => (cs.splice((value))))()));
});
