import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// UTF-16 code units rather than code points: a surrogate pair is two
// arguments, where `String.fromCodePoint` takes the one code point.
async function Written() {
  return cs.lift((() => {
    return (<span>{cs.globalThis.String.fromCharCode(72, 105) + cs.globalThis.String.fromCharCode(55357, 56832)}</span>);
})());
}

it("Written", async (t) => {
  await snapshotCase(t, "Written", <Written />);
});
