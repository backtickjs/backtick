import { evaluate } from "@backtickjs/react-native-client";
import * as React from "react";

// What a screen may require: the packages this app was built with.
export const moduleMap = {
  react: () => require("react"),
  "react/jsx-runtime": () => require("react/jsx-runtime"),
  "react-native": () => require("react-native"),
  "expo-haptics": () => require("expo-haptics"),
  "expo-linear-gradient": () => require("expo-linear-gradient"),
};

export async function fetchScreen(url: string): Promise<React.ReactNode> {
  const response = await fetch(url);
  return evaluate(await response.text(), moduleMap) as React.ReactNode;
}
