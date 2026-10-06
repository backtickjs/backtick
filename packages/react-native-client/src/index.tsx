import { type ReactNode, use, useEffect, useRef } from "react";

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
}

// The requests under way, by address, until a `<Backtick>` shows what one
// fetched: a component that suspends before it first shows keeps no state, so
// the render that resumes finds its request here. A failure stays, so that
// render sees it and throws it; to retry, `invalidate` first, as an error
// boundary's reset does.
const requests = new Map<string, Promise<ReactNode>>();

function load({
  url,
  modules,
  packageVersions,
  init,
}: BacktickProps): Promise<ReactNode> {
  let request = requests.get(url);
  if (request === undefined) {
    const headers = new Headers(init?.headers);
    headers.set("backtick-package-versions", JSON.stringify(packageVersions));
    request = fetch(url, { ...init, headers }).then(async (response) => {
      if (!response.ok) {
        throw new Error(`${url} answered ${response.status}.`);
      }
      return evaluate(await response.text(), modules) as ReactNode;
    });
    requests.set(url, request);
  }
  return request;
}

/**
 * Starts loading the screen at `url`, so the next `<Backtick>` drawn with the
 * same props finds it under way or done. A failure isn't reported here: the
 * `<Backtick>` that draws the screen throws it.
 */
export function preload(props: BacktickProps): void {
  load(props).catch(() => {});
}

/**
 * Forgets the request for `url`, under way or failed, so the next
 * `<Backtick>` or `preload` fetches it again: what an error boundary's reset
 * calls to retry.
 */
export function invalidate(url: string): void {
  requests.delete(url);
}

/**
 * A server's screen: the bundle at `url`, fetched, run with the app's modules,
 * and drawn where this stands. Each `<Backtick>` fetches its own, nothing is
 * cached: the screen is kept while it's shown, and fetched again when a new
 * one is drawn or `url` changes. It suspends while the screen loads, for a
 * `<Suspense>` above it to show a fallback, and throws a screen that can't be
 * loaded or run, for an error boundary above it to catch.
 */
export function Backtick(props: BacktickProps): ReactNode {
  const shown = useRef<{ url: string; screen: Promise<ReactNode> }>(null);
  const screen =
    shown.current?.url === props.url ? shown.current.screen : load(props);
  useEffect(() => {
    shown.current = { url: props.url, screen };
    if (requests.get(props.url) === screen) {
      requests.delete(props.url);
    }
  }, [props.url, screen]);
  return use(screen);
}
