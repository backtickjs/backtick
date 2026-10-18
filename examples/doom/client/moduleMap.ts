import * as Fiber from "@react-three/fiber/native";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";

// What a screen may require, as the app imports it: the packages it's built
// with, from package.json's dependencies: the app sends the server what it
// offers, at the versions it's built with. On the web, moduleMap.web.ts
// stands in.
export const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
  "@react-three/fiber/native": Fiber,
};
