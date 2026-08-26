import { cs, state } from "@backtickjs/core";

// A cell holding a function holds the one it was built from, and no other.
//
// Every other initial widens, because `$state` takes it unbound and the call
// site decides the width the way TypeScript decides every other one — that is
// what `state-widening` pins. A function is where the two part: what an arrow
// answers with widens only against a contextual type, and an unbound parameter
// is not one. So `() => 0` stays a `() => 0`.
//
// The bound that would fix it is the one the schema no longer writes: it would
// pin every other initial instead, which is the worse half of the trade.
export default cs.lift((() => {
    const __cs_step = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(() => 0));
    cs.statement(cs.receiver(__cs_step).write(() => 1));
})());
