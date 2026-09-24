import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Prop } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A component tag written inside a client script. `Card` is a name no scope in
// the script binds, so it splices as the host binding, and what a splice holds
// that is a function is its expansion: the component run once against one
// opaque hole for the argument it takes, with a field read off that hole
// wherever it read a prop. The tag is a call of it.
//
// Each prop goes as a thunk and the drawing calls it where it reads it, which
// is what keeps a prop a prop: an argument is evaluated once where it is
// passed, and a prop has to be re-read whenever what it names changes.
async function Card(props: { readonly title: Prop<string> }) {
  return <h2>{props.title}</h2>;
}

async function Badge() {
  return <span>new</span>;
}

it("scriptComponent", async (t) => {
  await snapshotCase(
    t,
    "scriptComponent",
    cs.lift((() => {
    return <div>{cs.lift(<Card title={cs.lift("totals")}/>)}{cs.lift(<Badge />)}</div>;
})()),
  );
});
