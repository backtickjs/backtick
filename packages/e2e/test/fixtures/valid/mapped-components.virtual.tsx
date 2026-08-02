import { Text, View } from "@backtickjs/core";

const items = ["alpha", "beta", "gamma"];

async function Row({ label }: { label: string }) {
  return <Text>{label}</Text>;
}

// The same list, but each item is a component invocation rather than an
// element. Every invocation is an instance, so each gets a tree entry of its
// own and the key rides the `#apply` that instantiates it — the contrast with
// `mapped-elements.tsx`, where the key sits inside an inlined element instead.
export default (
  <View>
    {items.map((item) => (
      <Row label={item} />
    ))}
  </View>
);
