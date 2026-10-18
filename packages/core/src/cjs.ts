import type { Bundle } from "./Bundle.js";
import type { ModuleMap } from "./modulesOf.js";

/**
 * Executes a CommonJS bundle an app starts from, the one nothing else runs,
 * to its value, with `require` answered from `moduleMap`: how a React Native
 * app runs what its server answers. The bundles it runs in turn, with `exec`,
 * get the same modules. Fetching the bundle, and when, is the app's. The
 * entry an app imports is its format: a web page imports
 * `@backtickjs/core/es`.
 *
 *     const screen = await execRoot(bundle, moduleMap);
 */
export async function execRoot<T>(
  bundle: Bundle<T>,
  moduleMap: ModuleMap,
): Promise<Awaited<T>> {
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
