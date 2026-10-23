import { cs } from "@backtickjs/core";
import { shellURL } from "./links.js";
import { Link } from "expo-router" with { backtick: "client" };
import { Pressable, StyleSheet, Text, View } from "react-native" with {
  backtick: "client",
};

// What a phone without a session sees. The button is the shell's `sign-in`
// link, which runs Google's sign-in on the phone, where the session is kept.
export function SignIn() {
  const signIn = shellURL("sign-in");
  return cs`{
    const styles = $StyleSheet.create({
      screen: { flex: 1, justifyContent: "center", padding: 24, gap: 16 },
      title: { fontSize: 28, fontWeight: "700", color: "#17201b" },
      muted: { fontSize: 16, color: "#64706a" },
      button: {
        backgroundColor: "#1f7a55",
        borderRadius: 8,
        padding: 14,
        alignItems: "center",
      },
      label: { color: "#fff", fontSize: 16, fontWeight: "600" },
    });

    return (
      <$View style={styles.screen}>
        <$Text style={styles.title}>Backtick</$Text>
        <$Text style={styles.muted}>
          The apps your assistant makes for you, on your phone.
        </$Text>
        <$Link href={$signIn} asChild>
          <$Pressable style={styles.button}>
            <$Text style={styles.label}>Sign in with Google</$Text>
          </$Pressable>
        </$Link>
      </$View>
    );
  }`;
}
