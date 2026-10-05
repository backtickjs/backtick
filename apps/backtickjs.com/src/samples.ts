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
    file: "ReorderButton.tsx",
    message: "One-tap reorder",
    source: `
+import { cs } from "@backtickjs/core";
+import { useState } from "@backtickjs/react";
+import { Pressable, Text } from "@backtickjs/react-native";
+
+// A client component: it runs on the phone, and its state stays there.
+export const ReorderButton = cs\`(props: { order: Order }) => {
+  const [added, setAdded] = $useState(false);
+
+  return (
+    <$Pressable
+      style={added ? $done : $button}
+      onPress={async () => {
+        await fetch($CART, { method: "POST", body: props.order.id });
+        setAdded(true);
+      }}
+    >
+      <$Text style={$label}>
+        {added ? "Added to cart ✓" : "Reorder " + props.order.name}
+      </$Text>
+    </$Pressable>
+  );
+}\`;
`,
  },
];

export const SERVER = `
import { bundler } from "@backtickjs/bundler";
import { Home } from "./Home.js";

Bun.serve({
  routes: {
    "/screens/home": async (request) => {
      const packageVersions = JSON.parse(
        request.headers.get("backtick-package-versions"),
      );
      const bundle = await bundler.build({
        input: <Home />,
        packageVersions,
      });
      const { code } = bundle.generate({ format: "cjs" });
      return new Response(code);
    },
  },
});
`;

export const APP = `
import { Backtick } from "@backtickjs/react-native-client";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";

const modules = {
  "react": React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
};

const packageVersions = {
  "react": "19.2.3",
  "react-native": "0.86.3",
};

export default function App() {
  return (
    <Backtick
      url="https://api.example.com/screens/home"
      modules={modules}
      packageVersions={packageVersions}
      fallback={<ReactNative.ActivityIndicator />}
    />
  );
}
`;

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
