import { cs, state, Text, View } from "@backtickjs/core";

// State belongs to the component that declared it. `Counter` calls `state`
// once per invocation, so two `<Counter />` tags are two cells — and each
// invocation is its own tree entry, so neither depends on how many places
// reference an element.
async function Counter() {
  const size = state(16);
  return (
    <Text
      style={{ fontSize: cs.lift(cs.const(cs.receiver(cs.splice((size))).read())) }}
      onPress={cs.lift(cs.const(() => {
    cs.statement(cs.receiver(cs.splice((size))).write(cs.receiver(cs.splice((size))).read() + 1));
}))}
    >
      press
    </Text>
  );
}

export default (
  <View>
    <Counter />
    <Counter />
  </View>
);
