import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Prop } from "@backtickjs/solid-js/jsx-runtime";
import { snapshotCase } from "../snapshotCase.ts";

// A component spliced as a value, then used as a tag under the script's own
// name for it. It is expanded like any host function: against a hole standing
// for its props, so `props.title` is read where the drawing reads it.
function Card(props: { readonly title: Prop<string> }) {
  return <h2>{props.title}</h2>;
}

it("splicedComponent", async (t) => {
  await snapshotCase(
    t,
    "splicedComponent",
    cs.lift((() => {
    const __cs_Heading = cs.splice((Card));
    return <__cs_Heading title={"tag"}/>;
})()),
  );
});

// Spliced in two scripts, it is still one declaration: both name `$expn0`.
it("splicedComponentTwice", async (t) => {
  await snapshotCase(
    t,
    "splicedComponentTwice",
    cs.lift(<div>{cs.lift(cs.splice(cs.lift((() => {
    const __cs_Heading = cs.splice((Card));
    return <__cs_Heading title={"first"}/>;
})())))}{cs.lift(cs.splice(cs.lift((() => {
    const __cs_Heading = cs.splice((Card));
    return <__cs_Heading title={"second"}/>;
})())))}</div>),
  );
});
