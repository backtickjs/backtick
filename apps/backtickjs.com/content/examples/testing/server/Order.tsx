import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, Text, View } from "@backtickjs/react-native";

// A client component: its count lives on the phone.
const Stepper = cs`({ name }: { name: string }) => {
  const [count, setCount] = $useState(0);
  return (
    <$Pressable onPress={() => setCount(count + 1)}>
      <$Text>
        {name}: {count}
      </$Text>
    </$Pressable>
  );
}`;

// A server component: what to order comes from your server.
export async function Order({ items }: { items: string[] }) {
  return cs`(
    <$View>
      {$items.map((name) => (
        <$Stepper key={name} name={name} />
      ))}
    </$View>
  )`;
}
