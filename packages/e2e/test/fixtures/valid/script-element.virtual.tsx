import { cs, state, Text, View } from "@backtickjs/core";

// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  const label = state("hi");

  // A handler written inline and one held under a name: both are client code,
  // and a handler prop takes `Client<() => void>` and nothing else.
  const row = cs.lift(cs.const((__cs_size: number) => {
    const __cs_press = cs.const(() => cs.receiver(cs.splice((label))).write("held"));
    return cs.const(<View style={cs.lift({ padding: __cs_size })}><Text style={cs.lift({ fontSize: __cs_size })} onPress={cs.lift(() => cs.receiver(cs.splice((label))).write("pressed"))}>{cs.receiver(cs.splice((label))).read()}</Text><Text style={cs.lift({ fontSize: 8 })}>fixed</Text><Text style={cs.lift({ fontSize: __cs_size })} onPress={cs.lift(__cs_press)}>
          held
        </Text></View>);
}));

  return <View style={{ padding: 0 }}>{cs.lift(cs.const(cs.splice((row))(12)))}</View>;
}

export default <Card />;
