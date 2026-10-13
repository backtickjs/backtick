import type { ModuleMap } from "@backtickjs/react-native-client";

// What a screen may require, and where each comes from: the packages this
// app is built with.
export const moduleMap = {
  react: () => require("react"),
  "react/jsx-runtime": () => require("react/jsx-runtime"),
  "react-native": () => require("react-native"),
  "expo-haptics": () => require("expo-haptics"),
  "expo-linear-gradient": () => require("expo-linear-gradient"),
} satisfies ModuleMap;
