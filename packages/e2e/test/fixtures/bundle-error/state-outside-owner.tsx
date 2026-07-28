import { cs, state, Text, View, type Client } from "@backtickjs/core";

// A cell escaping the component that declared it, through host state rather
// than down through props.
//
// The reader's entry doesn't own the cell, so it doesn't resolve there — it
// threads outward as an ordinary slot, entry by entry, until it reaches the
// root, where there is no instance left to supply it. That is where it is
// caught, which is why the error names the root rather than the reader.
let escaped: Client<number> | null = null;

async function Declarer() {
  const count = state(0);
  escaped = cs`$count.read()`;
  return <Text>declarer</Text>;
}

async function Reader() {
  return <Text>{escaped}</Text>;
}

export default (
  <View>
    <Declarer />
    <Reader />
  </View>
);
