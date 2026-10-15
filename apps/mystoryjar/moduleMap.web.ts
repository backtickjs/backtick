import * as Navigation from "@react-navigation/native";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import * as Font from "expo-font";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";
import * as SafeArea from "react-native-safe-area-context";
import * as Svg from "react-native-svg";
import * as FileSystem from "./fileSystem.web";
import * as SecureStore from "./secureStore.web";

/**
 * What a screen may require on the web, as `moduleMap.ts` is for iOS and
 * Android: stand-ins for SecureStore and FileSystem, which have no web
 * build, and no Google or Facebook sign-in, whose SDKs are native.
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
  "expo-image-picker": ImagePicker,
  "expo-file-system": FileSystem,
};
