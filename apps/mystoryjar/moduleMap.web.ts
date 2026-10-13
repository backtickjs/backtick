import type { ModuleMap } from "@backtickjs/react-native-client";

/**
 * What a screen may require on the web, as `moduleMap.ts` is for iOS and
 * Android: stand-ins for SecureStore and FileSystem, which have no web
 * build, and no Google or Facebook sign-in, whose SDKs are native.
 */
export const moduleMap = {
  react: () => require("react"),
  "react/jsx-runtime": () => require("react/jsx-runtime"),
  "react-native": () => require("react-native"),
  "@react-navigation/native": () => require("@react-navigation/native"),
  "expo-secure-store": () => require("./secureStore.web"),
  "expo-font": () => require("expo-font"),
  "react-native-svg": () => require("react-native-svg"),
  "react-native-safe-area-context": () =>
    require("react-native-safe-area-context"),
  "expo-apple-authentication": () => require("expo-apple-authentication"),
  "expo-crypto": () => require("expo-crypto"),
  "expo-image-picker": () => require("expo-image-picker"),
  "expo-file-system": () => require("./fileSystem.web"),
} satisfies ModuleMap;
