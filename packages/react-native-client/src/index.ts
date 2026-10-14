/**
 * What a bundle may import, by specifier: each the module the app imported
 * for it. What a web page's import map does, for an app, with modules for
 * values instead of URLs. At least React, React Native and React's JSX
 * runtime:
 *
 *     import * as React from "react";
 *     import * as JSXRuntime from "react/jsx-runtime";
 *     import * as ReactNative from "react-native";
 *
 *     export const moduleMap = {
 *       react: React,
 *       "react/jsx-runtime": JSXRuntime,
 *       "react-native": ReactNative,
 *     } satisfies ModuleMap;
 *
 * Imported as the app starts, so a module that fails to load fails then, not
 * on the first screen that needs it.
 */
export type ModuleMap = Readonly<Record<string, unknown>>;

/**
 * A bundle's code, run as CommonJS with `require` answered from `moduleMap`:
 * what it exports, the screen to draw. What a web page's import map and
 * script tag do for a browser, this does for an app; fetching the bundle, and
 * when, is the app's. A bundle requiring a module the app doesn't provide
 * throws.
 */
export function evaluate(code: string, moduleMap: ModuleMap): unknown {
  const require = (specifier: string): unknown => {
    if (!Object.hasOwn(moduleMap, specifier)) {
      throw new Error(
        `The bundle requires "${specifier}", which this app doesn't provide.`,
      );
    }
    return moduleMap[specifier];
  };
  const module = { exports: {} as unknown };
  new Function("module", "exports", "require", code)(
    module,
    module.exports,
    require,
  );
  return module.exports;
}

/**
 * This build's id on `platform`, from the app config's `extra`, where the
 * `@backtickjs/builds/expo` config plugin puts `buildIds`: it names the
 * modules the build carries, for the server to bundle screens it can run.
 * Send it however the app reaches its server: a header, a GraphQL variable.
 * Throws for an app config without it, as the app starts: no screen could be
 * drawn for a build without an id.
 *
 *     const buildId = buildIdFrom(Constants.expoConfig?.extra, Platform.OS);
 */
export function buildIdFrom(extra: unknown, platform: string): string {
  const ids = (extra as { buildIds?: Record<string, unknown> } | undefined)
    ?.buildIds;
  const id = ids?.[platform];
  if (typeof id !== "string") {
    throw new Error(
      `No build id for ${platform} in the app config: is @backtickjs/builds/expo in app.json's plugins?`,
    );
  }
  return id;
}
