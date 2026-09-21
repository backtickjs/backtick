import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// An object's values in key order, and whether it holds a key: the check a
// script would otherwise write as `Object.keys(o).includes(k)`.
it("objectValues", async (t) => {
  await snapshotCase(
    t,
    "objectValues",
    cs.lift((() => {
    const __cs_prices = cs.const({ apple: 1, pear: 2 });
    return cs.const({ values: cs.receiver(Object).values(__cs_prices), holds: [cs.receiver(Object).hasOwn(__cs_prices, "pear"), cs.receiver(Object).hasOwn(__cs_prices, "plum")] });
})()),
  );
});
