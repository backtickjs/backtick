import { cs, type Client } from "@backtickjs/core";

// `null` written in the script itself — bare, compared against, and as an
// argument — as opposed to a spliced host `null` (see `runtime-values.ts`).
const orDash: Client<(value: string | null) => string> = cs.lift(cs.const((__cs_value: string | null) => {
    if (__cs_value === null) {
        return cs.const("-");
    }
    return cs.const(__cs_value);
}));

export default cs.lift(cs.const({ missing: cs.splice((orDash))(null), present: cs.splice((orDash))("hi"), bare: null }));
