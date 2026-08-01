import { cs, state, Text, View } from "@backtickjs/core";
import type { Client, State } from "@backtickjs/core";

// A child reading a cell it was handed, in all three positions at once: a prop,
// a text child, and a branch deciding which elements exist. `Panel` owns the
// cell and never reads it, so a write re-renders `Panel` and reaches each `Row`
// with the arguments it already had — the same handle object, the same id.
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
  <View>
    <Text style={{ fontSize: cs`$selected.read() === $id ? 20 : 16` }}>
      {cs`"row " + $id + " of " + $selected.read()`}
    </Text>
    {cs`$selected.read() === $id ? [${(<Text>marker</Text>)}] : []`}
  </View>
);

async function Panel() {
  const selected = state(0);
  return (
    <View>
      <Text onPress={cs`() => $selected.write(1)`}>select</Text>
      <Row id={cs`0`} selected={selected} />
      <Row id={cs`1`} selected={selected} />
    </View>
  );
}

export default <Panel />;
