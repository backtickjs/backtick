import { cs } from "@backtickjs/core";
import { memo, useState } from "react" with { backtick: "client" };
import { Pressable, Text, View } from "react-native" with {
  backtick: "client",
};

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

// memo(…) is a call, and a script is one value: one component for the bundle.
const MemoRow = cs`$memo($Row)`;

export const List = cs`() => {
  const [taps, setTaps] = $useState(0);
  return (
    <$View>
      <$Pressable onPress={() => setTaps(taps + 1)}>
        <$Text>list {taps}</$Text>
      </$Pressable>
      <$MemoRow label="row" />
    </$View>
  );
}`;

export async function Home() {
  return cs`<$List />`;
}
