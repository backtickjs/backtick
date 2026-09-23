import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A record read as pairs and built back from them: how a script makes a
// record whose keys it only learns when it runs.
it("objectEntries", async (t) => {
  await snapshotCase(
    t,
    "objectEntries",
    cs.lift((() => {
    const __cs_held = cs.const({ n: 1, q: "ada" });
    const __cs_written = cs.const(Object.fromEntries(Object.entries(__cs_held).map(__cs_pair => [__cs_pair[0], JSON.stringify(__cs_pair[1])])));
    return cs.const(__cs_written.n + " " + __cs_written.q);
})()),
  );
});
