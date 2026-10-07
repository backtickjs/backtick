import { cs } from "@backtickjs/core";
import { Pressable, Text } from "@backtickjs/react-native";

export async function Signup() {
  const opensAt = new Date(2026, 9, 6).toDateString();
  const track = cs`() => console.log("signup")`;

  return cs`(
    <$Pressable onPress={$track}>
      <$Text>Opens {$opensAt}</$Text>
    </$Pressable>
  )`;
}
