import type { Spliceable, Spliced } from "./Spliceable.js";

export interface ClientObject /* extends Client<AsObject<this>> */ {
  readonly "@backtickjs": "ClientObject";
}

// What a `ClientObject` becomes on the client: the plain object of the
// instance's spliceable members, each lowered, minus the marker.
export type AsObject<T extends ClientObject> = {
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
