import type { ModuleMap } from "@backtickjs/core";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";

// What a screen may require: the packages your app is built with.
export const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
} satisfies ModuleMap;
