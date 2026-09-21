import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A namespace holding a value beside its functions: `Number.EPSILON` is read
// where `Number.isInteger` is called, and both are whole names the client
// answers rather than a member read off a `Number` there is no value for.
async function Checked() {
  return cs.lift((() => {
    const __cs_positive = cs.const(cs.receiver(Number).EPSILON > 0);
    const __cs_largest = cs.const(cs.receiver(Number).MAX_VALUE > 1e+308);
    const __cs_safe = cs.const(cs.receiver(Number).MAX_SAFE_INTEGER === 9007199254740991 && cs.receiver(Number).MIN_SAFE_INTEGER === -cs.number(9007199254740991) && cs.receiver(Number).MIN_VALUE > 0 && (cs.condition(cs.receiver(Number).isSafeInteger(3)) && cs.receiver(Number).isSafeInteger(3)) && !(cs.condition(cs.receiver(Number).isSafeInteger(cs.receiver(Number).MAX_SAFE_INTEGER + 1)) && cs.receiver(Number).isSafeInteger(cs.receiver(Number).MAX_SAFE_INTEGER + 1)));
    const __cs_whole = cs.const(cs.receiver(Number).isInteger(2));
    const __cs_fractional = cs.const(cs.receiver(Number).isInteger(2.5));
    // Unconverted, so a string that reads as a number is still not one.
    const __cs_written = cs.const(cs.receiver(Number).isFinite("2"));
    return cs.const(<span>{cs.lift(__cs_whole + " " + __cs_fractional + " " + __cs_written + " " + __cs_positive + " " + __cs_largest + " " + __cs_safe)}</span>);
})());
}

it("Checked", async (t) => {
  await snapshotCase(t, "Checked", <Checked />);
});
