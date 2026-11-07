// What `new_app` hands the model: a working app, written as the model sees
// it, to edit into what the user asked for.
export const starter = `// A Backtick app:
// 1. Import what the client provides \`with { backtick: "client" }\`.
// 2. A splice \`$\` marks a server value crossing into a client script cs\`...\`
// 3. Use + over template literals: a backtick ends the client script.
// 4. Each route is a screen, navigated as in Next.js: /path/_loading routes
//    and <Link prefetch>. Without a _loading, a navigation holds the current
//    screen until the next is in.

import { cs } from "@backtickjs/core";
import { backtickApp } from "@backtickjs/hono";
import { Hono } from "hono";
import { Link, Stack, unstable_useIsNavigating } from "expo-router" with { backtick: "client" };
import { useState } from "react" with { backtick: "client" };
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text } from "react-native" with { backtick: "client" };

type Recipe = { id: string; name: string; minutes: number; steps: string[] };

const recipes: Recipe[] = [
  { id: "pancakes", name: "Pancakes", minutes: 20, steps: ["Whisk flour, milk and eggs.", "Cook in a hot pan, flipping once."] },
  { id: "omelette", name: "Omelette", minutes: 10, steps: ["Beat the eggs.", "Cook, fold and serve."] },
  { id: "salad", name: "Greek salad", minutes: 15, steps: ["Chop the vegetables.", "Add feta and olive oil."] },
];

const styles = cs\`$StyleSheet.create({
  screen: { padding: 20, gap: 12 },
  row: { padding: 16, borderRadius: 12, backgroundColor: "#fff" },
  name: { fontSize: 18, fontWeight: "600" },
  text: { fontSize: 16, color: "#444" },
  button: { padding: 12, borderRadius: 8, backgroundColor: "#0a7ea4", alignItems: "center" },
  label: { color: "#fff", fontSize: 18 },
  navigating: { position: "absolute", top: 60, right: 16 },
})\`;

// Each link prefetched: its recipe's loading state is on the phone before it's
// tapped.
function Home() {
  return cs\`
    <$ScrollView contentContainerStyle={$styles.screen} contentInsetAdjustmentBehavior="automatic">
      <$Stack.Screen options={{ title: "Recipes" }} />
      {$recipes.map((recipe) => (
        <$Link key={recipe.id} href={"/recipe/" + recipe.id} prefetch asChild>
          <$Pressable style={$styles.row}>
            <$Text style={$styles.name}>{recipe.name}</$Text>
            <$Text style={$styles.text}>{recipe.minutes + " min"}</$Text>
          </$Pressable>
        </$Link>
      ))}
    </$ScrollView>
  \`;
}

// /recipe/:id's loading state, drawn for the recipe: its name, the moment it
// opens, until the page is in.
function RecipeLoading({ recipe }: { recipe: Recipe }) {
  return cs\`
    <>
      <$Stack.Screen options={{ title: $recipe.name }} />
      <$ActivityIndicator style={{ marginTop: 40 }} />
    </>
  \`;
}

function RecipePage({ recipe }: { recipe: Recipe }) {
  return cs\`{
    function Screen() {
      const [cooked, setCooked] = $useState(false);
      return (
        <$ScrollView contentContainerStyle={$styles.screen} contentInsetAdjustmentBehavior="automatic">
          <$Stack.Screen options={{ title: $recipe.name }} />
          {$recipe.steps.map((step, index) => (
            <$Text key={index} style={$styles.text}>{index + 1 + ". " + step}</$Text>
          ))}
          <$Pressable style={$styles.button} onPress={() => setCooked(!cooked)}>
            <$Text style={$styles.label}>{cooked ? "Cooked!" : "Mark as cooked"}</$Text>
          </$Pressable>
        </$ScrollView>
      );
    }
    return <Screen />;
  }\`;
}

// The root layout, around every screen: the navigator, and a spinner while a
// navigation waits for a screen without a _loading.
const RootLayout = cs\`() => {
  const navigating = $unstable_useIsNavigating();
  return (
    <>
      {/* No back gesture while a navigation holds: it would be undone. */}
      <$Stack screenOptions={{ gestureEnabled: !navigating }} />
      {navigating ? <$ActivityIndicator style={$styles.navigating} /> : null}
    </>
  );
}\`;

const app = new Hono();
app.use(backtickApp(app, RootLayout));
app.get("/", (context) => context.render(<Home />));
const recipeOf = (id: string) => recipes.find((recipe) => recipe.id === id);
app.get("/recipe/:id/_loading", (context) => {
  const recipe = recipeOf(context.req.param("id"));
  return recipe ? context.render(<RecipeLoading recipe={recipe} />) : context.notFound();
});
app.get("/recipe/:id", (context) => {
  const recipe = recipeOf(context.req.param("id"));
  return recipe ? context.render(<RecipePage recipe={recipe} />) : context.notFound();
});

export default app;
`;
