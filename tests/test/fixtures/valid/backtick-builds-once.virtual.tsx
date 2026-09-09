import { bundler } from "@backtickjs/bundler";
import { cs, state } from "@backtickjs/core";
import type { Prop } from "@backtickjs/core";
import { window } from "@backtickjs/web-schema";

// A component that draws a bundle it is still waiting for.
//
// What this pins is that it is built once. `insert` reads what it was given
// inside the computation it makes, so a drawing that watches itself used to tie
// the two together: the answer arriving changed the drawing, which ran the
// expression that made it, which was this component again — new cells, and the
// wait started over.
//
// `asked` is the page's, so it survives a rebuild and counts them. It also ends
// one: once it stops answering, a write of `""` over `""` changes nothing and
// nothing runs again — a loop that would otherwise have no end.
async function Answer() {
  return cs.lift(cs.const(<em>{cs.lift("answered")}</em>));
}

const answer = JSON.stringify(await bundler.run(<Answer />));

async function Waiting({ ask }: { ask: Prop<() => string> }) {
  return cs.lift((() => {
    const __cs_drawn = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(""));
    const __cs_started = cs.const(cs.receiver(cs.splice((window)) satisfies import("@backtickjs/core").ClientUnknown).setTimeout(() => cs.receiver(__cs_drawn).write((cs.splice((ask)) satisfies import("@backtickjs/core").ClientUnknown)()), 0));
    return cs.const(<backtick bundle={cs.lift(cs.receiver(__cs_drawn).read())}/>);
})());
}

export default cs.lift((() => {
    const __cs_asked = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(0));
    return cs.const(<div>{cs.lift(<span>{cs.lift("asked " + cs.receiver(__cs_asked).read())}</span>)}{cs.lift(<Waiting ask={cs.lift(() => {
        cs.statement(cs.receiver(__cs_asked).write(cs.receiver(__cs_asked).read() + 1));
        return cs.const(cs.receiver(__cs_asked).read() > 4 ? "" : cs.splice((answer)) satisfies import("@backtickjs/core").ClientUnknown);
    })}/>)}</div>);
})());
