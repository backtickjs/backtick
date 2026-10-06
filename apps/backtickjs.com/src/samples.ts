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

export const SERVER = `
import { bundler } from "@backtickjs/bundler";
import { Home } from "./Home.js";

Bun.serve({
  routes: {
    "/screens/home": async (request) => {
      const packageVersions = JSON.parse(
        String(request.headers.get("backtick-package-versions")),
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
import { Suspense } from "react";
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
    <Suspense fallback={<ReactNative.ActivityIndicator />}>
      <Backtick
        url="https://api.example.com/screens/home"
        modules={modules}
        packageVersions={packageVersions}
      />
    </Suspense>
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

// The same button three ways, for the page on where Backtick comes from. The
// XHP and Javelin pair is illustrative: Facebook's own code isn't public.
export const XHP_SERVER = `
// Rendered on the server, with the user's data.
function reorder_button(User $user): \\XHPRoot {
  $usual = Orders::usualFor($user);
  $id = Javelin::generateUniqueNodeID();
  Javelin::initBehavior('reorder-button', dict[
    'id' => $id,
    'orderId' => $usual->id,
  ]);
  return <button id={$id}>Reorder {$usual->name}</button>;
}
`;

export const XHP_CLIENT = `
// Shipped on its own, and found by name.
JX.behavior("reorder-button", function (config) {
  JX.DOM.listen(JX.$(config.id), "click", null, function () {
    new JX.Request("/cart")
      .setData({ order: config.orderId })
      .send();
  });
});
`;

export const BACKTICK_REORDER = `
import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import { Pressable, Text } from "@backtickjs/react-native";

// A server component: it reads the user's data where it lives.
export async function Reorder({ user }: { user: User }) {
  const usual = await orders.usualFor(user);
  return cs\`(<$ReorderButton order={$usual} />)\`;
}

// A client component, in the same file: no name to match, and TypeScript
// checks what crosses.
const ReorderButton = cs\`(props: { order: Order }) => {
  const [added, setAdded] = $useState(false);
  return (
    <$Pressable
      onPress={async () => {
        await fetch($CART, { method: "POST", body: props.order.id });
        setAdded(true);
      }}
    >
      <$Text>{added ? "Added ✓" : "Reorder " + props.order.name}</$Text>
    </$Pressable>
  );
}\`;
`;
