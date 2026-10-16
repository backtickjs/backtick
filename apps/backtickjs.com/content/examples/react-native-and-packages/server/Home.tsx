import { cs } from "@backtickjs/core";
import { impactAsync } from "expo-haptics" with { backtick: "client" };
import { LinearGradient } from "expo-linear-gradient" with {
  backtick: "client",
};
import { Pressable, Text } from "react-native" with { backtick: "client" };

export async function Home() {
  return cs`(
    <$LinearGradient
      colors={["#7c3aed", "#0891b2"]}
      style={{ flex: 1, padding: 24 }}
    >
      <$Pressable onPress={() => $impactAsync()}>
        <$Text style={{ color: "#fff", fontSize: 24 }}>Tap to feel it</$Text>
      </$Pressable>
    </$LinearGradient>
  )`;
}
