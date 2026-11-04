// A Backtick app:
// 1. Import what the client provides `with { backtick: "client" }`.
// 2. A splice `$` marks a server value crossing into a client script cs`...`
// 3. Use + over template literals: a backtick ends the client script.
// 4. Each route is a screen: <$Link href="/day"> opens the one at "/day".

import { cs } from "@backtickjs/core";
import { backtick } from "@backtickjs/hono";
import { Hono } from "hono";
import { Link } from "expo-router" with { backtick: "client" };
import { useState } from "react" with { backtick: "client" };
import { Pressable, StyleSheet, Text } from "react-native" with {
  backtick: "client",
};
import { SafeAreaView } from "react-native-safe-area-context" with {
  backtick: "client",
};

const app = new Hono();

// `context.render(element)` answers with the screen, bundled for the phone.
app.use(backtick());
app.get("/", (context) => context.render(<Home />));
app.get("/day", (context) => context.render(<Day />));

// Server components: they run on the server each time their screen opens.
function Home() {
  const time = new Date().toLocaleTimeString("en-US");
  return cs`{
    function Screen() {
      const [count, setCount] = $useState<number>(0);
      return (
        <$SafeAreaView style={$styles.screen}>
          <$Text style={$styles.text}>{"The server's time: " + $time}</$Text>
          <$Pressable style={$styles.button} onPress={() => setCount(count + 1)}>
            <$Text style={$styles.label}>{count + " taps"}</$Text>
          </$Pressable>
          <$Link href="/day" style={$styles.link}>Next page</$Link>
        </$SafeAreaView>
      );
    }
    return <Screen />;
  }`;
}

function Day() {
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return cs`
    <$SafeAreaView style={$styles.screen}>
      <$Text style={$styles.text}>{"On the server, it's " + $day}</$Text>
    </$SafeAreaView>
  `;
}

// Styles every screen shares: a client value, spliced as $styles.
const styles = cs`$StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  text: { fontSize: 18 },
  button: { padding: 12, borderRadius: 8, backgroundColor: "#0a7ea4" },
  label: { color: "#fff", fontSize: 18 },
  link: { fontSize: 18, color: "#0a7ea4" },
})`;

export default app;
