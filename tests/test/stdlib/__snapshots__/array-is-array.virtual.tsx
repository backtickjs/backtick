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
    return [Array.isArray([]), Array.isArray([1, 2]), Array.isArray("ab"), Array.isArray({ length: 0 }), Array.isArray(null)];
})()),
  );
});
