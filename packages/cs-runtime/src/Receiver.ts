import type { Client } from "./Client.js";
import type { ClientArray } from "./ClientArray.js";
import type { ClientFunction } from "./ClientFunction.js";
import type { ClientBoolean } from "./ClientBoolean.js";
import type { ClientConstructor } from "./ClientConstructor.js";
import type { JsxElement } from "./JsxElement.js";
import type { ClientNumber } from "./ClientNumber.js";
import type { ClientObject } from "./ClientObject.js";
import type { ClientString } from "./ClientString.js";
import type { ClientValue } from "./ClientValue.js";
import type { Spliceable, Spliced } from "./Spliceable.js";

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

// A `ClientObject`'s spliceable members (see `lowerClientObject`)
type SplicedMembers<T extends ClientObject> = {
  [K in keyof T as K extends "@backtickjs"
    ? never
    : T[K] extends ClientConstructor
      ? never
      : T[K] extends Spliceable
        ? T[K] extends Client<infer U>
          ? [U] extends [never]
            ? K
            : [U] extends [void]
              ? never
              : K
          : K
        : never]: Spliced<T[K]>;
};

// A plain object's members as a script reads them: `?` means omittable —
// an absent member reads as `null`, so an optional member's `undefined`
// never surfaces; a required member reads unchanged.
type ReadMembers<T extends object> = {
  [K in keyof T]-?: {} extends Pick<T, K>
    ? Exclude<T[K], undefined> | null
    : T[K];
};

// What a client view may be indexed by: an array by number and nothing else,
// anything else by the keys its own type names. Naming the array case rather
// than leaving it to `keyof` keeps the answer to a bad key a clean one — the
// key was meant to be a number — instead of the whole member list.
export type IndexKey<R> = R extends ClientArray<any> ? number : keyof R;

// What a member-access receiver reads as:
//   string | number | boolean | E[] -> Autoboxed<T>, the client API
//   JsxElement                      -> {}: opaque
//   ClientObject                    -> SplicedMembers<T>
//   plain object                    -> ReadMembers<T>
//   anything else                   -> unchanged
export type Receiver<T extends ClientValue> = T extends
  | string
  | number
  | boolean
  | readonly unknown[]
  ? Autoboxed<T>
  : T extends JsxElement
    ? {}
    : T extends ClientObject
      ? SplicedMembers<T>
      : T extends ClientConstructor | ClientFunction
        ? T
        : T extends object
          ? ReadMembers<T>
          : T;
