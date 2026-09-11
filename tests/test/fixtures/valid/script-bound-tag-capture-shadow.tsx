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
  return cs`{
    const Card = (props: { n: number }) => <i>{$label + props.n}</i>;
    return <p>{${cs`<Card n={1} />`}}</p>;
  }`;
}

export default cs`<div>
  <Card title="host" />
  {${labelled(cs`"a"`)}}
  {${labelled(cs`"b"`)}}
</div>`;
