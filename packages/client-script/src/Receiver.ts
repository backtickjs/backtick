import type {
  Array,
  ArrayConstructor,
  Boolean,
  JSON,
  Math,
  Number,
  NumberConstructor,
  ObjectConstructor,
  String,
  StringConstructor,
} from "@backtickjs/language";
import type { ClientFunction } from "@backtickjs/language";
import type { ClientValue } from "@backtickjs/language";

// A built-in receiver autoboxes to its client type.
//
// The interfaces are the flat builtins regrouped: a client answers `Math.floor`,
// one whole name in one table, because that is what a name has to be for two
// ends to negotiate over one, and these are the same list read the way a script
// writes it.
type Autoboxed<T extends ClientValue> = T extends string
  ? String
  : T extends number
    ? Number
    : T extends boolean
      ? Boolean
      : T extends readonly (infer E)[]
        ? Array<E> & Positions<T>
        : never;

// A tuple's positions keep their own types: `pair[0]` of `[string, number]` is
// a string, where the array view alone would read every position as either.
type Positions<T extends readonly unknown[]> = number extends T["length"]
  ? unknown
  : { readonly [K in keyof T as K extends `${number}` ? K : never]: T[K] };

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
// lib type is the whole of JavaScript's `Math`; the view beside it is the part
// of it every host can agree on.
//
// The ones the compiler recognises, and every one of them: a global left out
// here is one the narrowing below never reaches, and `Number` and `String` are
// callable, so what a script would have read them through is the host's own
// constructor — the whole standard library, typechecking and answered by no
// client. See `namespaces` in `rewriteNode.ts`, which is the same list.
export type ClientGlobal =
  | typeof globalThis.Array
  | typeof globalThis.JSON
  | typeof globalThis.Math
  | typeof globalThis.Number
  | typeof globalThis.Object
  | typeof globalThis.String;

// What a member-access receiver reads as:
//   string | number | boolean | E[] -> Autoboxed<T>, the client API
//   plain object                    -> ReadMembers<T>
//   anything else                   -> unchanged
export type Receiver<T extends ClientValue | ClientGlobal> =
  T extends typeof globalThis.JSON
    ? JSON
    : T extends typeof globalThis.Math
      ? Math
      : T extends typeof globalThis.Array
        ? ArrayConstructor
        : T extends typeof globalThis.Number
          ? NumberConstructor
          : T extends typeof globalThis.Object
            ? ObjectConstructor
            : T extends typeof globalThis.String
              ? StringConstructor
              : T extends string | number | boolean | readonly ClientValue[]
                ? Autoboxed<T>
                : T extends ClientFunction
                  ? T
                  : T extends object
                    ? ReadMembers<T>
                    : T;
