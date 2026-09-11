import { cs } from "@backtickjs/core";
import type { BacktickElement } from "@backtickjs/core";

// A tag naming a parameter of an arrow in the enclosing script. The nested
// scripts sit inside the arrow's body, so the parameter reaches them through
// the holes they fill rather than as a capture of the whole script.
export default cs.lift((() => {
    const __cs_twice = cs.const((__cs_Row: (p: {
        n: number;
    }) => BacktickElement) => <ul>{cs.lift(cs.splice(cs.lift(cs.const(<__cs_Row n={1}/>))) satisfies typeof cs.ClientUnknown)}{cs.lift(cs.splice(cs.lift(cs.const(<__cs_Row n={2}/>))) satisfies typeof cs.ClientUnknown)}</ul>);
    return cs.const(__cs_twice((__cs_p: {
        n: number;
    }) => <li>{cs.lift("row " + cs.receiver(__cs_p).n)}</li>));
})());
