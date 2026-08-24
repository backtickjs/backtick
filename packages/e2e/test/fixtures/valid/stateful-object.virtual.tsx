import { cs, state } from "@backtickjs/core";

// An object with storage of its own, made by a client function: `state` holds
// what it is, arrows are what may be done to it, and the object hands them over
// together. Reading is a value, so it stands in a children position; writing is
// an action, so it stands in a handler.
const counter = cs.lift(cs.const((__cs_initial: number) => {
    const __cs_count = cs.const(cs.splice((state))(__cs_initial));
    return cs.const({ read: () => cs.receiver(__cs_count).read(), add: (__cs_n: number) => {
            cs.statement(cs.receiver(__cs_count).write(cs.receiver(__cs_count).read() + __cs_n));
        } });
}));

export default cs.lift((() => {
    const __cs_c = cs.const(cs.splice((counter))(10));
    return cs.const(<button onclick={cs.lift(() => {
        cs.statement(cs.receiver(__cs_c).add(5));
    })}>{cs.lift(cs.receiver(__cs_c).read())}</button>);
})());
