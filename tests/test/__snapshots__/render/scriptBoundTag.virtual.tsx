import { bundler } from "@backtickjs/bundler";
import { cs, state, vm } from "@backtickjs/core";

// A tag naming a function the script holds — here a bundle that takes props,
// evaluated. It is called with its props read on access, the way a component's
// are, so `count` follows the cell without the badge being drawn again.
const badge = await bundler.run(
  cs.lift(cs.const((__cs_props: {
    count: number;
}) => <b>{cs.lift("count " + cs.receiver(__cs_props).count)}</b>)),
);

const scriptBoundTag = cs.lift((() => {
    const __cs_count = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    const __cs_Badge = cs.const(cs.receiver(cs.splice((vm)) satisfies typeof cs.ClientUnknown).eval(cs.splice((badge)) satisfies typeof cs.ClientUnknown));
    return cs.const(<div>{cs.lift(<__cs_Badge count={cs.receiver(__cs_count).read()}/>)}{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_count).write(cs.receiver(__cs_count).read() + 1))}>more</button>)}</div>);
})());
