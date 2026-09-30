import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A host helper reused with different splices makes its script polymorphic:
// the holes can't be inlined, so every call site passes its splice as a
// thunk and the body evaluates `$splice0()` at the hole. The thunk is what keeps
// the hole as lazy as an inlined splice: `guard(broken)(false)` never
// reaches its hole, so the broken fragment must never evaluate — passed
// eagerly (by value instead of by thunk) it would throw before `flag` was
// even tested.
function guard(fragment: Client<string>): Client<(flag: boolean) => string> {
  return cs.lift((__cs_flag: boolean) => {
    if (__cs_flag) {
        return cs.splice((fragment));
    }
    return "skipped";
});
}

const ok = cs.lift("evaluated");

const broken = cs.lift((() => {
    throw "the guarded fragment must never evaluate";
})());

it("spliceLaziness", async (t) => {
  await snapshotCase(
    t,
    "spliceLaziness",
    cs.lift({ taken: cs.splice(guard(ok))(true), skipped: cs.splice(guard(broken))(false) }),
  );
});
