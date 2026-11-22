import { createRuntime } from "@backtickjs/core";
import Constants from "expo-constants";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";
import installedPackages from "../installed-packages.json";

// Your server, on the computer running Expo.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
export const origin = `http://${host}:3000`;

// Fetches and runs your server's screens.
export const backtick = createRuntime({
  // The packages a screen may use. Add one here when a screen imports it.
  moduleMap: {
    react: React,
    "react/jsx-runtime": JSXRuntime,
    "react-native": ReactNative,
  },
  // Their versions, written by `npm install`.
  installedPackages,
});
