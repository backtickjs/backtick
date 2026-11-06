import { Pressable, StyleSheet, Text, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getErrorMessage } from "react-error-boundary";
import { useInk, usePaper } from "./theme";

// What a screen or a root layout that didn't load shows, with Retry.
// In backtickjs.com's colours (server/look.tsx): ink and paper, and its red.
export function Failed({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const dark = useColorScheme() === "dark";
  const ink = useInk();
  const paper = usePaper();
  return (
    <SafeAreaView style={styles.failed}>
      <Text style={[styles.error, { color: dark ? "#f87171" : "#dc2626" }]}>
        {getErrorMessage(error) ?? String(error)}
      </Text>
      <Pressable
        style={[styles.button, { backgroundColor: ink }]}
        // Not `onPress={retry}`: that passes the press event to `reload`
        // as its signal, and fetch throws calling its addEventListener.
        onPress={() => retry()}
      >
        <Text style={[styles.label, { color: paper }]}>Retry</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  failed: { margin: 24, gap: 20 },
  error: { fontSize: 16, lineHeight: 24 },
  button: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 13,
  },
  label: { fontSize: 15, fontWeight: "600" },
});
