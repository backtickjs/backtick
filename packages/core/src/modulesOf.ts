/**
 * What a bundle may import, by specifier: each the module the app imported
 * for it. What a web page's import map does, for an app, with modules for
 * values instead of URLs:
 *
 *     import * as React from "react";
 *     import * as JSXRuntime from "react/jsx-runtime";
 *     import * as ReactNative from "react-native";
 *
 *     export const moduleMap = {
 *       react: React,
 *       "react/jsx-runtime": JSXRuntime,
 *       "react-native": ReactNative,
 *     };
 */
export type ModuleMap = Readonly<Record<string, unknown>>;

// The package a module specifier is in: `react` for `react/jsx-runtime`.
function packageOf(specifier: string): string {
  const segments = specifier.split("/");
  return segments.slice(0, specifier.startsWith("@") ? 2 : 1).join("/");
}

/**
 * The modules `moduleMap` offers, each at the version in `packages` of the
 * package it comes from: what the app sends however it reaches its server, a
 * header, a GraphQL variable, for the server to bundle screens it can run.
 * An Expo app passes them from its config, where `app.config.ts` puts
 * `installedPackages(projectRoot)`. Throws as the app starts without them, or
 * for a module from a package that isn't a dependency.
 *
 *     const modules = modulesOf(
 *       moduleMap,
 *       Constants.expoConfig?.extra?.backtick?.packages,
 *     );
 */
export function modulesOf(
  moduleMap: ModuleMap,
  packages: Readonly<Record<string, string>> | null | undefined,
): Record<string, string> {
  if (packages == null) {
    throw new Error(
      "No packages: does app.config.ts put installedPackages(projectRoot) in the config's extra?",
    );
  }
  return Object.fromEntries(
    Object.keys(moduleMap).map((specifier) => {
      const version = packages[packageOf(specifier)];
      if (version === undefined) {
        throw new Error(
          `The module map offers ${JSON.stringify(specifier)}, but ${packageOf(specifier)} isn't in package.json's dependencies.`,
        );
      }
      return [specifier, version];
    }),
  );
}
