import { cs, type Client } from "@backtickjs/core";

// A host helper reused with different splices makes its script polymorphic:
// the holes can't be inlined, so every call site passes its splice as a
// thunk and the body evaluates `$0()` at the hole. The thunk is what keeps
// the hole as lazy as an inlined splice: `guard(broken)(false)` never
// reaches its hole, so the broken fragment must never evaluate — passed
// eagerly (by value instead of by thunk) it would throw before `flag` was
// even tested.
function guard(fragment: Client<string>): Client<(flag: boolean) => string> {
  return cs.lift(cs.const((__cs_flag: boolean) => {
    if ((cs.condition(__cs_flag) && __cs_flag)) {
        return cs.const(cs.splice((fragment)) satisfies import("@backtickjs/core").ClientUnknown);
    }
    return cs.const("skipped");
}));
}

const ok = cs.lift(cs.const("evaluated"));
const broken = cs.lift((() => {
    throw "the guarded fragment must never evaluate";
})());

export default cs.lift(cs.const({ taken: (cs.splice(guard(ok)) satisfies import("@backtickjs/core").ClientUnknown)(true), skipped: (cs.splice(guard(broken)) satisfies import("@backtickjs/core").ClientUnknown)(false) }));
