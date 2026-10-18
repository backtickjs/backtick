import { fileURLToPath } from "node:url";
import { installedModules } from "@backtickjs/builds";
import { bundler } from "@backtickjs/bundler";
import type { Spliceable } from "@backtickjs/core";
import { execRoot } from "@backtickjs/core/cjs";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNativeWeb from "react-native-web";

// What the app's web build provides, as client/moduleMap.ts says, with React
// Native's web build standing in for React Native. Add a stand-in here when
// your module map offers another package.
const modules = installedModules(
  fileURLToPath(new URL("../..", import.meta.url)),
  "web",
);
const moduleMap = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNativeWeb,
};

// A screen, bundled as your server bundles it and run as your app runs it,
// for Testing Library to draw.
export async function drawScreen<T extends Spliceable>(input: T) {
  const bundle = await bundler.build({ input, modules });
  const { code } = bundle.generate({ format: "cjs" });
  return execRoot(code, moduleMap);
}
