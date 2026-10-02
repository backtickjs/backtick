import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A splice prints as an expression ending in a type, and a `<` after a type is
// where type arguments start — so a spliced value to the left of `<` is the
// one place the virtual file could stop being the program it stands for.
const low = 3;
const high = 9;

it("splicedComparison", async (t) => {
  await snapshotCase(
    t,
    "splicedComparison",
    cs.lift((() => ({ under: cs.splice((low)) < cs.splice((high)), atMost: cs.splice((low)) <= cs.splice((high)), over: cs.splice((high)) > cs.splice((low)), between: cs.splice((low)) < cs.splice((high)) && cs.splice((high)) > cs.splice((low)) }))()),
  );
});
