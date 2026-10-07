import { cs } from "@backtickjs/core";
import { Pressable, Text } from "@backtickjs/react-native";
import { impactAsync, LinearGradient } from "./expo.js";

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
