import type { Bundle } from "./Bundle.js";
import { execRoot } from "./cjs.js";
import type { ModuleMap } from "./modulesOf.js";

/** What runs an app's bundles: its modules, and the cache they share. */
export interface Runtime {
  /** `bundle`, run with the runtime's modules and cache, to its value. */
  exec<T>(bundle: Bundle<T>): Promise<Awaited<T>>;
}

/**
 * The runtime of an app that provides `moduleMap`: every bundle it runs, and
 * every bundle those run with `$exec`, requires from it, and they share one
 * cache: what a script makes once, made once per runtime and never cleared,
 * as Node's `require.cache`. Nothing is global: two runtimes keep their own.
 *
 *     const runtime = createRuntime(moduleMap);
 *     const screen = await runtime.exec(bundle);
 */
export function createRuntime(moduleMap: ModuleMap): Runtime {
  const cache = new Map<string, unknown>();
  return { exec: (bundle) => execRoot(bundle, moduleMap, cache) };
}
