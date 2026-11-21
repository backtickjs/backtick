import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { bundler } from "@backtickjs/bundler";
import { type Client, createRuntime } from "@backtickjs/core";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNativeWeb from "react-native-web";

// A screen as the app draws it: bundled as the server bundles it, then run
// with React Native's web build standing in for React Native. `modules` are
// what else the app provides, each by specifier, at a version.
export async function drawScreen<T>(input: Client<T>, modules: Provided = {}) {
  const { code } = await bundleScreen(input, modules);
  return createRuntime({
    react: React,
    "react/jsx-runtime": JSXRuntime,
    "react-native": ReactNativeWeb,
    ...Object.fromEntries(
      Object.entries(modules).map(([name, { module }]) => [name, module]),
    ),
  }).exec(code);
}

type Provided = Record<string, { version: string; module: unknown }>;

// The bundle the server sends for a screen.
export async function bundleScreen<T>(
  input: Client<T>,
  modules: Provided = {},
) {
  const bundle = await bundler.build({
    input,
    modules: {
      react: "19.2.3",
      "react/jsx-runtime": "19.2.3",
      "react-native": "0.86.3",
      ...Object.fromEntries(
        Object.entries(modules).map(([name, { version }]) => [name, version]),
      ),
    },
  });
  return bundle.generate({ format: "cjs" });
}

// The bundle a page shows beside its example is the one the bundler writes:
// written with `UPDATE=1`, checked otherwise.
export async function assertBundle(
  file: URL,
  input: Client<unknown>,
): Promise<string> {
  const { code } = await bundleScreen(input);
  if (process.env.UPDATE) {
    writeFileSync(file, code);
  }
  assert.equal(readFileSync(file, "utf8"), code);
  return code;
}
