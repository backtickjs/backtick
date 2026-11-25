// What `new_app` hands the model: a working app, written as the model sees
// it, to edit into what the user asked for.
export const starter = `// A Backtick app:
// 1. Import what the client provides \`with { backtick: "client" }\`.
// 2. A splice \`$\` marks a server value crossing into a client script cs\`...\`
// 3. Use + over template literals: a backtick ends the client script.
// 4. Navigate with React Navigation: each screen in App shows a route of this
//    server, with <FetchedScreen>, and opens with StackActions.push.

import { createRender } from "@backtickjs/bundler";
import { cs, runtime } from "@backtickjs/core";
import { Hono } from "hono";
import { Link, NavigationContainer, NavigationIndependentTree, StackActions } from "@react-navigation/native" with { backtick: "client" };
import { createNativeStackNavigator } from "@react-navigation/native-stack" with { backtick: "client" };
import { Suspense, use, useState, type ReactNode } from "react" with { backtick: "client" };
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text } from "react-native" with { backtick: "client" };
import { useSafeAreaInsets } from "react-native-safe-area-context" with { backtick: "client" };

type Screens = { Recipes: undefined; Recipe: { id: string; name: string } };

type Recipe = { id: string; name: string; steps: string };

const recipes: Recipe[] = [
  {
    id: "pancakes",
    name: "Pancakes",
    steps: "Whisk flour, milk and eggs, then cook in a hot pan.",
  },
  {
    id: "omelette",
    name: "Omelette",
    steps: "Beat the eggs, cook, fold and serve.",
  },
];

const styles = cs\`$StyleSheet.create({
  screen: { padding: 20, gap: 16 },
  text: { fontSize: 18 },
  link: { fontSize: 18, color: "#0a7ea4" },
})\`;

const Navigator = cs\`$createNativeStackNavigator<Screens>()\`;

const screens = cs\`new Map<string, Promise<ReactNode>>()\`;
const FetchedScreen = cs\`({ id, url }: { id: string; url: string }) => {
  if (!$screens.has(id)) {
    $screens.set(
      id,
      $runtime
        .fetch<ReactNode>(url)
        .then((response) => response.text())
        .then((bundle) => $runtime.exec(bundle)),
    );
  }
  return $use($screens.get(id)!);
}\`;

const App = cs\`({ origin }: { origin: string }) => (
  <$NavigationIndependentTree>
    <$NavigationContainer>
      <$Navigator.Navigator
        screenLayout={({ children }) => (
          <$Suspense
            fallback={<$ActivityIndicator style={{ flex: 1 }} />}
          >
            {children}
          </$Suspense>
        )}
        screenOptions={{
          headerStyle: { backgroundColor: "#fff" },
          headerTitleStyle: { color: "#111" },
        }}
      >
        <$Navigator.Screen name="Recipes" options={{ title: "Recipes" }}>
          {({ route }) => (
            <$FetchedScreen id={route.key} url={origin + "/recipes"} />
          )}
        </$Navigator.Screen>
        <$Navigator.Screen
          name="Recipe"
          options={({ route }) => ({ title: route.params.name })}
        >
          {({ route }) => (
            <$FetchedScreen
              id={route.key}
              url={origin + "/recipe/" + route.params.id}
            />
          )}
        </$Navigator.Screen>
      </$Navigator.Navigator>
    </$NavigationContainer>
  </$NavigationIndependentTree>
)\`;

const CookedButton = cs\`({ name }: { name: string }) => {
  const [cooked, setCooked] = $useState(false);
  const title = cooked ? name + " cooked!" : "Mark as cooked";
  return <$Button title={title} onPress={() => setCooked(!cooked)} />;
}\`;

// Below the header, clear of the home indicator and Android's navigation bar.
const RecipeList = cs\`({ recipes }: { recipes: Recipe[] }) => {
  const insets = $useSafeAreaInsets();
  return (
    <$ScrollView
      contentContainerStyle={[$styles.screen, { paddingBottom: 20 + insets.bottom }]}
    >
      {recipes.map(({ id, name }) => (
        <$Link
          key={id}
          action={$StackActions.push("Recipe", { id, name })}
          style={$styles.link}
        >
          {name}
        </$Link>
      ))}
    </$ScrollView>
  );
}\`;

const RecipePage = cs\`({ recipe }: { recipe: Recipe }) => {
  const insets = $useSafeAreaInsets();
  return (
    <$ScrollView
      contentContainerStyle={[$styles.screen, { paddingBottom: 20 + insets.bottom }]}
    >
      <$Text style={$styles.text}>{recipe.steps}</$Text>
      <$CookedButton name={recipe.name} />
    </$ScrollView>
  );
}\`;

const app = new Hono();

// A screen the bundler refuses (an old build without a module it imports) is
// answered with a bundle that throws why, and logged here.
const render = createRender({ onBundlerError: (error) => console.warn(error) });

app.get("/", (context) => {
  const origin = new URL(context.req.url).origin;
  return render(context.req.raw, cs\`<$App origin={$origin} />\`);
});
app.get("/recipes", (context) =>
  render(context.req.raw, cs\`<$RecipeList recipes={$recipes} />\`),
);
app.get("/recipe/:id", (context) => {
  const recipe = recipes.find((each) => each.id === context.req.param("id"));
  if (!recipe) {
    return context.notFound();
  }
  return render(context.req.raw, cs\`<$RecipePage recipe={$recipe} />\`);
});

export default app;
`;
