import { cs } from "@backtickjs/core";
import { Pressable, Text, View } from "@backtickjs/react-native";
import { useStack } from "./navigation.js";

const BackButton = cs`() => {
  const stack = $useStack();
  return (
    <$Pressable onPress={stack.back}>
      <$Text style={{ fontSize: 18, fontWeight: "600" }}>Back</$Text>
    </$Pressable>
  );
}`;

export async function SignIn() {
  return cs`(
    <$View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 24 }}>
      <$Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome back!</$Text>
      <$BackButton />
    </$View>
  )`;
}
