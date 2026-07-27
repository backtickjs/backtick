import { cs, state, Text, View } from "@backtickjs/core";
import type { Client, State } from "@backtickjs/core";

// A cell reaching a nested element's key: `Panel` declares it and hands it
// down, so `Counter` receives it as a slot and the key reads it from there.
// The state-side companion to `nested-key-splice.tsx` — a cell threads through
// a key exactly as any other capture does, landing in `Counter`'s slot
// signature rather than as a `cell` node, since `Counter` doesn't own it.
const Counter = async ({ size }: { size: Client<State<number>> }) => (
  <View>
    <Text key={cs`$size.read()`}>press</Text>
  </View>
);

async function Panel() {
  const size = state(16);
  return <Counter size={size} />;
}

export default <Panel />;
