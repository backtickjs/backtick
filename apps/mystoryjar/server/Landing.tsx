import { cs } from "@backtickjs/core";
import { Pressable, Text, View } from "@backtickjs/react-native";
import { useStack } from "./navigation.js";

const SignInButton = cs`() => {
  const stack = $useStack();
  return (
    <$Pressable onPress={() => stack.navigate("/signin")}>
      <$Text style={{ fontSize: 18, fontWeight: "600" }}>Sign in</$Text>
    </$Pressable>
  );
}`;

export async function Landing() {
  return cs`(
    <$View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 24 }}>
      <$Text style={{ fontSize: 32, fontWeight: "bold" }}>MyStoryJar</$Text>
      <$Text style={{ fontSize: 18 }}>Journaling without the hassle.</$Text>
      <$SignInButton />
    </$View>
  )`;
}
