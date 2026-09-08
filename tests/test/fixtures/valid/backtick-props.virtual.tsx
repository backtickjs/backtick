import { bundler } from "@backtickjs/bundler";
import { cs, state } from "@backtickjs/core";
import type { Prop } from "@backtickjs/core";

// Two bundles written elsewhere, each a function of what it is handed — which
// is what a bundle that takes props is, and drawing one is calling it.
//
// Both read a member plainly, and both stay right after a write: a member is
// read where the drawing reads it, the same as a prop on a component. Nothing
// here is written as a thunk, and the second is handed a cell's read.
//
// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice.
async function Greets({ who }: { who: Prop<string> }) {
  return cs.lift(cs.const(<em>{cs.lift("hello " + (cs.splice((who)) satisfies import("@backtickjs/core").ClientUnknown))}</em>));
}

async function Counts({ count }: { count: Prop<number> }) {
  return cs.lift(cs.const(<b>{cs.lift("count " + (cs.splice((count)) satisfies import("@backtickjs/core").ClientUnknown))}</b>));
}

const greets = JSON.stringify(
  await bundler.run(cs.lift(cs.const((__cs_props: {
    who: string;
}) => cs.splice((
    <Greets who={cs.lift(cs.const(cs.receiver(__cs_props).who))} />
  )) satisfies import("@backtickjs/core").ClientUnknown))),
);

const counts = JSON.stringify(
  await bundler.run(cs.lift(cs.const((__cs_props: {
    count: number;
}) => cs.splice((
    <Counts count={cs.lift(cs.const(cs.receiver(__cs_props).count))} />
  )) satisfies import("@backtickjs/core").ClientUnknown))),
);

export default cs.lift((() => {
    const __cs_count = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(0));
    return cs.const(<div>{cs.lift(<backtick bundle={cs.lift(cs.splice((greets)) satisfies import("@backtickjs/core").ClientUnknown)} props={cs.lift({ who: "world" })}/>)}{cs.lift(<backtick bundle={cs.lift(cs.splice((counts)) satisfies import("@backtickjs/core").ClientUnknown)} props={cs.lift({ count: cs.receiver(__cs_count).read() })}/>)}{cs.lift(<button onclick={cs.lift(() => cs.receiver(__cs_count).write(cs.receiver(__cs_count).read() + 1))}>more</button>)}</div>);
})());
