import { cs, state, Text, View } from "@backtickjs/core";

// A screen with client state: the count lives on the client, so pressing
// re-renders without asking the server for anything.
export default async function App() {
  const count = state(0);
  return (
    <View style={{ gap: 8, padding: 24 }}>
      <Text style={{ fontSize: 24 }}>{cs`"Pressed " +
        $count.read() +
        " times"`}</Text>
      <Text
        testID="press"
        style={{ fontSize: 16, color: "royalblue" }}
        onPress={cs`() => $count.write($count.read() + 1)`}
      >
        Press me
      </Text>
    </View>
  );
}
