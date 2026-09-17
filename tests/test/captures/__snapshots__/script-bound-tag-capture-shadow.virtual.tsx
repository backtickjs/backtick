import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { BacktickElement, Client, Prop } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A host component, and a binding of the same name an enclosing script holds.
// Scope decides: the nested script's `<Card>` is the captured function, and
// only the one outside every script binding it is the host's.
async function Card(props: { title: Prop<string> }) {
  return <h2>{props.title}</h2>;
}

// Instantiated twice with different labels, so the enclosing script is
// polymorphic and its nested script's captures arrive through a thunk.
function labelled(label: Client<string>) {
  return cs.lift((() => {
    const __cs_Card = cs.const((__cs_props: {
        n: number;
    }) => <i>{cs.lift((cs.splice((label)) satisfies typeof cs.ClientUnknown) + cs.receiver(__cs_props).n)}</i>);
    return cs.const(<p>{cs.lift((cs.splice(cs.lift(cs.const(<__cs_Card n={1}/>))) satisfies typeof cs.ClientUnknown))}</p>);
})());
}

it("scriptBoundTagCaptureShadow", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagCaptureShadow",
    cs.lift(cs.const(<div>{cs.lift(<Card title={cs.lift("host")}/>)}{cs.lift((cs.splice(labelled(cs.lift(cs.const("a")))) satisfies typeof cs.ClientUnknown))}{cs.lift((cs.splice(labelled(cs.lift(cs.const("b")))) satisfies typeof cs.ClientUnknown))}</div>)),
  );
});

// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same
// name is the host's component, spliced as before.
it("scriptBoundTagScope", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagScope",
    cs.lift((() => {
    const __cs_twice = cs.const((__cs_Card: (props: {
        n: number;
    }) => BacktickElement) => <div>{cs.lift(<__cs_Card n={1}/>)}{cs.lift(<__cs_Card n={2}/>)}</div>);
    return cs.const(<section>{cs.lift(<Card title={cs.lift("host")}/>)}{cs.lift(__cs_twice((__cs_props: {
        n: number;
    }) => <i>{cs.lift("row " + cs.receiver(__cs_props).n)}</i>))}</section>);
})()),
  );
});
