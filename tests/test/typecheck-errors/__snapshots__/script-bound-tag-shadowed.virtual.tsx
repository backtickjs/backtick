import { cs } from "@backtickjs/core";

// The script between them binds `Badge` to a number, and the nearest binding is
// the one a tag names: the innermost `<Badge />` calls a number.
export default cs.lift((() => {
    const __cs_Badge = (__cs_p: {
        n: number;
    }) => <b>{cs.lift("n " + __cs_p.n)}</b>;
    return (cs.splice(cs.lift((() => {
    const __cs_Badge = 5;
    // @ts-expect-error: JSX element type 'Badge' does not have any construct or call signatures.
    return (cs.splice(cs.lift(<__cs_Badge n={1}/>)) satisfies typeof cs.ClientUnknown);
})())) satisfies typeof cs.ClientUnknown);
})());
