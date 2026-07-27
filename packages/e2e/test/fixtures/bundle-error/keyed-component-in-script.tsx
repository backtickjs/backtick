import { cs, Text } from "@backtickjs/core";
import type { Client, JSX } from "@backtickjs/core";

// A key on a component tag rides the reference that instantiates it, and in a
// script a tree is instantiated by a plain call, which has no field to carry
// one. Refused rather than dropped silently: a key that vanished would leave
// siblings paired by position with no sign anything was lost.
//
// An element is the other case and stays legal here — it keeps its key in its
// own node, so `large-data.tsx` can splice one into a `map` and every instance
// the script produces keeps a key.
async function Row() {
  return <Text>x</Text>;
}

const row = <Row key="k" />;

const script: Client<() => JSX.Element> = cs`() => $row`;
export default script;
