import type { ClientArray } from "./ClientArray.js";
import type { ArrayConstructor, Math } from "./globals.js";
import type { ClientFunction } from "./ClientFunction.js";
import type { ClientBoolean } from "./ClientBoolean.js";
import type { JsxElement } from "./JsxElement.js";
import type { ClientNumber } from "./ClientNumber.js";
import type { ClientString } from "./ClientString.js";
import type { ClientValue } from "./ClientValue.js";

// A built-in receiver autoboxes to its client type
type Autoboxed<T> = T extends string
  ? ClientString
  : T extends number
    ? ClientNumber
    : T extends boolean
      ? ClientBoolean
      : T extends readonly (infer E)[]
        ? ClientArray<E>
        : never;

// A plain object's members as a script reads them: `?` means omittable —
// an absent member reads as `null`, so an optional member's `undefined`
// never surfaces; a required member reads unchanged.
type ReadMembers<T extends object> = {
  [K in keyof T]-?: {} extends Pick<T, K>
    ? Exclude<T[K], undefined> | null
    : T[K];
};

// The globals a script may reach without binding one, as the typechecker sees
// them before `Receiver` narrows each to what this language admits of it. The
// lib type is the whole of JavaScript's `Math`; `ClientMath` is the part of it
// every host can agree on.
export type ClientGlobal = typeof globalThis.Math | typeof globalThis.Array;

// What a client view may be indexed by: an array by number and nothing else,
// anything else by the keys its own type names. Naming the array case rather
// than leaving it to `keyof` keeps the answer to a bad key a clean one — the
// key was meant to be a number — instead of the whole member list.
export type IndexKey<R> = R extends ClientArray<any> ? number : keyof R;

// What a member-access receiver reads as:
//   string | number | boolean | E[] -> Autoboxed<T>, the client API
//   JsxElement                      -> {}: opaque
//   plain object                    -> ReadMembers<T>
//   anything else                   -> unchanged
export type Receiver<T extends ClientValue | ClientGlobal> =
  T extends typeof globalThis.Math
    ? Math
    : T extends typeof globalThis.Array
      ? ArrayConstructor
      : T extends string | number | boolean | readonly unknown[]
        ? Autoboxed<T>
        : T extends JsxElement
          ? {}
          : T extends ClientFunction
            ? T
            : T extends object
              ? ReadMembers<T>
              : T;
