import { cs, state, Text, View } from "@backtickjs/core";

// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  const label = state("hi");

  // A handler written inline and one held under a name: both are client code,
  // and a handler prop takes `Client<() => void>` and nothing else.
  const row = cs`(size: number) => {
    const press = () => $label.write("held");
    return (
      <View style={{ padding: size }}>
        <Text
          style={{ fontSize: size }}
          onPress={() => $label.write("pressed")}
        >
          {$label.read()}
        </Text>
        <Text style={{ fontSize: 8 }}>fixed</Text>
        <Text style={{ fontSize: size }} onPress={press}>
          held
        </Text>
      </View>
    );
  }`;

  return <View style={{ padding: 0 }}>{cs`$row(12)`}</View>;
}

export default <Card />;
