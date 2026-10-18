import { Linking, Platform, Pressable, Text, View } from "react-native";

// Google Play's listing; the App Store's needs its id, which it gets once
// the listing exists.
const playStore =
  "https://play.google.com/store/apps/details?id=com.mystoryjar.app";
// The light theme's, from server/ui/theme.ts: this screen is the app's own.
const colors = {
  wash: "#F3F3F3",
  primaryText: "#303030",
  secondaryText: "#7E7D7D",
  accent: "#E9707D",
  whiteText: "#FFFFFF",
};

/**
 * Every path, when the server answers that this app can't run its screens:
 * drawn by the app itself, as the server can't bundle a screen for it.
 */
export function AppUpdateRequired() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 32,
        backgroundColor: colors.wash,
      }}
    >
      <Text
        style={{ fontSize: 18, fontWeight: "bold", color: colors.primaryText }}
      >
        Update MyStoryJar
      </Text>
      <Text
        style={{
          fontSize: 14,
          textAlign: "center",
          color: colors.secondaryText,
        }}
      >
        This version of the app is no longer supported. Update it to keep
        writing your stories.
      </Text>
      {Platform.OS === "android" && (
        <Pressable
          accessibilityRole="button"
          onPress={() => Linking.openURL(playStore)}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
            backgroundColor: colors.accent,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: colors.whiteText,
            }}
          >
            Open Google Play
          </Text>
        </Pressable>
      )}
    </View>
  );
}
