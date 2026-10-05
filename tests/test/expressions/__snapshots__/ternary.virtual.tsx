import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `?:` evaluates only the taken branch, and its condition narrows like an
// `if`'s.
const pick = cs.lift((() => (__cs_n: number | null) => {
  return __cs_n === null ? 0 : __cs_n + 1;
})());

it("ternary", async (t) => {
  await snapshotCase(
    t,
    "ternary",
    cs.lift((() => ({
      absent: (cs.splice((pick)))(null),
      present: (cs.splice((pick)))(4),
    }))()),
  );
});
