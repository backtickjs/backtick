// What `new_app` hands the model: a working app, written as the model sees
// it, to edit into what the user asked for.
export const starter = `// A Backtick app:
// 1. Import what the client provides \`with { backtick: "client" }\`.
// 2. A splice \`$\` marks a server value crossing into a client script cs\`...\`
// 3. Use + over template literals: a backtick ends the client script.
// 4. Each route is a screen, and runs on the server each time it opens.

import { cs } from "@backtickjs/core";
import { backtick } from "@backtickjs/hono";
import { Hono } from "hono";
import { Link, Stack } from "expo-router" with { backtick: "client" };
import { StatusBar } from "expo-status-bar" with { backtick: "client" };
import { useState } from "react" with { backtick: "client" };
import { Pressable, StyleSheet, Text } from "react-native" with { backtick: "client" };
import { SafeAreaView } from "react-native-safe-area-context" with { backtick: "client" };

const styles = cs\`$StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  text: { fontSize: 18 },
  button: { padding: 12, borderRadius: 8, backgroundColor: "#0a7ea4" },
  label: { color: "#fff", fontSize: 18 },
  link: { fontSize: 18, color: "#0a7ea4" },
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

// https://w3c.github.io/manifest/
const manifest = {
  name: "My app",
  theme_color: "#0a7ea4",
  background_color: "#ffffff",
};

const app = new Hono();
app.use(backtick({ manifest }));
app.get("/", (context) => context.render(<Home />));
app.get("/day", (context) => context.render(<Day />));

export default app;
`;
