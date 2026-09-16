import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("constant", async (t) => {
  await snapshotCase(t, "constant", cs`1`);
});
