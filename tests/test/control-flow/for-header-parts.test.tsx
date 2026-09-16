import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Every part of the header is optional: this one declares nothing and updates
// nothing, leaving both to the block around it and the body.
it("forHeaderParts", async (t) => {
  await snapshotCase(
    t,
    "forHeaderParts",
    cs`{
      let i = 0;
      let seen = "";
      for (; i < 3; ) {
        seen = seen + i;
        i = i + 1;
      }
      return seen;
    }`,
  );
});
