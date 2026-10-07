import { cs } from "@backtickjs/core";
import { Text } from "@backtickjs/react-native";

// A splice is written into the bundle as data, never as code: whatever this
// string holds, the phone shows it as text.
export async function Note({ text }: { text: string }) {
  return cs`<$Text>{$text}</$Text>`;
}
