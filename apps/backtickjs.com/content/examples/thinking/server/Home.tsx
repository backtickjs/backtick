import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, ScrollView, Text } from "@backtickjs/react-native";
import { db, type Order, type User } from "./db.js";

// A client component: it runs on the phone, with state of its own.
const ReorderButton = cs`(props: { order: Order }) => {
  const [added, setAdded] = $useState(false);
  return (
    <$Pressable onPress={() => setAdded(true)}>
      <$Text>{added ? "Added ✓" : "Reorder " + props.order.name}</$Text>
    </$Pressable>
  );
}`;

// A server component: it runs on your server, for every request.
export async function Home({ user }: { user: User }) {
  const usual = await db.usualOrder(user.id);

  return cs`(
    <$ScrollView>
      <$Text>Good morning, {$user.name}</$Text>
      <$ReorderButton order={$usual} />
    </$ScrollView>
  )`;
}
