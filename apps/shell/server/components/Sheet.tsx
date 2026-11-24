import { cs } from "@backtickjs/core";
import { useColors } from "./look.js";
import { useSafeAreaInsets } from "react-native-safe-area-context" with {
  backtick: "client",
};
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native" with { backtick: "client" };

const styles = cs`$StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  sheet: {
    flexShrink: 1,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 5,
    borderRadius: 3,
    marginBottom: 20,
  },
})`;

// What every sheet's text shares: its title, and a detail's line.
export const sheetStyles = cs`$StyleSheet.create({
  sheetTitle: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: "800",
    letterSpacing: -0.9,
  },
  detail: { fontSize: 15 },
})`;

// A bottom sheet, as phones show a menu of actions, over the dimmed home.
export const Sheet = cs`(props: { onClose: () => void; children: any }) => {
  const { onClose } = props;
  const colors = $useColors();
  const insets = $useSafeAreaInsets();
  return (
    <$Modal visible transparent animationType="slide" onRequestClose={onClose}>
      {/* Above the keyboard, for a sheet with a text field. */}
      <$KeyboardAvoidingView
        // Below the status bar, however high the keyboard pushes it.
        style={{ flex: 1, paddingTop: insets.top + 12 }}
        behavior={$Platform.OS === "ios" ? "padding" : "height"}
      >
        <$Pressable style={$styles.backdrop} onPress={onClose} />
        <$View
          style={[
            $styles.sheet,
            {
              backgroundColor: colors.paper,
              paddingBottom: insets.bottom + 16,
            },
          ]}
        >
          <$View style={[$styles.handle, { backgroundColor: colors.line }]} />
          {props.children}
        </$View>
      </$KeyboardAvoidingView>
    </$Modal>
  );
}`;
