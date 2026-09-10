import { cs, state } from "@backtickjs/core";
import type { Prop } from "@backtickjs/core";
import { window } from "@backtickjs/web";

// A component whose whole drawing is a conditional on a cell of its own, which
// something writes once from outside the block.
//
// The fragment is what makes this work, and it is why a drawing answers with an
// element: a conditional standing at a block's root has nowhere to be watched,
// so `insert` reads it inside the computation it makes — and the write that
// answers the condition re-runs that computation, which is this component
// again, with a cell that has never been written and a timer that has never
// fired. Under `<>` the conditional is a child, and a child position owns a
// computation of its own.
//
// `builds` is the page's, so it survives a rebuild and counts them. It also
// ends one: once it stops saying yes, nothing is written and nothing runs
// again. Without that, this fixture does not stop.
async function Held({ again }: { again: Prop<() => boolean> }) {
  return cs.lift((() => {
    const __cs_shown = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(false));
    const __cs_started = cs.const(cs.receiver(cs.splice((window)) satisfies typeof cs.ClientUnknown).setTimeout(() => {
        if ((cs.condition((cs.splice((again)) satisfies typeof cs.ClientUnknown)()) && (cs.splice((again)) satisfies typeof cs.ClientUnknown)())) {
            cs.statement(cs.receiver(__cs_shown).write(true));
        }
    }, 0));
    return cs.const(<>{cs.lift((cs.condition(cs.receiver(__cs_shown).read()) && cs.receiver(__cs_shown).read()) ? <em>shown</em> : <i>waiting</i>)}</>);
})());
}

export default cs.lift((() => {
    const __cs_builds = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    return cs.const(<div>{cs.lift(<span>{cs.lift("builds " + cs.receiver(__cs_builds).read())}</span>)}{cs.lift(<section>{cs.lift(<Held again={cs.lift(() => {
        cs.statement(cs.receiver(__cs_builds).write(cs.receiver(__cs_builds).read() + 1));
        return cs.const(cs.receiver(__cs_builds).read() < 5);
    })}/>)}</section>)}</div>);
})());
