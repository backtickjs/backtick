// What `new_app` hands the model: a working app, written as the model sees
// it, to edit into what the user asked for.
export const starter = `// A Backtick app:
// 1. Import what the client provides \`with { backtick: "client" }\`.
// 2. A splice \`$\` marks a server value crossing into a client script cs\`...\`
// 3. Use + over template literals: a backtick ends the client script.
// 4. Each route is a screen, and runs on the server when it opens; going back
//    shows it as it was. As in Next.js, a navigation holds the current screen
//    until the next is in, unless the route has a _loading, which shows at
//    once instead.

import { cs } from "@backtickjs/core";
import { backtick } from "@backtickjs/hono";
import { Hono } from "hono";
import { Link, Stack, unstable_useIsNavigating } from "expo-router" with { backtick: "client" };
import { StatusBar } from "expo-status-bar" with { backtick: "client" };
import { useState } from "react" with { backtick: "client" };
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native" with { backtick: "client" };
import { SafeAreaView } from "react-native-safe-area-context" with { backtick: "client" };

const styles = cs\`$StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  text: { fontSize: 18 },
  button: { padding: 12, borderRadius: 8, backgroundColor: "#0a7ea4" },
  label: { color: "#fff", fontSize: 18 },
  link: { fontSize: 18, color: "#0a7ea4" },
  navigating: { position: "absolute", top: 60, right: 16 },
})\`;

function Home() {
  const time = new Date().toLocaleTimeString("en-US");
  return cs\`{
    function Screen() {
      const [count, setCount] = $useState<number>(0);
      return (
        <$SafeAreaView style={$styles.screen}>
          <$Stack.Screen options={{ headerShown: false }} />
          <$StatusBar style="dark" />
          <$Text style={$styles.text}>{"The server's time: " + $time}</$Text>
          <$Pressable style={$styles.button} onPress={() => setCount(count + 1)}>
            <$Text style={$styles.label}>{count + " taps"}</$Text>
          </$Pressable>
          <$Link href="/day" style={$styles.link}>Next page</$Link>
        </$SafeAreaView>
      );
    }
    return <Screen />;
  }\`;
}

function Day() {
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return cs\`
    <$SafeAreaView style={$styles.screen} edges={["bottom"]}>
      <$Stack.Screen options={{ title: "Day" }} />
      <$Text style={$styles.text}>{"On the server, it's " + $day}</$Text>
    </$SafeAreaView>
  \`;
}

// /day's loading state: shown the moment /day opens, until the screen is in.
const DayLoading = cs\`() => (
  <>
    <$Stack.Screen options={{ title: "Day" }} />
    <$ActivityIndicator style={{ marginTop: 40 }} />
  </>
)\`;

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
app.use(backtick(app));
app.get("/_layout", (context) => context.render(RootLayout));
app.get("/", (context) => context.render(<Home />));
app.get("/day/_loading", (context) => context.render(DayLoading));
app.get("/day", (context) => context.render(<Day />));

export default app;
`;
