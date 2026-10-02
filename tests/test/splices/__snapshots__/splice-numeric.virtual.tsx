import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("spliceNumeric", async (t) => {
  await snapshotCase(t, "spliceNumeric", cs.lift((() => cs.splice(1))()));
});
