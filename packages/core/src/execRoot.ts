import type { Bundle } from "./Bundle.js";

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

/**
 * How an app executes a bundle: as CommonJS, with the modules it provides; or
 * as an ES module, the page's import map providing them.
 */
export type ExecOptions =
  | { readonly format: "cjs"; readonly moduleMap: ModuleMap }
  | { readonly format: "es" };

/**
 * Executes the bundle an app starts from, the one nothing else runs, to its
 * value: as CommonJS, with `require` answered from `moduleMap`, which a
 * React Native app hands it; as an ES module, imported from a `data:` URL,
 * which the page's import map answers. The bundles it runs in turn, with
 * `exec`, get the same modules. Fetching the bundle, and when, is the app's.
 *
 *     const screen = await execRoot(bundle, { format: "cjs", moduleMap });
 */
export async function execRoot<T>(
  bundle: Bundle<T>,
  options: ExecOptions,
): Promise<Awaited<T>> {
  if (options.format === "es") {
    const module: { default: Awaited<T> } = await import(
      "data:text/javascript," + encodeURIComponent(bundle)
    );
    return module.default;
  }
  const { moduleMap } = options;
  const require = (specifier: string): unknown => {
    if (!Object.hasOwn(moduleMap, specifier)) {
      throw new Error(
        `The bundle requires "${specifier}", which this app doesn't provide.`,
      );
    }
    return moduleMap[specifier];
  };
  const module = { exports: {} as unknown };
  new Function("module", "exports", "require", bundle)(
    module,
    module.exports,
    require,
  );
  return module.exports as Awaited<T>;
}
