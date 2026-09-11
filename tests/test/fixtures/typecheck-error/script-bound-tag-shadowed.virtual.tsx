import { cs } from "@backtickjs/core";

// The script between them binds `Badge` to a number, and the nearest binding is
// the one a tag names: the innermost `<Badge />` calls a number.
export default cs.lift((() => {
    const __cs_Badge = cs.const((__cs_p: {
        n: number;
    }) => <b>{cs.lift("n " + cs.receiver(__cs_p).n)}</b>);
    return cs.const(cs.splice(cs.lift((() => {
    const __cs_Badge = cs.const(5);
    return cs.const(cs.splice(cs.lift(cs.const(<__cs_Badge n={1}/>))) satisfies typeof cs.ClientUnknown);
})())) satisfies typeof cs.ClientUnknown);
})());
