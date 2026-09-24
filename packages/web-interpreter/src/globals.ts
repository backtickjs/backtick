import type { Signal, SignalOptions, State } from "@backtickjs/platform-sdk";
import type { Builtins } from "@backtickjs/web-sdk";
import { createMemo, createSignal, onCleanup, onMount } from "solid-js";
import type { Renderer } from "solid-js/universal";
import { createJsx } from "./draw.js";

/** What a client is wired to. */
export interface ClientOptions {
  /** The page's window, whose document every bundle is drawn into. */
  readonly window: typeof window;

  /**
   * The app's own globals, defined beside the web's: what a bundle reads by
   * the name an app's `createBuiltin` gave it.
   */
  readonly globals?: { readonly [name: string]: unknown };

  /**
   * The global object bundles read, the window's where left out. A bundle
   * evaluated in another realm, as a test runner's is, reads that realm's.
   */
  readonly global?: object;
}

/**
 * Defines the web client's globals on `global`: the framework's builtins,
 * `jsx`, which is what a bundle draws with, and the app's own. Everything else a bundle
 * names, `window` and ECMAScript's among it, is the realm's.
 */
export function defineGlobals(
  renderer: Renderer<object>,
  global: object,
  globals: { readonly [name: string]: unknown } = {},
): void {
  const web = {
    // Through Solid's updater form, so a function is stored rather than
    // called. The brand cannot be built by writing the members — that is what
    // stops a script passing a record off as storage — so the client asserts
    // it here, at the one place entitled to.
    state: ((initial, options) => {
      const [get, store] = createSignal(initial, equalsOf(options));
      const set = (value: typeof initial) => {
        store(() => value);
      };
      return { get, set } as unknown as State<typeof initial>;
    }) satisfies Builtins["state"],

    // Solid's memo: computed at once, shared by every reader, and passed on
    // only when it changes.
    computed: ((fn, options) => {
      const get = createMemo(fn, undefined, equalsOf(options));
      return { get } as unknown as Signal<ReturnType<typeof fn>>;
    }) satisfies Builtins["computed"],

    onMount: onMount satisfies Builtins["onMount"],
    onCleanup: onCleanup satisfies Builtins["onCleanup"],

    jsx: createJsx(renderer),
  };
  Object.assign(global, web, globals);
}

// Only when there is one: Solid merges the options over its own, so an
// `equals` of `undefined` would replace its `===` rather than keep it.
function equalsOf<T>(options: SignalOptions<T> | undefined) {
  return options?.equals ? { equals: options.equals } : undefined;
}
