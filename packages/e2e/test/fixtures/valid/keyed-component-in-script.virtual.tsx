import { cs, Text } from "@backtickjs/core";
import type { Client, JSX } from "@backtickjs/core";

// A key on a component tag rides the reference that instantiates it. A script
// instantiates a tree by applying it, and an apply carries a key — so a row a
// script builds says which of its siblings it is, exactly as one written in
// tree position does.
//
// An element is the other case and was always legal — it keeps its key in its
// own node, so `large-data.tsx` can splice one into a `map` and every instance
// the script produces keeps a key.
async function Row() {
  return <Text>x</Text>;
}

const row = <Row key="k" />;

const script: Client<() => JSX.Element> = cs.lift(cs.const(() => cs.splice((row))));
export default script;
