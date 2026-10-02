import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Text in, value out, and back again. What round-trips is the format's to say
// — so what is here is what every host spells the same way, and a value a
// host could not hand back is not a value this admits.
it("jsonRoundTrip", async (t) => {
  await snapshotCase(
    t,
    "jsonRoundTrip",
    cs.lift((() => {
    const __cs_numbers = cs.globalThis.JSON.stringify([1, 2, 3]);
    const __cs_text = cs.globalThis.JSON.stringify("hi");
    const __cs_flag = cs.globalThis.JSON.stringify(true);
    const __cs_held = cs.globalThis.JSON.stringify({ a: 1, b: "two" });
    const __cs_back = cs.globalThis.JSON.parse(__cs_numbers);
    return (__cs_numbers + "|" + __cs_text + "|" + __cs_flag + "|" + __cs_held + "|" + cs.globalThis.JSON.stringify(__cs_back) + "|" + cs.globalThis.JSON.stringify(cs.globalThis.JSON.parse(__cs_held)));
})()),
  );
});
