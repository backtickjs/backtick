import * as ExpoRouter from "expo-router";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";
import * as SafeAreaContext from "react-native-safe-area-context";
import * as AsyncStorage from "@react-native-async-storage/async-storage";
import * as VectorIcons from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as ExpoImage from "expo-image";
import * as LinearGradient from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import * as Svg from "react-native-svg";

// What a screen may require, as your app imports it: the packages it's built
// with. Add one when a screen uses another package, from package.json's
// dependencies: the app sends your server what it offers, at the versions
// it's built with. A platform that differs gets its own file, as
// Metro picks files: moduleMap.web.ts, moduleMap.ios.ts.
export const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
  "expo-router": ExpoRouter,
  "react-native-safe-area-context": SafeAreaContext,
  "@react-native-async-storage/async-storage": AsyncStorage,
  "@expo/vector-icons": VectorIcons,
  "expo-haptics": Haptics,
  "expo-image": ExpoImage,
  "expo-linear-gradient": LinearGradient,
  "expo-clipboard": Clipboard,
  "react-native-svg": Svg,
};
