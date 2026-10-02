import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("runtimeValues", async (t) => {
  await snapshotCase(
    t,
    "runtimeValues",
    cs.lift((() => ({ list: cs.splice([1, "two", true, null]), obj: cs.splice({ k: 3 }) }))()),
  );
});
