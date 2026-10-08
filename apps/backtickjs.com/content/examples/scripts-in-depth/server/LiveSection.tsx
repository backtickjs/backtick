import { type Client, cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, Text, View } from "@backtickjs/react-native";

const Like = cs`() => {
  const [liked, setLiked] = $useState(false);
  return (
    <$Pressable onPress={() => setLiked(!liked)}>
      <$Text>{liked ? "♥" : "♡"}</$Text>
    </$Pressable>
  );
}`;

// A server component handed client code: its title is the phone's to compute.
async function Section({ title }: { title: Client<string> }) {
  return cs`(
    <$View>
      <$Text>{$title}</$Text>
      <$Like />
    </$View>
  )`;
}

// A client component drawing that server component, handing it a local.
const Cart = cs`() => {
  const [count, setCount] = $useState(0);
  return (
    <$View>
      <$Pressable onPress={() => setCount(count + 1)}>
        <$Text>Add</$Text>
      </$Pressable>
      {${(<Section title={cs`count + " in your cart"`} />)}}
    </$View>
  );
}`;

export async function Home() {
  return cs`<$Cart />`;
}
