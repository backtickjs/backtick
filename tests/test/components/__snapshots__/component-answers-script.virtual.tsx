import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A component whose whole body is client code answers with the script rather
// than a drawing the host made: it declares its own storage and draws from it,
// and there is nothing left for the host to build.
//
// Expanded in value position, which is what admits it: a script that draws
// answers with what it drew, where an action answers with nothing and would
// draw nothing.
async function Panel() {
  return cs.lift((() => {
    const __cs_n = cs.splice((state) satisfies typeof cs.Spliceable)(2);
    return <em>{cs.lift(__cs_n.get())}</em>;
})());
}

it("componentAnswersScript", async (t) => {
  await snapshotCase(
    t,
    "componentAnswersScript",
    <div>
      <Panel />
    </div>,
  );
});
