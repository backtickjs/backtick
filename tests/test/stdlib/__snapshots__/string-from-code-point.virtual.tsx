import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A namespace static taking a rest parameter, so the whole of the call crosses
// as one name and a list of arguments — `String` is the front of the name and
// never a value read off. Called with none, which the schema says answers with
// the empty string rather than refusing the way an empty `Math.min` does.
async function Written() {
  return cs.lift((() => {
    return cs.const(<span>{cs.lift(cs.receiver(String).fromCodePoint(72, 105) + cs.receiver(String).fromCodePoint())}</span>);
})());
}

it("Written", async (t) => {
  await snapshotCase(t, "Written", <Written />);
});
