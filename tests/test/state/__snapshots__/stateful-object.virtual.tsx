import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// An object with storage of its own, made by a client function: `state` holds
// what it is, arrows are what may be done to it, and the object hands them over
// together. Reading is a value, so it stands in a children position; writing is
// an action, so it stands in a handler.
const counter = cs.lift(cs.const((__cs_initial: number) => {
    const __cs_count = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(__cs_initial));
    return cs.const({ get: () => cs.receiver(__cs_count).get(), add: (__cs_n: number) => {
            cs.statement(cs.receiver(__cs_count).set(cs.receiver(__cs_count).get() + __cs_n));
        } });
}));

it("statefulObject", async (t) => {
  await snapshotCase(
    t,
    "statefulObject",
    cs.lift((() => {
    const __cs_c = cs.const((cs.splice((counter)) satisfies typeof cs.ClientUnknown)(10));
    return cs.const(<button onclick={cs.lift(() => {
        cs.statement(cs.receiver(__cs_c).add(5));
    })}>{cs.lift(cs.receiver(__cs_c).get())}</button>);
})()),
  );
});
