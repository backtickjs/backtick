import { View } from "@backtickjs/core";

// A server component can render nothing. The invocation is still an instance —
// it owns the cells the component declared, and a re-render can give it a child
// later — so it keeps a tree entry of its own, with null content.
async function Absent() {
  return null;
}

export default (
  <View>
    <Absent />
  </View>
);
