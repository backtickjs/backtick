import { cs } from "@backtickjs/core";
import type { Client, Prop } from "@backtickjs/core";

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
    return cs.const(<p>{cs.lift(cs.splice(cs.lift(cs.const(<__cs_Card n={1}/>))) satisfies typeof cs.ClientUnknown)}</p>);
})());
}

export default cs.lift(cs.const(<div>{cs.lift(<Card title={cs.lift("host")}/>)}{cs.lift(cs.splice(labelled(cs.lift(cs.const("a")))) satisfies typeof cs.ClientUnknown)}{cs.lift(cs.splice(labelled(cs.lift(cs.const("b")))) satisfies typeof cs.ClientUnknown)}</div>));
