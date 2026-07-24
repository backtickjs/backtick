import { Text, View } from "@backtickjs/core";

const shared = <Text>hi</Text>;

// The same element instance referenced twice hoists into its own tree entry;
// each occurrence becomes a `#call` instead of inlining twice.
export default <View>{[shared, shared]}</View>;
