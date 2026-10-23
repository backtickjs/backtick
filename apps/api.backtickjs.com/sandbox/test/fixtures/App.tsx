// A Backtick app:
// 1. Import what the client provides `with { backtick: "client" }`.
// 2. A splice `$` marks a server value crossing into a client script cs`...`
// 3. Use + over template literals: a backtick ends the client script.

import { cs } from "@backtickjs/core";
import { useState } from "react" with { backtick: "client" };
import { Pressable, StyleSheet, Text } from "react-native" with {
  backtick: "client",
};
import { SafeAreaView } from "react-native-safe-area-context" with {
  backtick: "client",
};

export default cs`{
  const styles = $StyleSheet.create({
    screen: { flex: 1, alignItems: "center", justifyContent: "center" },
    button: { padding: 12, borderRadius: 8, backgroundColor: "#0a7ea4" },
    label: { color: "#fff", fontSize: 18 },
  });

  function App() {
    const [count, setCount] = $useState<number>(0);
    return (
      <$SafeAreaView style={styles.screen}>
        <$Pressable style={styles.button} onPress={() => setCount(count + 1)}>
          <$Text style={styles.label}>{count + " taps"}</$Text>
        </$Pressable>
      </$SafeAreaView>
    );
  }

  return <App />;
}`;
