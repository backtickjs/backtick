import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Any value may be asked about, and only an array answers true: a string has
// a length and indexes, and is still not one.
it("arrayIsArray", async (t) => {
  await snapshotCase(
    t,
    "arrayIsArray",
    cs.lift((() => {
    return cs.const([cs.receiver(Array).isArray([]), cs.receiver(Array).isArray([1, 2]), cs.receiver(Array).isArray("ab"), cs.receiver(Array).isArray({ length: 0 }), cs.receiver(Array).isArray(null)]);
})()),
  );
});
