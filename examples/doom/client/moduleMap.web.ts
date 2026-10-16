import * as Fiber from "@react-three/fiber";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";

// What a screen may require on the web, as `moduleMap.ts` is for iOS and
// Android: R3F's own web build answers for `@react-three/fiber/native`, as it
// draws to a canvas without expo-gl, so the server sends both the same bundle.
export const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
  "@react-three/fiber/native": Fiber,
};
