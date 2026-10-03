import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A namespace static, reached the way `Math.floor` and `Array.from` are: the
// whole of `Number.parseInt` is one name the client answers, so `Number` is a
// front rather than a value and nothing is read off it.
async function Parsed() {
  return cs.lift((() => {
    const __cs_whole = cs.globalThis.Number.parseInt("42px");
    const __cs_based = cs.globalThis.Number.parseInt("ff", 16);
    const __cs_fractional = cs.globalThis.Number.parseFloat("1.5");
    return <span>{__cs_whole + __cs_based + __cs_fractional + ""}</span>;
  })());
}

it("Parsed", async (t) => {
  await snapshotCase(t, "Parsed", <Parsed />);
});
