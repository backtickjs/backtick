import type { ClientArray } from "./ClientArray.js";
import type { ClientBoolean } from "./ClientBoolean.js";
import type { ClientConstructor } from "./ClientConstructor.js";
import type { ClientElement } from "./ClientElement.js";
import type { ClientNumber } from "./ClientNumber.js";
import type { ClientObject } from "./ClientObject.js";
import type { ClientString } from "./ClientString.js";
import type { ClientValue } from "./ClientValue.js";
import type { Spliceable, Spliced } from "./Spliceable.js";

// A built-in receiver autoboxes to its client type, so its members resolve
// against the explicit client API.
type Autoboxed<T> = T extends string
  ? ClientString
  : T extends number
    ? ClientNumber
    : T extends boolean
      ? ClientBoolean
      : T extends readonly (infer E)[]
        ? ClientArray<E>
        : never;

// A `ClientObject`'s spliceable members, each read as what it splices to.
// Kept homomorphic (`keyof T`, filtering in `as`) so properties stay linked
// to their declarations for go-to-definition. The `@backtickjs` brand and
// class members are dropped, mirroring `isSpliceable`'s function guard.
type SplicedMembers<T extends ClientObject> = {
  [K in keyof T as K extends "@backtickjs"
    ? never
    : T[K] extends ClientConstructor
      ? never
      : T[K] extends Spliceable
        ? K
        : never]: Spliced<T[K]>;
};

// What a member-access receiver reads as:
//   string | number | boolean | E[] -> Autoboxed<T>, the client API
//   ClientElement                   -> {}: opaque
//   ClientObject                    -> SplicedMembers<T>
//   anything else                   -> unchanged
export type Receiver<T extends ClientValue> = T extends
  | string
  | number
  | boolean
  | readonly unknown[]
  ? Autoboxed<T>
  : T extends ClientElement
    ? {}
    : T extends ClientObject
      ? SplicedMembers<T>
      : T;
