import { cs, Pressable, state, Text } from "@backtickjs/core";

// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  const count = state(0);
  return (
    <Pressable
      testID="row"
      style={{ flexDirection: "row", gap: 8 }}
      onPress={cs`() => $count.write($count.read() + 1)`}
    >
      <Text style={{ fontWeight: "700" }}>
        {cs`$count.read() > 0 ? "☑" : "☐"`}
      </Text>
      <Text>{cs`"pressed " + $count.read() + " times"`}</Text>
    </Pressable>
  );
}

export default <Row />;
