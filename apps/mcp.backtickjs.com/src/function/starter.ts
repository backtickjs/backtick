// What `new_app` hands the model: a working app, written as the model sees
// it, to edit into what the user asked for.
export const starter = `// A Backtick app:
// 1. Import what the client provides \`with { backtick: "client" }\`.
// 2. A splice \`$\` marks a server value crossing into a client script cs\`...\`
// 3. Use + over template literals: a backtick ends the client script.
// 4. Routes nest as in Next.js: a screen is /path/_layout (from the path,
//    given children) around /path/_loading (no params, shown while the page
//    loads) around the page. Put the title and header options in the
//    _layout, not the _loading or the page. Links prefetch.

import { cs } from "@backtickjs/core";
import { backtickApp } from "@backtickjs/hono";
import { Hono } from "hono";
import { Link, Stack } from "expo-router" with { backtick: "client" };
import { useState, type ReactNode } from "react" with { backtick: "client" };
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text } from "react-native" with { backtick: "client" };

const recipes = [
  { id: "pancakes", name: "Pancakes", steps: "Whisk flour, milk and eggs, then cook in a hot pan." },
  { id: "omelette", name: "Omelette", steps: "Beat the eggs, cook, fold and serve." },
];

const styles = cs\`$StyleSheet.create({
  screen: { padding: 20, gap: 16 },
  text: { fontSize: 18 },
  link: { fontSize: 18, color: "#0a7ea4" },
})\`;

function Home() {
  return cs\`
    <$ScrollView contentContainerStyle={$styles.screen} contentInsetAdjustmentBehavior="automatic">
      <$Stack.Screen options={{ title: "Recipes" }} />
      {$recipes.map((recipe) => (
        <$Link key={recipe.id} href={"/recipe/" + recipe.id} style={$styles.link}>
          {recipe.name}
        </$Link>
      ))}
    </$ScrollView>
  \`;
}

// A client component, typed as strict TypeScript: its state lives on the phone.
const CookedButton = cs\`({ name }: { name: string }) => {
  const [cooked, setCooked] = $useState(false);
  return (
    <$Button
      title={cooked ? name + " cooked!" : "Mark as cooked"}
      onPress={() => setCooked(!cooked)}
    />
  );
}\`;

// The root layout, /_layout: it draws the navigator, with every screen's
// options. A sheet or modal's go here too, not on its screen: screenOptions
// as a function of route.path.
const RootLayout = cs\`() => (
  <$Stack
    screenOptions={{
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "#111" },
      statusBarStyle: "dark",
    }}
  />
)\`;

const app = new Hono();
app.use(backtickApp(app));
app.get("/_layout", (context) => context.render(RootLayout));
app.get("/", (context) => context.render(<Home />));
// A recipe's header, shown the moment it opens.
app.get("/recipe/:id/_layout", (context) => {
  const recipe = recipes.find((each) => each.id === context.req.param("id"));
  if (!recipe) return context.notFound();
  return context.render(cs\`({ children }: { children: ReactNode }) => (
    <>
      <$Stack.Screen options={{ title: $recipe.name }} />
      {children}
    </>
  )\`);
});
app.get("/recipe/:id/_loading", (context) =>
  context.render(cs\`<$ActivityIndicator style={{ marginTop: 40 }} />\`),
);
app.get("/recipe/:id", (context) => {
  const recipe = recipes.find((each) => each.id === context.req.param("id"));
  if (!recipe) return context.notFound();
  return context.render(cs\`
    <$ScrollView contentContainerStyle={$styles.screen} contentInsetAdjustmentBehavior="automatic">
      <$Text style={$styles.text}>{$recipe.steps}</$Text>
      <$CookedButton name={$recipe.name} />
    </$ScrollView>
  \`);
});

export default app;
`;
