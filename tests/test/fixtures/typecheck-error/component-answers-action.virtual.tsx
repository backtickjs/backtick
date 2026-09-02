import { cs, state } from "@backtickjs/core";

// A component may answer with a script, but the answer stands where a drawing
// would — so it is expanded in value position, and an action, which completes
// without returning, has nothing to draw.
async function Panel() {
  return cs.lift((() => {
    const __cs_n = cs.const((cs.splice((state)) satisfies import("@backtickjs/core").ClientUnknown)(2));
    cs.statement(cs.receiver(__cs_n).write(3));
})());
}

export default <Panel />;
