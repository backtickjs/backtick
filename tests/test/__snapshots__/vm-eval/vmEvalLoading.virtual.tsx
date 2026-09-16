import { cs, state, vm } from "@backtickjs/core";
import type { BacktickElement, Bundle } from "@backtickjs/core";

// A bundle a page does not have yet, and what stands in until it does.
//
// Both reads are where they stand, inside the drawing: that is what makes the
// condition follow the cell. Reading it once into a `const` would narrow the
// type and freeze the drawing — the script body runs once, so the loading state
// would never resolve. So the second read is asserted instead, which the
// condition beside it is what makes true.
const vmEvalLoading = cs.lift((() => {
    const __cs_held = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)<Bundle<BacktickElement> | null>(null));
    return cs.const(<div>{cs.lift(cs.receiver(__cs_held).read() === null ? <span>loading…</span> : cs.receiver(cs.splice((vm)) satisfies typeof cs.ClientUnknown).eval(cs.receiver(__cs_held).read() as Bundle<BacktickElement>))}</div>);
})());
