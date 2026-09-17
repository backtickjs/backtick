import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A key computed while the script runs. A literal that holds one is a node,
// as one a spread runs through is: its key has no text to ship as data. Keys
// are evaluated in order, and a later one wins in the place the first took.
it("computedKey", async (t) => {
  await snapshotCase(
    t,
    "computedKey",
    cs`{
      const base = { a: 1, b: 2 };
      const name = "b";
      return {
        ...base,
        [name]: 9,
        ["c" + "d"]: 3,
        a: 4,
      };
    }`,
  );
});
