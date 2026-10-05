import { type ReactNode, useEffect, useState } from "react";

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
 *       react: React,
 *       "react/jsx-runtime": JSXRuntime,
 *       "react-native": ReactNative,
 *     };
 */
export type Modules = Readonly<Record<string, unknown>>;

/**
 * A bundle's code, run as CommonJS with `require` answered from `modules`:
 * what it exports. A bundle requiring a module the app doesn't provide throws.
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

export interface BacktickProps {
  /** Where the server answers with a bundle, as CommonJS. */
  readonly url: string;
  /** What the bundle may require. Read once a bundle arrives. */
  readonly modules: Modules;
  /**
   * The packages `modules` come from, each at its exact version:
   * `{ react: "19.2.3", "react-native": "0.86.3" }`. Sent with the request,
   * as the `backtick-package-versions` header, for the server to bundle for.
   */
  readonly packageVersions: Readonly<Record<string, string>>;
  /** The request's options: headers, credentials. */
  readonly init?: RequestInit;
  /** Drawn while the bundle loads. */
  readonly fallback?: ReactNode;
}

type Loaded =
  | { readonly status: "loading" }
  | { readonly status: "drawn"; readonly node: ReactNode }
  | { readonly status: "failed"; readonly error: unknown };

/**
 * A server's screen: the bundle at `url`, fetched, run with the app's
 * modules, and drawn where this stands. A new `url` loads again. A bundle that
 * can't be loaded or run throws where this is drawn, for an error boundary
 * above it to catch, as any component's error is.
 */
export function Backtick({
  url,
  modules,
  packageVersions,
  init,
  fallback = null,
}: BacktickProps): ReactNode {
  const [loaded, setLoaded] = useState<Loaded>({ status: "loading" });
  useEffect(() => {
    let current = true;
    setLoaded({ status: "loading" });
    const headers = new Headers(init?.headers);
    headers.set("backtick-package-versions", JSON.stringify(packageVersions));
    fetch(url, { ...init, headers })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`${url} answered ${response.status}.`);
        }
        return evaluate(await response.text(), modules) as ReactNode;
      })
      .then(
        (node) => current && setLoaded({ status: "drawn", node }),
        (error: unknown) => current && setLoaded({ status: "failed", error }),
      );
    return () => {
      current = false;
    };
    // A new address is a new screen; the modules, versions and options are the
    // app's, fixed for its life.
  }, [url]);
  if (loaded.status === "failed") {
    throw loaded.error;
  }
  return loaded.status === "drawn" ? loaded.node : fallback;
}
