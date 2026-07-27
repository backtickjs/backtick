import { cs, Text, View } from "@backtickjs/core";

// A key on a component tag. It identifies the instance among its siblings, so
// it belongs to the instantiation rather than to the entry — two `<Row />` tags
// may reach one entry, and an entry can't hold two keys. It rides the reference
// and lands on the `#apply`, where a client can pair instances across a
// re-render by key rather than by position.
//
// The third key is a script, so it is evaluated per instance like any other
// client value, and captures from the reference's own scope rather than the
// entry's.
async function Row({ label }: { label: string }) {
  return <Text>{label}</Text>;
}

export default (
  <View>
    <Row key="first" label="one" />
    <Row key={2} label="two" />
    <Row key={cs.lift(cs.const("third"))} label="three" />
  </View>
);
