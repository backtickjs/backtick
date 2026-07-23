import { cs, type Client } from "@backtickjs/core";

// The recorded residual `undefined` door (PLAN.md Step 0): a host
// ascription smuggles `undefined` into a function's *return*, riding
// `undefined ≤ void` through the function arm's `ClientUnknown` return —
// so storing the function draws no error. The door admits the lying type,
// never a value: no script expression can construct `undefined`, and
// every position where the result could land still checks.
type Maybe = string | undefined;

const lying: Client<() => Maybe> = cs.lift(cs.const(() => "hi"));

export default cs.lift(cs.const((() => {
    const __cs_stored = cs.const(cs.splice((lying)));
    const __cs_caught = cs.const(cs.splice((lying))());
    return 1;
})()));
