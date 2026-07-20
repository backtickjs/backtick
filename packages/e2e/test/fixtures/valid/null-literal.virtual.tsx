import { cs, type Client } from "@backtickjs/core";

// `null` written in the script itself — bare, compared against, and as an
// argument — as opposed to a spliced host `null` (see `runtime-values.ts`).
const orDash: Client<(value: string | null) => string> = cs.liftValue((__cs_value: string | null) => {
    if (__cs_value === null) {
        return "-";
    }
    return __cs_value;
});

export default cs.liftValue({ missing: cs.spliceValue((orDash))(null), present: cs.spliceValue((orDash))("hi"), bare: null });
