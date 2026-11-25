import type { Bundle, BundleResponse } from "./Bundle.js";

export interface RuntimeOptions {
  // the modules a bundle may require
  readonly moduleMap: Readonly<Record<string, unknown>>;
  // each package's installed version
  readonly installedPackages: Readonly<Record<string, string>>;
  // sends requests; the global `fetch` by default
  readonly fetch?: (request: Request) => Response | Promise<Response>;
}

/**
 * Runs an app's bundles. Made by `createRuntime`; it may gain members, and
 * its methods don't use `this`.
 */
export interface Runtime {
  /** Each module it provides, at its package's version. */
  readonly modules: Readonly<Record<string, string>>;
  /**
   * Runs `bundle` and returns its value. Throws a `TypeError` for text that
   * isn't a bundle, one that doesn't start with `"use strict";`, as the
   * bundler writes every bundle: an error page, JSON, an empty body.
   */
  exec<T>(bundle: Bundle<T>): Promise<Awaited<T>>;
  /**
   * `fetch`, plus the `x-backtick-modules` header. Its body is typed as a
   * bundle that runs to a `T`, as the caller says: nothing checks it.
   */
  fetch<T = unknown>(
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<BundleResponse<T>>;
  /** A new runtime with the same modules and `fetch`, and its own cache. */
  create(): Runtime;
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
 *     const response = await runtime.fetch<ReactNode>(origin);
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
      if (!bundle.startsWith('"use strict";')) {
        throw new TypeError(
          `Not a bundle: it doesn't start with "use strict";. It starts ${JSON.stringify(bundle.slice(0, 80))}.`,
        );
      }
      const module = { exports: {} as unknown, cache, runtime };
      new Function("module", "exports", "require", bundle)(
        module,
        module.exports,
        require,
      );
      return module.exports as Awaited<T>;
    },
    async fetch<T>(input: RequestInfo | URL, init?: RequestInit) {
      const request = new Request(input, init);
      request.headers.set("x-backtick-modules", JSON.stringify(modules));
      return (await transport(request)) as BundleResponse<T>;
    },
    create: () => createRuntime(options),
  };
  return runtime;
}

// Each module in `moduleMap`, at its package's installed version.
function versionsOf(
  moduleMap: Readonly<Record<string, unknown>>,
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
function requireFrom(
  moduleMap: Readonly<Record<string, unknown>>,
): (specifier: string) => unknown {
  return (specifier) => {
    if (!Object.hasOwn(moduleMap, specifier)) {
      throw new Error(
        `The bundle requires "${specifier}", which this app doesn't provide.`,
      );
    }
    return moduleMap[specifier];
  };
}
