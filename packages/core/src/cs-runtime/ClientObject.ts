import type { Spliceable } from "./Spliceable.js";

// The explicit opt-in for reflected host classes: declaring the marker
// (`readonly "@backtickjs" = "ClientObject";`) makes an instance spliceable,
// reflected as a plain object of its spliceable members — `Lower` derives
// that shape from the class itself (see `AsObject`). Defining `lower()` is
// the escape hatch: the instance splices as the spliceable it returns —
// lowered by the normal rules — instead of being reflected.
export interface ClientObject {
  readonly "@backtickjs": "ClientObject";
  lower?(): Spliceable;
}

export function isClientObject(value: unknown): value is ClientObject {
  return (
    typeof value === "object" &&
    value !== null &&
    "@backtickjs" in value &&
    value["@backtickjs"] === "ClientObject"
  );
}
