import * as Haptics from "expo-haptics";
import * as LinearGradient from "expo-linear-gradient";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";

// What a screen may require, as the app imports it: the packages it's built
// with.
export const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
  "expo-haptics": Haptics,
  "expo-linear-gradient": LinearGradient,
};
