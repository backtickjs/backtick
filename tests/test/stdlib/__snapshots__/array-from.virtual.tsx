import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// The one thing the language cannot do for itself: produce a sequence of a
// given length. Everything else about an array is a transformation of one
// that already exists.
//
// The mapper's first argument is always `undefined` — the standard library
// passes the element it found, and against a `{ length }` source there is
// none. `null` would mean the source held one and it was null.
it("arrayFrom", async (t) => {
  await snapshotCase(
    t,
    "arrayFrom",
    cs.lift((() => {
    const __cs_doubled = cs.const(Array.from({ length: 4 }, (__cs__, __cs_index) => __cs_index * 2));
    const __cs_empty = cs.const(Array.from({ length: 0 }, (__cs__, __cs_index) => __cs_index));
    const __cs_absent = cs.const(Array.from({ length: 2 }, (__cs_value, __cs_index) => __cs_value === undefined ? __cs_index : -cs.number(1)));
    return cs.const(__cs_doubled.join(",") + "|" + __cs_empty.length + "|" + __cs_absent.join(","));
})()),
  );
});
