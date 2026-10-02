import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A namespace holding a value beside its functions: `Number.EPSILON` is read
// where `Number.isInteger` is called, and both are whole names the client
// answers rather than a member read off a `Number` there is no value for.
async function Checked() {
  return cs.lift((() => {
    const __cs_positive = cs.globalThis.Number.EPSILON > 0;
    const __cs_largest = cs.globalThis.Number.MAX_VALUE > 1e+308;
    const __cs_safe = cs.globalThis.Number.MAX_SAFE_INTEGER === 9007199254740991 && cs.globalThis.Number.MIN_SAFE_INTEGER === -9007199254740991 && cs.globalThis.Number.MIN_VALUE > 0 && cs.globalThis.Number.isSafeInteger(3) && !cs.globalThis.Number.isSafeInteger(cs.globalThis.Number.MAX_SAFE_INTEGER + 1);
    const __cs_whole = cs.globalThis.Number.isInteger(2);
    const __cs_fractional = cs.globalThis.Number.isInteger(2.5);
    // Unconverted, so a string that reads as a number is still not one.
    const __cs_written = cs.globalThis.Number.isFinite("2");
    return (<span>{__cs_whole + " " + __cs_fractional + " " + __cs_written + " " + __cs_positive + " " + __cs_largest + " " + __cs_safe}</span>);
})());
}

it("Checked", async (t) => {
  await snapshotCase(t, "Checked", <Checked />);
});
