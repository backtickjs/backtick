import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";

// What a screen may require, as your app imports it: the packages it's built
// with. Add one when a screen uses another package, from package.json's
// dependencies: the app sends your server what it offers, at the versions
// it's built with. A platform that differs gets its own file, as
// Metro picks files: moduleMap.web.ts, moduleMap.ios.ts.
export const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
};
