import { cs, state } from "@backtickjs/core";

// A component may answer with a script, but the answer stands where a drawing
// would — so it is expanded in value position, and an action, which completes
// without returning, has nothing to draw.
async function Panel() {
  return cs`{
    const n = $state(2);
    n.write(3);
  }`;
}

export default <Panel />;
