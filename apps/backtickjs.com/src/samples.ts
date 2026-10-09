// The code the page shows. Written against the real API, so what a reader
// copies is what runs. A leading `+` marks a line as added; see `highlight`.

// The demo's three deploys, each the file that changed.
export const DEPLOYS = [
  {
    file: "Home.tsx",
    message: "Home screen",
    source: `
import { cs } from "@backtickjs/core";
import { ScrollView, Text } from "@backtickjs/react-native";
import { ProductCard } from "./ProductCard.js";

// A server component: it runs on your server, for every request.
export async function Home({ user }: { user: User }) {
  const picks = await db.picksFor(user.id);

  return cs\`(
    <$ScrollView contentContainerStyle={$screen}>
      <$Text style={$greeting}>Good morning, {$user.name}</$Text>

      {$picks.map((pick) => (
        <$ProductCard key={pick.id} product={pick} />
      ))}
    </$ScrollView>
  )\`;
}
`,
  },
  {
    file: "Home.tsx",
    message: "Promo from the CMS",
    source: `
import { cs } from "@backtickjs/core";
import { ScrollView, Text } from "@backtickjs/react-native";
import { ProductCard } from "./ProductCard.js";
+import { PromoBanner } from "./PromoBanner.js";

// A server component: it runs on your server, for every request.
export async function Home({ user }: { user: User }) {
  const picks = await db.picksFor(user.id);
+  const promo = await cms.activePromo(user.region);

  return cs\`(
    <$ScrollView contentContainerStyle={$screen}>
      <$Text style={$greeting}>Good morning, {$user.name}</$Text>
+      <$PromoBanner promo={$promo} />

      {$picks.map((pick) => (
        <$ProductCard key={pick.id} product={pick} />
      ))}
    </$ScrollView>
  )\`;
}
`,
  },
  {
    file: "Home.tsx",
    message: "One-tap reorder",
    source: `
import { cs } from "@backtickjs/core";
+import { useState } from "@backtickjs/react";
+import { Pressable, ScrollView, Text } from "@backtickjs/react-native";
import { ProductCard } from "./ProductCard.js";
import { PromoBanner } from "./PromoBanner.js";

// A server component: it runs on your server, for every request.
export async function Home({ user }: { user: User }) {
  const picks = await db.picksFor(user.id);
  const promo = await cms.activePromo(user.region);
+  const usual = await db.usualOrder(user.id);

  return cs\`(
    <$ScrollView contentContainerStyle={$screen}>
      <$Text style={$greeting}>Good morning, {$user.name}</$Text>
      <$PromoBanner promo={$promo} />
+      <$ReorderButton order={$usual} />

      {$picks.map((pick) => (
        <$ProductCard key={pick.id} product={pick} />
      ))}
    </$ScrollView>
  )\`;
}
+
+// A client component, in the same file.
+const ReorderButton = cs\`(props: { order: Order }) => {
+  const [added, setAdded] = $useState(false);
+  const reorder = async () => {
+    await fetch($CART, { method: "POST", body: props.order.id });
+    setAdded(true);
+  };
+  return (
+    <$Pressable style={$button} onPress={reorder}>
+      <$Text>{added ? "Added ✓" : "Reorder " + props.order.name}</$Text>
+    </$Pressable>
+  );
+}\`;
`,
  },
];
