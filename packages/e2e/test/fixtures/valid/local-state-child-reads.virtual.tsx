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
    <Text style={{ fontSize: cs.lift(cs.const(cs.receiver(cs.splice((selected))).read() === cs.splice((id)) ? 20 : 16)) }}>
      {cs.lift(cs.const("row " + cs.splice((id)) + " of " + cs.receiver(cs.splice((selected))).read()))}
    </Text>
    {cs.lift(cs.const(cs.receiver(cs.splice((selected))).read() === cs.splice((id)) ? cs.splice((<Text>marker</Text>)) : null))}
  </View>
);

async function Panel() {
  const selected = state(0);
  return (
    <View>
      <Text onPress={cs.lift(cs.const(() => cs.receiver(cs.splice((selected))).write(1)))}>select</Text>
      <Row id={cs.lift(cs.const(0))} selected={selected} />
      <Row id={cs.lift(cs.const(1))} selected={selected} />
    </View>
  );
}

export default <Panel />;
