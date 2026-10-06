/**
 * What a bundle may require, by specifier: the packages the app was built
 * with, each as its module. At least React, React Native and React's JSX
 * runtime:
 *
 *     import * as React from "react";
 *     import * as JSXRuntime from "react/jsx-runtime";
 *     import * as ReactNative from "react-native";
 *
 *     const modules = {
 *       "react": React,
 *       "react/jsx-runtime": JSXRuntime,
 *       "react-native": ReactNative,
 *     };
 */
export type Modules = Readonly<Record<string, unknown>>;

/**
 * A bundle's code, run as CommonJS with `require` answered from `modules`:
 * what it exports, the screen to draw. What a web page's import map and
 * script tag do for a browser, this does for an app; fetching the bundle, and
 * when, is the app's. A bundle requiring a module the app doesn't provide
 * throws.
 */
export function evaluate(code: string, modules: Modules): unknown {
  const module = { exports: {} as unknown };
  const require = (specifier: string): unknown => {
    if (!Object.hasOwn(modules, specifier)) {
      throw new Error(
        `The bundle requires "${specifier}", which this app doesn't provide.`,
      );
    }
    return modules[specifier];
  };
  new Function("module", "exports", "require", code)(
    module,
    module.exports,
    require,
  );
  return module.exports;
}
