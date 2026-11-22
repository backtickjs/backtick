import { bundler } from "@backtickjs/bundler";
import { type Client, modulesOf, createRuntime } from "@backtickjs/core";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNativeWeb from "react-native-web";
import installedPackages from "../../installed-packages.json" with { type: "json" };

// What the app's web build provides, as client/backtick.ts says, with React
// Native's web build standing in for React Native. Add a stand-in here when
// your module map offers another package.
const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNativeWeb,
};
// at the versions the app sends
const modules = modulesOf(moduleMap, installedPackages);

// A screen, bundled as your server bundles it and run as your app runs it,
// for Testing Library to draw.
export async function drawScreen<T>(input: Client<T>) {
  const bundle = await bundler.build({ input, modules });
  const { code } = bundle.generate();
  return createRuntime({ moduleMap, installedPackages }).exec(code);
}
