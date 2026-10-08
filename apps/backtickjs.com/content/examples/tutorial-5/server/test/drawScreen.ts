import { createRequire } from "node:module";
import { bundler } from "@backtickjs/bundler";
import type { Spliceable } from "@backtickjs/core";
import { evaluate } from "@backtickjs/react-native-client";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNativeWeb from "react-native-web";

// What the app provides, as `server/index.tsx` and `App.tsx` say, with React
// Native's web build standing in for React Native. Add a package here when
// your app provides one.
const require = createRequire(import.meta.url);
const packageVersions = {
  react: require("react/package.json").version,
  "react-native": require("react-native/package.json").version,
};
const modules = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNativeWeb,
};

// A screen, bundled as your server bundles it and run as your app runs it,
// for Testing Library to draw.
export async function drawScreen(input: Spliceable): Promise<React.ReactNode> {
  const bundle = await bundler.build({ input, packageVersions });
  const { code } = bundle.generate({ format: "cjs" });
  return evaluate(code, modules) as React.ReactNode;
}
