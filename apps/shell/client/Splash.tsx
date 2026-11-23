import { Image, StyleSheet, Text, View } from "react-native";
import { useInk, usePaper } from "./theme";

// Backtick's own launch screen, while its home is fetched.
export function Splash() {
  return (
    <View style={[styles.splash, { backgroundColor: usePaper() }]}>
      <Image source={require("../assets/icon.png")} style={styles.icon} />
      <Text style={[styles.name, { color: useInk() }]}>Backtick</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  icon: { width: 96, height: 96, borderRadius: 22 },
  name: { fontSize: 20, fontWeight: "600" },
});
