import type {
  Array,
  Boolean,
  Builtins,
  Number,
  String,
} from "@backtickjs/core-schema";
import type { ClientElement } from "@backtickjs/ui-schema";
import type { ClientFunction } from "@backtickjs/core-schema";
import type { ClientValue } from "@backtickjs/core-schema";

/**
 * The builtins written under one prefix, as the members a script reads off it.
 *
 * `Builtins` is all of them and `Builtin<"Math">` is the ones whose names begin
 * `Math.` — the same list, read the way a script writes it rather than the way
 * a client answers it. A client answers `Math.floor`, one whole name in one flat
 * table, because that is what a name has to be for two ends to negotiate over
 * one; nothing here restates what any of them holds.
 *
 * Named for what its members are and not for the shape they are read through:
 * the boxed types arrive under the same constructor, and a `String` is a thing
 * a value becomes rather than a name anybody writes.
 */
export type Builtin<P extends string> = {
  [K in keyof Builtins as K extends `${P}.${infer M}` ? M : never]: Builtins[K];
};

// A built-in receiver autoboxes to its client type
type Autoboxed<T extends ClientValue> = T extends string
  ? String
  : T extends number
    ? Number
    : T extends boolean
      ? Boolean
      : T extends readonly (infer E)[]
        ? Array<E>
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
// lib type is the whole of JavaScript's `Math`; `Builtin<"Math">` is the part
// of it every host can agree on.
export type ClientGlobal = typeof globalThis.Math | typeof globalThis.Array;

// What a client view may be indexed by: an array by number and nothing else,
// anything else by the keys its own type names. Naming the array case rather
// than leaving it to `keyof` keeps the answer to a bad key a clean one — the
// key was meant to be a number — instead of the whole member list.
export type IndexKey<R> = R extends Array<any> ? number : keyof R;

// What a member-access receiver reads as:
//   string | number | boolean | E[] -> Autoboxed<T>, the client API
//   ClientElement                 -> {}: opaque
//   plain object                    -> ReadMembers<T>
//   anything else                   -> unchanged
export type Receiver<T extends ClientValue | ClientGlobal> =
  T extends typeof globalThis.Math
    ? Builtin<"Math">
    : T extends typeof globalThis.Array
      ? Builtin<"Array">
      : T extends string | number | boolean | ClientValue[]
        ? Autoboxed<T>
        : T extends ClientElement
          ? {}
          : T extends ClientFunction
            ? T
            : T extends object
              ? ReadMembers<T>
              : T;
