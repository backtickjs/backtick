import * as Fiber from "@react-three/fiber/native";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";

// What a screen may require, as the app imports it: the packages it's built
// with. Imports and a table, nothing else: the server reads it, without
// running it, to know what each build of the app carries. On the web,
// moduleMap.web.ts stands in.
export const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
  "@react-three/fiber/native": Fiber,
};
