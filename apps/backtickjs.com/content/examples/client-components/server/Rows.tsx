import { cs } from "@backtickjs/core";
import { memo, useMemo, useState } from "@backtickjs/react";
import { Pressable, Text, View } from "@backtickjs/react-native";

// A client component, written as a function: one component for the bundle.
const Row = cs`(props: { label: string }) => {
  const [count, setCount] = $useState(0);
  return (
    <$Pressable onPress={() => setCount(count + 1)}>
      <$Text>
        {props.label} {count}
      </$Text>
    </$Pressable>
  );
}`;

export const List = cs`() => {
  // memo(…) is a call: made once per list, so it is one component too.
  const MemoRow = $useMemo(() => $memo($Row), []);
  const [taps, setTaps] = $useState(0);
  return (
    <$View>
      <$Pressable onPress={() => setTaps(taps + 1)}>
        <$Text>list {taps}</$Text>
      </$Pressable>
      <MemoRow label="row" />
    </$View>
  );
}`;

export async function Home() {
  return cs`<$List />`;
}
