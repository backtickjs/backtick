import { cs, type Client } from "@backtickjs/core";

// A fragment written under one `base` is carried out by host code and spliced
// into a script written under a different `base`.
let carried: Client<number> | undefined;

const source = cs.lift((() => {
    const __cs_base = cs.const(1);
    return cs.const(cs.splice(((carried = cs.lift(cs.const(__cs_base))), carried)));
})());

function take(): Client<number> {
  if (carried === undefined) {
    throw new Error("source must be built first");
  }
  return carried;
}

export default cs.lift((() => {
    const __cs_base = cs.const(100);
    return cs.const(cs.splice((source)) + cs.splice(cs.lift(cs.const(__cs_base + cs.splice(take())))));
})());
