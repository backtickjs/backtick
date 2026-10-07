import { cs } from "@backtickjs/core";
import { Pressable, Text } from "@backtickjs/react-native";

export async function Signup() {
  const opensAt = new Date(2026, 9, 6);
  const track = () => console.log("signup");

  return cs`(
    // @ts-expect-error: a function on your server can't cross to the phone.
    <$Pressable onPress={$track}>
      {/* @ts-expect-error: nor can a class instance, a Date included. */}
      <$Text>Opens {$opensAt.toDateString()}</$Text>
    </$Pressable>
  )`;
}
