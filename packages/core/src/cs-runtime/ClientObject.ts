import type { Lower, Spliceable } from "./Spliceable.js";

// The explicit opt-in for reflected host classes: declaring the marker
// (`readonly "@backtickjs" = "ClientObject";`) makes an instance spliceable,
// reflected as a plain object of its spliceable members (see `AsObject`).
// Defining `lower()` is the escape hatch: the instance splices as the
// spliceable it returns — lowered by the normal rules — instead of being
// reflected.
export interface ClientObject {
  readonly "@backtickjs": "ClientObject";
  lower?(): Spliceable;
}

// The default lowering — what a `ClientObject` becomes when its class
// doesn't define `lower()`: the plain object of the instance's spliceable
// members, each lowered, minus the marker. Defining `lower()` replaces this
// wholesale with `Lower` of whatever the method returns.
export type AsObject<T extends ClientObject> = {
  [K in Exclude<keyof T, "@backtickjs"> as T[K] extends Spliceable
    ? K
    : never]: Lower<T[K]>;
};

export function isClientObject(value: unknown): value is ClientObject {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientObject"
  );
}
