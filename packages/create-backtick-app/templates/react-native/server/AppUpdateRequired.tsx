import { cs } from "@backtickjs/core";
import { Text, View } from "@backtickjs/react-native";

// Every path, for a build you retired: drawn with React Native alone, which
// every build has, and bundled for the retired build's own modules. Point
// your users at your store listing here.
export function AppUpdateRequired() {
  return cs`(
    <$View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <$Text style={{ fontSize: 16, textAlign: "center" }}>
        This version of the app is no longer supported. Update it to keep going.
      </$Text>
    </$View>
  )`;
}
