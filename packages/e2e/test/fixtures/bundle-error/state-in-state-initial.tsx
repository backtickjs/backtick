import { cs, state } from "@backtickjs/core";

// A cell's initial is data its owning entry carries, evaluated before any
// instance exists — so it can't read another cell.
async function Owner() {
  const inner = state(1);
  const outer = state(inner);
  return (
    <span style={cs`"font-size: " + $outer.read().read() + "px"`}>press</span>
  );
}

export default <Owner />;
