import { type BuildOptions, bundler } from "@backtickjs/bundler";
import { evaluate } from "@backtickjs/react-native-client";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNativeWeb from "react-native-web";

// A screen as the app draws it: bundled as the server bundles it, then run
// with React Native's web build standing in for React Native.
export async function drawScreen(
  input: BuildOptions["input"],
): Promise<React.ReactNode> {
  const { code } = await bundleScreen(input);
  return evaluate(code, {
    react: React,
    "react/jsx-runtime": JSXRuntime,
    "react-native": ReactNativeWeb,
  }) as React.ReactNode;
}

// The bundle the server sends for a screen.
export async function bundleScreen(input: BuildOptions["input"]) {
  const bundle = await bundler.build({
    input,
    packageVersions: { react: "19.2.3", "react-native": "0.86.3" },
  });
  return bundle.generate({ format: "cjs" });
}
