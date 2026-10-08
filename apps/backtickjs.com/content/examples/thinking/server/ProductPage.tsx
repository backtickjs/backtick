import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, ScrollView, Text, View } from "@backtickjs/react-native";
import type { JSX } from "@backtickjs/react/jsx-runtime";
import { reviewsFor } from "./reviews.js";

// A client component.
const LikeButton = cs`() => {
  const [liked, setLiked] = $useState(false);
  return (
    <$Pressable onPress={() => setLiked(!liked)}>
      <$Text>{liked ? "♥ Liked" : "♡ Like"}</$Text>
    </$Pressable>
  );
}`;

// A server component, drawn inside other scripts.
async function Reviews({ productId }: { productId: string }) {
  const reviews = await reviewsFor(productId);
  return cs`(
    <$View style={{ gap: 8 }}>
      {$reviews.map((review) => (
        <$Text key={review.id}>
          {review.author}: {review.text}
        </$Text>
      ))}
    </$View>
  )`;
}

// A server component that lays out what it's given.
function Section({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) {
  return cs`(
    <$View style={{ gap: 12 }}>
      <$Text style={{ fontSize: 20, fontWeight: "bold" }}>{$title}</$Text>
      {$children}
    </$View>
  )`;
}

export async function ProductPage({ productId }: { productId: string }) {
  return cs`(
    <$ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
      <$Text style={{ fontSize: 28, fontWeight: "bold" }}>
        Ceramic dripper
      </$Text>
      <$LikeButton />
      {
        ${(
          <Section title="Reviews">
            <Reviews productId={productId} />
          </Section>
        )}
      }
    </$ScrollView>
  )`;
}
