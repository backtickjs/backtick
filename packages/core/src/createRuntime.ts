import type { Bundle } from "./Bundle.js";
import { type ModuleMap, modulesOf } from "./modulesOf.js";

export interface RuntimeOptions {
  // the modules a bundle may require
  readonly moduleMap: ModuleMap;
  // each package's installed version
  readonly installedPackages: Readonly<Record<string, string>>;
  // sends requests; the global `fetch` by default. Swap it to add auth
  // headers, or to call a server's `app.fetch` directly.
  readonly fetch?: (request: Request) => Response | Promise<Response>;
}

/**
 * Runs an app's bundles. Made by `createRuntime`; it may gain members, and
 * its methods don't use `this`.
 */
export interface Runtime {
  /** Runs `bundle` and returns its value. */
  exec<T>(bundle: Bundle<T>): Promise<Awaited<T>>;
  /**
   * `fetch`, with the `x-backtick-modules` header the server bundles for.
   * Nothing else changes: it resolves whatever the status.
   */
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

/**
 * A runtime for an app's bundles. Its bundles share one cache, so a value a
 * script makes once is made once per runtime. Throws if a module's package
 * has no version.
 *
 *     const runtime = createRuntime({ moduleMap, installedPackages });
 *     const response = await runtime.fetch(origin);
 *     const screen = await runtime.exec(await response.text());
 */
export function createRuntime(options: RuntimeOptions): Runtime {
  const { moduleMap } = options;
  const cache = new Map<string, unknown>();
  const modules = modulesOf(moduleMap, options.installedPackages);
  const transport = options.fetch ?? ((request) => globalThis.fetch(request));
  const require = (specifier: string): unknown => {
    if (!Object.hasOwn(moduleMap, specifier)) {
      throw new Error(
        `The bundle requires "${specifier}", which this app doesn't provide.`,
      );
    }
    return moduleMap[specifier];
  };

  // Handed to every bundle it runs, as `module.runtime`: a script's `$runtime`.
  const runtime: Runtime = {
    async exec<T>(bundle: Bundle<T>): Promise<Awaited<T>> {
      const module = { exports: {} as unknown, cache, runtime };
      new Function("module", "exports", "require", bundle)(
        module,
        module.exports,
        require,
      );
      return module.exports as Awaited<T>;
    },
    async fetch(input, init) {
      const request = new Request(input, init);
      request.headers.set("x-backtick-modules", JSON.stringify(modules));
      return transport(request);
    },
  };
  return runtime;
}
