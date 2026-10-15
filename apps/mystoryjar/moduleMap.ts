import * as GoogleSignIn from "@react-native-google-signin/google-signin";
import * as Navigation from "@react-navigation/native";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import * as FileSystem from "expo-file-system";
import * as Font from "expo-font";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";
import * as Facebook from "react-native-fbsdk-next";
import * as SafeArea from "react-native-safe-area-context";
import * as Svg from "react-native-svg";

/**
 * What a screen may require on iOS and Android, as the app imports it:
 * `moduleMap.web.ts` is the web's. Imports and a table, nothing else: Node
 * reads it without running it, to name the modules each build carries.
 */
export const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
  "@react-navigation/native": Navigation,
  "expo-secure-store": SecureStore,
  "expo-font": Font,
  "react-native-svg": Svg,
  "react-native-safe-area-context": SafeArea,
  "expo-apple-authentication": AppleAuthentication,
  "expo-crypto": Crypto,
  "@react-native-google-signin/google-signin": GoogleSignIn,
  "react-native-fbsdk-next": Facebook,
  "expo-image-picker": ImagePicker,
  "expo-file-system": FileSystem,
};
