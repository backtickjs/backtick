import { cs } from "@backtickjs/core";
import { Fragment } from "@backtickjs/web-schema";

// `<Fragment>` written out inside a script, where `<>` is the shorthand. A
// fragment is a component — it answers with its children — so a tag naming one
// splices it and is a call of it, like any other component tag.
//
// The shorthand is not: the compiler reads an absent opening tag as a fragment
// and lowers it to its children, so nothing of it reaches the host at all.
export default cs.lift((() => {
    return cs.const(<div>{cs.lift(<Fragment>{cs.lift(<span>a</span>)}{cs.lift(<span>b</span>)}</Fragment>)}{cs.lift(<>{cs.lift(<em>c</em>)}</>)}</div>);
})());
