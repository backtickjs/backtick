import { cs } from "@backtickjs/core";
import { Linking, Platform, Pressable, Text, View } from "react-native" with {
  backtick: "client",
};
import { palettes } from "../ui/theme.js";

// Google Play's listing; the App Store's needs its id, which it gets once
// the listing exists.
const playStore =
  "https://play.google.com/store/apps/details?id=com.mystoryjar.app";
const colors = palettes.light;

/**
 * Every path, for a build too old for its screens: drawn with React Native
 * alone, which every build has, and bundled for that build's own modules.
 */
export function AppUpdateRequired() {
  return cs`(
    <$View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 32,
        backgroundColor: ${colors.wash},
      }}
    >
      <$Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: ${colors.primaryText},
        }}
      >
        Update MyStoryJar
      </$Text>
      <$Text
        style={{
          fontSize: 14,
          textAlign: "center",
          color: ${colors.secondaryText},
        }}
      >
        This version of the app is no longer supported. Update it to keep
        writing your stories.
      </$Text>
      {$Platform.OS === "android" && (
        <$Pressable
          accessibilityRole="button"
          onPress={() => $Linking.openURL($playStore)}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
            backgroundColor: ${colors.accent},
          }}
        >
          <$Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: ${colors.whiteText},
            }}
          >
            Open Google Play
          </$Text>
        </$Pressable>
      )}
    </$View>
  )`;
}
