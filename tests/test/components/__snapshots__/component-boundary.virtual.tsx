import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A server component's invocation is an instance boundary, so it hoists into a
// tree entry of its own even though each `<TextLabel />` is referenced once and
// would otherwise inline into the `View`. The entry is what a per-instance cell
// will belong to, so it can't depend on how many places reference the element.
//
// The component leaves no named trace: the payload carries `Text`, never
// `TextLabel`.
async function TextLabel(props: { text: string }) {
  const text = props.text;
  return cs.lift((() => <span>{(cs.splice((text)))}</span>)());
}

it("componentBoundary", async (t) => {
  await snapshotCase(
    t,
    "componentBoundary",
    cs.lift((() => (
      <div>
        {(cs.splice((<TextLabel text="one" />)))}
        {(cs.splice((<TextLabel text="two" />)))}
      </div>
    ))()),
  );
});
