import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInk, usePaper } from "./theme";

// What the app shows when its home doesn't open, with Retry. In
// backtickjs.com's colours (server/look.tsx): ink and paper, and its red.
export function HomeFallback({ retry }: { retry: () => void }) {
  const dark = useColorScheme() === "dark";
  const ink = useInk();
  const paper = usePaper();
  return (
    <SafeAreaView style={[styles.failed, { backgroundColor: paper }]}>
      <Text style={[styles.error, { color: dark ? "#f87171" : "#dc2626" }]}>
        Backtick couldn't open. Check your connection, or update the app.
      </Text>
      <Pressable
        style={[styles.button, { backgroundColor: ink }]}
        onPress={() => retry()}
      >
        <Text style={[styles.label, { color: paper }]}>Retry</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  failed: { flex: 1, padding: 24, gap: 20 },
  error: { fontSize: 16, lineHeight: 24 },
  button: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 13,
  },
  label: { fontSize: 15, fontWeight: "600" },
});
