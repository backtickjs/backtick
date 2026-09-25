import { it } from "node:test";
import { cs } from "@backtickjs/core";
import type { Prop } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A host binding a script both writes as a tag and splices as `$Card`. They are
// two parameters: the tag is handed over as its value and the splice is called,
// so neither use changes how the other compiles.
function Card(props: { readonly title: Prop<string> }) {
  return <h2>{props.title}</h2>;
}

it("scriptComponentSpliced", async (t) => {
  await snapshotCase(
    t,
    "scriptComponentSpliced",
    cs.lift((() => {
    const __cs_Heading = (cs.splice((Card)) satisfies typeof cs.ClientUnknown);
    return <div>{cs.lift(<Card title={cs.lift("tag")}/>)}{cs.lift(<__cs_Heading title={"splice"}/>)}</div>;
})()),
  );
});
