import { cs } from "@backtickjs/core";
import { Text } from "@backtickjs/react-native";

export async function Home() {
  return cs`<$Text>Hello</$Text>`;
}
