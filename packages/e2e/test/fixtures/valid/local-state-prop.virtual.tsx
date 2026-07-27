import { cs, state, Text, View } from "@backtickjs/core";
import type { Client, State } from "@backtickjs/core";

// A cell crossing a component boundary: declared once by the parent, handed to
// each child as a prop, so both read one storage. Ownership follows the
// declaration rather than the readers, so `Panel`'s entry declares the cell and
// each `Counter` receives the handle as a slot — which is what makes a write
// through either child reach the same storage.
const Counter = async ({ size }: { size: Client<State<number>> }) => (
  <Text
    style={{ fontSize: cs.lift(cs.const(cs.receiver(cs.splice((size))).read())) }}
    onPress={cs.lift(cs.const(() => {
    cs.statement(cs.receiver(cs.splice((size))).write(cs.receiver(cs.splice((size))).read() + 1));
}))}
  >
    press
  </Text>
);

async function Panel() {
  const size = state(16);
  return (
    <View>
      <Counter size={size} />
      <Counter size={size} />
    </View>
  );
}

export default <Panel />;
