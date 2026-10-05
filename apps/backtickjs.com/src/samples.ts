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

// What server-driven UI usually means: a schema, and a renderer per platform.
export const SCHEMA = `
{
  "type": "button",
  "props": { "label": "Reorder" },
  "action": {
    "type": "http",
    "method": "POST",
    "url": "/cart",
    "body": { "$ref": "order.id" },
    "onSuccess": {
      "type": "setProp",
      "target": "self",
      "prop": "label",
      "value": "Added to cart ✓"
    }
  }
}
`;

export const COMPONENT = `
const [added, setAdded] = $useState(false);

return (
  <$Pressable
    onPress={async () => {
      await fetch($CART, { method: "POST", body: order.id });
      setAdded(true);
    }}
  >
    <$Text>{added ? "Added to cart ✓" : "Reorder"}</$Text>
  </$Pressable>
);
`;

export const SERVER = `
import { bundler } from "@backtickjs/bundler";
import { Home } from "./Home.js";

// The versions your app was built with. A bundle
// never asks the phone for anything else.
const external = { react: "19.2.3", "react-native": "0.86.3" };

Bun.serve({
  routes: {
    "/screens/home": async () => {
      const bundle = await bundler.build({
        input: <Home />,
        external,
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
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
};

export default function App() {
  return (
    <Backtick
      url="https://api.example.com/screens/home"
      modules={modules}
      fallback={<ReactNative.ActivityIndicator />}
    />
  );
}
`;

export const RUN = `
git clone https://github.com/backtickjs/backtick && cd backtick
pnpm install && pnpm build
pnpm --filter @backtickjs/example-react-native-server start
pnpm --filter @backtickjs/example-react-native-app start
`;
