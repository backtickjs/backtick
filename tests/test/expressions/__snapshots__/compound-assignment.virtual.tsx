import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `x += y` assigns what `x + y` answers and answers it: a string concatenates
// as `+` does. The variable is read before the value is evaluated, so an
// assignment inside the value doesn't change what it adds to.
it("compoundAssignment", async (t) => {
  await snapshotCase(
    t,
    "compoundAssignment",
    cs.lift((() => {
    let __cs_n = 10;
    __cs_n += 5;
    __cs_n -= 3;
    __cs_n *= 2;
    __cs_n /= 4;
    __cs_n %= 4;
    let __cs_text = "a";
    __cs_text += "b";
    let __cs_total = 1;
    const __cs_answered = cs.const(__cs_total += 2);
    let __cs_x = 1;
    __cs_x += __cs_x = cs.const(5);
    return cs.const([__cs_n, __cs_text, __cs_answered, __cs_total, __cs_x]);
})()),
  );
});
