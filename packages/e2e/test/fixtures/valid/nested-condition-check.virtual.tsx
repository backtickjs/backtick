import { cs, type Client } from "@backtickjs/core";

// A checked condition containing its own tested positions: `keep(a && b)` is
// checked (a call), and inside it `a` and `b` are checked (identifiers). The
// check's trailing bare duplicate must stay check-free and suppressed — a
// duplicate that re-checked its operands would grow by a copy per nesting
// level and re-report every operand mismatch at a second virtual position —
// so the virtual code and mappings pin the duplicate staying bare.
const gate: Client<(a: boolean, b: boolean) => string> = cs.value((__cs_a: boolean, __cs_b: boolean) => {
    const __cs_keep = (__cs_on: boolean) => __cs_on;
    if ((cs.condition(__cs_keep((cs.condition(__cs_a) && __cs_a) && (cs.condition(__cs_b) && __cs_b))) && __cs_keep(__cs_a && __cs_b))) {
        return "kept";
    }
    return "dropped";
});

export default cs.value({ both: cs.splice((gate))(true, true), one: cs.splice((gate))(true, false) });
