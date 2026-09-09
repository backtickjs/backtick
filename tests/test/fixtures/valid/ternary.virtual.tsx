import { cs } from "@backtickjs/core";

// `?:` tests a boolean — no truthiness — evaluates only the taken branch,
// and its condition narrows like an `if`'s.
const pick = cs.lift(cs.const((__cs_n: number | null) => {
    return cs.const(__cs_n === null ? 0 : __cs_n + 1);
}));

export default cs.lift(cs.const({ absent: (cs.splice((pick)) satisfies typeof cs.ClientUnknown)(null), present: (cs.splice((pick)) satisfies typeof cs.ClientUnknown)(4) }));
