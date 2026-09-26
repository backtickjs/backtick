import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A whole name rather than a front, so the call crosses as the one name and
// its argument. What a query is built from: a reserved character, a space and a
// character past ASCII each come out percent-encoded, and a number is written
// as a string first. Decoding reads the same bytes back.
async function Encoded() {
  return cs.lift((() => {
    return <span>{cs.lift("/at?q=" + cs.globalThis.encodeURIComponent("a b+c&d#\u00E9") + "&page=" + cs.globalThis.encodeURIComponent(2.5) + " " + cs.globalThis.decodeURIComponent("a%20b%2Bc%26d%23%C3%A9"))}</span>;
})());
}

it("Encoded", async (t) => {
  await snapshotCase(t, "Encoded", <Encoded />);
});
