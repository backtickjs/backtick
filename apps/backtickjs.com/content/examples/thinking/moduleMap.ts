import type { ModuleMap } from "@backtickjs/react-native-client";

// What a screen may require: the packages your app is built with.
export const moduleMap = {
  react: () => require("react"),
  "react/jsx-runtime": () => require("react/jsx-runtime"),
  "react-native": () => require("react-native"),
} satisfies ModuleMap;
