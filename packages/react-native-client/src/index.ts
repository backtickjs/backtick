/**
 * What a bundle may import, by specifier, and how this app loads each: a
 * function returning the module, called the first time a bundle requires it.
 * At least React, React Native and React's JSX runtime:
 *
 *     const moduleMap = {
 *       react: () => require("react"),
 *       "react/jsx-runtime": () => require("react/jsx-runtime"),
 *       "react-native": () => require("react-native"),
 *     };
 *
 * What a web page's import map does, for an app: the values are modules,
 * not URLs.
 * Loaded lazily, so a module no screen uses never loads, and Node can read
 * the specifiers without loading React Native.
 */
export type ModuleMap = Readonly<Record<string, () => unknown>>;

// Each map's modules, once loaded: one instance of each, as `require` gives.
const loaded = new WeakMap<ModuleMap, Map<string, unknown>>();

/**
 * A bundle's code, run as CommonJS with `require` answered from `moduleMap`:
 * what it exports, the screen to draw. What a web page's import map and
 * script tag do for a browser, this does for an app; fetching the bundle, and
 * when, is the app's. A bundle requiring a module the app doesn't provide
 * throws.
 */
export function evaluate(code: string, moduleMap: ModuleMap): unknown {
  let modules = loaded.get(moduleMap);
  if (modules === undefined) {
    modules = new Map();
    loaded.set(moduleMap, modules);
  }
  const require = (specifier: string): unknown => {
    if (!Object.hasOwn(moduleMap, specifier)) {
      throw new Error(
        `The bundle requires "${specifier}", which this app doesn't provide.`,
      );
    }
    if (!modules.has(specifier)) {
      modules.set(specifier, moduleMap[specifier]!());
    }
    return modules.get(specifier);
  };
  const module = { exports: {} as unknown };
  new Function("module", "exports", "require", code)(
    module,
    module.exports,
    require,
  );
  return module.exports;
}
