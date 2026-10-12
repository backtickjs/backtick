import { cs } from "@backtickjs/core";
import { useEffect } from "@backtickjs/react";
import { View } from "@backtickjs/react-native";
import { useStack } from "../navigation.js";

// Where a path isn't for this user, signed in or out: the screen for them, in
// its place.
const Replace = cs`(props: { path: string }) => {
  const stack = $useStack();
  $useEffect(() => {
    stack.replace(props.path);
  }, []);
  return <$View style={{ flex: 1 }} />;
}`;

export function Redirect({ to }: { to: string }) {
  return cs`<$Replace path={$to} />`;
}
