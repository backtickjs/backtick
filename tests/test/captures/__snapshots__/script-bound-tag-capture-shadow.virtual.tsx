import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";

// A client component the host holds, and a binding of the same name an
// enclosing script holds. Scope decides: the nested script's `<Card>` is the
// captured function, and only the one outside every script binding it is the
// host's.
const Card = cs.lift((() => (__cs_props: {
    title: string;
}) => <h2>{__cs_props.title}</h2>)());

// Instantiated twice with different labels, so the enclosing script is
// polymorphic and its nested script's captures arrive through a thunk.
function labelled(label: Client<string>) {
  return cs.lift((() => {
    const __cs_Card = (__cs_props: {
        n: number;
    }) => <i>{cs.splice((label)) + __cs_props.n}</i>;
    return <p>{cs.splice(cs.lift((() => <__cs_Card n={1}/>)()))}</p>;
})());
}

it("scriptBoundTagCaptureShadow", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagCaptureShadow",
    cs.lift(((__cs_Card = cs.splice(Card)) => <div>{<__cs_Card title={"host"}/>}{cs.splice(labelled(cs.lift((() => "a")())))}{cs.splice(labelled(cs.lift((() => "b")())))}</div>)()),
  );
});

// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same
// name is the host's component.
it("scriptBoundTagScope", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagScope",
    cs.lift(((__cs_Card = cs.splice(Card)) => {
    const __cs_twice = (__cs_Card: (props: {
        n: number;
    }) => JSX.Element) => <div>{<__cs_Card n={1}/>}{<__cs_Card n={2}/>}</div>;
    return <section>{<__cs_Card title={"host"}/>}{__cs_twice((__cs_props: {
        n: number;
    }) => <i>{"row " + __cs_props.n}</i>)}</section>;
})()),
  );
});
