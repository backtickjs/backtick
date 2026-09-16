import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `?:` tests a boolean — no truthiness — evaluates only the taken branch,
// and its condition narrows like an `if`'s.
const pick = cs.lift(cs.const((__cs_n: number | null) => {
    return cs.const(__cs_n === null ? 0 : __cs_n + 1);
}));

it("ternary", async (t) => {
  await snapshotCase(
    t,
    "ternary",
    cs.lift(cs.const({ absent: (cs.splice((pick)) satisfies typeof cs.ClientUnknown)(null), present: (cs.splice((pick)) satisfies typeof cs.ClientUnknown)(4) })),
  );
});
