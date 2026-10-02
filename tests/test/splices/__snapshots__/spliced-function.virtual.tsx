import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A host function has no data form — client code is written in `cs`...` — so
// the bundler expands it rather than carrying it: run once against one opaque
// hole per parameter, and what it answered is what crosses.
//
// Nothing here is about components. A component is a function of one argument
// it reads fields off, which is why a tag written inside a script works at
// all.
it("splicedFunction", async (t) => {
  await snapshotCase(
    t,
    "splicedFunction",
    cs.lift((() => () => cs.splice((n: Client<number>) => n))()),
  );
});
