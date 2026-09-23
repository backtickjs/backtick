import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type {
  Bundle,
  Signal,
  SignalOptions,
  State,
} from "@backtickjs/platform-sdk";
import type {
  Builtins,
  RequestInit,
  Response,
  Window,
} from "@backtickjs/web-sdk";
import {
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  untrack,
} from "solid-js";
import type { Instance } from "./Instance.js";
import { compile, scopeOf } from "./compile.js";

// What this client answers for each name the framework and the web provide,
// then what a target adds, then the client's own global.
export function builtinOf(instance: Instance, name: string): ClientValue {
  // A wire name may be anything; `default` is where the rest land.
  const known = name as keyof Builtins;
  switch (known) {
    case "state":
      return ((initial, options) => {
        const [get, store] = createSignal(initial, equalsOf(options));
        // Through Solid's updater form, so a function is stored rather than
        // called.
        const set = (value: typeof initial) => {
          store(() => value);
        };
        // The brand cannot be built by writing the members — that is what stops
        // a script passing a record off as storage — so the client asserts it
        // here, at the one place entitled to.
        return { get, set } as unknown as State<typeof initial>;
      }) satisfies Builtins[typeof known];

    // Solid's memo: computed at once, shared by every reader, and passed on
    // only when it changes.
    case "computed":
      return ((fn, options) => {
        const get = createMemo(fn, undefined, equalsOf(options));
        return { get } as unknown as Signal<ReturnType<typeof fn>>;
      }) satisfies Builtins[typeof known];

    case "onMount":
      return onMount satisfies Builtins[typeof known];

    case "onCleanup":
      return onCleanup satisfies Builtins[typeof known];

    // A bundle drawn with this instance's renderer, and reaching the names this
    // one does, in a new instance of its own: the labels are per bundle, so its
    // `functions` are too. Untracked, as Solid runs a component: what the
    // bundle reads while its root is evaluated is its own setup, and a write to
    // it runs nothing of the caller's again.
    case "evaluate":
      return ((bundle: Bundle<ClientUnknown>) =>
        untrack(() =>
          compile(
            { ...instance, bundle, functions: new Map() },
            bundle.root,
          )(scopeOf(null)),
        )) as ClientValue;

    // Written out rather than the page's window handed over, so a member the
    // schema left out stays left out: a script reading `document` off this
    // finds nothing.
    case "window": {
      return {
        // Only `now`. What ports is the difference between two readings, not the
        // time of day.
        performance: {
          now: () => instance.window.performance.now(),
        },
        // Bound to the host's, so the browser reports the line a call came from
        // rather than this file.
        console: {
          log: (...values: unknown[]) => {
            instance.window.console.log(...values);
          },
          warn: (...values: unknown[]) => {
            instance.window.console.warn(...values);
          },
          error: (...values: unknown[]) => {
            instance.window.console.error(...values);
          },
        },
        // Matched by identity, as in a browser: a closure held in a name and
        // passed twice removes what it added.
        addEventListener: (type: string, listener: unknown) => {
          instance.window.addEventListener(type, listener as never);
        },
        removeEventListener: (type: string, listener: unknown) => {
          instance.window.removeEventListener(type, listener as never);
        },
        postMessage: (message: unknown, targetOrigin: string) => {
          instance.window.postMessage(message, targetOrigin);
        },
        fetch: ((url, onResponse, onFailure, init) => {
          void send(instance, url, onResponse, onFailure, init);
        }) satisfies Window["fetch"],
        // Read through, so what a script reads is where the document is now
        // rather than where it was when this was built.
        location: {
          get href() {
            return instance.window.location.href;
          },
          get origin() {
            return instance.window.location.origin;
          },
          get protocol() {
            return instance.window.location.protocol;
          },
          get host() {
            return instance.window.location.host;
          },
          get hostname() {
            return instance.window.location.hostname;
          },
          get port() {
            return instance.window.location.port;
          },
          get pathname() {
            return instance.window.location.pathname;
          },
          get search() {
            return instance.window.location.search;
          },
          get hash() {
            return instance.window.location.hash;
          },
          assign: (url: string) => {
            instance.window.location.assign(url);
          },
          replace: (url: string) => {
            instance.window.location.replace(url);
          },
          reload: () => {
            instance.window.location.reload();
          },
        },
        // A function and nothing else: a browser handed a string compiles it
        // and runs it, which is `eval` by another name.
        setTimeout: (handler: unknown, timeout?: number) =>
          instance.window.setTimeout(
            assertFunction("setTimeout", handler),
            timeout,
          ),
        clearTimeout: (id: number) => {
          instance.window.clearTimeout(id);
        },
        setInterval: (handler: unknown, timeout?: number) =>
          instance.window.setInterval(
            assertFunction("setInterval", handler),
            timeout,
          ),
        clearInterval: (id: number) => {
          instance.window.clearInterval(id);
        },
        // Cast through the brand, the way `state` is.
      } as unknown as Window;
    }

    default: {
      known satisfies never;
      return (
        instance.builtinOf?.(name) ??
        (globalThis as unknown as { readonly [name: string]: ClientValue })[
          name
        ]
      );
    }
  }
}

// A timer's handler, refused where it is not a function.
function assertFunction(name: string, handler: unknown): () => void {
  if (typeof handler !== "function") {
    throw new Error(`\`window.${name}\` takes a function`);
  }
  return handler as () => void;
}

// Inside the `try`, so a throw from `onResponse` reaches `onFailure`.
async function send(
  instance: Instance,
  url: string,
  onResponse: (response: Response) => void,
  onFailure: (message: string) => void,
  { method, headers, body, timeout }: RequestInit = {},
): Promise<void> {
  try {
    const signal = timeout === undefined ? null : AbortSignal.timeout(timeout);
    const response = await instance.window.fetch(url, {
      method,
      headers,
      body,
      signal,
    });
    const text = await response.text();
    onResponse({ status: response.status, text } as unknown as Response);
  } catch (error) {
    onFailure(error instanceof Error ? error.message : String(error));
  }
}

// Only when there is one: Solid merges the options over its own, so an
// `equals` of `undefined` would replace its `===` rather than keep it.
function equalsOf<T>(options: SignalOptions<T> | undefined) {
  return options?.equals ? { equals: options.equals } : undefined;
}
