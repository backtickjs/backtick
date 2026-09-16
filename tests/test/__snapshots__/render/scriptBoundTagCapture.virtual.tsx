import { cs, For, state } from "@backtickjs/core";

// A tag naming a function an enclosing script holds. The nested script captures
// it the way it captures any binding, and calls it as a component: once, with
// its props read on access.
const scriptBoundTagCapture = cs.lift((() => {
    const __cs_count = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    const __cs_Badge = cs.const((__cs_props: {
        n: number;
    }) => <b>{cs.lift("n " + cs.receiver(__cs_props).n)}</b>);
    return cs.const(<div>{cs.lift(cs.splice(cs.lift(cs.const(<__cs_Badge n={cs.receiver(__cs_count).read()}/>))) satisfies typeof cs.ClientUnknown)}{cs.lift(cs.splice(cs.lift((() => {
    const __cs_skipped = cs.const(10);
    return cs.const(cs.splice(cs.lift(cs.const(<__cs_Badge n={cs.receiver(__cs_count).read() + 100}/>))) satisfies typeof cs.ClientUnknown);
})())) satisfies typeof cs.ClientUnknown)}{cs.lift(cs.splice((<section>{cs.lift(cs.const(<__cs_Badge n={cs.receiver(__cs_count).read() + 1000}/>))}</section>)) satisfies typeof cs.ClientUnknown)}{cs.lift(cs.splice(cs.lift(cs.const(<For each={cs.lift([1, 2])}>{cs.lift((__cs_m: number) => <__cs_Badge n={__cs_m * cs.receiver(__cs_count).read()}/>)}</For>))) satisfies typeof cs.ClientUnknown)}{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_count).write(cs.receiver(__cs_count).read() + 1))}>more</button>)}</div>);
})());
