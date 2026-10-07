import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { type BuildOptions, bundler } from "@backtickjs/bundler";
import { evaluate } from "@backtickjs/react-native-client";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNativeWeb from "react-native-web";

// A screen as the app draws it: bundled as the server bundles it, then run
// with React Native's web build standing in for React Native. `packages` are
// what else the app provides, each a module at a version.
export async function drawScreen(
  input: BuildOptions["input"],
  packages: Packages = {},
): Promise<React.ReactNode> {
  const { code } = await bundleScreen(input, packages);
  return evaluate(code, {
    react: React,
    "react/jsx-runtime": JSXRuntime,
    "react-native": ReactNativeWeb,
    ...Object.fromEntries(
      Object.entries(packages).map(([name, { module }]) => [name, module]),
    ),
  }) as React.ReactNode;
}

type Packages = Record<string, { version: string; module: unknown }>;

// The bundle the server sends for a screen.
export async function bundleScreen(
  input: BuildOptions["input"],
  packages: Packages = {},
) {
  const bundle = await bundler.build({
    input,
    packageVersions: {
      react: "19.2.3",
      "react-native": "0.86.3",
      ...Object.fromEntries(
        Object.entries(packages).map(([name, { version }]) => [name, version]),
      ),
    },
  });
  return bundle.generate({ format: "cjs" });
}

// The bundle a page shows beside its example is the one the bundler writes:
// written with `UPDATE=1`, checked otherwise.
export async function assertBundle(
  file: URL,
  input: BuildOptions["input"],
): Promise<string> {
  const { code } = await bundleScreen(input);
  if (process.env.UPDATE) {
    writeFileSync(file, code);
  }
  assert.equal(readFileSync(file, "utf8"), code);
  return code;
}
