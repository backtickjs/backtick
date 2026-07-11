import { cs, type Client } from "@backtickjs/core";

// A host helper reused with different splices makes its script polymorphic:
// the holes can't be inlined, so every call site passes its splice as a
// thunk and the body evaluates `$0()` at the hole. The thunk is what keeps
// the hole as lazy as an inlined splice: `guard(broken)(false)` never
// reaches its hole, so the broken fragment must never evaluate — passed
// eagerly (by value instead of by thunk) it would throw before `flag` was
// even tested.
function guard(fragment: Client<unknown>): Client<(flag: boolean) => unknown> {
  return cs.lift((__cs_flag: boolean) => {
    if (__cs_flag) {
        return cs.lower(fragment);
    }
    return "skipped";
});
}

const ok = cs.lift(__cs_JSON.parse("[1]"));
const broken = cs.lift(__cs_JSON.parse("{"));

export default cs.lift({ taken: cs.call(cs.lower(guard(ok)), [true]), skipped: cs.call(cs.lower(guard(broken)), [false]) });
