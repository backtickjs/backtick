import type { Spliceable, Spliced } from "./Spliceable.js";

// The explicit opt-in for reflected host classes: declaring the marker
// (`readonly "@backtickjs" = "ClientObject";`) makes an instance spliceable,
// reflected as a plain object of its spliceable members (see `AsObject`).
// Defining `spliced()` is the escape hatch: the instance splices as the
// spliceable it returns — lowered by the normal rules — instead of being
// reflected.
export interface ClientObject {
  readonly "@backtickjs": "ClientObject";
  spliced?(): Spliceable;
}

// The default lowering — what a `ClientObject` becomes when its class
// doesn't define `spliced()`: the plain object of the instance's spliceable
// members, each lowered, minus the marker. Defining `spliced()` replaces
// this wholesale with `Spliced` of whatever the method returns.
export type AsObject<T extends ClientObject> = {
  // The `as`-clause filter doesn't narrow `T[K]` for `Spliced`'s
  // constraint, so the value re-infers it as a `Spliceable`.
  [K in Exclude<keyof T, "@backtickjs"> as T[K] extends Spliceable
    ? K
    : never]: T[K] extends infer V extends Spliceable ? Spliced<V> : never;
};

export function isClientObject(value: unknown): value is ClientObject {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientObject"
  );
}
