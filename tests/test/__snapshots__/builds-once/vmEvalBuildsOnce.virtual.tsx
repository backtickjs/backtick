import { bundler } from "@backtickjs/bundler";
import { cs, state, vm } from "@backtickjs/core";
import type { BacktickElement, Bundle, Prop } from "@backtickjs/core";
import { window } from "@backtickjs/web-sdk";

// A component that draws a bundle it is still waiting for.
//
// What this pins is that it is built once. `insert` reads what it was given
// inside the computation it makes, so a drawing that watches itself used to tie
// the two together: the answer arriving changed the drawing, which ran the
// expression that made it, which was this component again — new cells, and the
// wait started over.
//
// The condition stands under `<>`, where a child position watches it: at the
// block's root it would be read once, when the block ran.
//
// `asked` is the page's, so it survives a rebuild and counts them. It also ends
// one: once it stops answering, a write of `null` over `null` changes nothing
// and nothing runs again — a loop that would otherwise have no end.
async function Answer() {
  return cs.lift(cs.const(<em>{cs.lift("answered")}</em>));
}

const answer = await bundler.run(<Answer />);

async function Waiting({
  ask,
}: {
  ask: Prop<() => Bundle<BacktickElement> | null>;
}) {
  return cs.lift((() => {
    const __cs_drawn = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)<Bundle<BacktickElement> | null>(null));
    const __cs_started = cs.const(cs.receiver(cs.splice((window)) satisfies typeof cs.ClientUnknown).setTimeout(() => cs.receiver(__cs_drawn).write((cs.splice((ask)) satisfies typeof cs.ClientUnknown)()), 0));
    return cs.const(<>{cs.lift(cs.receiver(__cs_drawn).read() === null ? null : cs.receiver(cs.splice((vm)) satisfies typeof cs.ClientUnknown).eval(cs.receiver(__cs_drawn).read() as Bundle<BacktickElement>))}</>);
})());
}

const vmEvalBuildsOnce = cs.lift((() => {
    const __cs_asked = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    return cs.const(<div>{cs.lift(<span>{cs.lift("asked " + cs.receiver(__cs_asked).read())}</span>)}{cs.lift(<Waiting ask={cs.lift(() => {
        cs.statement(cs.receiver(__cs_asked).write(cs.receiver(__cs_asked).read() + 1));
        return cs.const(cs.receiver(__cs_asked).read() > 4 ? null : cs.splice((answer)) satisfies typeof cs.ClientUnknown);
    })}/>)}</div>);
})());
