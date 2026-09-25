import { cs, state } from "@backtickjs/core";

// A component may answer with a script, but the answer stands where a drawing
// would — so it is expanded in value position, and an action, which completes
// without returning, has nothing to draw.
async function Panel() {
  return cs.lift((() => {
    const __cs_n = cs.splice((state) satisfies typeof cs.Spliceable)(2);
    __cs_n.set(3);
})());
}

// @ts-expect-error: 'Panel' cannot be used as a JSX component.
export default <Panel />;
