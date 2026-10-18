// What the app imports: nothing of Node, so its bundler can take it.
import type { Modules } from "@backtickjs/bundler";

// The package a module specifier is in: `react` for `react/jsx-runtime`.
function packageOf(specifier: string): string {
  const segments = specifier.split("/");
  return segments.slice(0, specifier.startsWith("@") ? 2 : 1).join("/");
}

/**
 * The modules `moduleMap` offers, each at the version in `packages` of the
 * package it comes from: what the app sends however it reaches its server, a
 * header, a GraphQL variable, for the server to bundle screens it can run.
 * The `@backtickjs/builds/expo` config plugin puts the installed versions of
 * the app's dependencies in the app config. Throws as the app starts without
 * them, or for a module from a package that isn't a dependency.
 *
 *     const modules = modulesOf(
 *       moduleMap,
 *       Constants.expoConfig?.extra?.backtick?.packages,
 *     );
 */
export function modulesOf(
  moduleMap: object,
  packages: Readonly<Record<string, string>> | undefined,
): Modules {
  if (packages === undefined) {
    throw new Error(
      "No packages in the app config: is @backtickjs/builds/expo in app.json's plugins?",
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
