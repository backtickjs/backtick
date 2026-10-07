import { cs } from "@backtickjs/core";
import { Text } from "@backtickjs/react-native";

export async function Home() {
  const total = 13.5;
  return cs`(
    // @ts-expect-error: Property 'total' does not exist on type 'GlobalThis'.
    <$Text>Your total is {total}.</$Text>
  )`;
}
