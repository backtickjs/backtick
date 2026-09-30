import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// An action may sit in data like any script: it runs where the container is
// built, and its slot holds what it evaluated to, which is nothing.
const action = cs.lift((() => {
    const __cs_x = 1;
})());

it("actionInData", async (t) => {
  await snapshotCase(
    t,
    "actionInData",
    cs.lift((() => {
    const __cs_list = cs.splice([action] satisfies typeof cs.Spliceable);
    const __cs_map = cs.splice({ press: action } satisfies typeof cs.Spliceable);
    return __cs_list.length + cs.globalThis.Object.keys(__cs_map).length;
})()),
  );
});
