import { cs, state } from "@backtickjs/core";
import type { BacktickElement, Client, Prop } from "@backtickjs/core";

// A host component whose script declares its own `Badge`, and draws what it was
// handed beside it.
async function Panel(props: { body: Prop<BacktickElement> }) {
  return cs.lift((() => {
    const __cs_Badge = cs.const((__cs_p: {
        n: number;
    }) => <i>{cs.lift("panel " + cs.receiver(__cs_p).n)}</i>);
    return cs.const(<section>{cs.lift(<__cs_Badge n={0}/>)}{cs.lift(cs.receiver(cs.splice((props)) satisfies typeof cs.ClientUnknown).body)}</section>);
})());
}

// A script handed to `Panel` as a prop, naming a function the script around it
// holds. It lands inside `Panel`'s script, whose own `Badge` is in scope there
// — and still calls the one it was written under, since that is the binding it
// carries. The tag holds children too, read through the same record.
export default cs.lift((() => {
    const __cs_count = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    const __cs_Badge = cs.const((__cs_p: {
        n: number;
        children: BacktickElement;
    }) => <b>{cs.lift("outer " + cs.receiver(__cs_p).n)}{cs.lift(cs.receiver(__cs_p).children)}</b>);
    return cs.const(<div>{cs.lift(<Panel body={cs.lift(cs.splice(cs.lift(cs.const(<__cs_Badge n={cs.receiver(__cs_count).read()}>{<u>{cs.lift("kid " + cs.receiver(__cs_count).read())}</u>}</__cs_Badge>))) satisfies typeof cs.ClientUnknown)}/>)}{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_count).write(cs.receiver(__cs_count).read() + 1))}>more</button>)}</div>);
})());
