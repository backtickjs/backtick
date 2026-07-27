import { cs, state, Text } from "@backtickjs/core";

// `update` derives the next value from the current one, so a handler needs no
// separate read. It returns `void` like `write`, which is what keeps it out of
// a value body: only a statement position accepts `void`.
async function Stepper() {
  const size = state(16);
  return (
    <Text
      style={{ fontSize: cs`$size.read()` }}
      onPress={cs`() => {
        $size.update((current: number) => current + 1);
      }`}
    >
      press
    </Text>
  );
}

export default <Stepper />;
