import type { ModuleMap } from "@backtickjs/react-native-client";

/**
 * What a screen may require on iOS and Android, and where each comes from:
 * the packages this app is built with. `moduleMap.web.ts` is the web's. A
 * table and nothing else, each entry `() => require("…")`: Node reads it
 * without running it, to name the packages each build carries.
 */
export const moduleMap = {
  react: () => require("react"),
  "react/jsx-runtime": () => require("react/jsx-runtime"),
  "react-native": () => require("react-native"),
  "@react-navigation/native": () => require("@react-navigation/native"),
  "expo-secure-store": () => require("expo-secure-store"),
  "expo-font": () => require("expo-font"),
  "react-native-svg": () => require("react-native-svg"),
  "react-native-safe-area-context": () =>
    require("react-native-safe-area-context"),
  "expo-apple-authentication": () => require("expo-apple-authentication"),
  "expo-crypto": () => require("expo-crypto"),
  "@react-native-google-signin/google-signin": () =>
    require("@react-native-google-signin/google-signin"),
  "react-native-fbsdk-next": () => require("react-native-fbsdk-next"),
  "expo-image-picker": () => require("expo-image-picker"),
  "expo-file-system": () => require("expo-file-system"),
} satisfies ModuleMap;
