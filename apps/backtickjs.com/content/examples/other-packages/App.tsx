import { evaluate } from "@backtickjs/react-native-client";
import * as ExpoHaptics from "expo-haptics";
import * as ExpoLinearGradient from "expo-linear-gradient";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";

// What a screen may require: the packages this app was built with.
export const modules = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
  "expo-haptics": ExpoHaptics,
  "expo-linear-gradient": ExpoLinearGradient,
};

export async function fetchScreen(url: string): Promise<React.ReactNode> {
  const response = await fetch(url);
  return evaluate(await response.text(), modules) as React.ReactNode;
}
