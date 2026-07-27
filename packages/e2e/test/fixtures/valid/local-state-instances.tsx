import { cs, state, Text, View } from "@backtickjs/core";

// State belongs to the component that declared it. `Counter` calls `state`
// once per invocation, so two `<Counter />` tags are two cells — and each
// invocation is its own tree entry, so neither depends on how many places
// reference an element.
async function Counter() {
  const size = state(16);
  return (
    <Text
      style={{ fontSize: cs`$size.read()` }}
      onPress={cs`() => {
        $size.write($size.read() + 1);
      }`}
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
