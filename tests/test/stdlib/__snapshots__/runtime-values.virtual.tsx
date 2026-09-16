import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

it("runtimeValues", async (t) => {
  await snapshotCase(
    t,
    "runtimeValues",
    cs.lift(cs.const({ list: cs.splice([1, "two", true, null]) satisfies typeof cs.ClientUnknown, obj: cs.splice({ k: 3 }) satisfies typeof cs.ClientUnknown })),
  );
});
