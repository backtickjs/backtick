import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, Text, View } from "@backtickjs/react-native";

// A client component: it runs on the phone.
const Counter = cs`() => {
  const [count, setCount] = $useState(0);
  return (
    <$Pressable onPress={() => setCount(count + 1)}>
      <$Text style={{ fontSize: 18, color: "#0a7ea4" }}>
        Tapped {count} times
      </$Text>
    </$Pressable>
  );
}`;

// A server component: it runs on your server, for every request.
export async function Home() {
  const time = new Date().toLocaleTimeString();

  return cs`(
    <$View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <$Text style={{ fontSize: 24 }}>Served at {$time}</$Text>
      <$Counter />
    </$View>
  )`;
}
