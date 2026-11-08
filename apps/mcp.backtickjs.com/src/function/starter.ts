// What `new_app` hands the model: a working app, written as the model sees
// it, to edit into what the user asked for.
export const starter = `// A Backtick app:
// 1. Import what the client provides \`with { backtick: "client" }\`.
// 2. A splice \`$\` marks a server value crossing into a client script cs\`...\`
// 3. Use + over template literals: a backtick ends the client script.
// 4. Each route is a screen, navigated as in Next.js: /path/_loading routes
//    and <Link prefetch>. Without a _loading, a navigation holds the current
//    screen until the next is in. Give a _loading its page's title, so the
//    header doesn't change.

import { cs } from "@backtickjs/core";
import { backtickApp } from "@backtickjs/hono";
import { Hono } from "hono";
import { Link, Stack } from "expo-router" with { backtick: "client" };
import { useState } from "react" with { backtick: "client" };
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
        <$Link key={recipe.id} href={"/recipe/" + recipe.id} prefetch style={$styles.link}>
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

// Every screen's options. A sheet or modal's go here too, not on its screen:
// screenOptions as a function of route.path (and don't prefetch a link to it).
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
app.use(backtickApp(app, RootLayout));
app.get("/", (context) => context.render(<Home />));
// Shown the moment a recipe opens, with its name, until its page is in.
app.get("/recipe/:id/_loading", (context) => {
  const recipe = recipes.find((each) => each.id === context.req.param("id"));
  if (!recipe) return context.notFound();
  return context.render(cs\`
    <>
      <$Stack.Screen options={{ title: $recipe.name }} />
      <$ActivityIndicator style={{ marginTop: 40 }} />
    </>
  \`);
});
app.get("/recipe/:id", (context) => {
  const recipe = recipes.find((each) => each.id === context.req.param("id"));
  if (!recipe) return context.notFound();
  return context.render(cs\`
    <$ScrollView contentContainerStyle={$styles.screen} contentInsetAdjustmentBehavior="automatic">
      <$Stack.Screen options={{ title: $recipe.name }} />
      <$Text style={$styles.text}>{$recipe.steps}</$Text>
      <$CookedButton name={$recipe.name} />
    </$ScrollView>
  \`);
});

export default app;
`;
