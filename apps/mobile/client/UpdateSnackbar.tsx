import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { offerReload, useOfferedReload } from "./updates";

// Material Design's snackbar, above every screen and outside their layout:
// the screen on top has a new version. It stays until the user reloads or
// dismisses it, since it carries an action.
export function UpdateSnackbar() {
  const reload = useOfferedReload();
  const { bottom } = useSafeAreaInsets();
  const shown = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (reload !== null) {
      shown.setValue(0);
      Animated.timing(shown, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [reload, shown]);
  if (reload === null) {
    return null;
  }
  return (
    <Animated.View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={[
        styles.snackbar,
        {
          bottom: bottom + 16,
          opacity: shown,
          transform: [
            {
              translateY: shown.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={styles.message}>A new version is available.</Text>
      <Pressable
        accessibilityRole="button"
        hitSlop={8}
        onPress={() => {
          offerReload(null);
          reload();
        }}
      >
        <Text style={styles.action}>Reload</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
        hitSlop={8}
        onPress={() => offerReload(null)}
      >
        <Text style={styles.close}>✕</Text>
      </Pressable>
    </Animated.View>
  );
}

// Material 3's snackbar: inverse surface, 4 dp corners, 48 dp tall, a text
// action in inverse primary.
const styles = StyleSheet.create({
  snackbar: {
    position: "absolute",
    left: 16,
    right: 16,
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingLeft: 16,
    paddingRight: 12,
    borderRadius: 4,
    backgroundColor: "#322F35",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  message: { flex: 1, color: "#F5EFF7", fontSize: 14, paddingVertical: 14 },
  action: { color: "#D0BCFF", fontSize: 14, fontWeight: "600" },
  close: { color: "#F5EFF7", fontSize: 16 },
});
