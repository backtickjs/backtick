import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// An object's values in key order, and whether it holds a key: the check a
// script would otherwise write as `Object.keys(o).includes(k)`.
it("objectValues", async (t) => {
  await snapshotCase(
    t,
    "objectValues",
    cs`{
      const prices = { apple: 1, pear: 2 };
      return {
        values: Object.values(prices),
        holds: [Object.hasOwn(prices, "pear"), Object.hasOwn(prices, "plum")],
      };
    }`,
  );
});
