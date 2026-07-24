import { type Client, cs, View, Text } from "@backtickjs/core";

// One script body (one source location) instantiated with different splices —
// the JSX analogue of the `splice-sharing` fixture. The entry takes a thunk
// parameter, and each `onPress`'s `#call` passes its own splice as a `#thunk`.
function make(n: number): Client<() => number> {
  return cs`() => $n`;
}

export default (
  <View>
    <Text onPress={make(1)} />
    <Text onPress={make(2)} />
  </View>
);
