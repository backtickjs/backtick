import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A record read as pairs and built back from them: how a script makes a
// record whose keys it only learns when it runs.
it("objectEntries", async (t) => {
  await snapshotCase(
    t,
    "objectEntries",
    cs`{
      const held = { n: 1, q: "ada" };
      const written = Object.fromEntries(
        Object.entries(held).map((pair) => [pair[0], JSON.stringify(pair[1])]),
      );
      return written.n + " " + written.q;
    }`,
  );
});
