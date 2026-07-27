import { cs, Text, View } from "@backtickjs/core";
import type { Client } from "@backtickjs/core";

// A key is a value like a prop, so a script spliced into one threads its
// splices and captures exactly as a prop's would — including on an element
// nested inline inside another, where the key belongs to no entry of its own.
// `jsx-capture-key.tsx` covers the hoisted case, which `contentValues` scans;
// this covers the nested one, which needs the key walked in `nestedRefs` and
// `freeCaps` as well. A key with no splices always worked, which is why the
// gap went unnoticed.
const Child = async ({ n }: { n: Client<number> }) => (
  <View>
    <Text key={cs.lift(cs.const(cs.splice((n))))}>x</Text>
  </View>
);

export default <Child n={cs.lift(cs.const(1))} />;
