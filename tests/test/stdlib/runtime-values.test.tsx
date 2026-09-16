import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("runtimeValues", async (t) => {
  await snapshotCase(
    t,
    "runtimeValues",
    cs`({
      list: ${[1, "two", true, null]},
      obj: ${{ k: 3 }},
    })`,
  );
});
