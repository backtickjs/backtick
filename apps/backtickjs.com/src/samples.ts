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
+      {$promo && <$PromoBanner promo={$promo} />}

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
      {$promo && <$PromoBanner promo={$promo} />}
+      {$usual && <$ReorderButton order={$usual} />}

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

// One screen as written, in parts coloured by what they are, and as the phone
// receives it. Simplified: a real bundle keeps each compiled script in a
// module table, passes values as thunks, and compiles the JSX.
export type Part = { kind: "app" | "server" | "script"; code: string };

export const WRITTEN: Part[] = [
  {
    kind: "app",
    code: `import { cs } from "@backtickjs/core";
import { Text, View } from "@backtickjs/react-native";
`,
  },
  {
    kind: "server",
    code: `export async function Home({ user }: { user: User }) {
  const picks = await db.picksFor(user.id);
`,
  },
  {
    kind: "script",
    code: `  return cs\`(
    <$View>
      <$Text>Good morning, {$user.name}</$Text>
      {$picks.map((p) => <$Text key={p.id}>{p.name}</$Text>)}
    </$View>
  )\`;`,
  },
  { kind: "server", code: "}" },
];

export const RECEIVED = `
const { Text, View } = require("react-native");

const Home = (View, Text, user, picks) => (
  <View>
    <Text>Good morning, {user.name}</Text>
    {picks.map((p) => <Text key={p.id}>{p.name}</Text>)}
  </View>
);

module.exports = Home(
  View,
  Text,
  { name: "Sam" },
  [
    { id: 1, name: "Ethiopia Guji" },
    { id: 2, name: "Colombia Huila" },
  ],
);
`;
