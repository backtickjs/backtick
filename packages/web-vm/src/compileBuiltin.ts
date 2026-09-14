import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type {
  Builtins,
  Bundle,
  Http,
  HttpConfig,
  HttpResponse,
  State,
  Vm,
} from "@backtickjs/language";
import { createSignal, untrack } from "solid-js";
import type { Instance } from "./interpreter/Instance.js";
import type { Applied } from "./interpreter/interpret.js";
import { evaluated } from "./interpreter/view.js";

// What this client answers for each name the language provides. A switch rather
// than a table, because an object also answers for names nobody wrote —
// `constructor` is `Object`'s — and only a `case` answers here. Most names are
// the host's own member of the same name; a member of a value takes the value
// first. What an app adds is read after these, at the lookup.
export function compileBuiltin(
  instance: Instance,
  name: string,
): ClientValue | undefined {
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
      return ((initial) => {
        const [read, store] = createSignal(initial);
        const write = (value: typeof initial): ClientValue => {
          store(() => value);
          return null;
        };
        const update = (
          updater: (current: typeof initial) => typeof initial,
        ) => {
          store((previous) => updater(previous));
          return null;
        };
        // The brand cannot be built by writing the members — that is what stops
        // a script passing a record off as storage — so the client asserts it
        // here, at the one place entitled to.
        return { read, write, update } as unknown as State<typeof initial>;
      }) satisfies Builtins[typeof known];

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
    // one does. Untracked, as Solid runs a component: what the bundle reads while
    // its root is evaluated is its own setup, and a write to it runs nothing of
    // the caller's again.
    case "vm":
      return {
        eval: (bundle: Bundle<ClientUnknown>) =>
          untrack(() =>
            evaluated(bundle, instance.renderer, instance.builtins),
          ),
      } as unknown as Vm;

    default:
      known satisfies never;
      return undefined;
  }
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
