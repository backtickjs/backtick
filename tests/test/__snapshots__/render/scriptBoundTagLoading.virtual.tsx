import { bundler } from "@backtickjs/bundler";
import { cs, state, vm } from "@backtickjs/core";
import type { BacktickElement, Bundle } from "@backtickjs/core";

// A function the script holds that draws a bundle it is still waiting for.
//
// Read inside the drawing, so the condition follows the cell: when the bundle
// arrives the child runs again and calls `Badge`, and `count` stays a prop the
// badge reads on access rather than a value handed over once.
const loadedBadge = await bundler.run(
  cs.lift(cs.const((__cs_props: {
    count: number;
}) => <b>{cs.lift("count " + cs.receiver(__cs_props).count)}</b>)),
);

const scriptBoundTagLoading = cs.lift((() => {
    const __cs_count = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    const __cs_drawn = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)<Bundle<(props: {
        count: number;
    }) => BacktickElement> | null>(null));
    const __cs_Badge = cs.const((__cs_props: {
        count: number;
    }) => {
        const __cs_held = cs.const(cs.receiver(__cs_drawn).read());
        return cs.const(__cs_held === null ? null : cs.receiver(cs.splice((vm)) satisfies typeof cs.ClientUnknown).eval(__cs_held)(__cs_props));
    });
    return cs.const(<div>{cs.lift(cs.receiver(__cs_drawn).read() === null ? <i>loading</i> : <__cs_Badge count={cs.receiver(__cs_count).read()}/>)}{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_drawn).write(cs.splice((loadedBadge)) satisfies typeof cs.ClientUnknown))}>load</button>)}{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_count).write(cs.receiver(__cs_count).read() + 1))}>more</button>)}</div>);
})());
