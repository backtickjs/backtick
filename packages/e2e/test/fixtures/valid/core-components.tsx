import { cs, Image, Text, View } from "@backtickjs/core";

export default (
  <View style={{ padding: 8 }}>
    <Text style={{ fontSize: 12 }} onPress={cs`() => {}`}>
      hi
    </Text>
    <Image source={{ uri: "https://example.com/a.png" }} resizeMode="cover" />
  </View>
);
