import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";

// A component may answer with a script, but the answer stands where a drawing
// would — so it is expanded in value position, and an action, which completes
// without returning, has nothing to draw.
async function Panel() {
  return cs`{
    const n = $createSignal(2);
    n[1](3);
  }`;
}

// @ts-expect-error: 'Panel' cannot be used as a JSX component.
export default <Panel />;
