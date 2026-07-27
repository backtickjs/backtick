import { cs, state, Text } from "@backtickjs/core";

// A cell's initial is data its owning entry carries, evaluated before any
// instance exists — so it can't read another cell.
async function Owner() {
  const inner = state(1);
  const outer = state(inner);
  return <Text style={{ fontSize: cs`$outer.read().read()` }}>press</Text>;
}

export default <Owner />;
