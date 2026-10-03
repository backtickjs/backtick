import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A binding declared in an enclosing script and captured by a script spliced
// into it: the spliced script is handed `x` where it is called.
const script = cs.lift((() => () => {
  const __cs_x = 1;
  return cs.splice(cs.lift((() => <span onclick={() => __cs_x} />)()));
})());

it("jsxCapture", async (t) => {
  await snapshotCase(t, "jsxCapture", script);
});
