import type { Bundle } from "./Bundle.js";
import { execRoot } from "./cjs.js";
import type { ModuleMap } from "./modulesOf.js";

/** What runs an app's bundles: its modules, and the values they share. */
export interface Runtime {
  /** `bundle`, run with the runtime's modules and values, to its value. */
  exec<T>(bundle: Bundle<T>): Promise<Awaited<T>>;
}

/**
 * The runtime of an app that provides `moduleMap`: every bundle it runs, and
 * every bundle those run with `$exec`, requires from it, and they share one
 * set of values, each made once per runtime. Nothing is global: two runtimes
 * keep their own.
 *
 *     const runtime = createRuntime(moduleMap);
 *     const screen = await runtime.exec(bundle);
 */
export function createRuntime(moduleMap: ModuleMap): Runtime {
  const values = new Map<string, unknown>();
  return { exec: (bundle) => execRoot(bundle, moduleMap, values) };
}
