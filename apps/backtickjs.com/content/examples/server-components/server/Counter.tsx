import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Text } from "@backtickjs/react-native";

export function Counter() {
  // @ts-expect-error: hooks are client code, and this runs on your server.
  const [count, setCount] = useState(0);
  return cs`<$Text>{$count}</$Text>`;
}
