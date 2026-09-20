import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type {
  Bundle,
  Http,
  HttpConfig,
  HttpResponse,
  Signal,
  SignalOptions,
  State,
} from "@backtickjs/platform-sdk";
import type { Builtins, Window } from "@backtickjs/web-sdk";
import {
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  untrack,
} from "solid-js";
import type { Instance } from "./Instance.js";
import { compile, scopeOf } from "./compile.js";
import type { Applied } from "./compile.js";

// What this client answers for each name the web provides. A switch rather
// than a table, because an object also answers for names nobody wrote —
// `constructor` is `Object`'s — and only a `case` answers here. Most names are
// the host's own member of the same name; a member of a value takes the value
// first. What a target adds is asked for in `default`, after these.
export function builtinOf(instance: Instance, name: string): ClientValue {
  // A wire name may be anything; `default` is where the rest land.
  const known = name as keyof Builtins;
  switch (known) {
    case "boolean.valueOf":
    case "number.toString":
    case "number.toFixed":
    case "number.toExponential":
    case "number.toPrecision":
    case "number.valueOf":
    case "string.toString":
    case "string.charAt":
    case "string.charCodeAt":
    case "string.codePointAt":
    case "string.concat":
    case "string.indexOf":
    case "string.lastIndexOf":
    case "string.includes":
    case "string.startsWith":
    case "string.endsWith":
    case "string.localeCompare":
    case "string.repeat":
    case "string.slice":
    case "string.split":
    case "string.substring":
    case "string.toLowerCase":
    case "string.toLocaleLowerCase":
    case "string.toUpperCase":
    case "string.toLocaleUpperCase":
    case "string.trim":
    case "string.valueOf":
    case "array.concat":
    case "array.join":
    case "array.slice":
    case "array.indexOf":
    case "array.includes":
    case "array.with":
    case "array.toSorted":
    case "array.toReversed":
    case "array.toSpliced":
    case "string.replace":
    case "array.find":
    case "array.findIndex":
    case "array.map":
    case "array.reduce":
    case "array.filter": {
      const member = known.split(".")[1];
      return (self: Receiver, ...args: ClientValue[]) => self[member](...args);
    }

    // Read where they are named rather than called: see `getters`.
    case "string.length":
    case "array.length":
      return (self: { readonly length: number }) => self.length;

    case "Math.E":
    case "Math.LN10":
    case "Math.LN2":
    case "Math.LOG2E":
    case "Math.LOG10E":
    case "Math.PI":
    case "Math.SQRT1_2":
    case "Math.SQRT2":
    case "Math.abs":
    case "Math.acos":
    case "Math.asin":
    case "Math.atan":
    case "Math.atan2":
    case "Math.ceil":
    case "Math.cos":
    case "Math.exp":
    case "Math.floor":
    case "Math.log":
    case "Math.pow":
    case "Math.random":
    case "Math.round":
    case "Math.sin":
    case "Math.sqrt":
    case "Math.tan":
    case "Math.clz32":
    case "Math.imul":
    case "Math.sign":
    case "Math.log10":
    case "Math.log2":
    case "Math.log1p":
    case "Math.expm1":
    case "Math.cosh":
    case "Math.sinh":
    case "Math.tanh":
    case "Math.acosh":
    case "Math.asinh":
    case "Math.atanh":
    case "Math.hypot":
    case "Math.trunc":
    case "Math.fround":
    case "Math.cbrt":
    case "Array.of":
    case "Number.EPSILON":
    case "Number.isFinite":
    case "Number.isInteger":
    case "Object.entries":
    case "Object.fromEntries":
    case "Object.keys":
    case "String.fromCodePoint":
    case "Array.from":
    case "JSON.parse":
    case "JSON.stringify":
    case "Math.max":
    case "Math.min":
    case "Number.parseFloat":
    case "Number.parseInt": {
      const [prefix, member] = known.split(".");
      return (globalThis as unknown as Namespaces)[prefix][member];
    }

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

    case "http":
      return {
        get: ((url, onResponse, onFailure, config) => {
          void send("GET", url, undefined, onResponse, onFailure, config);
        }) satisfies Http["get"],
        post: ((url, data, onResponse, onFailure, config) => {
          void send("POST", url, data, onResponse, onFailure, config);
        }) satisfies Http["post"],
      } as unknown as Http;

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
      const [kind, member] = name.split(".");
      // A member of a string, number, boolean or array is a language construct:
      // one belongs in the language's schema, so every client answers it, and
      // never in a target's. Refused rather than read as null, which would let
      // a bundle ask for `padStart` and carry on.
      if (
        kind === "string" ||
        kind === "number" ||
        kind === "boolean" ||
        kind === "array"
      ) {
        throw new Error(`a ${kind} has no \`${member}\` in this language`);
      }
      return instance.builtinOf?.(name);
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

// A receiver as a forwarded member reads it: by the member's name, on the
// host's own value.
type Receiver = { readonly [member: string]: Applied };

// The namespaces a name may start with, whose members are delegated to.
interface Namespaces {
  readonly [prefix: string]: { readonly [member: string]: ClientValue };
}

/**
 * The names this client reads rather than calls.
 *
 * Every answer above takes its receiver and answers with a value, so nothing in
 * the switch tells `length` from `trim`. What tells them apart is the schema,
 * which says a getter is applied where its name is read — and how a client acts
 * on that is its own to write down. `globals.test.ts` holds this to the
 * schema, so a name that starts or stops being one is caught there.
 */
export const getters: { readonly [Name in keyof Builtins]?: true } = {
  "string.length": true,
  "array.length": true,
};

// Inside the `try`, so a throw from `onResponse` reaches `onFailure`.
async function send(
  method: string,
  url: string,
  body: string | undefined,
  onResponse: (response: HttpResponse) => void,
  onFailure: (message: string) => void,
  { headers, params, timeout }: HttpConfig = {},
): Promise<void> {
  try {
    const signal = timeout === undefined ? null : AbortSignal.timeout(timeout);
    const response = await fetch(url + query(url, params), {
      method,
      headers,
      body,
      signal,
    });
    onResponse({ status: response.status, data: await response.text() });
  } catch (error) {
    onFailure(error instanceof Error ? error.message : String(error));
  }
}

// `encodeURIComponent` and not `URLSearchParams`, which writes a space as `+`.
function query(url: string, params: HttpConfig["params"]): string {
  const pairs = Object.entries(params ?? {}).map(
    ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
  );
  if (pairs.length === 0) {
    return "";
  }
  return (url.includes("?") ? "&" : "?") + pairs.join("&");
}

// Only when there is one: Solid merges the options over its own, so an
// `equals` of `undefined` would replace its `===` rather than keep it.
function equalsOf<T>(options: SignalOptions<T> | undefined) {
  return options?.equals ? { equals: options.equals } : undefined;
}
