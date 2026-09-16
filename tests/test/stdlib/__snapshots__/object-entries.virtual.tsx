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
    const __cs_written = cs.const(cs.receiver(Object).fromEntries(cs.receiver(cs.receiver(Object).entries(__cs_held)).map(__cs_pair => [cs.receiver(__cs_pair)[0], cs.receiver(JSON).stringify(cs.receiver(__cs_pair)[1])])));
    return cs.const(cs.receiver(__cs_written).n + " " + cs.receiver(__cs_written).q);
})()),
  );
});
