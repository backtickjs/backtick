import * as ReactQuery from "@tanstack/react-query";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";

// What a screen may require, as your app imports it: the packages it's built
// with. Add one when a screen uses another package. Imports and a table,
// nothing else: the server reads it, without running it, to know what each
// build of your app carries. A platform that differs gets its own file, as
// Metro picks files: moduleMap.web.ts, moduleMap.ios.ts.
export const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
  // the queries and mutations screens send the server: see connection.ts
  "@tanstack/react-query": ReactQuery,
};
