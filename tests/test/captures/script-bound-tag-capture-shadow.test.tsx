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
  return cs`{
    const Card = (props: { n: number }) => <i>{$label + props.n}</i>;
    return <p>{${cs`<Card n={1} />`}}</p>;
  }`;
}

it("scriptBoundTagCaptureShadow", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagCaptureShadow",
    cs`<div>
      <Card title="host" />
      {${labelled(cs`"a"`)}}
      {${labelled(cs`"b"`)}}
    </div>`,
  );
});

// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same
// name is the host's component, spliced as before.
it("scriptBoundTagScope", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagScope",
    cs`{
      const twice = (Card: (props: { n: number }) => BacktickElement) => (
        <div>
          <Card n={1} />
          <Card n={2} />
        </div>
      );

      return (
        <section>
          <Card title="host" />
          {twice((props: { n: number }) => (
            <i>{"row " + props.n}</i>
          ))}
        </section>
      );
    }`,
  );
});
