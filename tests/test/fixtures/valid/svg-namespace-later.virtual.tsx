import { cs, For, state } from "@backtickjs/core";

// Drawn after the first pass: a row the list adds on a write, and a `title` a
// condition shows, are SVG's because of where they stand, and the `title` after
// the `svg` is HTML's again.
export default cs.lift((() => {
    const __cs_xs = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)([10]));
    const __cs_shown = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(false));
    return cs.const(<div>{cs.lift(<svg viewBox={cs.lift("0 0 30 10")}>{cs.lift(<For each={cs.lift(cs.receiver(__cs_xs).read())}>{cs.lift((__cs_x: number) => <title>{cs.lift("dot " + __cs_x)}</title>)}</For>)}{cs.lift((cs.condition(cs.receiver(__cs_shown).read()) && cs.receiver(__cs_shown).read()) ? <title>{cs.lift("shown")}</title> : null)}</svg>)}{cs.lift(<title>{cs.lift("after")}</title>)}{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_xs).write([10, 20]))}>add</button>)}{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_shown).write(true))}>show</button>)}</div>);
})());
