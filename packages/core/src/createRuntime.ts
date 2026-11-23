import type { Bundle } from "./Bundle.js";

// What a bundle may import, by specifier.
export type ModuleMap = Readonly<Record<string, unknown>>;

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
  /** Each module it provides, at its package's version. */
  readonly modules: Readonly<Record<string, string>>;
  /** Runs `bundle` and returns its value. */
  exec<T>(bundle: Bundle<T>): Promise<Awaited<T>>;
  /** `fetch`, plus the `x-backtick-modules` header. */
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

/**
 * A runtime for an app's bundles. Its bundles share one cache, so a value a
 * script makes once is made once per runtime. `moduleMap` is what its bundles
 * may import, by specifier, as a web page's import map, with modules for
 * values instead of URLs. Throws if a module's package has no version.
 *
 *     import * as React from "react";
 *     import * as JSXRuntime from "react/jsx-runtime";
 *     import * as ReactNative from "react-native";
 *     import installedPackages from "../installed-packages.json";
 *
 *     const runtime = createRuntime({
 *       moduleMap: {
 *         react: React,
 *         "react/jsx-runtime": JSXRuntime,
 *         "react-native": ReactNative,
 *       },
 *       installedPackages,
 *     });
 *     const response = await runtime.fetch(origin);
 *     const screen = await runtime.exec(await response.text());
 */
export function createRuntime(options: RuntimeOptions): Runtime {
  const { moduleMap } = options;
  const cache = new Map<string, unknown>();
  const modules = versionsOf(moduleMap, options.installedPackages);
  const require = requireFrom(moduleMap);
  const transport = options.fetch ?? ((request) => globalThis.fetch(request));

  // Handed to every bundle it runs, as `module.runtime`: a script's `$runtime`.
  const runtime: Runtime = {
    modules,
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

// Each module in `moduleMap`, at its package's installed version.
function versionsOf(
  moduleMap: ModuleMap,
  installedPackages: Readonly<Record<string, string>>,
): Record<string, string> {
  return Object.fromEntries(
    Object.keys(moduleMap).map((specifier) => {
      const version = installedPackages[packageOf(specifier)];
      if (version === undefined) {
        throw new Error(
          `The module map offers ${JSON.stringify(specifier)}, but ${packageOf(specifier)} isn't in package.json's dependencies.`,
        );
      }
      return [specifier, version];
    }),
  );
}

// The package a module is in: `react` for `react/jsx-runtime`.
function packageOf(specifier: string): string {
  return specifier
    .split("/")
    .slice(0, specifier.startsWith("@") ? 2 : 1)
    .join("/");
}

// A bundle's `require`, answered from `moduleMap`.
function requireFrom(moduleMap: ModuleMap): (specifier: string) => unknown {
  return (specifier) => {
    if (!Object.hasOwn(moduleMap, specifier)) {
      throw new Error(
        `The bundle requires "${specifier}", which this app doesn't provide.`,
      );
    }
    return moduleMap[specifier];
  };
}
