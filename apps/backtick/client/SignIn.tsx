import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { signInWithGoogle } from "./supabase";

export function SignIn() {
  const [error, setError] = useState<string>();
  return (
    <View style={styles.centered}>
      <Text style={styles.title}>Backtick</Text>
      <Text style={styles.muted}>
        The apps your assistant makes for you, on your phone.
      </Text>
      <Pressable
        style={styles.button}
        onPress={() =>
          signInWithGoogle().catch((caught: Error) => setError(caught.message))
        }
      >
        <Text style={styles.buttonLabel}>Sign in with Google</Text>
      </Pressable>
      {error === undefined ? null : <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 16,
    backgroundColor: "#f3f5f2",
  },
  title: { fontSize: 28, fontWeight: "700", color: "#17201b" },
  muted: { fontSize: 16, color: "#64706a" },
  button: {
    backgroundColor: "#1f7a55",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  buttonLabel: { color: "#fff", fontSize: 16, fontWeight: "600" },
  error: { color: "#b91c1c" },
});
