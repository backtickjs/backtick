import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Arrays expose the curated `ClientArray` API: pure members only, none
// producing `undefined`. Callback parameters are contextually typed.
it("arrayMembers", async (t) => {
  await snapshotCase(
    t,
    "arrayMembers",
    cs.lift((() => {
    const __cs_coins = cs.const([1, 2, 3]);
    const __cs_four = cs.const(4);
    return cs.const({ count: __cs_coins.length, all: __cs_coins.concat([__cs_four]), part: __cs_coins.slice(0, 2), where: __cs_coins.indexOf(2), lastWhere: __cs_coins.concat([2]).lastIndexOf(2), has: __cs_coins.includes(3), text: __cs_coins.join("-"), doubled: __cs_coins.map(__cs_n => __cs_n * 2), small: __cs_coins.filter(__cs_n => __cs_n < 3) });
})()),
  );
});
