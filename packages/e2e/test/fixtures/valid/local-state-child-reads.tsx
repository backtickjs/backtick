import { cs } from "@backtickjs/core";
import type { Client, State } from "@backtickjs/core";

// A child reading a cell it was handed, in all three positions at once: a prop,
// a text child, and a branch deciding which elements exist. The script that
// declares the cell never reads it, so a write reaches each `Row` with the
// arguments it already had — the same handle object, the same id.
//
// Nothing a `Row` was given is different, and everything it draws is. Skipping
// on the arguments alone leaves both rows stale, which is the bug this pins: a
// handle is one object whatever its cell holds. The branch is the half no
// amount of recomputing a prop can answer for.
const Row = async ({
  id,
  selected,
}: {
  id: Client<number>;
  selected: Client<State<number>>;
}) => (
  <div>
    <span
      style={cs`"font-size: " + ($selected.read() === $id ? 20 : 16) + "px"`}
    >
      {cs`"row " + $id + " of " + $selected.read()`}
    </span>
    {cs`$selected.read() === $id ? ${(<span>marker</span>)} : null`}
  </div>
);

async function Panel() {
  return cs`{
    const selected = state(0);
    return (
      <div>
        <span onclick={() => selected.write(1)}>select</span>
        <Row id={0} selected={selected} />
        <Row id={1} selected={selected} />
      </div>
    );
  }`;
}

export default <Panel />;
