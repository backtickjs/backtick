import { cs } from "@backtickjs/core";

// A non-boolean operand nested inside a checked condition pins two errors:
// the operand check on `count`, and the `keep` argument mismatch (the
// failed operand pollutes `count && count > 0` to `number | boolean`). The
// condition's bare duplicate contributes nothing: its mapping has
// verification off, dropping its copy of the argument mismatch, and it
// stays check-free — a duplicate that re-checked its operands would pin
// the `count` mismatch a second time.
export default cs.lift(cs.const((__cs_count: number) => {
    const __cs_keep = cs.const((__cs_on: boolean) => __cs_on);
    if ((cs.condition(__cs_keep((cs.condition(__cs_count) && __cs_count) && __cs_count > 0)) && __cs_keep(__cs_count && __cs_count > 0))) {
        return cs.const("kept");
    }
    return cs.const("dropped");
}));
